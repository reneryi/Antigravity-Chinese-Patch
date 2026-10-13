# Antigravity 中文汉化补丁 (v3.0 全量自愈版)

![Version](https://img.shields.io/badge/版本-v3.1.0-blue)
![Antigravity](https://img.shields.io/badge/适配版本-Antigravity%202.12.x%20~%202.23.0%2B-brightgreen)
![Platform](https://img.shields.io/badge/平台-Windows%2010%2F11-0078D6)
![Dictionary](https://img.shields.io/badge/词条规模-4860%2B%20精确%20%7C%20480%2B%20动态正则-orange)

面向 [Google Antigravity](https://antigravity.google/) 桌面端（Windows 版）打造的**全量、高性能、跨版本自动自愈型中文汉化补丁**。无需安装 Node.js 或任何外部依赖，双击即可在 **50 毫秒**内完成内存级极速安装，并在 Antigravity 通过内置升级或**官网下载安装包覆盖更新**后自动恢复汉化。

---

## 📥 一、如何下载（任选一种方式）

### 方式 1：直接下载发布版压缩包（⭐ 最推荐普通用户）
1. 点击进入本仓库右侧或顶部的 **[Releases 发布页面](https://github.com/reneryi/Antigravity-Chinese-Patch/releases/latest)**。
2. 在页面下方的 **Assets（资源）** 列表中，点击下载最新 `.zip` 发布包。

### 方式 2：在 GitHub 网页直接打包下载
1. 在本仓库主页右上角，点击绿色的 **`<> Code`** 按钮。
2. 在弹出菜单中点击 **`Download ZIP`** 即可下载完整源码包。

### 方式 3：使用 Git 命令行克隆（适合开发者）
```bash
git clone https://github.com/reneryi/Antigravity-Chinese-Patch.git
```

---

## 🚀 二、安装与使用方法（只需 3 步）

> **提示**：本补丁直接调用 Antigravity 自带的运行时环境，**电脑上不需要安装 Node.js**，通常也**不需要管理员权限**。

1. **完整解压文件**  
   将下载好的 `.zip` 压缩包**完整解压**到任意文件夹中。  
   ⚠️ *注意：请勿直接在 WinRAR / 7-Zip / 系统压缩包预览窗口中双击运行脚本，必须先解压出来！*

2. **双击运行安装脚本**  
   在解压后的文件夹中，找到并双击运行 **`install_patch.bat`**。  
   - 支持在 Antigravity 开启状态下直接安装（脚本内置 Windows 文件句柄避让机制）。
   - 全程在内存中完成解包与重打包，耗时仅需约 **50 毫秒**。

3. **重启 Antigravity 生效**  
   当窗口显示 **`✓ 汉化补丁 v3.0 安装成功！`** 后，按任意键关闭窗口，**完全退出并重新启动一次 Antigravity**（注意：如果系统右下角托盘有图标，请右键退出后再重新打开，或直接在软件内重启），即可看到完整的简体中文界面！

---

## 🔄 三、官方版本更新与自动自愈说明（支持官网下载覆盖安装）

很多汉化补丁最大的痛点是：**每次从官网下载新版本安装包覆盖安装后汉化就会失效，需要手动再跑一次脚本**。本补丁彻底解决了这一问题：

1. **完整兼容官网安装包覆盖更新与内置更新**：不会屏蔽 Antigravity 的更新机制，您可以随时从官网下载最新安装程序直接覆盖升级。
2. **WMI 独立进程脱钩 + 1.5 秒极速自愈守护**：
   - 安装补丁时会通过 Windows WMI (`Win32_Process.Create`) 启动完全独立于终端会话的 `wscript.exe` 静默巡检进程（位于 `%APPDATA%\AntigravityChinesePatch`，**纯 ASCII 脚本 100% 免疫代码页差异，0% CPU 占用，不锁定 `Antigravity.exe` 进程**）。
   - 当您运行官网下载的安装程序更新 Antigravity 时，守护服务会在安装程序写入 `resources\app.asar` 后的 **1.5 秒内**（趁安装器还在解压外置组件、尚未启动客户端之前）自动同步最新词库、刷新 `.backup` 备份并在 **150ms 内完成新版本重汉化**，安装结束打开软件即是全中文界面！
3. **自动同步工作区最新词库**：守护服务会自动记录首次安装的源码目录，若您更新了本地词库文件，自愈时会自动拉取最新词库。

---

## 🧹 四、如何卸载（恢复英文原版）

如果您想恢复 Antigravity 的原始英文界面：

1. 打开补丁文件夹，双击运行 **`uninstall_patch.bat`**。
2. 脚本会自动完成以下清理工作：
   - 停止并移除后台版本自愈守护进程与开机自启注册表项；
   - 校对备份版本号（防止旧版本备份误降级新版程序）；
   - 将 `resources\app.asar` 完整恢复为官方原始英文包。
3. 看到 **`✓ 汉化补丁已彻底卸载！`** 后，重启 Antigravity 即可恢复英文界面。

---

## ✨ 五、核心特性与汉化覆盖范围

### 1. 全方位接近 100% 文本覆盖
- **Web 前端全界面（[`i18n_inject.js`](i18n_inject.js)）**：
  - 内置 **4,861 条精确词条** + **480+ 条动态正则模板** + **65 条长句局部规则**。
  - 全面覆盖：侧边栏导航、工作区/项目管理、所有输入框占位符（`placeholder` / `aria-label`）、对话流与工具调用状态、设置中心、快捷键面板、定时自动化任务、模型配额与 AI 点数明细、Token 预算统计等。
- **插件市场、98 项 MCP 服务目录与 351 项本地技能/工具 100% 汉化**：
  - **添加 MCP 服务弹窗**：完整覆盖官方商店全部 **98 个可选 MCP 服务描述**（含 Cloud Audit Manager、Splunk、Wiz、Neon、Neo4j、mabl、Miro、Parallel Search、Grafana Cloud、Exa、CrowdStrike、Vercel、FactSet、Relativity、Daloopa、Finnhub、S&P Global、LSEG、Harvey、Guidepoint、Fiscal.ai、Docusign、LegalZoom、NetDocuments、iManage、Salesforce、Courtroom5、Opsera、Forge、Endor Labs、Canva 等）及 **107 项 MCP 配置参数说明**。
  - **自定义与插件市场**：完整覆盖 `~/.gemini` 下全部 **351 项**官方内置技能、已安装/未安装市场插件描述（Google Workspace、Build with Google、Google Sheets/Slides/Calendar/Docs/Drive、BigQuery Graph、Data Agent Kit、Spark on Google Cloud、Firebase、Flutter、Android CLI 等）、**34 条插件推荐提示词**以及已安装 MCP 服务的 **70 项子工具详细说明**。
- **原生右键菜单与系统通知（IPC 级实时拦截）**：
  - 拦截渲染进程发往主进程的 `window:show-context-menu` 与 `notification:send` 通道，使文件树、标签页、对话列表及编辑区的**系统原生右键菜单**与**桌面通知**全部实时显示为中文。
- **Electron 壳层与 WSL 模块双层汉化（[`translations.js`](translations.js)）**：
  - 静态源码替换 + 主进程 `Menu.buildFromTemplate` / `dialog` 动态 API 钩子双保险，全面覆盖系统托盘、退出确认框、更新提示框以及 `Antigravity 2.23.0+` 的 **WSL 发行版连接与远程部署启动画面**。

### 2. 零误伤保护与极致性能
- **严格保护代码与终端区域**：自动识别并跳过 `.monaco-editor`（代码编辑器）、`.xterm` / `.terminal`（终端输出）、`<code>` / `<pre>` 代码块以及模型名称选择器，同时支持翻译 `<input>` / `<textarea>` 的 `placeholder` 占位提示而绝不改动用户输入内容。
- **零卡顿渲染架构**：采用 `Map` LRU 缓存 + 文本节点 `_agyOriginal` $O(1)$ 否定标记缓存 + DOM 写入期自动断开 `MutationObserver` + `requestAnimationFrame` 帧级合并调度，流式输出长篇代码与对话时如丝般顺滑。

---

## 🛠️ 六、高级命令行用法与开发者工具

如果您是开发者或希望对补丁进行自定义调试，可以在终端（PowerShell / CMD）中使用以下命令：

```powershell
# 1. 纯内存验证模式（仅在内存中模拟打补丁并校验所有断言，不修改任何安装文件）
.\install_patch.bat --dry-run

# 2. 仅安装汉化补丁，不安装后台版本自愈守护服务
node .\install_patch.js --no-daemon

# 3. 运行自动化回归测试套件（76 项精确/正则/输入框属性/防误伤/主进程钩子断言）
node .\test_i18n.js

# 4. 运行全量词条覆盖率审计（自动连接运行中的 language_server 提取前端包并扫描本地技能与 MCP 工具）
node .\extract_strings.js
```

### 仓库文件结构说明

| 文件名 | 说明 |
| :--- | :--- |
| [`install_patch.bat`](install_patch.bat) | Windows 一键安装入口（纯 ASCII 编码，杜绝 CMD 代码页乱码） |
| [`install_patch.js`](install_patch.js) | 纯内存 ASAR 解析与重打包核心安装器（耗时 ~50ms） |
| [`auto_heal_daemon.js`](auto_heal_daemon.js) | 跨版本更新后台静默自愈服务模块（支持官网安装包覆盖更新毫秒级自愈） |
| [`translations.js`](translations.js) | Electron 主进程静态翻译映射表与 `MAIN_PROCESS_I18N_HOOK` 动态 API 钩子 |
| [`i18n_inject.js`](i18n_inject.js) | Web 前端高性能翻译引擎与全量词库（4,861 精确 + 480+ 正则） |
| [`uninstall_patch.bat`](uninstall_patch.bat) | Windows 一键卸载入口 |
| [`uninstall_patch.js`](uninstall_patch.js) | 卸载脚本（清理自愈服务 + 防降级版本校验 + 恢复英文原包） |
| [`extract_strings.js`](extract_strings.js) | 英文词条自动提取与覆盖率审计工具 |
| [`test_i18n.js`](test_i18n.js) | 模拟 DOM 与架构完整性单元测试脚本 |
| [`使用说明.txt`](使用说明.txt) | 随压缩包附带的简明纯文本使用指南 |

---

## ❓ 七、常见问题排查 (FAQ)

1. **双击 `install_patch.bat` 提示“未找到 Antigravity 安装文件”？**  
   请确认您的 Antigravity 安装在 Windows 默认路径 `%LOCALAPPDATA%\Programs\antigravity`。如果安装在自定义盘符，可修改 [`install_patch.js`](install_patch.js) 顶部的 `ANTIGRAVITY_DIR` 路径。

2. **安装成功并重启后，界面仍然是英文？**  
   这是因为关闭窗口时 Antigravity 可能最小化到了系统右下角托盘（后台仍在运行旧进程）。请右键点击任务栏右下角托盘中的 Antigravity 图标选择 **Quit / 退出**，然后再重新打开软件即可。

3. **双击 `.bat` 文件一闪而过或报错？**  
   请检查是否还没有解压 `.zip` 压缩包就直接双击了里面的 `.bat` 文件。请务必将所有文件完整解压到同一个文件夹后再运行。

---

## 📄 开源协议

本项目基于 MIT License 开源，仅供个人学习与本地界面本地化交流使用。`Antigravity` 品牌名称及相关程序归 Google 所有。
