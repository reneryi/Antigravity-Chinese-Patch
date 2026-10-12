/**
 * Antigravity 中文汉化补丁 - 核心翻译映射表与主进程动态拦截器 (v3.0)
 *
 * 本文件包含：
 * 1. Electron 主进程各模块 (dist/*.js) 的静态源码级翻译映射表（适配 Antigravity 2.22.0+）
 * 2. Electron 主进程运行时动态 API 钩子 (MAIN_PROCESS_I18N_HOOK)，自动拦截并汉化：
 *    - Menu.buildFromTemplate / MenuItem（应用菜单、系统托盘菜单、原生右键菜单）
 *    - dialog.showMessageBox / showErrorBox / showOpenDialog / showSaveDialog（原生系统对话框）
 * 3. 保留官方自动更新完整链路（不再閹割 checkForUpdates），配合守护进程实现更新后自动重汉化。
 */

// ============================================================================
// 1. 主进程运行时动态汉化钩子 (注入到 dist/main.js 顶部)
// ============================================================================

const MAIN_PROCESS_I18N_HOOK = `
// === Antigravity 中文汉化补丁 v3.0 - 主进程原生 API 动态汉化钩子 ===
(function() {
  try {
    const _electron = require('electron');
    if (!_electron || _electron.__agyMainHookInstalled) return;
    _electron.__agyMainHookInstalled = true;

    const MENU_EXACT = {
      'File': '文件',
      'Edit': '编辑',
      'View': '视图',
      'Window': '窗口',
      'Help': '帮助',
      'New Window': '新建窗口',
      'Connect to WSL': '连接到 WSL',
      'Reopen Locally': '在本地重新打开',
      'Docs': '文档',
      'Check for Updates': '检查更新',
      'Checking for Updates...': '正在检查更新...',
      'Downloading Update...': '正在下载更新...',
      'Restart to Update': '重启以更新',
      'No agents running': '无智能体运行',
      'Quit': '退出',
      'Cancel': '取消',
      'OK': '确定',
      'Yes': '是',
      'No': '否',
      'Undo': '撤销',
      'Redo': '重做',
      'Cut': '剪切',
      'Copy': '复制',
      'Paste': '粘贴',
      'Paste and Match Style': '粘贴并匹配样式',
      'Delete': '删除',
      'Select All': '全选',
      'Reload': '重新加载',
      'Force Reload': '强制重新加载',
      'Toggle Developer Tools': '切换开发者工具',
      'Actual Size': '实际大小',
      'Reset Zoom': '重置缩放',
      'Zoom In': '放大',
      'Zoom Out': '缩小',
      'Toggle Full Screen': '切换全屏',
      'Minimize': '最小化',
      'Zoom': '缩放',
      'Close': '关闭',
      'Close Window': '关闭窗口',
      'Bring All to Front': '前置全部窗口',
      'Services': '服务',
      'Hide': '隐藏',
      'Hide Others': '隐藏其他',
      'Unhide': '全部显示',
      'Copy Path': '复制路径',
      'Copy Relative Path': '复制相对路径',
      'Reveal in File Explorer': '在文件资源管理器中显示',
      'Reveal in Finder': '在 Finder 中显示',
      'Reveal in File Manager': '在文件管理器中显示',
      'Open in Integrated Terminal': '在集成终端中打开',
      'Open in Terminal': '在终端中打开',
      'Open Containing Folder': '打开所在文件夹',
      'Open Folder': '打开文件夹',
      'Close Folder': '关闭文件夹',
      'Remove Folder from Workspace': '从工作区移除文件夹',
      'Rename': '重命名',
      'Rename...': '重命名...',
      'Delete': '删除',
      'Duplicate': '创建副本',
      'New File': '新建文件',
      'New Folder': '新建文件夹',
      'Pin': '置顶',
      'Unpin': '取消置顶',
      'Archive': '归档',
      'Unarchive': '取消归档',
      'Delete Conversation': '删除对话',
      'Rename Conversation': '重命名对话',
      'Mark as Read': '标为已读',
      'Mark as Unread': '标为未读',
      'Open Link': '打开链接',
      'Copy Link': '复制链接',
      'Copy Link Address': '复制链接地址',
      'Copy Image': '复制图片',
      'Copy Image Address': '复制图片地址',
      'Save Image As...': '图片另存为...',
      'Inspect': '检查',
      'Inspect Element': '检查元素',
      'Open workspace': '打开工作区',
      'Open workspaces': '打开多个工作区',
      'Confirm Quit': '确认退出',
      'Are you sure you want to quit?': '确定要退出吗？',
      'There may be agents or background tasks running.': '可能有智能体或后台任务正在运行。',
      'No updates available': '当前已是最新版本',
      'Binary not found': '文件未找到',
      'Startup failed': '启动失败',
      'WSL distro not found': '未找到 WSL 发行版',
      'Antigravity opened on Windows instead.': 'Antigravity 已改为在 Windows 本地打开。',
      'WSL setup failed': 'WSL 配置失败',
      'Cannot open folder': '无法打开文件夹',
      'Folder is on the Windows filesystem': '文件夹位于 Windows 文件系统中',
      'This folder is on the Windows filesystem. Accessing it from WSL (via /mnt) can be slow — for best performance keep projects inside the WSL filesystem.':
        '此文件夹位于 Windows 文件系统中。从 WSL（通过 /mnt）访问可能会较慢——为获得最佳性能，建议将项目保存在 WSL 文件系统内。'
    };

    const ROLE_LABELS = {
      undo: '撤销',
      redo: '重做',
      cut: '剪切',
      copy: '复制',
      paste: '粘贴',
      pasteandmatchstyle: '粘贴并匹配样式',
      delete: '删除',
      selectall: '全选',
      reload: '重新加载',
      forcereload: '强制重新加载',
      toggledevtools: '切换开发者工具',
      resetzoom: '实际大小',
      zoomin: '放大',
      zoomout: '缩小',
      togglefullscreen: '切换全屏',
      minimize: '最小化',
      zoom: '缩放',
      close: '关闭',
      quit: '退出',
      front: '前置全部窗口',
      services: '服务',
      hide: '隐藏',
      hideothers: '隐藏其他',
      unhide: '全部显示',
       filemenu: '文件',
      editmenu: '编辑',
      viewmenu: '视图',
      windowmenu: '窗口',
      helpmenu: '帮助'
    };

    const MENU_REGEX = [
      [/^Open (.+)$/, '打开 $1'],
      [/^(\\d+)\\s+agents?\\s+running$/i, '$1 个智能体运行中'],
      [/^No\\s+agents?\\s+running$/i, '无智能体运行'],
      [/^The WSL distro "(.+)" is no longer installed\\.$/, 'WSL 发行版“$1”已不再安装。'],
      [/^Failed to install the server into WSL distro "(.+)":\\n([\\s\\S]+)$/, '无法将服务器安装到 WSL 发行版“$1”：\\n$2'],
      [/^This folder belongs to the WSL distro "(.+)", but this window is connected to "(.+)"\\.$/, '此文件夹属于 WSL 发行版“$1”，但当前窗口连接的是“$2”。'],
      [/^This location cannot be opened in WSL: (.+)$/, '无法在 WSL 中打开此位置: $1'],
      [/^Setting up WSL: (.+)$/, '正在配置 WSL: $1'],
      [/^Installing into (.+?)[…\\.]{1,3}$/, '正在安装到 $1…'],
      [/^Downloading the Antigravity binary[…\\.]{1,3}$/, '正在下载 Antigravity 二进制文件…']
    ];

    function translateMainString(str) {
      if (typeof str !== 'string' || !str) return str;
      const trimmed = str.trim();
      if (!trimmed) return str;
      if (Object.prototype.hasOwnProperty.call(MENU_EXACT, trimmed)) {
        return str.replace(trimmed, MENU_EXACT[trimmed]);
      }
      for (let i = 0; i < MENU_REGEX.length; i++) {
        const [re, rep] = MENU_REGEX[i];
        if (re.test(trimmed)) {
          return trimmed.replace(re, rep);
        }
      }
      return str;
    }

    function translateMenuTemplate(template) {
      if (!Array.isArray(template)) return template;
      return template.map((item) => {
        if (!item || typeof item !== 'object') return item;
        // 如果已经是 Electron MenuItem 实例则直接返回
        if (item.constructor && item.constructor.name === 'MenuItem') return item;
        const copy = { ...item };
        if (typeof copy.label === 'string' && copy.label) {
          copy.label = translateMainString(copy.label);
        } else if (typeof copy.role === 'string' && !copy.label) {
          const roleKey = copy.role.toLowerCase();
          if (ROLE_LABELS[roleKey]) {
            copy.label = ROLE_LABELS[roleKey];
          }
        }
        if (Array.isArray(copy.submenu)) {
          copy.submenu = translateMenuTemplate(copy.submenu);
        }
        return copy;
      });
    }

    if (_electron.Menu && typeof _electron.Menu.buildFromTemplate === 'function') {
      const _origBuild = _electron.Menu.buildFromTemplate.bind(_electron.Menu);
      _electron.Menu.buildFromTemplate = function(template) {
        try {
          return _origBuild(translateMenuTemplate(template));
        } catch {
          return _origBuild(template);
        }
      };
    }

    if (_electron.dialog) {
      if (typeof _electron.dialog.showMessageBox === 'function') {
        const _origMsgBox = _electron.dialog.showMessageBox.bind(_electron.dialog);
        _electron.dialog.showMessageBox = function(winOrOpts, maybeOpts) {
          try {
            const opts = maybeOpts || winOrOpts;
            if (opts && typeof opts === 'object') {
              if (typeof opts.title === 'string') opts.title = translateMainString(opts.title);
              if (typeof opts.message === 'string') opts.message = translateMainString(opts.message);
              if (typeof opts.detail === 'string') opts.detail = translateMainString(opts.detail);
              if (Array.isArray(opts.buttons)) {
                opts.buttons = opts.buttons.map((b) => translateMainString(b));
              }
            }
          } catch {}
          return maybeOpts ? _origMsgBox(winOrOpts, maybeOpts) : _origMsgBox(winOrOpts);
        };
      }
      if (typeof _electron.dialog.showErrorBox === 'function') {
        const _origErrBox = _electron.dialog.showErrorBox.bind(_electron.dialog);
        _electron.dialog.showErrorBox = function(title, content) {
          return _origErrBox(translateMainString(title), translateMainString(content));
        };
      }
      if (typeof _electron.dialog.showOpenDialog === 'function') {
        const _origOpenDlg = _electron.dialog.showOpenDialog.bind(_electron.dialog);
        _electron.dialog.showOpenDialog = function(winOrOpts, maybeOpts) {
          try {
            const opts = maybeOpts || winOrOpts;
            if (opts && typeof opts === 'object') {
              if (typeof opts.title === 'string') opts.title = translateMainString(opts.title);
              if (typeof opts.buttonLabel === 'string') opts.buttonLabel = translateMainString(opts.buttonLabel);
            }
          } catch {}
          return maybeOpts ? _origOpenDlg(winOrOpts, maybeOpts) : _origOpenDlg(winOrOpts);
        };
      }
    }
  } catch (e) {
    console.error('[Antigravity 汉化补丁] 主进程钩子初始化异常:', e);
  }
})();
`;

// ============================================================================
// 2. 静态源码翻译映射表：按 dist/ 下的相对文件路径组织
//    注：标记了 optional: true 的项属于跨版本兼容项（在旧版或特定版本存在），
//    未匹配时不会计入失败告警。
// ============================================================================

const translations = {

  // --------------------------------------------------------------------------
  // main.js - 主进程入口文件
  // --------------------------------------------------------------------------
  'main.js': [
    // 错误对话框 - 二进制文件未找到
    {
      original: "const msg = `language_server binary not found at:\\n${languageServer_1.LS_BINARY}\\n\\nPlease build set a valid location.`",
      translated: "const msg = `语言服务器二进制文件未找到：\\n${languageServer_1.LS_BINARY}\\n\\n请设置正确的文件路径。`"
    },
    {
      original: "await electron_1.dialog.showErrorBox('Binary not found', msg)",
      translated: "await electron_1.dialog.showErrorBox('文件未找到', msg)"
    },
    // WSL 发行版未找到警告对话框 (Antigravity 2.22.0+)
    {
      original: "title: 'WSL distro not found'",
      translated: "title: '未找到 WSL 发行版'",
      optional: true
    },
    {
      original: 'message: `The WSL distro "${WSL_DISTRO}" is no longer installed.`',
      translated: 'message: `WSL 发行版“${WSL_DISTRO}”已不再安装。`',
      optional: true
    },
    {
      original: "detail: 'Antigravity opened on Windows instead.'",
      translated: "detail: 'Antigravity 已改为在 Windows 本地打开。'",
      optional: true
    },
    // WSL 安装失败错误对话框 (Antigravity 2.22.0+)
    {
      original: 'const msg = `Failed to install the server into WSL distro "${WSL_DISTRO}":\\n${err.message}`',
      translated: 'const msg = `无法将服务器安装到 WSL 发行版“${WSL_DISTRO}”：\\n${err.message}`',
      optional: true
    },
    {
      original: "await electron_1.dialog.showErrorBox('WSL setup failed', msg)",
      translated: "await electron_1.dialog.showErrorBox('WSL 配置失败', msg)",
      optional: true
    },
    // 错误对话框 - 启动失败
    {
      original: "await electron_1.dialog.showErrorBox('Startup failed', msg)",
      translated: "await electron_1.dialog.showErrorBox('启动失败', msg)"
    },
    // macOS Dock 菜单 - 新建窗口
    {
      original: "label: 'New Window',\n                    click: () => (0, utils_1.createWindow)(url, storageManager)",
      translated: "label: '新建窗口',\n                    click: () => (0, utils_1.createWindow)(url, storageManager)"
    },
    // 系统托盘 - 无智能体运行
    {
      original: "label: 'No agents running'",
      translated: "label: '无智能体运行'"
    },
    // 系统托盘 - 打开应用
    {
      original: "label: `Open ${electron_1.app.getName()}`",
      translated: "label: `打开 ${electron_1.app.getName()}`"
    },
    // 系统托盘 - 退出
    {
      original: "label: 'Quit',\n                click: () => {",
      translated: "label: '退出',\n                click: () => {"
    },
    // 退出确认对话框
    {
      original: "buttons: ['Cancel', 'Quit']",
      translated: "buttons: ['取消', '退出']"
    },
    {
      original: "title: 'Confirm Quit'",
      translated: "title: '确认退出'"
    },
    {
      original: "message: 'Are you sure you want to quit?'",
      translated: "message: '确定要退出吗？'"
    },
    {
      original: "detail: 'There may be agents or background tasks running.'",
      translated: "detail: '可能有智能体或后台任务正在运行。'"
    },
    // 控制台消息 - 语言服务器（headless模式下可见）
    {
      original: "console.log('Language Server process is not running.')",
      translated: "console.log('语言服务器进程未运行。')"
    },
    {
      original: "console.log('-> Forwarded input to Language Server.')",
      translated: "console.log('-> 已将输入转发至语言服务器。')"
    },
  ],

  // --------------------------------------------------------------------------
  // menu.js - 应用程序菜单
  // --------------------------------------------------------------------------
  'menu.js': [
    // 文件菜单 - 新建窗口
    {
      original: "label: 'New Window'",
      translated: "label: '新建窗口'"
    },
    // 帮助菜单 - 文档
    {
      original: "label: 'Docs'",
      translated: "label: '文档'"
    },
    // WSL 菜单项 (Antigravity 2.22.0+)
    {
      original: "return { label: 'Connect to WSL', submenu };",
      translated: "return { label: '连接到 WSL', submenu };",
      optional: true
    },
    {
      original: "return { label: 'Reopen Locally', click: () => relaunchWithWslDistro('') };",
      translated: "return { label: '在本地重新打开', click: () => relaunchWithWslDistro('') };",
      optional: true
    },
    // 兼容中英文顶层菜单名称查找
    {
      original: "const submenuItem = appMenu.items.find((item) => item.label === submenuLabel);",
      translated: "const submenuItem = appMenu.items.find((item) => item.label === submenuLabel || (submenuLabel === 'File' && item.label === '文件') || (submenuLabel === 'Help' && item.label === '帮助'));",
      optional: true
    },
  ],

  // --------------------------------------------------------------------------
  // tray.js - 系统托盘
  // --------------------------------------------------------------------------
  'tray.js': [
    // 智能体运行状态
    {
      original: "(count > 0 ? `${count}` : 'No') +\n                    ' agent' +\n                    (count === 1 ? '' : 's') +\n                    ' running'",
      translated: "(count > 0 ? `${count} 个` : '无') +\n                    '智能体' +\n                    '' +\n                    '运行中'"
    },
  ],

  // --------------------------------------------------------------------------
  // updater.js - 自动更新（保留官方完整更新能力，不再屏蔽 checkForUpdates）
  // --------------------------------------------------------------------------
  'updater.js': [
    // 更新菜单项标签（枚举值）
    {
      original: 'MenuUpdateStep["CheckForUpdates"] = "Check for Updates"',
      translated: 'MenuUpdateStep["CheckForUpdates"] = "检查更新"'
    },
    {
      original: 'MenuUpdateStep["CheckingForUpdates"] = "Checking for Updates..."',
      translated: 'MenuUpdateStep["CheckingForUpdates"] = "正在检查更新..."'
    },
    {
      original: 'MenuUpdateStep["DownloadingUpdate"] = "Downloading Update..."',
      translated: 'MenuUpdateStep["DownloadingUpdate"] = "正在下载更新..."'
    },
    {
      original: 'MenuUpdateStep["RestartToUpdate"] = "Restart to Update"',
      translated: 'MenuUpdateStep["RestartToUpdate"] = "重启以更新"'
    },
    // 更新检查对话框
    {
      original: "title: 'Check for Updates'",
      translated: "title: '检查更新'"
    },
    {
      original: "message: 'No updates available'",
      translated: "message: '当前已是最新版本'"
    },
    {
      original: "buttons: ['OK']",
      translated: "buttons: ['确定']"
    },
  ],

  // --------------------------------------------------------------------------
  // loadingOverlay.js - 启动加载页面（2.22.0 改为纯 SVG 动画，旧版含文字）
  // --------------------------------------------------------------------------
  'loadingOverlay.js': [
    {
      original: 'Loading Antigravity',
      translated: '正在加载 Antigravity',
      optional: true
    },
  ],

  // --------------------------------------------------------------------------
  // ipcHandlers.js - IPC 处理器
  // --------------------------------------------------------------------------
  'ipcHandlers.js': [
    // WSL 路径映射错误与警告对话框 (Antigravity 2.22.0+)
    {
      original: "electron_1.dialog.showErrorBox('Cannot open folder', t.error)",
      translated: "electron_1.dialog.showErrorBox('无法打开文件夹', t.error)",
      optional: true
    },
    {
      original: "message: 'Folder is on the Windows filesystem'",
      translated: "message: '文件夹位于 Windows 文件系统中'",
      optional: true
    },
    // 工作区选择对话框标题
    {
      original: "title: 'Open workspace'",
      translated: "title: '打开工作区'"
    },
    // 多工作区选择对话框标题 (Antigravity 2.22.0+)
    {
      original: "title: 'Open workspaces'",
      translated: "title: '打开多个工作区'",
      optional: true
    },
    // 日志读取失败
    {
      original: "return `Failed to read logs: ${String(err)}`",
      translated: "return `读取日志失败: ${String(err)}`"
    },
  ],

  // --------------------------------------------------------------------------
  // wsl.js - WSL 环境支持与远程服务部署 (Antigravity 2.22.0+)
  // --------------------------------------------------------------------------
  'wsl.js': [
    {
      original: 'error: `This folder belongs to the WSL distro "${unc[1]}", but this window is connected to "${distro}".`',
      translated: 'error: `此文件夹属于 WSL 发行版“${unc[1]}”，但当前窗口连接的是“${distro}”。`',
      optional: true
    },
    {
      original: "warning: 'This folder is on the Windows filesystem. Accessing it from WSL (via /mnt) can be slow — for best performance keep projects inside the WSL filesystem.'",
      translated: "warning: '此文件夹位于 Windows 文件系统中。从 WSL（通过 /mnt）访问可能会较慢——为获得最佳性能，建议将项目保存在 WSL 文件系统内。'",
      optional: true
    },
    {
      original: 'return { error: `This location cannot be opened in WSL: ${winPath}` };',
      translated: 'return { error: `无法在 WSL 中打开此位置: ${winPath}` };',
      optional: true
    },
    {
      original: "onStatus?.('Downloading the Antigravity binary…');",
      translated: "onStatus?.('正在下载 Antigravity 二进制文件…');",
      optional: true
    },
    {
      original: "onStatus?.(`Installing into ${distro}…`);",
      translated: "onStatus?.(`正在安装到 ${distro}…`);",
      optional: true
    },
  ],

  // --------------------------------------------------------------------------
  // provisionSplash.js - WSL 首次部署启动画面 (Antigravity 2.22.0+)
  // --------------------------------------------------------------------------
  'provisionSplash.js': [
    {
      original: "<div>Setting up WSL: ${escapeHtml(distro)}</div>",
      translated: "<div>正在配置 WSL: ${escapeHtml(distro)}</div>",
      optional: true
    },
  ],

  // --------------------------------------------------------------------------
  // languageServer.js - 语言服务器
  // --------------------------------------------------------------------------
  'languageServer.js': [
    // 启动超时错误
    {
      original: "reject(new Error(`Timeout: language server did not report its port within ${LS_STARTUP_TIMEOUT_MS / 1000}s`))",
      translated: "reject(new Error(`超时：语言服务器未能在 ${LS_STARTUP_TIMEOUT_MS / 1000} 秒内报告端口`))"
    },
    // 意外退出错误
    {
      original: "reject(new Error(`Language server exited unexpectedly (code=${code}, signal=${signal})`))",
      translated: "reject(new Error(`语言服务器意外退出（退出码=${code}，信号=${signal}）`))"
    },
    // OAuth 授权提示（headless 模式下可见）
    {
      original: "console.log('  Please visit the following URL to authorize.')",
      translated: "console.log('  请访问以下网址进行授权。')"
    },
    {
      original: "console.log('  After authorizing, paste the authorization code below.')",
      translated: "console.log('  授权完成后，请在下方粘贴授权码。')"
    },
    // 崩溃日志
    {
      original: "console.error(`\\nLanguage server crashed: ${summary}`)",
      translated: "console.error(`\\n语言服务器崩溃: ${summary}`)"
    },
    {
      original: "console.error('--- Crash Stack Trace ---')",
      translated: "console.error('--- 崩溃堆栈跟踪 ---')"
    },
    {
      original: "console.error('--- End Crash Stack trace ---')",
      translated: "console.error('--- 崩溃堆栈跟踪结束 ---')"
    },
    // 最大重启次数
    {
      original: "const msg = `Language server crashed ${MAX_RESTARTS} times in a row. Giving up.`",
      translated: "const msg = `语言服务器已连续崩溃 ${MAX_RESTARTS} 次，已放弃重启。`"
    },
    // 重启尝试
    {
      original: "console.log(`Attempting restart ${_restartCount}/${MAX_RESTARTS} in ${RESTART_COOLDOWN_MS / 1000}s...`)",
      translated: "console.log(`正在尝试重启 ${_restartCount}/${MAX_RESTARTS}，将在 ${RESTART_COOLDOWN_MS / 1000} 秒后执行...`)"
    },
    // 重启失败
    {
      original: "console.error(`Failed to restart language server: ${err.message}`)",
      translated: "console.error(`重启语言服务器失败: ${err.message}`)"
    },
    // 正在关闭
    {
      original: "console.log('Shutting down language server…')",
      translated: "console.log('正在关闭语言服务器…')"
    },
    // 强制终止
    {
      original: "console.warn(`Language server (PID ${pid}) did not exit gracefully within 5s. Sending SIGKILL.`)",
      translated: "console.warn(`语言服务器（PID ${pid}）未能在5秒内正常退出，正在强制终止。`)"
    },
    // LS stamp 获取失败
    {
      original: "console.error('Failed to get LS stamp:', error)",
      translated: "console.error('获取语言服务器版本标记失败:', error)"
    },
  ],

  // --------------------------------------------------------------------------
  // ideInstall/wizardHtml.js - IDE 安装向导 HTML 页面
  // --------------------------------------------------------------------------
  'ideInstall/wizardHtml.js': [
    {
      original: '<title>Welcome to Antigravity</title>',
      translated: '<title>欢迎使用 Antigravity</title>'
    },
    {
      original: '>Setting up…</div>',
      translated: '>正在准备…</div>'
    },
    {
      original: 'alt="Antigravity Icon"',
      translated: 'alt="Antigravity 图标"'
    },
    {
      original: '<h1>Welcome to the new Antigravity!</h1>',
      translated: '<h1>欢迎使用全新 Antigravity！</h1>'
    },
    {
      original: "Antigravity has been redesigned to put agents first with new capabilities. If you'd still like a code editor, you can download it as a separate app named <b>Antigravity IDE</b>.",
      translated: 'Antigravity 已全新设计，以智能体为核心并带来全新功能。如果您仍需要代码编辑器，可以单独下载 <b>Antigravity IDE</b>。'
    },
    {
      original: '<span>Download the Antigravity IDE</span>',
      translated: '<span>下载 Antigravity IDE</span>'
    },
    {
      original: '>Explore the new Antigravity</button>',
      translated: '>开始探索全新 Antigravity</button>'
    },
  ],

  // --------------------------------------------------------------------------
  // ideInstall/constants.js - IDE 安装常量
  // --------------------------------------------------------------------------
  'ideInstall/constants.js': [
    {
      original: "throw new Error(`Failed to fetch IDE download URL: ${response.status} ${response.statusText}`)",
      translated: "throw new Error(`获取 IDE 下载地址失败: ${response.status} ${response.statusText}`)"
    },
    {
      original: "throw new Error(`No download URL found in the auto-updater response for platform: ${platformKey}`)",
      translated: "throw new Error(`在自动更新响应中未找到当前平台的下载地址: ${platformKey}`)"
    },
  ],

  // --------------------------------------------------------------------------
  // ideInstall/service.js - IDE 安装服务
  // --------------------------------------------------------------------------
  'ideInstall/service.js': [
    {
      original: "reject(new Error('Too many redirects'))",
      translated: "reject(new Error('重定向次数过多'))"
    },
    {
      original: "throw new Error('No .app bundle found in the downloaded archive')",
      translated: "throw new Error('在下载的归档文件中未找到 .app 应用包')"
    },
    {
      original: "throw new Error(`Unsupported platform: ${process.platform}`)",
      translated: "throw new Error(`不支持的操作系统平台: ${process.platform}`)"
    },
  ],

  // --------------------------------------------------------------------------
  // storage.js - 存储模块
  // --------------------------------------------------------------------------
  'storage.js': [
    {
      original: "console.error('Error reading storage items:', e)",
      translated: "console.error('读取存储数据出错:', e)"
    },
    {
      original: "console.error('Error updating storage items:', e)",
      translated: "console.error('更新存储数据出错:', e)"
    },
  ],

  // --------------------------------------------------------------------------
  // utils.js - 工具函数
  // --------------------------------------------------------------------------
  'utils.js': [
    {
      original: "console.error('Error reading theme mode:', e)",
      translated: "console.error('读取主题模式出错:', e)"
    },
    {
      original: "console.error(`Failed to create node wrapper: ${err}`)",
      translated: "console.error(`创建 Node 包装器失败: ${err}`)"
    },
  ],
};

Object.defineProperty(translations, 'MAIN_PROCESS_I18N_HOOK', {
  value: MAIN_PROCESS_I18N_HOOK,
  enumerable: false,
  writable: false,
});

module.exports = translations;
