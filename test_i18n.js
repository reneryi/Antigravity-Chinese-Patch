const assert = require('assert');
const translations = require('./translations.js');
const {
  isAsarPatchedRaw,
  isFileLocked,
  isDirectoryJunction,
  detectAndSaveJunctionTarget,
  generateAutoHealVbs,
  generateUpdateRunnerVbs,
} = require('./auto_heal_daemon.js');

class FakeText {
  constructor(value) {
    this.nodeType = 3;
    this.nodeValue = value;
    this.parentElement = null;
    this.previousSibling = null;
    this.isConnected = true;
  }
}

class FakeElement {
  constructor(tagName = 'DIV', attributes = {}) {
    this.nodeType = 1;
    this.tagName = tagName;
    this.dataset = {};
    this.className = attributes.class || '';
    this.attributes = new Map(Object.entries(attributes));
    this.childNodes = [];
    this.children = [];
    this.parentElement = null;
    this.isConnected = true;
  }

  append(child) {
    if (this.childNodes.length > 0) {
      child.previousSibling = this.childNodes[this.childNodes.length - 1];
    }
    child.parentElement = this;
    this.childNodes.push(child);
    if (child.nodeType === 1) {
      this.children.push(child);
    }
    return child;
  }

  get textContent() {
    return this.childNodes
      .map((child) => (child.nodeType === 3 ? child.nodeValue : child.textContent))
      .join('');
  }

  getAttribute(name) {
    return this.attributes.has(name) ? this.attributes.get(name) : null;
  }

  hasAttribute(name) {
    return this.attributes.has(name);
  }

  setAttribute(name, value) {
    this.attributes.set(name, value);
  }

  closest(selector) {
    if (selector !== '[role="dialog"]') return null;
    let current = this;
    while (current) {
      if (current.getAttribute && current.getAttribute('role') === 'dialog') {
        return current;
      }
      current = current.parentElement;
    }
    return null;
  }
}

function textElement(value, attributes) {
  const element = new FakeElement('DIV', attributes);
  const text = element.append(new FakeText(value));
  return { element, text };
}

const body = new FakeElement('BODY');
const html = new FakeElement('HTML');
html.append(body);

const samples = [
  ['Application', '应用'],
  ['Run until the specified goal is completely finished.', '持续运行，直到指定目标完全完成。'],
  ['Run an instruction on a recurring schedule or as a one-time timer.', '按周期计划或一次性计时器运行指令。'],
  ['Invoke a browser agent for web tasks.', '调用浏览器智能体执行网页任务。'],
  ['Interview me to align on a plan.', '通过提问访谈我，以便对齐计划。'],
  ['Invoke a team of agents to autonomously tackle large projects.', '调用智能体团队，自主处理大型项目。'],
  ['Reflect on recent successes or corrections to capture reusable skills or rules.', '反思近期成功经验或修正内容，提炼可复用的技能或规则。'],
  ['Invoke the Boost multi-agent orchestrator for complex tasks.', '调用 Boost 多智能体编排器处理复杂任务。'],
  ['Standalone Terminals', '独立终端'],
  ['Split Terminal', '拆分终端'],
  ['Delete Terminal', '删除终端'],
  ['Global Permissions', '全局权限'],
  ['Controls the actions the agent can take.', '控制智能体可以执行的操作。'],
  ['Tool Permissions', '工具权限'],
  ['Whether the agent asks you to review its documents.', '是否由智能体请求您审查其文档。'],
  ['Modify permissions for file, terminal, and MCP tools.', '修改文件、终端和 MCP 工具的权限。'],
  [
    'A high-risk mode that disables all safety barriers. The agent operates with full system access, auto-executes all terminal commands, and reads or writes to all local files without review prompts.',
    '一种会禁用所有安全屏障的高风险模式。智能体拥有完整的系统访问权限，会自动执行所有终端命令，并在无需审查提示的情况下读取或写入所有本地文件。',
  ],
  ['Rename', '重命名'],
  ['Pin', '置顶'],
  ['Archive', '归档'],
  ['Split', '拆分'],
  ['Split Right', '拆分到右侧'],
  ['Split Down', '向下拆分'],
  ['Replace With New', '替换为新对话'],
  ['Modified in 4 projects', '已在 4 个项目中修改'],
  ['Ran 3 commands', '已运行 3 个命令'],
  ['Ran Get-ChildItem -Path "$env:LOCALAPPDATA\\Pub\\Cache\\hosted"', '已运行 Get-ChildItem -Path "$env:LOCALAPPDATA\\Pub\\Cache\\hosted"'],
  ['Searched WM_NCACTIVATE', '已搜索 WM_NCACTIVATE'],
  ['Analyzed c++ window_manager_plugin.cpp #L150-250', '已分析 c++ window_manager_plugin.cpp #L150-250'],
  ['Explored 6 files, 1 search', '已探索 6 个文件，1 次搜索'],
  ['Explored 1 file', '已探索 1 个文件'],
  ['Exploring 2 files, 2 searches', '正在探索 2 个文件，2 次搜索'],
  ['Add MCP Servers', '添加 MCP 服务器'],
  ['29 tools enabled', '29 个工具已启用'],
  [
    'Investigate and fix software issues using AI-powered root cause analysis. This MCP server connects to your Antimetal account to search issues, read investigative reports with causal graphs, retrieve observability artifacts (logs, traces, metrics), and apply remediations—directly from your AI tools.',
    '使用 AI 驱动的根因分析调查并修复软件问题。此 MCP 服务器连接您的 Antimetal 账户，可搜索问题、读取包含因果图的调查报告、获取可观测性产物（日志、跟踪、指标），并直接通过 AI 工具应用修复措施。',
  ],
  [
    'Plugins are packaged collections of skills and MCPs to help the Agent in Antigravity work with Google developer products. You can always change your choices in Settings.',
    '插件是技能和 MCP 的打包集合，可帮助 Antigravity 中的智能体使用 Google 开发者产品。您可以随时在设置中更改选择。',
  ],
  // === Antigravity 2.22.0+ 新增词条与动态正则测试 ===
  ['Connect to WSL', '连接到 WSL'],
  ['Reopen Locally', '在本地重新打开'],
  ['Setting up WSL', '正在配置 WSL'],
  ['Setting up WSL: Ubuntu-24.04', '正在配置 WSL：Ubuntu-24.04'],
  ['Conversation unavailable', '会话不可用'],
  ['Worked for 5m 12s', '已工作 5分钟 12秒'],
  ['Ran 8 background commands', '已运行 8 个后台命令'],
  ['Edited 14 files (+120 -30)', '已编辑 14 个文件 (+120 -30)'],
  ['1,250 / 200,000 tokens (0.6%)', '1,250 / 200,000 个 Token (0.6%)'],
  ['e.g., /path/to/file', '例如：/path/to/file'],
  ['Arguments Schema:', '参数结构 (Schema)：'],
  ['New Window Ctrl+Shift+N', '新建窗口 Ctrl+Shift+N'],
  [
    'Read, create, edit, and manage Google Docs. Use when the user shares a docs.google.com URL, asks to summarize or extract content from a doc, wants a doc drafted, edited, formatted, or commented on, wants tables, images, or smart chips inserted, wants markdown imported or synchronized with a doc, or wants a doc exported. Requires a known document ID — use the gdrive skill to search for or locate documents. Don\'t use for Google Sheets, Slides, or Drive file management.',
    '读取、创建、编辑和管理 Google 文档 (Google Docs)。当用户分享 docs.google.com 链接、要求总结或提取文档内容、起草/编辑/格式化/评论文档、插入表格/图片/智能芯片、导入或同步 Markdown，或导出文档时使用。需要已知的文档 ID——可使用 gdrive 技能搜索或定位文档。请勿用于 Google 表格、幻灯片或云端硬盘文件管理。',
  ],
  // === Antigravity 2.23.0 插件市场、MCP 服务目录、MCP 配置项与内置工具测试 ===
  [
    'Connect to Google Workspace, including Docs, Sheets, Slides, Drive, and Calendar.',
    '连接 Google Workspace，包括文档 (Docs)、表格 (Sheets)、幻灯片 (Slides)、云端硬盘 (Drive) 和日历 (Calendar)。',
  ],
  [
    "Build on Google's developer platforms, including Android, Chrome, Gemini, and Google Cloud.",
    '基于 Google 开发者平台进行构建，涵盖 Android、Chrome、Gemini 和 Google Cloud。',
  ],
  [
    'The Cloud Audit Manager remote MCP server allows you to enroll projects, generate audit and scope reports, and check resource enrollment statuses in the us-central1 region.',
    'Cloud Audit Manager 远程 MCP 服务允许您在 us-central1 区域注册项目、生成审计与范围报告，并检查资源注册状态。',
  ],
  [
    'Manage your Neon backend with the Neon MCP Server: Lakebase Postgres, branching, Object Storage, Functions, and the AI Gateway',
    '使用 Neon MCP 服务管理您的 Neon 后端：涵盖 Lakebase Postgres、数据库分支、对象存储、云函数以及 AI 网关。',
  ],
  [
    'Interact with your Vercel projects using natural language. Vercel MCP allows AI tools to search Vercel documentation, inspect projects and deployments, analyze deployment and build logs, and manage supported Vercel resources securely.',
    '使用自然语言与您的 Vercel 项目交互。Vercel MCP 允许 AI 工具搜索 Vercel 文档、检查项目和部署状态、分析部署与构建日志，并安全地管理受支持的 Vercel 资源。',
  ],
  ['Looker Base URL', 'Looker 基础 URL'],
  ['Neo4j Connection URI', 'Neo4j 连接 URI'],
  ['Clicks on the provided element', '点击指定的页面元素。'],
  ['by Google', '由 Google 提供'],
  ['Error restarting MCP server: connection timeout', '重启 MCP 服务出错：connection timeout'],
  ['Search for "bigquery" in the Marketplace', '在插件市场中搜索“bigquery”'],
  // === Antigravity 2.24 / 2.25 斜杠命令 (/compact, /plan, MCP Prompt)、语音模式与遥测权限测试 ===
  ['Compact the conversation to reduce context usage.', '压缩对话内容以减少上下文占用。'],
  ['Compact the conversation now (summarize history to free up the context window).', '立即压缩当前对话（总结历史记录以释放上下文窗口空间）。'],
  ['Generate a detailed step-by-step plan before executing.', '在执行前生成详细的分步实施计划。'],
  ['Plan carefully before executing a task.', '在执行任务前进行周密规划。'],
  [
    'Prompt the user to interactively perform a user journey in the app, then generate a test from the recorded actions.',
    '提示用户在应用中交互式地执行一段用户操作流程，然后根据录制的操作自动生成测试代码。',
  ],
  [
    'Prompts the LLM to attempt to accomplish a user journey in the running app using flutter driver. If successful, it will then translate the steps it followed into a flutter driver test and write that to disk.',
    '提示大语言模型使用 Flutter Driver 在正在运行的应用中尝试完成一段用户旅程。如果成功，它会将所执行的步骤转换为 Flutter Driver 测试并写入磁盘。',
  ],
  ['Auto-compact', '自动压缩上下文'],
  ['Automatically compact conversations when approaching context limit', '当接近上下文容量上限时自动压缩对话'],
  ['Per-Conversation Telemetry', '单次会话遥测选项'],
  ['Show an option on each conversation to disable telemetry.', '在每个会话中显示用于禁用遥测的选项。'],
  ['Use Voice Mode', '使用语音模式'],
  ['Configure Customizations', '配置自定义项'],
  ['Open Your First Workspace', '打开您的第一个工作区'],
  ['Grant the agent maximal freedom to build without interruptions.', '授予智能体最高自由度，无中断地自主完成构建。'],
  ['Failed to update rule: disk full', '更新规则失败：disk full'],
  ['Toggle diff mode (unified/split)', '切换差异对比模式 (统一/并排)'],
  ['Add to Chat (Ctrl+L)', '添加到对话 (Ctrl+L)'],
  ['Message queued. 2 messages in queue.', '消息已加入队列（当前队列中有 2 条消息）。'],
  ['Yes, and always allow in this project', '是，并在此项目中始终允许'],
  ['Yes, save rule in this conversation', '是，在此对话中保存规则'],
  ['Yes, save rule globally', '是，保存为全局规则'],
  ['Conflicts with your configured Ask permission: Bash', '与您配置的“询问”权限冲突：Bash'],
  // === Antigravity 2.26.0 远程控制 (Remote Control)、已连接应用 (Connected apps) 与云端工作区资源测试 ===
  ['Get started with Remote Control', '开始使用远程控制'],
  ['Remote Control Instances', '远程控制实例'],
  ['Connected apps', '已连接的应用'],
  ['Apps connected to your account', '已连接到您账户的应用'],
  ['Files and resources in cloud workspaces', '云端工作区中的文件与资源'],
  [
    'Sign in to an app once and your agent can use it on any device. Open an app to see the account it uses or to disconnect it.',
    '只需登录一次应用，您的智能体即可在任何设备上使用它。打开应用即可查看其关联账户或断开连接。',
  ],
  [
    'Enter the configuration values this MCP server needs. Saving restarts the server with them.',
    '输入此 MCP 服务器所需的配置值。保存后将使用新配置重启该服务器。',
  ],
  ['Built-in Browser Requires Isolated Web App (IWA)', '内置浏览器需要独立 Web 应用 (IWA)'],
  ['Fork in New Workspace', '在新工作区中分叉 (Fork)'],
  ['Search tabs, files, extensions, subagents, artifacts, tasks...', '搜索标签页、文件、扩展、子智能体、产物、任务...'],
];

const nodes = samples.map(([source]) => {
  const sample = textElement(source);
  body.append(sample.element);
  return sample.text;
});

// 受保护元素测试（Monaco 编辑器、Xterm 终端、模型选择器不可被误翻）
const monacoProtected = textElement('Settings', { class: 'monaco-editor view-line' });
body.append(monacoProtected.element);

const xtermProtected = textElement('New Conversation', { class: 'xterm-rows terminal' });
body.append(xtermProtected.element);

const modelProtected = textElement('Fast', { 'data-testid': 'model-selector-trigger' });
body.append(modelProtected.element);

const untranslatedNormal = textElement('Windows 11 x64');
body.append(untranslatedNormal.element);

const attributeSample = body.append(new FakeElement('BUTTON', {
  'aria-label': 'Description: Mcp Tools: 153 tokens',
  title: 'Conversation Name',
}));

// 测试 <input> 与 <textarea> 的 placeholder / aria-label 属性翻译（同时保护内部文本不被误改）
const inputCustomizations = body.append(new FakeElement('INPUT', {
  placeholder: 'Search customizations...',
  'aria-label': 'Search customizations...',
}));
const inputMcpSearch = body.append(new FakeElement('INPUT', {
  placeholder: 'Search MCP servers by name',
  'aria-label': 'Search MCP servers by name',
}));
const textareaSample = body.append(new FakeElement('TEXTAREA', {
  placeholder: 'Paste code',
}));
const textareaInnerText = textareaSample.append(new FakeText('Settings'));

const globalPermissionsSummary = body.append(new FakeElement('DIV'));
globalPermissionsSummary.append(new FakeText('Controls the actions the agent can take.'));
globalPermissionsSummary.append(new FakeText('Modified in '));
globalPermissionsSummary.append(new FakeText('4'));
globalPermissionsSummary.append(new FakeText(' projects'));

global.document = {
  readyState: 'complete',
  documentElement: html,
  body,
  addEventListener() {},
};
global.window = global;
global.MutationObserver = class {
  observe() {}
  disconnect() {}
};
global.setInterval = () => 1;
global.clearInterval = () => {};

const i18nModule = require('./i18n_inject.js');

samples.forEach(([source, expected], index) => {
  assert.strictEqual(nodes[index].nodeValue, expected, `Translation mismatch for: ${source}`);
});
assert.strictEqual(attributeSample.getAttribute('title'), '对话名称');
assert.strictEqual(
  attributeSample.getAttribute('aria-label'),
  '说明：MCP 工具：153 个令牌',
);
assert.strictEqual(inputCustomizations.getAttribute('placeholder'), '搜索自定义扩展...');
assert.strictEqual(inputCustomizations.getAttribute('aria-label'), '搜索自定义扩展...');
assert.strictEqual(inputMcpSearch.getAttribute('placeholder'), '按名称搜索 MCP 服务器');
assert.strictEqual(inputMcpSearch.getAttribute('aria-label'), '按名称搜索 MCP 服务器');
assert.strictEqual(textareaSample.getAttribute('placeholder'), '粘贴代码');
assert.strictEqual(textareaInnerText.nodeValue, 'Settings', 'Textarea inner text content must not be translated');
assert.strictEqual(globalPermissionsSummary.textContent, '控制智能体可以执行的操作。已在 4 个项目中修改');

// 验证受保护区域未被误翻
assert.strictEqual(monacoProtected.text.nodeValue, 'Settings', 'Monaco editor content should not be translated');
assert.strictEqual(xtermProtected.text.nodeValue, 'New Conversation', 'Xterm terminal content should not be translated');
assert.strictEqual(modelProtected.text.nodeValue, 'Fast', 'Model selector trigger should not be translated');

// 验证否定标记缓存已生效（普通未命中节点记录 _agyOriginal，受保护容器在元素层直接短路不遍历子节点）
assert.strictEqual(nodes[0]._agyOriginal, '应用');
assert.strictEqual(untranslatedNormal.text._agyOriginal, 'Windows 11 x64');
assert.strictEqual(monacoProtected.text._agyOriginal, undefined);

// 验证全局翻译函数已暴露供 preload IPC 拦截器调用
assert.strictEqual(typeof globalThis.__agyTranslateString, 'function');
assert.strictEqual(globalThis.__agyTranslateString('Copy Relative Path'), '复制相对路径');

// 验证主进程 translations.js 已恢复官方自动更新且包含动态 API 钩子与同步更新事务代理钩子
assert.ok(translations.MAIN_PROCESS_I18N_HOOK.includes('__agyMainHookInstalled'));
assert.ok(translations.MAIN_PROCESS_I18N_HOOK.includes('__agySpawnHooked'));
assert.ok(translations.MAIN_PROCESS_I18N_HOOK.includes('update_runner.vbs'));
assert.ok(translations.MAIN_PROCESS_I18N_HOOK.includes('update_task.txt'));
// 编译校验注入主进程的钩子源码语法 100% 合法（防止模板字符串转义错误注入 dist/main.js）
assert.doesNotThrow(() => new Function(translations.MAIN_PROCESS_I18N_HOOK), 'MAIN_PROCESS_I18N_HOOK must be valid JS syntax');
const hasUpdateBlocker = (translations['updater.js'] || []).some(
  (entry) => entry.translated && entry.translated.includes('拦截并截断自动检查逻辑')
);
assert.strictEqual(hasUpdateBlocker, false, 'updater.js should not block official checkForUpdates');
assert.strictEqual(typeof isAsarPatchedRaw, 'function');
assert.strictEqual(typeof isFileLocked, 'function');
assert.strictEqual(typeof isDirectoryJunction, 'function');
assert.strictEqual(typeof detectAndSaveJunctionTarget, 'function');

// 验证生成的 auto_heal.vbs 与 update_runner.vbs 100% 纯 ASCII、包含 /S 静默更新与环境变量清理、且所有 Sub/Function 显式声明过程级 On Error Resume Next
function verifyVbsProcedureErrorScopes(vbsContent, scriptName) {
  assert.ok(/^[\x00-\x7F]+$/.test(vbsContent), `${scriptName} must be 100% pure ASCII`);
  assert.ok(vbsContent.includes('Remove "ELECTRON_RUN_AS_NODE"'), `${scriptName} must clean up ELECTRON_RUN_AS_NODE`);
  const procRegex = /^(Sub|Function)\s+([A-Za-z0-9_]+)\([^)]*\)([\s\S]*?)^End\s+\1/gm;
  let match;
  let count = 0;
  while ((match = procRegex.exec(vbsContent)) !== null) {
    count++;
    const procName = match[2];
    const bodyLines = match[3]
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("'"));
    assert.strictEqual(
      bodyLines[0],
      'On Error Resume Next',
      `${scriptName} procedure ${procName} MUST start with On Error Resume Next`
    );
  }
  assert.ok(count >= 9, `${scriptName} should contain at least 9 Sub/Function definitions (found ${count})`);
}

const autoHealVbsContent = generateAutoHealVbs();
const updateRunnerVbsContent = generateUpdateRunnerVbs();
verifyVbsProcedureErrorScopes(autoHealVbsContent, 'auto_heal.vbs');
verifyVbsProcedureErrorScopes(updateRunnerVbsContent, 'update_runner.vbs');
assert.ok(updateRunnerVbsContent.includes('--updated /S'), 'update_runner.vbs must execute NSIS installer with --updated /S');
assert.ok(autoHealVbsContent.includes('runner.lock'), 'auto_heal.vbs must coordinate with runner.lock');

console.log(
  `i18n runtime & architecture tests passed: ${samples.length + 31} assertions (dictionary size: ${Object.keys(i18nModule.EXACT_TRANSLATIONS).length} exact entries, ${i18nModule.REGEX_TRANSLATIONS.length} dynamic regexes)`
);
