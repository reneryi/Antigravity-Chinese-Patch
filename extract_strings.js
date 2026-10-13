/**
 * Antigravity 全源英文文本提取与版本漂移检测工具 (v3.0)
 *
 * 功能：
 * 1. 支持直接指定 JS 文件提取，或自动探测本地运行中的 language_server 拉取前端 /main.js
 * 2. 自动扫描 ~/.gemini/antigravity/builtin 与 ~/.gemini/config/plugins 下的技能/插件 YAML 描述
 * 3. 调用 i18n_inject.js 翻译引擎实测覆盖率，输出未覆盖的静态词条与动态模板
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const https = require('https');

const i18n = require('./i18n_inject.js');

function isValidUICandidate(s) {
  if (!s || s.length < 2 || s.length > 600) return false;
  if (!/[A-Za-z]{2,}/.test(s)) return false;
  if (/^(https?:|wss?:|data:|blob:|file:|mailto:|antigravity|gemini-api:|\/|\.|#|--|_[a-z])/i.test(s)) return false;
  if (/^[a-z0-9_\-\.\/\\:@]+$/.test(s)) return false;
  if (/^[A-Z0-9_]+$/.test(s)) return false;
  if (/^[A-Z][a-z0-9]+(?:[A-Z][a-z0-9]+)+$/.test(s)) return false;
  if (/^[a-z]+[A-Z][a-zA-Z0-9]*$/.test(s)) return false;
  if (/^M\s*\d/.test(s)) return false;
  if (/[{}<>=$]/.test(s) && !s.includes(' ')) return false;
  if (/\b(flex|items-center|justify-|bg-|text-|border-|rounded-|px-|py-|mt-|mb-|ml-|mr-|gap-|w-|h-|min-|max-|overflow-|pointer-events|transition-|duration-|opacity-|z-|grid|shrink-0|truncate)\b/.test(s)) return false;
  if (/\b(function|return|const|var|let|typeof|instanceof|undefined|null|prototype|__esModule|Object\.defineProperty)\b/.test(s)) return false;
  if (/^(application\/|text\/|image\/|audio\/|video\/|multipart\/)/i.test(s)) return false;
  return true;
}

function isTranslated(s) {
  const norm = s.replace(/\s+/g, ' ').trim();
  if (!norm) return true;
  const res = i18n.translateString(norm);
  return res && res !== norm;
}

function parseYamlDesc(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const lines = m[1].split(/\r?\n/);
  let inDesc = false;
  const buf = [];
  for (const line of lines) {
    const km = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (km && !line.startsWith(' ') && !line.startsWith('\t')) {
      if (inDesc) break;
      if (km[1] === 'description') {
        const val = km[2].trim();
        inDesc = true;
        if (val !== '>' && val !== '>-' && val !== '|' && val !== '|-') {
          buf.push(val.replace(/^['"]|['"]$/g, ''));
        }
      }
    } else if (inDesc) {
      buf.push(line.trim());
    }
  }
  if (inDesc && buf.length) return buf.filter(Boolean).join(' ').replace(/^['"]|['"]$/g, '');
  return null;
}

function scanLocalSkillsAndPlugins() {
  const home = os.homedir();
  const dirs = [
    path.join(home, '.gemini', 'antigravity', 'builtin'),
    path.join(home, '.gemini', 'antigravity', 'cache'),
    path.join(home, '.gemini', 'antigravity', 'mcp'),
    path.join(home, '.gemini', 'config', 'plugins'),
  ];
  let total = 0;
  const uncovered = [];

  function checkDesc(desc) {
    if (!desc || typeof desc !== 'string') return;
    const norm = desc.replace(/\s+/g, ' ').trim();
    if (!norm || norm.length < 3 || !/[A-Za-z]{2,}/.test(norm)) return;
    total++;
    if (!isTranslated(norm)) uncovered.push(norm);
  }

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules' && entry.name !== '.git') walk(full);
      } else if (entry.name.endsWith('.md')) {
        const desc = parseYamlDesc(fs.readFileSync(full, 'utf8'));
        if (desc) checkDesc(desc);
      } else if (entry.name.endsWith('.json')) {
        try {
          const pj = JSON.parse(fs.readFileSync(full, 'utf8'));
          if (entry.name === 'plugin.json' || entry.name === 'marketplace.json') {
            if (pj.description) checkDesc(pj.description);
            if (Array.isArray(pj.plugins)) {
              for (const p of pj.plugins) {
                if (p && p.description) checkDesc(p.description);
              }
            }
          } else if (full.includes(path.join('.gemini', 'antigravity', 'mcp'))) {
            if (pj.description) checkDesc(pj.description);
          }
        } catch {}
      }
    }
  }
  dirs.forEach(walk);
  return { total, uncovered };
}

function fetchActiveMainJs() {
  return new Promise((resolve) => {
    try {
      const logPath = path.join(process.env.APPDATA || '', 'Antigravity', 'logs', 'language_server.log');
      if (!fs.existsSync(logPath)) return resolve(null);
      const log = fs.readFileSync(logPath, 'utf8');
      const matches = [...log.matchAll(/listening on random port at (\d+) for HTTPS/gi)];
      if (!matches.length) return resolve(null);
      const port = matches[matches.length - 1][1];
      https.get(`https://127.0.0.1:${port}/main.js`, { rejectUnauthorized: false }, (res) => {
        if (res.statusCode !== 200) return resolve(null);
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      }).on('error', () => resolve(null));
    } catch {
      resolve(null);
    }
  });
}

async function main() {
  const inputArg = process.argv[2];
  const outputArg = process.argv[3] || path.join(os.tmpdir(), 'ag_strings.txt');

  const skillStats = scanLocalSkillsAndPlugins();
  console.log(`[Skills & Plugins] 已扫描 ${skillStats.total} 项描述，未覆盖: ${skillStats.uncovered.length} 项`);

  let jsContent = null;
  if (inputArg && fs.existsSync(inputArg)) {
    jsContent = fs.readFileSync(inputArg, 'utf8');
    console.log(`[Frontend Bundle] 已读取本地文件: ${inputArg}`);
  } else {
    jsContent = await fetchActiveMainJs();
    if (jsContent) {
      console.log(`[Frontend Bundle] 已从运行中的 language_server 拉取实时 /main.js (${(jsContent.length / 1024 / 1024).toFixed(2)} MB)`);
    }
  }

  const out = new Set(skillStats.uncovered);
  let totalUI = 0;
  let coveredUI = 0;

  if (jsContent) {
    const uiPropRegex = /(?:label|title|placeholder|description|tooltip|header|subtitle|emptyText|confirmText|cancelText|"aria-label")\s*:\s*(?:"([^"\\\r\n]{2,300})"|'([^'\\\r\n]{2,300})')/g;
    const candidates = new Set();
    let m;
    while ((m = uiPropRegex.exec(jsContent)) !== null) {
      const s = (m[1] || m[2] || '').replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
      if (isValidUICandidate(s)) candidates.add(s);
    }
    totalUI = candidates.size;
    for (const c of candidates) {
      if (isTranslated(c)) {
        coveredUI++;
      } else {
        out.add(c);
      }
    }
    console.log(`[UI Properties] 识别候选词条 ${totalUI} 项，已覆盖 ${coveredUI} 项 (${totalUI ? ((coveredUI / totalUI) * 100).toFixed(1) : 100}%)`);
  }

  const arr = [...out].sort((a, b) => a.localeCompare(b));
  fs.writeFileSync(outputArg, arr.join('\n'), 'utf8');
  console.log(`strings=${arr.length} file=${outputArg}`);
}

main();
