/**
 * Antigravity 前端中文翻译注入脚本 (v3.0 - 适配 Antigravity 2.22.0+ 全量词库与高性能引擎)
 *
 * 核心特性：
 * 1. 全量融合词库：4,070+ 精确词条 + 390+ 动态正则规则 + 跨节点上下文规则
 *    覆盖 Electron 壳层、Web 前端、内置/插件技能 YAML 描述及 2.22.0 最新功能
 * 2. 高性能零卡顿架构：
 *    - Map LRU 翻译结果缓存 + DOM 节点 _agyOriginal 否定标记缓存（二次扫描 O(1) 短路）
 *    - 修改 DOM 时自动断开/重连 MutationObserver，彻底阻断自激死循环
 *    - requestAnimationFrame 批量合并节点更新 + pointerenter 悬浮气泡瞬时捕获
 * 3. 零误伤安全边界：
 *    - 严格保护 Monaco Editor 代码区、Xterm 终端、代码块及模型选择器，绝不污染用户代码
 *    - 标点符号后缀与快捷键后缀自动剥离识别、多句全句守恒翻译
 */

(() => {
'use strict';

if (globalThis.__ANTIGRAVITY_ZH_PATCH_LOADED__) {
  return;
}
globalThis.__ANTIGRAVITY_ZH_PATCH_LOADED__ = true;

// ============================================================================
// 1. 精确翻译词表 (EXACT_TRANSLATIONS: 4179 条)
// ============================================================================

const EXACT_TRANSLATIONS = {
  "Setting up WSL": "正在配置 WSL",
  ", or": "，或",
  ", or ": "，或 ",
  "? This removes it from your config directory.": "吗？这将从您的配置目录中将其移除。",
  "\"Always Proceed\"": "“总是直接继续”",
  "(Archived)": "（已归档）",
  "+ Add folder": "+ 添加文件夹",
  "+ Add Folder": "+ 添加文件夹",
  "+ Add Hook": "+ 添加钩子",
  "+ Add Project Folder": "+ 添加项目文件夹",
  "+ New": "+ 新建",
  "+ New Chat": "+ 新建对话",
  "1 agent running": "1 个正在运行的智能体",
  "1 Comment": "1 条评论",
  "2. Make sure that your selected workspace is synced to head. This ensures that the installed skills are available in your workspace.": "2. 请确保您所选的工作区已同步至最新提交（Head）。这可确保安装的技能在您的工作区中可用。",
  "A copy of the workspace snapshot recorded at this step.": "在此步骤记录的工作区快照副本。",
  "A full copy of this workspace, uncommitted changes included.": "此工作区的完整副本，包含未提交的更改。",
  "A group with this name already exists.": "已存在同名分组。",
  "A new version is available.": "发现新版本可用。",
  "A nickname for identifying this application in the companion website. Changing this will restart the connection.": "用于在配套网站中标识此应用程序的昵称。更改此项将重启连接。",
  "A shell setup script run before every command the agent executes in this project. Overrides the global script.": "在此项目中智能体每次执行命令前运行的 Shell 初始化脚本。将覆盖全局脚本。",
  "A shell setup script run before every command the agent executes.": "智能体每次执行命令前运行的 Shell 初始化脚本。",
  "A snapshot was saved before running. To restore your previous output:": "运行前已保存快照。若要恢复之前的输出：",
  "Aborted": "已中止",
  "About": "关于",
  "about 1 hour": "约 1 小时",
  "About Antigravity": "关于 Antigravity",
  "Accent": "强调色",
  "Accept": "接受",
  "Accept all": "全部接受",
  "Accept Changes": "接受更改",
  "Accept Step": "接受此步骤",
  "Accept Suggestion": "接受建议",
  "Account": "账户",
  "Account Details": "账户详情",
  "Action": "操作",
  "Action required": "需要操作",
  "Action Required": "需要采取操作",
  "Actions": "操作",
  "Active": "活跃",
  "Active Browser page": "活动浏览器页面",
  "Active Browser pages": "活动浏览器页面列表",
  "Activity Bar": "活动栏",
  "Actual behavior": "实际行为",
  "Actuation": "操作执行",
  "Add": "添加",
  "Add a message...": "输入消息...",
  "Add Automation": "添加自动化",
  "Add Comment": "添加评论",
  "Add context": "添加上下文",
  "Add Context": "添加上下文",
  "Add context browser": "添加到上下文",
  "Add Context Browser": "添加到上下文",
  "Add Context Picker": "添加上下文",
  "Add Context Server": "添加上下文服务",
  "Add Context Servers": "添加上下文服务",
  "Add context...": "添加上下文...",
  "Add Context...": "添加上下文...",
  "Add Denied Path": "添加禁止路径",
  "Add folder": "添加文件夹",
  "Add Folder": "添加文件夹",
  "Add Hook Card": "添加钩子配置卡片",
  "Add inline comment": "添加内联批注",
  "Add project folder": "添加项目文件夹",
  "Add Project Folder": "添加项目文件夹",
  "Add recent remote workspace": "添加最近使用的远程工作区",
  "Add terminal": "添加终端",
  "Add Terminal": "添加终端",
  "Add to Chat": "添加到对话",
  "Add to Chat/Quote": "添加到对话 / 引用",
  "Add to context": "添加到上下文",
  "Add to Context": "添加到上下文",
  "Add Workspace": "添加工作区",
  "Added (Staged)": "已添加 (暂存)",
  "Adding...": "正在添加...",
  "Address bar": "地址栏",
  "Advanced": "高级",
  "Advanced Search": "高级搜索",
  "Advanced Settings": "高级设置",
  "Agent": "智能体",
  "Agent Auto-Fix Lints": "智能体自动修复 Lint 代码规范错误",
  "Agent Behavior": "智能体行为",
  "Agent can retrieve console logs from the browser and return it for further processing.": "智能体可获取浏览器控制台日志并返回以作进一步处理。",
  "Agent cannot modify files outside of the workspace in strict mode.": "在严格模式下，智能体不能修改工作区以外的文件。",
  "Agent Edits": "智能体代码编辑",
  "Agent encountered an internal error.": "智能体遇到了内部错误。",
  "Agent finished": "智能体已完成",
  "Agent Hooks Configuration": "智能体钩子配置",
  "Agent Host Address": "智能体主机地址",
  "Agent needs permission to execute JavaScript": "智能体需要获准才能执行 JavaScript",
  "Agent options": "智能体选项",
  "Agent response": "智能体回复",
  "Agent Script": "智能体脚本",
  "Agent Script Command Configuration": "智能体脚本命令配置",
  "Agent Settings": "智能体设置",
  "Agent Stopped": "智能体已停止",
  "AI Credits Used to Generate Response": "生成回复所消耗的 AI 积分",
  "All": "全部",
  "All automations run as Flash": "所有自动化任务均以 Flash 模型运行",
  "All automations run as Flash.": "所有自动化任务均以 Flash 模型运行。",
  "All changes since origin/main": "自 origin/main 以来的全部更改",
  "All changes since origin/main.": "自 origin/main 以来的全部更改。",
  "All changes since origin/master": "自 origin/master 以来的全部更改",
  "All conversations": "全部会话",
  "All Files": "所有文件",
  "All plugins run as Flash": "所有插件均以 Flash 模型运行",
  "All plugins run as Flash.": "所有插件均以 Flash 模型运行。",
  "All tools (*)": "所有工具 (*)",
  "Alphabetical (A-Z)": "按字母排序（A-Z）",
  "Also includes": "也包含",
  "Also includes global settings when working in this project": "在此项目中工作时也包含全局设置",
  "Also includes global settings when working in this project.": "在此项目中工作时也包含全局设置。",
  "Alt+Enter On empty prompt, sends next in queue": "Alt+Enter 在输入框为空时发送队列中的下一条消息",
  "Alt+Enter Queues after the turn": "Alt+Enter 轮次结束后进入排队",
  "Alt+Enter Sends immediately": "Alt+Enter 立即发送",
  "Alternatively, request the agent to add the skills:": "或者，请求智能体添加所需技能：",
  "Always": "始终",
  "Always proceed": "总是直接继续",
  "Always Proceed": "总是继续",
  "Always Require Approval": "始终需要审批",
  "Always run": "始终运行",
  "Amend": "修补提交 (Amend)",
  "Amend succeeded": "修改提交成功",
  "An error occurred while checking the port. Please try again.": "检查端口时发生错误，请重试。",
  "An error occurred while submitting your feedback. Please try again.": "提交反馈时发生错误，请重试。",
  "Analyzed": "已分析",
  "Analyzed content": "已分析内容",
  "Analyzed Task Log": "已分析任务日志",
  "Analyzing": "正在分析",
  "Analyzing content": "正在分析内容",
  "Analyzing Task Log": "正在分析任务日志",
  "Analyzing...": "正在分析...",
  "and select": "并选择",
  "Antigravity Agent": "Antigravity 智能体",
  "Antigravity would like to use the browser.": "Antigravity 请求使用浏览器。",
  "Any error messages": "任何错误消息",
  "Any error messages seen when trying to log in": "登录时看到的任何错误信息",
  "Any relevant information": "任何相关信息",
  "API Endpoint": "API 端点接口",
  "API Key": "API 密钥",
  "API Key is configured": "API 密钥已配置",
  "App": "应用",
  "App Data Directory": "应用数据保存路径",
  "App Settings": "应用设置",
  "App version": "应用版本",
  "Application": "应用",
  "Apply": "应用",
  "Approve": "批准",
  "Approved": "已批准",
  "Archive": "归档",
  "Archive / Restore": "归档 / 恢复",
  "Archive conversation": "归档对话",
  "Archive Conversation": "归档对话",
  "Archive Environment": "归档环境",
  "Archive project": "归档项目",
  "Archive this conversation": "归档此会话",
  "Archive This Conversation": "归档此会话",
  "Archive Workspace": "归档工作区",
  "Archived": "已归档",
  "Are you sure you want to delete this conversation? This action cannot be undone.": "确定要删除此会话吗？此操作无法撤销。",
  "Are you sure you want to delete this hook card?": "确定要删除此钩子配置卡片吗？",
  "Are you sure you want to delete this project?": "您确定要删除此项目吗？",
  "Are you sure you want to mark 1 conversation as read? This action cannot be undone.": "您确定要将 1 个会话标记为已读吗？此操作无法撤销。",
  "Are you sure you want to quit?": "确定要退出吗？",
  "around": "大约",
  "Artifact": "产物",
  "Artifact Comments": "产物评论",
  "Artifacts": "产物文档",
  "Ask a quick question without interrupting the main conversation.": "快速提问而不中断主对话。",
  "At mention code block": "在对话中引用代码块",
  "At Mention Code Block": "在对话中引用代码块",
  "Attach a screenshot": "附上屏幕截图",
  "Attach a screenshot (optional)": "附加截图（可选）",
  "Attach Antigravity server logs": "附加 Antigravity 服务器日志",
  "Attach screenshot (optional)": "附上屏幕截图（可选）",
  "Attach screenshots": "附上屏幕截图",
  "Audio File": "音频文件",
  "Auth and Billing": "身份验证与结算",
  "Authenticated": "已认证",
  "Authenticated via Enterprise Gateway": "已通过企业网关认证",
  "Authenticating...": "正在认证...",
  "Authentication Required": "需要身份认证",
  "Auto (detected)": "自动 (已检测)",
  "Auto Check for Updates": "自动检查更新",
  "Auto Update": "自动更新",
  "Auto-Approve Safe Actions": "自动批准安全操作",
  "Auto-Captured": "自动捕获",
  "Auto-Expand Changes Overview": "自动展开代码更改概览",
  "Auto-Open Edited Files": "自动打开已编辑文件",
  "Automatic": "自动",
  "Automatic Check for Updates": "自动检查更新",
  "Automatically check for updates": "自动检查更新",
  "Automatically download and install updates": "自动下载并安装更新",
  "Automatically expand the Changes Overview toolbar when the agent finishes generating a response.": "当智能体完成回复生成时，自动展开代码更改概览工具栏。",
  "Automatically prompt you to restart the app when a new update is available. When disabled, you can check for updates manually from the app menu.": "当有新版本可用时，自动提示您重启应用程序完成更新。禁用后，您仍可随时从应用菜单手动检查更新。",
  "automation": "自动化任务",
  "Automation": "自动化",
  "Automations": "自动化",
  "Autonomous": "自主模式",
  "Autonomous Execution": "自主执行模式",
  "Autonomous mode": "自主模式",
  "Autonomous Mode": "自主模式",
  "Autonomous mode active: the agent works independently and does not ask questions or request new permissions.": "自主模式已激活：智能体将独立工作，不会提问或请求新权限。",
  "Autopush": "Autopush 自动推送版",
  "Awaiting Authentication...": "正在等待认证...",
  "Back": "返回",
  "Back to home": "返回首页",
  "Background": "背景色",
  "Bad clarification": "澄清提问不当",
  "bad response": "不佳回答",
  "Bad response": "不佳回答",
  "Bad Response": "较差回复",
  "BAD RESPONSE": "不佳回答",
  "Balanced": "平衡模式",
  "Base URL": "基础请求 URL",
  "Battle mode": "对决模式",
  "Battle Mode": "对决模式",
  "Battle Mode Infos": "对决模式信息",
  "Battle Mode Overrides": "对决模式参数重载",
  "Battle Mode requires at least one commit in the Git repository": "对决模式要求 Git 仓库中至少包含一次提交",
  "Battle Mode requires at least one commit in the Git repository.": "对决模式要求 Git 仓库中至少包含一次提交。",
  "Best of N": "多候选对决",
  "Best of N mode": "多候选对决模式",
  "Best of N Mode": "多候选对决模式",
  "Best of N mode is not available": "多候选对决模式不可用",
  "Best-of-N": "多候选对决 (Best-of-N)",
  "Best-of-N Ended": "多选最优模式已结束",
  "Best-of-N mode": "多候选对决模式",
  "Best-of-N Mode": "多候选对决模式",
  "Best-of-N Started": "多选最优模式已开始",
  "Beta": "测试版 (Beta)",
  "Better code quality": "代码质量更高",
  "Better instruction following": "更好地遵循了指令",
  "Binary file": "二进制文件",
  "Block all browser JavaScript execution": "禁止执行所有浏览器 JavaScript 脚本",
  "Block all browser JavaScript execution.": "禁止执行所有浏览器 JavaScript 脚本。",
  "Blocked": "已阻止",
  "Blocked on Your Input": "等待您的输入",
  "Blocked Terminal Commands": "已阻止的终端命令",
  "Blocked, needs input": "已阻止，需要输入",
  "Both are bad": "两项均表现不佳",
  "Both are good": "两项均表现优秀",
  "Both were bad": "两项均表现不佳",
  "Both were good": "两项均表现优秀",
  "Branch": "分支",
  "Branch Changes": "分支更改",
  "Branch main": "分支 main",
  "Branch name can only contain letters, numbers, underscores, dashes, dots, and slashes": "分支名称只能包含字母、数字、下划线、横线、点和斜杠",
  "Browse": "浏览",
  "Browse and enable plugins from the Build With Google catalog.": "浏览并启用“使用 Google 构建”目录中的插件。",
  "Browse the Marketplace": "浏览插件市场",
  "Browser": "浏览器",
  "Browser Actuation Rules": "浏览器操作规则",
  "Browser Agent Settings": "浏览器智能体设置",
  "Browser Automation": "浏览器自动化",
  "Browser Launch Args": "浏览器启动参数",
  "Browser Settings": "浏览器设置",
  "Browser settings have moved": "浏览器设置已迁移",
  "Browser settings have moved to the Browser section of General settings": "浏览器设置已迁移至“通用设置”中的“浏览器”板块",
  "Browser settings have moved to the Browser section of General settings.": "浏览器设置已迁移至“通用设置”中的“浏览器”板块。",
  "Browser settings have moved to the Browser section of General settings. Go to General settings": "浏览器设置已迁移至“通用设置”中的“浏览器”板块。前往通用设置",
  "Browser settings have moved to the Browser section of General settings. Go to General settings.": "浏览器设置已迁移至“通用设置”中的“浏览器”板块。前往通用设置。",
  "Browser task": "浏览器任务",
  "Browser Task": "浏览器任务",
  "Browser tools (browser_.*)": "浏览器工具 (browser_.*)",
  "Browser tools are disabled in the Antigravity Android desktop app.": "浏览器工具在 Antigravity Android 桌面应用中已禁用。",
  "Browser tools are not available in the Antigravity Android desktop app.": "浏览器工具在 Antigravity Android 桌面应用中不可用。",
  "Browser User Profile Path": "浏览器用户配置文件路径",
  "Browser Viewport Height": "浏览器视口高度",
  "Bug Report": "问题报告",
  "Build applications with the Gemini Interactions API and Live API including text generation, multi-turn chat, streaming, function calling, managed agents, and real-time audio and video.": "使用 Gemini Interactions API 和 Live API 构建应用，包括文本生成、多轮对话、流式传输、函数调用、托管智能体以及实时音视频。",
  "Build With Google Plugins": "使用 Google 插件构建",
  "Building": "正在构建",
  "Built In": "内置",
  "Built-in Skills": "内置技能",
  "Bundled With the App": "应用内置随附",
  "By step type": "按步骤类型",
  "By using this app, you agree to its": "使用本应用即表示您同意其",
  "By using this app, you agree to its Terms of Service": "使用本应用即表示您同意其服务条款",
  "Bypass Proxy For": "以下地址不使用代理",
  "Cache": "缓存",
  "Cancel": "取消",
  "Cancel (Cmd+D)": "取消 (Cmd+D)",
  "Cancel (Ctrl+D)": "取消 (Ctrl+D)",
  "Cancel All Tasks": "取消所有任务",
  "Cancel questionnaire": "取消问卷",
  "Cancel questionnaire and stop the agent": "取消问卷并停止智能体",
  "Cancel recording": "取消录制",
  "Cancel step": "取消步骤",
  "Cancel Step": "取消步骤",
  "Cancel task": "取消任务",
  "Cancel Task": "取消任务",
  "Canceled": "已取消",
  "Canceling": "正在取消",
  "Candidate": "候选方案",
  "Candidate 1": "候选方案 1",
  "Candidate 2": "候选方案 2",
  "Candidate A": "候选方案 A",
  "Candidate B": "候选方案 B",
  "Candidate C": "候选方案 C",
  "Candidates": "候选方案",
  "Cannot parse folder URI.": "无法解析文件夹 URI。",
  "Cannot reroll a turn that was cleared to save space": "无法重新生成为节省空间已清除的轮次",
  "Cannot revert messages before or at the point where Best of N mode was triggered": "无法撤回触发多候选对决模式 (Best-of-N) 之前或当时的消息",
  "Cannot revert messages with artifact comments": "无法撤回包含产物评论的消息",
  "Cannot revert messages with file diff comments": "无法撤回包含文件差异评论的消息",
  "Cannot revert this message": "无法撤回此消息",
  "Cannot revert to a message that was cleared to save space": "无法还原到为节省空间已清除的消息",
  "Cannot send message to subagent.": "无法向子智能体发送消息。",
  "Cannot store content under the reserved new-tab id": "无法在保留的 new-tab ID 下存储内容",
  "Capture console logs": "捕获控制台日志",
  "Capture screenshot": "截图",
  "Capturing": "正在捕获",
  "Changes": "更改",
  "Chat anyways": "仍然对话",
  "Chat Settings": "对话设置",
  "Check again": "重新检查",
  "Check for Updates": "检查更新",
  "Check for Updates Automatically": "自动检查软件更新",
  "Check for Updates on Startup": "启动时检查更新",
  "Check for Updates...": "检查更新...",
  "Check pending conversations in the last 3 days that require action from me.": "检查最近 3 天内需要我处理的待办会话。",
  "Checked command status": "已检查命令状态",
  "Checking command status": "正在检查命令状态",
  "Checking for updates...": "正在检查更新...",
  "Checking for updates…": "正在检查更新...",
  "Checking...": "正在检查...",
  "Checkpoint": "检查点",
  "Child Subagent": "下级子智能体",
  "Choose the product skin that fits how you work.": "选择适合您工作方式的产品界面风格。",
  "Choose winner": "选择优胜方案",
  "Choose Winner": "选择优胜方案",
  "Chrome Binary Path": "Chrome 可执行文件路径",
  "CitC Workspace Type": "CitC 工作区类型",
  "CL details unavailable": "CL 详情不可用",
  "Cleanup Script": "清理脚本",
  "Clear": "清除",
  "Clear all": "全部清除",
  "Clear Cache": "清理缓存",
  "Clear Cache and Reload": "清理缓存并重新加载",
  "Clear Chat History": "清空对话历史",
  "Clear Conversation": "清空会话",
  "Clear filter": "清除筛选",
  "Clear History": "清除历史",
  "Clear queue": "清空队列",
  "Clear search": "清除搜索",
  "Clear Search": "清除搜索",
  "Clear Terminal": "清空终端",
  "CLI Project": "CLI 项目",
  "Click to copy full command": "点击复制完整命令",
  "Click to copy URL": "点击复制 URL",
  "Click to learn more about sources": "点击了解更多关于来源的信息",
  "Click to open docs": "点击打开文档",
  "Click to Open Docs": "点击打开文档",
  "Click to view more": "点击查看更多",
  "Clicked in Browser": "已在浏览器中点击",
  "Clicking in Browser": "正在浏览器中点击",
  "Client": "客户端",
  "Clone current workspace into a new independent workspace": "将当前工作区克隆为新的独立工作区",
  "Close": "关闭",
  "Close Logs Modal": "关闭日志窗口",
  "Close panel": "关闭面板",
  "Close Settings": "关闭设置",
  "Close Sidebar": "关闭侧边栏",
  "Close skills panel": "关闭技能面板",
  "Close split view and go to forked conversation": "关闭分栏视图并前往派生会话",
  "Close Tab": "关闭标签页",
  "Close Terminal Tab": "关闭终端标签页",
  "Close Window": "关闭窗口",
  "Cmd+Enter Queues after the turn": "Cmd+Enter 轮次结束后进入排队",
  "Cmd+Enter Sends immediately": "Cmd+Enter 立即发送",
  "Code Change Summary": "代码变更摘要",
  "Code search": "代码搜索",
  "Code Search": "代码搜索",
  "Code search is not available.": "代码搜索不可用。",
  "Code snippet": "代码片段",
  "Collapse": "折叠",
  "Collapse (shift+click to collapse every level below)": "收起（按住 Shift 点击可收起下方所有层级）",
  "Collapse all": "全部收起",
  "Collapse All": "全部折叠",
  "Collapse All Folders": "全部折叠文件夹",
  "Collapse queued messages": "收起排队中的消息",
  "Collapse subagents": "收起子智能体",
  "Collapse toast": "折叠通知提示",
  "Command execution": "命令执行",
  "Command Palette": "命令面板",
  "Command picker": "命令选择器",
  "Command Setup Script": "命令初始配置脚本",
  "Comment": "评论",
  "Comment on Selection": "针对所选内容添加批注",
  "Commented on:": "评论于：",
  "Comments": "评论",
  "Commit": "提交",
  "Commit succeeded": "提交成功",
  "Communication": "沟通表达",
  "Compact Mode": "紧凑模式",
  "Compacting": "正在压缩上下文",
  "companion website": "配套网页端",
  "Companion Website": "配套网页端",
  "Complete Onboarding Step": "完成新手入门步骤",
  "Complete verification": "完成验证",
  "Completed": "已完成",
  "Configuration": "配置",
  "Configure": "配置",
  "Configure automations": "配置自动化",
  "Configure Automations": "配置自动化",
  "Configure Branches": "配置分支",
  "Configure browser subagent": "配置浏览器子智能体",
  "Configure browser subagent .": "配置浏览器子智能体。",
  "Configure browser subagent.": "配置浏览器子智能体。",
  "Configure tab completion, suggestions, and navigation behavior.": "配置标签页补全、建议和导航行为。",
  "Configure Terminal Settings": "配置终端设置",
  "Configure the browser subagent": "配置浏览器子智能体",
  "Configure the browser subagent .": "配置浏览器子智能体。",
  "Configure the browser subagent.": "配置浏览器子智能体。",
  "Configure the browser subagent. It requires Google Chrome to be installed.": "配置浏览器子智能体。需要系统中已安装 Google Chrome 浏览器。",
  "Configure when follow-up messages are sent.": "配置后续消息的发送时机。",
  "Configure Worktree Branches": "配置工作树分支",
  "Confirm": "确认",
  "Confirm Browser Interaction": "确认浏览器交互",
  "Confirm Quit": "确认退出",
  "Confirm the command is safe to run": "确认该命令可安全运行",
  "Confirm Undo": "确认撤销",
  "Confirm Window Reload": "确认重新加载窗口",
  "Confirmation required to execute this step": "执行此步骤需要确认",
  "Conflict": "冲突",
  "Connected": "已连接",
  "Connecting to terminal...": "正在连接终端...",
  "Connection": "连接",
  "Connection Failed": "连接失败",
  "Connection Successful": "连接成功",
  "Console logs": "控制台日志",
  "Context": "上下文",
  "Context browser": "上下文浏览器",
  "Context Browser": "上下文浏览器",
  "Context Length Limit": "上下文长度上限",
  "Context usage": "上下文占用",
  "Context Window": "上下文窗口大小",
  "Continue": "继续",
  "Continue Response": "继续生成回复",
  "Continue with Advanced SSO": "通过高级 SSO 继续",
  "Continue with different account": "使用其他账号继续",
  "Continue with Google": "通过 Google 继续",
  "Continue with Google Cloud": "通过 Google Cloud 继续",
  "Continuous Execution": "连续执行模式",
  "Continuous Mode": "持续模式",
  "Contrast": "对比度",
  "Controls the actions the agent can take": "控制智能体可以执行的操作",
  "Controls the actions the agent can take.": "控制智能体可以执行的操作。",
  "Controls whether terminal commands require your approval before running.": "控制终端命令在执行前是否需要您的批准。",
  "Controls whether the agent can run custom JavaScript to automate complex browser actions.": "控制智能体是否可以运行自定义 JavaScript 来自动执行复杂的浏览器操作。",
  "Conversation": "对话",
  "Conversation Archived": "会话已归档",
  "Conversation copied as Markdown to clipboard": "对话已作为 Markdown 复制到剪贴板",
  "Conversation History": "对话历史",
  "Conversation ID": "对话 ID",
  "Conversation Log": "会话日志",
  "Conversation name": "会话名称",
  "Conversation Name": "对话名称",
  "Conversation picker": "对话选择器",
  "Conversation Sharing": "会话共享",
  "Conversation Telemetry": "会话遥测信息",
  "Conversation unavailable": "会话不可用",
  "Conversations": "对话",
  "Copied": "已复制",
  "Copied error": "已复制错误信息",
  "Copied error to clipboard": "已复制错误信息到剪贴板",
  "Copied!": "已复制！",
  "Copy": "复制",
  "Copy as Markdown": "复制为 Markdown",
  "copy code": "复制代码",
  "Copy code": "复制代码",
  "Copy Code": "复制代码",
  "copy command": "复制命令",
  "Copy Command": "复制命令",
  "COPY COMMAND": "复制命令",
  "Copy config file path": "复制配置文件路径",
  "Copy Config File Path": "复制配置文件路径",
  "Copy Content": "复制内容",
  "Copy Conversation ID": "复制会话 ID",
  "Copy conversation markdown": "复制会话 Markdown",
  "Copy Conversation Markdown": "复制会话 Markdown",
  "Copy debug info": "复制调试信息",
  "Copy error": "复制错误信息",
  "Copy error messages": "复制错误消息",
  "Copy error to clipboard": "复制错误信息到剪贴板",
  "Copy File Name": "复制文件名",
  "Copy File Path": "复制文件路径",
  "Copy full URL to clipboard": "复制完整 URL 到剪贴板",
  "Copy Image": "复制图片",
  "Copy Last Response": "复制最后一条回复",
  "copy link": "复制链接",
  "Copy link": "复制链接",
  "Copy Link": "复制链接",
  "Copy output": "复制输出",
  "copy path": "复制路径",
  "Copy path": "复制路径",
  "Copy Path": "复制路径",
  "Copy project": "复制项目",
  "copy project name": "复制项目名称",
  "Copy project name": "复制项目名称",
  "Copy Project Name": "复制项目名称",
  "Copy project path": "复制项目路径",
  "Copy Project Path": "复制项目路径",
  "Copy raw string value": "复制原始字符串值",
  "Copy Sidecar ID": "复制 Sidecar ID",
  "Copy the folder elsewhere first if you might want it back.": "如果后续可能还需要该内容，请先将文件夹备份至其他位置。",
  "Copy the trajectory ID": "复制轨迹 ID",
  "Copy this subtree JSON": "复制该子树 JSON",
  "Copy to clipboard": "复制到剪贴板",
  "Copy trajectory ID": "复制轨迹 ID",
  "Copy value": "复制值",
  "Copy workspace": "复制工作区",
  "Core tools and knowledge required to develop for Android": "Android 开发所需的核心工具和知识",
  "Correct code": "代码准确无误",
  "Correctness": "准确性",
  "Could not create project": "无法创建项目",
  "Create": "创建",
  "Create a Plugin with the Agent": "与智能体一起创建插件",
  "Create Automation": "创建自动化",
  "Create conversation": "新建会话",
  "Create Conversation": "新建会话",
  "Create fork in current workspace": "在当前工作区中创建分支副本",
  "Create fork in new workspace": "在全新工作区中创建分支副本",
  "Create fork in shared workspace": "在共享工作区中创建分支副本",
  "Create Group": "创建分组",
  "Create New": "新建",
  "Create new conversation": "新建会话",
  "Create New Conversation": "新建会话",
  "Create new project": "新建项目",
  "Create New Project": "创建新项目",
  "Create project": "创建项目",
  "Create Project": "创建项目",
  "Created": "已创建",
  "Created a new branch on GitHub.": "已在 GitHub 上创建新分支。",
  "Created a new branch on Origin.": "已在远程源 (Origin) 上创建新分支。",
  "Created outline": "已创建大纲",
  "Creating": "正在创建",
  "Creating environment...": "正在创建环境...",
  "Creating Fork...": "正在创建分支派生...",
  "Creating terminal...": "正在创建终端...",
  "Creating the forked conversation...": "正在创建分叉会话...",
  "Ctrl+Enter Queues after the turn": "Ctrl+Enter 轮次结束后进入排队",
  "Ctrl+Enter Sends immediately": "Ctrl+Enter 立即发送",
  "Curated collection of agent skills for science tasks.": "精选用于科学计算与科研任务的智能体技能集合。",
  "Current Page": "当前页面",
  "Current Plan": "当前套餐",
  "Current workspace": "当前工作区",
  "Current Workspace": "当前工作区",
  "Cursor Blinking": "光标闪烁样式",
  "Custom": "自定义",
  "Custom Agents": "自定义智能体",
  "Custom agents are not available in Best of N mode.": "多候选对决模式下不支持使用自定义智能体。",
  "Custom for this project": "为此项目单独配置",
  "Custom Skills": "自定义技能",
  "Custom System Prompt": "自定义系统提示词",
  "Custom Title Bar": "自定义标题栏",
  "customization budget is available": "自定义扩展预算可用",
  "customization budget is available.": "自定义扩展预算可用。",
  "Customization Rules": "自定义规则",
  "Customization token budget exceeded. Large customizations will be truncated.": "已超出自定义扩展的 Token 预算。超长自定义项将被截断。",
  "Customizations": "自定义",
  "Customize": "自定义",
  "Customize Global Skills": "自定义全局技能",
  "Cut": "剪切",
  "Cycle detected": "检测到循环",
  "Daily": "每天",
  "Daily Request Limit": "每日请求上限",
  "Danger Zone": "危险区域",
  "Dark": "深色",
  "Date Added": "添加日期",
  "Debug Console": "调试控制台",
  "Debug Mode": "调试模式",
  "Decline": "拒绝",
  "Decorations": "装饰标识",
  "Default": "默认",
  "Default Customizations": "默认自定义项",
  "Default Dark": "默认深色",
  "Default Execution Mode": "默认执行模式",
  "Default Light": "默认浅色",
  "Delete": "删除",
  "Delete agent": "删除智能体",
  "Delete Automation": "删除自动化",
  "Delete command": "删除命令",
  "Delete comment": "删除批注",
  "Delete Conversation": "删除会话",
  "Delete Group": "删除分组",
  "Delete Handler": "删除处理器",
  "Delete Hook": "删除钩子",
  "Delete Permanently": "永久删除",
  "Delete plugin": "删除插件",
  "Delete Project": "删除项目",
  "Delete server": "删除服务器",
  "Delete side question": "删除旁路提问",
  "Delete Skill": "删除技能",
  "Delete Terminal": "删除终端",
  "Delete this project": "删除此项目",
  "Delete this project.": "删除此项目。",
  "Delete Workspace": "删除工作区",
  "Deleting": "正在删除",
  "Deny setting up browser": "拒绝设置浏览器",
  "Describe the bug you encountered...": "请描述您遇到的问题...",
  "Description": "描述",
  "Deselect All": "取消全选",
  "Details": "详情",
  "Developer-only tools. These settings are stored locally in this browser and do not affect other users.": "仅供开发者使用的工具。这些设置保存在本地浏览器中，不会影响其他用户。",
  "Device Name": "设备名称",
  "DevTools port is still closed. Please make sure Chrome is running with remote debugging enabled.": "DevTools 端口仍处于关闭状态。请确保 Chrome 正在运行且已启用远程调试。",
  "Did what I wanted": "符合预期诉求",
  "Diff Options": "差异选项",
  "Directories": "目录",
  "Directory": "目录",
  "Disable": "禁用",
  "Disable Plugin": "禁用插件",
  "Disable Recommended Skills": "禁用推荐技能",
  "Disabled": "已禁用",
  "Disables all safety barriers for maximal iteration velocity.": "禁用所有安全屏障以获得最大迭代速度。",
  "Discard": "放弃修改",
  "Discard Changes": "放弃所有更改",
  "Discard unstaged changes": "放弃未暂存的更改",
  "Disconnected": "已断开",
  "Discover helpful skills & plugins": "发现实用技能与插件",
  "Discover Skills": "发现技能",
  "Dismiss": "关闭",
  "Dismiss announcement": "关闭公告",
  "Dismiss error": "关闭错误",
  "Dismiss Skills": "关闭技能",
  "Dismiss text selection notice": "关闭文本选择通知",
  "Dismiss Tip": "关闭提示",
  "Dismiss toast": "忽略通知提示",
  "Docs": "文档",
  "Document": "文档",
  "Document Answers": "文档回答",
  "Documentation": "官方文档",
  "Documents": "文档",
  "Don't show this for 2 days": "2 天内不再显示",
  "Done": "完成",
  "Download": "下载",
  "Download Diagnostics": "下载诊断日志",
  "Download SVG": "下载 SVG",
  "Download Updates Automatically": "自动下载更新包",
  "Downloading Update": "正在下载更新",
  "Downloading update...": "正在下载更新...",
  "Downloading update…": "正在下载更新...",
  "Downloading...": "正在下载...",
  "Draft": "草稿",
  "Drag to resize, double-click to reset": "拖动以调整大小，双击以重置",
  "Drag to select a region to comment": "拖拽选择区域以添加评论",
  "Dragged in Browser": "已在浏览器中拖动",
  "Dragging in Browser": "正在浏览器中拖动",
  "Edit": "编辑",
  "Edit Automation": "编辑自动化",
  "Edit comment": "编辑评论",
  "Edit Comment": "编辑评论",
  "Edit config": "编辑配置",
  "Edit conversation title": "编辑会话标题",
  "Edit Conversation Title": "编辑对话标题",
  "Edit Model": "编辑模型",
  "Edit task title": "编辑任务标题",
  "Edit title": "编辑标题",
  "Edit Title": "编辑标题",
  "Edited": "已编辑",
  "Editing": "正在编辑",
  "Elegant code": "代码优雅整洁",
  "Email": "邮箱",
  "Empty directory": "空目录",
  "Empty message": "空消息",
  "Empty pie chart": "饼图无数据",
  "Enable": "启用",
  "Enable Best-of-2": "启用双候选对决 (Best-of-2)",
  "Enable Browser Tool": "启用浏览器工具",
  "Enable Browser Tools": "启用浏览器工具",
  "Enable Chat": "启用对话",
  "Enable Demo Mode (Beta)": "启用演示模式 (Beta)",
  "Enable Overages": "启用超额使用",
  "Enable Personal Customizations": "启用个人自定义设置",
  "Enable Plugin": "启用插件",
  "Enable Recommended Skills": "启用推荐技能",
  "Enable Remote Control": "启用远程控制",
  "Enable Shell Integration": "启用 Shell 集成",
  "Enable Telemetry": "启用遥测",
  "Enable Thinking Mode": "开启深度思考模式",
  "Enabled": "已启用",
  "Enabling...": "正在启用...",
  "End battle mode": "结束对决模式",
  "End Battle Mode": "结束对决模式",
  "Enlarged Mermaid diagram": "放大的 Mermaid 流程图",
  "Enter a prompt for the agent to run": "输入供智能体执行的提示词",
  "Enter a prompt for the agent to run...": "输入要让智能体执行的提示词...",
  "Enter authorization code": "输入授权码",
  "Enter authorization code...": "输入授权码...",
  "Enter automation name": "输入自动化名称",
  "Enter automation name...": "输入自动化名称...",
  "Enter command...": "输入命令...",
  "Enter Queues after the turn": "Enter 轮次结束后进入排队",
  "Enter Sends immediately": "Enter 立即发送",
  "Enter target...": "输入目标...",
  "Enter tool name or server...": "输入工具名称或服务器...",
  "Environment": "环境",
  "Environment Actions": "环境操作",
  "Environment Variables": "环境变量配置",
  "Equalize Split Panes": "均分分屏面板",
  "Error": "错误",
  "Error Details:": "错误详情：",
  "Error during tool execution": "工具执行期间出错",
  "Error editing file": "编辑文件出错",
  "Error editing notebook": "编辑笔记本出错",
  "Error ID:": "错误 ID：",
  "Error loading Browser recording": "加载浏览器录制时出错",
  "Error reading notebook": "读取笔记本出错",
  "Error rendering playback": "渲染回放出错",
  "Error viewing file": "查看文件出错",
  "Error while analyzing directory": "分析目录时出错",
  "Error while editing": "编辑时出错",
  "Error while editing notebook": "编辑笔记本时出错",
  "Error while reading notebook": "读取笔记本时出错",
  "Error while running command": "运行命令时出错",
  "Error while searching": "搜索时出错",
  "Error while searching filesystem": "搜索文件系统时出错",
  "Error while searching the web": "网页搜索时出错",
  "Error while semantic searching": "语义搜索时出错",
  "Error while viewing": "查看时出错",
  "Errored": "出错",
  "Every day": "每天",
  "Every hour": "每小时",
  "Every month": "每月",
  "Every week": "每周",
  "Excellent tool usage": "工具调用出色",
  "Exceptional work": "表现极其出色",
  "Execute URLs": "执行 URL",
  "Executed": "已执行",
  "Executing": "正在执行",
  "Execution": "执行",
  "Execution ID": "执行 ID",
  "Execution Metadata": "执行元数据",
  "Execution Mode": "执行模式",
  "Execution Progress": "执行进度",
  "Exit": "退出",
  "Expand": "展开",
  "Expand (shift+click to expand every level below)": "展开（按住 Shift 点击可展开下方所有层级）",
  "Expand all": "全部展开",
  "Expand All": "全部展开",
  "Expand All Folders": "全部展开文件夹",
  "Expand queued messages": "展开排队中的消息",
  "Expand subagents": "展开子智能体",
  "Expected behavior": "预期行为",
  "Experimental": "实验性",
  "Experimental Features": "实验性功能",
  "Expert at reviewing Flutter code for accessibility (a11y) issues. Invoke this agent to perform an a11y review of a codebase, pending changes, or PR.": "专门审查 Flutter 代码无障碍问题的智能体。需要对代码库、待处理更改或 PR 进行无障碍审查时调用。",
  "Explain and Fix in Current Conversation": "在当前对话中解释并修复",
  "Explored": "已探索",
  "Explorer": "资源管理器",
  "Exploring": "正在探索",
  "Export": "导出",
  "Export artifact": "导出产物",
  "Export as PDF": "导出为 PDF",
  "Export Logs": "导出日志记录",
  "Extensions": "扩展插件",
  "Extracted DOM elements": "已提取 DOM 元素",
  "Extracting DOM elements": "正在提取 DOM 元素",
  "Failed": "失败",
  "Failed to add plugin.": "添加插件失败。",
  "Failed to add plugin. Please try again.": "添加插件失败。请重试。",
  "Failed to Amend": "修改提交失败",
  "Failed to archive workspace": "归档工作区失败",
  "Failed to build": "构建失败",
  "Failed to Commit": "提交失败",
  "Failed to continue": "继续操作失败",
  "Failed to copy:": "复制失败：",
  "Failed to create CitC clone workspace": "创建 CitC 克隆工作区失败",
  "Failed to create terminal": "创建终端失败",
  "Failed to create workspace.": "创建工作区失败。",
  "Failed to create worktree": "创建工作树失败",
  "Failed to delete conversation": "删除会话失败",
  "Failed to edit": "编辑失败",
  "Failed to execute": "执行失败",
  "Failed to fork conversation": "派生分支会话失败",
  "Failed to Generate Commit Message": "生成提交信息失败",
  "Failed to mark all as read": "无法全部标记为已读",
  "Failed to print document": "打印文档失败",
  "Failed to print document:": "打印文档失败：",
  "Failed to proceed": "继续执行失败",
  "Failed to Push": "推送失败",
  "Failed to read": "读取失败",
  "Failed to read file content": "读取文件内容失败",
  "Failed to rename conversation": "重命名会话失败",
  "Failed to revalidate slash commands:": "重新验证斜杠命令失败：",
  "Failed to save project": "保存项目失败",
  "Failed to start Best of N mode": "启动多候选对决模式失败",
  "Failed to start conversation": "启动会话失败",
  "Failed to stop agent": "停止智能体失败",
  "Failed to stop conversation": "停止会话失败",
  "Fallback Summary Used": "已使用回退摘要",
  "Faster response": "响应更快速",
  "Feature Request": "功能请求",
  "Features": "功能",
  "Feedback": "反馈",
  "Feedback Type": "反馈类型",
  "Fetched network request": "已获取网络请求",
  "Fetched network requests": "已获取网络请求",
  "Fetching network request": "正在获取网络请求",
  "Fetching network requests": "正在获取网络请求",
  "Fewer bugs": "更少缺陷",
  "File": "文件",
  "File attachment": "文件附件",
  "File changed": "已修改文件",
  "File Changed": "已修改文件",
  "File Comments": "文件评论",
  "File Diff Comments": "文件差异评论",
  "File edits": "文件编辑",
  "File explorer": "文件浏览器",
  "File Explorer": "文件资源管理器",
  "File location": "文件位置",
  "File not found": "文件未找到",
  "File picker": "文件选择器",
  "File Picker": "文件选择器",
  "File reads": "文件读取",
  "File Reads": "文件读取",
  "File Viewer": "文件查看器",
  "File Writes": "文件写入",
  "Files": "文件",
  "Files changed": "已修改文件",
  "Files Changed": "已更改文件",
  "Files modified by the agent in this conversation": "智能体在此会话中修改的文件",
  "Files modified by the agent in this conversation.": "智能体在此会话中修改的文件。",
  "Filter": "筛选",
  "Finalizing transcription...": "正在完成转写...",
  "Finalizing...": "正在完成...",
  "Find": "查找",
  "Find in conversation": "在会话中查找",
  "Find in Conversation": "在会话中查找",
  "Find in Pane": "在面板中查找",
  "Finish": "完成",
  "finished": "已完成",
  "Finished": "已完成",
  "Five Hour Limit Remaining": "五小时限额剩余",
  "Focus Chat Input": "聚焦对话输入框",
  "Focus Input": "聚焦输入框",
  "Fold code block": "折叠代码块",
  "Folder": "文件夹",
  "Folder doesn't exist": "文件夹不存在",
  "Folders": "文件夹",
  "Follow-up Messages": "追问消息",
  "for conversations outside of projects.": "用于项目外会话。",
  "For help, visit": "如需帮助，请访问",
  "for quick navigation and control.": "用于快速导航和操作控制。",
  "Foreground": "前景色",
  "Forgot context": "遗忘上下文信息",
  "Fork conversation": "派生分支会话",
  "Fork Conversation": "派生分支会话",
  "Fork Environment Notice": "分支派生环境提示",
  "Fork warning": "分支警告",
  "Forked conversation": "分支派生会话",
  "Forked from": "派生自",
  "Found in This Workspace": "在当前工作区中找到",
  "Found references to": "找到相关引用：",
  "Frequency": "执行频率",
  "Frequency Penalty": "频率惩罚度",
  "Friday": "周五",
  "from AI Studio": "（来自 AI Studio）",
  "Full Error": "完整错误信息",
  "Full machine": "完整机器权限",
  "Full output written to": "完整输出已写入至",
  "Function Calling": "函数调用支持",
  "General": "通用",
  "General Feedback": "一般反馈",
  "Generate a link that lets any Googler load a read-only copy of a conversation. Sharing exports the conversation history to your public x20 folder, so it needs that folder to be readable by others.": "生成一个链接，允许任何 Googler 加载该会话的只读副本。分享会将对话历史导出到您的公共 x20 文件夹，因此需要该文件夹对他人可读。",
  "Generate personalized rules": "生成个性化规则",
  "Generate Share Link": "生成分享链接",
  "Generated image": "生成的图片",
  "Generated image preview": "生成图片预览",
  "Generated media": "生成的媒体内容",
  "Generating Link": "正在生成链接",
  "Generations": "生成记录",
  "Generic Tool": "通用工具",
  "Get Started": "开始使用",
  "Getting scripts...": "正在获取脚本...",
  "Global": "全局",
  "Global Rules": "全局规则",
  "global settings": "全局设置",
  "Go": "前往",
  "Go Back": "后退",
  "Go Back in Pane": "在面板中后退",
  "Go Forward": "前进",
  "Go Forward in Pane": "在面板中前进",
  "Go to General settings": "前往通用设置",
  "Go to Home": "返回首页",
  "Goal": "目标",
  "Goal Verification": "目标验证",
  "Goals": "目标",
  "Good questions": "提问精准得当",
  "good response": "优质回答",
  "Good response": "优质回答",
  "Good Response": "优质回复",
  "GOOD RESPONSE": "优质回答",
  "Got it": "知道了",
  "Grasped nuance": "精准把握细节",
  "Group Actions": "分组操作",
  "Group By": "分组方式",
  "Group By Project": "按项目分组",
  "Group By Workspace": "按工作区分组",
  "Group name": "分组名称",
  "Hacky/lazy code": "代码粗糙敷衍",
  "Hallucinated": "产生幻觉捏造事实",
  "Headless Mode": "无头模式",
  "Help": "帮助",
  "Help improve the product by sending anonymous usage data": "通过发送匿名使用数据帮助改进产品",
  "Helpful explanation": "解释清晰有帮助",
  "Hide": "隐藏",
  "Hide breakdown": "隐藏明细",
  "Hide details": "隐藏详情",
  "Hide Details": "隐藏详情",
  "Hide Error": "隐藏错误",
  "Hide tools": "隐藏工具",
  "High Contrast": "高对比度",
  "Highlight After Accept": "接受建议后高亮显示",
  "Highly independent": "高度自主独立",
  "History": "历史记录",
  "Hold": "按住",
  "Hooks": "钩子函数",
  "Hooks Management": "钩子管理",
  "Host": "主机地址",
  "Hourly": "每小时",
  "HTTP Proxy": "HTTP 代理",
  "HTTPS Proxy": "HTTPS 代理",
  "I prefer an immediate single response to prioritize productivity right now.": "我目前希望优先保证效率，直接获取单个即时回复。",
  "Idle": "空闲",
  "Idle Guard Warning": "空闲守卫警告",
  "If enabled, you can manage your conversations from the companion website.": "启用后，您可以从配套网站管理您的会话。",
  "Ignored": "忽略指令要求",
  "Ignored Files": "忽略的文件列表",
  "Image Answers": "图片解答",
  "Image attachment": "图片附件",
  "Image preview not available": "图片预览不可用",
  "Images": "图片",
  "Implementation Plan": "实施方案文档",
  "Import AI Studio Project": "导入 AI Studio 项目",
  "In a rush": "赶时间",
  "In Progress": "处理中",
  "Inactive": "未激活 / 空闲",
  "Include unstaged changes": "包含未暂存的更改",
  "Included Automatically in google3": "在 google3 中自动包含",
  "Incomplete / Gave up": "半途而废 / 未完成",
  "Info": "信息",
  "Inherit": "继承",
  "Inherit from System": "继承系统主题",
  "Inherit General": "继承通用设置",
  "Inherit global": "继承全局设置",
  "Inherit Global": "继承全局设置",
  "Inherit global settings": "继承全局设置",
  "Inherit Global Settings": "继承全局设置",
  "Inherited from global": "继承自全局",
  "Inherited from global settings": "继承自全局设置",
  "Inherited from Global Settings": "继承自全局设置",
  "Inherits default settings": "继承默认设置",
  "Inherits General settings": "继承“通用”设置",
  "Inherits General settings.": "继承“通用”设置。",
  "Inherits your \"General\" settings when working in this project": "在此项目中工作时，继承您的“通用”设置",
  "Inherits your “General” settings when working in this project": "在此项目中工作时，继承您的“通用”设置",
  "Inherits your \"General\" settings when working in this project.": "在此项目中工作时，继承您的“通用”设置。",
  "Inherits your “General” settings when working in this project.": "在此项目中工作时，继承您的“通用”设置。",
  "Inherits your default settings": "继承您的默认设置",
  "Inherits your general settings": "继承您的“通用”设置",
  "Inherits your General settings": "继承您的“通用”设置",
  "Inherits your General settings.": "继承您的“通用”设置。",
  "Inline Actions": "内联操作",
  "Inline Diff": "内联对比",
  "Inline Widget": "内联组件",
  "Input required": "需要输入",
  "Insert in terminal": "插入终端",
  "Insert in Terminal": "插入终端",
  "inside of project": "项目内",
  "Inside of Project": "项目内",
  "Inside of workspace": "工作区内",
  "Inside of Workspace": "工作区内",
  "Insiders": "Insiders 体验版",
  "Inspected commit": "已检查提交",
  "Install": "安装",
  "Install Antigravity IDE to run and edit your workspace scripts": "安装 Antigravity IDE 以运行和编辑您的工作区脚本",
  "Install Antigravity IDE to run and edit your workspace scripts.": "安装 Antigravity IDE 以运行和编辑您的工作区脚本。",
  "Install IDE": "安装 IDE",
  "Install IDE Extension": "安装 IDE 插件",
  "Install Update": "安装更新",
  "Installation": "安装",
  "Installed": "已安装",
  "Installed by You": "由您安装",
  "Installed Plugins": "已安装插件",
  "Installed Skills": "已安装技能",
  "Installing": "正在安装",
  "Installing Update": "正在安装更新",
  "Instruction": "指令",
  "Integration skill and tools for Google Maps Platform APIs": "用于 Google Maps Platform API 的集成技能与工具",
  "Intent understanding": "意图理解问题",
  "Interface Scale": "界面比例",
  "Internal search": "内部搜索",
  "Interrupt the agent and send immediately": "打断智能体并立即发送",
  "Interrupt the agent and send immediately.": "中断智能体并立即发送。",
  "Invalid tool call": "无效的工具调用",
  "It requires": "需要安装",
  "It requires Google Chrome to be installed": "需要安装 Google Chrome 才能运行",
  "It requires Google Chrome to be installed.": "需要安装 Google Chrome 才能运行。",
  "It's a tie": "势均力敌（平局）",
  "JavaScript execution disabled in strict mode": "严格模式下已禁用 JavaScript 执行",
  "JavaScript Result": "JavaScript 结果",
  "JSON attachment": "JSON 附件",
  "just now": "刚刚",
  "Just now": "刚刚",
  "Keep Antigravity running in the background": "在后台保持 Antigravity 运行",
  "Keep Changes": "保留修改",
  "Keep computer awake": "保持电脑处于唤醒状态",
  "Keep Computer Awake": "保持电脑处于唤醒状态",
  "Keep In Menu Bar": "保留在菜单栏",
  "Keep your coding agent up to date with the latest web best practices.": "让编码智能体始终掌握最新的 Web 最佳实践。",
  "Keeps working in this workspace. Nothing is copied.": "继续在当前工作区中工作。不复制任何内容。",
  "Keyboard shortcuts for quick navigation and control": "用于快速导航与控制的键盘快捷键",
  "Keyboard shortcuts for quick navigation and control.": "用于快速导航和控制的键盘快捷键。",
  "Kick off work on your computer and continue working with your agents from your phone or another device. Turn on Remote Control in app settings.": "在您的计算机上开启工作，并通过手机或其他设备继续与您的智能体协同。可在应用设置中开启远程控制。",
  "Kill Terminal": "终止终端",
  "Killed": "已终止",
  "Knowledge": "知识",
  "Knowledge Generation": "知识生成",
  "Labs": "实验功能",
  "Lacked initiative": "缺乏主动性",
  "Last 7 days": "过去 7 天",
  "Last Prompt": "最近提示词",
  "Last run": "上次运行",
  "Last Updated": "最后更新",
  "Laziness": "偷懒敷衍",
  "Learn more": "了解更多",
  "Learn More": "了解更多",
  "Learn more about": "了解更多关于",
  "Learn more about Default": "了解更多关于默认预设",
  "Learn more by visiting our": "访问以下页面了解更多：",
  "Learn more.": "了解更多。",
  "Leave a comment": "留下评论",
  "Light": "浅色",
  "Line Height": "行高",
  "List resources:": "列出资源：",
  "Listed in Your Config": "在您的配置中列出",
  "Load Global Rules": "加载全局规则",
  "Load older messages": "加载更早的消息",
  "Load Project Rules": "加载项目规则",
  "Loading": "加载中",
  "Loading added plugins...": "正在加载已添加的插件...",
  "Loading Browser recording...": "正在加载浏览器录制...",
  "Loading media...": "正在加载媒体...",
  "Loading Notebook View...": "正在加载笔记本视图...",
  "Loading subagent...": "正在加载子智能体...",
  "Loading trajectory...": "正在加载轨迹...",
  "Loading worktrees...": "正在加载工作树...",
  "Loading...": "加载中...",
  "Local": "本地",
  "Location": "位置",
  "Log": "日志",
  "Log in to use the agent": "登录以使用智能体",
  "Logged in as": "当前登录身份：",
  "Logs": "日志",
  "Main Agent": "主智能体",
  "Manage": "管理",
  "Manage Antigravity app settings.": "管理 Antigravity 应用设置。",
  "Manage application settings.": "管理应用设置。",
  "Manage Hooks": "管理钩子",
  "Manage remote sessions": "管理远程会话",
  "Manage Sidecars": "管理伴随服务",
  "Manage Skills": "管理技能",
  "Manage Subscription": "管理订阅",
  "Manage your plan, credentials, and general preferences.": "管理您的套餐、凭据和常规偏好。",
  "Manifest Changes": "清单更改",
  "Manual": "手动",
  "Manually Captured": "手动捕获",
  "Manually customize individual settings": "手动自定义各项设置",
  "Manually customize individual settings.": "手动自定义各项设置。",
  "Manually Rejected": "已手动拒绝",
  "Mark 1 conversation as read": "将 1 个会话标记为已读",
  "Mark 1 conversation as read.": "将 1 个会话标记为已读。",
  "Mark all as read": "全部标记为已读",
  "Mark as read": "标记为已读",
  "Mark as Read": "标记为已读",
  "Mark as unread": "标记为未读",
  "Mark as Unread": "标记为未读",
  "mark read": "标记为已读",
  "Mark Read": "标记为已读",
  "MARK READ": "标记为已读",
  "mark unread": "标记为未读",
  "Mark Unread": "标记为未读",
  "MARK UNREAD": "标记为未读",
  "Marketing Emails": "营销邮件",
  "Marketplace": "市场",
  "Marketplace Gallery URL": "扩展市场检索 URL",
  "Marketplace Item URL": "扩展市场项目 URL",
  "Match case": "区分大小写",
  "Match whole word": "全字匹配",
  "Max Autonomy": "最大自主性",
  "Max Output Tokens": "最大输出 Token 数",
  "Maximize": "最大化",
  "Maximize Pane": "最大化面板",
  "Mcp Tools": "MCP 工具",
  "Media": "媒体",
  "Media Files": "媒体文件",
  "Memory": "内存",
  "Mention": "提及",
  "Mention Page": "引用页面",
  "Mentions": "提及",
  "Merge Conflict": "合并冲突",
  "Mermaid diagram": "Mermaid 流程图",
  "Message Delivery": "消息传递策略",
  "Message input": "消息输入框",
  "Minimize": "最小化",
  "Minimize Pane": "最小化面板",
  "Minimize side question": "最小化旁路提问",
  "Misunderstood": "误解用户意图",
  "Model Summarization Failed": "模型摘要生成失败",
  "Modes": "模式",
  "Modified Files": "已修改文件",
  "Modified files:": "已修改文件：",
  "Monday": "周一",
  "Monthly": "每月",
  "More accurate": "更准确",
  "More actions": "更多操作",
  "More Actions": "更多操作",
  "More comprehensive": "更全面详尽",
  "More creative": "更有创意",
  "More info": "更多信息",
  "More Info": "更多信息",
  "More options": "更多选项",
  "More Options": "更多选项",
  "Move Down": "下移",
  "Move to Group": "移动到分组",
  "Move to New Group": "移动到新分组",
  "Move Up": "上移",
  "Moved Mouse in Browser": "已在浏览器中移动鼠标",
  "Moving Mouse in Browser": "正在浏览器中移动鼠标",
  "Name": "名称",
  "Narrow": "窄",
  "Navigate to": "导航到",
  "Navigation": "导航",
  "Needs attention": "需要注意",
  "Needs Attention": "需要注意",
  "Network": "网络",
  "Never": "从不",
  "Never Proceed Automatically": "从不自动继续",
  "Never run": "从未运行",
  "New": "新建",
  "New Agent Script": "新建智能体脚本",
  "New Automation": "新建自动化",
  "New Chat": "新建对话",
  "New conversation": "新建会话",
  "New Conversation": "新建对话",
  "New conversation in project": "在项目中新建会话",
  "New Conversation in Project": "在项目中新建对话",
  "New conversation in workspace": "在工作区中新建会话",
  "New Conversation in Workspace": "在工作区中新建对话",
  "New Group": "新建分组",
  "New hook name": "新钩子名称",
  "New Project": "新建项目",
  "New tab": "新标签页",
  "New terminal": "新建终端",
  "New Terminal": "新建终端",
  "New Terminal Tab": "新建终端标签页",
  "New Window": "新建窗口",
  "New Workspace": "新建工作区",
  "New worktree": "新建工作树",
  "New Worktree": "新建工作树",
  "Next": "下一步",
  "Next Aux Pane Tab": "下一个辅助面板标签页",
  "Next Change": "下一处变更",
  "Next match": "下一个匹配项",
  "Next Page": "下一页",
  "Next Pane Tab": "下一个面板标签页",
  "Next question": "下一个问题",
  "Next run": "下次运行",
  "Next side question": "下一个旁路提问",
  "Next Suggestion": "下一项建议",
  "Nickname": "昵称",
  "Nightly": "开发版 (Nightly)",
  "No active terminals": "暂无活跃终端",
  "No active terminals. Click + to create one.": "暂无活跃终端，点击 + 创建一个新终端。",
  "No agents running": "无智能体运行",
  "No artifacts generated": "暂未生成任何产物",
  "No automations": "暂无自动化任务",
  "No automations configured": "尚未配置任何自动化任务",
  "No automations configured.": "尚未配置任何自动化任务。",
  "No automations.": "暂无自动化任务。",
  "No browser pages open": "没有打开的浏览器页面",
  "No changes to review": "没有需要审查的更改",
  "No content available for this resource": "此资源没有可用内容",
  "No conversation selected": "未选择对话",
  "No conversations available": "没有可用对话",
  "No conversations found": "未找到会话",
  "No conversations yet": "暂无对话",
  "No documents": "暂无文档",
  "No environments found": "未找到环境",
  "No file changes": "无文件更改",
  "No files changed": "未修改任何文件",
  "No files changed.": "未修改任何文件。",
  "No files or folders found": "未找到文件或文件夹",
  "No folder selected": "未选择文件夹",
  "No folders added yet": "暂未添加任何文件夹",
  "No folders added yet.": "尚未添加文件夹。",
  "No groups yet": "暂无分组",
  "No internet. Agent features may not work.": "无网络连接，智能体功能可能无法正常工作。",
  "No Javascript Result Output": "没有 JavaScript 结果输出",
  "No matching flags": "无匹配的实验特性标记",
  "No matching results": "无匹配结果",
  "No more older messages": "没有更多历史消息了",
  "No previous worktrees": "暂无历史工作树",
  "no project": "无项目关联",
  "No Project": "无项目",
  "NO PROJECT": "无项目关联",
  "No project folders added yet": "暂未添加任何项目文件夹",
  "No project folders added yet.": "暂未添加任何项目文件夹。",
  "No project selected": "未选择项目",
  "No projects yet": "暂无项目",
  "No Proxy": "不使用代理",
  "No resources available": "没有可用资源",
  "No results": "无结果",
  "No Results": "无结果",
  "No results found": "未找到结果",
  "No results found.": "未找到结果。",
  "No skills used": "未使用任何技能",
  "No skills used.": "未使用任何技能。",
  "No subagents": "没有子智能体",
  "No Subtitle": "无副标题",
  "No updates available": "当前已是最新版本",
  "No uploads": "无上传内容",
  "No workspaces open.": "当前未打开任何工作区。",
  "Non-technical": "非技术模式",
  "None": "无",
  "Not configured": "未配置",
  "Not Found": "未找到",
  "Not in Project": "未在项目中",
  "Not running": "未运行",
  "Not scheduled": "未计划",
  "Not signed in": "未登录",
  "Not Signed In": "未登录",
  "Not suitable for Best-of-N": "不适用于多选最优模式",
  "Number of responses": "回复方案数量",
  "of the customization budget is available": "的自定义扩展预算可用",
  "of the customization budget is available.": "的自定义扩展预算可用。",
  "On empty prompt, sends next in queue": "在输入框为空时，发送队列中的下一条消息",
  "Only unread": "仅未读",
  "Only Unread": "仅未读",
  "Open": "打开",
  "Open Agent on Reload": "重新加载时打开智能体",
  "Open Antigravity": "打开 Antigravity",
  "Open Command Palette": "打开命令面板",
  "Open Commit Graph": "打开提交历史图",
  "Open Conversation": "打开会话",
  "Open Conversation History": "打开历史会话",
  "Open Conversation Picker": "打开对话选择器",
  "Open Diff": "打开差异对比",
  "Open extracted DOM in editor": "在编辑器中打开提取的 DOM",
  "Open File": "打开文件",
  "Open File Search": "打开文件搜索",
  "Open Folder": "打开文件夹",
  "Open Folder (Interactive)": "打开文件夹（交互式）",
  "Open full view": "打开完整视图",
  "Open IDE": "打开 IDE",
  "Open in Antigravity IDE": "在 Antigravity IDE 中打开",
  "Open in Browser": "在浏览器中打开",
  "Open in Code Search": "在代码搜索中打开",
  "Open in File Explorer": "在文件资源管理器中打开",
  "Open in new tab": "在新标签页中打开",
  "Open in New Tab": "在新标签页中打开",
  "Open in new window": "在新窗口中打开",
  "Open in Notebook View": "在笔记本视图中打开",
  "Open in Tab": "在标签页中打开",
  "Open Launchpad": "打开启动台",
  "Open Log Directory": "打开日志保存目录",
  "Open Preferences": "打开偏好设置",
  "Open Search": "打开搜索",
  "Open search in external browser": "在外部浏览器中打开搜索",
  "Open Settings": "打开设置",
  "Open settings menu": "打开设置菜单",
  "Open side-by-side view": "打开并排视图",
  "Open Source Code": "打开源代码",
  "Open System Browser": "打开系统浏览器",
  "Open System Preferences": "打开系统偏好设置",
  "Open Terminal": "打开终端",
  "Open URL": "打开 URL",
  "Open with External Browser": "使用外部浏览器打开",
  "Open Workspace": "打开工作区",
  "Open Workspace Selector": "打开工作区选择器",
  "Opened browser": "已打开浏览器",
  "Opened URL in Browser": "已在浏览器中打开 URL",
  "Opening URL in Browser": "正在浏览器中打开 URL",
  "Opt-out": "退出体验",
  "Options": "选项",
  "or copy link": "或复制链接",
  "or copy link.": "或复制链接。",
  "Organization ID": "组织 ID",
  "Other Conversations": "其他对话",
  "Other reason": "其他原因",
  "Other sign-in options": "其他登录选项",
  "Output": "输出",
  "outside of project": "项目外",
  "Outside of Project": "项目外",
  "OUTSIDE OF PROJECT": "项目外",
  "outside of projects": "项目外",
  "outside of projects.": "项目外。",
  "Outside of workspace": "工作区外",
  "Outside of Workspace": "工作区外",
  "Overfixated": "过度钻牛角尖",
  "Override feature environment": "替换特性环境",
  "Override global settings": "覆盖全局设置",
  "Override Global Settings": "覆盖全局设置",
  "Overview": "概览",
  "Overwrite if exists": "若存在则覆盖",
  "Page contents": "页面内容",
  "Page title:": "页面标题：",
  "Panel": "面板",
  "Paste": "粘贴",
  "Paste auth code": "粘贴授权码",
  "Paste code here": "在此处粘贴代码",
  "Pattern": "模式",
  "Pause queue": "暂停队列",
  "PDF attachment": "PDF 附件",
  "Pending": "等待中",
  "Permanently delete": "永久删除",
  "Permanently delete this project": "永久删除此项目",
  "Permanently delete this project.": "永久删除此项目。",
  "Pick a winner": "评选优胜方案",
  "Pick a Winner": "评选优胜方案",
  "Pie chart must contain at least one positive data slice": "饼图必须包含至少一个正数值数据切片",
  "pin": "置顶",
  "Pin": "置顶",
  "PIN": "置顶",
  "Pin conversation": "置顶对话",
  "Pin Conversation": "置顶会话",
  "Pin this conversation": "置顶此会话",
  "Pin This Conversation": "置顶此会话",
  "Pinned Chats Only": "仅固定会话",
  "Pinned Conversations": "置顶对话",
  "Plan": "套餐",
  "Planning": "正在规划",
  "Planning Mode": "规划模式",
  "Playback available": "可回放",
  "Please describe the issue in detail. The more actionable your feedback, the quicker our team can address your request. Some helpful information includes:": "请详细描述该问题。反馈越具体、越便于处理，我们的团队就能越快响应您的请求。建议包含以下信息：",
  "Please list the steps to reproduce the issue": "请列出重现该问题的具体操作步骤…",
  "Please select a winner": "请选择一个优胜方案",
  "Please sign in using the Antigravity sidebar panel to view this page.": "请使用 Antigravity 侧边栏面板登录以查看此页面。",
  "Please verify your account, then sign in again to continue. Learn more by visiting our": "请先验证您的账号，然后重新登录以继续。欲了解更多信息，请访问我们的",
  "plugin": "插件",
  "Plugin details": "插件详情",
  "Plugin is disabled": "插件已禁用",
  "Plugin Manager": "插件管理器",
  "Plugins": "插件",
  "Port": "端口",
  "Post-Tool Execution Hook": "工具执行后钩子",
  "Pre-Tool Execution Hook": "工具执行前钩子",
  "Preferences": "首选项",
  "Presence Penalty": "存在惩罚度",
  "Press Alt+Enter to queue": "按 Alt+Enter 排队",
  "Press Enter to send": "按 Enter 发送",
  "Press Shift+Enter for new line": "按 Shift+Enter 换行",
  "Prevent Sleep": "防止休眠",
  "Prevent the computer from sleeping while the app is running.": "在应用运行时防止计算机进入休眠状态。",
  "Preview unavailable": "预览不可用",
  "Previous": "上一步",
  "Previous Aux Pane Tab": "上一个辅助面板标签页",
  "Previous Change": "上一处变更",
  "Previous match": "上一个匹配项",
  "Previous Page": "上一页",
  "Previous Pane Tab": "上一个面板标签页",
  "Previous question": "上一问题",
  "Previous side question": "上一个旁路提问",
  "Previous Suggestion": "上一项建议",
  "Previous toast": "上一条通知提示",
  "Previous Worktrees": "历史工作树 (Worktrees)",
  "Proactive solution": "主动提供解决方案",
  "Proactively connect to running Dart/Flutter apps and trigger hot reload or hot restart upon editing .dart files under lib/.": "主动连接到正在运行的 Dart/Flutter 应用，并在编辑 lib/ 下的 .dart 文件时触发热重载或热重启。",
  "Problems": "问题",
  "Proceed": "继续",
  "Proceed Anyway": "仍然继续",
  "Proceed with Plan": "继续执行方案",
  "Proceeded with": "已继续执行",
  "Processing": "正在处理",
  "Product Skin": "产品界面风格",
  "Project": "项目",
  "Project + worktree": "项目 + 工作树",
  "Project + Worktree": "项目 + 工作树",
  "Project already exists": "项目已存在",
  "Project ID": "项目 ID",
  "Project Name": "项目名称",
  "Project options": "项目选项",
  "Project picker": "项目选择器",
  "Project Root": "项目根目录",
  "Project Rules": "项目规则",
  "Project Settings": "项目设置",
  "Projects": "项目",
  "Prompt": "提示词",
  "Prompt for approval before running browser scripts": "在运行浏览器脚本前提示以征得批准",
  "Prompt for approval before running browser scripts.": "在运行浏览器脚本前提示以征得批准。",
  "Prompt to execute on schedule...": "要按计划执行的提示词...",
  "Prompt too simple": "提示词过于简单",
  "Provide feedback": "提供反馈",
  "Provide Feedback": "提供反馈",
  "Proxy": "代理",
  "Proxy Configuration": "代理网络配置",
  "Proxy Settings": "代理设置",
  "Push": "推送 (Push)",
  "Push succeeded": "推送成功",
  "Python Script": "Python 脚本",
  "Quality": "完成质量",
  "Questions": "问题",
  "Queue": "排队",
  "Queue Delivery": "排队消息发送",
  "Queue for Next Turn": "排队至下一轮",
  "Queue message": "排队消息",
  "Queue messages": "排队消息",
  "Queue until after the current turn": "排队等待，直至当前轮次结束",
  "Queue until after the current turn.": "等当前轮次结束后排队发送。",
  "Queued message": "排队中的消息",
  "Queued message deleted": "已删除排队中的消息",
  "Queued Messages": "排队消息",
  "Queued Messages Behavior": "排队消息处理行为",
  "Queues after the turn": "轮次结束后进入排队",
  "quick start": "快速入门",
  "Quick Start": "快速开始",
  "Quit": "退出",
  "Quit Antigravity": "退出 Antigravity",
  "Quote": "引用",
  "Quote Ctrl+L": "引用 Ctrl+L",
  "Quote Selection": "引用选中文本",
  "Ran": "已运行",
  "Ran command": "已运行命令",
  "Rate Limit": "速率限制",
  "Rate Limits": "速率限制",
  "Read Browser Page in Browser": "在浏览器中读取浏览器页面",
  "Read Files": "读取文件",
  "Read page": "读取页面",
  "Read resource:": "读取资源：",
  "Read URL": "读取 URL",
  "Read URL content?": "读取 URL 内容？",
  "Read URL rejected": "已拒绝读取 URL",
  "Read URLs": "读取 URL",
  "Read-Only Paths": "只读路径列表",
  "Read-Write Paths": "读写路径列表",
  "Reading": "正在读取",
  "Reading Browser Page in Browser": "正在读取浏览器页面",
  "Reading page": "正在读取页面",
  "Ready": "就绪",
  "Reason for opting out": "退出原因",
  "Receive product updates, tips, and promotions from Google Antigravity via email.": "通过电子邮件接收 Google Antigravity 的产品更新、使用技巧和推广信息。",
  "Recent": "最近",
  "Recent Files": "最近使用的文件",
  "Recent Workspaces": "最近工作区",
  "Recommended": "推荐",
  "Reconnecting": "正在重新连接",
  "Record voice memo": "录制语音备忘",
  "Recording": "正在录制",
  "Redo": "重做",
  "Refresh": "刷新",
  "Refresh custom agents": "刷新自定义智能体",
  "Refresh customizations": "刷新自定义项",
  "Refresh gcert credentials": "刷新 gcert 凭据",
  "Refresh gcert Credentials": "刷新 gcert 凭据",
  "Refresh skills": "刷新技能",
  "Refresh Skills": "刷新技能",
  "Refresh skills paths": "刷新技能路径",
  "Refreshed Browser page": "已刷新浏览器页面",
  "Refreshing Browser page": "正在刷新浏览器页面",
  "Refreshing...": "正在刷新...",
  "Reject": "拒绝",
  "Reject all": "全部拒绝",
  "Reject Changes": "拒绝更改",
  "Reject Step": "拒绝此步骤",
  "Reject Suggestion": "拒绝建议",
  "Rejected": "已拒绝",
  "Relaxed": "宽松",
  "Release Notes": "发行说明",
  "Reliable automation, in-depth debugging, and performance analysis in Chrome using Chrome DevTools and Puppeteer": "使用 Chrome DevTools 和 Puppeteer 在 Chrome 中进行可靠的自动化、深度调试和性能分析",
  "Reload": "重新加载",
  "Reload app": "重新加载应用",
  "Reload Skills": "重新加载技能库",
  "Reload Window": "重新加载窗口",
  "Remaining": "剩余",
  "Remote Control": "远程控制",
  "Remote Control, or": "远程控制，或",
  "Remote Control, or ": "远程控制，或 ",
  "Remote Debugging Port": "远程调试端口",
  "Remote session": "远程会话",
  "Remote sessions": "远程会话列表",
  "Remove": "移除",
  "Remove from Group": "从分组中移除",
  "Remove from Split": "从分屏中移除",
  "Remove From Split": "从分屏中移除",
  "Removing...": "正在移除...",
  "Rename": "重命名",
  "Rename Conversation": "重命名会话",
  "Rename Group": "重命名分组",
  "Rename Terminal": "重命名终端",
  "Rename this conversation": "重命名此会话",
  "Rename This Conversation": "重命名此会话",
  "Rendering playback": "正在渲染回放",
  "Replace With New": "替换为新对话",
  "Report an Issue": "报告问题",
  "Report Issue": "报告问题",
  "Requested changes": "请求修改",
  "Require Confirmation for Commands": "执行命令时需要用户确认",
  "requires Google Chrome to be installed": "需要安装 Google Chrome 才能运行",
  "requires Google Chrome to be installed.": "需要安装 Google Chrome 才能运行。",
  "Reset": "重置",
  "Reset All Settings": "重置所有设置至默认值",
  "Reset to preset": "重置为预设",
  "Reset zoom": "重置缩放",
  "Resets in 2h 35m": "2 小时 35 分钟后重置",
  "Resets in 2h 35m.": "2 小时 35 分钟后重置。",
  "Resets in 4d 13h": "4 天 13 小时后重置",
  "Resets in 4d 13h.": "4 天 13 小时后重置。",
  "Resets in less than a minute": "不到 1 分钟后重置",
  "Resets in less than a minute.": "不到 1 分钟后重置。",
  "Resets soon": "即将重置",
  "Resets soon.": "即将重置。",
  "Resize side question panel": "调整旁路提问面板大小",
  "Resize terminal panes": "调整终端面板大小",
  "Resized Browser window": "已调整浏览器窗口大小",
  "Resizing Browser window": "正在调整浏览器窗口大小",
  "Response A": "回答 A",
  "Response A was better": "回答 A 表现更优",
  "Response B": "回答 B",
  "Response B was better": "回答 B 表现更优",
  "Restart Main Language Server": "重启主语言服务",
  "Restart Sidecar": "重启伴随服务",
  "Restart to apply update": "重启以应用更新",
  "Restart to apply updates": "重启以应用更新",
  "Restart to Update": "重启以更新",
  "Restore": "还原",
  "Restore Conversation": "恢复对话",
  "Restore Defaults": "恢复默认设置",
  "Restore Pane": "还原面板",
  "Restore split view": "恢复分栏视图",
  "Resume": "继续",
  "Resume queue": "恢复队列",
  "Retrieved Browser Pages": "已获取浏览器页面列表",
  "Retrieved Console Logs from Browser": "已从浏览器获取控制台日志",
  "Retrieving Browser Pages": "正在获取浏览器页面列表",
  "Retrieving Console Logs from Browser": "正在从浏览器获取控制台日志",
  "Retry": "重试",
  "Retry Connection": "重试连接",
  "Reveal in File Explorer": "在文件资源管理器中显示",
  "Reveal in Finder": "在访达中显示",
  "Revert and redo turn, best of N:": "撤回并重做本轮（多候选对决 Best-of-N）：",
  "Revert Changes": "撤回修改",
  "Revert file changes": "还原文件更改",
  "Review Changes": "审查更改",
  "Revoke": "撤销",
  "Rewinds the conversation only. Files in this workspace stay as they are now.": "仅回退会话。此工作区中的文件将保持当前状态。",
  "Rule Files": "规则文件",
  "Rule Priority": "规则优先级",
  "Rules": "规则",
  "Run": "运行",
  "Run and Debug": "运行与调试",
  "run as Flash": "均以 Flash 模型运行",
  "run as Flash.": "均以 Flash 模型运行。",
  "Run automation": "运行自动化",
  "Run Automation": "运行自动化",
  "Run command": "运行命令",
  "Run in a new worktree": "在新的工作树中运行",
  "Run in background": "在后台保持运行",
  "Run in Background": "在后台保持运行",
  "Run in Isolated Environment": "在隔离环境中运行",
  "Run in your current workspace": "在当前工作区中运行",
  "Run Now": "立即运行",
  "Running": "运行中",
  "s run as Flash": "均以 Flash 模型运行",
  "s run as Flash.": "均以 Flash 模型运行。",
  "Same Project": "同一项目",
  "Saturday": "周六",
  "Save": "保存",
  "Save All": "全部保存",
  "Save Automation": "保存自动化",
  "Save Comment": "保存评论",
  "Save Image": "保存图片",
  "Save Video": "保存视频",
  "Saving...": "正在保存...",
  "Scan the code to open this device in": "扫描二维码在此设备中打开",
  "Scan the code to open this device in ": "扫描二维码在此设备中打开 ",
  "Scan the code to open this device in Remote Control, or": "扫描二维码在远程控制中打开此设备，或",
  "Scan the code to open this device in Remote Control, or ": "扫描二维码在远程控制中打开此设备，或 ",
  "Scan the code to open this device in Remote Control, or copy link.": "扫描二维码在远程控制中打开此设备，或复制链接。",
  "Schedule": "计划",
  "Scheduled": "已计划",
  "Screen Recording": "屏幕录制",
  "Screenshot": "截图",
  "Scroll to bottom": "滚动至底部",
  "Scroll to Bottom": "滚动到底部",
  "Scrolled down in Browser": "已在浏览器中向下滚动",
  "Scrolled in Browser": "已在浏览器中滚动",
  "Scrolled up in Browser": "已在浏览器中向上滚动",
  "Scrolling down in Browser": "正在浏览器中向下滚动",
  "Scrolling in Browser": "正在浏览器中滚动页面",
  "Scrolling up in Browser": "正在浏览器中向上滚动",
  "Search": "搜索",
  "Search across files...": "跨文件搜索...",
  "Search by name or Cascade ID...": "按名称或 Cascade ID 搜索...",
  "Search conversations": "搜索对话",
  "Search Conversations": "搜索会话",
  "Search conversations based on their contents": "基于内容搜索会话",
  "Search conversations based on their contents.": "基于内容搜索会话。",
  "Search conversations...": "搜索对话...",
  "Search file contents": "搜索文件内容",
  "Search file contents...": "搜索文件内容...",
  "Search files...": "搜索文件...",
  "Search for commands...": "搜索命令...",
  "Search for content to open": "搜索要打开的内容",
  "Search for conversations...": "搜索会话...",
  "Search for files in the project...": "在项目中搜索文件...",
  "Search is still indexing your conversations, so results may be incomplete": "搜索服务仍在为您的对话建立索引，结果可能不完整",
  "Search is still indexing your conversations, so results may be incomplete.": "搜索服务仍在为您的对话建立索引，结果可能不完整。",
  "Search past workspaces...": "搜索历史工作区...",
  "Search past worktrees...": "搜索历史工作树...",
  "Search Projects": "搜索项目",
  "Search projects...": "搜索项目...",
  "Search results": "搜索结果",
  "Search tabs, files, plugins, subagents, artifacts, tasks...": "搜索标签页、文件、插件、子智能体、产物文档、任务...",
  "Search tabs, files, subagents, artifacts, tasks...": "搜索标签页、文件、子智能体、产物、任务...",
  "Search workspaces...": "搜索工作区...",
  "Searched": "已搜索",
  "Searched files": "已搜索文件",
  "Searched for files": "已搜索文件",
  "Searching": "正在搜索",
  "Searching...": "正在搜索...",
  "Section header:": "章节标题：",
  "See all": "查看全部",
  "See All": "查看全部",
  "See less": "收起",
  "Select": "选择",
  "Select a winner to continue": "选择一个优胜方案以继续",
  "Select Agent": "选择智能体",
  "Select All": "全选",
  "Select an option": "选择一个选项",
  "Select branch": "选择分支",
  "Select category to search...": "选择要搜索的类别...",
  "Select Day": "选择日期",
  "Select Default Branch": "选择默认分支",
  "Select Default Profile": "选择默认配置文件",
  "Select Environment": "选择环境",
  "Select Hour": "选择小时",
  "Select light, dark, or inherit system settings.": "选择浅色、深色或继承系统设置。",
  "Select modes": "选择模式",
  "Select Next Conversation": "选择下一个对话",
  "Select Previous Conversation": "选择上一个对话",
  "select project": "选择项目",
  "Select Project": "选择项目",
  "Select Project to associate": "选择要关联的项目",
  "Select text in the artifact to add a comment": "选择产物中的文本以添加评论",
  "Select winner": "选择优胜方案",
  "Select Winner": "选择优胜方案",
  "Select workspace": "选择工作区",
  "Select Workspace": "选择工作区",
  "Select workspace...": "选择工作区...",
  "Select Worktree": "选择工作树",
  "Select your license": "选择您的许可证",
  "Selected Option in Browser": "已在浏览器中选择选项",
  "Selected region": "已选择区域",
  "Selecting Option in Browser": "正在浏览器中选择选项",
  "Selection": "选择",
  "Selection Actions": "选择操作",
  "Semantic searched": "已完成语义搜索",
  "Semantic searching": "正在执行语义搜索",
  "Send command input?": "发送命令输入？",
  "Send feedback": "发送反馈",
  "Send Feedback": "发送反馈",
  "Send feedback as": "反馈身份",
  "Send immediately": "立即发送",
  "Send Immediately": "立即发送",
  "Send message": "发送消息",
  "Send Message": "发送消息",
  "Send message immediately": "立即发送消息",
  "Send next message in queue": "发送队列中的下一条消息",
  "send now": "立即发送",
  "Send now": "立即发送",
  "Send Now": "立即发送",
  "SEND NOW": "立即发送",
  "Sending transcribed message...": "正在发送转写消息...",
  "Sends after agent": "智能体结束后发送",
  "Sends after agent finishes": "智能体结束后发送",
  "sends after agent finishes working": "智能体结束工作后发送",
  "Sends after agent finishes working": "智能体结束工作后发送",
  "Sends immediately": "立即发送",
  "Server": "服务器",
  "Session Summary": "会话摘要",
  "Set API Key": "设置 API 密钥",
  "Settings": "设置",
  "Setup may take over 5 minutes. Please keep this screen open during setup.": "设置可能需要 5 分钟以上，请在设置期间保持此屏幕打开。",
  "Setup Script": "项目初始化脚本",
  "Share": "分享",
  "Shares this repository, with a working copy of its own. Uncommitted changes stay behind.": "共享此代码仓库，并拥有自己的工作副本。未提交的更改将保留在原处。",
  "Sharing this conversation will export its history. Anyone with the link will be able to load and view it.": "分享此会话将导出其历史记录。任何拥有链接的人都可以加载和查看。",
  "Shift+Enter Queues after the turn": "Shift+Enter 轮次结束后进入排队",
  "Shift+Enter Sends immediately": "Shift+Enter 立即发送",
  "Show": "显示",
  "Show all": "显示全部",
  "Show All": "显示全部",
  "Show All Commands": "显示所有命令面板",
  "Show all resources": "显示所有资源",
  "Show details": "显示详情",
  "Show Details": "显示详情",
  "Show Diff": "显示差异对比",
  "Show Error": "显示错误",
  "Show fewer resources": "显示较少资源",
  "Show in Explorer": "在文件资源管理器中显示",
  "Show in File Explorer": "在文件资源管理器中显示",
  "Show in File Manager": "在文件管理器中显示",
  "Show in Finder": "在访达中显示",
  "Show JavaScript Result": "显示 JavaScript 结果",
  "Show Less": "收起",
  "Show Line Numbers": "显示行号",
  "Show more": "显示更多",
  "Show More": "显示更多",
  "Show more results": "显示更多结果",
  "Show Selection Actions": "显示选择操作",
  "Show settings anyway": "仍然显示设置",
  "Side by Side Diff": "并排对比",
  "Side Question:": "侧边问题：",
  "Sidebar grouped by project": "侧边栏已按项目分组",
  "Sidebar grouped by workspace": "侧边栏已按工作区分组",
  "Sidebar on Left": "侧边栏靠左",
  "Sidebar on Right": "侧边栏靠右",
  "Sidebar Position": "侧边栏位置",
  "Sidecar Logs": "伴随服务日志",
  "Sidecar Port": "伴随服务端口",
  "Sidecar Services": "伴随服务管理",
  "Sidecars": "伴随服务",
  "Sign in": "登录",
  "Sign In": "登录",
  "Sign in again": "重新登录",
  "Sign in with a different account": "使用其他账户登录",
  "Sign in with business account": "使用企业账号登录",
  "Sign Out": "退出登录",
  "Signed in as": "当前登录身份：",
  "Signing in...": "登录中...",
  "Signing Out...": "正在退出登录...",
  "Simplified interface without developer tooling.": "无开发者工具的简化界面。",
  "Simulated Key Press in Browser": "已在浏览器中模拟按键",
  "Simulating Key Press in Browser": "正在浏览器中模拟按键",
  "Skill Custom Paths": "技能自定义路径",
  "Skill Directory": "技能目录",
  "Skill Parameters": "技能参数",
  "Skill used": "已使用技能",
  "Skill Used": "已使用技能",
  "Skills": "技能",
  "Skills & rules settings": "技能与规则设置",
  "Skills and Rules Settings": "技能与规则设置",
  "Skills Management": "技能管理",
  "Skills used": "已使用技能",
  "Skills Used": "已使用技能",
  "Skin": "界面风格",
  "Skip": "跳过",
  "Skip survey": "跳过问卷",
  "Skip Survey": "跳过问卷",
  "Skipped": "已跳过",
  "Skipping...": "正在跳过...",
  "Smooth Scrolling": "平滑滚动",
  "Some older conversations are not searchable. Clear up large conversations to remediate.": "部分较早的会话无法被搜索。清理体积较大的会话可解决此问题。",
  "Something went wrong": "出现了错误",
  "Something went wrong!": "出错了！",
  "Something went wrong.": "出错了。",
  "Sort": "排序",
  "Sort Conversations": "排序对话",
  "Source Control": "源代码管理",
  "Sources": "来源",
  "Split": "拆分",
  "Split Conversation Horizontally": "水平分屏会话",
  "Split Conversation Vertically": "垂直分屏会话",
  "Split Diff": "分屏差异",
  "Split Down": "向下拆分",
  "Split Left": "向左拆分",
  "Split Right": "拆分到右侧",
  "Split Terminal": "拆分终端",
  "Split Up": "向上拆分",
  "Stable": "稳定版",
  "Stage change": "暂存更改",
  "Staged": "已暂存",
  "Staged Changes": "暂存的更改",
  "Staged index changes and working tree changes": "暂存区索引更改与工作区更改",
  "Staged index changes and working tree changes.": "暂存区索引更改与工作区更改。",
  "Stale info": "信息陈旧过时",
  "Standalone Conversation": "独立对话",
  "Standalone Conversations": "独立会话",
  "Standalone terminals": "独立终端",
  "Standalone Terminals": "独立终端",
  "Start battle mode": "开启对决模式",
  "Start Battle Mode": "开启对决模式",
  "Start Sidecar": "启动伴随服务",
  "Start Voice Recording": "开始语音录制",
  "Status": "状态",
  "Status Bar": "状态栏",
  "Status Bar Visibility": "状态栏可见性",
  "steps to reproduce": "重现步骤",
  "Steps to reproduce": "重现步骤",
  "Steps to Reproduce": "复现步骤",
  "Steps To Reproduce": "重现步骤",
  "Steps to reproduce the issue": "复现问题的步骤",
  "Stop": "停止",
  "Stop All Subagents": "停止所有子智能体",
  "Stop automation": "停止自动化",
  "Stop Automation": "停止自动化",
  "Stop execution": "停止执行",
  "Stop Execution": "停止执行",
  "Stop Generating": "停止生成",
  "Stop Generation": "停止生成",
  "Stop recording": "停止录制",
  "Stop Recording": "停止录制",
  "Stop Recording and Send": "停止录制并发送",
  "Stop Sequences": "停止序列",
  "Stop Sidecar": "停止伴随服务",
  "Stop subagent": "停止子智能体",
  "Stop Subagent": "停止子智能体",
  "Stop Task": "停止任务",
  "Stop Voice Recording": "停止语音录制",
  "Stopped": "已停止",
  "Stopped after": "停止于",
  "Storage": "存储空间",
  "Streaming": "流式输出",
  "Streaming Generation": "正在流式生成",
  "Strict": "严格",
  "Strict Mode": "严格模式",
  "Strong": "高对比度",
  "Subagent": "子智能体",
  "Subagent Conversation": "子智能体会话",
  "Subagent ended": "子智能体已结束",
  "Subagents": "子智能体",
  "Submit": "提交",
  "Submit Appeal": "提交申诉",
  "Submit comment": "提交评论",
  "Submit feedback": "提交反馈",
  "Submitted": "已提交",
  "Submitting...": "正在提交...",
  "Subscription": "订阅套餐",
  "Subtitles": "字幕",
  "Success": "成功",
  "Success, Continuing...": "成功，正在继续...",
  "Successfully imported project:": "已成功导入项目：",
  "Suggestions": "建议",
  "Sunday": "周日",
  "Suspend": "暂停",
  "Switch Account": "切换账户",
  "Switch IDE Workspace": "切换 IDE 工作区",
  "System": "跟随系统",
  "System Instructions": "系统指令",
  "System Message": "系统消息",
  "System Prompt": "系统提示词",
  "Tab Speed": "标签切换速度",
  "Tab to Import": "按 Tab 导入",
  "Tab to Jump": "按 Tab 跳转",
  "Table of contents": "目录大纲",
  "Table options": "表格选项",
  "Taking longer than usual to load": "加载耗时比平时更长",
  "Taking Screenshot": "正在截图",
  "Target text in PDF...": "PDF 中的目标文本...",
  "Task Log": "任务日志",
  "Team of subagents to do long running work": "由多个子智能体协作完成长周期任务",
  "Telemetry & Analytics": "遥测与分析",
  "Tell us more about your choice": "详细说明您的选择",
  "Tell us more about your choice (optional)": "详细说明您的选择（可选）",
  "Temperature": "采样温度",
  "Terminal": "终端",
  "Terminal Command Auto Execution": "终端命令自动执行",
  "Terminal commands": "终端命令",
  "Terminal Commands": "终端命令",
  "Terminal commands the agent can execute in this workspace.": "智能体可在此工作区中执行的终端命令。",
  "Terminal: Add to Chat": "终端：添加到对话",
  "Terminals": "终端列表",
  "Terms of Service": "服务条款",
  "Test failed": "测试失败",
  "Testing": "正在测试",
  "Text attachment": "文本附件",
  "Thank you for your feedback": "感谢您的反馈",
  "Thank you for your feedback!": "感谢您的反馈！",
  "Thanks for helping make Gemini better! This is a critical part of evaluating and improving our models.": "感谢您帮助我们让 Gemini 变得更好！这是评估与改进模型的关键环节。",
  "Thanks for your feedback!": "感谢您的反馈！",
  "The agent has encountered an internal error.": "智能体遇到了内部错误。",
  "The agent works with autonomy-enhancing features and does not ask questions or request new permissions.": "智能体将启用自主增强特性运行，期间不会向您提问或请求新权限。",
  "The browser subagent can be invoked by typing /browser in the conversation input box.": "可在对话输入框中输入 /browser 调用浏览器子智能体。",
  "The conversation was compacted to fit within the context window.": "会话已被压缩以适应上下文窗口。",
  "The conversation was compacted while generating this response.": "在生成此回复期间，会话上下文已执行压缩。",
  "The current trigger rate is too high.": "当前触发频率过高。",
  "the customization budget is available": "自定义扩展预算可用",
  "the customization budget is available.": "自定义扩展预算可用。",
  "The full developer experience.": "完整开发者体验。",
  "The Google3 project is deprecated": "Google3 项目已弃用",
  "The server returned no conversation to fork into": "服务器未返回可供分支的对话",
  "The server returned no conversation to fork into.": "服务器未返回可供分支的对话。",
  "There was an error with your authentication. To log in, click": "您的身份验证出错。要登录，请点击",
  "There was an unexpected issue setting up your account.": "设置您的账户时出现意外问题。",
  "Thinking": "思考中",
  "Thinking Budget": "思考预算",
  "Thinking Budget (Tokens)": "思考预算 (Token 数)",
  "Thinking for": "正在思考",
  "Thinking Process": "思考流程",
  "This action cannot be undone.": "此操作无法撤销。",
  "This cannot be undone.": "此操作无法撤销。",
  "This chat is archived.": "此对话已归档。",
  "This conversation grew too large, so the history before this point may be missing or incomplete.": "此会话体积过大，因此该节点之前的历史记录可能缺失或不完整。",
  "This Google Cloud project is not supported. Input a different project, or sign in with another account.": "不支持此 Google Cloud 项目。请输入其他项目，或使用其他账号登录。",
  "This is very dangerous and we do not recommend doing this": "这非常危险，我们不建议这样做",
  "This is very dangerous and we do not recommend doing this.": "这非常危险，我们不建议这样做。",
  "This plugin provides a specialized suite of skills for data engineers and database practitioners working on Google Cloud. It acts as an expert assistant, allowing you to easily interact with your database, analyze your data, and optimize your database workload.": "此插件为在 Google Cloud 上工作的数据工程师和数据库从业者提供专业技能套件。它充当专家助手，让您轻松与数据库交互、分析数据并优化数据库工作负载。",
  "This prompt is straightforward and does not need alternative comparisons.": "此提示词非常简单直接，无需多方案对比。",
  "This request is not well-suited for parallel Best-of-N generation.": "此请求不适合使用并行多候选对决 (Best-of-N) 生成。",
  "This skill came from the marketplace, so you can add it again whenever you need it.": "此技能来自应用市场，您可以随时按需再次添加。",
  "This subagent was killed and can no longer be messaged.": "该子智能体已被终止，无法再发送消息。",
  "Thorough research": "调研深入全面",
  "Thorough testing": "测试全面彻底",
  "Thought": "思考",
  "Thought Process": "思考过程",
  "Thursday": "周四",
  "Tie": "平局",
  "Time to First Token (TTFT)": "首 Token 响应时间 (TTFT)",
  "Timed": "已计时",
  "Timed out": "已超时",
  "Timed out waiting for the update to be installed.": "等待安装更新超时。",
  "Timed out waiting for the updated instance to load.": "等待更新后的实例加载超时。",
  "Timeout": "超时",
  "Timer expired": "定时器已到期",
  "timer has expired": "定时器已到期",
  "Timer has expired": "定时器已到期",
  "Tip: Complex tasks get better results with multiple responses.": "提示：复杂任务通过多方案对比可获得更佳结果。",
  "to add to Agent": "以添加到智能体",
  "to be installed": "才能运行",
  "to be installed.": "才可使用。",
  "to have the agent generate a plan.": "以让智能体生成计划。",
  "to upload": "以上传",
  "To use browser tools, you need to enable remote debugging:": "要使用浏览器工具，需要启用远程调试：",
  "To use the agent, please login": "请登录以使用智能体",
  "today": "今天",
  "Today": "今天",
  "Toggle": "切换",
  "Toggle Artifacts": "切换产物面板显示",
  "Toggle Auxiliary Pane": "切换辅助面板",
  "Toggle Developer Tools": "切换开发者工具",
  "Toggle Environment Selector": "切换环境选择器",
  "Toggle File Viewer": "切换文件查看器",
  "Toggle Full Screen": "切换全屏",
  "Toggle Fullscreen": "切换全屏",
  "Toggle Overview Panel": "切换概览面板",
  "Toggle Project Selector": "切换项目选择器",
  "Toggle Sidebar": "切换侧边栏",
  "Toggle Terminal": "切换终端",
  "Toggle Voice Recording": "切换语音录制",
  "Token Usage": "令牌使用量",
  "Tokens": "Token 统计",
  "Tokens Used": "已用 Token",
  "Too many surveys": "问卷调查过多",
  "Took Screenshot": "已截图",
  "Tool arguments": "工具参数",
  "Tool Call Generation": "正在生成工具调用",
  "Tool Execution": "工具执行中",
  "Tool Output": "工具输出",
  "Top P Sampling": "Top P 采样值",
  "Trigger multiple response variants from the same prompt.": "针对同一提示词触发生成多个候选回复方案。",
  "Troubleshoot": "故障排查",
  "Try again": "重试",
  "Try Again": "重试",
  "Try out early-stage features before they ship. These may change or be removed at any time.": "在正式发布前试用早期功能。这些功能可能随时更改或移除。",
  "Try Remote Control": "体验远程控制",
  "Tuesday": "周二",
  "Turbo": "Turbo 极速",
  "Turbo mode": "极速模式",
  "Type / and select plan to have the agent generate a plan.": "输入 / 并选择 plan 以让智能体生成计划。",
  "Type to search for code across your workspace.": "输入内容以在工作区中搜索代码。",
  "Typed into Browser": "已输入到浏览器",
  "Typing into Browser": "正在输入到浏览器",
  "UI Extensions": "UI 扩展",
  "Unauthenticated": "未认证",
  "Unavailable": "不可用",
  "Uncommitted": "未提交",
  "Under-researched": "调研不够深入",
  "Undercommunicated": "沟通说明不足",
  "Understanding Intent": "意图理解",
  "Undo": "撤销",
  "Undo restores your entire workspace to its state at this point.": "撤销会将整个工作区恢复到此节点的状态。",
  "Undo To Here": "撤销到此处",
  "Undo to this point": "撤销到此节点",
  "Unfold code block": "展开代码块",
  "Unified Diff": "统一差异",
  "Uninstalling...": "正在卸载...",
  "Unknown": "未知",
  "Unknown edit": "未知编辑",
  "Unknown Environment": "未知环境",
  "Unknown file edit": "未知文件编辑",
  "Unknown Workspace": "未知工作区",
  "Unnamed": "未命名",
  "Unnamed resource": "未命名资源",
  "Unnamed rule": "未命名规则",
  "unpin": "取消置顶",
  "Unpin": "取消置顶",
  "UNPIN": "取消置顶",
  "Unpin conversation": "取消置顶对话",
  "Unpin Conversation": "取消置顶会话",
  "Unpin this conversation": "取消置顶此会话",
  "Unpin This Conversation": "取消置顶此会话",
  "Unread": "未读",
  "Unstage change": "取消暂存更改",
  "Unstaged Changes": "未暂存的更改",
  "Untitled": "无标题",
  "Untitled Conversation": "无标题会话",
  "Untracked (Unstaged)": "未跟踪 (未暂存)",
  "Update Anyway": "仍然更新",
  "Update Available": "有可用更新",
  "Update Channel": "更新通道",
  "Updated": "更新于",
  "Updated sidebar grouping": "已更新侧边栏分组",
  "Upgrade": "升级",
  "Upload to Agent": "上传至智能体",
  "Uploads": "上传内容",
  "Use advanced SSO config": "使用高级 SSO 配置",
  "Use business account": "使用企业账号",
  "Use Existing": "使用现有项",
  "Use full Git clones for Best of N": "Best of N 使用完整 Git 克隆",
  "Use full VCS clones for Best of N": "Best of N 使用完整 VCS 克隆",
  "Use Google Cloud project instead": "改用 Google Cloud 项目",
  "Use regular expression": "使用正则表达式",
  "Used context well": "善用上下文信息",
  "Used tool": "已使用工具",
  "User cancelled agent execution.": "用户已取消智能体执行。",
  "User Global Rules": "用户全局规则",
  "User Intent": "用户意图",
  "User message": "用户消息",
  "User Prompt Hook": "用户提示词钩子",
  "User uploaded image": "用户上传的图片",
  "Using the Google Antigravity Python SDK to build AI agents": "使用 Google Antigravity Python SDK 构建 AI 智能体",
  "Using this option will attempt to revert all changes in this turn and redo the turn using N parallel trajectories. This will discard any changes made in this turn in order to redo it.": "使用此选项将尝试撤回本轮中的所有更改，并使用 N 条并行轨迹重新执行本轮。为完成重做，本轮已产生的所有更改将被丢弃。",
  "Validate": "验证",
  "Validation failed. Please verify requirements and try again.": "验证失败。请检查要求后重试。",
  "Variables": "变量",
  "Verbose Agent Chat": "详细智能体对话",
  "Verify": "验证",
  "Verify API Connection": "验证 API 连接",
  "Version": "版本",
  "Video attachment": "视频附件",
  "View": "查看",
  "View child subagents": "查看下级子智能体",
  "View comments": "查看评论",
  "View Debug": "查看调试信息",
  "View Diff": "查看差异",
  "View documentation": "查看文档",
  "View Inline Diff": "行内对比",
  "View Log File": "查看日志文件",
  "View network request": "查看网络请求",
  "View network requests": "查看网络请求",
  "View Page": "查看页面",
  "View plans": "查看套餐",
  "View Release Notes": "查看发行说明",
  "View Split Diff": "查看并排差异",
  "View Unified Diff": "统一对比",
  "view usage": "查看用量明细",
  "View usage": "查看用量明细",
  "View Usage": "查看用量明细",
  "View Usage Details": "查看用量详情",
  "Viewed": "已查看",
  "Vision Support": "视觉多模态支持",
  "Waiting": "等待中",
  "Waiting for user input": "正在等待用户输入",
  "Walkthrough": "完成总结文档",
  "Warning": "警告",
  "We apologize for the inconvenience. Please try again later.": "给您带来不便，我们深表歉意。请稍后重试。",
  "Web Preview": "网页预览",
  "Wednesday": "周三",
  "Weekdays": "工作日",
  "Weekends": "周末",
  "Weekly": "每周",
  "Weekly Limit Remaining": "每周限额剩余",
  "Welcome back!": "欢迎回来！",
  "Welcome to": "欢迎使用",
  "What counts as a document": "哪些内容计为文档",
  "What did you like about this response?": "您喜欢这条回复的哪些方面？",
  "When debug mode is on, you can see additional information about each steps in the conversation.": "开启调试模式后，您可以查看会话中每个步骤的详细诊断信息。",
  "When enabled, Agent is given awareness of lint errors created by its edits and may fix them without explicit user prompting.": "启用后，智能体将感知其编辑产生的 lint 错误，并可在无需用户明确提示的情况下修复它们。",
  "When enabled, the agent will include default customizations, including default skills.": "启用后，智能体将包含默认的自定义设置，包括默认技能。",
  "When toggled on, Antigravity collects usage data to help Google enhance performance and features.": "开启后，Antigravity 会收集使用数据，帮助 Google 改进性能和功能。",
  "when working in this project": "在此项目中工作时",
  "When working in this project": "在此项目中工作时",
  "when working in this project.": "在此项目中工作时。",
  "When working in this project.": "在此项目中工作时。",
  "Why are you opting out of auto-triggered Best-of-N?": "您为什么退出自动触发的多候选对决 (Best-of-N)？",
  "Why are you opting out?": "您为什么选择退出？",
  "Why did you choose this winner?": "您为什么选择此优胜方案？",
  "Why did you prefer this response?": "您为什么更青睐此回答？",
  "Wide": "宽",
  "Window": "窗口",
  "Window Controls": "窗口控制按钮",
  "Winner": "优胜方案",
  "Winner survey": "优胜方案评选调查",
  "Winner Survey": "优胜方案评选调查",
  "Word Wrap": "自动换行",
  "Work with local agents from another device.": "从其他设备使用本地智能体。",
  "Working": "工作中",
  "Working Changes": "工作区变更",
  "Working Directory:": "工作目录：",
  "Working...": "工作中...",
  "Workspace": "工作区",
  "Workspace + Worktree": "工作区 + 工作树",
  "Workspace Actions": "工作区操作",
  "Workspace archived successfully": "工作区已成功归档",
  "Workspace CL Status": "工作区 CL 状态",
  "Workspace File Explorer": "工作区文件资源管理器",
  "Workspace Name": "工作区名称",
  "Workspace name can only contain letters, numbers, underscores, and dashes": "工作区名称只能包含字母、数字、下划线和横线",
  "Workspace Rules": "工作区规则",
  "Workspace Settings": "工作区设置",
  "Workspace setup warning": "工作区设置警告",
  "Workspace URI query parameter": "工作区 URI 查询参数",
  "Workspaces": "工作区",
  "Workspaces are not available for this project": "此项目不支持工作区",
  "Worktree": "工作树",
  "Worktrees are a git feature. This folder is shared as is.": "工作树 (Worktrees) 是一项 Git 特性。此文件夹将按原样共享。",
  "Worktrees are available for Git repositories": "Git 仓库支持使用工作树 (Worktrees)",
  "Worktrees are not available for this project": "此项目不支持工作树 (Worktrees)",
  "Write a comment...": "撰写评论...",
  "Write Files": "写入文件",
  "yesterday": "昨天",
  "Yesterday": "昨天",
  "You are on the latest version": "您当前已是最新版本",
  "You can upgrade to a Google AI Ultra plan to receive higher rate limits.": "您可以升级到 Google AI Ultra 套餐，以获得更高的速率限制。",
  "You cannot modify Remote Control settings from Remote Control. Please modify these settings on your local application.": "您无法在远程控制端修改远程控制设置。请在本地客户端应用中修改这些设置。",
  "You cannot sign out from Remote Control. Please sign out on your local application.": "您无法在远程控制端退出登录。请在本地客户端应用中退出登录。",
  "You've reached the maximum number of turns for this battle. End battle mode to continue.": "您已达到本次对决的最大轮次上限。请结束对决模式以继续。",
  "Your Plan": "当前方案",
  "Your Plan: Google AI Pro": "当前套餐：Google AI Pro",
  "No commits to push": "无待推送的提交",
  "No commits to pull": "无待拉取的提交",
  "Hide Whitespace Changes": "隐藏空白字符更改",
  "Show Whitespace Changes": "显示空白字符更改",
  "Ignore Whitespace Changes": "忽略空白字符更改",
  "Ignore Whitespace": "忽略空白字符",
  "Send message Enter": "发送消息 Enter",
  "Send message (Enter)": "发送消息 (Enter)",
  "Send message Return": "发送消息 Return",
  "Send message (Return)": "发送消息 (Return)",
  "Send message Ctrl+Enter": "发送消息 Ctrl+Enter",
  "Send message (Ctrl+Enter)": "发送消息 (Ctrl+Enter)",
  "Send message Cmd+Enter": "发送消息 Cmd+Enter",
  "Send message (Cmd+Enter)": "发送消息 (Cmd+Enter)",
  "Send Message Enter": "发送消息 Enter",
  "Send Message (Enter)": "发送消息 (Enter)",
  "Send Message Return": "发送消息 Return",
  "Send Message (Return)": "发送消息 (Return)",
  "Send Message Ctrl+Enter": "发送消息 Ctrl+Enter",
  "Send Message (Ctrl+Enter)": "发送消息 (Ctrl+Enter)",
  "Send Message Cmd+Enter": "发送消息 Cmd+Enter",
  "Send Message (Cmd+Enter)": "发送消息 (Cmd+Enter)",
  "\"Allow remote debugging for this browser instance\"": "“为此浏览器实例允许远程调试”",
  "1 task running": "1 个运行中的任务",
  "A high-risk mode that disables all safety barriers. The agent operates with full system access, auto-executes all terminal commands, and reads or writes to all local files without review prompts.": "一种会禁用所有安全屏障的高风险模式。智能体拥有完整的系统访问权限，会自动执行所有终端命令，并在无需审查提示的情况下读取或写入所有本地文件。",
  "Access a file outside workspace": "访问工作区外部的文件",
  "Access grants": "授权访问列表",
  "Access to the browser agent tools is blocked by your organization's admin controls policy.": "您的组织管理员控制策略已阻止访问浏览器智能体工具。",
  "Active MCP Servers": "运行中的 MCP 服务",
  "Activity bar background color for the active item. The activity bar is showing on the far left or right and allows to switch between views of the side bar.": "活动栏中处于活动状态项的背景颜色。活动栏显示在最左侧或最右侧，用于在侧边栏的视图之间进行切换。",
  "Activity bar background color. The activity bar is showing on the far left or right and allows to switch between views of the side bar.": "活动栏背景颜色。活动栏显示在最左侧或最右侧，用于在侧边栏的视图之间进行切换。",
  "Activity bar border color for the active item. The activity bar is showing on the far left or right and allows to switch between views of the side bar.": "活动栏活动项的边框颜色。活动栏显示在最左侧或最右侧，用于在侧边栏的视图之间进行切换。",
  "Activity bar border color separating to the side bar. The activity bar is showing on the far left or right and allows to switch between views of the side bar.": "活动栏与侧边栏之间的分隔边框颜色。活动栏显示在最左侧或最右侧，用于在侧边栏的视图之间进行切换。",
  "Activity bar focus border color for the active item. The activity bar is showing on the far left or right and allows to switch between views of the side bar.": "活动栏活动项获得焦点时的边框颜色。活动栏显示在最左侧或最右侧，用于在侧边栏的视图之间进行切换。",
  "Activity bar item foreground color when it is active. The activity bar is showing on the far left or right and allows to switch between views of the side bar.": "活动栏项处于活动状态时的前景文本颜色。活动栏显示在最左侧或最右侧，用于在侧边栏的视图之间进行切换。",
  "Activity bar item foreground color when it is inactive. The activity bar is showing on the far left or right and allows to switch between views of the side bar.": "活动栏项处于非活动状态时的前景文本颜色。活动栏显示在最左侧或最右侧，用于在侧边栏的视图之间进行切换。",
  "Activity notification badge background color. The activity bar is showing on the far left or right and allows to switch between views of the side bar.": "活动栏通知角标的背景颜色。活动栏显示在最左侧或最右侧，用于在侧边栏的视图之间进行切换。",
  "Activity notification badge foreground color. The activity bar is showing on the far left or right and allows to switch between views of the side bar.": "活动栏通知角标的前景文本颜色。活动栏显示在最左侧或最右侧，用于在侧边栏的视图之间进行切换。",
  "Actuation Permissions": "操作权限",
  "Add Allowed Path": "添加允许路径",
  "Add MCP": "添加 MCP",
  "Add MCP Server": "添加 MCP 服务",
  "Add MCP Servers": "添加 MCP 服务器",
  "Add MCP server": "添加 MCP 服务",
  "Add an MCP server above": "在上方添加一个 MCP 服务",
  "Add an MCP server above or add a custom one via the MCP Config.": "在上方添加 MCP 服务，或通过 MCP 配置文件添加自定义服务。",
  "Add to allowlist": "添加到允许列表",
  "Administrator access (UAC)": "管理员权限 (UAC)",
  "Advanced File Access": "高级文件访问策略",
  "Agent Non-Workspace File Access": "智能体工作区外文件访问",
  "Agent Security Settings": "智能体安全设置",
  "Agent always asks for review before proceeding.": "在继续执行前，智能体始终请求审查确认。",
  "Agent always asks for review.": "智能体始终请求审查确认。",
  "Agent can scroll on browser pages to access more content.": "智能体可在浏览器页面上滚动以访问更多内容。",
  "Agent never asks for review. This maximizes the autonomy of the Agent, but also has the highest risk of the Agent operating over unsafe or injected Artifact content.": "智能体从不请求审查。这最大化了智能体的自主性，但智能体在不安全或注入的产物内容上操作的风险最高。",
  "Agent permissions preset selector": "智能体权限预设选择器",
  "Agent security mode": "智能体安全模式",
  "Agent settings and permissions for conversations outside of projects.": "管理项目外对话的智能体设置和权限。",
  "Agent will always ask to review in strict mode.": "在严格模式下，智能体将始终请求审查确认。",
  "Agents have full access to your machine and external resources.": "智能体拥有对您机器和外部资源的完全访问权限。",
  "Agents run in a secure sandbox that restricts access to external resources outside of your trusted folders.": "智能体运行在安全沙箱中，限制对您信任文件夹之外的外部资源的访问。",
  "All terminal commands require review. The agent can read or write to any file in the machine.": "所有终端命令均需审查。智能体可以读写机器上的任何文件。",
  "Allow Cookie Access": "允许访问 Cookie",
  "Allow Form Input": "允许表单数据输入",
  "Allow List Terminal Commands": "允许自动执行的终端命令白名单",
  "Allow Once": "允许一次",
  "Allow Page Navigation": "允许页面跳转导航",
  "Allow Path": "允许访问路径",
  "Allow Screenshots": "允许截取屏幕截图",
  "Allow commands outside workspace sandbox": "允许在工作区沙箱外执行命令",
  "Allow full browser script execution without prompting.": "允许执行完整的浏览器脚本而无需弹窗提示。",
  "Allow once": "允许一次",
  "Allow options": "允许选项",
  "Allow/deny agent browser actuation access to specific URLs.": "允许/禁止智能体对特定 URL 进行浏览器操作交互。",
  "Allow/deny agent command execution outside the sandbox.": "允许/禁止智能体在沙箱外执行命令。",
  "Allow/deny agent read access to specific URLs or domains.": "允许/禁止智能体对特定 URL 或域名的读取访问。",
  "Allow/deny agent read access to specific files or directories.": "允许/禁止智能体对特定文件或目录的读取权限。",
  "Allow/deny agent write access to specific files or directories.": "允许/禁止智能体对特定文件或目录的写入权限。",
  "Allow/deny specific terminal commands.": "允许/禁止特定的终端命令执行。",
  "Allowed Terminal Commands": "允许的终端命令",
  "Allows the agent to access files outside of your current workspace.": "允许智能体访问您当前工作区以外的文件。",
  "Always Allow": "始终允许",
  "Always Ask": "总是询问",
  "Artifact Review Policy": "产物审查策略",
  "Artifacts are created when the agent performs more complex, longer running tasks while in Planning mode.": "当智能体在规划模式下执行更复杂、耗时较长的任务时，将创建产物文档。",
  "Artifacts are files the agent creates during a conversation to help perform longer running tasks and allow the user to provide high-level feedback. Click to open in editor.": "产物是智能体在会话期间创建的文件，用于协助执行长任务并允许用户提供高层级审查反馈。点击可在编辑器中打开。",
  "Ask Before Proceeding": "继续前始终询问",
  "Ask anything, @ to mention, / for actions": "输入任何问题，@ 提及，/ 执行操作",
  "Ask every time": "每次询问",
  "Ask first": "先询问",
  "Ask for permission for sensitive operations.": "对敏感操作请求授权许可。",
  "Autonomous mode active: the agent works independently, and does not ask questions or request new permissions.": "自主模式已激活：智能体将独立工作，不询问问题也不请求新权限。",
  "Background Task Output": "后台任务输出",
  "Background Tasks": "后台任务",
  "Browser Actuation Permissions": "浏览器交互控制权限",
  "Browser Javascript Execution Policy": "浏览器 JavaScript 执行策略",
  "Choose a predefined security preset for the agent. This controls terminal auto-execution policy, and file access policy.": "选择智能体的预定义安全预设。此选项控制终端自动执行策略和文件访问策略。",
  "Commands Outside Sandbox": "沙盒外命令",
  "Commands the agent can run outside the sandbox in this workspace.": "智能体可在此工作区的沙箱之外运行的命令。",
  "Configure agent execution, queued message delivery, and permissions.": "配置智能体执行、排队消息发送和权限。",
  "Configure allowed and denied URLs for browser actuation.": "配置允许和拒绝浏览器操作的 URL。",
  "Configure allowed and denied URLs for reading.": "配置允许和拒绝的网址读取规则。",
  "Configure allowed and denied paths for file reads and writes.": "配置文件读写的允许和拒绝路径。",
  "Configure allowed commands outside the sandbox.": "配置允许在沙盒外执行的命令。",
  "Configure allowed terminal commands.": "配置允许执行的终端命令。",
  "Configure default behaviors, skills, and MCP servers.": "配置默认行为、技能和 MCP 服务器。",
  "Configure global allowed and denied resource permissions.": "配置全局允许和拒绝的资源权限。",
  "Configure workspace-specific permissions, resources, and customizations.": "配置工作区专属的权限、资源和自定义设置。",
  "Configures how the agent tries to access files outside of its working folders.": "配置智能体访问工作文件夹之外文件的方式。",
  "Confirm the command is safe to run outside of the sandbox with full network and disk access.": "确认该命令可以安全地在沙箱外以完整网络和磁盘权限运行。",
  "Dark preview": "深色预览",
  "Delete MCP Server": "删除 MCP 服务",
  "Delete Task": "删除任务",
  "Deny List Terminal Commands": "终端命令黑名单",
  "Deny Path": "禁止访问路径",
  "Document Access": "文档访问",
  "Enable All MCP Tools": "启用所有 MCP 工具",
  "Enable Sandbox Mode (Preview)": "启用沙盒模式（预览）",
  "Enable Terminal Sandbox": "启用终端沙箱",
  "File Access Rules": "文件访问规则",
  "File Permissions": "文件权限",
  "File access": "文件访问",
  "Full access": "完全访问",
  "Grant administrator access for": "授予管理员权限于",
  "Grant permission": "授予权限",
  "In autonomous mode, the agent works with autonomy-enhancing features, and does not ask questions or request new permissions.": "在自主模式下，智能体启用增强自主性功能，不询问问题也不请求新权限。",
  "Installed MCP Servers": "已安装的 MCP 服务器",
  "Keep computer awake while tasks are running": "在任务执行期间保持电脑处于唤醒状态",
  "Keep the app accessible from the menu bar and running in the background when all windows are closed.": "所有窗口关闭后，仍可从菜单栏访问应用并让其在后台运行。",
  "Light preview": "浅色预览",
  "Local Permissions": "本地权限",
  "MCP Config": "MCP 配置",
  "MCP Error": "MCP 错误",
  "MCP Server Status": "MCP 服务状态",
  "MCP Servers": "MCP 服务器",
  "MCP Tool Call Review": "MCP 工具调用审查",
  "MCP Tool:": "MCP 工具：",
  "MCP Tools": "MCP 工具",
  "Manage project folders, agent settings and permissions": "管理项目文件夹、智能体设置与权限",
  "Manage project folders, agent settings and permissions.": "管理项目文件夹、智能体设置与权限。",
  "Manage project folders, agent settings, and permissions": "管理项目文件夹、智能体设置与权限",
  "Manage project folders, agent settings, and permissions.": "管理项目文件夹、智能体设置和权限。",
  "Model Context Protocol Servers": "模型上下文协议 (MCP) 服务",
  "Modify permissions for file, terminal, and MCP tools": "修改文件、终端及 MCP 工具的访问权限",
  "Modify permissions for file, terminal, and MCP tools.": "修改文件、终端和 MCP 工具的权限。",
  "Network Access Rules": "网络访问规则",
  "Network Permissions": "网络权限",
  "No MCP Servers": "没有 MCP 服务器",
  "No MCP servers installed": "未安装 MCP 服务",
  "No background tasks": "没有后台任务",
  "No tasks running": "暂无运行中的任务",
  "Open MCP Config": "打开 MCP 配置",
  "Open Preview": "打开预览",
  "Open allowlist": "打开允许列表",
  "Open in Preview Pane": "在预览面板中打开",
  "Organization Allowed Domains (Read-Only)": "组织允许的域名 (只读)",
  "Outside of folders file access policy": "工作文件夹外文件访问策略",
  "Permission Preset": "权限预设",
  "Permission Settings": "权限设置",
  "Permissions": "权限",
  "Pick a suggestion below to get started, or ask me anything.": "选择下方的建议开始，或直接向我提问。",
  "Policy": "策略",
  "Preview": "预览",
  "Privacy Policy": "隐私政策",
  "Refresh MCP servers": "刷新 MCP 服务器",
  "Request Review": "请求审查",
  "Requires manual review for all terminal commands and file accesses outside of the working folders.": "对所有终端命令和工作文件夹外的文件访问都需要手动审查。",
  "Restricts agent tools to a secure, isolated local sandbox.": "将智能体工具限制在安全隔离的本地沙箱中。",
  "Review": "审查",
  "Review Policy": "审查策略",
  "Run (unsandboxed)": "运行（非沙盒）",
  "Sandbox Allow Network": "沙盒允许网络",
  "Sandboxed": "已沙盒化",
  "Scheduled Tasks": "定时任务",
  "Security": "安全",
  "Security Preset": "安全预设",
  "Share Conversation (Preview)": "共享会话 (预览版)",
  "Specifies Agent's behavior when asking for review on artifacts, which are documents it creates to enable a richer conversation experience.": "指定智能体在请求审查产物时的行为；产物是它创建的文档，用于提供更丰富的对话体验。",
  "Strict Security": "严格安全",
  "Subagent Tasks": "子智能体任务列表",
  "Tab Gitignore Access": "Tab 访问 Gitignore 文件",
  "Task Breakdown": "任务分解",
  "Task not found": "任务未找到",
  "Terminal & Tooling Permissions": "终端与工具权限",
  "Terminal commands always require review and the agent cannot access files outside of its given workspaces.": "终端命令始终需要审查，且智能体无法访问其指定工作区以外的文件。",
  "The breakdown below shows token usage from customizations like skills, rules, and MCP. If the budget is exceeded, large customizations will be truncated automatically.": "下方明细显示技能、规则和 MCP 等自定义内容的令牌用量。如果超出预算，较大的自定义内容将被自动截断。",
  "The browser subagent has been disabled by your administrator.": "浏览器子智能体已被您的管理员禁用。",
  "There may be agents or background tasks running.": "可能有智能体或后台任务正在运行。",
  "This command ran in the sandbox.": "此命令在沙箱中运行。",
  "Tool Permissions": "工具权限",
  "Use Add MCP to browse the store, or add a custom server via the MCP config.": "使用“添加 MCP”浏览应用商店，或通过 MCP 配置文件添加自定义服务。",
  "Vetted (Preview)": "已审查 (预览)",
  "When enabled, sandboxed commands are allowed to make network requests.": "启用后，沙箱命令将被允许发起网络请求。",
  "When enabled, the agent will be able to access past conversations to inform its responses.": "启用后，智能体将能够访问过去的会话来辅助其回复。",
  "Whether the agent asks you to review its documents": "智能体在创建产物文档时是否请求您审查",
  "Whether the agent asks you to review its documents.": "是否由智能体请求您审查其文档。",
  "Workspace Command Access": "工作区命令访问",
  "Workspace File Access": "工作区文件访问",
  "Workspace Web Access": "工作区网络访问",
  "You currently don't have any MCP Servers installed.": "您当前尚未安装任何 MCP 服务。",
  "You currently don't have any MCP Servers installed. Add an MCP server above or add a custom one via the MCP Config.": "您当前尚未安装任何 MCP 服务器。请在上方添加 MCP 服务器，或通过 MCP 配置添加自定义服务器。",
  "to browse the store, or add a custom server via the MCP config": "浏览应用商店，或通过 MCP 配置文件添加自定义服务",
  "to browse the store, or add a custom server via the MCP config.": "浏览应用商店，或通过 MCP 配置文件添加自定义服务。",
  "Configure MCP Server": "配置 MCP 服务",
  "Enter the required configuration values to install this MCP server.": "输入安装此 MCP 服务器所需的配置值。",
  "Could not determine MCP config file path. Please check your home directory settings.": "无法确定 MCP 配置文件路径，请检查您的用户主目录设置。",
  "Could not read MCP config file": "无法读取 MCP 配置文件",
  "Could not determine MCP config file path": "无法确定 MCP 配置文件路径",
  "Failed to load MCP servers": "加载 MCP 服务失败",
  "Failed to fetch available MCP servers:": "获取可用 MCP 服务失败：",
  "Search MCP servers by name": "按名称搜索 MCP 服务器",
  "MCP Install Error:": "MCP 安装错误：",
  "Loading MCP servers...": "正在加载 MCP 服务器...",
  "Search for MCP servers to add to your configuration": "搜索要添加到配置中的 MCP 服务器",
  "? This will remove it from your MCP configuration.": "？这将从您的 MCP 配置中将其移除。",
  "No method available to open MCP config file": "没有可用于打开 MCP 配置文件的关联程序",
  "Failed to open MCP config file": "打开 MCP 配置文件失败",
  "Your administrator has disabled MCP servers for this workspace.": "您的管理员已禁用此工作区的 MCP 服务。",
  "No MCP servers yet. Use Add to browse the store.": "暂无 MCP 服务。使用“添加”浏览应用商店。",
  "MCP Configuration Error:": "MCP 配置错误：",
  "Unnamed MCP server": "未命名 MCP 服务",
  "Unnamed MCP Server": "未命名 MCP 服务",
  "Install this plugin to see the commands it adds, along with its skills, agents and MCP servers.": "安装此插件以查看其添加的命令，以及其包含的技能、智能体和 MCP 服务。",
  "Error while running MCP tool": "运行 MCP 工具时出错",
  "Used MCP tool": "已使用 MCP 工具",
  "MCP tool": "MCP 工具",
  "Execute an MCP tool call": "执行 MCP 工具调用",
  "Plugins are packaged collections of skills and MCPs to help the Agent": "插件是技能和 MCP 的打包集合，用于帮助智能体",
  "Plugins are packaged collections of skills and MCPs to help the Agent in ": "插件是技能与 MCP 的打包集合，用于在此环境中辅助智能体 ",
  "MCP Servers Disabled": "MCP 服务器已禁用",
  "Use Add MCP to browse the store.": "使用“添加 MCP”浏览应用商店。",
  " Organization MCP Allowlist (Read-Only)": " 组织 MCP 允许名单（只读）",
  "These MCP allowlist rules are enforced by your organization": "这些 MCP 允许名单规则由您的组织强制执行",
  "using this MCP tool": "使用此 MCP 工具",
  "Error fetching MCP prompt": "获取 MCP 提示词出错",
  "Inherit Global Permissions": "继承全局权限",
  "Inherit global permissions": "继承全局权限",
  "Global Permissions": "全局权限",
  "Global permissions": "全局权限",
  "Project Permissions": "项目权限",
  "Project permissions": "项目权限",
  "Inherited from Global Permissions": "继承自全局权限",
  "Inherited from global permissions": "继承自全局权限",
  "Override Global Permissions": "覆盖全局权限",
  "Override global permissions": "覆盖全局权限",
  "Project-specific permissions": "项目专属权限",
  "allow": "允许",
  "ask": "询问",
  "deny": "拒绝",
  "Allow": "允许",
  "Ask": "询问",
  "Deny": "拒绝",
  "Proceed in Sandbox": "在沙盒中继续",
  "proceed in sandbox": "在沙箱中执行",
  "Require Review": "需要审查",
  "require review": "需要复核",
  "Vetted": "已审查",
  "Always allow": "始终允许",
  "Always Deny": "始终拒绝",
  "Always deny": "始终拒绝",
  "Always ask": "始终询问",
  "⚠️ Warning: \"Always Proceed\" is enabled without sandbox protection. This is very dangerous and we do not recommend doing this.": "⚠️ 警告：“总是直接继续”在无沙箱保护的情况下已启用。这非常危险，我们不建议这样做。",
  "Warning: \"Always Proceed\" is enabled without sandbox protection. This is very dangerous and we do not recommend doing this.": "警告：“总是直接继续”在无沙箱保护的情况下已启用。这非常危险，我们不建议这样做。",
  "Warning: \"Always Proceed\" is enabled without sandbox protection.": "警告：“总是直接继续”在无沙箱保护的情况下已启用。",
  "⚠️ Warning: \"Always Proceed\" is enabled without sandbox protection.": "⚠️ 警告：“总是直接继续”在无沙箱保护的情况下已启用。",
  "is enabled without sandbox protection.": "在无沙箱保护的情况下已启用。",
  "is enabled without sandbox protection": "在无沙箱保护的情况下已启用",
  "without sandbox protection": "无沙箱保护",
  "without sandbox protection.": "无沙箱保护。",
  "Inherits your Global Permissions": "继承您的全局权限",
  "Inherits your Global Permissions.": "继承您的全局权限。",
  "Inherits your global permissions": "继承您的全局权限",
  "Inherits your global permissions.": "继承您的全局权限。",
  "Inherits your Global Permissions when working in this project": "在此项目中工作时，继承您的全局权限",
  "Inherits your Global Permissions when working in this project.": "在此项目中工作时，继承您的全局权限。",
  "Inherits your global permissions when working in this project": "在此项目中工作时，继承您的全局权限",
  "Inherits your global permissions when working in this project.": "在此项目中工作时，继承您的全局权限。",
  "Also includes Global Permissions": "也包含全局权限",
  "Also includes Global Permissions.": "也包含全局权限。",
  "Also includes global permissions": "也包含全局权限",
  "Also includes global permissions.": "也包含全局权限。",
  "Also includes Global Permissions when working in this project": "在此项目中工作时也包含全局权限",
  "Also includes Global Permissions when working in this project.": "在此项目中工作时也包含全局权限。",
  "Also includes global permissions when working in this project": "在此项目中工作时也包含全局权限",
  "Also includes global permissions when working in this project.": "在此项目中工作时也包含全局权限。",
  "Also includes Global Permissions when working in this project. Learn more.": "在此项目中工作时也包含全局权限。了解更多。",
  "Search tasks...": "搜索任务...",
  "Search tasks": "搜索任务",
  "No scheduled tasks configured.": "未配置定时任务。",
  "No scheduled tasks configured": "尚未配置任何定时任务",
  "No scheduled tasks.": "暂无定时任务。",
  "No scheduled tasks": "暂无定时任务",
  "New Scheduled Task": "新建定时任务",
  "Edit Scheduled Task": "编辑定时任务",
  "Delete Scheduled Task": "删除定时任务",
  "Scheduled Task": "定时任务",
  "Enter scheduled task name...": "输入定时任务名称...",
  "Enter scheduled task name": "输入定时任务名称",
  "All scheduled tasks run as Flash.": "所有定时任务均使用 Flash 模型运行。",
  "All scheduled tasks run as Flash": "所有定时任务均以 Flash 模型运行",
  "scheduled tasks run as Flash.": "定时任务均以 Flash 模型运行。",
  "scheduled tasks run as Flash": "定时任务均以 Flash 模型运行",
  "Add Scheduled Task": "添加定时任务",
  "Save Scheduled Task": "保存定时任务",
  "Run task now": "立即运行任务",
  "Pause Task": "暂停任务",
  "Resume Task": "恢复任务",
  "In review": "审查中",
  "Manage Permissions": "管理权限",
  "Open in Preview Tab": "在预览标签页中打开",
  "Execute JavaScript Policy": "执行 JavaScript 策略",
  "scheduled task": "定时任务",
  "scheduled tasks": "定时任务",
  "The agent never asks for confirmation before executing terminal commands (except those in the Deny list). This provides the agent with the maximum ability to operate over long periods without intervention, but also has the highest risk of the agent executing an unsafe terminal command.": "智能体在执行终端命令前从不请求确认（“拒绝列表”中的命令除外）。这为智能体提供了在无需人工干预的情况下长时间运行的最大能力，但智能体执行不安全终端命令的风险也最高。",
  "The agent always asks for confirmation before executing terminal commands (except those in the Allow list).": "智能体在执行终端命令前始终请求确认（“允许列表”中的命令除外）。",
  "Terminal command automatically proceeds if the command runs inside the sandbox. Otherwise, it requests review.": "如果终端命令在沙箱内运行，则自动继续执行；否则，请求人工复核。",
  "The agent never asks for review. This maximizes the autonomy of the agent, but also has the highest risk of the agent operating over unsafe or injected artifact content.": "智能体从不请求审查。这最大化了智能体的自主性，但智能体处理不安全或被注入产物内容的风险也最高。",
  "The agent always asks for review.": "智能体始终请求审查。",
  "The agent always asks for review": "智能体始终请求审查",
  "Allow full browser script execution.": "允许执行完整的浏览器脚本。",
  "Allow full browser script execution": "允许执行完整的浏览器脚本",
  "Enforce settings that prevent the agent from autonomously running targeted exploits and require human review for all agent actions. Visit antigravity.google/docs/strict-mode for details.": "强制执行安全设置，防止智能体自主运行针对性攻击，并要求对所有智能体操作进行人工审查。详情请访问 antigravity.google/docs/strict-mode。",
  "Plan Review Policy": "计划审查策略",
  "Useful for typical development with an emphasis on security. It prioritizes safety over speed by requiring manual approval for all terminal commands and files outside the project directory.": "适用于注重安全性的常规开发场景。优先保障安全，所有终端命令以及项目目录外的文件访问均需手动审批。",
  "Useful for tasks that require file access across your full machine. The agent has full read and write access to all local files, but all proposed terminal commands require manual review and approval before running.": "适用于需要跨整机访问文件的任务。智能体拥有所有本地文件的完整读写权限，但所有终端命令在运行前仍需手动审查与批准。",
  "Allow the agent to automatically view and edit files outside the current workspace. Use with caution: this gives the agent access to additional potentially-relevant information, but also allows the agent to access credential files, secrets, and other files outside of the workspace that could be targeted in prompt injection attacks or other exploits by malicious actors.": "允许智能体自动查看和编辑当前工作区以外的文件。请谨慎使用：这会让智能体访问更多潜在相关信息，但同时也允许其访问工作区外的凭据、密钥及其他敏感文件。",
  "Allow Tab to view and edit the files in .gitignore. Use with caution if your .gitignore lists files containing credentials, secrets, or other sensitive information.": "允许 Tab 查看和编辑 .gitignore 中列出的文件。如果您的 .gitignore 包含凭据、密钥或其他敏感信息文件，请谨慎开启。",
  "Run terminal commands with sandbox restrictions.": "在沙箱限制下运行终端命令。",
  "These allowed domain rules are set by your organization's administrator and cannot be removed.": "这些允许的域名规则由您所在组织的管理员设置，无法移除。",
  "Allowed Domains": "允许的域名",
  "Denied Sites": "已拒绝的网站",
  "The agent was prevented from accessing some sites": "智能体已被阻止访问部分站点",
  "Site Allowlist": "网站允许列表",
  "The Agent attempted to interact with some sites that are not allowlisted": "智能体尝试与部分未列入白名单的站点进行交互",
  "Add them to allow future interactions": "添加它们以允许后续交互",
  "Added to allowlist": "已添加到允许列表",
  "Allow in Conversation": "在当前会话中允许",
  "Edit permission target": "编辑权限目标",
  "Yes, allow": "是，允许",
  "GitHub Personal Access Token": "GitHub 个人访问令牌 (PAT)",
  "Validated with GitHub and stored, together with your username, in": "已通过 GitHub 验证，并与您的用户名一起安全存储在",
  ". It is not visible in the agent's sandbox and is shared across all your projects.": "中。它在智能体沙箱内不可见，并在您的所有项目间共享。",
  "Create a token": "创建令牌",
  "Hide token": "隐藏令牌",
  "Show token": "显示令牌",
  "Agent can": "智能体可以",
  "Remove policy": "移除策略",
  "Agent can run": "智能体可运行",
  "Workflow files": "工作流文件",
  "at ref": "于分支/引用 (ref)",
  "Workflow refs": "工作流引用 (refs)",
  "Repositories": "代码仓库",
  "Delete repository policy": "删除仓库策略",
  "Contents": "仓库内容",
  "Read access to code, refs, commits, and other repository contents.": "对代码、分支引用、提交记录及其他仓库内容的读取权限。",
  "Read access": "读取权限",
  "Toggle this on to enable read access on contents.": "开启后允许读取仓库内容。",
  "Issues": "议题 (Issues)",
  "Allow creating issues and grant access to specific issues.": "允许创建 Issue 并授予对特定 Issue 的访问权限。",
  "Issue creation": "创建 Issue",
  "Toggle this on to allow creating new issues.": "开启后允许创建新的 Issue。",
  "Access rules": "访问规则",
  "Issue numbers": "Issue 编号",
  "Issue actions": "Issue 操作权限",
  "+ Add issue policy": "+ 添加 Issue 策略",
  "Pull requests": "拉取请求 (PR)",
  "Allow opening pull requests and grant access to specific PRs.": "允许发起拉取请求 (PR) 并授予对特定 PR 的访问权限。",
  "Pull request creation": "创建拉取请求",
  "Toggle this on to allow creating new pull requests.": "开启后允许创建新的拉取请求 (PR)。",
  "Pull request numbers": "PR 编号",
  "Pull request actions": "PR 操作权限",
  "+ Add pull request policy": "+ 添加拉取请求策略",
  "Remote branches": "远程分支",
  "Grant create, update, or delete access to specific branches.": "授予对特定分支的创建、更新或删除权限。",
  "Branch names": "分支名称",
  "Branch actions": "分支操作权限",
  "+ Add branch policy": "+ 添加分支策略",
  "Workflow runs": "工作流运行 (Workflow Runs)",
  "Grant read access to workflow runs and allow dispatching workflows on specific files and refs.": "授予对工作流运行记录的读取权限，并允许在特定文件和分支引用上触发工作流。",
  "Run visibility": "运行记录可见性",
  "+ Add workflow run policy": "+ 添加工作流运行策略",
  "Organizations": "组织机构 (Organizations)",
  "Delete organization policy": "删除组织策略",
  "+ Add Repository policy": "+ 添加代码仓库策略",
  "GitHub Policies": "GitHub 访问策略",
  "Enable fine-grained GitHub permissions and define the org, repository, and resource-level access the agent is allowed to use.": "启用细粒度 GitHub 权限，并定义允许智能体使用的组织、仓库及资源级访问权限。",
  "+ Add Organization policy": "+ 添加组织策略",
  "GitHub Permissions": "GitHub 权限",
  "Manage fine-grained permissions for GitHub.": "管理 GitHub 的细粒度访问权限。",
  "Allow Gemini to notify you when the agent needs your attention or completes a task.": "允许 Gemini 在智能体需要您关注或完成任务时发送系统通知。",
  "Allow Gemini to notify you when the agent needs your attention or completes a task": "允许 Gemini 在智能体需要您关注或完成任务时发送系统通知",
  "Choose whether to be notified when the agent needs your attention or completes a task.": "选择是否在智能体需要您关注或完成任务时接收通知。",
  "Choose whether to be notified when the agent needs your attention or completes a task": "选择是否在智能体需要您关注或完成任务时接收通知",
  ". Learn more about skills at": "。了解更多关于技能的信息，请访问",
  "**STOP AND VERIFY**: Before running any command or tool that results in irreversible data loss, you MUST obtain explicit user consent. When in doubt, ask. It is better to wait for confirmation than to accidentally delete production data or critical project assets. Use this for: - SQL: DROP TABLE/VIEW/SCHEMA/DATABASE, TRUNCATE, or broad DELETE (missing WHERE or using 1=1). - Cloud Storage: gsutil rm or gcloud storage rm targeting production data or critical buckets. - Infrastructure: gcloud projects delete, deleting Spanner/BigQuery/Dataproc resources, deleting secrets, or KMS key destruction.": "【停止并核实】：在运行任何会导致不可逆数据丢失的命令或工具前，必须获得用户的明确同意。如有疑问请先询问，涵盖 SQL（DROP/TRUNCATE/无条件 DELETE）、Cloud Storage 生产数据删除以及 GCP 项目、Spanner、BigQuery、Dataproc 资源或密钥销毁操作。",
  "A collection of skills for architecting and implementing production-ready code using Google Maps Platform APIs and SDKs for any map, place, address, geocoding, routing/ETA (including eco-friendly routing), nearby search, 3D / Street View / static map, marker clustering, custom styling, drawing, geofencing, heatmap, or environmental (air-quality / pollen / solar / weather) feature — across Web, Android, iOS, and Web Services APIs. For prototyping, use the public Maps Demo Key — no billing setup and no Cloud project required, covering a growing set of the most popular Google Maps Platform APIs. For production, the skill prompts you to create and restrict your own key. All non-trivial code is grounded in freshly retrieved docs via the Google Maps Platform Code Assist service (no reliance on training-data memory).": "使用 Google Maps Platform API 与 SDK 构建生产级位置感知代码的技能集合，涵盖地图、地点、地址解析、路线规划/ETA、周边搜索、3D/街景/静态地图、聚合标记、自定义样式、地理围栏、热力图及环境数据（空气质量/花粉/日照/天气），支持使用公开演示密钥快速构建原型。",
  "A Gemini-powered security agent decides if commands should be auto-approved.": "由 Gemini 驱动的安全智能体决定是否自动批准命令。",
  "Access protein metadata, function, taxonomy, and sequences across UniProtKB, UniParc, and UniRef. Use when searching for proteins, mapping identifiers, or retrieving functional annotations and publications. Don't use for sequence alignment, protein folding, or sequence similarity search (use specialized skills for those tasks).": "访问跨 UniProtKB、UniParc 和 UniRef 的蛋白质元数据、功能、分类学信息与序列。适用于搜索蛋白质、映射标识符或检索功能注释与相关文献。",
  "Active Skills": "已启用技能",
  "Add `flutter_localizations` and `intl` dependencies, enable \"generate true\" in `pubspec.yaml`, and create an `l10n.yaml` configuration file. Use when initializing localization support for a new Flutter project.": "添加 `flutter_localizations` 和 `intl` 依赖，在 `pubspec.yaml` 中启用 `generate: true`，并创建 `l10n.yaml` 配置文件。为新的 Flutter 项目初始化本地化支持时使用。",
  "Add flutter_localizations and intl dependencies, enable \"generate true\" in pubspec.yaml, and create an l10n.yaml configuration file. Use when initializing localization support for a new Flutter project.": "添加 flutter_localizations 与 intl 依赖项，在 pubspec.yaml 中启用 generate: true 并创建 l10n.yaml 配置文件。适用于为新 Flutter 项目初始化多语言本地化支持。",
  "Add Handler": "添加处理器",
  "Add New Handler to": "添加新处理器至",
  "Adds interactive widget previews to the project using the previews.dart system. Use when creating new UI components or updating existing screens to ensure consistent design and interactive testing.": "使用 `previews.dart` 系统向项目添加交互式组件预览。创建新 UI 组件或更新现有界面时使用，以保证设计一致并进行交互测试。",
  "Advanced Command Access": "高级命令访问权限",
  "Advanced Web Access": "高级网页访问权限",
  "Agent data is not available": "智能体数据不可用",
  "Agent Market Search Results": "智能体市场搜索结果",
  "Agent settings and permissions can be further customized below.": "智能体设置与权限可在下方进一步自定义。",
  "AI coding agents are known to have certain security limitations. Users should be aware of potential risks, including data exfiltration and possible code execution. Avoid processing highly sensitive data and verify all the actions taken by the agent.": "AI 编码智能体已知存在一定的安全局限性。用户应注意潜在风险，包括数据外泄和潜在的代码执行。请避免处理高度敏感的数据，并核实智能体执行的所有操作。",
  "AI coding agents are known to have certain security risks, including autonomous code execution, data exfiltration, prompt injection and supply chain risks. Ensure that you monitor and verify all actions taken by the agent.": "AI 编码智能体已知存在一定的安全风险，包括自主代码执行、数据外泄、提示词注入以及供应链风险。请确保监控并核实智能体执行的所有操作。",
  "Allow the agent to run without restrictions.": "允许智能体无限制运行。",
  "Analyzes genetic variant effects on gene expression (RNA-seq), chromatin accessibility (DNASE), histone marks (ChIP), and transcription factors using the AlphaGenome API. Use when the user asks about non-coding variant effects, pathogenicity, clinical significance, disease associations, functional effects, gene expression changes, splicing disruption, or regulatory effects in promoters and enhancers. Also use for resolving biological terms to tissue/cell-type ontologies (UBERON/CL) or analyzing variants in chr:pos:ref>alt format.": "使用 AlphaGenome API 分析遗传变异对基因表达 (RNA-seq)、染色质可及性 (DNASE)、组蛋白修饰 (ChIP) 和转录因子的影响。适用于分析非编码区变异效应、致病性、剪接破坏及启动子/增强子调控效应。",
  "Ancient text restoration, attribution, dating, contextualization, and embedding via Aeneas (Latin) / Ithaca (Ancient Greek). Use when asked to \"restore\", \"attribute\", \"date\", \"contextualize\", \"find parallels\", \"where was it written\", \"when was it written\", \"embed\", or \"analyze\" an ancient text, inscription, or epigraphic document, or when the user mentions \"Aeneas\", or \"Ithaca\".": "通过 Aeneas（拉丁语）/ Ithaca（古希腊语）对古代文献、铭文或碑刻进行文本复原、归属判定、年代测定、语境化分析与向量嵌入。",
  "Antigravity does not collect any of your prompts, content, or model responses but does collect general usage patterns such as feature adoption and active user counts (“product analytics”). Telemetry data will be handled in accordance with the Google Privacy Policy.": "Antigravity 不会收集您的任何提示词、内容或模型回复，但会收集功能采用率和活跃用户数等常规使用模式（“产品分析”）。遥测数据将依据《Google 隐私权政策》进行处理。",
  "Architects a Flutter application using the recommended layered approach (UI, Logic, Data). Use when structuring a new project or refactoring for scalability.": "使用推荐的分层方式（UI、逻辑、数据）设计 Flutter 应用架构。构建新项目结构或为可扩展性进行重构时使用。",
  "Assesses the security posture of Google Cloud Storage (GCS) buckets and projects. Grounds every finding in gathered telemetry, evaluates buckets against Google security best practices (public access, IAM over-granting, CMEK, VPC Service Controls, audit logging), and correlates signals to flag toxic combinations of individually low-risk settings, with actionable remediation. Use whenever a user asks for a security scan, audit, review, vulnerability check, or compliance assessment (including SAIF) — or simply asks whether their buckets, project, or data are secure, exposed, public, or misconfigured, who can access their data, or wants storage hardened or locked down, e.g. before a launch. Don't use for diagnosing a specific access failure or 403, managing or configuring storage, investigating a live outage, or non-GCS resources (Compute Engine, GKE, etc.).": "评估 Google Cloud Storage (GCS) 存储桶与项目的安全态势。基于采集的遥测数据对照 Google 安全最佳实践（公共访问、IAM 过度授权、CMEK、VPC Service Controls、审计日志）进行评估，并提供可执行的修复方案。",
  "Assists in provisioning instances/tables, designing performant schemas, and querying data in Bigtable. Use when designing Bigtable row keys, configuring column families, writing SQL queries or client library code (Java, Go, Python) for Bigtable, or diagnosing performance/hotspotting issues. Also use when provisioning Bigtable clusters using gcloud or cbt CLIs. Don't use for generic Cloud SQL administration.": "协助在 Bigtable 中配置实例与表、设计高性能模式 (Schema) 并查询数据。适用于设计 Bigtable 行键、配置列族、编写 SQL 或客户端代码（Java、Go、Python）以及诊断性能热点问题。",
  "Audits Firebase (Firestore, Cloud Storage) security rules for vulnerabilities, privilege escalation, role bypasses, create vs update inconsistencies, resource exhaustion, type safety, size limits, and hasOnly ownership checks. Use when auditing/reviewing rules, running red-team rule assessments, or scoring against auditor checklists. Don't use for Firebase CLI (login, deploy), Auth, Crashlytics, Remote Config, or database queries.": "审计 Firebase（Firestore、Cloud Storage）安全规则中的漏洞、权限提升、角色绕过、创建与更新不一致、资源耗尽、类型安全、大小限制及所有权检查问题。",
  "Auto (Preview)": "自动 (预览版)",
  "Automated data quality and transformation capabilities for Dataform/dbt/BigQuery pipelines. Processes data sourced from BigQuery or Cloud Storage (GCS), applying best practices for data ingestion, movement, schema mapping, and comprehensive data cleaning.": "面向 Dataform/dbt/BigQuery 流水线的自动化数据质量检查与转换能力。支持处理来自 BigQuery 或 Cloud Storage (GCS) 的数据，应用数据摄取、迁移、模式映射与全面数据清洗的最佳实践。",
  "Automates declarative resource creation and provisioning for data pipelines, supporting BigQuery, Dataform, Dataproc, BigQuery Data Transfer Service (DTS), and other resources. It manages environment-specific configurations (dev, staging, prod) through a deployment.yaml file. Use when: - Modifying or creating deployment.yaml for deployment settings. - Resolving environment-specific variables (e.g., Project IDs, Regions) for deployment. - Provisioning supported infrastructure like BigQuery datasets/tables, Dataform resources, or DTS resources via deployment.yaml. Do not use when: - Resources already exist. - Managing resources not supported by `gcloud beta orchestration-pipelines resource-types list`. - Managing general cloud infrastructure (VMs, networks, Kubernetes, IAM policies), which are better suited for Terraform. - Infrastructure spans multiple cloud providers (AWS, Azure, etc.). - Already uses Terraform for the target resources.": "通过 deployment.yaml 文件自动化数据流水线的声明式资源创建与配置（支持 BigQuery、Dataform、Dataproc、BigQuery DTS 等），并管理开发、预发和生产等多环境专属配置。",
  "Automates declarative resource creation and provisioning for data pipelines, supporting BigQuery, Dataform, Dataproc, BigQuery Data Transfer Service (DTS), and other resources. It manages environment-specific configurations (dev, staging, prod) through a deployment.yaml file. Use when: - Modifying or creating deployment.yaml for deployment settings. - Resolving environment-specific variables (e.g., Project IDs, Regions) for deployment. - Provisioning supported infrastructure like BigQuery datasets/tables, Dataform resources, or DTS resources via deployment.yaml. Do not use when: - Resources already exist. - Managing resources not supported by gcloud beta orchestration-pipelines resource-types list. - Managing general cloud infrastructure (VMs, networks, Kubernetes, IAM policies), which are better suited for Terraform. - Infrastructure spans multiple cloud providers (AWS, Azure, etc.). - Already uses Terraform for the target resources.": "通过 deployment.yaml 文件自动化数据流水线的声明式资源创建与配置（支持 BigQuery、Dataform、Dataproc、BigQuery DTS 等），并管理开发、预发和生产等多环境专属配置。",
  "Automatically decide whether the command should run.": "自动决定是否允许运行该命令。",
  "Automatically migrate legacy workflows to modern skills across global and workspace configurations. Scans for existing workflows, creates target SKILL.md files, and safely archives old workflow files.": "在全局和工作区配置中自动将旧版工作流 (Workflows) 迁移为现代技能 (Skills)。自动扫描现有工作流、创建目标 SKILL.md 文件并安全归档旧工作流文件。",
  "automation. Automations do not inherit Global Permissions.": "自动化任务。自动化任务不会继承全局权限。",
  "Automations do not inherit Global Permissions": "自动化任务不会继承全局权限",
  "Automations do not inherit Global Permissions.": "自动化任务不会继承全局权限。",
  "Blocked by organization policy": "已被组织策略拦截",
  "Browse, filter, and download life sciences, biology, and medical preprints from bioRxiv and medRxiv. Supports fetching paper metadata by DOI, and browsing by date range with category and keyword filters. Keyword filtering is local, so date ranges MUST be narrow (1-4 weeks) with a category to prevent timeouts.": "浏览、筛选和下载来自 bioRxiv 与 medRxiv 的生命科学、生物学和医学预印本论文。支持按 DOI 获取论文元数据，或按窄日期范围（1~4 周）结合学科分类与关键词筛选检索。",
  "Build and prototype location-aware applications with Google Maps Platform": "使用 Google Maps Platform 构建和设计位置感知型应用原型",
  "Build and prototype location-aware applications with Google Maps Platform.": "使用 Google Maps Platform 构建和设计位置感知型应用原型。",
  "Build and prototype location-aware applications with Google Maps Platform. Integrate interactive maps, search and inspect Places details, calculate optimal routes": "使用 Google Maps Platform 构建和设计位置感知型应用原型。集成交互式地图、搜索与查看地点详情，并计算最佳路线",
  "Build and prototype location-aware applications with Google Maps Platform. Integrate interactive maps, search and inspect Places details, calculate optimal routes.": "使用 Google Maps Platform 构建具有位置感知能力的应用和原型。可集成交互式地图、搜索与检查地点详情，并计算最优路线。",
  "Build and publish Chrome Extensions using Manifest V3 best practices. Use this skill whenever the user asks to create, modify, debug, or understand Chrome browser extensions, add-ons, or anything involving the Chrome Extensions API. Trigger on mentions of: 'Chrome extension', 'browser extension', 'manifest.json', 'content script', 'service worker' (in browser context), 'popup' (in browser extension context), 'side panel', 'chrome.* API', 'declarativeNetRequest', 'omnibox', 'context menu' (in extension context), 'userScripts', 'user script', 'script manager', or any request to build functionality that integrates with the Chrome browser UI. Also trigger for publishing to the Chrome Web Store: 'publish extension', preparing an extension for publishing, responding to a review rejection, writing permission justifications, or drafting a privacy policy.": "基于 Manifest V3 最佳实践构建并发布 Chrome 浏览器扩展程序。当用户需要创建、修改、调试或了解 Chrome 扩展、插件、manifest.json、content script、service worker、side panel、chrome.* API 或发布至 Chrome 应用商店时触发此技能。",
  "Build applications with the Gemini Interactions API and Live API, including text generation, multi-turn chat, streaming, function calling, managed agents, and real-time audio/video": "使用 Gemini Interactions API 和 Live API 构建应用，包括文本生成、多轮对话、流式传输、函数调用、托管智能体以及实时音视频",
  "Build applications with the Gemini Interactions API and Live API, including text generation, multi-turn chat, streaming, function calling, managed agents, and real-time audio/video.": "使用 Gemini Interactions API 和 Live API 构建应用，涵盖文本生成、多轮对话、流式输出、函数调用、托管智能体以及实时音视频。",
  "Build modern data apps, dashboards, and interactive reports using either React + Vite or Streamlit. Includes optional Gemini Data Analytics chat integration for an AI powered \"chat with your data\" experience. Relevant when any of the following conditions are true: 1. User explicitly requests to build a data dashboard, data application, or visualization UI, and the UI pulls data from a GCP database (defaulting to BigQuery unless otherwise specified). 2. You need to generate a frontend web application to interact with, query, and visualize data from GCP data sources. 3. User wants to build a \"chat with your data\" experience or integrate the Gemini Data Analytics chat API into a web interface. Do NOT use when any of the following conditions are true: 1. The request is for building backend-only services. 2. The request is for simple CLI scripts or command-line applications. 3. The web application is not data-centric or does not involve visualizing/querying data from GCP sources.": "使用 React + Vite 或 Streamlit 构建现代数据应用、仪表盘和交互式报表，并支持集成可选的 Gemini 数据分析对话功能，实现“与数据对话”的 AI 体验。",
  "Build with Antigravity Plugins": "使用 Antigravity 插件构建",
  "Build with Google": "使用 Google 构建",
  "Build with Google Plugins": "Build with Google 插件目录",
  "Build, package, run, and debug UI extensions for Antigravity: interactive web panels that render in the side pane, served by a Node.js sidecar using the built-in Sidecar SDK": "构建、打包、运行与调试 Antigravity 的 UI 扩展：在侧边栏面板中渲染交互式 Web 面板，由使用内置 Sidecar SDK 的 Node.js sidecar 提供服务",
  "Build, package, run, and debug UI extensions for Antigravity: interactive web panels that render in the side pane, served by a Node.js sidecar using the built-in Sidecar SDK.": "构建、打包、运行与调试 Antigravity 的 UI 扩展：在侧边栏面板中渲染交互式 Web 面板，由使用内置 Sidecar SDK 的 Node.js sidecar 提供服务。",
  "Building UI Extensions": "构建 UI 扩展",
  "Builds and deploys Firebase SQL Connect (aka Firebase Data Connect) backends with PostgreSQL securely. Use when designing schemas with tables and relations, writing authorized queries and mutations, configuring real-time data updates, or generating type-safe SDKs. Use when you need a relational database with Firebase, or when the user mentions SQL Connect or Data Connect.": "安全地使用 PostgreSQL 构建和部署 Firebase SQL Connect（即 Firebase Data Connect）后端。设计表和关系架构、编写带授权的查询与变更、配置实时数据更新或生成类型安全 SDK 时使用；需要在 Firebase 中使用关系型数据库，或用户提到 SQL Connect、Data Connect 时也应使用。",
  "Bundles will let you download a whole group of user-defined plugins at once, instead of installing them one at a time. They are not here yet.": "组合包功能将支持一次性下载整组自定义插件，而无需逐个安装。该功能即将上线，敬请期待。",
  "Checks whether the uv Python package manager is installed and installs it if missing. Ensures uv is on PATH. Use when another skill requires uv as a prerequisite.": "检查 uv Python 包管理器是否已安装，若缺失则自动安装并确保其位于 PATH 环境变量中。当其他技能需要 uv 作为前置条件时使用。",
  "Click to disable tool": "点击禁用工具",
  "Click to enable tool": "点击启用工具",
  "Collect coverage using the coverage packge and create an LCOV report": "使用 `coverage` 包收集覆盖率并生成 LCOV 报告。",
  "Command is required": "命令为必填项",
  "Commands the agent can run outside the sandbox.": "智能体可在沙箱外运行的命令。",
  "Comprehensive guide and reference for the Antigravity Customization System. Use to explain how customizations work, their loading priority, discovery mechanisms, and to guide the creation of skills, rules, plugins, hooks, and MCP servers.": "Antigravity 自定义系统的完整指南和参考。用于解释自定义项的工作方式、加载优先级和发现机制，并指导创建技能、规则、插件、钩子和 MCP 服务器。",
  "Comprehensive guide for Firebase Crashlytics, including provisioning and SDK usage. Use this skill when the user needs help setting up Crashlytics, adding crash reporting, or using the Crashlytics SDK in their application.": "Firebase Crashlytics 完整指南，涵盖资源配置和 SDK 用法。当用户需要设置 Crashlytics、添加崩溃报告或在应用中使用 Crashlytics SDK 时使用。",
  "Configure `MaterialApp.router` using a package like `go_router` for advanced URL-based navigation. Use when developing web applications or mobile apps that require specific deep linking and browser history support.": "使用 `go_router` 等软件包配置 `MaterialApp.router`，实现高级 URL 导航。开发需要特定深层链接和浏览器历史记录支持的 Web 或移动应用时使用。",
  "Configure GitHub access policies.": "配置 GitHub 访问策略。",
  "Configure hooks that run on agent lifecycle events.": "配置在智能体生命周期事件触发时运行的钩子 (Hooks)。",
  "Configure MaterialApp.router using a package like go_router for advanced URL-based navigation. Use when developing web applications or mobile apps that require specific deep linking and browser history support.": "使用 go_router 等路由包配置 MaterialApp.router 以实现高级 URL 导航。适用于开发需要深度链接 (Deep Linking) 与浏览器历史记录支持的 Web 或移动应用。",
  "Configured servers": "已配置的服务器",
  "Configures Flutter Driver for app interaction and converts MCP actions into permanent integration tests. Use when adding integration testing to a project, exploring UI components via MCP, or automating user flows with the integration_test package.": "配置 Flutter Driver 进行应用交互，并将 MCP 操作转换为永久集成测试。向项目添加集成测试、通过 MCP 探索 UI 组件，或使用 `integration_test` 包自动化用户流程时使用。",
  "Connecting to language server...": "正在连接语言服务器...",
  "Constructs deep-links and URLs for the AlphaGenome Atlas website. Supports generating single-variant exploration links (1-based chr:pos:ref>alt), genomic locus views (1-based closed chr:start-end), candidate summary tables, and AlphaGenome reference vs. alternate predictions. Use whenever visualizing, exploring, charting, or linking genetic variants and genomic loci on the AlphaGenome Atlas, or when asked to inspect, view, or link predictions for a genomic variant.": "构建 AlphaGenome Atlas 网站的深度链接与 URL。支持生成单变异位点探索链接、基因组位点视图、候选汇总表以及参考与变异预测对比链接。",
  "Contact your administrator to enable browser use": "请联系您的管理员以启用浏览器功能",
  "Contact your administrator to enable browser use.": "请联系您的管理员以启用浏览器功能。",
  "Copied to clipboard": "已复制到剪贴板",
  "Copy command": "复制命令",
  "Core tools and knowledge required to develop for Android.": "开发 Android 应用所需的核心工具与知识。",
  "Could not determine agent config file path": "无法确定智能体配置文件路径",
  "Could not determine plugin config file path": "无法确定插件配置文件路径",
  "Create model classes with `fromJson` and `toJson` methods using `dart:convert`. Use when manually mapping JSON keys to class properties for simple data structures.": "使用 `dart:convert` 创建带有 `fromJson` 和 `toJson` 方法的模型类。为简单数据结构手动映射 JSON 键与类属性时使用。",
  "Create model classes with fromJson and toJson methods using dart:convert. Use when manually mapping JSON keys to class properties for simple data structures.": "使用 dart:convert 创建包含 fromJson 和 toJson 方法的模型类。适用于针对简单数据结构手动将 JSON 键映射到类属性。",
  "Create plugin": "创建插件",
  "Creates Cloud Storage (Google Cloud Storage, or GCS) buckets. Analyzes the workload (sensitive data, media hosting, ingestion, web hosting, archiving, backup, logging, analytics, AI/ML, or general-purpose), validates project-level security settings, and designs a secure-by-default, cost-effective configuration (location, storage class, uniform bucket-level access, public access prevention, soft delete, lifecycle) before creating it. Use whenever a user wants to create, make, set up, provision, or spin up a bucket, or needs object storage for an app, service, pipeline, or dataset — even a \"simple\" or \"default\" bucket, or when bucket creation is one step in a larger workflow. Outputs or executes the creation via gcloud, the JSON/REST API, Terraform, or SDK client libraries (C++, Java, Python, Go). Don't use for anything other than creating new buckets — for uploads, downloads, access changes, or reconfiguring existing buckets, use google-cloud-storage-basics.": "创建 Google Cloud Storage (GCS) 存储桶。在创建前分析工作负载类型、验证项目级安全设置，并设计默认安全且高性价比的配置方案（区域、存储类别、统一存储桶级访问、防公共访问、软删除与生命周期）。",
  "CRITICAL RULE: You MUST use this skill whenever the task involves any machine learning tasks or data analysis. Use this skill if the user's prompt or requirements mention any of the following: * Clustering * Classification * Regression * Time series forecasting * Statistical testing * Model comparison * ML * Data analysis SQL/BigQuery ML HANDOFF: If the user requires a SQL solution, use this skill to dictate the ANALYSIS STEPS (e.g., markdown analysis cells, visualization logic), but defer to `bigquery` for all SQL syntax.": "【核心规则】：当任务涉及任何机器学习或数据分析（包括聚类、分类、回归、时间序列预测、统计检验、模型对比、ML 或数据分析）时，必须使用此技能。",
  "CRITICAL RULE: You MUST use this skill whenever the task involves any machine learning tasks or data analysis. Use this skill if the user's prompt or requirements mention any of the following: * Clustering * Classification * Regression * Time series forecasting * Statistical testing * Model comparison * ML * Data analysis SQL/BigQuery ML HANDOFF: If the user requires a SQL solution, use this skill to dictate the ANALYSIS STEPS (e.g., markdown analysis cells, visualization logic), but defer to bigquery for all SQL syntax.": "【核心规则】：当任务涉及任何机器学习或数据分析（包括聚类、分类、回归、时间序列预测、统计检验、模型对比、ML 或数据分析）时，必须使用此技能。",
  "Curated collection of agent skills for science": "精选用于科学计算与科研任务的智能体技能集合",
  "Curated collection of agent skills for science tasks": "精选用于科学计算与科研任务的智能体技能集合",
  "Curated collection of agent skills for science.": "为科学研究精选的智能体技能集合。",
  "Custom Agent Error:": "自定义智能体错误：",
  "custom agents": "自定义智能体",
  "Customizations views": "自定义扩展视图",
  "Define and generate mock objects for external dependencies using `package:mockito` and `build_runner`. Use when unit testing classes that depend on complex external services like APIs or databases.": "使用 `package:mockito` 和 `build_runner` 定义并生成外部依赖的模拟对象。对依赖 API 或数据库等复杂外部服务的类进行单元测试时使用。",
  "Define and generate mock objects for external dependencies using package:mockito and build_runner. Use when unit testing classes that depend on complex external services like APIs or databases.": "使用 package:mockito 和 build_runner 为外部依赖项定义并生成 Mock 模拟对象。适用于对依赖 API 或数据库等复杂外部服务的类进行单元测试。",
  "Deploys and configures classic Firebase Hosting for static websites, single-page apps (SPAs), and microservices. Use when deploying static sites/SPAs, setting up custom domains, configuring firebase.json hosting settings (redirects, rewrites, headers, multi-site), or managing preview channels. Don't use for Firebase App Hosting (Next.js/SSR), Auth, Firestore queries/rules, Data Connect, or Crashlytics.": "为静态网站、单页应用 (SPA) 和微服务部署与配置经典版 Firebase Hosting。适用于部署静态站点、绑定自定义域名、配置 firebase.json 托管规则（重定向、重写、响应头、多站点）或管理预览频道。",
  "Deploys and manages full-stack web applications (Next.js, Angular) with Server-Side Rendering (SSR) using Firebase App Hosting. Use when deploying Next.js/Angular apps, configuring apphosting.yaml or firebase.json apphosting blocks, managing secrets, setting up GitHub CI/CD, or configuring Blaze billing requirements. Don't use for classic static web hosting, Auth, Firestore, Crashlytics, or Xcode.": "使用 Firebase App Hosting 部署和管理支持服务端渲染 (SSR) 的全栈 Web 应用（Next.js、Angular）。涵盖配置 apphosting.yaml 或 firebase.json、管理密钥、设置 GitHub CI/CD 及配置 Blaze 计费要求。",
  "Design, implement, and debug autonomous AI agents and multi-agent systems using the Google Antigravity (AGY) SDK. ACTIVATE this skill when the user wants to create, configure, or orchestrate Google Antigravity agents.": "使用 Google Antigravity (AGY) SDK 设计、实现和调试自主 AI 智能体与多智能体系统。当用户需要创建、配置或编排 Google Antigravity 智能体时激活此技能。",
  "Designs, authors, refactors, and hardens production-grade Cloud Firestore Security Rules (firestore.rules). IMPORTANT: If subagent delegation AND the firestore-rules-author subagent are available in your environment, delegate authoring firestore.rules to the firestore-rules-author subagent. If subagent delegation is unavailable (e.g. not enabled in the IDE), firestore-rules-author is not installed, or you are running inside firestore-rules-author, follow this skill directly.": "设计、编写、重构并加固生产级 Cloud Firestore 安全规则 (firestore.rules)。若当前环境支持子智能体委派且已安装 firestore-rules-author，请优先委派给该子智能体执行。",
  "Develops and executes Spark code on Managed Spark on Google Cloud (Dataproc Clusters and Serverless). Reads and writes data using BigLake Iceberg catalogs, BigQuery and Spanner. Debugs execution failures. Use when: - Writing Spark ETL pipelines on Google Cloud Platform. - Training or running inference with Machine Learning models with spark on Google Cloud Platform. - Managing Spark clusters, jobs, batches, and interactive sessions. Don't use when: - Writing generic Python scripts that don't use Spark. - Performing simple SQL queries that can be done directly in BigQuery.": "在 Google Cloud 托管式 Spark（Dataproc 集群与 Serverless）上开发并执行 Spark 代码。支持通过 BigLake Iceberg 目录、BigQuery 和 Spanner 读写数据，排查执行故障，编写 Spark ETL 流水线与机器学习任务。",
  "Diagnoses and resolves memory leaks in JavaScript/Node.js applications. Use when a user reports high memory usage, OOM errors, or wants to analyze heapsnapshots or run memory leak detection tools like memlab.": "诊断并解决 JavaScript/Node.js 应用中的内存泄漏问题。适用于用户反馈高内存占用、OOM 内存溢出错误，或需要分析堆快照及运行 memlab 等内存泄漏检测工具的场景。",
  "Disabled by organization policy": "已被组织策略禁用",
  "Discover UI plugin panels relevant to the current task and surface a one-click pill in chat to open (toggle) them in the side pane. Use when a running UI plugin's panel would help with what the user is doing, or right after the user enables a new UI plugin pane and a shortcut to open it is handy": "发现与当前任务相关的 UI 插件面板，并在对话中呈现一键胶囊按钮以便在侧边栏面板中快速打开（切换）它们。当正在运行的 UI 插件面板有助于用户操作，或者用户刚启用新的 UI 插件面板需要便捷快捷方式时使用",
  "Discover UI plugin panels relevant to the current task and surface a one-click pill in chat to open (toggle) them in the side pane. Use when a running UI plugin's panel would help with what the user is doing, or right after the user enables a new UI plugin pane and a shortcut to open it is handy.": "发现与当前任务相关的 UI 插件面板，并在对话中呈现一键胶囊按钮以便在侧边栏面板中快速打开（切换）它们。当正在运行的 UI 插件面板有助于用户操作，或者用户刚启用新的 UI 插件面板需要便捷快捷方式时使用。",
  "Discovers and inspects BigQuery Data Transfer Service (DTS) configurations. Use this to identify existing ingestion pipelines and extract datasource or transfer config metadata for data pipelines. Use when a user asks for ingestion scenarios while building or managing data pipelines or when a user asks to \"ingest\" or \"add\" data that may already be managed by a DTS transfer.": "发现并检查 BigQuery 数据传输服务 (DTS) 配置。用于识别数据源、监控传输运行状态、诊断错误日志、查看调度计划，或排查表数据陈旧与上游数据摄取问题。",
  "Distills a completed user workflow or interaction into a reusable agent skill. Use when the user asks to turn their workflow, interaction, or multi-step process into a skill, or when they say \"make this a skill\", \"create a skill from what we just did\", \"package this workflow\" or similar. Do not use for creating skills from scratch without an existing workflow (use a generic skill-creator for that).": "将已完成的用户工作流或交互过程提炼打包为可复用的智能体技能。当用户要求“将此流程制作为技能”、“根据刚才的操作创建技能”或“打包此工作流”时使用。",
  "does not collect any of your prompts, content, or model responses but does collect general usage patterns such as feature adoption and active user counts (“product analytics”). Telemetry data will be handled in accordance with the Google Privacy Policy.": "不会收集您的任何提示词、内容或模型回复，但会收集功能采用率和活跃用户数等常规使用模式（“产品分析”）。遥测数据将依据《Google 隐私权政策》进行处理。",
  "Edit Config": "编辑配置",
  "Enable Sandbox Mode": "启用沙箱模式",
  "Encountered an error while running the plugin.": "运行插件时遇到错误。",
  "Enforces resource attribution for CLI commands. Use this skill whenever you are running `bq` or `gcloud` commands via `run_command`. It ensures mandatory labeling for supported `bq` operations while avoiding invalid flags on read-only commands.": "为 CLI 命令强制执行资源归属标记。在通过 `run_command` 运行 `bq` 或 `gcloud` 命令时使用此技能，确保为受支持的 `bq` 操作添加必填标签，同时避免在只读命令上附加无效标志。",
  "Enforces resource attribution for CLI commands. Use this skill whenever you are running bq or gcloud commands via run_command. It ensures mandatory labeling for supported bq operations while avoiding invalid flags on read-only commands.": "为 CLI 命令强制执行资源归属标记。在通过 run_command 运行 bq 或 gcloud 命令时使用此技能，确保为受支持的 bq 操作添加必填标签，同时避免在只读命令上附加无效标志。",
  "Ensures proper Python dependency management, avoiding global `pip install` and adhering to project-specific tooling. Use this skill if any of the following are true: 1. Attempting to run `pip install {package_name}`. 2. Python packages or dependencies need to be added or modified. 3. Initiating a new Python project. 4. Creating a new notebook, even if just using BigQuery cells. 5. Generating Python code that includes `import` statements for third-party libraries. 6. Before executing Python scripts via the terminal to ensure the correct virtual environment is active.": "确保规范的 Python 依赖管理，避免使用全局 `pip install`，并遵循项目专属的依赖管理工具规范。",
  "Ensures proper Python dependency management, avoiding global pip install and adhering to project-specific tooling. Use this skill if any of the following are true: 1. Attempting to run pip install {package_name}. 2. Python packages or dependencies need to be added or modified. 3. Initiating a new Python project. 4. Creating a new notebook, even if just using BigQuery cells. 5. Generating Python code that includes import statements for third-party libraries. 6. Before executing Python scripts via the terminal to ensure the correct virtual environment is active.": "确保规范的 Python 依赖管理，避免使用全局 pip install，并遵循项目专属的依赖管理工具规范。",
  "Enter command (e.g., git, blaze)...": "输入命令（例如 git、blaze）...",
  "Enter file or directory path...": "输入文件或目录路径...",
  "Enter URL pattern...": "输入 URL 模式...",
  "Entrypoint structure, exit codes, cross-platform scripts. Use when building command line utilities, scripts, or applications.": "介绍入口点结构、退出码和跨平台脚本。构建命令行工具、脚本或应用时使用。",
  "Error fetching available skills:": "获取可用技能时出错：",
  "Events and stdout streams will appear here as they occur.": "事件与标准输出流将在发生时显示在此处。",
  "Every terminal command requires approval.": "每条终端命令均需人工批准。",
  "Execute `dart analyze` to identify warnings and errors, and use `dart fix --apply` to automatically resolve mechanical lint issues. Use during development to ensure code quality and before committing changes.": "执行 `dart analyze` 识别警告和错误，并使用 `dart fix --apply` 自动修复机械性的 lint 问题。在开发期间和提交更改前使用，以确保代码质量。",
  "Execute dart analyze to identify warnings and errors, and use dart fix --apply to automatically resolve mechanical lint issues. Use during development to ensure code quality and before committing changes.": "执行 dart analyze 识别警告与错误，并使用 dart fix --apply 自动修复机械性 Lint 问题。适用于开发过程中保障代码质量及提交变更前的检查。",
  "Expert guidance for creating, modifying, and optimizing dbt pipelines for BigQuery. Use this skill whenever user asks for generating or modifying a dbt model or project. Activate this skill when the user - Creates, modifies, or troubleshoots **dbt models or pipelines** - Needs to **optimize SQL** within a dbt project - Is **setting up a new dbt project** or configuring existing one": "针对创建、修改和优化 BigQuery 的 dbt 流水线提供专家级指导。当用户需要创建、修改或排查 dbt 模型与流水线故障、优化 dbt 项目中的 SQL，或配置 dbt 项目时激活此技能。",
  "Expertise in generating clean, correct, and efficient Dataform pipeline code for BigQuery ELT. Use this when creating or modifying Dataform pipelines, actions, or source declarations, when Dataform, SQLX, or BigQuery are mentioned in a transformation, when data needs to be ingested from GCS into BigQuery via Dataform, or when setting up a new Dataform project or configuring workflow_settings.yaml.": "专注于为 BigQuery ELT 生成整洁、准确且高效的 Dataform 流水线代码。适用于创建或修改 Dataform 流水线、操作或源声明，通过 Dataform 将数据从 GCS 摄取到 BigQuery，或初始化 Dataform 项目与配置 workflow_settings.yaml。",
  "Explore the plugin marketplace": "探索插件市场",
  "Failed to delete agent:": "删除智能体失败：",
  "Failed to delete plugin.": "删除插件失败。",
  "Failed to delete plugin. Please try again.": "删除插件失败，请重试。",
  "Failed to delete skill.": "删除技能失败。",
  "Failed to delete skill. Please try again.": "删除技能失败，请重试。",
  "Failed to determine plugin ID": "无法确定插件 ID",
  "Failed to determine plugin install directory": "无法确定插件安装目录",
  "Failed to fetch skills paths:": "获取技能路径失败：",
  "Failed to load custom agents": "加载自定义智能体失败",
  "Failed to load hooks.json:": "加载 hooks.json 失败：",
  "Failed to load more plugins. Please try again.": "加载更多插件失败，请重试。",
  "Failed to load plugin. Please try again.": "加载插件失败，请重试。",
  "Failed to load plugins": "加载插件失败",
  "Failed to load plugins. Please try again.": "加载插件失败，请重试。",
  "Failed to load skills paths:": "加载技能路径失败：",
  "Failed to load your customizations. Please try again.": "加载自定义扩展失败，请重试。",
  "Failed to open agent config file": "打开智能体配置文件失败",
  "Failed to open agent config:": "打开智能体配置失败：",
  "Failed to open plugin config file": "打开插件配置文件失败",
  "Failed to remove agent:": "移除智能体失败：",
  "Failed to remove plugin:": "移除插件失败：",
  "Failed to toggle agent:": "切换智能体状态失败：",
  "Failed to toggle plugin:": "切换插件状态失败：",
  "Failed to toggle plugin. Please try again.": "切换插件状态失败，请重试。",
  "Failed to update agent:": "更新智能体失败：",
  "Fetch Evolutionary Conservation scores (phyloP, phastCons) and Transcription Factor Binding Sites (TFBS) from the UCSC Genome Browser. Use when analyzing whether genomic variants or regions are evolutionarily conserved, functionally important, or bounded by TF regulators across major projects (ENCODE, JASPAR, ReMap).": "从 UCSC 基因组浏览器获取进化保守性评分（phyloP、phastCons）与转录因子结合位点 (TFBS)。适用于分析基因组变异或区域是否具有进化保守性、功能重要性或受主项目（ENCODE、JASPAR、ReMap）中的转录因子调控。",
  "File Access": "文件访问",
  "Find plugins - bundles of skills, agents, MCP servers, UI extensions and more, and install them in one click.": "查找并一键安装插件——包含技能、智能体、MCP 服务、界面扩展等内容的组合包。",
  "Find skills, agents, and more in the Marketplace.": "在扩展市场中发现技能、智能体及更多扩展。",
  "Finds and inspects data assets within Google Cloud. Relevant when any of the following conditions are true: 1. The user request involves finding, exploring, or inspecting data assets in Google Cloud, such as: - BigQuery datasets, tables, or views - BigLake catalog or tables - Spanner instances, databases or tables - etc. 2. You need to retrieve the schema, metadata, or governance policies for a GCP data asset. 3. You have a keyword or topic (e.g., \"sales data\") but lack the specific table or resource ID. 4. You are attempting to find data using `bq ls`, as this skill offers a superior approach. Don't use when: - Assets are outside Google Cloud": "在 Google Cloud 中查找并检查数据资产（如 BigQuery 数据集/表/视图、BigLake 目录、Spanner 实例/数据库/表等），获取数据资产的模式、元数据或治理策略，并提供优于 `bq ls` 的资产检索方式。",
  "Finds and inspects data assets within Google Cloud. Relevant when any of the following conditions are true: 1. The user request involves finding, exploring, or inspecting data assets in Google Cloud, such as: - BigQuery datasets, tables, or views - BigLake catalog or tables - Spanner instances, databases or tables - etc. 2. You need to retrieve the schema, metadata, or governance policies for a GCP data asset. 3. You have a keyword or topic (e.g., \"sales data\") but lack the specific table or resource ID. 4. You are attempting to find data using bq ls, as this skill offers a superior approach. Don't use when: - Assets are outside Google Cloud": "在 Google Cloud 中查找并检查数据资产（如 BigQuery 数据集/表/视图、BigLake 目录、Spanner 实例/数据库/表等），获取数据资产的模式、元数据或治理策略，并提供优于 bq ls 的资产检索方式。",
  "Fires after a tool step completes.": "在工具步骤完成后触发。",
  "Fires after tool calls finish.": "在工具调用全部完成后触发。",
  "Fires before a tool step executes.": "在工具步骤执行前触发。",
  "Fires before the model is called.": "在调用模型前触发。",
  "Fires when the execution loop terminates.": "在执行循环终止时触发。",
  "Fixes Flutter layout errors (overflows, unbounded constraints) using Dart and Flutter MCP tools. Use when addressing \"RenderFlex overflowed\", \"Vertical viewport was given unbounded height\", or similar layout issues.": "使用 Dart 和 Flutter MCP 工具修复 Flutter 布局错误，例如溢出和无界约束。处理“RenderFlex overflowed”“Vertical viewport was given unbounded height”等类似布局问题时使用。",
  "Full Logs": "完整日志",
  "Generates Python code using BigQuery DataFrames (BigFrames). Use by default for any Python data task involving BigQuery, including data processing, analysis, and machine learning. Don't use for SQL-first workflows or the google-cloud-bigquery client library — use bigquery-basics.": "使用 BigQuery DataFrames (BigFrames) 生成 Python 代码。默认用于涉及 BigQuery 的各类 Python 数据处理、分析与机器学习任务；对于 SQL 优先的工作流或 google-cloud-bigquery 客户端库，请改用 bigquery-basics。",
  "Guide agents to use `package:ffigen` to automatically generate FFI bindings instead of writing them manually. Use this skill when a task involves writing new FFI bindings, extending C/Objective-C/Swift integrations, or replacing hand-crafted `dart:ffi` setups.": "指导智能体使用 `package:ffigen` 自动生成 FFI 绑定，而不是手工编写。当任务涉及新建 FFI 绑定、扩展 C/Objective-C/Swift 集成或替换手写的 `dart:ffi` 配置时使用。",
  "Guide agents to use package:ffigen to automatically generate FFI bindings instead of writing them manually. Use this skill when a task involves writing new FFI bindings, extending C/Objective-C/Swift integrations, or replacing hand-crafted dart:ffi setups.": "指导智能体使用 package:ffigen 自动生成 FFI 绑定，而非手动编写。适用于编写新 FFI 绑定、扩展 C/Objective-C/Swift 集成或替换手写 dart:ffi 配置。",
  "Guide for setting up and using Firebase Authentication. Use this skill when the user's app requires user sign-in, user management, or secure data access using auth rules.": "设置和使用 Firebase Authentication 的指南。当应用需要用户登录、用户管理或通过身份验证规则安全访问数据时使用。",
  "Guidelines for interacting with GitHub and request permissions from the user when commands fail due to restrictions in the agent environment.": "与 GitHub 交互的指导；当命令因智能体环境限制而失败时，向用户请求权限。",
  "Guides agents in compiling and packaging C/C++ source code into dynamic or static libraries (Code Assets) using Dart's Native Assets hook system (via hook/build.dart and hook/link.dart utilizing package:hooks and package:native_toolchain_c). Use when a user asks to: 'setup native assets', 'compile C/C++ source code', 'bundle dynamic libraries', 'build native C code', 'link native assets', 'implement build.dart or link.dart hooks', or 'integrate C/C++ interop in Dart/Flutter'. Helps agents avoid manual toolchain orchestration and configures secure hash-validated binary downloads or advanced linker tree-shaking with package:record_use mapping.": "指导智能体使用 Dart Native Assets 钩子系统，将 C/C++ 源代码编译并打包为动态库或静态库（代码资产）。当用户要求设置原生资产、编译 C/C++、打包动态库、构建原生 C 代码、链接原生资产、实现构建或链接钩子，或在 Dart/Flutter 中集成 C/C++ 互操作时使用。帮助智能体避免手动编排工具链，并配置带哈希校验的安全二进制下载或高级链接器树摇优化。",
  "Guides debugging and optimizing Largest Contentful Paint (LCP) using Chrome DevTools MCP tools. Use this skill whenever the user asks about LCP performance, slow page loads, Core Web Vitals optimization, or wants to understand why their page's main content takes too long to appear. Also use when the user mentions \"largest contentful paint\", \"page load speed\", \"CWV\", or wants to improve how fast their hero image or main content renders.": "指导使用 Chrome DevTools MCP 工具调试并优化最大内容绘制 (LCP)。当用户询问 LCP 性能、页面加载缓慢、核心 Web 指标 (CWV) 优化，或希望排查首屏主内容渲染过慢的原因时使用此技能。",
  "Guides the authoring and validation of Apache Airflow DAGs for Managed Service for Apache Airflow (MSAA; formerly Cloud Composer). Covers environment context discovery, Airflow 2 vs 3 compatibility, authoring best practices, and local/remote validation processes. Use when creating or extending an Airflow DAG. Don't use when authoring Python code unrelated to Airflow DAGs.": "指导为 Apache Airflow 托管服务（MSAA，原 Cloud Composer）编写和验证 Airflow DAG。涵盖环境上下文发现、Airflow 2 与 3 兼容性、编写最佳实践以及本地与远程验证流程。",
  "Guides the process of analyzing, mapping, and documenting transformations between source and target schemas for any database, data warehouse, or data platform. Focuses exclusively on creating a high-fidelity mapping plan (Mapping Manifesto). Used when initiating an ETL, ELT, or data integration task with schema mapping specification for multiple tables (i.e. more than 3 tables) before writing code. Do NOT use this skill for basic SQL generation without mapping requirements, or when the user already has a complete mapping specification.": "指导分析、映射和记录源模式与目标模式之间的数据转换流程。专注于在编写代码前为多表（超过 3 张表）ETL/ELT 或数据集成任务创建高保真映射计划（Mapping Manifesto）。",
  "Guides writing, packaging, executing, and troubleshooting Apache Beam pipelines on Dataflow. Use when creating new pipelines, configuring Flex Templates, or analyzing performance of Dataflow jobs. Capabilities include Java/Python/Go setup, Cloud Build integration, and deep diagnostic analysis of job health and autoscaling. Use when: - Creating an Apache Beam Dataflow pipeline. - Creating a Google Dataflow Flex Template. - Using an existing Google Dataflow Template. - Debugging Dataflow pipeline - Troubleshooting Dataflow pipeline - Analyzing Performance of Dataflow pipeline. Key capabilities: Java/Python/Go project setup, Flex Templates (with Cloud Build), and diagnostics for streaming job health, bottlenecks, and autoscaling. Do NOT use for: - General GCP resource management unrelated to Dataflow. - Issues with other GCP services (e.g., GCE, GCS, BigQuery) unless directly impacting Dataflow pipeline execution. - Pipeline technologies other than Apache Beam on Dataflow.": "指导在 Dataflow 上编写、打包、执行和排查 Apache Beam 流水线。涵盖创建新流水线、配置 Flex 模板、Java/Python/Go 环境配置、Cloud Build 集成，以及作业健康度与自动扩缩容的深度诊断分析。",
  "Handler #": "处理器 #",
  "Help users write syntactically and semantically correct primary constructors in Dart, and migrate/use the new constructor syntax, empty-body semicolon syntax, in-body initializer list syntax, and abbreviated concise constructor syntax.": "帮助用户在 Dart 中编写语法和语义正确的主构造函数，并迁移或使用新的构造函数语法、空函数体分号语法、函数体内初始化列表语法和简写构造函数语法。",
  "Hook will only trigger if the tool name matches run_command or view_file.": "仅当工具名称匹配 run_command 或 view_file 时触发此钩子。",
  "Hook will only trigger if the tool name matches run_command.": "仅当工具名称匹配 run_command 时触发此钩子。",
  "Hook will only trigger if the tool name starts with browser_.": "仅当工具名称以 browser_ 开头时触发此钩子。",
  "Hook will trigger if any tool is executed.": "执行任何工具时均会触发此钩子。",
  "Host Endpoint": "主机端点",
  "How to manage and create plugins — namespaced bundles of skills, agents, rules, MCP servers and hooks that install, enable and disable as a single unit. Use this skill when the user wants to enable, disable, install or uninstall a plugin, when they want to create a new plugin, or when a new customization should be packaged into a plugin rather than left loose. Also triggered by the /plugin slash command. Don't use for the underlying customization system itself — discovery roots, loading priority, or authoring a standalone skill, agent, rule, hook or MCP server outside a plugin; see the customizations guide skill for those.": "管理与创建插件的完整指南——插件是将技能、智能体、规则、MCP 服务与钩子打包在命名空间下的组合包，可作为整体安装、启用或禁用。当用户需要管理或创建插件时使用此技能（也可通过 /plugin 斜杠命令触发）。",
  "How to render rich interactive HTML widgets inline in the chat or as standalone artifacts. Use this skill when you want to show the user diagrams, data visualizations, interactive controls, educational walkthroughs, or any rich visual content beyond plain text and markdown.": "介绍如何在对话中内嵌渲染丰富的交互式 HTML 组件，或将其作为独立产物呈现。需要向用户展示图表、数据可视化、交互控件、教学演示或任何超出纯文本和 Markdown 的丰富视觉内容时使用。",
  "Identify domains, families, and sites in proteins; find all proteins in a family or sharing a domain; explore species distribution for a domain; annotate genomes with protein families and GO terms. InterPro combines 14 databases (e.g., Pfam, CDD) into one searchable resource. InterPro-N significantly expands annotation and sequence coverage with deep learning. Includes domain architecture (IDA) search.": "识别蛋白质中的结构域、家族和功能位点；查找同一家族或共享结构域的所有蛋白质；探索结构域的物种分布并使用蛋白质家族与 GO 术语注释基因组（整合 Pfam、CDD 等 14 个数据库及 InterPro-N 深度学习注释）。",
  "Implement a component-level test using `WidgetTester` to verify UI rendering and user interactions (tapping, scrolling, entering text). Use when validating that a specific widget displays correct data and responds to events as expected.": "使用 `WidgetTester` 实现组件级测试，验证 UI 渲染和用户交互（点击、滚动、输入文本）。需要验证特定组件能正确显示数据并按预期响应事件时使用。",
  "Implement a component-level test using WidgetTester to verify UI rendering and user interactions (tapping, scrolling, entering text). Use when validating that a specific widget displays correct data and responds to events as expected.": "使用 WidgetTester 实现组件级测试，以验证 UI 渲染与用户交互（点击、滚动、输入文本）。适用于验证特定 Widget 是否正确展示数据并按预期响应事件。",
  "Include Jetski Default Customizations": "包含默认自定义扩展",
  "Included by": "包含于",
  "Included in:": "包含于：",
  "Inspects Google Antigravity Chinese localization status, validates patch health, detects upstream UI drift, runs automated regressions, or assists in adding new translations. Activate this skill when the user asks about Antigravity Chinese localization status, wants to diagnose UI translation issues, run drift detection on upstream updates, or add new translation entries.": "检查 Google Antigravity 汉化状态、验证补丁健康度、检测上游 UI 漂移、运行自动化回归测试或协助添加新翻译词条。当用户询问 Antigravity 汉化状态、诊断界面翻译问题、检测上游更新漂移或添加新词条时激活此技能。",
  "Installed in": "安装于",
  "Instructions for handling API keys and credentials safely, verifying their presence, and prompting the user to add them if missing using a safe protocol.": "提供安全处理 API 密钥与凭据的规范说明，检验凭据是否存在，并在缺失时通过安全协议提示用户补充。",
  "Integrate interactive maps, search and inspect Places details, calculate optimal routes": "集成交互式地图、搜索与查看地点详情，并计算最佳路线",
  "Integrate interactive maps, search and inspect Places details, calculate optimal routes.": "集成交互式地图、搜索与查看地点详情，并计算最佳路线。",
  "Integration skill and tools for Google Maps Platform APIs.": "用于 Google Maps Platform API 的集成技能与工具。",
  "Interactive guide to design and create a scheduled background automation. Use this skill when the user wants to create an automated or recurring scheduled task (e.g. \"summarize my emails every morning\", \"every Monday send me a to-do list\"). Also triggered by the /automation slash command.": "设计并创建后台定时自动化任务的交互式指南。当用户希望创建自动或周期性执行的定时任务（例如“每天早上汇总我的邮件”、“每周一发送待办清单”）时使用此技能，也可通过 /automation 斜杠命令触发。",
  "Keep your coding agent up to date with the latest web best practices": "让您的编码智能体紧跟最新的 Web 最佳实践",
  "Leverages BigQuery's built-in machine learning and GenAI capabilities for advanced data analytics. Use when you need to write SQL queries that perform time-series forecasting, detect outliers, find key drivers, or leverage generative AI capabilities in BigQuery.": "利用 BigQuery 内置的机器学习与生成式 AI 能力进行高级数据分析。适用于编写执行时间序列预测、异常值检测、关键驱动因素分析或在 BigQuery 中调用生成式 AI 功能的 SQL 查询。",
  "Loading available plugins...": "正在加载可用插件...",
  "Loading custom agents...": "正在加载自定义智能体...",
  "Loading customizations...": "正在加载自定义扩展...",
  "Loading events...": "正在加载事件...",
  "Loading hooks...": "正在加载钩子...",
  "Loading installed plugins...": "正在加载已安装插件...",
  "Loading logs...": "正在加载日志...",
  "Loading plugin...": "正在加载插件...",
  "Loading plugins...": "正在加载插件...",
  "Loading skills...": "正在加载技能...",
  "Loading token usage...": "正在加载令牌使用量...",
  "Loading workspace customizations...": "正在加载工作区自定义项...",
  "Managed by plugin": "由插件托管",
  "Manager Error": "管理器错误",
  "Manages Firebase Remote Config templates, feature flags, loading strategies, and SDKs (Android, iOS). Use when downloading/deploying remoteconfig JSON templates, managing version history/feature flags, setting in-app defaults, fetchAndActivate(), real-time listeners, or SDK setup. Don't use for Firebase Hosting, Auth, Firestore, Data Connect, Crashlytics, or App Hosting.": "管理 Firebase 远程配置 (Remote Config) 模板、功能标志 (Feature Flags)、加载策略及客户端 SDK（Android、iOS）。涵盖下载与部署模板、版本历史管理、应用内默认值与实时监听器配置。",
  "MANDATORY specialist subagent for Cloud Firestore Security Rules (firestore.rules). Whenever your task requires creating, authoring, or modifying Firestore Security Rules (firestore.rules), you MUST delegate rules authoring to this subagent rather than writing firestore.rules directly in the main agent.": "Cloud Firestore 安全规则 (firestore.rules) 专属专家子智能体。每当任务需要创建、编写或修改 Firestore 安全规则时，必须委派给此子智能体处理，而非在主智能体中直接编写。",
  "Mandatory Step 0 pre-flight check for regional Google Cloud MCP servers (e.g. Dataproc) before using MCP tools or falling back to gcloud/bq CLI. Use whenever interacting with Dataproc clusters, Spark batches, jobs, sessions, or regional GCP resources. Fixes regional MCP servers whose endpoint URL still has an unreplaced $GCP_REGION / ${REGION} placeholder across Claude Code, Codex, and Antigravity. Trigger: an expected mcp__*_{service}_* tool is missing entirely (not just failing), or a call to one fails/hangs on a malformed host. Check via ToolSearch/deferred-tools listing before falling back to gcloud/bq CLI. Asks the user for a region, patches the live MCP config file(s), and tells the user how to restart without losing session context.": "在使用区域级 Google Cloud MCP 服务（如 Dataproc）或回退到 gcloud/bq CLI 前的强制第 0 步预检。自动修复端点 URL 中未替换的 $GCP_REGION / ${REGION} 占位符并指导无损重载。",
  "Mandatory Step 0 pre-flight execution order and authentication verification for Google Cloud Platform (GCP), Application Default Credentials (ADC), gcloud CLI, Spark, Dataproc, BigQuery, GCS, and notebook runtimes. Use whenever interacting with GCP resources, running Spark/PySpark pipelines, BigQuery queries, GCS paths (gs://), or creating/running notebooks.": "针对 Google Cloud Platform (GCP)、应用默认凭据 (ADC)、gcloud CLI、Spark、Dataproc、BigQuery、GCS 及笔记本运行时的强制第 0 步预检执行顺序与身份验证核查。",
  "MCP Authentication Error:": "MCP 身份验证错误：",
  "MCP servers": "MCP 服务",
  "Migrate with Agent": "使用智能体迁移",
  "Modern Web Guidance": "现代 Web 开发指南",
  "Modified in": "修改于",
  "Mounts Cloud Storage buckets as a POSIX file system with Cloud Storage FUSE (gcsfuse). Use when you need to interact with gcsfuse — decide whether FUSE, native gs:// reads, or Filestore/Managed Lustre fits a workload, deploy tuned mounts on GKE, Compute Engine, or Cloud Run, enable and size the file, stat, and list caches, tune mount flags or config-file settings, apply workload profiles, keep ML checkpointing safe (rename atomicity, hierarchical namespace, close-time finalization, concurrent writers), or diagnose slow training, low throughput, or GCS bill spikes on existing mounts with gcsfuse metrics. Covers mount semantics, the gcsfuse CLI and config file, the GKE gcsfuse CSI driver (Workload Identity principal:// bindings, profile StorageClasses, sidecar sizing), and Cloud Run volume mounts. Don't use for bucket administration or data management without a mount (google-cloud-storage-basics) or for fully POSIX-compliant shared file systems (Filestore, Managed Lustre).": "使用 Cloud Storage FUSE (gcsfuse) 将 Cloud Storage 存储桶挂载为 POSIX 文件系统。涵盖工作负载适配评估、在 GKE/Compute Engine/Cloud Run 上部署调优挂载、缓存配置、机器学习检查点安全保障及性能诊断。",
  "Must be positive": "必须为正数",
  "No Custom Agents or Plugins": "没有自定义智能体或插件",
  "No custom agents yet.": "暂无自定义智能体。",
  "No customizations match your search.": "没有匹配搜索条件的自定义扩展。",
  "No description available": "暂无描述",
  "No description available.": "暂无描述。",
  "No events recorded": "暂无事件记录",
  "No handlers configured for": "尚未配置处理器：",
  "No logs available.": "没有可用日志。",
  "No matching customizations found.": "未找到匹配的自定义扩展。",
  "No plugin found for": "未找到对应的插件：",
  "No plugins available": "暂无可用插件",
  "No Plugins Available": "没有可用插件",
  "No plugins available in the marketplace.": "扩展市场中暂无可用插件。",
  "No plugins available.": "没有可用插件。",
  "No plugins match your search.": "没有匹配搜索条件的插件。",
  "No recommended skills found in workspace": "工作区中未找到推荐技能",
  "No skills available": "没有可用技能",
  "No skills loaded.": "未加载技能。",
  "No skills or rules match this filter.": "没有匹配此筛选条件的技能或规则。",
  "No skills or rules yet.": "暂无技能或规则。",
  "No token data available.": "没有可用的令牌数据。",
  "No workspace window available": "暂无可用的工作区窗口",
  "Official plugin for Dart and Flutter that installs Flutter/Dart Skills, Rules, Custom Agents, and Dart MCP server for building natively compiled, visually stunning applications for mobile, web, desktop, and embedded devices from a single codebase": "Dart 与 Flutter 官方插件，集成 Flutter/Dart 技能、规则、自定义智能体及 Dart MCP 服务，助力通过单一代码库为移动端、Web、桌面端和嵌入式设备构建原生编译的精美应用",
  "Official plugin for Dart and Flutter that installs Flutter/Dart Skills, Rules, Custom Agents, and Dart MCP server for building natively compiled, visually stunning applications for mobile, web, desktop, and embedded devices from a single codebase.": "Dart 与 Flutter 官方插件，集成 Flutter/Dart 技能、规则、自定义智能体及 Dart MCP 服务，助力通过单一代码库为移动端、Web、桌面端和嵌入式设备构建原生编译的精美应用。",
  "Official skill for integrating Firebase AI Logic (Gemini API) into web applications. Covers setup, multimodal inference, structured output, and security.": "将 Firebase AI Logic（Gemini API）集成到 Web 应用的官方技能，涵盖设置、多模态推理、结构化输出和安全性。",
  "Open Agent panel on window reload": "窗口重新加载时打开智能体面板",
  "Open files in the background if Agent creates or edits them": "当智能体创建或编辑文件时在后台打开",
  "Open in Side Pane": "在侧边面板中打开",
  "options. Agent settings and permissions can be further customized below.": "选项之一。智能体设置与权限可在下方进一步自定义。",
  "Organization MCP Allowlist (Read-Only)": "组织 MCP 允许名单（只读）",
  "Path copied!": "路径已复制！",
  "Paths the agent can modify inside this workspace.": "智能体在此工作区内可修改的路径。",
  "Paths the agent can modify.": "智能体可修改的路径。",
  "Paths the agent can read inside this workspace.": "智能体在此工作区内可读取的路径。",
  "Paths the agent can read.": "智能体可读取的路径。",
  "Performs 3D structural searches of proteins against various databases (PDB, AlphaFold, CATH, MGnify, etc.) using the Foldseek API. Use ONLY when the user provides a physical 3D coordinate file (.cif, .mmcif, or .pdb) and wants to find structurally similar proteins. Do NOT use if the user only provides a protein sequence, gene name, or UniProt ID.": "使用 Foldseek API 在多个数据库（PDB、AlphaFold、CATH、MGnify 等）中执行蛋白质 3D 结构相似性搜索。仅当用户提供物理 3D 坐标文件（.cif、.mmcif 或 .pdb）时使用。",
  "Performs multiple sequence alignment of proteins with EBI Clustal Omega. Use when you need to align multiple sequences to assess similarity, domain conservation, or key residue conservation. Supports up to 4000 sequences and a maximum file size of 4 MB. Do not use to search for homologous proteins in a database (use MMseqs2, BLAST), align non-protein sequences (DNA, RNA), perform structural alignment (use Foldseek, PyMOL), or if you only have a single sequence.": "使用 EBI Clustal Omega 执行蛋白质多序列比对 (MSA)。适用于比对多条序列以评估相似性、结构域保守性或关键残基保守性（最高支持 4000 条序列及 4 MB 文件）。",
  "Plugin Bundles Coming Soon": "插件组合包即将推出",
  "Plugin metadata": "插件元数据",
  "Plugin Operation Error:": "插件操作错误：",
  "Plugin operations are not supported in this environment.": "此环境不支持插件操作。",
  "Plugins are packaged collections of skills and MCPs to help the Agent in Antigravity work with Google developer products": "插件是技能与 MCP 的打包集合，用于辅助 Antigravity 中的智能体协同使用 Google 开发者产品",
  "Plugins are packaged collections of skills and MCPs to help the Agent in Antigravity work with Google developer products.": "插件是技能与 MCP 的打包集合，用于辅助 Antigravity 中的智能体协同使用 Google 开发者产品。",
  "Plugins are packaged collections of skills and MCPs to help the Agent in Antigravity work with Google developer products. You can always change your choices in Settings.": "插件是技能和 MCP 的打包集合，可帮助 Antigravity 中的智能体使用 Google 开发者产品。您可以随时在设置中更改选择。",
  "Plugins are packaged collections of skills and MCPs to help the Agent in Google work with Google developer products. You can always change your choices in Settings.": "插件是技能与 MCP 的打包集合，用于辅助 Google 中的智能体协同使用 Google 开发者产品。您随时可以在“设置”中更改选择。",
  "Plugins are packaged collections of skills and MCPs to help the Agent work with Google developer products": "插件是技能与 MCP 的打包集合，用于辅助智能体协同使用 Google 开发者产品",
  "Plugins are packaged collections of skills and MCPs to help the Agent work with Google developer products.": "插件是技能与 MCP 的打包集合，用于辅助智能体协同使用 Google 开发者产品。",
  "Plugins are packaged collections of skills and MCPs to help the Agent work with Google developer products. You can always change your choices in Settings.": "插件是技能与 MCP 的打包集合，用于辅助智能体协同使用 Google 开发者产品。您随时可以在“设置”中更改选择。",
  "Post Invocation": "调用后",
  "Post Tool Use": "工具使用后",
  "Pre Invocation": "调用前",
  "Pre Tool Use": "工具使用前",
  "Primary entry point for building, managing, and orchestrating data pipelines on Google Cloud. Guides users to the appropriate skill for dbt, Dataflow (Apache Beam), Dataform, Spark (Dataproc Serverless), BigQuery Data Transfer Service (DTS) or orchestration pipeline using Cloud Composer. Clarify requirements and resolve ambiguity for creating, updating and running data pipelines.": "在 Google Cloud 上构建、管理和编排数据流水线的首要入口。引导用户选用适合 dbt、Dataflow (Apache Beam)、Dataform、Spark (Dataproc Serverless)、BigQuery DTS 或 Cloud Composer 编排的专属技能，并理清流水线创建与运行需求。",
  "Privacy Notice": "隐私声明",
  "Process Error": "进程错误",
  "Process exited with an error": "进程异常退出",
  "Project Agent": "项目智能体",
  "Project Folders": "项目文件夹",
  "Project General": "项目常规",
  "Prototype, build & run modern apps that users love with Firebase's backend, AI, and operational infrastructure": "借助 Firebase 的后端、AI 与运维基础设施，快速构建、运行并打造深受用户喜爱的现代应用原型",
  "Prototype, build & run modern apps that users love with Firebase's backend, AI, and operational infrastructure.": "借助 Firebase 的后端、AI 与运维基础设施，快速构建、运行并打造深受用户喜爱的现代应用原型。",
  "Prototype, build & run modern apps users love with Firebase's backend, AI, and operational infrastructure": "借助 Firebase 的后端、AI 与运维基础设施，快速构建、运行并打造深受用户喜爱的现代应用原型",
  "Prototype, build & run modern apps users love with Firebase's backend, AI, and operational infrastructure.": "借助 Firebase 的后端、AI 和运维基础设施，制作原型、构建并运行用户喜爱的现代应用。",
  "Provides a comprehensive guide, quick reference, and sitemap for Google Antigravity (AGY), including the Antigravity CLI (agy), Antigravity 2.0, Antigravity IDE, Python SDK, slash commands, keybindings, and customizations (skills, rules, MCP, sidecars). Activate this skill when the user asks questions about how to use, configure, or customize Antigravity, AGY, the agy CLI, the Antigravity IDE, or Antigravity 2.0.": "提供 Google Antigravity（AGY）的完整指南、快速参考和站点地图，涵盖 Antigravity CLI（agy）、Antigravity 2.0、Antigravity IDE、Python SDK、斜杠命令、快捷键及自定义项（技能、规则、MCP、边车）。当用户询问如何使用、配置或自定义 Antigravity、AGY、agy CLI、Antigravity IDE 或 Antigravity 2.0 时启用此技能。",
  "Provides BigQuery SQL query optimization techniques, execution best practices, and performance tuning rules for high-efficiency querying. Use when optimizing BigQuery SQL queries, reducing query costs, or designing performant SQL transformations.": "提供 BigQuery SQL 查询优化技术、执行最佳实践与高效查询性能调优规则。适用于优化 BigQuery SQL 查询、降低查询成本或设计高性能 SQL 数据转换。",
  "Provides expert guidance for troubleshooting Cloud Composer (Apache Airflow) and Orchestration pipelines. Use this skill when the user asks to generate Root Cause Analysis (RCA), troubleshoot or fix a failed pipeline, DAG in Composer environment and generate RCA report.": "为排查 Cloud Composer (Apache Airflow) 与编排流水线故障提供专家级指导。适用于生成根因分析 (RCA) 报告，以及排查和修复 Composer 环境中失败的流水线与 DAG。",
  "Provides foundational Firebase CLI setup, CLI installation, version checks (`firebase-tools@latest --version`), CLI login (including --no-localhost), project creation, project selection (`firebase use`), and app config file downloads (`google-services.json`, `GoogleService-Info.plist`). Use ONLY for CLI login, project creation/switching, or downloading app config files. Don't use for Firebase Hosting deploy, Firestore, Auth, App Hosting, Data Connect, Crashlytics, or Remote Config.": "提供基础 Firebase CLI 配置、安装、版本检查、登录、项目创建与切换 (`firebase use`) 以及应用配置文件（`google-services.json`、`GoogleService-Info.plist`）下载指南。",
  "Provides foundational Firebase CLI setup, CLI installation, version checks (firebase-tools@latest --version), CLI login (including --no-localhost), project creation, project selection (firebase use), and app config file downloads (google-services.json, GoogleService-Info.plist). Use ONLY for CLI login, project creation/switching, or downloading app config files. Don't use for Firebase Hosting deploy, Firestore, Auth, App Hosting, Data Connect, Crashlytics, or Remote Config.": "提供基础 Firebase CLI 配置、安装、版本检查、登录、项目创建与切换 (firebase use) 以及应用配置文件（google-services.json、GoogleService-Info.plist）下载指南。",
  "Provides guidance for migrating Apache Airflow DAGs in Managed Service for Apache Airflow (MSAA; formerly Cloud Composer). Covers migration to Airflow 2.11.1 (MSAA Gen 2 and 3) and Airflow 3 (MSAA Gen 3), including environment inspection, GCS download/upload and scanning patterns for breaking changes.": "提供在 Apache Airflow 托管服务（MSAA，原 Cloud Composer）中迁移 Airflow DAG 的指南。涵盖向 Airflow 2.11.1 与 Airflow 3 的迁移、环境检查、GCS 上传下载以及破坏性变更扫描。",
  "Provides guidelines and best practices for querying and defining property graphs and semantic graphs in BigQuery using GQL (Graph Query Language). Use when creating property graphs or querying graph topologies in BigQuery.": "提供在 BigQuery 中使用图查询语言 (GQL) 查询和定义属性图与语义图的指南及最佳实践。适用于在 BigQuery 中创建属性图或查询图拓扑结构。",
  "Provides instructions for installing and using the `android` CLI. The `android` command-line tool is a critical tool for Android development and helps you create new Android projects, run Android apps on devices, manage and interact with Android virtual devices (including screenshots and UI inspection), manage Android SDK components, look up official Android documentation, and discover and install official Android skills.": "提供安装和使用 `android` CLI 的说明。`android` 命令行工具是 Android 开发的核心工具，可用于创建 Android 项目、在设备上运行应用、管理和操作 Android 虚拟设备（包括截图和 UI 检查）、管理 Android SDK 组件、查阅官方文档，以及发现并安装官方 Android 技能。",
  "Provides instructions for installing and using the android CLI. The android command-line tool is a critical tool for Android development and helps you create new Android projects, run Android apps on devices, manage and interact with Android virtual devices (including screenshots and UI inspection), manage Android SDK components, look up official Android documentation, and discover and install official Android skills.": "提供安装和使用 android CLI 的说明指导。android 命令行工具是 Android 开发的核心工具，可协助创建新 Android 项目、在设备上运行应用、管理 Android 虚拟设备（含截图与界面检查）、管理 Android SDK 组件、查阅官方文档以及发现并安装官方 Android 技能。",
  "Provides recommendations and best practices for creating, configuring, tuning and optimizing Managed Service for Apache Airflow (MSAA, Cloud Composer) environments. Use when the user asks for guidance, recommendations, or best practices on configuring Cloud Composer, scaling Airflow environments, preventing workload restarts, or analyzing system health.": "提供创建、配置、调优和优化 Apache Airflow 托管服务（MSAA / Cloud Composer）环境的建议与最佳实践。适用于配置 Composer、扩缩 Airflow 环境、防止工作负载重启或分析系统健康度。",
  "Queries the UniBind database for experimentally validated transcription factor (TF) binding sites. Use when retrieving direct TF-DNA interaction datasets, downloading binding site coordinates (BED/FASTA) for local analysis, or listing available datasets by species, cell line, or TF name. Don't use to query specific intervals, locations, genes, motif models or expression data.": "查询 UniBind 数据库中经实验验证的转录因子 (TF) 结合位点。适用于获取直接的 TF-DNA 相互作用数据集、下载结合位点坐标（BED/FASTA）或按物种、细胞系与转录因子名称列出可用数据集。",
  "Query and search the EMBL-EBI Ontology Lookup Service (OLS) for biomedical ontology terms, definitions, and hierarchies across 250+ ontologies (e.g., GO, DOID, HP). Use when the user asks to search for terms, retrieve details, navigate hierarchies (parents, children, ancestors), look up properties and individuals, get autocomplete suggestions, or access ontology metadata and statistics.": "查询和搜索 EMBL-EBI 本体查找服务 (OLS)，涵盖 250 多个生物医学本体（如 GO、DOID、HP）的术语、定义与层级关系。支持检索术语详情、上下位层级导航、自动补全及本体元数据统计。",
  "Query ClinicalTrials.gov via APIv2. Use when you want to search for trials by condition, drug, location, status, or phase; retrieve trial details by NCT ID; check eligibility/inclusion criteria; count trials across conditions or time periods; identify a sponsor's trial portfolio; find recruiting trials for patient matching.": "通过 APIv2 查询 ClinicalTrials.gov 临床试验数据库。支持按疾病、药物、地点、状态或分期搜索临床试验，按 NCT ID 获取详情，核查入组标准，统计试验数量及检索招募中的临床试验。",
  "Query Open Targets Platform for target-disease associations, drug target discovery, tractability/safety data, genetics/omics evidence, known drugs, for therapeutic target identification.": "查询 Open Targets Platform 平台中的靶点-疾病关联、药物靶点发现、可成药性/安全性数据、遗传学/组学证据以及已知药物，用于治疗靶点识别。",
  "Query PubChem, search by name/CID/SMILES, retrieve properties, similarity/substructure searches, bioactivity, for cheminformatics. Use when a user asks about a specific chemical, drug, or molecule.": "查询 PubChem 数据库，支持按名称、CID 或 SMILES 搜索，获取理化性质、执行相似性/子结构检索及生物活性分析，适用于化学信息学任务。",
  "Query the ChEMBL database for bioactive molecules, drug targets, bioactivity data, approved drugs, and chemical structures. Use when the user asks about compounds, targets, IC50/Ki values, drug mechanisms, or structure searches.": "查询 ChEMBL 数据库中的生物活性分子、药物靶点、生物活性数据、已批准药物及化学结构。适用于查询化合物、靶点、IC50/Ki 值、药物作用机制或结构检索。",
  "Query the ENCODE Registry of cis-Regulatory Elements (cCREs) via the SCREEN GraphQL API, or make custom queries to the ENCODE Portal REST API for experiments and files (ChIP-seq peaks, etc.). Use when you want to query regulatory annotations or raw experimental data across human cell types.": "通过 SCREEN GraphQL API 查询 ENCODE 顺式调控元件注册库 (cCREs)，或通过 ENCODE Portal REST API 查询人类各细胞类型的实验数据（如 ChIP-seq 峰值等调控注释与原始实验文件）。",
  "Query the Ensembl database to resolve gene, transcript, and protein IDs, fetch genomic or protein sequences, retrieve gene structures (exons), and get variant consequence and effect predictions (VEP). Use this skill as a primary ID translator, genomic sequence database and variant effect prediction tool.": "查询 Ensembl 数据库以解析基因、转录本和蛋白质 ID，获取基因组或蛋白质序列，检索基因外显子结构，并获取变异后果与效应预测 (VEP)。",
  "Query the Genome Aggregation Database (gnomAD). Use when determining the rarity or allele frequency of specific genetic variants, retrieving gene constraint metrics (pLI, LOEUF) to assess loss-of-function intolerance, finding variants in a genomic region or gene, or querying structural variants. Don't use for analyzing individual patient genomes, tracking somatic mutations in cancer (use COSMIC), or requesting raw sequencing reads (use ENA).": "查询基因组聚合数据库 (gnomAD)。适用于确定特定遗传变异的稀有度或等位基因频率、获取基因约束指标（pLI、LOEUF）以评估功能丧失不耐受性、查找基因组区域内的变异或查询结构变异。",
  "Query the JASPAR database for Transcription Factor (TF) binding profiles. Use when retrieving Position Frequency Matrices (PFMs) or Position Weight Matrices (PWMs) for specific TFs, resolving gene symbols to JASPAR Matrix IDs, or getting TF metadata. Supports multiple output formats (MEME, TRANSFAC, PFM, JASPAR, YAML).": "查询 JASPAR 数据库中的转录因子 (TF) 结合谱。适用于获取特定转录因子的位置频率矩阵 (PFM) 或位置权重矩阵 (PWM)、将基因符号解析为 JASPAR 矩阵 ID 以及导出多种格式（MEME、TRANSFAC、PFM、JASPAR、YAML）。",
  "Query the OpenAlex scholarly database for research papers, authors, institutions, topics, sources, publishers, funders, geo-locations, and keywords. Use when searching academic papers, resolving DOIs, downloading open-access PDFs, finding an author's publications, aggregating bibliometric data (citation counts, h-index, impact factor), exploring the research taxonomies, or performing DOI lookups.": "查询 OpenAlex 学术数据库中的研究论文、作者、机构、主题、期刊来源、出版商、资助方与关键词。适用于搜索学术论文、解析 DOI、下载开放获取 PDF 以及聚合文献计量数据（引用数、h 指数、影响因子）。",
  "Query the QuickGO and Evidence & Conclusion Ontology (ECO) REST API. Use this when you need to map genes to biological processes, molecular functions, or cellular components, find genes associated with a specific pathway/GO term, or explore the Gene Ontology hierarchy. Do not use for querying drug targets (use OpenTargets) or mechanistic signaling pathway diagrams (use KEGG).": "查询 QuickGO 与证据和结论本体 (ECO) REST API。适用于将基因映射到生物学过程、分子功能或细胞组分，查找与特定通路/GO 术语关联的基因，或探索基因本体 (GO) 层级结构。",
  "Query the Reactome database (Analysis and Content Services). Use when the user asks about pathway analysis, gene list enrichment, retrieving results by token, finding unmapped or not-found identifiers, mapping identifiers, reaction participants (inputs, outputs), pathway hierarchy (including top-level pathways), diagram export, cross-reference mapping, or searching the knowledgebase.": "查询 Reactome 数据库（分析与内容服务）。适用于通路分析、基因列表富集、反应参与者（输入/输出）查询、通路层级浏览、通路图导出、交叉引用映射及知识库搜索。",
  "Query the STRING database for protein-protein interactions (PPIs), functional enrichment, and homology. Use when the user asks about interactions between specific proteins, interaction evidence, confidence scores, protein interaction partners, or pathway enrichments.": "查询 STRING 数据库中的蛋白质-蛋白质相互作用 (PPI)、功能富集与同源性信息。适用于查询特定蛋白质间的相互作用、证据依据、置信度评分、相互作用伙伴或通路富集。",
  "Query, search, and download data from the openFDA API for drugs, devices, foods, tobacco, cosmetics, animal and veterinary products, substances, and transparency data. Use for FDA adverse events, recalls, labeling, approvals, shortages, 510(k) clearances, NDC lookups, and any FDA safety or regulatory data query across all 28 API endpoints.": "从 openFDA API 查询、搜索和下载涵盖药品、医疗器械、食品、烟草、化妆品、动物兽医产品及物质的监管数据。适用于查询 FDA 不良事件、召回、标签、批准、短缺、510(k) 许可及 NDC 编码。",
  "Recent Events": "最近事件",
  "Recommended Skills": "推荐技能",
  "Reliable automation, in-depth debugging, and performance analysis in Chrome using Chrome DevTools and Puppeteer.": "在 Chrome 中使用 Chrome DevTools 和 Puppeteer 进行可靠的自动化、深度调试与性能分析。",
  "Replace the usage of `expect` and similar functions from `package:matcher` to `package:checks` equivalents.": "将 `package:matcher` 中的 `expect` 等函数替换为 `package:checks` 中的对应写法。",
  "Replace the usage of expect and similar functions from package:matcher to package:checks equivalents.": "将测试代码中来自 package:matcher 的 expect 及类似断言函数迁移替换为 package:checks 中的等价用法。",
  "Retrieve and analyze AlphaFold predicted structures for a protein. Use when the user provides a specific UniProt Accession ID and wants structural confidence metrics (pLDDT), domain boundary analysis, or disorder assessment. Do not use if the user only has a protein name, gene name, or amino acid sequence — ask for a UniProt ID first.": "检索并分析蛋白质的 AlphaFold 预测结构。当用户提供具体的 UniProt 登录号 (Accession ID) 并需要结构置信度指标 (pLDDT)、结构域边界分析或无序区评估时使用。",
  "Retrieve protein and nucleotide sequences from NCBI databases using E-utilities. Supports direct accession lookup, CDS translation, gene+organism search, locus lookup, PubMed-linked sequences, patent protein extraction, and organism+length fallback search. Use when you need to fetch biological sequences by accession, gene name, locus tag, PubMed ID, or patent number.": "使用 E-utilities 从 NCBI 数据库检索蛋白质与核苷酸序列。支持按登录号直接查找、CDS 翻译、基因+物种组合搜索、位点标签查找、PubMed 关联序列及专利蛋白质序列提取。",
  "Rules and formatting guidelines for writing Dart /// API documentation and doc comments. Use when documenting Dart code, writing doc comments for any Dart declaration (libraries, classes, methods, variables, etc.), or when instructed to follow the Effective Dart documentation guidelines.": "编写 Dart `///` API 文档与文档注释的规则及格式指南。适用于为任何 Dart 声明（库、类、方法、变量等）编写文档注释并遵循 Effective Dart 文档规范。",
  "Safely modifies Xcode projects (.pbxproj) to add Swift Packages and link files. Use this skill whenever an iOS project needs dependencies installed (e.g. Firebase, Alamofire).": "安全修改 Xcode 项目（`.pbxproj`），以添加 Swift Package 并链接文件。iOS 项目需要安装 Firebase、Alamofire 等依赖时使用。",
  "Save & Continue": "保存并继续",
  "Saves to the .agent/agents/ directory in your current workspace. This script can be version controlled and shared with your team.": "保存至当前工作区的 .agent/agents/ 目录中。此脚本可纳入版本控制并与团队共享。",
  "Scanning skills config file...": "正在扫描技能配置文件...",
  "Score, annotate, and analyze the functional impact of genetic variants using AlphaGenome Variant Impact (AVI) scores. Query variants in chr:pos:ref>alt format, annotate VCF/tabular callsets, perform saturation mutagenesis window scans (1-based closed chr:start-end), and extract GENCODE v46 GTF gene/exon/junction coordinates all via the AlphaGenome Atlas API.": "使用 AlphaGenome 变异影响评分 (AVI) 对遗传变异的功能影响进行评分、注释和分析。支持通过 AlphaGenome Atlas API 查询变异、注释 VCF 数据集、执行饱和突变窗口扫描及提取基因/外显子坐标。",
  "Search and discover customizations to extend your Agent's capabilities.": "搜索并发现自定义扩展，以拓展智能体的能力。",
  "Search automations...": "搜索自动化任务...",
  "Search customizations...": "搜索自定义扩展...",
  "Search Europe PMC for scientific literature and download open-access full texts and PDFs. Retrieve full-text XML/plain text by PMCID, get citation lists and bibliography.": "在 Europe PMC 中搜索科学文献并下载开放获取全文与 PDF。支持按 PMCID 获取全文 XML/纯文本，以及检索引用列表与参考文献。",
  "Search for scientific papers, preprints, and publications on arXiv. Extract metadata, abstracts, and download full-text PDFs or HTML versions of papers. Use when the user asks to find research papers, literature, or specific arXiv IDs.": "在 arXiv 上搜索科学论文、预印本和出版物。支持提取元数据与摘要，并下载论文的全文 PDF 或 HTML 版本。",
  "Search plugins...": "搜索插件...",
  "Search PubMed for scientific literature, including published clinical trials. Fetch abstracts and full text. Link published research to biological databases (gene, protein, nucleotide, PubChem) to discover associations between papers and specific compounds or genes. Verify medical spelling, match raw citations, and cache result sets for bulk processing. Interfaces NCBI E-utilities and PMC BioC APIs.": "在 PubMed 中搜索科学文献（含已发表的临床试验），获取摘要与全文，并将已发表研究关联至生物数据库（基因、蛋白质、核苷酸、PubChem）以发现论文与特定化合物或基因之间的关联。",
  "Search tool for modern web development best practices. MANDATORY: Execute FIRST for all HTML/CSS and clientside JS tasks. Do NOT skip — web APIs evolve rapidly and training weights contain obsolete patterns. Trigger immediately for: - UI/Layout: Modals, dialogs, popovers, Glassmorphism/backdrop-filters, anchor positioning, container queries, :has(), :user-valid. - Scroll/Motion: View Transitions, Scroll-driven animations, scroll parallax/reveals. - Performance: CWV (LCP, INP), content-visibility, Fetch Priority, image optimization. - System/APIs: Local filesystem access, WebUSB, WebSockets sync, WebAssembly widgets. - Frameworks: Adapting layout/styles in React, Vue, Angular. - General Frontend: Forms, autofill, advanced inputs, custom scrollbars, modern component states, etc. DO NOT trigger for: - Backend: Database SQL, ORMs, Express API routes. - Pipelines: CI/CD deployment, Docker, Actions. - Generic: Local scripts (Python/Go tools), ESLint, Git.": "现代 Web 开发最佳实践检索工具。【强制要求】：在执行所有 HTML/CSS 与客户端 JS 任务前必须首先运行此工具，切勿跳过，以避免使用过时的 Web API 模式。",
  "Search tool for modern web development best practices. MANDATORY: Execute FIRST for all HTML/CSS and clientside JS tasks. Do NOT skip — web APIs evolve rapidly and training weights contain obsolete patterns. Trigger immediately for: - UI/Layout: Modals, dialogs, popovers, Glassmorphism/backdrop-filters, anchor positioning, container queries, `:has()`, `:user-valid`. - Scroll/Motion: View Transitions, Scroll-driven animations, scroll parallax/reveals. - Performance: CWV (LCP, INP), content-visibility, Fetch Priority, image optimization. - System/APIs: Local filesystem access, WebUSB, WebSockets sync, WebAssembly widgets. - Frameworks: Adapting layout/styles in React, Vue, Angular. - General Frontend: Forms, autofill, advanced inputs, custom scrollbars, modern component states, etc. DO NOT trigger for: - Backend: Database SQL, ORMs, Express API routes. - Pipelines: CI/CD deployment, Docker, Actions. - Generic: Local scripts (Python/Go tools), ESLint, Git.": "现代 Web 开发最佳实践搜索工具。所有 HTML、CSS 和客户端 JavaScript 任务都必须首先执行，不可跳过，因为 Web API 更新很快，训练数据可能包含过时模式。UI 与布局、滚动与动效、性能、系统与 API、React/Vue/Angular 等框架适配，以及表单、自动填充、自定义滚动条等常规前端任务均应立即启用。后端数据库与 ORM、Express API 路由、CI/CD 与 Docker 流水线、通用本地脚本、ESLint 和 Git 任务不应启用。",
  "Searches for homologous protein sequences using MMseqs2 (fast, default) or BLAST (comprehensive, fallback). Trigger this whenever the user provides a protein sequence or FASTA file and asks to find homologues, sequence matches, or wants to infer protein function based on sequence similarity, but not when the user wants to infer protein function based on structural similarity.": "使用 MMseqs2（快速默认）或 BLAST（全面兜底）搜索同源蛋白质序列。当用户提供蛋白质序列或 FASTA 文件并希望查找同源物、序列匹配或基于序列相似性推断蛋白质功能时触发。",
  "Searching Agent Market...": "正在搜索智能体市场...",
  "Security Notice & Data Use": "安全声明与数据使用",
  "See more results": "查看更多结果",
  "Select a workspace to save agent scripts to your workspace.": "选择一个工作区以保存智能体脚本。",
  "Select one of the": "选择以下",
  "Sent Message": "已发送消息",
  "Sets up Google Cloud Lakehouse federated catalogs to remote Iceberg REST Catalogs. Currently supported catalogs: Databricks Unity, AWS Glue. Supported clouds hosting those catalogs: GCP, AWS. The primary use case is connecting to remote data to query it from GCP engines (BigQuery, Spark). Examples of when to use this: \"federate my lakehouse catalog to databricks\", \"query data in databricks\", \"query data in s3\", \"connect to aws glue\". Do NOT use for direct remote database SQL execution (e.g., Databricks SQL) or managing remote clusters and infrastructure (e.g., Databricks clusters, AWS Glue jobs).": "配置连接到远程 Iceberg REST 目录（如 Databricks Unity、AWS Glue）的 Google Cloud Lakehouse 联邦目录，以便从 GCP 引擎（BigQuery、Spark）查询远程数据。",
  "Sets up, manages, queries, and configures Cloud Firestore databases (Standard/Enterprise edition), including data modeling, security rules, indexes, and SDK integrations (Web, Python, iOS, Android, Flutter). Use when creating/listing Firestore databases, defining data models/indexes, writing SDK queries, or integrating Firestore SDKs. For authoring or modifying Firestore Security Rules (firestore.rules), delegate to the firestore-rules-author subagent if subagent delegation is available, or use firestore-rules-creation otherwise. Don't use for Firebase Hosting, Data Connect, Auth, Storage/GCS, Crashlytics, Functions, or BigQuery.": "配置、管理、查询和设置 Cloud Firestore 数据库（标准版/企业版），涵盖数据建模、安全规则、索引以及多平台 SDK 集成（Web、Python、iOS、Android、Flutter）。",
  "Setup required": "需要配置",
  "Show more results on Agent Market": "在智能体市场中显示更多结果",
  "side pane": "侧边栏面板",
  "Side pane": "侧边栏面板",
  "Side Pane": "侧边栏面板",
  "Side Pane UI Available": "侧边面板界面可用",
  "Sign out": "退出登录",
  "Sign out of this server?": "退出此服务器？",
  "Skill deletion is not available.": "技能删除功能不可用。",
  "Skill for converting an installed Firebase Extension (or extension source) into a standalone Cloud Functions for Firebase codebase or publishable npm package, including V1 to V2 trigger upgrades, lifecycle hooks, and declarative security": "将已安装的 Firebase 扩展（或扩展源码）转换为独立的 Cloud Functions for Firebase 代码库或可发布的 npm 包，涵盖 V1 至 V2 触发器升级、生命周期钩子与声明式安全配置。",
  "Skills & Rules": "技能与规则",
  "skills and rules": "技能与规则",
  "Skills are instructions that extend what Agent can do.": "技能是扩展智能体能力的指令。",
  "Skills Configuration Error:": "技能配置错误：",
  "Skills providing tailored instructions for happy path Dart and Flutter development workflows": "为 Dart 与 Flutter 标准开发工作流提供量身定制指导的技能集合",
  "Skills providing tailored instructions for happy path Dart and Flutter development workflows.": "为顺畅的 Dart 和 Flutter 开发工作流提供针对性指导的技能。",
  "Specialized suite of skills for data engineers and database practitioners on Google Cloud": "面向 Google Cloud 数据工程师和数据库从业者的专业技能套件",
  "Specialized suite of skills for data engineers and database practitioners on Google Cloud.": "专为 Google Cloud 上的数据工程师与数据库从业者打造的专业技能套件。",
  "Start Automation": "启动自动化任务",
  "Start Extension": "启动扩展",
  "Stay Tuned": "敬请期待",
  "Stores, retrieves, and manages data as objects in Cloud Storage (Google Cloud Storage, or GCS) buckets. Use when you need to interact with Cloud Storage — create or configure buckets, upload, download, stream, or transfer data, organize objects with folders, generate signed URLs, control access (IAM, ACLs, public access prevention), set storage classes and tiering (Standard, Nearline, Coldline, Archive), manage cost and lifecycle, protect data (versioning, encryption/CMEK, retention and Bucket Lock, object holds, soft delete), host static websites, trigger Pub/Sub notifications on object changes, mount buckets as a file system (gcsfuse), or optimize storage performance at any scale. Covers the gcloud storage / gsutil CLI, JSON and XML APIs, client libraries, Terraform, and Cloud Storage MCP servers. Don't use for block storage (Persistent Disk), data warehousing/analytics (BigQuery), or databases (Cloud SQL, Spanner, Bigtable, Firestore).": "在 Cloud Storage (GCS) 存储桶中将数据作为对象进行存储、检索与管理。涵盖创建与配置存储桶、上传下载与流式传输、签名 URL、IAM/ACL 访问控制、存储类别与生命周期管理、数据保护、静态网站托管及 gcsfuse 挂载优化。",
  "Stream and control": "流式传输与控制",
  "Target Tools:": "目标工具：",
  "Task Logs": "任务日志",
  "Terminal commands the agent can execute.": "智能体可执行的终端命令。",
  "Terms and Privacy:": "条款和隐私：",
  "The browser subagent has been disabled by your administrator. Contact your administrator to enable browser use.": "浏览器子智能体已被您的管理员禁用。请联系您的管理员以启用浏览器功能。",
  "There are currently no Build with": "当前暂无可用的 Build with",
  "There are currently no Build with Antigravity plugins available.": "当前暂无可用的 Build with Antigravity 插件。",
  "There are currently no Build with Google plugins available.": "当前暂无可用的 Build with Google 插件。",
  "There are no customizations enabled.": "当前未启用任何自定义扩展。",
  "These MCP allowlist rules are enforced by your organization's administrator.": "这些 MCP 允许名单规则由您所在组织的管理员强制执行。",
  "These servers need you to sign in before the agent can use their tools.": "这些服务器需要您先登录，然后智能体才能使用其工具。",
  "This automation is currently stopped. Events and stdout streams will appear here once started.": "此自动化任务当前已停止。启动后，事件与标准输出流将显示在此处。",
  "This extension is currently stopped. Events and stdout streams will appear here once started.": "此扩展当前已停止。启动后，事件与标准输出流将显示在此处。",
  "This is a preview of the plugin's source. Nothing below is active until you install it.": "以下是该插件源码的预览。在您安装此插件之前，下方内容均不会生效。",
  "This plugin is disabled, so nothing shown below is active. Enable it above to use it.": "此插件已禁用，因此下方显示的内容均未生效。请在上方启用该插件以使用它。",
  "This plugin provides a specialized suite of skills for data engineers and database practitioners working on Google Cloud. It acts as an expert assistant, allowing you to use natural language prompts in your preferred coding agent to architect complex data pipelines, transform data with dbt, write Spark and BigQuery SQL notebooks, and orchestrate end-to-end workflows across GCP's data ecosystem.": "此插件为在 Google Cloud 上工作的数据工程师和数据库从业者提供专业技能套件。它充当专家助手，支持在您偏好的编码智能体中使用自然语言提示词来设计复杂数据流水线、使用 dbt 转换数据、编写 Spark 与 BigQuery SQL 笔记本，并在 GCP 数据生态系统中编排端到端工作流。",
  "This project was created for": "此项目创建用于",
  "This server needs you to sign in before the agent can use its tools.": "此服务器需要您先登录，然后智能体才能使用其工具。",
  "This skill guides the use of Jupyter notebooks for data analysis, exploration, and visualization, particularly with BigQuery. It outlines best practices for notebook execution and validation (supporting both cell-by-cell execution and full notebook generation depending on tool availability), library installation, and structuring notebooks for clarity. It also covers specific rules for data cleaning, plotting, and integrating with BigQuery SQL and machine learning workflows. Relevant when any of the following conditions are true: 1. The user request involves a data analysis, data exploration, data visualization, or data insights task that requires multiple steps, queries, or visualizations to answer. 2. The user explicitly requests a notebook (.ipynb). 3. You are creating, editing, or executing cells in a Jupyter notebook. 4. You need to query BigQuery from within a notebook. DO NOT use the Python BigQuery client library; instead, you MUST use the %%bqsql magics explained in this skill.": "指导使用 Jupyter 笔记本进行数据分析、探索与可视化（特别是结合 BigQuery）。涵盖单元格执行与验证、库安装、数据清洗、绘图规范，并要求使用 %%bqsql 魔法命令查询 BigQuery。",
  "This skill guides the use of Jupyter notebooks for data analysis, exploration, and visualization, particularly with BigQuery. It outlines best practices for notebook execution and validation (supporting both cell-by-cell execution and full notebook generation depending on tool availability), library installation, and structuring notebooks for clarity. It also covers specific rules for data cleaning, plotting, and integrating with BigQuery SQL and machine learning workflows. Relevant when any of the following conditions are true: 1. The user request involves a data analysis, data exploration, data visualization, or data insights task that requires multiple steps, queries, or visualizations to answer. 2. The user explicitly requests a notebook (.ipynb). 3. You are creating, editing, or executing cells in a Jupyter notebook. 4. You need to query BigQuery from within a notebook. DO NOT use the Python BigQuery client library; instead, you MUST use the `%%bqsql` magics explained in this skill.": "指导使用 Jupyter 笔记本进行数据分析、探索与可视化（特别是结合 BigQuery）。涵盖单元格执行与验证、库安装、数据清洗、绘图规范，并要求使用 `%%bqsql` 魔法命令查询 BigQuery。",
  "This skill helps the agent generate or update orchestration pipeline definitions for Google Cloud Composer to initialize orchestration pipeline or update the orchestration definition for orchestration of various data pipelines, like dbt pipelines, notebooks, Spark jobs, Dataform, Python scripts or inline BigQuery SQL queries. This skill also helps deploy and trigger orchestration pipelines.": "协助智能体生成或更新 Google Cloud Composer 的编排流水线定义，以初始化、更新、部署和触发涵盖 dbt、笔记本、Spark 作业、Dataform、Python 脚本或内联 BigQuery SQL 的各类数据编排流水线。",
  "This skill is installed in your workspace": "此技能已安装在您的工作区中",
  "Try out early-stage features before they ship. These may be changed or removed at any time. These features are experimental, and we make no guarantees about performance or functionality.": "在早期功能正式发布前抢先体验。这些功能随时可能变更或移除。它们属于实验性功能，我们对其性能或功能完整性不做任何保证。",
  "UI extension": "UI 扩展",
  "UI Extension (AuxPane)": "界面扩展 (侧边辅助面板)",
  "UI extensions": "界面扩展",
  "UI plugin": "UI 插件",
  "UI Plugin Navigation": "UI 插件导航",
  "UI plugins": "UI 插件",
  "UI Plugins": "界面插件",
  "Unknown Server": "未知服务器",
  "Untitled project": "未命名项目",
  "URLs the agent can actuate on in this workspace.": "智能体在此工作区内可执行交互操作的 URL。",
  "URLs the agent can actuate on using the browser.": "智能体可使用浏览器执行交互操作的 URL。",
  "URLs the agent can read or open in the browser.": "智能体可在浏览器中读取或打开的 URL。",
  "URLs the agent can read or open in this workspace.": "智能体在此工作区内可读取或打开的 URL。",
  "Use `LayoutBuilder`, `MediaQuery`, or `Expanded/Flexible` to create a layout that adapts to different screen sizes. Use when you need the UI to look good on both mobile and tablet/desktop form factors.": "使用 `LayoutBuilder`、`MediaQuery` 或 `Expanded/Flexible` 创建适应不同屏幕尺寸的布局。需要 UI 在手机、平板和桌面设备上均有良好效果时使用。",
  "Use LayoutBuilder, MediaQuery, or Expanded/Flexible to create a layout that adapts to different screen sizes. Use when you need the UI to look good on both mobile and tablet/desktop form factors.": "使用 LayoutBuilder、MediaQuery 或 Expanded/Flexible 创建自适应不同屏幕尺寸的响应式布局，确保界面在手机、平板和桌面端均具备良好的视觉表现。",
  "Use switch expressions and pattern matching where appropriate": "在适当位置使用 `switch` 表达式和模式匹配。",
  "Use the `http` package to execute GET, POST, PUT, or DELETE requests. Use when you need to fetch from or send data to a REST API.": "使用 `http` 包执行 GET、POST、PUT 或 DELETE 请求。需要从 REST API 获取数据或向其发送数据时使用。",
  "Use the http package to execute GET, POST, PUT, or DELETE requests. Use when you need to fetch from or send data to a REST API.": "使用 http 包执行 GET、POST、PUT 或 DELETE 网络请求。适用于需要从 REST API 获取数据或向其发送数据的场景。",
  "Use this skill for generative video editing, text-to-video, image-referenced video generation, first-frame-to-video, first-and-last-frame transitions, and video extensions using Gemini Omni 1.1 Flash (gemini-omni-1.1-flash) via the official google-genai SDK. Includes workflows for pre-processing/optimizing high-resolution or long source videos with ffmpeg, stripping audio for full sound regeneration, and handling turn-by-turn video editing and parallel execution.": "通过官方 google-genai SDK 使用 Gemini Omni 1.1 Flash (gemini-omni-1.1-flash) 进行生成式视频编辑、文生视频、图生视频、首尾帧过渡与视频延展，包含使用 ffmpeg 预处理高分辨率长视频及多轮视频编辑工作流。",
  "Use this skill when building real-time, bidirectional streaming applications with the Gemini Live API, or migrating legacy Live models (2.0/2.5/3.1) to Gemini 3.8 Live. Covers WebSocket-based audio/video/text streaming, voice activity detection (VAD), background reasoning (extended thinking), asynchronous function calling, session management, ephemeral tokens, live transcription, and live translation. SDKs covered - google-genai (Python), @google/genai (JavaScript/TypeScript).": "当使用 Gemini Live API 构建实时双向流式应用程序，或将旧版 Live 模型 (2.0/2.5/3.1) 迁移到 Gemini 3.8 Live 时使用此技能。涵盖基于 WebSocket 的音频/视频/文本流式传输、语音活动检测 (VAD)、后台推理（深度思考）、异步函数调用、会话管理、临时 Token、实时转录与实时翻译。支持的 SDK：google-genai (Python)、@google/genai (JavaScript/TypeScript)。",
  "Use this skill when building real-time, bidirectional streaming applications with the Gemini Live API. Covers WebSocket-based audio/video/text streaming, voice activity detection (VAD), native audio features, function calling, session management, ephemeral tokens for client-side auth, live translation, and all Live API configuration options. SDKs covered - google-genai (Python), @google/genai (JavaScript/TypeScript).": "使用 Gemini Live API 构建实时双向流式应用时使用此技能。涵盖基于 WebSocket 的音视频与文本流、语音活动检测 (VAD)、原生音频特性、函数调用、会话管理、客户端临时令牌、实时翻译及全套配置选项。",
  "Use this skill when writing code that calls the Gemini API for text generation, multi-turn chat, multimodal understanding, image generation, video generation, speech generation (TTS), voice design, voice replication, streaming responses, background research tasks, function calling, structured output, or migrating from the old generateContent API. Covers SDK usage and best practices for Gemini models and agents in Python and TypeScript.": "当编写调用 Gemini API 进行文本生成、多轮对话、多模态理解、图像生成、视频生成、语音合成 (TTS)、声音设计、声音复制、流式响应、后台研究任务、函数调用 (Function Calling)、结构化输出或从旧版 generateContent API 迁移时使用此技能。涵盖 Python 与 TypeScript 中 Gemini 模型与智能体的 SDK 用法和最佳实践。",
  "Use this skill when writing code that calls the Gemini API for text generation, multi-turn chat, multimodal understanding, image generation, video generation, streaming responses, background research tasks, function calling, structured output, or migrating from the old generateContent API. Covers SDK usage and best practices for Gemini models and agents in Python and TypeScript.": "编写调用 Gemini API 的代码时使用此技能，涵盖文本生成、多轮对话、多模态理解、图像生成、视频生成、流式响应、后台研究任务、函数调用、结构化输出或从旧版 generateContent API 迁移，提供 Python 与 TypeScript SDK 最佳实践。",
  "Use when needing clinical significance, pathogenicity classifications (e.g., Pathogenic, Benign, VUS), clinical evidence rationales, or finding \"hard positive\" benchmark controls for human genomic variants.": "查询人类基因组变异的临床意义、致病性分类（如致病、良性、意义未明变异 VUS）、临床证据依据或基准对照位点时使用此技能。",
  "Use when you want to look up, map, and search for short genetic variants (SNPs, indels) in NCBI's dbSNP database. Resolves between rsIDs, genomic coordinates in VCF format, and HGVS strings. For an rsID, returns variant type, gene associations, clinical significance, allele frequencies, and genomic coordinates (GRCh38).": "在 NCBI 的 dbSNP 数据库中查找、映射和搜索短遗传变异（SNP、Indel）。支持在 rsID、VCF 基因组坐标与 HGVS 字符串之间解析转换，并返回变异类型、基因关联、临床意义、等位基因频率及 GRCh38 坐标。",
  "Use when you want to retrieve quantitative RNA expression data and variant eQTL information from the GTEx (Genotype-Tissue Expression) Project across 54 non-diseased tissue sites.": "从 GTEx（基因型-组织表达）项目中检索涵盖 54 个非病变组织部位的定量 RNA 表达数据与变异 eQTL 信息。",
  "Use when you want to retrieve semi-quantitative protein expression and spatial localisation data from the Human Protein Atlas (HPA).": "从人类蛋白质图谱 (HPA) 数据库中检索半定量蛋白质表达与空间亚细胞定位数据。",
  "Use when you want to search for or download experimentally-determined 3D structures for biomolecules (proteins, nucleic acids, bound ligands). Supports searching by sequence similarity, structure similarity, chemical and other attributes. Also use to get metadata about biomolecular structure experiments.": "搜索或下载实验测定的生物大分子（蛋白质、核酸、结合配体）3D 结构。支持按序列相似性、结构相似性、化学属性进行搜索，并获取生物大分子结构实验元数据。",
  "Uses Chrome DevTools MCP and documentation to troubleshoot connection and target issues. Trigger this skill when list_pages, new_page, or navigate_page fail, or when the server initialization fails.": "使用 Chrome DevTools MCP 与文档排查连接及目标页面问题。当 list_pages、new_page 或 navigate_page 失败，或服务初始化失败时触发此技能。",
  "Uses Chrome DevTools MCP for accessibility (a11y) debugging and auditing based on web.dev guidelines. Use when testing semantic HTML, ARIA labels, focus states, keyboard navigation, tap targets, and color contrast.": "基于 web.dev 指南使用 Chrome DevTools MCP 进行无障碍 (a11y) 调试与审计。适用于测试语义化 HTML、ARIA 标签、焦点状态、键盘导航、触控目标及色彩对比度。",
  "Uses Chrome DevTools via MCP for efficient debugging, troubleshooting and browser automation. Use when debugging web pages, automating browser interactions, analyzing performance, or inspecting network requests. This skill does not apply to --slim mode (MCP configuration).": "通过 MCP 使用 Chrome DevTools 进行高效调试、故障排查与浏览器自动化。适用于调试网页、自动化浏览器交互、分析性能或检查网络请求。此技能不适用于 --slim 精简模式。",
  "Uses Chrome DevTools via MCP for efficient debugging, troubleshooting and browser automation. Use when debugging web pages, automating browser interactions, analyzing performance, or inspecting network requests. This skill does not apply to `--slim` mode (MCP configuration).": "通过 MCP 使用 Chrome DevTools 进行高效调试、故障排查与浏览器自动化。适用于调试网页、自动化浏览器交互、分析性能或检查网络请求。此技能不适用于 `--slim` 精简模式。",
  "Uses get_runtime_errors and lsp to fetch an active stack trace, locate the failing line, apply a fix, and verify resolution via hot_reload.": "使用 `get_runtime_errors` 和 LSP 获取当前堆栈跟踪、定位故障行、应用修复，并通过 `hot_reload` 验证问题已解决。",
  "Using the Antigravity Python SDK to build AI agents": "使用 Antigravity Python SDK 构建 AI 智能体",
  "Using the Antigravity Python SDK to build AI agents.": "使用 Antigravity Python SDK 构建 AI 智能体。",
  "Using the Google Antigravity Python SDK to build AI agents.": "使用 Google Antigravity Python SDK 构建 AI 智能体。",
  "View Logs": "查看日志",
  "Visualize, analyze, and render protein and molecular structures using PyMOL. Use when the user wants to create images of protein structures, perform structural alignments or superposition, measure distances or contacts, highlight binding sites or active site residues, color by B-factor/pLDDT, or analyze protein-ligand interactions. Do not use for docking, molecular dynamics, or sequence-only analysis.": "使用 PyMOL 可视化、分析和渲染蛋白质与分子结构。适用于生成蛋白质结构图像、执行结构比对或叠合、测量距离或接触位点、高亮结合位点、按 B 因子/pLDDT 着色或分析蛋白质-配体相互作用。",
  "When enabled, 'Explain and Fix' actions will continue in the current conversation instead of starting a new one.": "启用后，“解释并修复”操作将在当前会话中继续进行，而不会开启新会话。",
  "When enabled, Agent will use IDE's shell integration to detect and report terminal command execution.": "启用后，智能体将使用 IDE 的 Shell 集成来检测并报告终端命令的执行情况。",
  "When enabled, Antigravity will play a sound when Agent finishes generating a response.": "启用后，当智能体完成回复生成时，Antigravity 将播放提示音。",
  "When enabled, the agent will be able to access its knowledge base to inform its responses and automatically generate knowledge items in the background.": "启用后，智能体将能够访问其知识库以辅助生成回复，并在后台自动提炼知识条目。",
  "When enabled, the Changes Overview toolbar will automatically expand when Agent finishes generating a response.": "启用后，当智能体完成回复生成时，“变更概览”工具栏将自动展开。",
  "work with Google developer products": "协同使用 Google 开发者产品",
  "work with Google developer products.": "协同使用 Google 开发者产品。",
  "work with Google developer products. You can always change your choices in Settings.": "协同使用 Google 开发者产品。您随时可以在“设置”中更改选择。",
  "Workflow for fixing package version conflicts. Use this when `pub get` fails due to incompatible package versions.": "修复软件包版本冲突的工作流。当 `pub get` 因软件包版本不兼容而失败时使用。",
  "Workflow for fixing package version conflicts. Use this when pub get fails due to incompatible package versions.": "解决依赖包版本冲突的标准工作流。当因包版本不兼容导致 pub get 失败时使用此技能。",
  "Workflows are being deprecated in favor of skills. You can use the agent to migrate your workflows.": "工作流 (Workflows) 正在逐步弃用并由技能 (Skills) 取代。您可以使用智能体迁移现有的工作流。",
  "Workspace Creation": "工作区创建",
  "Write and organize unit tests for functions, methods, and classes using `package:test`. Use when creating new logic or fixing bugs to ensure code remains correct and regression-free.": "使用 `package:test` 为函数、方法和类编写并组织单元测试。在创建新逻辑或修复错误时使用，以确保代码正确并防止回归。",
  "Write and organize unit tests for functions, methods, and classes using package:test. Use when creating new logic or fixing bugs to ensure code remains correct and regression-free.": "使用 package:test 为函数、方法和类编写与组织单元测试。适用于编写新业务逻辑或修复 Bug 时确保代码正确性并防止回归问题。",
  "You can always change your choices in Settings": "您随时可以在“设置”中更改选择",
  "You can always change your choices in Settings.": "您随时可以在“设置”中更改选择。",
  "You don't have any custom agents or plugins configured. Create agent scripts in the agents/ directory or add plugins to the plugins/ directory inside your Gemini configuration folder.": "您尚未配置任何自定义智能体或插件。请在您的 Gemini 配置文件夹下的 agents/ 目录中创建智能体脚本，或向 plugins/ 目录中添加插件。",
  "Your agent's ability to execute commands is also controlled by enterprise security policies.": "您的智能体执行命令的能力同样受企业安全策略管控。",
  "Your agent’s ability to execute commands is also controlled by enterprise security policies.": "您的智能体执行命令的能力同样受企业安全策略管控。",
  "AI Credits": "AI 积分",
  "Show in the menu bar when closed. Right-click to quit.": "关闭窗口后仍保留在菜单栏/系统托盘中。右键点击可彻底退出。",
  "AI Credits are used when you've exceeded your model quota. Keep track of your current AI Credits in the": "AI 积分用于超出模型配额时的计费消耗。可在以下位置跟踪您的当前 AI 积分：",
  "Action List background color for the focused item.": "获得焦点项的操作列表背景颜色。",
  "Action List background color.": "操作列表背景颜色。",
  "Action List foreground color for the focused item.": "获得焦点项的操作列表前景文本颜色。",
  "Action List foreground color.": "操作列表前景文本颜色。",
  "Active Model": "当前模型",
  "Active background color of the command center": "命令中心处于活动状态时的背景颜色",
  "Active border color of the command center": "命令中心处于活动状态时的边框颜色",
  "Active foreground color of the command center": "命令中心处于活动状态时的前景文本颜色",
  "Active tab background color in an active group. Tabs are the containers for editors in the editor area. Multiple tabs can be opened in one editor group. There can be multiple editor groups.": "活动编辑器分组中当前活动标签页的背景颜色。标签页是编辑器区域中编辑器的容器，一个编辑器分组中可打开多个标签页，也可以存在多个编辑器分组。",
  "Active tab background color in an unfocused group. Tabs are the containers for editors in the editor area. Multiple tabs can be opened in one editor group. There can be multiple editor groups.": "未聚焦编辑器分组中活动标签页的背景颜色。标签页是编辑器区域中编辑器的容器，一个编辑器分组中可打开多个标签页，也可以存在多个编辑器分组。",
  "Active tab foreground color in an active group. Tabs are the containers for editors in the editor area. Multiple tabs can be opened in one editor group. There can be multiple editor groups.": "活动编辑器分组中当前活动标签页的前景文本颜色。标签页是编辑器区域中编辑器的容器，一个编辑器分组中可打开多个标签页，也可以存在多个编辑器分组。",
  "Active tab foreground color in an unfocused group. Tabs are the containers for editors in the editor area. Multiple tabs can be opened in one editor group. There can be multiple editor groups.": "未聚焦编辑器分组中活动标签页的前景文本颜色。标签页是编辑器区域中编辑器的容器，一个编辑器分组中可打开多个标签页，也可以存在多个编辑器分组。",
  "Active token streaming duration from the language model.": "来自语言模型的活跃 Token 流式传输持续时间。",
  "Add Custom Model": "添加自定义模型",
  "Add Model": "添加模型",
  "Appearance": "外观",
  "Audio attachment": "音频附件",
  "Background color behind matching brackets": "匹配括号后方的背景高亮颜色",
  "Background color for block quotes in text.": "文本中块级引用（Block Quote）的背景颜色。",
  "Background color for code blocks in text.": "文本中代码块（Code Block）的背景颜色。",
  "Browser Viewport Width": "浏览器视口宽度",
  "Claude and GPT models": "Claude 和 GPT 模型",
  "Color Theme": "颜色主题",
  "Configure Models": "配置模型",
  "Configure external tools via Model Context Protocol.": "通过模型上下文协议配置外部工具。",
  "Configure the agent's visual theme and display preferences.": "配置智能体的视觉主题和显示偏好。",
  "Configure the maximum width of the conversation panel.": "配置对话面板的最大宽度。",
  "Conversation Width": "对话宽度",
  "Dark Theme": "深色主题",
  "Default Model": "默认模型",
  "Dismiss notification": "忽略通知",
  "Display Options": "显示选项",
  "Display and preserve intermediate thinking steps.": "显示并保留中间思考步骤。",
  "Editor Font Family": "编辑器字体系列",
  "Editor Font Size": "编辑器字号大小",
  "Editor Settings": "编辑器设置",
  "Enable AI Credit Overages": "启用 AI 点数超额使用",
  "Enable Notifications for Agent": "启用智能体系统通知",
  "Enable Sounds for Agent": "启用智能体声音",
  "Experimental model. Click to provide feedback or opt out.": "实验性模型。点击可提供反馈或退出。",
  "Font Family": "字体",
  "Font Ligatures": "连字字体效果",
  "Font Size": "字体大小",
  "Font Weight": "字重（粗细）",
  "Gemini Models": "Gemini 模型",
  "Keyboard Shortcuts": "键盘快捷键",
  "Keyboard shortcuts": "键盘快捷键",
  "LAYOUT CONTROLS": "布局控制",
  "Layout Controls": "布局控制",
  "Layout controls": "布局控制",
  "Light Theme": "浅色主题",
  "Manage Models": "管理模型",
  "Manage your model quota and credits.": "管理模型额度和 AI 点数。",
  "Markdown Artifact Width": "Markdown 产物文档宽度",
  "Model": "模型",
  "Model Aliases": "模型别名",
  "Model Capabilities": "模型能力",
  "Model Configuration": "模型详细配置",
  "Model Credits": "模型点数",
  "Model Provider": "模型提供商",
  "Model Quota": "模型额度",
  "Model Selection": "模型选择",
  "Model Usage": "模型用量",
  "Models": "模型",
  "Models & Usage": "模型与用量",
  "Models in this group": "该分组包含的模型",
  "Models within this group": "该分组包含的模型",
  "Monthly Quota": "每月配额",
  "New Editor Window": "新建编辑器窗口",
  "No Model Selected": "未选择模型",
  "Notification": "通知",
  "Notification Settings": "通知设置",
  "Notifications": "通知",
  "Open Keyboard Shortcuts": "打开快捷键设置",
  "Preset": "预设",
  "Purchase Credits": "购买点数",
  "Quota Remaining": "剩余配额",
  "Quota exceeded": "已超出配额",
  "Quota running low": "配额即将耗尽",
  "Record Audio": "录制音频",
  "Record Audio Ctrl+M": "录制音频 Ctrl+M",
  "Record audio": "录制音频",
  "Refresh quota and credits data": "刷新额度和点数数据",
  "Refresh quota and credits data.": "刷新配额与积分数据。",
  "Remove audio": "移除音频",
  "Request Quota": "请求配额",
  "Reset Zoom": "重置缩放",
  "Select Default Model": "选择默认模型",
  "Select Model": "选择模型",
  "Select Model to Send Message": "选择用于发送消息的模型",
  "Select a model using the model selector in the input box": "使用输入框中的模型选择器选择模型",
  "Select another model": "选择另一个模型",
  "Shortcuts": "快捷键",
  "Suggestions in Editor": "编辑器内代码补全建议",
  "System Theme": "跟随系统",
  "Table Width": "表格宽度",
  "Terminal Font Family": "终端字体系列",
  "Terminal Font Size": "终端字号大小",
  "Test Model Response": "测试模型响应",
  "Theme": "主题",
  "This error is likely temporary. You can prompt the model to try again after some time.": "此错误可能是暂时的。您可以稍后让模型再试一次。",
  "To modify notification settings, open your operating system's system preferences.": "如需修改通知设置，请打开操作系统的系统偏好设置。",
  "Toggle Editor": "切换编辑器",
  "Toggle Model Selector": "切换模型选择器",
  "Usage & Quota": "用量与配额",
  "View Model Usage": "查看模型用量",
  "When toggled on, Antigravity will use your AI credits to fulfill model requests once you're out of model quota. Antigravity will always use your model quota first before using AI credits.": "开启后，当模型额度用尽时，Antigravity 会使用您的 AI 点数来完成模型请求。Antigravity 始终会优先使用模型额度，然后才使用 AI 点数。",
  "You can prompt the model to try again or start a new conversation if the error persists.": "您可以让模型重试，或在错误持续时开始新会话。",
  "Your quota for this model has run out": "您在此模型上的配额已耗尽",
  "Your quota for this model has run out.": "您在此模型上的配额已耗尽。",
  "Your quota for this model is running low": "您在此模型上的剩余配额即将耗尽",
  "Your quota for this model is running low.": "您在此模型上的剩余配额即将耗尽。",
  "Zoom In": "放大",
  "Zoom Level": "缩放级别",
  "Zoom Out": "缩小",
  "select model": "选择模型",
  "External tools the agent can call via Model Context Protocol.": "智能体可通过模型上下文协议调用的外部工具。",
  "Model A": "模型 A",
  "Model B": "模型 B",
  "Model A was better": "模型 A 表现更优",
  "Model B was better": "模型 B 表现更优",
  "Why did you choose this model?": "您为什么选择此模型？",
  "Display": "显示方式",
  "Maximize Width": "最大化宽度",
  "Minimize Width": "最小化宽度",
  "Play a sound when the agent finishes generating a response.": "当智能体完成回复生成时播放提示音。",
  "Show browser notifications when your action is needed or execution finishes.": "当需要您采取操作或执行完成时显示系统通知。",
  "Notification Sounds": "通知提示音",
  "Network Proxy": "网络代理",
  "Configure network proxy settings.": "配置网络代理设置。",
  "Proxy Mode": "代理模式",
  "Direct (no proxy)": "直接连接 (不使用代理)",
  "Proxy URL": "代理服务器地址",
  "Save Proxy Settings": "保存代理设置",
  "Telemetry": "遥测诊断",
  "Diagnostic Data": "诊断数据",
  "Crash Reporting": "崩溃报告",
  "Terminal Shell": "终端 Shell",
  "Language": "语言",
  "Windows Subsystem for Linux": "Windows 的 Linux 子系统 (WSL)",
  "Run the app against a Linux environment. Connecting relaunches the app into the selected WSL distro.": "在 Linux 环境中运行此应用。连接后将把应用重新启动到所选的 WSL 发行版中。",
  "Local Windows environment": "本地 Windows 环境",
  "The app is currently connected to a WSL distro. Reopening locally relaunches it directly on Windows.": "此应用当前已连接到 WSL 发行版。在本地重新打开将直接在 Windows 上重新启动该应用。",
  "Reopen Locally": "在本地重新打开",
  "Connect to WSL": "连接到 WSL",
  "Connect": "连接",
  "Folder is on the Windows filesystem": "文件夹位于 Windows 文件系统上",
  "This folder is on the Windows filesystem. Accessing it from WSL (via /mnt) can be slow — for best performance keep projects inside the WSL filesystem.": "此文件夹位于 Windows 文件系统上。从 WSL 访问该目录（通过 /mnt）可能会较慢 —— 为获得最佳性能，建议将项目保留在 WSL 文件系统内。",
  "WSL distro not found": "未找到 WSL 发行版",
  "Antigravity opened on Windows instead.": "Antigravity 已改为在 Windows 本地打开。",
  "Baseline model quota reached": "已达到基础模型配额上限",
  "Model quota reached": "已达到模型额度",
  "Insufficient AI Credits": "AI 点数不足",
  "See Plans": "查看套餐",
  "See plans": "查看套餐方案",
  "See plans.": "查看套餐方案。",
  "View Plans": "查看套餐方案",
  "Your AI credits balance is too low to continue.": "您的 AI 积分余额不足，无法继续。",
  "To continue using this model now, enable AI Credit overages.": "若要立即继续使用此模型，请启用超额 AI 积分计费。",
  "You need more AI Credits to send messages.": "您需要更多 AI 积分才能发送消息。",
  "To continue using this model now, purchase more AI Credits.": "若要立即继续使用此模型，请购买更多 AI 积分。",
  "Too many requests, please try again in a bit!": "请求过于频繁，请稍后再试！",
  "Verification required": "需要验证",
  "Please verify your account to continue using": "请验证您的账号以继续使用",
  "Agent terminated due to error": "智能体因错误而终止",
  "See our": "请参阅我们的",
  "troubleshooting guide": "故障排查指南",
  "for more help.": "以获取更多帮助。",
  "Error Loading Models": "加载模型出错",
  "No Models Available": "暂无可用模型",
  "No models available": "没有可用模型",
  "No models are available for your current project or account. Please check your project settings and IAM permissions.": "您当前的项目或账号暂无可用模型。请检查您的项目设置与 IAM 权限。",
  "No quota information available.": "暂无配额信息。",
  "Labs settings have moved": "实验性功能设置已迁移",
  "Labs settings have moved to the Advanced section of General settings.": "实验性功能设置已迁移至“通用设置”中的“高级”板块。",
  "Best of N Models": "Best-of-N 多模型优选",
  "Custom models are only supported on Linux machines.": "自定义模型仅在 Linux 设备上受支持。",
  "Loading models...": "正在加载模型...",
  "Extension Is Loading": "扩展正在加载中",
  "Model selector loading": "模型选择器正在加载",
  "For Antigravity Business consumption options, see": "有关 Antigravity 商业版用量选项，请参阅",
  "Resets in <1m": "不到 1 分钟后重置",
  "Resets in <1m.": "不到 1 分钟后重置。",
  "Open Trajectory Debug View": "打开轨迹调试视图",
  "Copy Trajectory ID": "复制轨迹 ID",
  "Trajectory ID": "轨迹 ID",
  "Cascade ID": "级联会话 ID",
  "Open in Trajectory Dashboard": "在轨迹控制台中打开",
  "Trajectory Telemetry: Redacted (User Content Stripped)": "轨迹遥测诊断：已脱敏（已剥离用户内容）",
  "Trajectory Telemetry: Active (Uploading)": "轨迹遥测诊断：已激活（正在上传）",
  "Parent Conversation": "父对话",
  "Root Conversation": "根级会话",
  "Use Global Settings": "使用全局设置",
  "Every command requires approval.": "每条命令均需审批。",
  "Ask before sensitive operations.": "在执行敏感操作前询问。",
  "Security agent decides if commands run.": "由安全智能体决定是否运行命令。",
  "Automatically decide if commands run.": "自动决定是否运行命令。",
  "Run all commands without restrictions.": "无限制运行所有命令。",
  "needs a few details from you before it can run.": "运行前需要您补充几项详细信息。",
  "This extension has no declared permissions requiring user input.": "此扩展程序没有需要用户输入的声明权限。",
  "Please fill out all required values to continue.": "请填写所有必填项以继续。",
  "Resolving...": "正在解析...",
  "Next: Review Permissions": "下一步：审查权限",
  "Resolving permissions...": "正在解析权限...",
  "Folders these agents can access.": "这些智能体可以访问的文件夹。",
  "Commands and files these agents can use.": "这些智能体可以使用的命令与文件。",
  "Confirm & Save": "确认并保存",
  "Agents created by": "由",
  "with its own permissions, which you can change anytime in the": "并拥有独立权限，您可以随时在",
  "settings page.": "设置页面中更改。",
  "No matching plugins found.": "未找到匹配的插件。",
  "Demoted": "已降级",
  "Excluded": "已排除",
  "Account connected.": "账号已连接。",
  "Disconnect your account from this plugin?": "确定要断开您的账号与此插件的连接吗？",
  "Disconnect": "断开连接",
  "This plugin requires authentication before the agent can use its tools.": "智能体使用此插件的工具前需要先完成身份验证。",
  "Set up authentication": "设置身份验证",
  "Authenticate": "认证",
  "This plugin was force disabled.": "此插件已被强制禁用。",
  "Customization token budget exceeded. Large customizations are excluded from context.": "已超出自定义项 Token 预算上限。体积较大的自定义项已从上下文中排除。",
  "Rules and customization token budgets exceeded. Large rules are demoted to path pointers and large customizations are excluded from context.": "已超出规则与自定义项 Token 预算上限。体积较大的规则已降级为路径指针，体积较大的自定义项已从上下文中排除。",
  "Rules token budget exceeded. Large rules are demoted to path pointers.": "已超出规则 Token 预算上限。体积较大的规则已降级为路径指针。",
  "Telemetry is disabled in Settings": "设置中已禁用遥测诊断",
  "Enable telemetry in Settings before changing per-conversation telemetry.": "请先在“设置”中启用遥测诊断，然后再更改单会话遥测设置。",
  "Telemetry is off for all conversations.": "所有会话的遥测诊断均已关闭。",
  "Telemetry is off for this conversation.": "此会话的遥测诊断已关闭。",
  "Telemetry is turned off in settings": "设置中已关闭遥测诊断",
  "Turn off telemetry for this conversation": "关闭此会话的遥测诊断",
  "Turn on telemetry for this conversation": "开启此会话的遥测诊断",
  "You have a conversation in progress. Updating will interrupt it, and it will automatically resume once the update completes.": "您当前有 1 个正在进行的会话。更新将暂时中断该会话，并在更新完成后自动恢复。",
  "You have a conversation in progress. Updating will cancel it and you'll need to manually restart it.": "您当前有 1 个正在进行的会话。更新将取消该会话，更新后您需要手动重新开始。",
  "Updating will restart the server and apply the latest changes.": "更新将重启后台服务并应用最新更改。",
  "Failed to inspect license for this project": "检查此项目的许可证失败",
  "Your Antigravity use will be associated with provided project. Make sure you trust the project ID before proceeding. Account activity and data may be logged by your organization.": "您的 Antigravity 使用情况将与所提供的项目关联。继续操作前请确保您信任该项目 ID。您的账号活动与数据可能会被所在组织记录。",
  "Select billing model": "选择计费模式",
  "Billing model": "计费模式",
  "Draws from your organization's pooled Gemini Enterprise usage.": "使用您所在组织共享的 Gemini Enterprise 配额池。",
  "Pay as you go": "按量计费",
  "Pay only for the tokens you use, billed through Agent Platform (formerly Vertex AI).": "仅为您实际使用的 Token 付费，通过 Agent Platform（原 Vertex AI）计费。",
  "Back to licenses": "返回许可证列表",
  "Choose a license": "选择许可证",
  "Available licenses": "可用许可证",
  "Other License": "其他许可证",
  "Forward": "前进",
  "Open in external browser": "在外部浏览器中打开",
  "New Browser": "新建浏览器",
  "Open in Built-in Browser": "在内置浏览器中打开",
  "Embedded web preview": "内嵌网页预览",
  "Toggle file diff": "切换文件差异视图",
  "Archived Only": "仅已归档",
  "Visit": "访问",
  "Legal Help": "法律帮助",
  "to ask for content changes for legal reasons.": "以出于法律原因申请内容变更。",
  "This conversation is in a different workspace.": "此会话位于其他工作区中。",
  "This project is associated with a different workspace.": "此项目关联了其他工作区。",
  "Show less": "收起",
  "Customize sections": "自定义分组",
  "Sidecar feature is not available.": "Sidecar 辅助容器功能不可用。",
  "[/automation](slashCommand;automation) Guide me through creating an automated task": "[/automation](slashCommand;automation) 引导我创建一项自动化任务",
  "Hide Thumbnail Sidebar": "隐藏缩略图侧边栏",
  "Show Thumbnail Sidebar": "显示缩略图侧边栏",
  "Toggle Thumbnails": "切换缩略图",
  "Exit Fullscreen": "退出全屏",
  "Enter Fullscreen": "进入全屏",
  "Download PDF": "下载 PDF",
  "Disable Text Selection": "禁用文本选择",
  "Enable Text Selection": "启用文本选择",
  "Switch to Light Mode": "切换至浅色模式",
  "Switch to Dark Mode": "切换至深色模式",
  "Light Mode": "浅色模式",
  "Dark Mode": "深色模式",
  "Fit to Width": "适应页宽",
  "Fit to Page": "适应页面",
  "Fit Mode": "适应模式",
  "Text Selection": "文本选择",
  "More toolbar actions": "更多工具栏操作",
  "More": "更多",
  "Failed to toggle fullscreen mode": "切换全屏模式失败",
  "Initializing...": "正在初始化...",
  "Developer": "开发者",
  "Choose how technical the interface should be.": "选择界面的专业技术复杂度。",
  "Simplified": "精简模式",
  "The agent auto-executes commands matched by an allow list entry.": "智能体会自动执行与允许列表条目匹配的命令。",
  "The agent asks for permission before executing commands matched by a deny list entry.": "智能体在执行与拒绝列表条目匹配的命令前会请求许可。",
  "Give the agent awareness of lint errors created by its edits so it can fix them without explicit prompting.": "让智能体感知其编辑操作产生的代码检查（Lint）错误，以便无需显式提示即可自动修复。",
  "Allow sandboxed commands to make network requests.": "允许沙箱中的命令发起网络请求。",
  "Use the IDE's shell integration to detect and report terminal command execution. When disabled, the agent uses its own shell. Restart the application for this to take effect.": "使用 IDE 的 Shell 集成来检测并报告终端命令执行情况。禁用后，智能体将使用其自带的 Shell。重启应用后生效。",
  "Specifies the agent's behavior when asking for review on artifacts, which are documents it creates to enable a richer conversation experience.": "指定智能体在请求审查产物文档（用于提供更丰富对话体验的生成文档）时的行为方式。",
  "Let the agent access past conversations to inform its responses.": "允许智能体访问历史会话以辅助生成更准确的回复。",
  "Open files in the background if the agent creates or edits them": "当智能体创建或编辑文件时在后台自动打开这些文件",
  "Open the agent panel on window reload": "重新加载窗口时自动打开智能体面板",
  "Custom Context Menus": "自定义右键菜单",
  "Replace the default browser right-click menu with quick actions.": "使用快捷操作菜单替换默认的浏览器右键菜单。",
  "Configure the default width of markdown artifacts.": "配置 Markdown 产物文档的默认显示宽度。",
  "Fill": "铺满",
  "Show suggestions when typing in the editor": "在编辑器中输入代码时显示补全建议",
  "Predict the location of your next edit and navigate you there with a tab keypress.": "预测您下一次编辑的位置，按 Tab 键即可快速跳转至该处。",
  "Quickly add and update imports with a tab keypress.": "按 Tab 键快速添加并更新导入语句（Imports）。",
  "Set the speed of tab suggestions": "设置 Tab 补全建议的触发速度",
  "Slow": "慢速",
  "Highlight newly inserted text after accepting a Tab completion.": "接受 Tab 补全后高亮显示新插入的文本。",
  "Path to the Chrome/Chromium executable. Leave empty for auto-detection.": "Chrome/Chromium 可执行文件的路径。留空则自动探测。",
  "Absolute path to the Chrome/Chromium executable": "Chrome/Chromium 可执行文件的绝对路径",
  "Custom path for the browser user profile directory. Leave empty for default (~/.gemini/antigravity-browser-profile).": "浏览器用户配置目录的自定义路径。留空则使用默认值（~/.gemini/antigravity-browser-profile）。",
  "Browser CDP Port": "浏览器 CDP 端口",
  "Port number for Chrome DevTools Protocol remote debugging. Leave empty for default (9222).": "用于 Chrome DevTools Protocol 远程调试的端口号。留空则使用默认值（9222）。",
  "Show \"Edit\" and \"Chat\" buttons when selecting text in the editor.": "在编辑器中选择文本时显示“编辑”和“对话”按钮。",
  "Include default customizations, such as default skills.": "包含默认自定义项（例如内置默认技能）。",
  "Show a floating notification card when background conversations need your input. Answer questions, approve commands, and grant permissions without leaving your current conversation. Share feedback at go/inline-actions-feedback.": "当后台会话需要您的输入时显示浮动通知卡片。无需离开当前会话即可回答问题、批准命令并授予权限。",
  "Default Workspace VCS": "默认工作区版本控制系统 (VCS)",
  "VCS used when creating a new workspace, including workspaces generated based off your initial prompt.": "创建新工作区（包括根据您的初始提示词生成的工作区）时使用的版本控制系统。",
  "The breakdown below shows token usage from customizations like rules, skills, and MCP. If a budget is exceeded, large rules are demoted to path pointers and large customizations are excluded automatically.": "下方的明细展示了来自规则、技能及 MCP 等自定义扩展的 Token 占用情况。如果超出预算，大型规则将自动降级为路径指针，大型自定义扩展将被自动排除。",
  "Other Customizations": "其他自定义扩展",
  "tokens (": "个 Token (",
  "tokens)": "个 Token)",
  "When Turbo mode is on, the agent will automatically capture screenshots in the Browser without explicit user input. You can toggle this setting in Antigravity's settings.": "开启极速模式 (Turbo) 后，智能体将在浏览器中自动捕获截图而无需用户手动确认。您可以在 Antigravity 设置中切换此选项。",
  "Best of N settings have moved": "多候选对决设置已迁移",
  "Best of N settings have moved to the Advanced section of General settings.": "多候选对决 (Best-of-N) 设置已迁移至“通用”设置下的“高级”区域。",
  "Workspace settings have moved": "工作区设置已迁移",
  "Workspace settings have moved to the Advanced section of General settings.": "工作区设置已迁移至“通用”设置下的“高级”区域。",
  "Open Editor Settings": "打开编辑器设置",
  "To modify editor settings, open Settings within the editor window.": "如需修改编辑器设置，请在编辑器窗口中打开设置。",
  "Configure editor-specific behaviors and shortcuts.": "配置编辑器专属行为和快捷键。",
  "Notification Preferences": "通知偏好",
  "Manage your notification preferences.": "管理您的通知偏好。",
  "Enable Notifications": "启用通知",
  "Get More AI Credits": "获取更多 AI 点数",
  "See Activity": "查看活动",
  "Remote Control link": "远程控制链接",
  "Show Remote Control QR code": "显示远程控制二维码",
  "Open in Remote Control": "在远程控制中打开",
  "Continue your work from another device with Remote Control. Scan the QR code or open the link below.": "通过远程控制从其他设备继续您的工作。请扫描二维码或打开下方链接。",
  "Remote Control Issue": "远程控制问题",
  "Describe your Remote Control issue...": "请描述您遇到的远程控制问题...",
  "Remote Control isn't active on this instance. Enable it in": "当前实例尚未启用远程控制。请在",
  ", then reopen this dialog.": "中启用后重新打开此对话框。",
  "Manage your conversations from the companion website.": "从配套网页端管理您的会话。",
  "These settings can only be changed on the computer running the app, not from a remote session.": "这些设置仅可在运行应用的本地计算机上更改，无法在远程会话中修改。",
  "Enter device name...": "输入设备名称...",
  "A label for this computer when you connect from another device. Changing it reconnects.": "从其他设备连接时用于标识此计算机的名称。修改后将重新连接。",
  "QR code": "二维码",
  "Edit Custom Model": "编辑自定义模型",
  "Model Label": "模型标签",
  "My Custom Gemini Model": "我的自定义 Gemini 模型",
  "Model URL": "模型 URL",
  "Model URL info": "模型 URL 说明",
  "Model must be available on the Gemini API and use the gemini-api scheme.": "模型必须在 Gemini API 上可用，且使用 gemini-api 协议头。",
  "Max Tokens Until Compaction": "触发压缩前的最大 Token 数",
  "Max tokens until compaction info": "触发压缩前的最大 Token 数说明",
  "Save Configuration": "保存配置",
  "Select Theme": "选择主题",
  "Use theme to be imported with settings": "使用随设置导入的主题",
  "Toggle Between Light/Dark Themes": "切换浅色/深色主题",
  "One Light": "One Light 浅色",
  "Solarized Light": "Solarized Light 浅色",
  "Inherit Editor": "继承编辑器设置",
  "Select the workspace type that will be used for new conversations started with the New Workspace option.": "选择通过“新建工作区”选项发起新会话时默认使用的工作区类型。",
  "Change VCS in General settings, under Advanced": "可在“通用 -> 高级”设置中更改版本控制系统 (VCS)",
  "Connect to Remote Workspace": "连接到远程工作区",
  "Open SSH connection in setup window. When finished, you will be able to select the workspace in the sidebar.": "在设置窗口中打开 SSH 连接。完成后，您将可以在侧边栏中选择该工作区。",
  "Recent Remote Workspaces": "最近的远程工作区",
  "Open Setup Window": "打开设置窗口",
  "Search Recent Workspaces": "搜索最近的工作区",
  "Create project from scratch": "从头创建项目",
  "Set Project Name": "设置项目名称",
  "Select a folder to create a new project.": "选择一个文件夹以创建新项目。",
  "Select a folder.": "选择一个文件夹。",
  "Select a folder": "选择一个文件夹",
  "Instantly create a new project and folder to start building.": "即刻创建新项目和文件夹以开始构建。",
  "Instantly create a new project and folder to start building": "即刻创建新项目和文件夹以开始构建",
  "Create a new project using normal folders and/or citc workspaces.": "使用常规文件夹和/或 CitC 工作区创建新项目。",
  "Create a new project using normal folders and/or citc workspaces": "使用常规文件夹和/或 CitC 工作区创建新项目",
  "Work in a CitC workspace.": "在 CitC 工作区中工作。",
  "Work in a CitC workspace": "在 CitC 工作区中工作",
  "Work in a Cog workspace.": "在 Cog 工作区中工作。",
  "Work in a Cog workspace": "在 Cog 工作区中工作",
  "Work in an ABFS workspace.": "在 ABFS 工作区中工作。",
  "Work in an ABFS workspace": "在 ABFS 工作区中工作",
  "Concierge (Dev only)": "接待员（仅限开发者）",
  "Enter project name...": "输入项目名称...",
  "A project with this name already exists.": "已存在同名项目。",
  "Available workspaces": "可用工作区",
  "No workspaces found": "未找到工作区",
  "Unmount workspace": "卸载工作区",
  "Delete workspace": "删除工作区",
  "Open project settings": "打开项目设置",
  "No projects created": "尚未创建任何项目",
  "You don't have any projects created. Please create a project first.": "您尚未创建任何项目，请先创建一个项目。",
  "Create with Prompt": "使用提示词创建",
  "Settings Unavailable": "设置不可用",
  "Pages currently open in Antigravity's Browser instance are shown below.": "下方展示了当前在 Antigravity 浏览器实例中打开的页面。",
  "Open Browser Setup": "打开浏览器设置",
  "Browser Configuration Required": "需要配置浏览器",
  "The agent will wait for you to install the browser extension.": "智能体将等待您完成浏览器扩展程序的安装。",
  "Launching the browser...": "正在启动浏览器...",
  "Within each group, models share a weekly limit and a 5-hour limit. Quota is consumed proportionally to the cost of the tokens. Thus, limits will last longer with shorter tasks or using more cost-effective models. The 5-hour limit smooths out aggregate demand to fairly distribute global capacity across all users, while your weekly limit is tied directly to your individual tier.": "在每个分组中，各模型共享周限额与 5 小时限额。配额消耗与 Token 成本成正比。因此，执行较短任务或使用性价比更高的模型可延长限额的使用周期。5 小时限额用于平滑总体请求峰值，以在所有用户之间公平分配全球算力；而周限额则直接与您所属的订阅套餐等级挂钩。",
  "Weekly limit": "周限额",
  "5-hour limit": "5 小时限额",
  "5-Hour Limit": "5 小时限额",
  "Weekly Limit": "每周限额",
  "Resets in": "重置于",
  "Resets at": "重置于",
  "Quota limits": "配额上限",
  "A starter UI extension: a themed side panel with a backend API, saved notes, and a button that talks to the agent.": "入门级 UI 扩展模板：包含主题化侧边面板、后端 API、笔记保存功能以及可与智能体通信的按钮。",
  "Read, draft, and edit docs.": "读取、起草和编辑文档。",
  "Read, create, edit, and manage Google Docs. Use when the user shares a docs.google.com URL, asks to summarize or extract content from a doc, wants a doc drafted, edited, formatted, or commented on, wants tables, images, or smart chips inserted, wants markdown imported or synchronized with a doc, or wants a doc exported. Requires a known document ID — use the gdrive skill to search for or locate documents. Don't use for Google Sheets, Slides, or Drive file management.": "读取、创建、编辑和管理 Google 文档 (Google Docs)。当用户分享 docs.google.com 链接、要求总结或提取文档内容、起草/编辑/格式化/评论文档、插入表格/图片/智能芯片、导入或同步 Markdown，或导出文档时使用。需要已知的文档 ID——可使用 gdrive 技能搜索或定位文档。请勿用于 Google 表格、幻灯片或云端硬盘文件管理。",
  "Search, upload, download, and share files.": "搜索、上传、下载和分享文件。",
  "Browse, search, and manage Google Drive files and folders. Use when the user shares a drive.google.com URL, asks what is in a folder, wants a file found, downloaded, uploaded, updated in place, moved, copied, or renamed, wants a Google file exported to PDF, Markdown, or CSV, wants comments read or added, wants sharing and permissions checked or changed, or wants Drive activity watched. Don't use for editing the contents of a Doc, Sheet, or Slides deck.": "浏览、搜索和管理 Google 云端硬盘 (Google Drive) 文件与文件夹。当用户分享 drive.google.com 链接、询问文件夹内容、查找/下载/上传/原位更新/移动/复制/重命名文件、将 Google 文件导出为 PDF/Markdown/CSV、读取或添加评论、检查或更改共享权限，或监控云端硬盘活动时使用。请勿用于直接编辑文档、表格或幻灯片的正文内容。",
  "Open workspaces": "打开多个工作区",
  "Open workspace": "打开工作区",
  "Cannot open folder": "无法打开文件夹",
  "WSL setup failed": "WSL 环境配置失败",
  "Downloading the Antigravity binary…": "正在下载 Antigravity 服务端程序…",
  "Setting up…": "正在准备…",
  "Welcome to Antigravity": "欢迎使用 Antigravity",
  "Welcome to the new Antigravity!": "欢迎使用全新 Antigravity！",
  "Download the Antigravity IDE": "下载 Antigravity IDE",
  "Explore the new Antigravity": "开始探索全新 Antigravity",
  "Checking for Updates...": "正在检查更新...",
  "Downloading Update...": "正在下载更新...",
  "Fork": "创建分支",
  "File Path": "文件路径",
  "Relative Path": "相对路径",
  "Branch Name": "分支名称",
  "Commit Hash": "提交哈希",
  "Copy Relative Path": "复制相对路径",
  "Copy Markdown": "复制 Markdown",
  "Close Others": "关闭其他",
  "Close to the Right": "关闭右侧",
  "Close Saved": "关闭已保存",
  "Close All": "全部关闭",
  "Open in New Window": "在新窗口中打开",
  "Chief of Staff": "智能体总管 (Chief of Staff)",
  "Welcome to your Chief of Staff": "欢迎使用智能体总管",
  "Sent to Chief of Staff": "已发送至智能体总管",
  "Chief of Staff voice message failed": "智能体总管语音消息发送失败",
  "Chief of Staff voice mode is active": "智能体总管语音模式已开启",
  "Chief of Staff voice mode stopped": "智能体总管语音模式已停止",
  "A permanent Chief of Staff conversation in the sidebar that manages your other conversations: delegate tasks, check status, and read results from one place.": "侧边栏中的常驻总管对话，用于集中管理您的其他对话：在一处委派任务、检查状态并查看结果。",
  "Adds an Autonomous Mode switch to the modes dropdown below the input box. Turns sent with it on run non-interactively: the agent does not ask questions or request new permissions.": "在输入框下方的模式下拉菜单中添加“自主模式”开关。开启后发送的轮次将以非交互方式运行：智能体不会提问或请求新权限。",
  "In autonomous mode, the agent works with autonomy-enhancing features and does not ask questions or request new permissions. To turn it off, open the modes dropdown in the toolbar below the input box and switch off \"Autonomous mode\".": "在自主模式下，智能体使用增强自主特性工作，不会提问或请求新权限。若要关闭，请打开输入框下方工具栏中的模式下拉菜单并关闭“自主模式”。",
  "Let the agent use browser tools to open URLs, read web pages, and interact with browser content. This gives the agent access to important (and often critical) knowledge and methods of validation, but any browser integration does increase exposure to external malicious parties for security exploits.": "允许智能体使用浏览器工具打开网址、读取网页并与浏览器内容交互。这使智能体能够获取重要（且往往是关键的）知识和验证手段，但任何浏览器集成都会增加遭受外部恶意攻击的安全风险。",
  "Continue \"Explain and Fix\" actions in the current conversation instead of starting a new one.": "在当前对话中继续执行“解释并修复”操作，而不是发起新对话。",
  "Disabled. Open the plugin page to finish setup.": "已禁用。请打开插件页面完成设置。",
  "Add automation": "添加自动化任务",
  "Edit automation title": "编辑自动化任务标题",
  "Failed to create automation.": "创建自动化任务失败。",
  "Back to Automations": "返回自动化任务列表",
  "Cron expression e.g. 0 */6 * * *": "Cron 表达式，例如 0 */6 * * *",
  "Prompt to run when triggered...": "触发时运行的提示词...",
  "(Optional) Tell us more or type your reason...": "（可选）详细说明或输入您的原因...",
  "(Optional) Tell us more...": "（可选）请提供更多详情...",
  "(empty)": "（空）",
  "Other (write your answer)": "其他（请填写您的回答）",
  "About embedding": "关于内嵌预览",
  "Embedding Limitations": "内嵌预览限制",
  "Opens in the in-app preview pane. Some sites don't support iframe embedding and may not load.": "在应用内预览窗格中打开。部分网站不支持 iframe 内嵌，可能无法加载。",
  "Open in preview": "在预览中打开",
  "Open Full View": "打开完整视图",
  "Open folder": "打开文件夹",
  "Open Antigravity IDE": "打开 Antigravity IDE",
  "Open the page in system browser": "在系统浏览器中打开页面",
  "Clear search (Esc)": "清除搜索 (Esc)",
  "Close (Esc)": "关闭 (Esc)",
  "Close tab": "关闭标签页",
  "Close other tabs": "关闭其他标签页",
  "Close tabs to the right": "关闭右侧标签页",
  "New Tab": "新建标签页",
  "Side-by-Side": "并排视图",
  "Side-by-side layout": "并排布局",
  "Stacked": "堆叠视图",
  "Stacked layout": "堆叠布局",
  "Double-click to reset panel sizes": "双击重置面板大小",
  "Drag to resize the gutter; double-click to fit it automatically": "拖动以调整分栏宽度；双击自动适应",
  "Click to view or edit comment": "点击查看或编辑评论",
  "View or edit comment": "查看或编辑评论",
  "Copy description": "复制说明",
  "Copy email address": "复制邮箱地址",
  "Copy schema JSON": "复制 Schema JSON",
  "Copy section content": "复制章节内容",
  "Copy thinking": "复制思考过程",
  "Customize Sections": "自定义分区",
  "Custom View": "自定义视图",
  "Debug view layout": "调试视图布局",
  "Dismiss service announcement": "关闭服务公告",
  "File path breadcrumbs": "文件路径面包屑导航",
  "Filter repositories...": "筛选仓库...",
  "Fit the whole trajectory": "缩放适应完整轨迹",
  "Global Permission Settings": "全局权限设置",
  "Host Environment": "宿主环境",
  "Operating System": "操作系统",
  "Invalid Media": "无效的媒体文件",
  "Media actions": "媒体操作",
  "Modified": "已修改",
  "Renamed": "已重命名",
  "Queued messages": "排队中的消息",
  "Queue Wait": "排队等待耗时",
  "Recent files": "最近的文件",
  "Reset zoom (0)": "重置缩放 (0)",
  "Zoom in": "放大",
  "Zoom in (+)": "放大 (+)",
  "Zoom out": "缩小",
  "Zoom out (-)": "缩小 (-)",
  "Review pending conversations": "审查待处理的对话",
  "Scroll position": "滚动位置",
  "Search steps...": "搜索步骤...",
  "Search flags": "搜索功能标记",
  "Select or enter a workspace URI": "选择或输入工作区 URI",
  "Sidecar error": "Sidecar 扩展错误",
  "This sidecar failed to start.": "此 Sidecar 扩展启动失败。",
  "Signed-in accounts": "已登录的账户",
  "Accounts": "账户",
  "Start Snapshot": "开始快照",
  "End Snapshot": "结束快照",
  "Starting": "正在启动",
  "Started": "已启动",
  "Step": "步骤",
  "Steps": "步骤",
  "Step Details": "步骤详情",
  "Step Preview": "步骤预览",
  "Step Timing": "步骤耗时",
  "System Instruction": "系统指令",
  "Termination": "终止",
  "This tool output was truncated (cut off) because it exceeded the single-step limits. Details are visible in the Inspector.": "由于超出单步大小限制，此工具输出已被截断。可在检查器 (Inspector) 中查看详情。",
  "Tip": "提示",
  "Timeline": "时间线",
  "Trajectory Metadata": "轨迹元数据",
  "Generator Metadata": "生成器元数据",
  "True changes vs the parent workspace": "相对于父工作区的实际变更",
  "Type absolute path or navigate folders...": "输入绝对路径或浏览文件夹...",
  "Type to search file contents": "输入以搜索文件内容",
  "Updater": "更新程序",
  "Updates to your sidebar": "侧边栏更新提示",
  "Sidebar Updates": "侧边栏更新",
  "Uptime": "运行时间",
  "Usage": "用量",
  "User Type": "用户类型",
  "User Data": "用户数据",
  "Workspace folder suggestions": "工作区文件夹建议",
  "Workspace mismatch actions": "工作区不匹配操作",
  "Workspace URI Switcher": "工作区 URI 切换器",
  "Workspace URI to switch to": "要切换到的工作区 URI",
  "A chunk is a section of the page. Long pages are chunked so that only the sections that are relevant to your query are read.": "片段 (Chunk) 是页面的一个分段。长页面会被切分为多个片段，以便仅读取与您的查询相关的部分。",
  "Active Context Start": "活动上下文起点",
  "Active Tasks & Conversations:": "活动任务与对话：",
  "All Workspaces": "所有工作区",
  "An error was thrown.": "抛出了错误。",
  "Approve?": "是否批准？",
  "Arguments Schema": "参数结构 (Schema)",
  "Artifact image": "产物图片",
  "Asked": "已提问",
  "Asking": "正在提问",
  "Attach the trajectory ID to the feedback form": "将轨迹 ID 附加到反馈表单",
  "Attaching logs requires an email address": "附加日志需要提供邮箱地址",
  "Authenticated as": "已认证为",
  "Authorization Required": "需要授权",
  "Auxiliary Pane": "辅助窗格",
  "Background Task": "后台任务",
  "Confirm Selection": "确认选择",
  "Connect your account to browse": "连接您的账户以进行浏览",
  "Creating...": "正在创建...",
  "Customization": "自定义项",
  "Customizations & Skills": "自定义与技能",
  "Debug Bundle": "调试包",
  "Debug bundle uploaded!": "调试包已上传！",
  "Upload Debug Bundle": "上传调试包",
  "Did restarting the desktop app help?": "重启桌面应用是否解决了问题？",
  "Empty log": "日志为空",
  "Empty section": "分区为空",
  "Environment Status": "环境状态",
  "Error occurred during import.": "导入过程中发生错误。",
  "Excluded & Hidden Step": "已排除且隐藏的步骤",
  "Excluded Step": "已排除的步骤",
  "Hidden Active Step": "隐藏的活动步骤",
  "Failed to download Firebase skill.": "下载 Firebase 技能失败。",
  "Failed to fetch diffs": "获取差异对比 (Diff) 失败",
  "Failed to load shared conversation": "加载分享的对话失败",
  "Failed to load some diffs": "加载部分差异对比失败",
  "Failed to parse settings. Fix and restart.": "解析设置失败。请修复后重启。",
  "Failed to unarchive project: project management feature not available": "取消归档项目失败：项目管理功能不可用",
  "Fetched network request for page.": "已获取页面的网络请求。",
  "Fetched network requests for page.": "已获取页面的多个网络请求。",
  "File Tree Component is not loaded.": "文件树组件未加载。",
  "First Token": "首字耗时 (First Token)",
  "Go to global settings": "前往全局设置",
  "Go to Next Invocation": "前往下一次调用",
  "Having trouble? Let us know": "遇到问题？请告诉我们",
  "Importing shared conversation...": "正在导入分享的对话...",
  "Inline PDF preview is not available in this environment.": "当前环境不支持内联 PDF 预览。",
  "Inspector": "检查器 (Inspector)",
  "Instances": "实例",
  "Loading instances...": "正在加载实例...",
  "Loading licenses...": "正在加载许可证...",
  "Multi-select": "多选",
  "Name workspace...": "命名工作区...",
  "Needs re-auth": "需要重新授权",
  "Not available": "不可用",
  "Now": "现在",
  "Paste key": "粘贴密钥",
  "Preview is not available for this file type.": "此文件类型不支持预览。",
  "Preview unavailable due to a notebook parsing error.": "由于笔记本解析错误，预览不可用。",
  "Pricing is based on public API pricing": "价格基于公开 API 定价计算",
  "Project Required": "需要指定项目",
  "License Required": "需要许可证",
  "Select License": "选择许可证",
  "Prompt and tools metadata for this invocation has been cleared to save space. Full details are only preserved for the latest invocation.": "为节省空间，本次调用的提示词和工具元数据已被清理。完整详情仅保留在最新一次调用中。",
  "Reload this window.": "重新加载此窗口。",
  "Resources": "资源",
  "Response": "响应",
  "Run command step not found": "未找到运行命令步骤",
  "Select a step in the timeline to inspect": "在时间线中选择一个步骤进行检查",
  "Sender Agent": "发送方智能体",
  "Sent!": "已发送！",
  "Services this plugin connects to on your behalf. Credentials stay on this machine and are only sent to the domains listed.": "此插件代表您连接的服务。凭据保存在本机，且仅发送至列出的域名。",
  "Setup script failed.": "安装脚本执行失败。",
  "Setup script ran successfully.": "安装脚本执行成功。",
  "Submit & Reroll": "提交并重新生成",
  "Suggested plugin:": "推荐插件：",
  "This client was started with no custom flags.": "此客户端启动时未附带任何自定义标记。",
  "This may take a few minutes": "这可能需要几分钟时间",
  "This step is not associated with an invocation.": "此步骤未关联任何模型调用。",
  "This step is visible in the standard conversation view, but was excluded from the messages sent to the model.": "此步骤在标准对话视图中可见，但已从发送给模型的消息中排除。",
  "This step was excluded from the messages sent to the model and is hidden in the conversation view.": "此步骤已从发送给模型的消息中排除，且在对话视图中隐藏。",
  "This step was sent to the model, but it is hidden in the standard conversation view.": "此步骤已发送给模型，但在标准对话视图中隐藏。",
  "Time spent by the language model generating and streaming the tool call.": "语言模型生成并流式输出工具调用所花费的时间。",
  "Time spent deciding a checkpoint was needed and generating the context summary.": "决定需要创建检查点并生成上下文摘要所花费的时间。",
  "Time spent generating the initial user intent summary for this conversation.": "为此对话生成初始用户意图摘要所花费的时间。",
  "Time spent waiting in queue for previous tools to complete or move to background before execution began.": "在开始执行前，排队等待前序工具完成或转入后台所花费的时间。",
  "Time waiting before the first token was received.": "收到第一个令牌 (Token) 之前的等待时间。",
  "Tool Call ID:": "工具调用 ID：",
  "Tool Call Ready": "工具调用就绪",
  "Tool Defs": "工具定义",
  "Trigger": "触发器",
  "Trigger Type": "触发类型",
  "Triggered": "已触发",
  "UI view does not exist.": "UI 视图不存在。",
  "Unable to resolve PDF source URL": "无法解析 PDF 源网址",
  "Unable to resolve audio source URL": "无法解析音频源网址",
  "Unknown Notebook": "未知笔记本",
  "Unused": "未使用",
  "Unused Capacity": "未使用容量",
  "View archived in the sidebar": "在侧边栏中查看已归档项",
  "View could not be opened": "无法打开视图",
  "Worked for": "已工作",
  "button in the status bar to report any issues.": "状态栏中的按钮以报告任何问题。",
  "cumulative total for the conversation up to this point": "截至目前该对话的累计总量",
  "directly in the side pane.": "直接在侧边窗格中。",
  "feedback guide": "反馈指南",
  "learn more": "了解更多",
  "lint error": "代码检查 (Lint) 错误",
  "managed by your organization": "由您的组织管理",
  "official documentation": "官方文档",
  "plugins available.": "个可用插件。",
  "text resources": "文本资源",
  "to exit": "以退出",
  "via email.": "通过电子邮件。",
  "with this name already exists.": "使用此名称的项已存在。",
  "[Dev] GCP Project ID": "[开发] GCP 项目 ID",
  "ABFS branch name": "ABFS 分支名称",
  "ABFS mount directory": "ABFS 挂载目录",
  "ABFS Workspace (Alpha)": "ABFS 工作区 (Alpha)",
  "ABFS workspace name": "ABFS 工作区名称",
  "Delete ABFS Workspace": "删除 ABFS 工作区",
  "Address CLs needing attention": "处理需要关注的 CL",
  "After": "之后",
  "Before": "之前",
  "Agents": "智能体",
  "Approval": "审批",
  "Backoff": "退避重试",
  "Binary": "二进制程序",
  "Block": "拦截",
  "Branch / Ref": "分支 / 引用 (Ref)",
  "By phase": "按阶段",
  "By kind": "按类别",
  "Cascade Config": "级联配置",
  "Choose between the Default and Project 4K experience.": "在默认体验和 Project 4K 体验之间选择。",
  "Choose the experience that fits how you work.": "选择最适合您工作方式的体验。",
  "CitC Clone": "CitC 克隆",
  "CitC Workspace": "CitC 工作区",
  "Citc workspace name": "CitC 工作区名称",
  "Click to go there, drag to select a range, drag an edge to resize": "点击跳转，拖动选择范围，拖动边缘调整大小",
  "Cog Workspace": "Cog 工作区",
  "Context Menus": "上下文菜单",
  "Conversation 1": "对话 1",
  "Conversation 2": "对话 2",
  "Conversation 3": "对话 3",
  "Core AI Systems is hiring!": "核心 AI 系统团队正在招聘！",
  "Couldn't load Google Drive link title": "无法加载 Google 云端硬盘链接标题",
  "Create a Jetski debug bundle (host config + logs + summaries + in-browser agent state) and share it with the Jetski team for debugging.": "创建调试包（包含宿主配置、日志、摘要和浏览器内智能体状态）并分享给团队进行调试。",
  "Creating Chat Bot": "正在创建聊天机器人",
  "Installing Chat Bot": "正在安装聊天机器人",
  "Creating Cloud Project": "正在创建云项目",
  "Creating Sidecar": "正在创建 Sidecar 扩展",
  "Custom flag to turn on": "要开启的自定义标记",
  "Default Cog Branch / Ref": "默认 Cog 分支 / 引用",
  "Default Cog Repository": "默认 Cog 仓库",
  "Determines the markup language of the output.": "指定输出内容的标记语言。",
  "Dev mode: Localhost server automatically detected": "开发模式：已自动检测到本地服务器",
  "drawing line preview": "绘制线条预览",
  "drawing rectangle preview": "绘制矩形预览",
  "e.g. \"My Custom Gemini Model\"": "例如：“我的自定义 Gemini 模型”",
  "Enter a URL (e.g. http://localhost:8080)": "输入网址（例如 http://localhost:8080）",
  "Enter workspace name (e.g., my-cog-feature)": "输入工作区名称（例如 my-cog-feature）",
  "Enter workspace name (e.g., my-feature)": "输入工作区名称（例如 my-feature）",
  "Enterprise": "企业版",
  "Europe": "欧洲",
  "United States": "美国",
  "Extension": "扩展",
  "External": "外部用户",
  "First": "首个",
  "Last": "末个",
  "GCP Project ID for enterprise features.": "用于企业功能的 GCP 项目 ID。",
  "Gemini Enterprise": "Gemini 企业版",
  "Git-on-Borg repository used when creating a new Cog workspace from your initial prompt (e.g., chromium/src or android/platform/superproject).": "根据初始提示词创建新 Cog 工作区时使用的 Git-on-Borg 仓库（例如 chromium/src）。",
  "Give each Best of N fork a full clone of your workspace, including its local commit history. Choosing a winner then gives your workspace that fork's state, so the commits it made are kept. Forks take longer to create than the default CitC clone. See go/jetski-best-of-n.": "为每个 Best of N 分支提供工作区的完整克隆（包含本地提交历史）。选择优胜分支后，您的工作区将切换为该分支状态并保留其提交。",
  "GoB Repository": "GoB 仓库",
  "Google (internal)": "Google（内部）",
  "Google3 Configuration": "Google3 配置",
  "Google3 projects are deprecated. Learn more": "Google3 项目已弃用。了解更多",
  "Google3 projects are deprecated": "Google3 项目已弃用",
  "How long a quiet interval must be before it collapses": "静默间隔折叠前的最短持续时间",
  "IDE (editor)": "IDE（编辑器）",
  "Invocation": "调用",
  "Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to Infinity, the macro expander will try to fully expand as in LaTeX.": "将宏展开次数限制为指定数量，以防止无限宏循环。若设为 Infinity，宏展开器将尝试像在 LaTeX 中一样完全展开。",
  "Links": "链接",
  "Managed by Enterprise Gateway": "由企业网关管理",
  "Next toast": "下一条提示",
  "No branches": "无分支",
  "No links": "无链接",
  "No model specified for Battle Mode, falling back to use current selected model": "对战模式未指定模型，已回退使用当前所选模型",
  "One lane per kind of step, or one per step type": "每种步骤类别一行，或每种步骤类型一行",
  "Open in Cider": "在 Cider 中打开",
  "Optional branch or ref used when creating a new Cog workspace (defaults to main if unset).": "创建新 Cog 工作区时使用的可选分支或引用（未设置时默认为 main）。",
  "Outer App Version | Inner App Version": "外层应用版本 | 内层应用版本",
  "Pin a contrib experiment variant (force_contrib_variant). Requires Core Direct.": "固定实验变体 (force_contrib_variant)。需要启用 Core Direct。",
  "Readme": "自述文件 (Readme)",
  "Regroup Google3 Chats": "重新分组 Google3 对话",
  "Render display math flush left.": "将公式块左对齐渲染。",
  "Render display math in leqno style (left-justified tags).": "以 leqno 样式（左对齐标签）渲染公式块。",
  "Run JS": "运行 JS",
  "Sample GDoc": "示例 Google 文档",
  "Search GoB repositories...": "搜索 GoB 仓库...",
  "Sets the `workspaceUri` URL parameter and reloads, repointing the active workspace. Pick a folder from an existing project or enter a custom URI (e.g. file:///google/src/cloud/<user>/<client>/google3).": "设置 `workspaceUri` 参数并重新加载以切换活动工作区。可从现有项目中选择文件夹或输入自定义 URI。",
  "Simulate a different user cohort (Google, External, Enterprise).": "模拟不同的用户群体（Google、外部用户、企业版）。",
  "Simulate running as a different binary (Hub or the IDE/editor).": "模拟以不同的二进制程序运行（Hub 或 IDE/编辑器）。",
  "Simulate running on a different OS.": "模拟在不同的操作系统上运行。",
  "Slightly modify your UI to ensure more consistent demos. This is only recommended for demo purposes. In most cases, you can run \"Antigravity: Start Demo Mode\" and \"Antigravity: Stop Demo Mode\" to control this switch and update your ~/.gemini/antigravity data directory.": "微调界面以确保演示效果更加一致。仅建议在演示时使用。大多数情况下，您可以运行“Antigravity: Start Demo Mode”和“Antigravity: Stop Demo Mode”来控制此开关。",
  "Standalone": "独立模式",
  "Steps and containers shorter than this fade back": "耗时短于此阈值的步骤和容器将淡化显示",
  "Sync JJ Worktrees to Head": "将 JJ 工作树同步到 Head",
  "Sync newly created JJ worktrees to head when starting a conversation.": "开始对话时将新创建的 JJ 工作树同步到最新提交 (Head)。",
  "The debug view loads the trajectory in pages. Click the marker at either end of the overview, or keep panning past that end, to load more.": "调试视图分页加载运行轨迹。点击概览两端的标记，或继续向两端拖动以加载更多。",
  "This sidecar runs from a path that is not officially supported. Make sure your code is in a trusted location in google3.": "此 Sidecar 扩展运行在非官方支持的路径下。请确保代码位于受信任的位置。",
  "Turn on a flag you don't have": "开启尚未拥有的功能标记",
  "Turn on strict / LaTeX faithfulness mode, which throws an error if the input uses features that are not supported by LaTeX.": "开启严格 / LaTeX 保真模式，若输入使用了 LaTeX 不支持的特性则抛出错误。",
  "Typing your corp password here may trigger a Password Alert reset.": "在此处输入您的企业密码可能会触发密码警报重置。",
  "Variant Name": "变体名称",
  "Welcome to Cider with Jetski": "欢迎使用集成 Jetski 的 Cider",
  "What the step bars are coloured by": "步骤条的着色依据",
  "When enabled, the values below replace the auto-detected OS, host, binary, and user type used for feature gating.": "启用后，下方的值将替换用于功能门控的自动检测操作系统、宿主、二进制程序和用户类型。",
  "Run until the specified goal is completely finished.": "持续运行，直到指定目标完全完成。",
  "Run an instruction on a recurring schedule or as a one-time timer.": "按周期计划或一次性计时器运行指令。",
  "Invoke a browser agent for web tasks.": "调用浏览器智能体执行网页任务。",
  "Interview me to align on a plan.": "通过提问访谈我，以便对齐计划。",
  "Invoke a team of agents to autonomously tackle large projects.": "调用智能体团队，自主处理大型项目。",
  "Reflect on recent successes or corrections to capture reusable skills or rules.": "反思近期成功经验或修正内容，提炼可复用的技能或规则。",
  "Invoke the Boost multi-agent orchestrator for complex tasks.": "调用 Boost 多智能体编排器处理复杂任务。",
  "Permissive": "宽松",
  "Full Auto": "全自动",
  "Full Machine": "整机权限",
  "Learn more about Full Machine": "了解更多关于整机权限",
  "Auto Accept": "自动接受",
  "Never Create": "从不创建",
  "Inherits from global settings.": "继承全局设置。",
  "Local permissions have higher priority.": "本地权限优先级更高。",
  "Ask anything": "输入任何问题",
  "Send": "发送",
  "Thinking...": "思考中...",
  "New chat": "新建对话",
  "Clear conversation": "清空对话",
  "Delete conversation": "删除对话",
  "Rename conversation": "重命名对话",
  "Export conversation": "导出对话",
  "Share conversation": "分享对话",
  "Paused": "已暂停",
  "Cancelled": "已取消",
  "Queued": "队列中",
  "Tools": "工具",
  "Upload": "上传",
  "Import": "导入",
  "Auto": "自动",
  "Account Settings": "账户设置",
  "Profile": "个人资料",
  "Grant": "授权",
  "Execute": "执行",
  "Add Project": "添加项目",
  "Remove Project": "移除项目",
  "Repository": "仓库",
  "Connecting...": "连接中...",
  "Reconnecting...": "重新连接中...",
  "Less": "收起",
  "Yes": "是",
  "No": "否",
  "OK": "确定",
  "Ok": "确定",
  "Update": "更新",
  "Duplicate": "复制",
  "Connected Tools": "已连接的工具",
  "Available Tools": "可用工具",
  "Open Browser": "打开浏览器",
  "Close Browser": "关闭浏览器",
  "Navigate": "导航",
  "Run Command": "运行命令",
  "Command": "命令",
  "New File": "新建文件",
  "New Folder": "新建文件夹",
  "Delete File": "删除文件",
  "Rename File": "重命名文件",
  "An error occurred": "发生了错误",
  "Please try again": "请重试",
  "Network error": "网络错误",
  "Connection lost": "连接丢失",
  "Session expired": "会话已过期",
  "Are you sure?": "确定吗？",
  "Confirm deletion": "确认删除",
  "Confirm action": "确认操作",
  "Search...": "搜索...",
  "No conversations": "暂无对话",
  "No projects": "暂无项目",
  "Link copied": "链接已复制",
  "Permission required": "需要权限",
  "Permission denied": "权限被拒绝",
  "Access denied": "访问被拒绝",
  "No workspace selected": "未选择工作区",
  "Active workspace": "活动工作区",
  "You can upgrade to a Google AI Ultra plan to receive the highest rate limits.": "您可以升级到 Google AI Ultra 套餐，以获得最高速率限制。",
  "Credentials": "凭据",
  "General Preferences": "常规偏好",
  "Configure global allowed and denied resource permissions. Learn more.": "配置全局允许和拒绝的资源权限。了解更多。",
  "Project-Specific Settings": "项目专属设置",
  "Modify scoped permissions, folders, and agent settings like Sandbox and Terminal Command Execution.": "修改作用域权限、文件夹，以及沙盒和终端命令执行等智能体设置。",
  "Go To Projects": "前往项目",
  "Resource Permissions": "资源权限",
  "Allowed Resources": "允许的资源",
  "Denied Resources": "拒绝的资源",
  "Configure AI models and view your quota.": "配置 AI 模型并查看额度。",
  "View your available model quota and AI credits. Model quota refreshes periodically based on": "查看您的可用模型额度和 AI 点数。模型额度会根据规则定期刷新",
  "Available AI Credits": "可用 AI 点数",
  "Activity": "活动",
  "Quota": "额度",
  "Credits": "点数",
  "Configure default behaviors, skills, and MCP servers. Learn more.": "配置默认行为、技能和 MCP 服务器。了解更多。",
  "The breakdown below shows token usage from customizations like skills, rules, and MCP.": "下方明细显示了技能、规则和 MCP 等自定义内容的令牌使用情况。",
  "If the budget is exceeded, large customizations will be truncated automatically.": "如果超出预算，较大的自定义内容将被自动截断。",
  "You currently don't have any MCP Servers installed. Add an MCP server above": "您当前尚未安装任何 MCP 服务器。请在上方添加 MCP 服务器。",
  "Plugin": "插件",
  "User": "用户",
  "Show 1 breakdown": "显示 1 项明细",
  "Customization budget": "自定义预算",
  "Configure how Antigravity looks and feels.": "配置 Antigravity 的外观和使用体验。",
  "Configure browser settings and defaults.": "配置浏览器设置和默认项。",
  "Configure app behavior and preferences.": "配置应用行为和偏好。",
  "Open DevTools": "打开开发者工具",
  "Developer Tools": "开发者工具",
  "Privacy": "隐私",
  "Data Collection": "数据收集",
  "Restart": "重启",
  "Restart App": "重启应用",
  "Manage project folders and settings.": "管理项目文件夹和设置。",
  "Open Project": "打开项目",
  "Recent Projects": "最近项目",
  "Scheduled tasks": "定时任务",
  "Create Scheduled Task": "创建定时任务",
  "Empty": "空",
  "On": "开",
  "Off": "关",
  "Type": "类型",
  "Source": "来源",
  "Uninstall": "卸载",
  "Log out": "退出登录",
  "Log Out": "退出登录",
  "Cloud": "云端",
  "Sandbox": "沙盒",
  "Terminal Command Execution": "终端命令执行",
  "Configures how the agent tries to access files outside the working folders.": "配置智能体尝试访问工作文件夹外的文件时的策略。",
  "Unrestricted": "无限制",
  "Accepted": "已接受",
  "Add all": "全部添加",
  "Again": "再次",
  "Ask anything, @ to mention": "输入任何问题，@ 提及",
  "Authenticating": "正在认证",
  "Back to reference": "返回引用",
  "Back to Scheduled Tasks": "返回定时任务",
  "Busy": "忙碌",
  "Captured DOM tree for": "已捕获 DOM 树：",
  "Clicked": "已点击",
  "Clicking": "正在点击",
  "Close Folder": "关闭文件夹",
  "Close Workspace": "关闭工作区",
  "Command Center": "命令中心",
  "Commands": "命令",
  "Complete": "完成",
  "Completed.": "已完成。",
  "Configuration saved successfully!": "配置已成功保存！",
  "Configure agent hooks": "配置智能体钩子",
  "Convert": "转换",
  "Convert to Google Doc": "转换为 Google 文档",
  "Copy Config Path": "复制配置路径",
  "Copy prompt": "复制提示词",
  "Copy sign-in link": "复制登录链接",
  "Copy Workspace Name": "复制工作区名称",
  "Create a Project": "创建项目",
  "Create a new project. You can add folders to it now or later.": "创建新项目。您可以现在或稍后添加文件夹。",
  "Create Documents": "创建文档",
  "Create project with existing folder(s).": "使用现有文件夹创建项目。",
  "Created At": "创建时间",
  "Creating a Project": "正在创建项目",
  "Creating workspace…": "正在创建工作区…",
  "Current": "当前",
  "Default Branch": "默认分支",
  "Delete Data Directory": "删除数据目录",
  "Deleted": "已删除",
  "Deleting...": "正在删除...",
  "Describe the feature you would like to see...": "请描述您希望看到的功能...",
  "Describe your auth or billing issue...": "请描述您的认证或账单问题...",
  "Details:": "详情：",
  "Directory Viewer": "目录查看器",
  "Disable Task": "禁用任务",
  "Disabled in strict mode": "严格模式下已禁用",
  "Dismiss suggested actions": "关闭建议操作",
  "Done.": "完成。",
  "Download Agent State Debug Diagnostics": "下载智能体状态调试诊断",
  "Drop to add to Agent": "拖放以添加到智能体",
  "Edit project name": "编辑项目名称",
  "Editor": "编辑器",
  "Eject": "弹出",
  "Enable Task": "启用任务",
  "Encountered an error while sending a message.": "发送消息时遇到错误。",
  "Enter a prompt for the agent": "输入给智能体的提示词",
  "Enter directory path...": "输入目录路径...",
  "Enter Google Cloud Project Details": "输入 Google Cloud 项目详情",
  "Enter task name": "输入任务名称",
  "Enter your feedback here...": "在此输入您的反馈...",
  "Environment Selection": "环境选择",
  "Error fetching artifact": "获取产物时出错",
  "Errors": "错误",
  "Events": "事件",
  "Expired": "已过期",
  "Expired or Invalid": "已过期或无效",
  "Explain and Fix": "解释并修复",
  "Export Artifact": "导出产物",
  "Failed target:": "失败目标：",
  "Files to edit:": "要编辑的文件：",
  "First page": "第一页",
  "Global Artifact": "全局产物",
  "Global Artifact Viewer": "全局产物查看器",
  "Hidden": "隐藏",
  "Installing...": "正在安装...",
  "Invalid": "无效",
  "Just a moment": "请稍候",
  "Launch": "启动",
  "Loading conversation...": "正在加载对话...",
  "Loading recommendations...": "正在加载推荐...",
  "Loading skills…": "正在加载技能…",
  "Login": "登录",
  "Manage Google Drive access permissions.": "管理 Google Drive 访问权限。",
  "Match case (Aa)": "区分大小写 (Aa)",
  "Match whole word (ab)": "全字匹配 (ab)",
  "Maximum Active Workspaces": "最大活动工作区数",
  "Maximum Clones Per Workspace": "每个工作区的最大克隆数",
  "Merge Strategy:": "合并策略：",
  "Metadata": "元数据",
  "Metadata:": "元数据：",
  "Missing Folder": "缺少文件夹",
  "Missing Folders": "缺少文件夹",
  "Model quota exhausted": "模型额度已耗尽",
  "Multi-conversation view is not available": "多对话视图不可用",
  "New standalone conversation, outside of projects.": "新建项目外的独立对话。",
  "Next match (Enter)": "下一个匹配项（Enter）",
  "Next page": "下一页",
  "No artifacts generated.": "未生成产物。",
  "No conversation found": "未找到对话",
  "No conversations match the selected filters": "没有对话匹配所选筛选条件",
  "No conversations matching your search": "没有对话匹配您的搜索",
  "No customizations found for this workspace.": "此工作区没有自定义项。",
  "No description": "无描述",
  "No documents added yet.": "尚未添加文档。",
  "No events recorded.": "没有记录事件。",
  "No file changes.": "没有文件更改。",
  "No items found": "未找到项目",
  "No log outputs for this task": "此任务没有日志输出",
  "No MCP servers found for \"": "未找到 MCP 服务器 \"",
  "No message prompts available": "没有可用的消息提示词",
  "No more recommendations available.": "没有更多推荐。",
  "No permissions configured.": "未配置权限。",
  "No projects found": "未找到项目",
  "No scheduled tasks matching your search": "没有定时任务匹配您的搜索",
  "No workspaces yet": "暂无工作区",
  "None selected": "未选择",
  "Not eligible for autorun": "不符合自动运行条件",
  "Not now": "暂不",
  "Notifications are disabled in remote control mode.": "远程控制模式下通知已禁用。",
  "Open critique": "打开评论",
  "Open Editor": "打开编辑器",
  "Open in Editor": "在编辑器中打开",
  "Open Trajectory Dashboard": "打开轨迹仪表盘",
  "Or visit": "或访问",
  "Other Misc Permissions": "其他杂项权限",
  "Overwrite": "覆盖",
  "Password is required.": "密码为必填项。",
  "Pause": "暂停",
  "Permanently delete this project and all of its conversations.": "永久删除此项目及其所有对话。",
  "Permissions for specific Google Drive documents.": "特定 Google Drive 文档的权限。",
  "Previous match (Shift+Enter)": "上一个匹配项（Shift+Enter）",
  "Previous page": "上一页",
  "Previous Workspaces": "以前的工作区",
  "Proceed Anyways": "仍然继续",
  "Proceed with implementation plan": "按实施计划继续",
  "Project Detected": "检测到项目",
  "Projects serve as your workspace where your agents work. Each project has its own file scope and permissions.": "项目是智能体工作的工作区。每个项目都有自己的文件范围和权限。",
  "Quota Available": "可用额度",
  "Randomly select one of the responses as the winner.": "随机选择一个响应作为获胜者。",
  "Read": "读取",
  "Recent actions": "最近操作",
  "Reject All": "全部拒绝",
  "Remove all": "全部移除",
  "Renew": "续订",
  "Renewal failed": "续订失败",
  "Requires Input": "需要输入",
  "Reset NUX": "重置新手引导",
  "Reset Onboarding": "重置引导",
  "Reset State": "重置状态",
  "Restart Task": "重启任务",
  "Run in a new git worktree": "在新的 git 工作树中运行",
  "Safe Merge": "安全合并",
  "Saved!": "已保存！",
  "Screenshot must be under 10 MB": "截图必须小于 10 MB",
  "Scrolled": "已滚动",
  "Search all convos...": "搜索所有对话...",
  "Search conversations (by name or Cascade ID)": "搜索对话（按名称或 Cascade ID）",
  "Search skills…": "搜索技能…",
  "Select a model to send message": "选择用于发送消息的模型",
  "Select a workspace to view skills that are not installed yet.": "选择工作区以查看尚未安装的技能。",
  "Select an option...": "选择一个选项...",
  "Select fields...": "选择字段...",
  "Select project": "选择项目",
  "Select workspace to send message": "选择用于发送消息的工作区",
  "Select...": "选择...",
  "Send Queued Message": "发送队列中的消息",
  "Setup": "设置",
  "Sherlog Links": "Sherlog 链接",
  "Show Sidebar": "显示侧边栏",
  "Side Question Instructions": "侧边问题说明",
  "Sidebar": "侧边栏",
  "Skip for now": "暂时跳过",
  "Start first conversation": "开始第一个对话",
  "Step Type": "步骤类型",
  "Subagent Overview": "子智能体概览",
  "Suggested Actions": "建议操作",
  "Switch Environment": "切换环境",
  "Switch Roles": "切换角色",
  "Terms of Service & Data Use": "服务条款与数据使用",
  "Tested": "已测试",
  "Thank you! Your feedback has been submitted successfully.": "谢谢！您的反馈已成功提交。",
  "This field is required": "此字段为必填项",
  "This workspace no longer exists. You cannot send messages.": "此工作区已不存在，无法发送消息。",
  "To provide feedback": "如需提供反馈",
  "Toggle Incognito Mode — disables knowledge and conversation history": "切换无痕模式 — 禁用知识和对话历史",
  "Tool": "工具",
  "Tool Calls": "工具调用",
  "Trajectory Debug View": "轨迹调试视图",
  "Trajectory ID:": "轨迹 ID：",
  "Trajectory Stats": "轨迹统计",
  "Try selecting a different workspace.": "请尝试选择其他工作区。",
  "Turn Off Project Feature": "关闭项目功能",
  "Turn Off Projects": "关闭项目",
  "Turn On Project Feature": "开启项目功能",
  "Turn On Projects": "开启项目",
  "Tutorial (1min)": "教程（1 分钟）",
  "Type to search...": "输入以搜索...",
  "UI Actions": "界面操作",
  "Unable to determine quota": "无法确定额度",
  "Unknown error": "未知错误",
  "Unknown Project": "未知项目",
  "Updating…": "正在更新…",
  "Use": "使用",
  "Use regular expression (.*)": "使用正则表达式 (.*)",
  "View conversation": "查看对话",
  "View File": "查看文件",
  "view full search results": "查看完整搜索结果",
  "View MCP settings": "查看 MCP 设置",
  "View Stacked Diff": "查看堆叠差异",
  "Viewing Diff": "正在查看差异",
  "Virtual File": "虚拟文件",
  "Virtual File Viewer": "虚拟文件查看器",
  "Visible only": "仅可见",
  "Wait for": "等待",
  "Working directory:": "工作目录：",
  "Workspace API": "工作区 API",
  "Write": "写入",
  "Yes, allow this time": "是，仅允许本次",
  "Yes, and always allow": "是，并始终允许",
  "Yes, and always allow in this workspace": "是，并始终在此工作区中允许",
  "Yes, I agree to help improve": "是，我同意帮助改进",
  "Yes, I'd like to receive product updates, tips, and promotions from Google": "是，我愿意接收来自 Google 的产品更新、提示和推广信息",
  "Yes, save rule globally": "是，保存为全局规则",
  "Yes, save rule in this workspace": "是，保存到此工作区",
  "Configure the browser subagent. It requires Google Chrome to be installed. The browser subagent can be invoked by typing /browser in the conversation input box.": "配置浏览器子智能体。它需要安装 Google Chrome。可以通过在对话输入框中输入 /browser 来调用浏览器子智能体。",
  "Configure the browser subagent. It requires": "配置浏览器子智能体。需要安装",
  "Orchestrates Android development tasks including project creation, deployment, SDK management, and environment diagnostics using the android command-line tool.": "使用 android 命令行工具编排 Android 开发任务，包括项目创建、部署、SDK 管理和环境诊断。",
  "Verbose agent chat": "详细的智能体对话",
  "Display and preserve intermediate thinking steps": "显示并保留中间思考步骤",
  "your plan. Enable AI Credit Overages to continue using models when your quota is exhausted.": "您的套餐。启用 AI 点数超额使用以在额度用尽时继续使用模型。",
  "View your available model quota and AI credits. Model quota refreshes periodically based on your plan. Enable AI Credit Overages to continue using models when your quota is exhausted.": "查看您的可用模型额度和 AI 点数。模型额度会根据您的套餐定期刷新。启用 AI 点数超额使用以在额度用尽时继续使用模型。",
  "The app will be accessible from the menu bar and will keep running in the background when all windows are closed.": "应用可以从菜单栏访问，并在所有窗口关闭时继续在后台运行。",
  "Queue After Turn": "本轮结束后排队",
  "Learn more about Turbo mode": "了解更多关于极速模式",
  "Turbo Mode": "极速模式",
  "Five Hour Limit": "五小时限额",
  "RECOMMENDED": "推荐",
  "NAVIGATION": "导航",
  "CONVERSATION": "对话",
  "Add scheduled task": "添加定时任务",
  "SettingsCtrl+,": "设置 Ctrl+,",
  "Scheduled TasksCtrl+U": "定时任务 Ctrl+U",
  "Google Drive integration not available": "Google Drive 集成不可用",
  "Changes the base URL on each extension page. You must restart Antigravity to use the new marketplace after changing this value.": "更改各扩展页面使用的基础 URL。修改后必须重启 Antigravity 才能使用新的扩展市场。",
  "Changes the base URL for marketplace search results. You must restart Antigravity to use the new marketplace after changing this value.": "更改扩展市场搜索结果使用的基础 URL。修改后必须重启 Antigravity 才能使用新的扩展市场。",
  "Configure a chat bot so you can use Jetski directly from Google Chat.": "配置聊天机器人，以便直接在 Google Chat 中使用 Jetski。",
  "or join the": "或加入",
  "chat space": "聊天空间",
  "Bot Name": "机器人名称",
  "Avatar URL": "头像 URL",
  "Setup Jetski Chat": "设置 Jetski Chat",
  "Enter bot name (optional)": "输入机器人名称（可选）",
  "Enter avatar URL (optional)": "输入头像 URL（可选）",
  "Orchestrates Android development tasks including project creation, deployment, SDK management, and environment diagnostics using the `android` command-line tool.": "使用 `android` 命令行工具编排 Android 开发任务，包括项目创建、部署、SDK 管理和环境诊断。",
  "When enabled, you will be automatically prompted to restart the app when there is a new update available. When disabled, you can check for updates manually from the app menu.": "启用后，发现新版本时会自动提示您重启应用。禁用后，您仍可从应用菜单手动检查更新。",
  "The more actionable your feedback, the quicker our team can address your request.": "反馈越具体、越便于处理，我们的团队就能越快响应您的请求。",
  "Some helpful information includes:": "建议包含以下信息：",
  "Attaching logs will help the Antigravity team act on and prioritize your feedback.": "附加日志有助于 Antigravity 团队处理您的反馈并确定优先级。",
  "We recommend attaching logs. Attaching logs will help the Antigravity team act on and prioritize your feedback.": "建议附加日志。附加日志有助于 Antigravity 团队处理您的反馈并确定优先级。",
  "CitC Settings": "CitC 设置",
  "Manage settings specific to Google CitC workspaces development.": "管理 Google CitC 工作区开发专用设置。",
  "Merge Google3 chats": "合并 Google3 对话",
  "We will reorganize your Google3 chats into their workspaces in the sidebar. See": "我们会将 Google3 对话重新整理到侧边栏中的对应工作区。详见",
  "Google3 settings": "Google3 设置",
  "This migration is experimental.": "此迁移功能仍处于实验阶段。",
  "Typeahead menu": "输入建议菜单",
  "Unarchive conversation": "取消归档对话",
  "Investigate and fix software issues using AI-powered root cause analysis. This MCP server connects to your Antimetal account to search issues, read investigative reports with causal graphs, retrieve observability artifacts (logs, traces, metrics), and apply remediations—directly from your AI tools.": "使用 AI 驱动的根因分析调查并修复软件问题。此 MCP 服务器连接您的 Antimetal 账户，可搜索问题、读取包含因果图的调查报告、获取可观测性产物（日志、跟踪、指标），并直接通过 AI 工具应用修复措施。",
  "Query and act on your marketing, analytics, CRM, e-commerce, and warehouse data across 325+ connectors (Meta Ads, Google Ads, TikTok Ads, GA4, HubSpot, Salesforce, Shopify, Stripe, BigQuery, Snowflake, and more) using natural language. Read live data and write changes back (pause or enable campaigns, set budgets, upload conversions) with no SQL and no custom integrations.": "使用自然语言，通过 325 多种连接器查询和操作营销、分析、CRM、电商及数据仓库数据，包括 Meta Ads、Google Ads、TikTok Ads、GA4、HubSpot、Salesforce、Shopify、Stripe、BigQuery 和 Snowflake 等。无需 SQL 或自定义集成，即可读取实时数据并写回更改，例如暂停或启用广告系列、设置预算和上传转化数据。",
  "Query your GitLab SDLC as a knowledge graph. Orbit indexes groups, projects, source code, merge requests, pipelines, work items, and security findings into a single graph so agents can answer blast radius, onboarding, and dependency mapping questions by traversing real relationships instead of grepping across separate systems.": "将 GitLab 软件开发生命周期作为知识图谱查询。Orbit 会把群组、项目、源代码、合并请求、流水线、工作项和安全发现编入同一张图，让智能体沿真实关系回答影响范围、上手流程和依赖映射问题，而无需在多个独立系统中逐一搜索。",
  "Enable Antigravity to deploy apps to Google Cloud Run.": "让 Antigravity 能够将应用部署到 Google Cloud Run。",
  "Ask questions. Get answers. The MCP is a server your coding agent talks to. Ask a question in English. It runs the query against your PostHog data. The answer lands in your editor. No SQL. No dashboards. No tabs full of charts you forgot you opened. Try things like: - \"How many unique users signed up in the last 7 days, broken down by day?\" - \"Create an A/B test for our pricing page that measures conversion to checkout.\" - \"What are the top 5 errors in my project this week?\"": "直接提问并获得答案。编码智能体会与此 MCP 服务器通信，并针对您的 PostHog 数据运行查询，结果会直接显示在编辑器中。无需 SQL、仪表板或堆满图表的标签页。例如可以询问：“过去 7 天每天有多少独立用户注册？”“为定价页面创建衡量结账转化率的 A/B 测试。”“本周项目中最常见的 5 个错误是什么？”",
  "Search and reference over 600,000 real-world app screens, user flows, and UI patterns from Mobbin directly within your AI tools.": "直接在 AI 工具中搜索和引用 Mobbin 收录的 60 多万个真实应用界面、用户流程与 UI 模式。",
  "Build, edit, deploy, and manage full-stack web apps with Lovable, the AI-powered app builder, using natural language. This MCP server connects your AI client to Lovable so you can create projects and workspaces, send build instructions to the Lovable agent, inspect generated code via diffs and file trees, read and write project knowledge, manage Postgres databases and connectors, and deploy apps directly from your AI tools.": "使用自然语言，通过 AI 应用构建器 Lovable 构建、编辑、部署和管理全栈 Web 应用。此 MCP 服务器将 AI 客户端连接到 Lovable，可创建项目和工作区、向 Lovable 智能体发送构建指令、通过差异和文件树检查生成的代码、读写项目知识、管理 Postgres 数据库与连接器，并直接从 AI 工具部署应用。",
  "The GKE remote MCP server provides read write access to your GKE Kubernetes resources. It allows an AI agent to inspect and observe your environment.": "GKE 远程 MCP 服务器提供对 GKE Kubernetes 资源的读写访问，使 AI 智能体能够检查和观察您的环境。",
  "The Dart and Flutter MCP server exposes Dart (and Flutter) development tool actions to compatible AI-assistant clients.": "Dart 和 Flutter MCP 服务器向兼容的 AI 助手客户端提供 Dart（及 Flutter）开发工具操作。",
  "The Firebase Model Context Protocol (MCP) Server gives AI-powered development tools the ability to work with your Firebase projects and your app's codebase.": "Firebase 模型上下文协议（MCP）服务器让 AI 开发工具能够操作您的 Firebase 项目和应用代码库。",
  "The Genkit Model Context Protocol (MCP) Server gives AI-powered development tools the ability to build, debug and inspect your Genkit app.": "Genkit 模型上下文协议（MCP）服务器让 AI 开发工具能够构建、调试和检查 Genkit 应用。",
  "The gopls Model Context Protocol (MCP) server provides tools for semantic code analysis, live diagnostics, and transformation of your Go codebase.": "gopls 模型上下文协议（MCP）服务器提供 Go 代码库的语义分析、实时诊断和代码转换工具。",
  "Interact with your BigQuery data using natural language. This MCP server allows you to securely connect to your datasets to search the datasets, inspect table metadata, execute SQL queries, generate time-series forecasts, and perform contribution analysis directly from your AI tools.": "使用自然语言与 BigQuery 数据交互。此 MCP 服务器可安全连接数据集，并直接从 AI 工具搜索数据集、检查表元数据、执行 SQL 查询、生成时间序列预测和进行贡献度分析。",
  "The AlloyDB for PostgreSQL remote MCP server lets you access and run AlloyDB tools to manage AlloyDB clusters and instances, manage users, create and restore backups, administer users, import and export data, and run SQL queries from your AI-enabled development environments and AI agent platforms.": "AlloyDB for PostgreSQL 远程 MCP 服务器可在 AI 开发环境和智能体平台中调用 AlloyDB 工具，用于管理集群、实例和用户，创建与恢复备份，导入导出数据以及运行 SQL 查询。",
  "The Bigtable Admin remote MCP server lets you manage Bigtable resources.": "Bigtable Admin 远程 MCP 服务器可用于管理 Bigtable 资源。",
  "Manage Google Cloud resources with gcloud and bq CLI tools in a remote sandbox environment": "在远程沙盒环境中使用 `gcloud` 和 `bq` CLI 工具管理 Google Cloud 资源。",
  "The Cloud SQL remote MCP server lets you access and run Cloud SQL tools to manage Cloud SQL instances, manage users, create and restore backups, administer users, import and export data, and run SQL queries from your AI-enabled development environments and AI agent platforms.": "Cloud SQL 远程 MCP 服务器可在 AI 开发环境和智能体平台中调用 Cloud SQL 工具，用于管理实例和用户、创建与恢复备份、导入导出数据以及运行 SQL 查询。",
  "The Spanner remote MCP server lets you access and run Spanner tools to create, manage, and query Spanner resources from your AI-enabled development environments and AI agent platforms.": "Spanner 远程 MCP 服务器可在 AI 开发环境和智能体平台中调用 Spanner 工具，以创建、管理和查询 Spanner 资源。",
  "The Apigee API hub remote MCP server lets you manage the APIs, versions, specs, operations, deployments, attributes, external APIs, and dependencies registered in your API hub instance - including creating, reading, updating, and deleting them - and search across resources, using natural language.": "Apigee API hub 远程 MCP 服务器支持用自然语言管理 API hub 实例中登记的 API、版本、规范、操作、部署、属性、外部 API 和依赖项，包括创建、读取、更新、删除以及跨资源搜索。",
  "Connect your AI assistants to Looker business intelligence. This MCP server enables data exploration and content management by allowing you to execute natural language queries, run saved Looks, create and manage dashboards, and perform instance health checks within your Looker environment.": "将 AI 助手连接到 Looker 商业智能平台。此 MCP 服务器支持在 Looker 环境中执行自然语言查询、运行已保存的 Look、创建和管理仪表板、执行实例健康检查，以进行数据探索和内容管理。",
  "Connect your AI assistants to the Knowledge Catalog (formerly known as Dataplex). This MCP server enables data discovery and governance by allowing you to search for data assets, retrieve detailed metadata such as schemas and ownership, and explore aspect types across your distributed data.": "将 AI 助手连接到 Knowledge Catalog（原 Dataplex）。此 MCP 服务器可搜索数据资产、获取架构和所有权等详细元数据，并探索分布式数据中的方面类型，以支持数据发现和治理。",
  "The MCP Toolbox for Databases is an open-source MCP server designed to simplify and secure the development of tools for interacting with databases.": "MCP Toolbox for Databases 是开源 MCP 服务器，旨在简化与数据库交互工具的开发并提高安全性。",
  "Interact with your Oracle Database data using natural language. This MCP server allows you to securely connect to your databases for executing SQL queries, inspecting table schemas, and troubleshooting database performance issues directly from your AI tools.": "使用自然语言与 Oracle Database 数据交互。此 MCP 服务器可安全连接数据库，并直接从 AI 工具执行 SQL 查询、检查表结构和排查数据库性能问题。",
  "The Dev Mode MCP Server brings Figma directly into your workflow by providing important design information and context to AI agents generating code from Figma design files.": "Dev Mode MCP 服务器把 Figma 直接接入工作流，为根据 Figma 设计文件生成代码的 AI 智能体提供关键设计信息和上下文。",
  "The GitHub MCP Server is a Model Context Protocol (MCP) server that provides seamless integration with GitHub APIs, enabling advanced automation and interaction capabilities for developers and tools.": "GitHub MCP 服务器可与 GitHub API 无缝集成，为开发者和工具提供高级自动化与交互能力。",
  "The Google Home Developer MCP server allows you to search through Google Home documentation, OpenThread and Matter specifications documentation.": "Google Home Developer MCP 服务器可搜索 Google Home 文档以及 OpenThread 和 Matter 规范文档。",
  "Neon MCP Server is an open-source tool that lets you interact with your Neon Postgres databases in natural language.": "Neon MCP Server 是开源工具，可使用自然语言与 Neon Postgres 数据库交互。",
  "The Stripe Model Context Protocol server allows you to integrate with Stripe APIs through function calling. This protocol supports various tools to interact with different Stripe services.": "Stripe 模型上下文协议服务器通过函数调用集成 Stripe API，并提供多种工具与不同的 Stripe 服务交互。",
  "Interact with Redis key-value stores": "与 Redis 键值存储交互。",
  "A Model Context Protocol server for interacting with MongoDB Atlas.": "用于与 MongoDB Atlas 交互的模型上下文协议服务器。",
  "Official Notion MCP Server that allows interaction with Notion workspaces, pages, databases, and comments via the Notion API.": "Notion 官方 MCP 服务器，可通过 Notion API 与工作区、页面、数据库和评论交互。",
  "Official Linear.app MCP Server for interacting with Linear projects, issues, and workflows.": "Linear.app 官方 MCP 服务器，用于与 Linear 项目、问题和工作流交互。",
  "An MCP server implementation that integrates the Perplexity Sonar API to provide real-time, web-wide research capabilities.": "集成 Perplexity Sonar API 的 MCP 服务器，可提供实时的全网研究能力。",
  "Official PayPal MCP Server that allows integration with PayPal APIs for payment processing, transaction management, and account operations.": "PayPal 官方 MCP 服务器，可集成 PayPal API 进行付款处理、交易管理和账户操作。",
  "The Heroku Platform MCP Server enables seamless interaction with Heroku Platform resources, allowing LLMs to read, manage, and operate applications, add-ons, databases, and more.": "Heroku Platform MCP 服务器支持无缝操作 Heroku 平台资源，使大语言模型能够读取、管理和操作应用、附加组件、数据库等。",
  "The Pinecone MCP Server enables AI tools to search Pinecone documentation, configure indexes, generate code informed by your index configuration, and upsert/search data in your Pinecone indexes.": "Pinecone MCP 服务器让 AI 工具能够搜索 Pinecone 文档、配置索引、根据索引配置生成代码，以及在 Pinecone 索引中插入更新和搜索数据。",
  "Connect your Supabase projects to AI assistants. This MCP server allows managing tables, fetching config, executing SQL queries, managing edge functions, and working with database schema in your Supabase projects.": "将 Supabase 项目连接到 AI 助手。此 MCP 服务器可管理表、获取配置、执行 SQL 查询、管理边缘函数，并操作 Supabase 项目的数据库架构。",
  "The Prisma MCP Server enables AI tools to interact with Prisma for creating and managing Postgres databases easily.": "Prisma MCP 服务器让 AI 工具能够通过 Prisma 轻松创建和管理 Postgres 数据库。",
  "The Locofy MCP Server enables Locofy.ai code to be integrated and extended with your IDE.": "Locofy MCP 服务器支持在 IDE 中集成和扩展 Locofy.ai 代码。",
  "Airweave lets agents search any app.": "Airweave 让智能体可以搜索任意应用。",
  "Atlassian MCP Server for interacting with Atlassian products.": "用于与 Atlassian 产品交互的 Atlassian MCP 服务器。",
  "Interact with your Harness account using natural language. This MCP server lets AI agents inspect and manage CI/CD pipelines, executions, services, environments, connectors, feature flags, cloud costs, security findings, chaos experiments, and other Harness platform resources.": "使用自然语言与 Harness 账户交互。此 MCP 服务器让 AI 智能体能够检查和管理 CI/CD 流水线、执行记录、服务、环境、连接器、功能开关、云成本、安全发现、混沌实验及其他 Harness 平台资源。",
  "SonarQube MCP Server enables AI assistants to interact with SonarQube instances for code quality analysis, project management, and quality gate operations.": "SonarQube MCP 服务器让 AI 助手能够与 SonarQube 实例交互，执行代码质量分析、项目管理和质量门禁操作。",
  "Netlify MCP Server enables AI assistants to interact with Netlify's platform for managing sites, deployments, domains, and other web development workflows.": "Netlify MCP 服务器让 AI 助手能够与 Netlify 平台交互，管理站点、部署、域名及其他 Web 开发工作流。",
  "A Model Context Protocol server that provides structured thinking and reasoning capabilities for LLM conversations.": "为大语言模型对话提供结构化思考与推理能力的模型上下文协议服务器。",
  "Sonatype MCP server for interacting with our dependency management and security intelligence platform.": "用于与 Sonatype 依赖管理和安全情报平台交互的 MCP 服务器。",
  "The Google Maps Platform Code Assist MCP server provides your favorite AI coding assistant with up-to-date, official Google Maps Platform documentation, code samples, and best practices. By grounding your AI assistant in our official resources, it can generate more accurate, reliable, and useful code.": "Google Maps Platform Code Assist MCP 服务器为 AI 编码助手提供最新的 Google Maps Platform 官方文档、代码示例和最佳实践。借助这些官方资源，AI 助手可以生成更准确、可靠且实用的代码。",
  "This MCP server provides your LLM with docs and examples to instrument your AI apps with Arize AX. It also provides access to Arize support. Connect it to your IDE or LLM and get curated tracing examples, best practices and Arize support!": "此 MCP 服务器为大语言模型提供使用 Arize AX 检测 AI 应用的文档和示例，并可访问 Arize 支持。将其连接到 IDE 或大语言模型，即可获得精选的跟踪示例、最佳实践和 Arize 支持。",
  "The Postman MCP Server connects Postman to AI tools, giving AI agents and assistants the ability to access workspaces, manage collections and environments, evaluate APIs, and automate workflows through natural language interactions.": "Postman MCP 服务器将 Postman 连接到 AI 工具，让 AI 智能体和助手能够访问工作区、管理集合与环境、评估 API，并通过自然语言交互自动执行工作流。",
  "The Stitch MCP server enables AI assistants to interact with Stitch for vibe design: generating UI designs from text and images, and accessing project and screen details. See https://stitch.withgoogle.com/docs for more details.": "Stitch MCP 服务器让 AI 助手能够使用 Stitch 进行氛围式设计：根据文本和图像生成 UI 设计，并访问项目与界面详情。更多信息请参阅 https://stitch.withgoogle.com/docs。",
  "The Google Developer Knowledge MCP server gives AI-powered development tools the ability to search Google's official developer documentation and retrieve information for Google's products such as Firebase, Google Cloud, Android, Maps, and more. By connecting your AI application straight to our official library of documentation, it ensures the code and guidance you receive are up-to-date and based on authoritative context.": "Google Developer Knowledge MCP 服务器让 AI 开发工具能够搜索 Google 官方开发者文档，并获取 Firebase、Google Cloud、Android、Maps 等产品的信息。将 AI 应用直接连接到官方文档库，可确保代码和指导保持最新并基于权威上下文。",
  "The ClickHouse MCP server enables agents to securely interact with ClickHouse databases. It provides a universal interface to execute SQL, explore data, and view backup & billing details, allowing agentic tooling to leverage ClickHouse's high-performance analytical capabilities.": "ClickHouse MCP 服务器让智能体能够安全地与 ClickHouse 数据库交互。它提供统一接口来执行 SQL、探索数据以及查看备份和账单详情，使智能体工具能够利用 ClickHouse 的高性能分析能力。",
  "Perform a range of infrastructure management tasks, including: manage virtual machine (VM) instances, manage instance group managers and instance templates, manage disks and snapshots, retrieve information about reservations and commitments.": "执行多种基础设施管理任务，包括管理虚拟机实例、实例组管理器与实例模板、磁盘与快照，以及获取预留和承诺使用信息。",
  "Access enterprise mobility data using natural language queries about device fleets, automated auditing of policy compliance, and the integration of device management data into broader automated workflows.": "使用自然语言访问企业移动设备数据，查询设备群组、自动审计策略合规性，并将设备管理数据接入更广泛的自动化工作流。",
  "Search your Google Cloud projects using natural language.": "使用自然语言搜索 Google Cloud 项目。",
  "Perform searches on ingested data in Google-owned data stores.": "搜索 Google 所有的数据存储中已导入的数据。",
  "Interact with documents stored in a Firestore database using natural language.": "使用自然语言与 Firestore 数据库中存储的文档交互。",
  "Access resources in the Cloud Logging platform using natural language.": "使用自然语言访问 Cloud Logging 平台中的资源。",
  "Manage clusters for Managed Service for Apache Kafka and Kafka Connect using natural language.": "使用自然语言管理 Managed Service for Apache Kafka 和 Kafka Connect 集群。",
  "Access resources in the Cloud Monitoring platform using natural language.": "使用自然语言访问 Cloud Monitoring 平台中的资源。",
  "Manage Pub/Sub resources and publish messages. Create, list, get, update, and delete Pub/Sub topics, subscriptions, and snapshots, as well as publish messages to topics.": "管理 Pub/Sub 资源并发布消息。可创建、列出、获取、更新和删除 Pub/Sub 主题、订阅与快照，也可向主题发布消息。",
  "The Cloud Quotas MCP server allows you to view quota allocations, request quota increases, and manage Quota Adjuster configurations.": "Cloud Quotas MCP 服务器可查看配额分配、申请提高配额并管理 Quota Adjuster 配置。",
  "Enable Antigravity to control and inspect a live Chrome browser, with access to the full power of Chrome DevTools for reliable automation, in-depth debugging, and performance analysis.": "让 Antigravity 能够控制和检查正在运行的 Chrome 浏览器，并充分利用 Chrome DevTools 进行可靠的自动化、深度调试和性能分析。",
  "Build and publish Chrome Extensions using Manifest V3 best practices. Use this skill whenever the user asks to create, modify, debug, or understand Chrome browser extensions, add-ons, or anything involving the Chrome Extensions API. Trigger on mentions of: 'Chrome extension', 'browser extension', 'manifest.json', 'content script', 'service worker' (in browser context), 'popup' (in browser extension context), 'side panel', 'chrome.* API', 'declarativeNetRequest', 'omnibox', 'context menu' (in extension context), or any request to build functionality that integrates with the Chrome browser UI. Also trigger for publishing to the Chrome Web Store: 'publish extension', preparing an extension for publishing, responding to a review rejection, writing permission justifications, or drafting a privacy policy.": "使用 Manifest V3 最佳实践构建和发布 Chrome 扩展。当用户需要创建、修改、调试或了解 Chrome 浏览器扩展、附加组件或 Chrome Extensions API 时使用此技能。提到 Chrome 扩展、浏览器扩展、`manifest.json`、内容脚本、浏览器上下文中的 Service Worker、弹出窗口、侧边栏、`chrome.*` API、`declarativeNetRequest`、地址栏、上下文菜单或与 Chrome 浏览器 UI 集成的功能时均应启用。发布到 Chrome 应用商店、准备发布、处理审核拒绝、编写权限说明或隐私政策时也应启用。",
  "Deploy and manage web apps with Firebase App Hosting. Use this skill when deploying Next.js/Angular apps with backends.": "使用 Firebase App Hosting 部署和管理 Web 应用。部署带后端的 Next.js 或 Angular 应用时使用此技能。",
  "Provides foundational setup, authentication, and project management workflows for Firebase using the Firebase CLI. Use when checking Firebase CLI version (must use 'npx -y firebase-tools@latest --version'), initializing a Firebase environment, authenticating, setting active projects, or setting up `google-services.json` or `GoogleService-Info.plist` files.": "提供使用 Firebase CLI 进行基础设置、身份验证和项目管理的工作流。检查 Firebase CLI 版本、初始化 Firebase 环境、进行身份验证、设置活动项目，或配置 `google-services.json` 与 `GoogleService-Info.plist` 文件时使用。",
  "Sets up, manages, and executes queries against Cloud Firestore database instances. You MUST unconditionally activate this skill if you plan to use Firestore in any way. Use when listing or creating Firestore databases, configuring security rules, designing data models, writing client SDK queries, or checking indexes.": "设置和管理 Cloud Firestore 数据库实例并执行查询。只要计划以任何方式使用 Firestore，就必须启用此技能。列出或创建 Firestore 数据库、配置安全规则、设计数据模型、编写客户端 SDK 查询或检查索引时使用。",
  "Skill for working with Firebase Hosting (Classic). Use this when you want to deploy static web apps, Single Page Apps (SPAs), or simple microservices. Do NOT use for Firebase App Hosting.": "用于 Firebase Hosting（经典版）的技能。部署静态 Web 应用、单页应用或简单微服务时使用；不要用于 Firebase App Hosting。",
  "Comprehensive guide for Firebase Remote Config, including template management and SDK usage. Use this skill when the user needs help setting up Remote Config, managing feature flags, or updating app behavior dynamically.": "Firebase Remote Config 完整指南，涵盖模板管理和 SDK 用法。当用户需要设置 Remote Config、管理功能开关或动态更新应用行为时使用。",
  "A skill to evaluate how secure Firestore security rules are. Use this when Firestore security rules are updated to ensure that the generated rules are extremely secure and robust.": "用于评估 Firestore 安全规则可靠程度的技能。更新 Firestore 安全规则时使用，以确保生成的规则非常安全且稳健。",
  "Automatically migrate legacy workflows (.agents/workflows/ or ~/.gemini/config/workflows/) to skills (.agents/skills/ or ~/.gemini/config/skills/). Scans for existing workflows, creates target SKILL.md files, and archives old workflow files.": "自动将旧工作流（`.agents/workflows/` 或 `~/.gemini/config/workflows/`）迁移为技能（`.agents/skills/` 或 `~/.gemini/config/skills/`）。扫描现有工作流、创建目标 `SKILL.md` 文件并归档旧工作流文件。",
  "Connect to Google Workspace, including Docs, Sheets, Slides, Drive, and Calendar.": "连接 Google Workspace，包括文档 (Docs)、表格 (Sheets)、幻灯片 (Slides)、云端硬盘 (Drive) 和日历 (Calendar)。",
  "Build on Google's developer platforms, including Android, Chrome, Gemini, and Google Cloud.": "基于 Google 开发者平台进行构建，涵盖 Android、Chrome、Gemini 和 Google Cloud。",
  "Antigravity plugins marketplace catalog.": "Antigravity 插件市场目录。",
  "Check availability, schedule events, and RSVP.": "查看空闲状态、安排日程活动并回复邀请 (RSVP)。",
  "Read, write, and format spreadsheets.": "读取、写入和格式化电子表格。",
  "Read, edit, and export presentations.": "读取、编辑和导出演示文稿。",
  "Search and retrieve official documentation across Google Cloud, Gemini, Android, Firebase, Flutter, and Web. Requires Google Cloud credentials (ADC) or an API key.": "跨 Google Cloud、Gemini、Android、Firebase、Flutter 和 Web 搜索并获取官方文档。需要 Google Cloud 凭据 (ADC) 或 API 密钥。",
  "Google Cloud guidance for coding agents: first-project onboarding, authentication and credential selection, and safety-critical validation for gcloud CLI commands. Includes the Google Developer Knowledge MCP server for grounded, up-to-date Google Cloud documentation.": "面向编码智能体的 Google Cloud 指南：首个项目入门引导、身份验证与凭据选择，以及针对 gcloud CLI 命令的关键安全校验。内置 Google Developer Knowledge MCP 服务以提供真实、最新的 Google Cloud 官方文档。",
  "What's on my calendar today? Flag any conflicts": "我今天有哪些日程安排？请标出所有时间冲突",
  "Block focus time before Friday's launch review": "在周五的发布评审前预留一段专注时间",
  "Summarize this design doc and list the open questions": "总结这份设计文档并列出所有待解决的问题",
  "Draft a launch announcement in a new doc from my notes": "根据我的笔记在新文档中起草一份发布公告",
  "Reply to the open comments on my doc and resolve them": "回复我文档中的未决评论并将其标记为已解决",
  "Find last quarter's budget and share it with Alex": "查找上个季度的预算表并分享给 Alex",
  "Move this week's design exports into the Launch folder": "将本周导出的设计文件移动到 Launch 文件夹中",
  "Download the Q3 report as a PDF": "将第三季度 (Q3) 报告下载为 PDF 文件",
  "Find the trends and outliers in this sales sheet": "找出这份销售表格中的趋势与异常值",
  "Build a monthly budget tracker with formulas and a chart": "构建一个包含公式和图表的月度预算跟踪表",
  "Import this CSV and turn it into a pivot table by region": "导入此 CSV 文件并按地区生成数据透视表",
  "Turn my project notes into a 10-slide pitch deck": "将我的项目笔记转化为一份 10 页的项目路演幻灯片",
  "Add a summary slide and speaker notes to my review deck": "为我的评审演示文稿添加一页总结幻灯片和演讲者备注",
  "Export the final deck as a PDF": "将最终版演示文稿导出为 PDF",
  "Create a PySpark notebook to train a distributed Random Forest model on the BigQuery table my_transactions": "创建一个 PySpark 笔记本，基于 BigQuery 表 my_transactions 训练分布式随机森林模型",
  "Find datasets about customer orders in Knowledge Catalog and show their lineage": "在知识目录 (Knowledge Catalog) 中查找有关客户订单的数据集并展示其血缘关系",
  "My last Dataflow job failed. Find the root cause in the logs and propose a fix": "我的上一个 Dataflow 作业失败了，请在日志中查找根本原因并提出修复方案",
  "Add Firebase Authentication with Google sign-in to my app": "为我的应用添加支持 Google 登录的 Firebase 身份验证 (Firebase Authentication)",
  "Write and audit Firestore security rules for my data model": "为我的数据模型编写并审计 Firestore 安全规则",
  "Add a Gemini-powered feature to my app with Firebase AI Logic": "使用 Firebase AI Logic 为我的应用添加由 Gemini 驱动的功能",
  "Deploy my web app with Firebase App Hosting": "使用 Firebase App Hosting 部署我的 Web 应用",
  "Build a stateful multi-turn chat script using the Interactions API and the latest models": "使用 Interactions API 和最新模型构建有状态的多轮对话脚本",
  "Create a real-time voice agent using the Gemini Live API and non-blocking function calling": "使用 Gemini Live API 和非阻塞函数调用创建实时语音智能体",
  "Migrate my project from client.models.generate_content to the Interactions API": "将我的项目从 client.models.generate_content 迁移至 Interactions API",
  "Look up the exact gcloud CLI command and IAM roles needed to deploy a Cloud Run service with Secret Manager": "查询使用 Secret Manager 部署 Cloud Run 服务所需的确切 gcloud CLI 命令和 IAM 角色",
  "Search official Google documentation for how to implement structured outputs with the Gemini API": "搜索 Google 官方文档，了解如何使用 Gemini API 实现结构化输出",
  "Compare Cloud Run, GKE Autopilot, and App Engine based on official Google Cloud architecture guides": "根据 Google Cloud 官方架构指南对比 Cloud Run、GKE Autopilot 和 App Engine",
  "Help me set up a new Google Cloud project, link billing, and configure local authentication.": "帮我创建一个新的 Google Cloud 项目、关联结算账户并配置本地身份验证。",
  "Configure Application Default Credentials (ADC) and IAM permissions for my local development environment.": "为我的本地开发环境配置应用默认凭据 (ADC) 和 IAM 权限。",
  "Search official Google Cloud documentation using Developer Knowledge and validate my gcloud CLI commands.": "使用 Developer Knowledge 搜索 Google Cloud 官方文档并验证我的 gcloud CLI 命令。",
  "Build a responsive Flutter layout that adapts across mobile, tablet, and desktop form factors": "构建一个自适应手机、平板电脑和桌面端屏幕尺寸的响应式 Flutter 布局",
  "Write a widget test using WidgetTester to verify UI rendering and user interactions": "使用 WidgetTester 编写组件测试，以验证 UI 渲染和用户交互",
  "Audit my app for accessibility": "对我的应用进行无障碍访问 (Accessibility) 审查",
  "Diagnose and fix layout overflows or constraint issues in this Flutter widget": "诊断并修复此 Flutter 组件中的布局溢出或约束问题",
  "Read, write, format, and manage Google Sheets. Use when the user shares a sheets.google.com or docs.google.com/spreadsheets URL, asks to read or summarize spreadsheet data, wants cells written, formatted, sorted, merged, or validated, wants rows/columns inserted or deleted, wants charts, pivot tables, or tables added, wants CSV imported, or wants a spreadsheet created, copied, shared, or exported. Don't use for Google Docs, Slides, or Drive file management.": "读取、写入、格式化和管理 Google 表格 (Google Sheets)。当用户分享 sheets.google.com 或 docs.google.com/spreadsheets 链接、要求读取或汇总表格数据、需要写入/格式化/排序/合并/验证单元格、插入或删除行列、添加图表/数据透视表/表格、导入 CSV，或创建、复制、分享、导出电子表格时使用。请勿用于 Google 文档、幻灯片或云端硬盘文件管理。",
  "Read, create, and edit Google Slides presentations. Use when creating presentations, when the user shares a slides.google.com URL, asks to summarize or extract content from a deck, wants slides drafted or updated, or wants a presentation exported. Don't use for Google Docs, Sheets, or Drive file management.": "读取、创建和编辑 Google 幻灯片 (Google Slides) 演示文稿。在创建演示文稿、用户分享 slides.google.com 链接、要求总结或提取演示文稿内容、起草或更新幻灯片，或导出演示文稿时使用。请勿用于 Google 文档、表格或云端硬盘文件管理。",
  "Read, create, and manage Google Calendar events. Use when the user shares a calendar.google.com URL, asks what is on their schedule, wants an event found, created, updated, deleted, or moved, wants to RSVP, wants free/busy or scheduling conflicts checked before proposing a time, wants focus time or an out-of-office block created, wants an event quick-added from a phrase or imported from an ICS file, or wants to know where someone is working from and which timezone they are in. Don't use for Gmail, Chat, or Tasks.": "读取、创建和管理 Google 日历 (Google Calendar) 日程。当用户分享 calendar.google.com 链接、询问日程安排、需要查找/创建/更新/删除/移动日程、回复邀请 (RSVP)、在提议时间前检查忙闲状态或日程冲突、创建专注时间或外出时段、通过短语快速添加日程或从 ICS 文件导入，或查询某人的办公地点与所在时区时使用。请勿用于 Gmail、Chat 或 Tasks。",
  "Searches, retrieves, and synthesizes official Google developer documentation across Google Cloud, AI/Gemini, Android, Chrome, Web, Flutter, Go, Firebase, and other Google developer platforms. Integrates with the Developer Knowledge MCP server (search_documents, get_documents, answer_query) or the Developer Knowledge REST API fallback. Use when searching for gcloud CLI commands, API syntax, IAM permissions, official documentation, architectural comparisons, or product choice overviews. Don't use for local filesystem lookups or non-Google documentation.": "跨 Google Cloud、AI/Gemini、Android、Chrome、Web、Flutter、Go、Firebase 及其他 Google 开发者平台搜索、获取并综合官方开发者文档。集成 Developer Knowledge MCP 服务（search_documents、get_documents、answer_query）或 Developer Knowledge REST API 后备方案。在搜索 gcloud CLI 命令、API 语法、IAM 权限、官方文档、架构对比或产品选型概览时使用。请勿用于本地文件系统查找或非 Google 文档。",
  "Provides an end-to-end journey for authoring a BigQuery property graph from your tables or from a model document/diagram (an ER diagram, an ontology, a semantic model): dataset discovery, candidate relationships verified against the data, a readable plan, and `CREATE PROPERTY GRAPH` DDL with schema best practices and semantic measures/dimensions, plus an opt-in verification suite for the landed graph. Use when creating or replacing a property graph, authoring a graph from a dataset or a document, or verifying relationships or suspicious edge counts. Don't use for querying an existing graph, for non-BigQuery graph databases, or for drawing/rendering diagrams.": "提供从数据表或模型文档/图表（ER 图、本体、语义模型）构建 BigQuery 属性图的端到端流程：数据集发现、基于数据验证候选关系、生成可读计划、包含架构最佳实践与语义度量/维度的 `CREATE PROPERTY GRAPH` DDL，以及针对落地属性图的可选验证套件。在创建或替换属性图、根据数据集或文档构建图，或验证关系与可疑边数时使用。请勿用于查询现有图、非 BigQuery 图数据库或绘制/渲染图表。",
  "Provides guidelines and best practices for querying BigQuery property graphs and semantic graphs: native GQL (Graph Query Language) pattern matching, multi-hop and variable-length paths, aggregation, top-N, path extraction, output formatting (graph visualization with TO_JSON vs tabular), GRAPH_TABLE relational SQL integration, and semantic graph querying via the GRAPH_EXPAND TVF with starting-node view selection and AGG() measures. Also covers hybrid semantic search, combining `VECTOR_SEARCH` candidate generation with graph traversal when a node carries an embedding-backed property. Use when querying graph topology, node/edge connections, paths, or semantic measures over an existing BigQuery graph. Don't use for Cypher or non-BigQuery graph databases, or for creating/modifying a graph schema.": "提供查询 BigQuery 属性图和语义图的指南与最佳实践：原生 GQL（图查询语言）模式匹配、多跳与可变长度路径、聚合、Top-N、路径提取、输出格式化（使用 TO_JSON 进行图可视化与表格输出对比）、GRAPH_TABLE 关系型 SQL 集成，以及通过带有起始节点视图选择和 AGG() 度量的 GRAPH_EXPAND 表值函数 (TVF) 进行语义图查询。同时涵盖混合语义搜索，在节点带有嵌入向量属性时将 `VECTOR_SEARCH` 候选生成与图遍历相结合。在现有 BigQuery 图上查询图拓扑、节点/边连接、路径或语义度量时使用。请勿用于 Cypher、非 BigQuery 图数据库，或创建/修改图架构。",
  "Configures (or reconfigures) the Google Cloud Data Agent Kit (DAK) plugin by checking gcloud and ADC credentials, collecting the GCP project ID, region, and services, and running its bundled `dak-setup` script. Use this proactively and without waiting to be asked whenever a SessionStart hook or any other system/context message reports that the Data Agent Kit plugin is not configured, is missing configuration, or needs to be reconfigured. Also use it whenever the user mentions setting up, configuring, reconfiguring, or changing the project, region, or service integrations for the Data Agent Kit or DAK plugin — even if they phrase it casually, like \"dak isn't working\" or \"I want to enable more GCP service integrations\".": "通过检查 gcloud 和 ADC 凭据、收集 GCP 项目 ID、区域和服务，并运行内置的 `dak-setup` 脚本来配置（或重新配置）Google Cloud Data Agent Kit (DAK) 插件。当 SessionStart 钩子或任何系统/上下文消息报告 Data Agent Kit 插件未配置、缺少配置或需要重新配置时，请主动调用而无需等待用户指示。当用户提到设置、配置、重新配置或更改 Data Agent Kit (DAK) 插件的项目、区域或服务集成（哪怕只是随口提到“dak 用不了”或“我想启用更多 GCP 服务集成”）时也应使用。",
  "Upgrades GCP Spark/Dataproc jobs to newer versions by analyzing, remediating, and testing job on target image version. Use when: - Upgrading Spark/Dataproc versions (major, minor, or sub-minor). Example prompt: \"Upgrade Dataproc job [job_id] in project [project_id], region [region] to target image version [target_version]. Temporary staging: [gcs_staging_path], Target GCS bucket: [gcs_target_path]\" Don't use when: - Writing new Spark code. - Migrating non-Spark workloads (e.g., Hive/Flink to Spark). Limitation: This skill does not support data/result validation currently.": "通过在目标镜像版本上分析、修复和测试作业，将 GCP Spark/Dataproc 作业升级到新版本。适用场景：升级 Spark/Dataproc 版本（主版本、次版本或补丁版本）。示例提示词：“将项目 [project_id]、区域 [region] 中的 Dataproc 作业 [job_id] 升级到目标镜像版本 [target_version]。临时暂存路径：[gcs_staging_path]，目标 GCS 存储桶：[gcs_target_path]”。不适用场景：编写新的 Spark 代码；迁移非 Spark 工作负载（例如从 Hive/Flink 迁移到 Spark）。限制：此技能目前不支持数据/结果验证。",
  "Develops, optimizes and executes Spark code on Managed Spark on Google Cloud (Dataproc Clusters and Serverless). Reads and writes data using BigLake Iceberg catalogs, BigQuery and Spanner. Debugs execution failures. Use when: - Writing Spark ETL pipelines on Google Cloud Platform. - Optimizing PySpark or Spark SQL code for performance, memory, or OOM risks. - Preparing Spark workloads for production submission. - Training or running inference with Machine Learning models with spark on Google Cloud Platform. - Managing Spark clusters, jobs, batches, and interactive sessions. Don't use when: - Writing generic Python scripts that don't use Spark. - Performing simple SQL queries that can be done directly in BigQuery. - Troubleshooting failed Spark workloads or analyzing logs (use @skill:gcp-spark-troubleshooting).": "在 Google Cloud 托管式 Spark（Dataproc 集群与 Serverless）上开发、优化和执行 Spark 代码。使用 BigLake Iceberg 目录、BigQuery 和 Spanner 读写数据，并调试执行故障。适用场景：在 Google Cloud Platform 上编写 Spark ETL 流水线；针对性能、内存或 OOM 风险优化 PySpark 或 Spark SQL 代码；准备提交到生产环境的 Spark 工作负载；在 GCP 上使用 Spark 训练机器学习模型或运行推理；管理 Spark 集群、作业、批处理和交互式会话。不适用场景：编写不使用 Spark 的普通 Python 脚本；执行可直接在 BigQuery 中完成的简单 SQL 查询；排查失败的 Spark 工作负载或分析日志（请使用 @skill:gcp-spark-troubleshooting）。",
  "Provides expert guidance for troubleshooting Google Cloud Spark and Dataproc workloads (Dataproc Serverless batches and standard Dataproc clusters), and inspecting, streaming, searching, tailing, or summarizing Spark driver outputs and event logs in Cloud Storage. Use when the user asks to debug, troubleshoot, diagnose, or perform Root Cause Analysis (RCA) on failed Spark jobs, PySpark batches, or Spark event logs.": "提供排查 Google Cloud Spark 和 Dataproc 工作负载（Dataproc Serverless 批处理和标准 Dataproc 集群）故障的专家指导，并在 Cloud Storage 中检查、流式读取、搜索、跟踪或汇总 Spark 驱动程序输出与事件日志。当用户要求对失败的 Spark 作业、PySpark 批处理或 Spark 事件日志进行调试、故障排查、诊断或根因分析 (RCA) 时使用。",
  "Google platform decision and setup guidance, loaded on demand from Google's skill catalog. Use when a developer is choosing or setting up part of their stack, such as where to run a service, a database, storage, messaging, authentication, analytics, ads, or AI model serving, and a Google product is a reasonable candidate - whether or not a vendor is named - or when a request names a Google product or API. Brings in the matching Google skill so the answer can weigh Google options, their trade-offs, and when they are not the right fit. Skip when the stack is already settled on another provider and no Google product is named, or the task involves no platform choice.": "按需从 Google 技能目录加载的 Google 平台选型与设置指南。当开发者正在选择或配置其技术栈的一部分（例如服务运行位置、数据库、存储、消息队列、身份验证、分析、广告或 AI 模型服务）且 Google 产品是合理候选方案时（无论是否指明供应商），或者当请求中明确提到 Google 产品或 API 时使用。它会引入匹配的 Google 技能，以便在回答中权衡 Google 方案的优劣及不适用场景。如果技术栈已确定使用其他服务商且未提及任何 Google 产品，或者任务不涉及平台选型，请跳过。",
  "Provides safety-critical validation, guardrails, and data reduction for gcloud CLI operations across Google Cloud Platform (GCP) services and infrastructure. Use when planning, generating, constructing, proposing, describing, or executing any gcloud CLI commands - including when answering questions about gcloud syntax, or formatting flags. Don't use when writing Google Cloud client library code or raw REST/gRPC API requests.": "为跨 Google Cloud Platform (GCP) 服务和基础设施的 gcloud CLI 操作提供关键安全验证、护栏机制与数据精简。在规划、生成、构建、提议、描述或执行任何 gcloud CLI 命令（包括回答有关 gcloud 语法或格式化标志的问题）时使用。编写 Google Cloud 客户端库代码或原生 REST/gRPC API 请求时请勿使用。",
  "Provides expert guidance on Identity and Access Management (IAM) and authenticating and authorizing to Google Cloud services and APIs, covering human users, service identities, Application Default Credentials (ADC), and best practices for secure access.": "提供有关身份和访问管理 (IAM) 以及向 Google Cloud 服务与 API 进行身份验证和授权的专家指南，涵盖人类用户、服务身份、应用默认凭据 (ADC) 以及安全访问最佳实践。",
  "Guides a developer's first steps on Google Cloud, covering account creation, billing setup, project management, and deploying a first resource. Use when a new developer wants to initialize their first Google Cloud project, configure billing, and verify deployment. Don't use for enterprise organization setup (use Google Cloud Setup guided flow for that instead). Don't use for complex multi-project architectures.": "指导开发者迈出使用 Google Cloud 的第一步，涵盖账户创建、结算设置、项目管理以及部署首个资源。当新开发者想要初始化其首个 Google Cloud 项目、配置结算并验证部署时使用。请勿用于企业组织级设置（此类场景请改用 Google Cloud Setup 引导流程）或复杂的多项目架构。",
  "Routing map for the Google Cloud skill catalog.": "Google Cloud 技能目录的路由映射表。",
  "The Cloud Audit Manager remote MCP server allows you to enroll projects, generate audit and scope reports, and check resource enrollment statuses in the us-central1 region.": "Cloud Audit Manager 远程 MCP 服务允许您在 us-central1 区域注册项目、生成审计与范围报告，并检查资源注册状态。",
  "The Cloud Audit Manager remote MCP server allows you to enroll projects, generate audit and scope reports, and check resource enrollment statuses in the europe-west1 region.": "Cloud Audit Manager 远程 MCP 服务允许您在 europe-west1 区域注册项目、生成审计与范围报告，并检查资源注册状态。",
  "Let your agents talk to your Splunk data. Ask what broke, why, and what changed -- in plain English -- and agents search your events, surface the saved searches and lookups that matter, and write the SPL for you.": "让您的智能体直接与 Splunk 数据对话。用自然语言询问哪里出了故障、原因是什么以及发生了哪些变更——智能体会自动搜索您的事件、提取关键的已保存搜索和查找表，并为您编写 SPL 查询语句。",
  "The Wiz MCP Server connects multiple security data sources through a central host and server setup. This creates a single, contextual view of your security posture—simplifying investigations and speeding up incident response and remediation. Wiz MCP also gives users instant access to cloud inventory, configurations, and security issues, all through a single host with just a simple prompt. By using Wiz MCP, customers can enrich security investigations with precise business context. This allows security teams to prioritize responses based on relevance, drastically improving the accuracy and effectiveness of threat mitigation.": "Wiz MCP 服务通过集中式主机与服务端架构连接多个安全数据源，构建统一且具上下文关联的安全态势视图，从而简化调查流程并加速事件响应与修复。用户只需通过简单提示词，即可经由单一入口即时访问云资产清单、配置详情与安全问题。借助 Wiz MCP，安全团队可以利用精准的业务上下文丰富安全调查，按相关性排定响应优先级，大幅提升威胁缓解的准确性与成效。",
  "Manage your Neon backend with the Neon MCP Server: Lakebase Postgres, branching, Object Storage, Functions, and the AI Gateway": "使用 Neon MCP 服务管理您的 Neon 后端：涵盖 Lakebase Postgres、数据库分支、对象存储、云函数以及 AI 网关。",
  "Discover, manage, and audit organization policies and custom constraints across your Google Cloud resources using natural language.": "使用自然语言跨您的 Google Cloud 资源发现、管理和审计组织策略与自定义约束条件。",
  "Create, inspect, restrict, and manage the lifecycle of API keys in your Google Cloud projects using natural language.": "使用自然语言在您的 Google Cloud 项目中创建、检查、限制和管理 API 密钥的完整生命周期。",
  "Access Personalized Service Health events impacting Google Cloud products and services relevant to your projects using natural language.": "使用自然语言访问影响您项目相关 Google Cloud 产品与服务的个性化服务健康状态 (Personalized Service Health) 事件。",
  "The Unified Maintenance MCP server allows you to discover and query planned disruptive maintenance events across Google Cloud resources.": "Unified Maintenance（统一维护）MCP 服务允许您发现和查询跨 Google Cloud 资源的计划内中断性维护事件。",
  "Interact with your Neo4j graph database using natural language. This MCP server connects directly to your Neo4j instance to explore your graph schema, run read and write Cypher queries, and inspect nodes, relationships, and paths directly from your AI tools.": "使用自然语言与您的 Neo4j 图数据库交互。此 MCP 服务直接连接到您的 Neo4j 实例，支持从 AI 工具中探索图架构、执行读写 Cypher 查询，并检查节点、关系和路径。",
  "Author, run, and maintain mabl end-to-end tests from your AI tools. Connect to your mabl workspaces to generate and edit tests, trigger cloud or local runs, diagnose failures with AI analysis, and query results across environments — with every run and its evidence retained in mabl for auditability and compliance.": "在您的 AI 工具中编写、运行和维护 mabl 端到端测试。连接到您的 mabl 工作区以生成和编辑测试、触发云端或本地运行、利用 AI 分析诊断失败原因并跨环境查询结果——每次运行及其证据都会保留在 mabl 中，以满足审计与合规要求。",
  "Connect your Miro boards to AI assistants. This MCP server allows summarizing and searching boards, creating and updating board items (sticky notes, shapes, frames, connectors), generating Mermaid diagrams, and acting on board comments - all while respecting existing Miro permissions and access controls.": "将您的 Miro 白板连接到 AI 助手。此 MCP 服务支持总结和搜索白板、创建和更新白板元素（便签、形状、画框、连接线）、生成 Mermaid 图表以及处理白板评论——所有操作均严格遵循现有的 Miro 权限与访问控制。",
  "Search the live web and extract content from URLs directly in Antigravity. Parallel provides relevant search results and readable page content for your agent. Free to get started, with no API key required.": "直接在 Antigravity 中搜索实时网页并从网址提取内容。Parallel 可为您的智能体提供高相关性的搜索结果和易读的页面内容。免费开始使用，无需配置 API 密钥。",
  "The Grafana Cloud MCP server is a remotely hosted Model Context Protocol (MCP) server that lets external AI agents connect directly to your Grafana Cloud data. MCP-compatible clients can query metrics, logs, and other observability data from your Grafana environment without any local installation.": "Grafana Cloud MCP 服务是一个远程托管的模型上下文协议 (MCP) 服务端，允许外部 AI 智能体直接连接到您的 Grafana Cloud 数据。兼容 MCP 的客户端无需任何本地安装即可查询 Grafana 环境中的指标、日志及其他可观测性数据。",
  "Give your agent real-time web search and content retrieval. This MCP server connects to Exa's search API so you can run web searches, read full page content as clean markdown, and run multi-step research agents for list-building and enrichment directly from your AI tools.": "赋予您的智能体实时网页搜索与内容检索能力。此 MCP 服务连接到 Exa 搜索 API，让您可以直接从 AI 工具运行网页搜索、以整洁的 Markdown 格式读取完整页面内容，并运行多步研究智能体以构建和丰富数据列表。",
  "Use natural language to find hosts, review detections, search events, and perform other security operations across your Falcon environment. CrowdStrike MCP securely connects AI applications to Falcon platform capabilities through the Model Context Protocol (MCP).": "使用自然语言在您的 Falcon 环境中查找主机、审查检测告警、搜索事件并执行其他安全运营操作。CrowdStrike MCP 通过模型上下文协议 (MCP) 将 AI 应用安全地连接到 Falcon 平台功能。",
  "Interact with your Vercel projects using natural language. Vercel MCP allows AI tools to search Vercel documentation, inspect projects and deployments, analyze deployment and build logs, and manage supported Vercel resources securely.": "使用自然语言与您的 Vercel 项目交互。Vercel MCP 允许 AI 工具搜索 Vercel 文档、检查项目和部署状态、分析部署与构建日志，并安全地管理受支持的 Vercel 资源。",
  "Connect to FactSet AI-Ready Data to search and read institutional-grade financial data using natural language. This MCP server provides unified access to company fundamentals, consensus estimates, global prices, ownership, M&A transactions, debt capital structure, supply chain relationships, funds/ETFs, and unstructured content directly from your AI tools.": "连接到 FactSet AI-Ready Data，使用自然语言搜索和读取机构级金融数据。此 MCP 服务提供对公司基本面、一致预期、全球行情、股权结构、并购交易、债务资本结构、供应链关系、基金/ETF 及非结构化内容的统一访问。",
  "Stand up matters, shape workspace schema, govern access, and analyze usage in RelativityOne. This MCP server allows you to securely connect to your RelativityOne instance to search and locate content, create and edit matters, workspaces, and clients, manage user and group permissions, and generate usage reports using natural language.": "在 RelativityOne 中建立法律事务、定义工作区架构、管理访问权限并分析使用情况。此 MCP 服务允许您安全地连接到 RelativityOne 实例，使用自然语言搜索和定位内容、创建和编辑事务/工作区/客户、管理用户与群组权限以及生成用量报告。",
  "Connect to Daloopa to discover companies, series, get company fundamentals, search financial documents, and get stock prices. Access verified financial data and KPIs from SEC filings, investor presentations, and earnings reports with source traceability.": "连接到 Daloopa 以发现公司与数据序列、获取公司基本面、搜索财务文档并查询股票价格。从 SEC 申报文件、投资者演示文稿和财报中访问经过验证且可溯源的财务数据与关键绩效指标 (KPI)。",
  "Search and retrieve real-time financial and stock market data from Finnhub using natural language. This MCP server connects to your Finnhub account to access stock quotes, historical OHLCV candles, company profiles, standardized financial statements (balance sheets, income statements, cash flow), earnings call transcripts, analyst estimates and price targets, SEC filings, ETF and mutual fund holdings, forex, crypto, and economic indicators directly from your AI tools.": "使用自然语言从 Finnhub 搜索并获取实时金融与股票市场数据。此 MCP 服务连接到您的 Finnhub 账户，支持直接从 AI 工具访问股票报价、历史 OHLCV K 线、公司概况、标准化财务报表（资产负债表、利润表、现金流量表）、财报电话会议记录、分析师预测与目标价、SEC 申报文件、ETF 与共同基金持仓、外汇、加密货币以及宏观经济指标。",
  "Search and retrieve comprehensive financial and corporate data from S&P Global using natural language. This MCP server connects to S&P Global Market Intelligence (via Kensho) to query company profiles, identifiers (CUSIP, ISIN), financial statements (balance sheets, income statements, cash flows), historical stock prices, market capitalization, earnings call transcripts, M&A transactions, funding rounds, consensus analyst estimates, and executive profiles directly from your AI tools.": "使用自然语言从标普全球 (S&P Global) 搜索并获取全面的金融与企业数据。此 MCP 服务通过 Kensho 连接到 S&P Global Market Intelligence，支持直接从 AI 工具查询公司概况、证券标识符（CUSIP、ISIN）、财务报表（资产负债表、利润表、现金流量表）、历史股价、市值、财报电话会议记录、并购交易、融资轮次、分析师一致预期以及高管履历。",
  "Explore deep global markets data and financial analytics from LSEG (London Stock Exchange Group). This MCP server connects your AI tools to LSEG Financial Analytics (LFA) to price bonds and bond futures, analyze yield and credit curves, evaluate FX spot and forward carry trades, value options with full Greeks, and access IBES consensus estimates, company fundamentals, historical pricing, and macroeconomic indicators.": "探索来自伦敦证券交易所集团 (LSEG) 的深度全球市场数据与金融分析。此 MCP 服务将您的 AI 工具连接到 LSEG Financial Analytics (LFA)，用于对债券和债券期货定价、分析收益率与信用曲线、评估外汇即期和远期套息交易、结合完整希腊字母 (Greeks) 对期权估值，并访问 IBES 一致预期、公司基本面、历史价格与宏观经济指标。",
  "Bring Harvey's legal intelligence into your AI tools for general legal inquiries, Vault project analysis, and specialized knowledge source research. The Harvey MCP server lets you ask general legal questions, analyze documents in your Vault projects, and query specialized legal research knowledge sources.": "将 Harvey 的法律智能引入您的 AI 工具，支持通用法律咨询、Vault 项目分析以及专业知识库研究。通过 Harvey MCP 服务，您可以提出各类法律问题、分析 Vault 项目中的文档，并查询专业法律研究知识源。",
  "Search Guidepoint's expert network for interview transcripts, browse curated event catalogs, and retrieve your personal event schedule. This MCP server also allows you to manage your event participation by registering for, requesting approval for, or canceling upcoming Guidepoint events directly from your AI tools.": "在 Guidepoint 专家网络中搜索访谈记录、浏览精选活动目录并获取您的个人活动日程。此 MCP 服务还支持直接通过 AI 工具注册、申请批准或取消即将举行的 Guidepoint 活动，轻松管理您的参会安排。",
  "Access institutional-grade financial data in your AI tools, delivering fundamentals, ratios, KPIs, segments, adjusted metrics, SEC filings, earnings calls, and market quotes within minutes of earnings.": "在您的 AI 工具中访问机构级金融数据，在财报发布后数分钟内即可获取基本面、财务比率、KPI、业务分部、调整后指标、SEC 申报文件、财报电话会议记录及市场报价。",
  "Connect with your Docusign account using natural language. This MCP server allows you to search and locate Docusign envelopes, templates, and documents, read item details and metadata, create and update envelopes, and trigger or cancel workflow instances directly from your AI tools.": "使用自然语言连接您的 Docusign 账户。此 MCP 服务允许您直接从 AI 工具搜索和定位 Docusign 信封、模板与文档，读取项目详情和元数据，创建和更新信封，以及触发或取消工作流实例。",
  "LegalZoom's MCP connector gives users instant access to legal product information, business formation guidance, and on-demand attorney consultations, all without leaving the conversation.": "LegalZoom 的 MCP 连接器让用户无需离开当前对话，即可即时获取法律产品信息、企业注册成立指南以及按需律师咨询服务。",
  "Search and retrieve documents from your NetDocuments repository using natural language. This MCP server allows AI tools to securely search documents and emails, filter by metadata, and read document contents and details while respecting your existing NetDocuments permissions and governance controls.": "使用自然语言从您的 NetDocuments 存储库中搜索和检索文档。此 MCP 服务允许 AI 工具在严格遵循现有 NetDocuments 权限与治理控制的前提下，安全地搜索文档和电子邮件、按元数据筛选并读取文档内容与详情。",
  "Interact with your iManage Work platform using natural language. This MCP server connects to your iManage account to search workspaces, folders, and documents, inspect document profiles and version histories, read document contents, and manage legal and knowledge work workflows directly from your AI tools.": "使用自然语言与您的 iManage Work 平台交互。此 MCP 服务连接到您的 iManage 账户，支持直接从 AI 工具搜索工作区、文件夹和文档，检查文档属性与版本历史，读取文档内容，并管理法律与知识工作流。",
  "Search and manage Salesforce records from your Salesforce remote MCP server. Connect to your Salesforce instance to search across objects (SOSL), execute SOQL queries, inspect object schemas, traverse related records, and create, update, or delete records.": "通过 Salesforce 远程 MCP 服务搜索和管理 Salesforce 记录。连接到您的 Salesforce 实例以跨对象搜索 (SOSL)、执行 SOQL 查询、检查对象架构、遍历关联记录，以及创建、更新或删除记录。",
  "Civil legal guidance for people navigating court without a lawyer. This MCP server provides educational guidance for self-represented litigants in U.S. civil legal matters across all 50 states, including case intake assessments, procedural deadline calculations, and prioritized next-step guidance directly from your AI tools.": "面向无律师代理出庭人士的民事法律指南。此 MCP 服务为美国全部 50 个州民事法律事务中的自行诉讼当事人提供教育性指导，支持直接从 AI 工具进行案件受理评估、程序期限计算以及按优先级排序的后续步骤指引。",
  "Intelligent DevSecOps automation for your development workflow, powered by natural language. Connects your AI coding agent (Antigravity) to 150+ integrated DevOps tools via MCP — security scanning, pipeline generation, compliance auditing, and documentation, all via plain-English commands without leaving the IDE. Source code analysis runs locally; only structured results are returned to the portal.": "由自然语言驱动的智能 DevSecOps 开发工作流自动化。通过 MCP 将您的 AI 编码智能体 (Antigravity) 连接到 150 多种集成的 DevOps 工具——无需离开 IDE，即可通过自然语言指令完成安全扫描、流水线生成、合规审计和文档编写。源代码分析在本地运行，仅向门户返回结构化结果。",
  "Forge is an AI-powered platform that automates the earliest, most time-consuming phase of software development — the \"Day 0\" planning that typically takes weeks of meetings, documents, and back-and-forth. Exposes project/repo linking, PRD/BRD/architecture artifact retrieval, work-order management, commit/PR automation, and CI/CD pipeline tools directly to your AI coding agent.": "Forge 是一个由 AI 驱动的平台，可自动化软件开发中最早期、最耗时的“第 0 天 (Day 0)”规划阶段（通常需要数周的会议、文档编写和反复沟通）。它可将项目/仓库关联、PRD/BRD/架构产物检索、工单管理、提交/PR 自动化以及 CI/CD 流水线工具直接暴露给您的 AI 编码智能体。",
  "Bring Endor Labs security into your AI tools. With this MCP server, you can check dependency safety before adding a new package, scan your open source dependencies for vulnerabilities and malware, find leaked secrets accidentally committed in your Git history, run static analysis (SAST) on your code, and perform AI security reviews on your code changes.": "将 Endor Labs 安全能力引入您的 AI 工具。借助此 MCP 服务，您可以在添加新软件包前检查依赖项安全性、扫描开源依赖项中的漏洞和恶意软件、查找 Git 历史记录中意外提交的泄露密钥、对代码运行静态分析 (SAST)，并对代码更改执行 AI 安全审查。",
  "The Canva MCP server enables AI assistants to seamlessly interact with Canva's design capabilities. By exposing Canva's capabilities (including design creation and editing, asset and brand management, library search, export, and commenting) as MCP-compatible tools, you can give your users access to Canva's design capabilities through natural language, directly from the AI tools they already use.": "Canva MCP 服务使 AI 助手能够与 Canva 的设计功能无缝交互。通过将 Canva 的各项能力（包括设计创建与编辑、素材与品牌管理、图库搜索、导出及评论）暴露为兼容 MCP 的工具，用户可以直接在常用的 AI 工具中通过自然语言使用 Canva 的设计能力。",
  "Looker Base URL": "Looker 基础 URL",
  "The URL of your Looker instance.": "您的 Looker 实例 URL。",
  "Looker Client ID": "Looker 客户端 ID (Client ID)",
  "The client ID for the Looker API.": "用于 Looker API 的客户端 ID。",
  "Looker Client Secret": "Looker 客户端密钥 (Client Secret)",
  "The client secret for the Looker API.": "用于 Looker API 的客户端密钥。",
  "Looker Verify SSL": "Looker 验证 SSL",
  "Whether to verify SSL certificates.": "是否验证 SSL 证书。",
  "Looker Use Client OAuth": "Looker 使用客户端 OAuth",
  "Whether to use OAuth for authentication.": "是否使用 OAuth 进行身份验证。",
  "Looker Show Hidden Models": "Looker 显示隐藏模型",
  "Whether to show hidden models.": "是否显示隐藏的模型。",
  "Looker Show Hidden Explores": "Looker 显示隐藏探索 (Explores)",
  "Whether to show hidden explores.": "是否显示隐藏的探索视图。",
  "Looker Show Hidden Fields": "Looker 显示隐藏字段",
  "Whether to show hidden fields.": "是否显示隐藏的字段。",
  "Tools Config Path": "工具配置文件路径",
  "The absolute path to the tools configuration file (e.g. /path/to/tools.yaml).": "工具配置文件的绝对路径（例如 /path/to/tools.yaml）。",
  "Oracle Database Host": "Oracle 数据库主机",
  "The host of your Oracle Database.": "您的 Oracle 数据库主机地址。",
  "Oracle Database Port": "Oracle 数据库端口",
  "The port of your Oracle Database.": "您的 Oracle 数据库端口号。",
  "Oracle Database Service Name": "Oracle 数据库服务名称",
  "The service name of your Oracle Database.": "您的 Oracle 数据库服务名称。",
  "Oracle Database User": "Oracle 数据库用户名",
  "The database username.": "数据库用户名。",
  "Oracle Database Password": "Oracle 数据库密码",
  "The password for the database user.": "数据库用户的密码。",
  "GitHub Token": "GitHub 令牌 (Token)",
  "Stripe secret key": "Stripe 密钥 (Secret Key)",
  "Your Stripe secret key is used to authenticate your Stripe API requests. You can generate a secret key in your Stripe dashboard.": "您的 Stripe 密钥用于对 Stripe API 请求进行身份验证。您可以在 Stripe 控制台中生成密钥。",
  "Redis URL": "Redis 连接 URL",
  "The URL of the Redis database. Format: redis://user:password@host:port": "Redis 数据库的 URL。格式：redis://user:password@host:port",
  "Connection string": "连接字符串 (Connection String)",
  "MongoDB connection string for direct database connections (optional users may choose to inform it on every tool call).": "用于直接连接数据库的 MongoDB 连接字符串（可选，用户也可以选择在每次工具调用时提供）。",
  "Notion API Token": "Notion API 令牌",
  "Integration token from Notion. Go to https://www.notion.so/profile/integrations to create a new internal integration or select an existing one.": "来自 Notion 的集成令牌。请前往 https://www.notion.so/profile/integrations 创建新的内部集成或选择现有集成。",
  "Perplexity API Key": "Perplexity API 密钥",
  "Your Perplexity Sonar API key for web search capabilities.": "用于网页搜索功能的 Perplexity Sonar API 密钥。",
  "PayPal Access Token": "PayPal 访问令牌 (Access Token)",
  "Your PayPal API access token generated using your client ID and client secret.": "使用您的客户端 ID 和客户端密钥生成的 PayPal API 访问令牌。",
  "PayPal Environment": "PayPal 环境",
  "Execution environment for PayPal integration. Use `SANDBOX` for testing or `PRODUCTION` for live transactions.": "PayPal 集成的运行环境。测试请使用 `SANDBOX`，正式交易请使用 `PRODUCTION`。",
  "Heroku API Key": "Heroku API 密钥",
  "Your Heroku authentication token. Generate one using 'heroku authorizations:create' or through the Heroku Dashboard.": "您的 Heroku 身份验证令牌。可使用 'heroku authorizations:create' 命令或通过 Heroku 控制台生成。",
  "Pinecone API Key": "Pinecone API 密钥",
  "Your Pinecone API key. Generate one using the Pinecone console.": "您的 Pinecone API 密钥。可在 Pinecone 控制台中生成。",
  "Locofy Personal Access Token": "Locofy 个人访问令牌",
  "Your Locofy Personal Access Token. Generate it from your Locofy account settings.": "您的 Locofy 个人访问令牌。可在 Locofy 账户设置中生成。",
  "Locofy Project ID": "Locofy 项目 ID",
  "The ID of the Locofy project for the MCP server to interact with.": "供 MCP 服务交互的 Locofy 项目 ID。",
  "Airweave API Key": "Airweave API 密钥",
  "Your Airweave API Key": "您的 Airweave API 密钥",
  "Airweave Collection ID": "Airweave 集合 ID (Collection ID)",
  "Your Airweave Collection ID": "您的 Airweave 集合 ID",
  "Airweave Base URL": "Airweave 基础 URL",
  "The base URL for the Airweave API": "Airweave API 的基础 URL",
  "Harness API Key": "Harness API 密钥",
  "Harness personal access token or service account token. Create one from Harness → My Profile → API Keys.": "Harness 个人访问令牌或服务账户令牌。可通过 Harness → 我的个人资料 (My Profile) → API 密钥 (API Keys) 创建。",
  "SonarQube Token": "SonarQube 令牌",
  "Your SonarQube Cloud or Server token": "您的 SonarQube Cloud 或 Server 令牌",
  "SonarQube Organization Key": "SonarQube 组织标识 (Organization Key)",
  "Your SonarQube Cloud organization key (only for SonarCloud)": "您的 SonarQube Cloud 组织标识（仅适用于 SonarCloud）",
  "SonarQube Server URL": "SonarQube 服务器 URL",
  "URL of your self-hosted SonarQube Server (only for SonarQube Server)": "您自托管的 SonarQube 服务器 URL（仅适用于 SonarQube Server）",
  "Netlify Personal Access Token (optional)": "Netlify 个人访问令牌（可选）",
  "Optional Netlify personal access token used for authentication when automatic browser login is not possible.": "可选的 Netlify 个人访问令牌，用于在无法通过浏览器自动登录时进行身份验证。",
  "Sonatype Guide Bearer Token": "Sonatype Guide Bearer 令牌",
  "Your Sonatype Guide User Token is used to authenticate your requests to the Sonatype Guide MCP server. You can generate a token in your Sonatype Guide Settings > Tokens.": "您的 Sonatype Guide 用户令牌用于对发往 Sonatype Guide MCP 服务的请求进行身份验证。您可以在 Sonatype Guide 设置 > 令牌 (Settings > Tokens) 中生成令牌。",
  "Postman API Key": "Postman API 密钥",
  "Your Postman API Key (begins with PMAK-)": "您的 Postman API 密钥（以 PMAK- 开头）",
  "Stitch API Key": "Stitch API 密钥",
  "Your Stitch API Key. Create one in the Stitch UI (https://stitch.withgoogle.com/settings)": "您的 Stitch API 密钥。可在 Stitch 界面 (https://stitch.withgoogle.com/settings) 中创建。",
  "Neo4j Connection URI": "Neo4j 连接 URI",
  "The Bolt connection URI for your Neo4j instance (e.g. \"bolt://localhost:7687\" for a local/Desktop database, or \"neo4j+s://<dbid>.databases.neo4j.io\" for an Aura instance).": "您的 Neo4j 实例的 Bolt 连接 URI（例如本地/桌面数据库使用 \"bolt://localhost:7687\"，或 Aura 实例使用 \"neo4j+s://<dbid>.databases.neo4j.io\"）。",
  "Neo4j Username": "Neo4j 用户名",
  "The username for authentication to the Neo4j database.": "用于 Neo4j 数据库身份验证的用户名。",
  "Neo4j Password": "Neo4j 密码",
  "The password for authentication to the Neo4j database.": "用于 Neo4j 数据库身份验证的密码。",
  "Neo4j Database Name": "Neo4j 数据库名称",
  "The name of the database to connect to (e.g. \"neo4j\").": "要连接的数据库名称（例如 \"neo4j\"）。",
  "Neo4j Read Only": "Neo4j 只读模式",
  "Set to \"true\" to restrict queries to read-only operations, or \"false\" to allow write queries.": "设置为 \"true\" 可将查询限制为只读操作，设置为 \"false\" 则允许写入查询。",
  "Exa API Key": "Exa API 密钥",
  "Your Exa API key, created at https://dashboard.exa.ai/api-keys.": "您在 https://dashboard.exa.ai/api-keys 创建的 Exa API 密钥。",
  "Falcon Client ID": "Falcon 客户端 ID (Client ID)",
  "CrowdStrike Falcon API Client ID.": "CrowdStrike Falcon API 客户端 ID。",
  "Falcon Client Secret": "Falcon 客户端密钥 (Client Secret)",
  "CrowdStrike Falcon API Client Secret.": "CrowdStrike Falcon API 客户端密钥。",
  "Falcon Base URL": "Falcon 基础 URL",
  "The API base URL for your Falcon cloud region (e.g., https://api.crowdstrike.com for US-1, https://api.us-2.crowdstrike.com for US-2, https://api.eu-1.crowdstrike.com for EU-1).": "您所在 Falcon 云区域的 API 基础 URL（例如 US-1 为 https://api.crowdstrike.com，US-2 为 https://api.us-2.crowdstrike.com，EU-1 为 https://api.eu-1.crowdstrike.com）。",
  "RelativityOne Base URL": "RelativityOne 基础 URL",
  "The base URL of your RelativityOne instance. Must start with https:// and have no trailing slash (e.g., https://<tenant>.r1.kcura.com or https://<your-domain>.relativity.one).": "您的 RelativityOne 实例基础 URL。必须以 https:// 开头且末尾不带斜杠（例如 https://<tenant>.r1.kcura.com 或 https://<your-domain>.relativity.one）。",
  "Client ID for your Relativity Integration": "Relativity 集成的客户端 ID",
  "The OAuth 2.0 Client ID for your RelativityOne integration (configured with PKCE and UserInfoAccess, offline_access scopes).": "用于您的 RelativityOne 集成的 OAuth 2.0 客户端 ID（需配置 PKCE 以及 UserInfoAccess、offline_access 权限范围）。",
  "Daloopa API Key": "Daloopa API 密钥",
  "Your Daloopa API Key. Generate one from your Daloopa account settings.": "您的 Daloopa API 密钥。可在您的 Daloopa 账户设置中生成。",
  "Harvey API Token": "Harvey API 令牌",
  "Your Harvey API Token used to authenticate requests to the Harvey MCP server. You can generate or retrieve your token from your Harvey settings.": "用于对发往 Harvey MCP 服务的请求进行身份验证的 Harvey API 令牌。您可以在 Harvey 设置中生成或获取令牌。",
  "Forge API Token": "Forge API 令牌",
  "Your Forge API token used to authenticate with the MCP server.": "用于与 MCP 服务进行身份验证的 Forge API 令牌。",
  "Endor Labs Namespace": "Endor Labs 命名空间 (Namespace)",
  "(Optional) Your Endor Labs tenant namespace. Required for Enterprise Edition only; the free Developer Edition runs with no configuration.": "（可选）您的 Endor Labs 租户命名空间。仅企业版需要填写；免费开发者版无需配置即可运行。",
  "Authentication Mode": "身份验证模式",
  "(Optional) Enterprise Edition authentication method: \"github\", \"gitlab\", \"google\", or \"sso\". A browser window opens automatically on first use to complete authentication.": "（可选）企业版身份验证方式：\"github\"、\"gitlab\"、\"google\" 或 \"sso\"。首次使用时将自动打开浏览器窗口以完成身份验证。",
  "SSO Tenant": "SSO 租户名称",
  "(Optional) SSO tenant name. Only needed when the authentication mode is \"sso\".": "（可选）SSO 租户名称。仅当身份验证模式为 \"sso\" 时需要填写。",
  "Clicks on the provided element": "点击指定的页面元素。",
  "Closes the page by its index. The last open page cannot be closed.": "按索引关闭页面。最后一个打开的页面无法关闭。",
  "Drag an element onto another element": "将一个元素拖拽到另一个元素上。",
  "Emulates various features on the target page.": "在目标页面上模拟各种设备或网络特性。",
  "Emulates various features on the selected page.": "在当前选中的页面上模拟各种设备或网络特性。",
  "Evaluate a JavaScript function inside the target page. Returns the response as JSON, so returned values have to be JSON-serializable.": "在目标页面内执行 JavaScript 函数。响应以 JSON 格式返回，因此返回值必须可序列化为 JSON。",
  "Evaluate a JavaScript function inside the currently selected page. Returns the response as JSON, so returned values have to be JSON-serializable.": "在当前选中的页面内执行 JavaScript 函数。响应以 JSON 格式返回，因此返回值必须可序列化为 JSON。",
  "Type text into an input, text area or select an option from a <select> element.": "向输入框、文本域输入文本，或从 <select> 下拉元素中选择一个选项。",
  "Fill out multiple form elements (inputs, selects, checkboxes, radios) at once. ALWAYS prefer this tool over multiple individual 'fill' or 'click' calls when interacting with forms. It is significantly faster, more reliable, and reduces turn count. Example: Fill username, password, and check \"Remember Me\" in one call.": "一次性填写多个表单元素（输入框、下拉框、复选框、单选框）。在与表单交互时，请始终优先使用此工具，而非多次单独调用 'fill' 或 'click'。它速度更快、更可靠，并能减少交互轮次。示例：在一次调用中填写用户名、密码并勾选“记住我”。",
  "Gets a console message by its ID. You can get all messages by calling list_console_messages.": "按 ID 获取控制台消息。您可以通过调用 list_console_messages 获取所有消息。",
  "Retrieve matched CSS rules, inline styles, inherited styles, and cascade information for an element identified by its UID. Use this tool to debug why specific CSS properties are applied, overridden, or conflicting. Results are paginated and return 10 rules per page by default; use pageIdx to page through the remaining rules. Requires a UID from take_snapshot.": "根据元素的 UID 获取匹配的 CSS 规则、内联样式、继承样式和层叠信息。使用此工具可调试特定 CSS 属性为何生效、被覆盖或发生冲突。结果默认分页（每页返回 10 条规则），可使用 pageIdx 翻页。需要来自 take_snapshot 的 UID。",
  "Gets a network request by an optional reqid, if omitted returns the currently selected request in the DevTools Network panel. Useful for inspecting request headers (including 'Cookie') and response headers (including 'Set-Cookie' and directives).": "通过可选的 reqid 获取网络请求，若省略则返回 DevTools 网络面板中当前选中的请求。适用于检查请求头（包括 'Cookie'）和响应头（包括 'Set-Cookie' 及指令）。",
  "Gets a network request by an optional reqid, if omitted returns the currently selected request in the DevTools Network panel.": "通过可选的 reqid 获取网络请求，若省略则返回 DevTools 网络面板中当前选中的请求。",
  "If a browser dialog was opened, use this command to handle it": "如果浏览器弹出了对话框，使用此命令进行处理。",
  "Hover over the provided element": "将鼠标悬停在指定的元素上。",
  "Get Lighthouse score and reports for accessibility, SEO, best practices, and agentic browsing. This excludes performance. For performance audits, run performance_start_trace": "获取无障碍访问 (Accessibility)、SEO、最佳实践和智能体浏览的 Lighthouse 评分与报告（不包含性能项；如需性能审计，请运行 performance_start_trace）。",
  "List all console messages for the target page since the last navigation.": "列出目标页面自上次导航以来的所有控制台消息。",
  "List all console messages for the currently selected page since the last navigation.": "列出当前选中页面自上次导航以来的所有控制台消息。",
  "Lists the most recent requests for the target page since the last navigation.": "列出目标页面自上次导航以来的最新网络请求。",
  "List all requests for the currently selected page since the last navigation.": "列出当前选中页面自上次导航以来的所有网络请求。",
  "Get a list of pages open in the browser.": "获取浏览器中当前打开的页面列表。",
  "Go to a URL, or back, forward, or reload. Use project URL if not specified otherwise.": "跳转到指定 URL，或执行后退、前进、重新加载。若未另行指定，则使用项目 URL。",
  "Open a new tab and load a URL. Use project URL if not specified otherwise.": "打开新标签页并加载 URL。若未另行指定，则使用项目 URL。",
  "Provides more detailed information on a specific Performance Insight of an insight set that was highlighted in the results of a trace recording.": "提供在性能追踪记录结果中高亮显示的特定性能洞察 (Performance Insight) 的详细信息。",
  "Start a performance trace on the target webpage. Use to find frontend performance issues, Core Web Vitals (LCP, INP, CLS), and improve page load speed.": "在目标网页上启动性能追踪。用于排查前端性能问题、核心网页指标 (LCP、INP、CLS) 并提升页面加载速度。",
  "Start a performance trace on the selected webpage. Use to find frontend performance issues, Core Web Vitals (LCP, INP, CLS), and improve page load speed.": "在选中的网页上启动性能追踪。用于排查前端性能问题、核心网页指标 (LCP、INP、CLS) 并提升页面加载速度。",
  "Stop the active performance trace recording on the target webpage.": "停止目标网页上正在进行的性能追踪记录。",
  "Stop the active performance trace recording on the selected webpage.": "停止选中网页上正在进行的性能追踪记录。",
  "Press a key or key combination. Use this when other input methods like fill() cannot be used (e.g., keyboard shortcuts, navigation keys, or special key combinations).": "按下按键或组合键。当无法使用 fill() 等其他输入方式时使用（例如键盘快捷键、导航键或特殊组合键）。",
  "Resizes the page's window so that the page has specified dimension": "调整页面窗口大小，使页面具有指定的尺寸。",
  "Resizes the selected page's window so that the page has specified dimension": "调整选中页面的窗口大小，使其具有指定的尺寸。",
  "Select a page as a context for future tool calls.": "选择一个页面作为后续工具调用的上下文。",
  "Capture a heap snapshot of the target page. Use to analyze the memory distribution of JavaScript objects and debug memory leaks.": "捕获目标页面的堆内存快照 (Heap Snapshot)。用于分析 JavaScript 对象的内存分布并调试内存泄漏。",
  "Capture a heap snapshot of the currently selected page. Use to analyze the memory distribution of JavaScript objects and debug memory leaks.": "捕获当前选中页面的堆内存快照 (Heap Snapshot)。用于分析 JavaScript 对象的内存分布并调试内存泄漏。",
  "Take a screenshot of the page or element.": "对页面或指定元素进行截图。",
  "Take a text snapshot of the target page based on the a11y tree. The snapshot lists page elements along with a unique identifier (uid). Always use the latest snapshot. Prefer taking a snapshot over taking a screenshot. The snapshot indicates the element selected in the DevTools Elements panel (if any).": "基于无障碍树 (a11y tree) 获取目标页面的文本快照。快照会列出页面元素及其唯一标识符 (uid)。请始终使用最新快照，并优先使用文本快照而非截图。快照还会标出 DevTools 元素面板中当前选中的元素（若有）。",
  "Take a text snapshot of the currently selected page based on the a11y tree. The snapshot lists page elements along with a unique identifier (uid). Always use the latest snapshot. Prefer taking a snapshot over taking a screenshot. The snapshot indicates the element selected in the DevTools Elements panel (if any).": "基于无障碍树 (a11y tree) 获取当前选中页面的文本快照。快照会列出页面元素及其唯一标识符 (uid)。请始终使用最新快照，并优先使用文本快照而非截图。快照还会标出 DevTools 元素面板中当前选中的元素（若有）。",
  "Type text using keyboard into a previously focused input": "使用键盘向已获得焦点的输入框中输入文本。",
  "Upload a file through a provided element.": "通过指定的元素上传文件。",
  "Wait for the specified text to appear on the selected page.": "等待指定文本出现在选中的页面上。",
  "Starts recording a screencast (video) of the selected page in specified format.": "开始以指定格式录制选中页面的屏幕录像（视频）。",
  "Stops the active screencast recording on the selected page.": "停止选中页面上正在进行的屏幕录像。",
  "Adds one or more project roots. Tools are only allowed to run under these roots, so you must call this function before passing any roots to any other tools.": "添加一个或多个项目根目录。所有工具仅允许在这些根目录下运行，因此在向其他工具传递任何根目录之前必须先调用此函数。",
  "Analyzes specific paths, or the entire project, for errors.": "分析指定路径或整个项目中的代码错误。",
  "Connects to the Dart Tooling Daemon. You should get the uri either from available tools or the user, do not just make up a random URI to pass. When asking the user for the uri, you should suggest the \"Copy DTD Uri to clipboard\" action. When reconnecting after losing a connection, always request a new uri first.": "连接到 Dart 工具守护进程 (Dart Tooling Daemon)。您应当从可用工具或用户处获取 URI，切勿凭空编造随机 URI。向用户索取 URI 时，建议提示用户执行“Copy DTD Uri to clipboard”操作。连接断开后重新连接时，请务必先请求新的 URI。",
  "Creates a new Dart or Flutter project.": "创建一个新的 Dart 或 Flutter 项目。",
  "Runs `dart fix --apply` for the given project roots.": "对给定的项目根目录运行 `dart fix --apply` 自动修复。",
  "Runs `dart format .` for the given project roots.": "对给定的项目根目录运行 `dart format .` 代码格式化。",
  "Run a flutter driver command": "运行 Flutter Driver 命令。",
  "Retrieves the current active location (e.g., cursor position) in the connected editor. Requires \"connect_dart_tooling_daemon\" to be successfully called first.": "获取已连接编辑器中的当前活动位置（如光标位置）。需要先成功调用 \"connect_dart_tooling_daemon\"。",
  "Returns the collected logs for a given flutter run process id. Can only retrieve logs started by the launch_app tool.": "返回指定 flutter run 进程 ID 收集到的日志。仅能获取由 launch_app 工具启动的应用日志。",
  "Retrieves the most recent runtime errors that have occurred in the active Dart or Flutter application. Requires \"connect_dart_tooling_daemon\" to be successfully called first.": "获取当前活动的 Dart 或 Flutter 应用中最近发生的运行时错误。需要先成功调用 \"connect_dart_tooling_daemon\"。",
  "Retrieves the selected widget from the active Flutter application. Requires \"connect_dart_tooling_daemon\" to be successfully called first.": "从当前活动的 Flutter 应用中获取选中的 Widget 组件。需要先成功调用 \"connect_dart_tooling_daemon\"。",
  "Retrieves the widget tree from the active Flutter application. Requires \"connect_dart_tooling_daemon\" to be successfully called first.": "从当前活动的 Flutter 应用中获取 Widget 组件树。需要先成功调用 \"connect_dart_tooling_daemon\"。",
  "Performs a hot reload of the active Flutter application. This will apply the latest code changes to the running application, while maintaining application state. Reload will not update const definitions of global values. Requires \"connect_dart_tooling_daemon\" to be successfully called first.": "对当前活动的 Flutter 应用执行热重载 (Hot Reload)。这会将最新代码更改应用到运行中的应用并保留应用状态（不会更新全局 const 常量定义）。需要先成功调用 \"connect_dart_tooling_daemon\"。",
  "Performs a hot restart of the active Flutter application. This applies the latest code changes to the running application, including changes to global const values, while resetting application state. Requires \"connect_dart_tooling_daemon\" to be successfully called first. Doesn't work for Non-Flutter Dart CLI programs.": "对当前活动的 Flutter 应用执行热重启 (Hot Restart)。这会将最新代码更改（包括全局 const 常量更改）应用到运行中的应用并重置应用状态。需要先成功调用 \"connect_dart_tooling_daemon\"。不适用于非 Flutter 的 Dart CLI 程序。",
  "Get hover information at a given cursor position in a file. This can include documentation, type information, etc for the text at that position.": "获取文件中指定光标位置处的悬停提示信息（包括该位置文本的文档说明、类型信息等）。",
  "Launches a Flutter application and returns its DTD URI.": "启动 Flutter 应用并返回其 DTD URI。",
  "Lists available Flutter devices.": "列出可用的 Flutter 设备。",
  "Returns the list of running app process IDs and associated DTD URIs for apps started by the launch_app tool.": "返回由 launch_app 工具启动的正在运行的应用进程 ID 及其关联的 DTD URI 列表。",
  "Runs a pub command for the given project roots, like `dart pub get` or `flutter pub add`.": "对给定的项目根目录运行 pub 命令，例如 `dart pub get` 或 `flutter pub add`。",
  "Searches pub.dev for packages relevant to a given search query. The response will describe each result with its download count, package description, topics, license, and publisher.": "在 pub.dev 中搜索与给定查询相关的软件包。响应将包含每个结果的下载量、包描述、主题标签、许可证和发布者信息。",
  "Reads \"package\" scheme URIs which represent paths under the lib directory of Dart package dependencies. Package uris are always relative, and the first segment is the package name. For example, the URI \"package:test/test.dart\" represents the path \"lib/test.dart\" under the \"test\" package. This API supports both reading files and listing directories.": "读取代表 Dart 包依赖项 lib 目录下路径的 \"package\" 协议 URI。Package URI 始终是相对路径，第一段为包名（例如 \"package:test/test.dart\" 代表 \"test\" 包下的 \"lib/test.dart\"）。此 API 同时支持读取文件和列出目录。",
  "Removes one or more project roots previously added via the add_roots tool.": "移除之前通过 add_roots 工具添加的一个或多个项目根目录。",
  "Look up a symbol or symbols in all workspaces by name. Can be used to validate that a symbol exists or discover small spelling mistakes, since the search is fuzzy.": "按名称在所有工作区中查找符号。支持模糊搜索，可用于验证符号是否存在或发现轻微的拼写错误。",
  "Run Dart or Flutter tests with an agent centric UX. ALWAYS use instead of `dart test` or `flutter test` shell commands.": "以面向智能体的交互体验运行 Dart 或 Flutter 测试。请始终使用此工具代替 `dart test` 或 `flutter test` 终端命令。",
  "Enables or disables widget selection mode in the active Flutter application. Requires \"connect_dart_tooling_daemon\" to be successfully called first. This is not necessary when using flutter driver, only use it when you want the user to select a widget.": "在当前活动的 Flutter 应用中启用或禁用 Widget 选择模式。需要先成功调用 \"connect_dart_tooling_daemon\"。使用 flutter driver 时无需开启此项，仅在需要让用户手动选择 Widget 时使用。",
  "Get signature help for an API being used at a given cursor position in a file.": "获取文件中指定光标位置处正在使用的 API 的函数签名帮助。",
  "Kills a running Flutter process started by the launch_app tool.": "终止由 launch_app 工具启动的正在运行的 Flutter 进程。",
  "Performs a web search using the DuckDuckGo, ideal for general queries, news, articles, and online content. Use this for broad information gathering, recent events, or when you need diverse web sources. Supports content filtering and region-specific searches. Maximum 20 results per request.": "使用 DuckDuckGo 执行网页搜索，非常适合通用查询、新闻、文章和在线内容检索。可用于广泛的信息收集、近期事件查询或获取多样化的网络来源。支持内容过滤和按地区搜索，每次请求最多返回 20 条结果。",
  "(Optional)": "（可选）",
  "(Optional, defaults to main)": "（可选，默认为 main）",
  "(Specific to this client's truncation and pagination)": "（特定于此客户端的截断与分页设置）",
  "(Enter)": "(Enter)",
  "(Intent Only)": "（仅意图）",
  "(Press 'Enter' to confirm or 'Escape' to cancel)": "（按 Enter 确认，或按 Escape 取消）",
  "/ 1M tokens": "/ 百万 Token",
  "2x playback speed": "2 倍播放速度",
  "A Google Cloud project is required to use Antigravity.": "使用 Antigravity 需要关联 Google Cloud 项目。",
  "A license or project selection is required to use Antigravity.": "使用 Antigravity 需要选择许可证或项目。",
  "A comma-separated list like org-a, org-b, or * for all.": "以逗号分隔的列表（如 org-a, org-b），或填 * 代表全部。",
  "A comma-separated list like repo-a, repo-b, or * for all.": "以逗号分隔的列表（如 repo-a, repo-b），或填 * 代表全部。",
  "ABFS Dogfood chat": "ABFS 内部测试对话",
  "ABFS is required to create ABFS workspaces. Please visit": "创建 ABFS 工作区需要安装 ABFS。请访问",
  "ABFS workspace creation is not available in this environment.": "当前环境不支持创建 ABFS 工作区。",
  "API key": "API 密钥",
  "Aborted due to condition callback returning false.": "由于条件回调返回 false，操作已中止。",
  "Accept and continue": "接受并继续",
  "Actionable": "可执行",
  "Add Resource": "添加资源",
  "Add account": "添加账户",
  "Add folder path": "添加文件夹路径",
  "Agent ID:": "智能体 ID：",
  "Allow reading workflow runs (list, view, watch) across the whole repository.": "允许读取整个仓库的工作流运行记录（列出、查看、监听）。",
  "Alt text:": "替代文本 (Alt)：",
  "An unexpected error occurred during creation": "创建过程中发生意外错误",
  "Antigravity Interactive HTML": "Antigravity 交互式 HTML",
  "Are you sure you want to delete": "确定要删除",
  "Are you sure you want to delete the": "确定要删除",
  "Are you sure you want to delete the workspace": "确定要删除工作区",
  "Artifact Name": "产物名称",
  "Artifact URL not found": "未找到产物 URL",
  "Artifact Viewer": "产物查看器",
  "Artifact updated by agent": "产物已由智能体更新",
  "Artifacts like Google Docs, PDFs, Office documents (Word, Excel, PowerPoint), etc. Everything else the agent creates is under Artifacts.": "如 Google 文档、PDF、Office 文档（Word、Excel、PowerPoint）等产物。智能体创建的所有其他内容均归类在“产物”下。",
  "Ask about your code or any topic, get clear answers.": "询问有关代码或任何主题的问题，获取清晰解答。",
  "Ask the agent to diagnose and fix this server": "让智能体诊断并修复此服务",
  "Auto-assignment not configured": "未配置自动分配",
  "Automatically reproduce bugs, trace causes, test fixes.": "自动复现缺陷、追踪根因并测试修复方案。",
  "Automation credentials expired": "自动化凭据已过期",
  "Automation credentials expiring soon": "自动化凭据即将过期",
  "Available for": "适用于",
  "Back to": "返回",
  "Back to resource menu": "返回资源菜单",
  "Basic auth": "基础认证 (Basic Auth)",
  "Binary file not shown": "未显示二进制文件",
  "Browser Subagent Viewer": "浏览器子智能体查看器",
  "Browser control is gated in remote sessions.": "远程会话中浏览器控制受限。",
  "Build Cleaner completed for": "已为以下目标完成构建清理 (Build Cleaner)：",
  "Build Cleaner is running on": "正在以下目标上运行构建清理 (Build Cleaner)：",
  "Build new features": "构建新功能",
  "Bundles": "扩展包 (Bundles)",
  "Business Account Sign In": "企业账户登录",
  "Bytes": "字节",
  "CHECKPOINT": "检查点",
  "Can't open the Drive link?": "无法打开云端硬盘链接？",
  "Cancel Render Page Failed": "取消页面渲染失败",
  "Cancel Render Thumbnail Failed": "取消缩略图渲染失败",
  "Cancel Sending Message": "取消发送消息",
  "Canceled bookmark of": "已取消添加书签：",
  "Canceled creation of": "已取消创建：",
  "Canceled deletion of": "已取消删除：",
  "Canceled edit to": "已取消编辑：",
  "Canceled removal of bookmark": "已取消移除书签",
  "Changelists": "变更列表 (Changelists)",
  "Check CLs that require my attention and fix them in their respective conversations.": "检查需要我关注的变更列表 (CL)，并在各自的对话中修复它们。",
  "Chief of Staff Dashboard": "幕僚长 (Chief of Staff) 仪表盘",
  "Chime volume": "提示音音量",
  "Choose Region": "选择区域",
  "Choose a License": "选择许可证",
  "Chrome on the machine you are controlling is not accepting remote debugging. Complete these steps on that machine, not in this tab:": "您所控制计算机上的 Chrome 未开启远程调试。请在那台计算机上（而非当前标签页）完成以下步骤：",
  "Cleared Count": "已清理数量",
  "Close (Escape)": "关闭 (Escape)",
  "Cog workspace creation is not available in this environment.": "当前环境不支持创建 Cog 工作区。",
  "Collapse idle": "折叠空闲项",
  "Collapse string": "折叠字符串",
  "Color": "颜色",
  "Command Spec (JSON)": "命令规范 (JSON)",
  "Complete Setup": "完成设置",
  "Complete sign-in in the popup window, then click Continue.": "请在弹出窗口中完成登录，然后点击“继续”。",
  "Connect Google Drive": "连接 Google 云端硬盘",
  "Connect your Google Drive account to attach Docs, Sheets, Slides, files, and folders.": "连接您的 Google 云端硬盘账户，以便附加文档、表格、幻灯片、文件和文件夹。",
  "Contact your administrator to set up Gemini Enterprise for this project": "请联系您的管理员为此项目配置 Gemini Enterprise",
  "Continue with SSO": "使用 SSO 继续",
  "Copy image": "复制图片",
  "Copy response": "复制回答",
  "Couldn't load harnesses.": "无法加载运行环境 (Harnesses)。",
  "Couldn't load the suggested plugin.": "无法加载推荐的插件。",
  "Couldn't mark conversations as read": "无法将对话标记为已读",
  "Count": "数量",
  "Create ABFS Workspace (Alpha)": "创建 ABFS 工作区 (Alpha)",
  "Create CitC Workspace": "创建 CitC 工作区",
  "Create Cloud Project": "创建云项目",
  "Create Cog Workspace": "创建 Cog 工作区",
  "Create a Fig shared workspace": "创建 Fig 共享工作区",
  "Create a JJ worktree": "创建 JJ 工作树",
  "Creating projects for your conversations": "正在为您的对话创建项目",
  "Current parameter:": "当前参数：",
  "Custom Flags": "自定义标志 (Flags)",
  "Custom Order": "自定义排序",
  "DO NOT share": "请勿分享",
  "Debug (Disabled)": "调试（已禁用）",
  "Debug (Enabled)": "调试（已启用）",
  "Debug and fix": "调试与修复",
  "Default harness": "默认运行环境",
  "Definition:": "定义：",
  "Dismiss artifact update notice": "关闭产物更新提示",
  "Dismiss conversation open elsewhere warning": "关闭“对话已在其他位置打开”警告",
  "Displaying raw protobuf object (failed to format as JSON). Enums and timestamps are shown in their internal numeric/binary format.": "正在显示原始 Protobuf 对象（格式化为 JSON 失败）。枚举与时间戳以其内部数值/二进制格式展示。",
  "Don't enter corp passwords": "请勿输入企业内部密码",
  "Download image": "下载图片",
  "Download the bundle manually and share it instead:": "请改为手动下载扩展包并进行分享：",
  "Download this site as an app to get notified when the agent needs your attention or completes a task.": "将此站点安装为应用，以便在智能体需要您关注或完成任务时收到通知。",
  "Download video": "下载视频",
  "Draft documents, emails, and notes that sound like you.": "起草符合您个人风格的文档、邮件和笔记。",
  "Each plugin can be managed on its own.": "每个插件均可独立管理。",
  "Emphasize": "强调",
  "Enable this plugin to use this prompt": "启用此插件以使用该提示词",
  "Enterprise Gateway": "企业网关",
  "Error: No artifact URI provided in URL parameters.": "错误：URL 参数中未提供产物 URI。",
  "Event Trigger": "事件触发器",
  "Event:": "事件：",
  "Execution duration for this tool call (including pre/post-tool hooks and user approval prompts).": "本次工具调用的执行耗时（包含工具前置/后置钩子及用户审批等待时间）。",
  "Exit fullscreen (f)": "退出全屏 (f)",
  "Expand long string": "展开长字符串",
  "Expected a notFound error": "预期返回 notFound 错误",
  "Failed to approve browser interaction": "批准浏览器交互失败",
  "Failed to get all annotations": "获取全部批注失败",
  "Failed to get annotations": "获取批注失败",
  "Failed to load comments": "加载评论失败",
  "Failed to load image": "加载图片失败",
  "Failed to load resources": "加载资源失败",
  "Failed to load trajectory": "加载轨迹记录失败",
  "Failed to open Google Drive Picker.": "打开 Google 云端硬盘选择器失败。",
  "Failed to open created workspace": "打开已创建的工作区失败",
  "Failed to render diagram": "渲染图表失败",
  "Failed to render math": "渲染数学公式失败",
  "Failed to retrieve Google Drive credentials.": "获取 Google 云端硬盘凭据失败。",
  "Failed to save token to ~/.env": "保存令牌到 ~/.env 失败",
  "Failed to send command input": "发送命令输入失败",
  "Failed to start Google Drive sign-in.": "启动 Google 云端硬盘登录失败。",
  "Failed to upload HTML artifact to Drive": "上传 HTML 产物到云端硬盘失败",
  "Failed to validate the saved GitHub token.": "验证已保存的 GitHub 令牌失败。",
  "Feature Environment Override": "功能环境覆盖",
  "Filter resources...": "筛选资源...",
  "Find all your Jetski conversations here.": "在此处查找您的所有 Jetski 对话。",
  "Fix with Agent": "使用智能体修复",
  "Follow the guide at": "请遵循以下指南：",
  "For Turn": "针对轮次",
  "For a full list of available locations and deployment endpoints, please refer to the": "有关可用区域和部署端点的完整列表，请参阅",
  "For any feedback that does not fit into the above categories.": "适用于不属于上述分类的任何其他反馈。",
  "Fork conversation in this folder": "在此文件夹中分叉 (Fork) 对话",
  "Full View": "完整视图",
  "Fullscreen (f)": "全屏 (f)",
  "Gcert Status": "Gcert 状态",
  "Gcert from the Jetski UI": "从 Jetski 界面执行 Gcert",
  "General work": "日常综合事务",
  "Generator metadata is present but does not contain ChatModelMetadata.": "生成器元数据存在，但未包含 ChatModelMetadata。",
  "Get Anything Done with": "随心高效完成一切：",
  "Get notified when the agent needs your attention or completes a task.": "当智能体需要您关注或完成任务时接收通知。",
  "Get started": "开始使用",
  "Go to": "前往",
  "Go to Latest Invocation": "前往最新调用",
  "Go to the machine you are controlling and quit Antigravity. It installs pending updates the next time it starts.": "请前往您正在控制的计算机并退出 Antigravity。它将在下次启动时安装待处理的更新。",
  "Google Antigravity - Experience liftoff": "Google Antigravity - 体验极速升空",
  "Google Cloud Project ID": "Google Cloud 项目 ID",
  "Google Docs": "Google 文档",
  "Google Drive": "Google 云端硬盘",
  "Google Privacy Policy": "Google 隐私权政策",
  "Google Sheets": "Google 表格",
  "Google Slides": "Google 幻灯片",
  "Google3 chats will be regrouped into their workspaces in the sidebar.": "Google3 对话将在侧边栏中按各自的工作区重新分组。",
  "Google3 projects are being deprecated. Select a CitC workspace instead.": "Google3 项目即将弃用，请改用 CitC 工作区。",
  "Hand off a feature and come back to working code.": "交办功能开发任务，归来即享可用代码。",
  "Harness per response": "每次响应的运行环境",
  "Harnesses are unavailable from this language server.": "当前语言服务器不支持运行环境 (Harnesses)。",
  "Having trouble signing in?": "登录遇到问题？",
  "How this feature would help you and other users": "此功能将如何帮助您和其他用户",
  "If that machine is a cloudtop, reach it via": "如果该计算机是 Cloudtop，请通过以下方式访问：",
  "Image URL:": "图片 URL：",
  "Image rendering blocked (strict mode enabled)": "图片渲染已拦截（已启用严格模式）",
  "In this case,": "在这种情况下，",
  "Input:": "输入：",
  "Install this plugin to use this prompt": "安装此插件以使用该提示词",
  "Intended primarily for previewing local development servers (e.g.,": "主要用于预览本地开发服务器（例如",
  "Invalid embed:": "无效的嵌入内容：",
  "Invariant failed": "不变量断言失败",
  "Jetski Chat configuration is not available in the current environment.": "当前环境不支持 Jetski Chat 配置。",
  "Jetski and Cider are now more closely integrated:": "Jetski 与 Cider 现已实现更紧密的集成：",
  "Keeps working in this folder. Nothing is copied.": "继续在此文件夹中工作，不会复制任何文件。",
  "Lanes": "泳道视图 (Lanes)",
  "Last Used": "上次使用",
  "Learn from my conversation history to write a personalized set of rules for future agentic interactions.": "从我的历史对话中学习，为未来的智能体交互编写一套个性化规则。",
  "License:": "许可证：",
  "Link copied to clipboard.": "链接已复制到剪贴板。",
  "Loading bundle...": "正在加载扩展包...",
  "Loading resources...": "正在加载资源...",
  "MCP Restart Error:": "MCP 重启错误：",
  "MCP server": "MCP 服务",
  "Manage License": "管理许可证",
  "Many external websites (such as Google Search, GitHub, or Wikipedia) restrict iframe embedding via": "许多外部网站（例如 Google 搜索、GitHub 或维基百科）通过以下策略限制 iframe 嵌入：",
  "Mark All as Read": "全部标记为已读",
  "Mark This Conversation as Read": "将此对话标记为已读",
  "Mark This Conversation as Unread": "将此对话标记为未读",
  "Marked 1 conversation as read": "已将 1 个对话标记为已读",
  "Match Case (Aa)": "区分大小写 (Aa)",
  "Match Whole Word (ab)": "全字匹配 (ab)",
  "Matcher:": "匹配器：",
  "Message queued.": "消息已加入队列。",
  "Modify permissions for file and terminal tools.": "修改文件和终端工具的权限。",
  "More feedback options": "更多反馈选项",
  "Mount Directory": "挂载目录",
  "Mouse button pressed": "鼠标按键按下",
  "Mouse button released": "鼠标按键释放",
  "Mute (m)": "静音 (m)",
  "Need help? Reach out in the": "需要帮助？请通过以下渠道联系：",
  "New Fig Share": "新建 Fig 共享",
  "New Fig Share?": "新建 Fig 共享？",
  "New Fig Workspace": "新建 Fig 工作区",
  "New chats will be grouped by workspace.": "新对话将按工作区分组。",
  "New conversations in CitC will be grouped by distinct workspace.": "CitC 中的新对话将按不同工作区分组。",
  "New models have been enabled for you!": "已为您启用新模型！",
  "Next Match (Enter)": "下一个匹配项 (Enter)",
  "No Invocation Associated": "无关联调用",
  "No Invocation Metadata": "无调用元数据",
  "No Prompt or Tools Data": "无提示词或工具数据",
  "No answer provided": "未提供回答",
  "No build files are updated.": "未更新任何构建文件。",
  "No bundle found for": "未找到对应的扩展包：",
  "No cascade ID provided": "未提供会话流 (Cascade) ID",
  "No custom flag matches your search.": "没有与您的搜索匹配的自定义标志。",
  "No execution metadata available for this step.": "此步骤暂无可用的执行元数据。",
  "No matching": "无匹配项：",
  "No matching project folders. Apply to use the custom URI.": "没有匹配的项目文件夹。点击应用以使用自定义 URI。",
  "No matching resources found.": "未找到匹配的资源。",
  "No project selected or project management not available.": "未选择项目或项目管理功能不可用。",
  "No rate card for this model; showing comparable rates.": "此模型暂无费率卡；当前显示可比模型的参考费率。",
  "No repositories found. Type to enter a custom path.": "未找到代码仓库。可直接输入自定义路径。",
  "No resources added yet.": "暂未添加任何资源。",
  "No step data available": "暂无步骤数据",
  "No steps with timestamps to place on a timeline.": "没有包含时间戳的步骤可放置在时间轴上。",
  "No trajectory metadata available": "暂无轨迹元数据",
  "Non-google3 python agent scripts are a work in progress. Eventually you can expect to use the SDK pip package in a main.py to run your agent. Please reach out if you have a specific need to run your agent script outside of Cloudtop & Google3.": "非 google3 的 Python 智能体脚本支持仍在开发中。后续您将可以在 main.py 中使用 SDK pip 包来运行智能体。如果您有在 Cloudtop 和 Google3 之外运行智能体脚本的特定需求，请与我们联系。",
  "Non-model response token counts are estimations. The model API does not return per-message token counts.": "非模型响应的 Token 数量为估算值，模型 API 不会返回单条消息的精确 Token 计数。",
  "Notebook cell output": "笔记本单元格输出",
  "Notebook execution not implemented": "尚未实现笔记本执行功能",
  "One-time x20 setup": "一次性 x20 设置",
  "Open Drive bundle": "打开云端硬盘扩展包",
  "Open Google Chrome on the machine running Antigravity.": "在运行 Antigravity 的计算机上打开 Google Chrome。",
  "Open Jetski Corp": "打开企业版 Jetski",
  "Open in Critique": "在 Critique 中打开",
  "Open in Hub": "在 Hub 中打开",
  "Open in Sponge": "在 Sponge 中打开",
  "Open preview in embedded pane": "在嵌入式窗格中打开预览",
  "Page was short enough to be read as a single document.": "页面内容较短，已作为单个文档完整读取。",
  "Pairs (arm order may be shuffled)": "配对比较（顺序可能随机打乱）",
  "Paste code": "粘贴代码",
  "Paste the code shown after you sign in.": "请粘贴您登录后显示的代码。",
  "Pause (k)": "暂停 (k)",
  "Pay As You Go": "按量付费 (Pay As You Go)",
  "Permission Details": "权限详情",
  "Pick order sets the harness for each response; the rest run control.": "选择顺序将决定每次响应所使用的运行环境；其余项运行对照组。",
  "Pinned Actions": "已固定操作",
  "Play (k)": "播放 (k)",
  "Playback speed (< / >)": "播放速度 (< / >)",
  "Please describe your auth or billing issue. More details will help our support team resolve your issue quicker. Some helpful information includes:": "请描述您的身份验证或账单结算问题。提供更多细节有助于支持团队更快解决您的问题，例如：",
  "Preview disabled (experiment off)": "预览已禁用（实验功能已关闭）",
  "Previous Match (Shift+Enter)": "上一个匹配项 (Shift+Enter)",
  "Previous chats live under a deprecated Google3 Project": "历史对话保存在已弃用的 Google3 项目下",
  "Prompt & Tools": "提示词与工具",
  "Provide Google Cloud Project": "提供 Google Cloud 项目",
  "Python Coming Soon": "Python 支持即将推出",
  "Re-open sign-in popup": "重新打开登录弹窗",
  "Remount workspace": "重新挂载工作区",
  "Remove resource": "移除资源",
  "Removed bookmark": "已移除书签",
  "Removing bookmark": "正在移除书签",
  "Removing the bundle removes all of its plugins.": "移除此扩展包将同时移除其包含的所有插件。",
  "Render failed": "渲染失败",
  "Reopen sign-in page": "重新打开登录页面",
  "Requesting a one-time administrator (UAC) elevation": "正在请求一次性管理员权限 (UAC) 提权",
  "Research anything": "深入研究任何课题",
  "Research, writing, and everyday tasks, without code.": "无需编写代码，轻松处理研究、写作与日常任务。",
  "Reset overrides": "重置覆盖项",
  "Restart sign-in": "重新开始登录",
  "Retrieved findings for": "已获取调查发现：",
  "Retrieving findings for": "正在获取调查发现：",
  "Run the command in your workstation terminal, then reload this page:": "请在您的工作站终端中运行此命令，然后重新加载本页面：",
  "SSH into your device to gcert": "SSH 登录到您的设备以执行 gcert",
  "Saves to your global ~/.gemini/antigravity/agents/ directory. This script will be available across all your workspaces.": "保存到您的全局 ~/.gemini/antigravity/agents/ 目录。此脚本将在您的所有工作区中可用。",
  "Search conversations with": "搜索包含以下内容的对话：",
  "Search conversations, commands, and code...": "搜索对话、命令和代码...",
  "Searching Moma for": "正在 Moma 中搜索：",
  "See more": "查看更多",
  "See more...": "查看更多...",
  "See our open roles": "查看我们的热招职位",
  "Seek": "跳转进度",
  "Select ABFS Workspace (Alpha)": "选择 ABFS 工作区 (Alpha)",
  "Select Billing Model": "选择计费模式",
  "Select CitC Workspace": "选择 CitC 工作区",
  "Select CitC workspace": "选择 CitC 工作区",
  "Select Cog Workspace": "选择 Cog 工作区",
  "Select Folder(s)": "选择文件夹",
  "Select a model in the model selector": "请在模型选择器中选择一个模型",
  "Select the latest snapshot from the": "请从以下位置选择最新快照：",
  "Set the volume of agent sounds.": "设置智能体提示音的音量。",
  "Settings -": "设置 -",
  "Sharing is a preview feature. It exports this conversation's history to your": "对话分享是一项预览功能。它会将此对话的历史记录导出到您的",
  "Show temporary and forked workspaces": "显示临时和分叉 (Fork) 的工作区",
  "Sidecar View": "辅助面板 (Sidecar) 视图",
  "Sign In with SSO": "使用 SSO 登录",
  "Sign-in required": "需要登录",
  "Size": "大小",
  "Skill": "技能",
  "Some non-image binary content was truncated.": "部分非图像二进制内容已被截断。",
  "Something else (optional)": "其他补充说明（可选）",
  "Sorry, this account is ineligible to use": "抱歉，此账户无权使用",
  "Sort By": "排序方式",
  "Sound": "声音",
  "Start in a new Fig share (go/fig-shares)": "在新的 Fig 共享中开始 (go/fig-shares)",
  "Start it again.": "重新启动。",
  "Switch to the": "切换到",
  "Tell us anything else here (optional)": "在此处告诉我们任何其他信息（可选）",
  "Terminal Disabled on Non-Corp Domains": "非企业域下已禁用终端",
  "The branch was pushed to GitLab.": "分支已推送至 GitLab。",
  "The change was pushed to Gerrit.": "变更已推送至 Gerrit。",
  "The conversation could not be loaded because its data was not found.": "无法加载该对话，因为未找到其数据。",
  "The full developer experience with code and tooling.": "包含代码编辑与开发工具的完整开发者体验。",
  "The remote shared a link for this push.": "远程仓库为此推送返回了链接。",
  "The settings here only apply to conversations that are under Google3 Projects, which are deprecated. Any new conversations should be grouped by workspace and apply global settings.": "此处的设置仅适用于已弃用的 Google3 项目下的对话。所有新对话均应按工作区分组并应用全局设置。",
  "The suggested plugin isn't in the marketplace.": "插件市场中未找到该推荐插件。",
  "This bundle has no plugins yet.": "此扩展包暂未包含任何插件。",
  "This conversation is also open in another app. Sending messages from both may cause conflicts.": "此对话同时在另一个应用中处于打开状态。从两端同时发送消息可能会导致冲突。",
  "This conversation is not on disk. Delete it to remove it from your sidebar.": "此对话已不在磁盘上。将其删除即可从侧边栏中移除。",
  "This is a CitC workspace (Fig share)": "这是一个 CitC 工作区 (Fig 共享)",
  "This migration may mess up your settings, chats, and sidebar.": "此迁移可能会打乱您的设置、对话和侧边栏。",
  "This page is going away soon": "此页面即将下线",
  "This page is taking longer than expected to load, or it may be blocking embedded views (via X-Frame-Options or CSP). We'll keep waiting, or you can open it directly in a new tab.": "此页面加载耗时超出预期，或者它可能通过 X-Frame-Options 或 CSP 阻止了嵌入式视图。我们将继续等待，您也可以直接在新标签页中打开它。",
  "This project uses Firebase. Do you want to download the Firebase skill?": "此项目使用了 Firebase。您要下载 Firebase 技能吗？",
  "This sign-in option is only available to invited teams.": "此登录选项仅对受邀团队开放。",
  "This will cause issues between the Toggle Group and Toggle values.": "这会导致切换组 (Toggle Group) 与切换项的值之间发生冲突。",
  "This will permanently delete": "这将永久删除",
  "Time Trigger": "定时触发器",
  "Title:": "标题：",
  "To update:": "更新方法：",
  "Unable to load PDF:": "无法加载 PDF：",
  "Unmute (m)": "取消静音 (m)",
  "Upload Files": "上传文件",
  "Upload debug bundle": "上传调试包",
  "Uploaded to Google Drive": "已上传至 Google 云端硬盘",
  "Uploads logs, settings, and conversation summaries to your Drive.": "将日志、设置和对话摘要上传到您的云端硬盘。",
  "Use Advanced SSO Config": "使用高级 SSO 配置",
  "Use Business Account": "使用企业账户",
  "Use Regular Expression (.*)": "使用正则表达式 (.*)",
  "Use my conversation history to tell me which skills and plugins would be helpful for me.": "根据我的历史对话告诉我哪些技能和插件对我有帮助。",
  "Use the": "请使用",
  "Use this if your admin gave you a WIF config. Paste it below to sign in.": "如果您的管理员为您提供了 WIF 配置，请将其粘贴到下方以登录。",
  "Validated with GitHub and stored in": "已通过 GitHub 验证并存储于",
  "Verify that these licenses were provided by your administrator and that you trust the project ID before proceeding. Account activity and data may be logged by your organization.": "继续操作前，请确认这些许可证由您的管理员提供且您信任该项目 ID。您的账户活动和数据可能会被您的组织记录。",
  "Version Info": "版本信息",
  "View archived in the sidebar (![filter](icon://filter_list) menu).": "在侧边栏（筛选菜单）中查看已归档项。",
  "Voice recording is unavailable while the Chief of Staff mic is on": "当幕僚长麦克风开启时，语音录制不可用",
  "Volume": "音量",
  "WIF Config": "WIF 配置",
  "Want to re-group your old conversations by workspace? They can be": "想要按工作区重新整理旧对话吗？它们可以",
  "We opened a popup for you to authorize adding the bot to your chat. Please copy the code from it and paste it below:": "我们已为您打开授权弹窗以将机器人添加到聊天中。请复制其中的代码并粘贴到下方：",
  "We'll tailor the experience to you.": "我们将为您量身定制使用体验。",
  "Web (desktop)": "网页端（桌面）",
  "Web (desktop, PWA)": "网页端（桌面，PWA）",
  "Web (desktop, remote control)": "网页端（桌面，远程控制）",
  "Web (desktop, remote control, PWA)": "网页端（桌面，远程控制，PWA）",
  "Web (mobile)": "网页端（移动设备）",
  "Web (mobile, PWA)": "网页端（移动设备，PWA）",
  "Web (mobile, remote control)": "网页端（移动设备，远程控制）",
  "Web (mobile, remote control, PWA)": "网页端（移动设备，远程控制，PWA）",
  "Web search prioritized results from": "网页搜索已优先采用来自以下来源的结果：",
  "What best describes you?": "以下哪项最符合您的身份？",
  "What did you like? Select any that apply (optional).": "您喜欢哪些方面？可多选（可选）。",
  "What functionality you expect your account tier to have available that is missing": "您期望当前账户等级具备但实际缺失的功能",
  "What is missing in your workflow": "您的工作流中缺失了什么",
  "What quota or feature is being incorrectly limited": "哪些额度或功能受到了不正确的限制",
  "What was off? Select any that apply (optional).": "有哪些地方表现不佳？可多选（可选）。",
  "What you would like to see to address this gap in your workflow": "您希望看到什么改进来弥补工作流中的这一缺口",
  "What's in this bundle": "此扩展包包含的内容",
  "Whether it never connects or is intermittent/flaky": "是完全无法连接，还是连接断断续续/不稳定",
  "Work in Google3. Create conversations in new and existing workspaces.": "在 Google3 中工作。在新工作区和现有工作区中创建对话。",
  "Workspace > Restore to Snapshot": "工作区 > 恢复到快照",
  "Write and edit docs": "编写与编辑文档",
  "You are accessing Jetski terminal on a non-corp domain, which may trigger a Chrome Password Alert. To use the terminal, visit the Jetski Corp domain instead.": "您正在非企业域下访问 Jetski 终端，这可能会触发 Chrome 密码安全警报。若要使用终端，请改为访问企业版 Jetski 域名。",
  "You can also add or remove each plugin below.": "您也可以在下方单独添加或移除每个插件。",
  "You can now switch seamlessly between Jetski Web and Cider using the icons above.": "现在您可以使用上方的图标在 Jetski Web 和 Cider 之间无缝切换。",
  "You can opt-out temporarily using": "您可以通过以下方式暂时退出：",
  "Your Antigravity use will be associated with provided project.": "您的 Antigravity 使用情况将与所提供的项目关联。",
  "Your changes were not saved. Please try again.": "您的更改未保存，请重试。",
  "Your credentials (gcert) are currently valid, but you can renew them if needed:": "您的凭据 (gcert) 当前有效，如有需要也可以手动续期：",
  "Your credentials (gcert) have expired or are missing. Please renew them:": "您的凭据 (gcert) 已过期或缺失，请进行续期：",
  "Your environment has expired. Please renew it to continue.": "您的环境已过期，请续期后继续。",
  "Your environment is active, but you can renew it if needed.": "您的环境当前处于活动状态，如有需要也可以手动续期。",
  "Your environment will expire soon. Please renew it to continue.": "您的环境即将过期，请续期后继续。",
  "Your existing conversations in CitC are grouped under a": "您在 CitC 中的现有对话已归组于",
  "[Dev Mode] View full search results": "[开发者模式] 查看完整搜索结果",
  "by Google": "由 Google 提供",
  "chunks were collapsed into one. Chunks included in this read:": "个片段已合并为一个。本次读取包含的片段：",
  "cogfsd and cidermux are required to create Cog workspaces. Please visit": "创建 Cog 工作区需要 cogfsd 和 cidermux。请访问",
  "icon in the URL bar.": "图标（位于地址栏中）。",
  "in Browser": "（在浏览器中）",
  "that runs Jetski Web.": "（用于运行 Jetski Web）。",
  "to set up ABFS.": "以配置 ABFS。",
  "to set up Cog.": "以配置 Cog。",
  "user directory, and any Googler with the link can load and view it. Storage will move to Google Drive in a future version.": "用户目录中，任何拥有链接的 Google 员工均可加载并查看。未来版本中存储位置将迁移至 Google 云端硬盘。",
  "with ID": "，ID 为"
};

// ============================================================================
// 2. 设置弹窗特定上下文词表 (SETTINGS_CONTEXT_TRANSLATIONS)
// ============================================================================

const SETTINGS_CONTEXT_TRANSLATIONS = {
  ".": "。",
  "Tab": "标签页",
  "Developer": "开发者",
  "Workspace 1": "工作区 1",
  "Workspace 2": "工作区 2",
  "Workspace 3": "工作区 3",
  "Example Chat": "示例对话",
  "Convo 1": "对话 1",
  "Convo 2": "对话 2",
  "Convo 3": "对话 3",
  "expand": "展开",
  "copy": "复制",
  "Global settings": "全局设置"
};

// ============================================================================
// 3. 动态正则翻译规则 (REGEX_TRANSLATIONS + COMMUNITY_PATTERNS)
// ============================================================================

const REGEX_TRANSLATIONS = [
  // --- 原有核心动态规则（确保 100% 向后兼容） ---
  [/^Description:\s*(.+)$/i, (_, description) => `说明：${translateString(description)}`],
  [/^Available AI Credits:\s*(\d+)$/i, '可用 AI 点数：$1'],
  [/^Refreshes in\s+(.+)$/i, (_, time) => `${translateDuration(time)}后刷新`],
  [/^Resets in\s+(.+)$/i, (_, time) => `${translateDuration(time)}后重置`],
  [/^expires in\s+(.+)$/i, (_, time) => `${translateDuration(time)}后过期`],
  [/^Show\s+(\d+)\s+breakdowns?$/i, '显示 $1 项明细'],
  [/^Thinking for\s+(.+)$/i, (_, time) => `已思考 ${translateDuration(time)}`],
  [/^Thought for\s+(.+)$/i, (_, time) => `已思考 ${translateDuration(time)}`],
  [/^Worked for\s+(.+)$/i, (_, time) => `已工作 ${translateDuration(time)}`],
  [/^Tools\s*\((\d+)\)$/i, '工具（$1）'],
  [/^Tool Calls\s*\((\d+)\)$/i, '工具调用（$1）'],
  [/^Steps\s*\((\d+)\)$/i, '步骤（$1）'],
  [/^Subagents\s*\((\d+)\)$/i, '子智能体（$1）'],
  [/^Child Subagents\s*\((\d+)\)$/i, '子智能体（$1）'],
  [/^Invocations\s*\((\d+)\)$/i, '调用（$1）'],
  [/^Generation Steps\s*\((\d+)\)$/i, '生成步骤（$1）'],
  [/^Message History\s*\((\d+)\)$/i, '消息历史（$1）'],
  [/^Prompt Sections\s*\((\d+)\)$/i, '提示词部分（$1）'],
  [/^System Prompt Sections\s*\((\d+)\)$/i, '系统提示词部分（$1）'],
  [/^Rules\s*\(([^)]+)\)\s*(\d+)$/i, '规则（$1）$2'],
  [/^Skills\s*\(([^)]+)\)\s*(\d+)$/i, '技能（$1）$2'],
  [/^Rules:\s*(\d+)\s+tokens?$/i, '规则：$1 个令牌'],
  [/^Skills:\s*(\d+)\s+tokens?$/i, '技能：$1 个令牌'],
  [/^Your Plan:\s*(.+)$/i, '当前套餐：$1'],
  [/^([\d,]+)\s+tokens?\)$/i, '$1 个令牌）'],
  [/^([\d,]+)\s+tokens? total\)$/i, '共 $1 个令牌）'],
  [/^(Rules|Skills|Subagents|Mcp Tools):\s*([\d,]+)\s+tokens?$/i, (_, category, count) => `${translateString(category)}：${count} 个令牌`],
  [/^(\d+)\s+tools?\s+(enabled|disabled)$/i, (_, count, state) => `${count} 个工具${state.toLowerCase() === 'enabled' ? '已启用' : '已禁用'}`],
  [/^Toggle\s+(.+)$/i, (_, target) => `切换 ${translateString(target) || target}`],
  [/^Scheduled task\s+"(.+)"$/i, '定时任务“$1”'],
  [/^No MCP servers found for\s+"(.+)"$/i, '未找到“$1”的 MCP 服务器'],
  [/^([\d.]+)% of the customization budget is available\.?$/i, '自定义预算剩余 $1%。'],
  [/^You have used some of your weekly limit, it will fully refresh in (.+)\.$/i, (_, time) => `您的每周限额已使用一部分，将在 ${translateDuration(time)}后完全刷新。`],
  [/^You have used some of your 5-hour limit, it will fully refresh in (.+)\.$/i, (_, time) => `您的五小时限额已使用一部分，将在 ${translateDuration(time)}后完全刷新。`],
  [/^Send feedback as\s+(.+)$/i, '使用 $1 发送反馈'],
  [/^Plugin:\s*(.+)$/i, '插件：$1'],
  [/^See all\s*\((\d+)\)$/i, '查看全部（$1）'],
  [/^Select model, current:\s*(.+)$/i, '选择模型，当前：$1'],
  [/^Select project, current:\s*(.+)$/i, '选择项目，当前：$1'],
  [/^Select workspace, current:\s*(.+)$/i, (_, ws) => `选择工作区，当前：${translateString(ws) || ws}`],
  [/^Select modes, current:\s*(.+)$/i, '选择模式，当前：$1'],
  [/^Select harnesses, current:\s*(.+)$/i, '选择运行环境，当前：$1'],
  [/^Ran\s+(\d+)\s+background\s+commands?$/i, '已运行 $1 个后台命令'],
  [/^Running\s+(\d+)\s+background\s+commands?\.{0,3}$/i, '正在运行 $1 个后台命令...'],
  [/^Ran\s+(\d+)\s+commands?$/i, '已运行 $1 个命令'],
  [/^Running\s+(\d+)\s+commands?\.{0,3}$/i, '正在运行 $1 个命令...'],
  [/^Ran\s+(.+)$/i, '已运行 $1'],
  [/^Searched\s+(.+)$/i, '已搜索 $1'],
  [/^Analyzed\s+(.+)$/i, '已分析 $1'],
  [/^Explored\s+(\d+)\s+files?,\s*(\d+)\s+search(?:es)?$/i, '已探索 $1 个文件，$2 次搜索'],
  [/^Explored\s+(\d+)\s+files?$/i, '已探索 $1 个文件'],
  [/^Explored\s+(\d+)\s+searches?$/i, '已探索 $1 次搜索'],
  [/^Exploring\s+(\d+)\s+files?,\s*(\d+)\s+search(?:es)?$/i, '正在探索 $1 个文件，$2 次搜索'],
  [/^Exploring\s+(\d+)\s+files?$/i, '正在探索 $1 个文件'],
  [/^Exploring\s+(\d+)\s+searches?$/i, '正在探索 $1 次搜索'],
  [/^Modified in\s+(\d+)\s+projects?$/i, '已在 $1 个项目中修改'],
  [/^Permanently delete (.+) including (\d+) active conversations? and (\d+) archived conversations?\.$/i, '永久删除 $1，包括 $2 个活跃对话和 $3 个已归档对话。'],
  [/^(\d+)(mo|m|h|d|w|y)$/i, (_, count, unit) => `${count}${({ m: '分钟', h: '小时', d: '天', w: '周', mo: '个月', y: '年' })[unit.toLowerCase()]}`],
  [/^(.+)\s+command-line tool\.?$/i, '$1 命令行工具。'],

  // --- Antigravity 2.22.0 新增高频动态模板规则 ---
  [/^(Reading|Read) terminal:$/i, (_, state) => state.toLowerCase() === 'reading' ? '正在读取终端：' : '已读取终端：'],
  [/^(\d+)\s+Background Process(?:es)? Running$/i, '$1 个后台进程正在运行'],
  [/^(\d+)\s+attachments?$|^(\d+)\s+attachment\(s\)$/i, (_, a, b) => `${a || b} 个附件`],
  [/^(\d+)\s+audio attachments?$/i, '$1 个音频附件'],
  [/^(\d+)\s+image attachments?$/i, '$1 个图片附件'],
  [/^(\d+)\s+video attachments?$/i, '$1 个视频附件'],
  [/^(\d+)\s+comments? in (.+)$/i, '$2 中有 $1 条评论'],
  [/^(\d+)\s+comments?$/i, '$1 条评论'],
  [/^(\d+)\s+unresolved$/i, '$1 项未解决'],
  [/^(Failed to execute|Executing|Executed) notebook( cells)?$/i, (_, st, cells) => {
    const map = { 'failed to execute': '执行失败：', 'executing': '正在执行', 'executed': '已执行' };
    return `${map[st.toLowerCase()] || st}笔记本${cells ? '单元格' : ''}`;
  }],
  [/^(\d+)\s+questions?$/i, '$1 个问题'],
  [/^Question\s+(\d+)\s+of\s+(\d+)$/i, '第 $1 / $2 个问题'],
  [/^(\d+)\s+Side Questions?$/i, '$1 个旁路提问'],
  [/^View\s+(\d+)\s+side questions?$/i, '查看 $1 个旁路提问'],
  [/^Side Question:\s*(.+)$/i, '旁路提问：$1'],
  [/^Side question failed:\s*(.+)$/i, '旁路提问失败：$1'],
  [/^(.+)\s+Queues after the turn$/i, '$1 在当前轮次结束后排队发送'],
  [/^(.+)\s+Sends immediately$/i, '$1 立即发送'],
  [/^(\d+)\s+Files? With Changes$/i, '$1 个文件有更改'],
  [/^(\d+)\s+files? changed$/i, '$1 个文件已更改'],
  [/^(\d+)\s+active modes?$/i, '$1 个活动模式'],
  [/^(\d+)\s+subagents? blocked$/i, '$1 个子智能体受阻'],
  [/^(\d+)\s+blocked$/i, '$1 项受阻'],
  [/^(\d+)\s+(subagents\/tasks|subagents?|tasks?)\s+running$/i, (_, n, kind) => {
    const k = kind.toLowerCase();
    const label = k === 'subagents/tasks' ? '子智能体/任务' : k.startsWith('subagent') ? '子智能体' : '任务';
    return `${n} 个${label}运行中`;
  }],
  [/^(\d+|No)\s+agents?\s+running$/i, (_, n) => n.toLowerCase() === 'no' ? '无智能体运行' : `${n} 个智能体运行中`],
  [/^Artifacts\s*\((\d+)\s+Files? for Conversation\)$/i, '产物（当前对话共 $1 个文件）'],
  [/^Agent needs permission to act on\s+(.+)$/i, '智能体需要权限才能操作 $1'],
  [/^Agent needs permission to execute JavaScript on\s+(.+)$/i, '智能体需要权限才能在 $1 上执行 JavaScript'],
  [/^Requesting permission to\s+(.+)$/i, '正在请求权限以 $1'],
  [/^Requires manual confirmation:\s*(.+)$/i, '需要手动确认：$1'],
  [/^Allow\s+(.+)\?$/i, '允许 $1 吗？'],
  [/^Save rule to always allow\s+(.+)\?$/i, '保存规则以始终允许 $1 吗？'],
  [/^Yes, and always allow '(.+)' in this (conversation|workspace|project)$/i, (_, target, scope) => `是，并在此${({ conversation: '对话', workspace: '工作区', project: '项目' })[scope.toLowerCase()]}中始终允许 '${target}'`],
  [/^Yes, and always allow '(.+)' when not in a project$/i, "是，并在未处于项目中时始终允许 '$1'"],
  [/^Yes, and always allow '(.+)'$/i, "是，并始终允许 '$1'"],
  [/^Yes, save rule for '(.+)' (globally|in this conversation|in this workspace|in this project|when not in a project)$/i, (_, target, scope) => {
    const smap = {
      'globally': '全局',
      'in this conversation': '在此对话中',
      'in this workspace': '在此工作区中',
      'in this project': '在此项目中',
      'when not in a project': '在未处于项目中时',
    };
    return `是，${smap[scope.toLowerCase()] || scope}为 '${target}' 保存规则`;
  }],
  [/^Are you sure you want to delete the hook "(.+)"\?$/i, '确定要删除钩子 (Hook) “$1”吗？'],
  [/^Browser task:\s*"(.+)"$/i, '浏览器任务：“$1”'],
  [/^Generated image:\s*"(.+)"$/i, '已生成图片：“$1”'],
  [/^Internal search:\s*"(.+)"$/i, '内部搜索：“$1”'],
  [/^Invoked subagent:\s*(.+)$/i, '已调用子智能体：$1'],
  [/^Listed directory\s+(.+)$/i, '已列出目录 $1'],
  [/^Opened browser:\s*(.+)$/i, '已打开浏览器：$1'],
  [/^Opens external link:\s*(.+)$/i, '打开外部链接：$1'],
  [/^Open URL in system browser:\s*(.+)$/i, '在系统浏览器中打开网址：$1'],
  [/^Read URL:\s*(.+)$/i, '已读取网址：$1'],
  [/^Typed '(.+)' in Browser$/i, "已在浏览器中输入 '$1'"],
  [/^Typing '(.+)' in Browser$/i, "正在浏览器中输入 '$1'"],
  [/^Used MCP tool:\s*(.+)$/i, '已使用 MCP 工具：$1'],
  [/^Used tool:\s*(.+)$/i, '已使用工具：$1'],
  [/^Waiting for command completion \(up to (\d+) seconds\)$/i, '正在等待命令完成（最多 $1 秒）'],
  [/^Working directory:\s*(.+)$/i, '工作目录：$1'],
  [/^Process exited with code (\d+)\.?$/i, '进程已退出，退出码：$1。'],
  [/^Terminal process (.+) exited with non-zero code (\d+)$/i, '终端进程 $1 以非零代码 $2 退出'],
  [/^Proceed with implementation plan and (\d+) comments?$/i, '带着 $1 条评论继续执行实施计划'],
  [/^Publish (.+) to origin$/i, '将 $1 发布到远程 (origin)'],
  [/^Published (.+) to origin\.?$/i, '已将 $1 发布到远程 (origin)。'],
  [/^Push (\d+) commits? to (.+)$/i, '将 $1 个提交推送到 $2'],
  [/^Pushed (\d+) commits? to (.+)\.?$/i, '已将 $1 个提交推送到 $2。'],
  [/^Pushed to (.+)\.?$/i, '已推送到 $1。'],
  [/^Amended commit on (.+)\.?$/i, '已在 $1 上修正提交 (Amend)。'],
  [/^Fold lines (\d+)-(\d+)$/i, '折叠第 $1-$2 行'],
  [/^Unfold lines (\d+)-(\d+)$/i, '展开第 $1-$2 行'],
  [/^Load (\d+) (earlier|later) steps$/i, (_, n, dir) => `加载${dir.toLowerCase() === 'earlier' ? '更早的' : '后续'} ${n} 个步骤`],
  [/^Load older messages, showing (\d+) of (\d+)$/i, '加载更早的消息（当前显示 $1 / $2）'],
  [/^Model unavailable, retrying in (\d+)s(.*)$/i, '模型暂不可用，$1 秒后重试$2'],
  [/^Open (.+) skill$/i, '打开 $1 技能'],
  [/^Open the (.+) plugin$/i, '打开 $1 插件'],
  [/^Open conversation (.+)$/i, '打开对话 $1'],
  [/^Send all \((\d+)\)$/i, '全部发送（$1）'],
  [/^Send now:\s*(.+)$/i, '立即发送：$1'],
  [/^(Sending|Sent|Rejected sending|Suggested sending) (.+) to command$/i, (_, act, val) => {
    const amap = {
      'sending': '正在向命令发送',
      'sent': '已向命令发送',
      'rejected sending': '已拒绝向命令发送',
      'suggested sending': '建议向命令发送'
    };
    return `${amap[act.toLowerCase()]} ${val}`;
  }],
  [/^View Diff for (.+)$/i, '查看 $1 的差异对比 (Diff)'],
  [/^Version\s+([\d.]+.*)$/i, '版本 $1'],
  [/^Today\s+(.+)$/i, '今天 $1'],
  [/^Yesterday\s+(.+)$/i, '昨天 $1'],
  [/^today at\s+(.+)$/i, '今天 $1'],
  [/^tomorrow at\s+(.+)$/i, '明天 $1'],
  [/^Setting up WSL:\s*(.+)$/i, '正在配置 WSL：$1'],
  [/^Installing into\s+(.+)…$/i, '正在安装到 $1…'],
  // --- Antigravity 2.23.0 新增动态模板规则 ---
  [/^(\d+)\s+folders? in this project could not be loaded because their locations are invalid\.$/i, '此项目中有 $1 个文件夹因位置无效而无法加载。'],
  [/^(\d+)\s+customizations? failed to load$/i, '$1 项自定义扩展加载失败'],
  [/^\+(\d+)\s+more\s*\(Show all\)$/i, '+$1 项更多（显示全部）'],
  [/^Adding plugins from\s+(.+)$/i, '正在从 $1 添加插件'],
  [/^Authorization code for\s+(.+)$/i, '$1 的授权码'],
  [/^Automatically create a new\s+(.+)\s+workspace when the conversation starts$/i, '对话开始时自动新建 $1 工作区'],
  [/^Code search:\s*"(.+)"$/i, '代码搜索：“$1”'],
  [/^Committed to\s+(.+)\.$/i, '已提交至 $1。'],
  [/^Compare responses from\s+(\d+)\s+models side-by-side to find the best result\.$/i, '并排对比 $1 个模型的回答以选出最佳结果。'],
  [/^Could not attach folder\s+"(.+)":\s*(.+)$/i, '无法附加文件夹“$1”：$2'],
  [/^Could not open folder:\s*(.+)$/i, '无法打开文件夹：$1'],
  [/^Could not read\s+(.+)\.$/i, '无法读取 $1。'],
  [/^Creating workspace\s+"(.+)"\.{3}$/i, '正在创建工作区“$1”...'],
  [/^Edit comment:\s*(.+)$/i, '编辑评论：$1'],
  [/^Enlarged media:\s*(.+)$/i, '放大媒体：$1'],
  [/^Error deleting MCP server:\s*(.+)$/i, '删除 MCP 服务出错：$1'],
  [/^Error disconnecting MCP server:\s*(.+)$/i, '断开 MCP 服务连接出错：$1'],
  [/^Error installing MCP server:\s*(.+)$/i, '安装 MCP 服务出错：$1'],
  [/^Error restarting MCP server:\s*(.+)$/i, '重启 MCP 服务出错：$1'],
  [/^Error restarting\s+(.+):\s*(.+)$/i, '重启 $1 出错：$2'],
  [/^Error submitting auth code:\s*(.+)$/i, '提交授权码出错：$1'],
  [/^Error toggling MCP server:\s*(.+)$/i, '切换 MCP 服务状态出错：$1'],
  [/^Error toggling tool:\s*(.+)$/i, '切换工具状态出错：$1'],
  [/^Exited with code\s+(\d+)\.$/i, '已退出，退出码：$1。'],
  [/^Failed to compress image to fit within\s+([\d.]+)MB$/i, '无法将图片压缩至 $1MB 以内'],
  [/^Failed to create project:\s*(.+)$/i, '创建项目失败：$1'],
  [/^Failed to fetch directory contents:\s*(.+)$/i, '获取目录内容失败：$1'],
  [/^Failed to resolve folder:\s*(.+)$/i, '解析文件夹失败：$1'],
  [/^Failed to save configuration:\s*(.+)$/i, '保存配置失败：$1'],
  [/^Failed to save project branch:\s*(.+)$/i, '保存项目分支失败：$1'],
  [/^Failed to save project permissions:\s*(.+)$/i, '保存项目权限失败：$1'],
  [/^Failed to save project settings:\s*(.+)$/i, '保存项目设置失败：$1'],
  [/^Failed to save project:\s*(.+)$/i, '保存项目失败：$1'],
  [/^Failed to save settings:\s*(.+)$/i, '保存设置失败：$1'],
  [/^Failed to start\s+"(.+)"\.$/i, '启动“$1”失败。'],
  [/^Failed to update\s+"(.+)"$/i, '更新“$1”失败'],
  [/^Filter skills and rules:\s*(.+)$/i, '筛选技能与规则：$1'],
  [/^Fix with Agent:\s*(.+)$/i, '使用智能体修复：$1'],
  [/^Forked from\s+(.+)$/i, '分叉 (Fork) 自 $1'],
  [/^Further action is required to use\s+(.+)$/i, '需要执行进一步操作才能使用 $1'],
  [/^Install folder\s+"(.+)"\s+is already in use$/i, '安装文件夹“$1”已被占用'],
  [/^MCP server\s+"(.+)"\s+does not have a remote configuration\.$/i, 'MCP 服务“$1”没有远程配置。'],
  [/^MCP server\s+"(.+)"\s+does not have a supported configuration\.$/i, 'MCP 服务“$1”没有受支持的配置。'],
  [/^MCP server\s+"(.+)"\s+does not have any installation commands\.$/i, 'MCP 服务“$1”没有任何安装命令。'],
  [/^MCP server\s+"(.+)"\s+not found in the store\.$/i, '在商店中未找到 MCP 服务“$1”。'],
  [/^No installation command found for MCP server\s+"(.+)"\.$/i, '未找到 MCP 服务“$1”的安装命令。'],
  [/^Server\s+"(.+)"\s+not found in config$/i, '在配置中未找到服务“$1”'],
  [/^Marked\s+(\d+)\s+conversations? as read$/i, '已将 $1 个对话标记为已读'],
  [/^Move to Group:\s*(.+)$/i, '移动到分组：$1'],
  [/^No more older messages, showing\s+(\d+)\s+of\s+(\d+)$/i, '没有更早的消息了（当前显示 $1 / $2）'],
  [/^No plugins found for\s+"(.+)"\.$/i, '未找到与“$1”相关的插件。'],
  [/^Open Subagent:\s*(.+)$/i, '打开子智能体：$1'],
  [/^Playback speed\s+([\d.]+)x$/i, '播放速度 $1 倍'],
  [/^Please fill in all required fields:\s*(.+)$/i, '请填写所有必填字段：$1'],
  [/^Recording exceeds 15MB limit\s*\(([\d.]+)MB\)$/i, '录音超出 15MB 限制（当前 $1MB）'],
  [/^Reset\s+(\d+)\s+overrides?$/i, '重置 $1 项覆盖设置'],
  [/^Search for\s+"(.+)"\s+in the Marketplace$/i, '在插件市场中搜索“$1”'],
  [/^Secret for a new\s+(.+)\s+account$/i, '新 $1 账户的密钥'],
  [/^Secret for\s+(.+)$/i, '$1 的密钥'],
  [/^See\s+(\d+)\s+more$/i, '查看另外 $1 项'],
  [/^See\s+(\d+)\s+more\s+(.+)$/i, '查看另外 $1 项 $2'],
  [/^Select\s+(.+)\s+Theme$/i, '选择 $1 主题'],
  [/^Select at least\s+(\d+)\s+items$/i, '请至少选择 $1 项'],
  [/^Select at most\s+(\d+)\s+items$/i, '最多只能选择 $1 项'],
  [/^Select model with\s+(.+)$/i, '选择模型 ($1)'],
  [/^Sign in to use\s+(.+)!$/i, '登录以使用 $1！'],
  [/^Sorry, this account is ineligible to use\s+(.+)$/i, '抱歉，此账户无权使用 $1'],
  [/^Total media size exceeds\s+(\d+)MB limit$/i, '媒体文件总大小超出 $1MB 限制'],
  [/^User uploaded media\s+(\d+)$/i, '用户上传的媒体 $1'],
  [/^Work in\s+(.+)$/i, '在 $1 中工作'],
  [/^Work locally on\s+(.+)$/i, '在本地处理 $1'],
  [/^Worktree from\s+(.+)$/i, '来自 $1 的工作树'],
  [/^Zoom\s+(\d+)%,\s*reset to fit$/i, '缩放 $1%，点击重置为合适大小'],
  [/^No\s+(.+)$/i, (full, rest) => {
    const tr = translateExactOrPattern(rest);
    return tr && tr !== rest ? `没有${tr}` : full;
  }],
];

// 社区级联正则规则 (322 条)
const COMMUNITY_REGEX_PATTERNS = [
  {
    "regex": "^Thought\\s+for\\s+(\\d+)\\s*h\\s+(\\d+)\\s*m\\s+(\\d+(?:\\.\\d+)?)\\s*s$",
    "replacement": "已思考 $1 小时 $2 分 $3 秒"
  },
  {
    "regex": "^Thought\\s+for\\s+(\\d+)\\s*h\\s+(\\d+)\\s*m$",
    "replacement": "已思考 $1 小时 $2 分钟"
  },
  {
    "regex": "^Thought\\s+for\\s+(\\d+)\\s*h$",
    "replacement": "已思考 $1 小时"
  },
  {
    "regex": "^Thought\\s+for\\s+(\\d+)\\s*m\\s+(\\d+(?:\\.\\d+)?)\\s*s$",
    "replacement": "已思考 $1 分 $2 秒"
  },
  {
    "regex": "^Thought\\s+for\\s+(\\d+)\\s*m$",
    "replacement": "已思考 $1 分钟"
  },
  {
    "regex": "^Thought\\s+for\\s+(\\d+(?:\\.\\d+)?)\\s*s$",
    "replacement": "已思考 $1 秒"
  },
  {
    "regex": "^See all\\s*\\((\\d+)\\)$",
    "replacement": "查看全部 ($1)"
  },
  {
    "regex": "^See all\\s+(\\d+)$",
    "replacement": "查看全部 $1 项"
  },
  {
    "regex": "^\\((\\d+)\\s+subagents?\\)$",
    "replacement": "($1 个子智能体)"
  },
  {
    "regex": "^(\\d+)\\s+subagents?$",
    "replacement": "$1 个子智能体"
  },
  {
    "regex": "^(\\d+)\\s+seconds?\\s+ago$",
    "replacement": "$1 秒前"
  },
  {
    "regex": "^(\\d+)\\s+minutes?\\s+ago$",
    "replacement": "$1 分钟前"
  },
  {
    "regex": "^(\\d+)\\s+hours?\\s+ago$",
    "replacement": "$1 小时前"
  },
  {
    "regex": "^(\\d+)\\s+days?\\s+ago$",
    "replacement": "$1 天前"
  },
  {
    "regex": "^(\\d+)\\s+weeks?\\s+ago$",
    "replacement": "$1 周前"
  },
  {
    "regex": "^(\\d+)\\s+months?\\s+ago$",
    "replacement": "$1 个月前"
  },
  {
    "regex": "^(\\d+)\\s+years?\\s+ago$",
    "replacement": "$1 年前"
  },
  {
    "regex": "^(\\d+)[sS]\\s+ago$",
    "replacement": "$1 秒前"
  },
  {
    "regex": "^(\\d+)[mM]\\s+ago$",
    "replacement": "$1 分钟前"
  },
  {
    "regex": "^(\\d+)[hH]\\s+ago$",
    "replacement": "$1 小时前"
  },
  {
    "regex": "^(\\d+)[dD]\\s+ago$",
    "replacement": "$1 天前"
  },
  {
    "regex": "^(\\d{1,2}:\\d{2})\\s*\\/\\s*(\\d{1,2}:\\d{2})$",
    "replacement": "$1 / $2"
  },
  {
    "regex": "^(\\d{1,2}:\\d{2}:\\d{2})\\s*\\/\\s*(\\d{1,2}:\\d{2}:\\d{2})$",
    "replacement": "$1 / $2"
  },
  {
    "regex": "^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\s+(\\d{1,2})\\s*[-–—]\\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\s+(\\d{1,2})$",
    "replacement": "$1 $2日 - $3 $4日"
  },
  {
    "regex": "^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\s+(\\d{1,2})\\s*[-–—]\\s*(\\d{1,2})$",
    "replacement": "$1 $2日 - $3日"
  },
  {
    "regex": "^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\s+(\\d{1,2}),\\s*(\\d{4}),\\s*(\\d{1,2}:\\d{2}(?::\\d{2})?)\\s*(AM|PM)?$",
    "replacement": "$3年 $1 $2日 $5 $4"
  },
  {
    "regex": "^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\s+(\\d{1,2}),\\s*(\\d{1,2}:\\d{2}(?::\\d{2})?)\\s*(AM|PM)?$",
    "replacement": "$1 $2日 $4 $3"
  },
  {
    "regex": "^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\s+(\\d{1,2}),\\s*(\\d{4})$",
    "replacement": "$3年 $1 $2日"
  },
  {
    "regex": "^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\s+(\\d{1,2})$",
    "replacement": "$1 $2日"
  },
  {
    "regex": "\\bJan\\b(?=\\s+\\d+日)",
    "replacement": "1月"
  },
  {
    "regex": "\\bFeb\\b(?=\\s+\\d+日)",
    "replacement": "2月"
  },
  {
    "regex": "\\bMar\\b(?=\\s+\\d+日)",
    "replacement": "3月"
  },
  {
    "regex": "\\bApr\\b(?=\\s+\\d+日)",
    "replacement": "4月"
  },
  {
    "regex": "\\bMay\\b(?=\\s+\\d+日)",
    "replacement": "5月"
  },
  {
    "regex": "\\bJun\\b(?=\\s+\\d+日)",
    "replacement": "6月"
  },
  {
    "regex": "\\bJul\\b(?=\\s+\\d+日)",
    "replacement": "7月"
  },
  {
    "regex": "\\bAug\\b(?=\\s+\\d+日)",
    "replacement": "8月"
  },
  {
    "regex": "\\bSep\\b(?=\\s+\\d+日)",
    "replacement": "9月"
  },
  {
    "regex": "\\bOct\\b(?=\\s+\\d+日)",
    "replacement": "10月"
  },
  {
    "regex": "\\bNov\\b(?=\\s+\\d+日)",
    "replacement": "11月"
  },
  {
    "regex": "\\bDec\\b(?=\\s+\\d+日)",
    "replacement": "12月"
  },
  {
    "regex": "\\bAM\\b(?=\\s+\\d{1,2}:\\d{2})",
    "replacement": "上午"
  },
  {
    "regex": "\\bPM\\b(?=\\s+\\d{1,2}:\\d{2})",
    "replacement": "下午"
  },
  {
    "regex": "(?<=\\d{1,2}:\\d{2}(?::\\d{2})?\\s*)AM\\b",
    "replacement": "上午"
  },
  {
    "regex": "(?<=\\d{1,2}:\\d{2}(?::\\d{2})?\\s*)PM\\b",
    "replacement": "下午"
  },
  {
    "regex": "^([\\d\\.]+)% of the customization budget is available\\.$",
    "replacement": "$1% 的自定义扩展预算可用。"
  },
  {
    "regex": "^Show (\\d+) breakdowns?$",
    "replacement": "显示 $1 项明细"
  },
  {
    "regex": "^Hide (\\d+) breakdowns?$",
    "replacement": "隐藏 $1 项明细"
  },
  {
    "regex": "^You have used some of your weekly limit, it will fully refresh in (.+)\\.$",
    "replacement": "您已消耗了部分每周额度，将在 $1 后完全重置刷新。"
  },
  {
    "regex": "^You have used some of your 5 hour limit, it will fully refresh in (.+)\\.$",
    "replacement": "您已消耗了部分 5 小时额度，将在 $1 后完全重置刷新。"
  },
  {
    "regex": "^You have hit your 5-hour limit, so the weekly limit does not currently apply\\. Your 5-hour limit will refresh in (.+)\\.$",
    "replacement": "您已达到 5 小时上限，因此每周额度当前不适用。您的 5 小时额度将在 $1 后重置刷新。"
  },
  {
    "regex": "^You have hit your 5-hour limit, it will refresh in (.+)\\. If on a supported paid plan, you can use AI credits in the interim\\.$",
    "replacement": "您已达到 5 小时上限，将在 $1 后重置刷新。如果使用的是支持的付费套餐，您可以在此期间使用 AI 积分。"
  },
  {
    "regex": "(\\d+) days?, (\\d+) hours?",
    "replacement": "$1 天 $2 小时"
  },
  {
    "regex": "(\\d+) hours?, (\\d+) minutes?",
    "replacement": "$1 小时 $2 分钟"
  },
  {
    "regex": "(\\d+) days?",
    "replacement": "$1 天"
  },
  {
    "regex": "(\\d+) hours?",
    "replacement": "$1 小时"
  },
  {
    "regex": "(\\d+) minutes?",
    "replacement": "$1 分钟"
  },
  {
    "regex": "^(\\d+) files? changed$",
    "replacement": "$1 个文件已修改"
  },
  {
    "regex": "^(\\d+) insertions?\\(\\+\\)$",
    "replacement": "$1 行新增(+)"
  },
  {
    "regex": "^(\\d+) deletions?\\(-\\)$",
    "replacement": "$1 行删除(-)"
  },
  {
    "regex": "^Step (\\d+) of (\\d+)$",
    "replacement": "第 $1 步（共 $2 步）"
  },
  {
    "regex": "^Task (\\d+) running$",
    "replacement": "正在运行任务 $1"
  },
  {
    "regex": "^Saved at (\\d{1,2}:\\d{2}(?::\\d{2})?)$",
    "replacement": "已于 $1 保存"
  },
  {
    "regex": "^(\\d+) active subagents?$",
    "replacement": "$1 个运行中的子智能体"
  },
  {
    "regex": "^Created (\\d+) files?$",
    "replacement": "已创建 $1 个文件"
  },
  {
    "regex": "^Modified (\\d+) files?$",
    "replacement": "已修改 $1 个文件"
  },
  {
    "regex": "^Thinking for (\\d+)s$",
    "replacement": "已思考 $1 秒"
  },
  {
    "regex": "^Stopped after (\\d+) steps?$",
    "replacement": "已在 $1 步后停止"
  },
  {
    "regex": "Scan the code to open this device in\\s*",
    "replacement": "扫描二维码在此设备中打开 "
  },
  {
    "regex": "to browse the store, or add a custom server via the MCP config\\.?",
    "replacement": "浏览应用商店，或通过 MCP 配置文件添加自定义服务。"
  },
  {
    "regex": "^(\\d+(?:\\.\\d+)?)% of the customization budget is available\\.?$",
    "replacement": "$1% 的自定义扩展预算可用。"
  },
  {
    "regex": "了解更多关于\\s*Inherit General",
    "replacement": "了解更多关于继承通用设置"
  },
  {
    "regex": "Also includes global settings when working in this project\\.?",
    "replacement": "在此项目中工作时也包含全局设置。"
  },
  {
    "regex": "\\bInherit General\\b",
    "replacement": "继承通用设置"
  },
  {
    "regex": "It requires\\s+([a-zA-Z0-9\\s]+?)\\s+to be installed\\.?",
    "replacement": "需要安装 $1 才能运行。"
  },
  {
    "regex": "(\\d+(?:\\.\\d+)?)% of the customization budget is available",
    "replacement": "$1% 的自定义扩展预算可用"
  },
  {
    "regex": "Configure (?:the )?browser subagent\\s*\\.?",
    "replacement": "配置浏览器子智能体。"
  },
  {
    "regex": "(\\d+(?:\\.\\d+)?)% of the customization budget is available\\.?",
    "replacement": "$1% 的自定义扩展预算可用。"
  },
  {
    "regex": "(?:^|\\s*)of the customization budget is available\\.?",
    "replacement": " 的自定义扩展预算可用。"
  },
  {
    "regex": "Manage project folders,\\s*agent settings,?\\s*and permissions\\.?",
    "replacement": "管理项目文件夹、智能体设置与权限。"
  },
  {
    "regex": "No folders added yet\\.?",
    "replacement": "暂未添加任何文件夹。"
  },
  {
    "regex": "^\\+\\s*Add Folder$",
    "replacement": "+ 添加文件夹"
  },
  {
    "regex": "You have used some of your 5-?hour limit,?\\s*it will fully refresh in (.*?)\\.?$",
    "replacement": "您已消耗了部分 5 小时额度，将在 $1 后完全重置刷新。"
  },
  {
    "regex": "You have used some of your weekly limit,?\\s*it will fully refresh in (.*?)\\.?$",
    "replacement": "您已消耗了部分每周额度，将在 $1 后完全重置刷新。"
  },
  {
    "regex": "You have hit your 5-?hour limit,?\\s*it will refresh in (.*?)\\.?$",
    "replacement": "您已达到 5 小时上限，将在 $1 后重置刷新。"
  },
  {
    "regex": "You have hit your weekly limit,?\\s*it will refresh in (.*?)\\.?$",
    "replacement": "您已达到每周上限，将在 $1 后重置刷新。"
  },
  {
    "regex": "^Permanently delete (.*?)\\.?$",
    "replacement": "永久删除 $1。"
  },
  {
    "regex": "配置浏览器子智能体[。.]\\s*It requires",
    "replacement": "配置浏览器子智能体。需要安装"
  },
  {
    "regex": "Configure (?:the )?browser subagent[。.]\\s*It requires",
    "replacement": "配置浏览器子智能体。需要安装"
  },
  {
    "regex": "\\bIt requires\\b",
    "replacement": "需要安装"
  },
  {
    "regex": "^快捷键\\s*for quick navigation and control\\.?$",
    "replacement": "快捷键，用于快速导航和操作控制。"
  },
  {
    "regex": "^(?:Shortcuts\\s+)?for quick navigation and control\\.?$",
    "replacement": "用于快速导航和操作控制。"
  },
  {
    "regex": "^(?:LAYOUT|Layout)\\s+CONTROLS$",
    "replacement": "布局控制"
  },
  {
    "regex": "Attach (?:a )?screenshot(?:s)?\\s*\\(optional\\)",
    "replacement": "附上屏幕截图（可选）"
  },
  {
    "regex": "Please list the steps to reproduce the issue\\.?",
    "replacement": "请列出重现该问题的具体操作步骤…"
  },
  {
    "regex": "Describe the bug you encountered\\.{0,3}",
    "replacement": "请详细描述您遇到的问题或缺陷…"
  },
  {
    "regex": "^(?:Steps\\s+to\\s+[Rr]eproduce|STEPS\\s+TO\\s+REPRODUCE)\\b",
    "replacement": "重现步骤"
  },
  {
    "regex": "^(Enter|Alt\\+Enter|Shift\\+Enter|Ctrl\\+Enter|Cmd\\+Enter)\\s+Queues after the turn$",
    "replacement": "$1 轮次结束后进入排队"
  },
  {
    "regex": "^(Enter|Alt\\+Enter|Shift\\+Enter|Ctrl\\+Enter|Cmd\\+Enter)\\s+Sends immediately$",
    "replacement": "$1 立即发送"
  },
  {
    "regex": "^(Enter|Alt\\+Enter|Shift\\+Enter|Ctrl\\+Enter|Cmd\\+Enter)\\s+On empty prompt,\\s*sends next in queue$",
    "replacement": "$1 在输入框为空时发送队列中的下一条消息"
  },
  {
    "regex": "^On empty prompt,\\s*sends next in queue$",
    "replacement": "在输入框为空时发送队列中的下一条消息"
  },
  {
    "regex": "^Queues after the turn$",
    "replacement": "轮次结束后进入排队"
  },
  {
    "regex": "^Sends immediately$",
    "replacement": "立即发送"
  },
  {
    "regex": "^Models\\s+within\\s+this\\s+group:?\\s*(.*)$",
    "replacement": "该分组包含的模型：$1"
  },
  {
    "regex": "^Inherits\\s+your\\s+General\\s+settings\\s*在此项目中工作时[。.]?$",
    "replacement": "在此项目中工作时，继承您的“通用”设置。"
  },
  {
    "regex": "^Inherits\\s+(?:your\\s+)?(?:General|default)\\s+settings[。.]?$",
    "replacement": "继承您的“通用”设置。"
  },
  {
    "regex": "\\bInherits\\s+your\\s+General\\s+settings\\b",
    "replacement": "继承您的“通用”设置"
  },
  {
    "regex": "^Your\\s+quota\\s+for\\s+this\\s+model\\s+is\\s+running\\s+low\\.?",
    "replacement": "您在此模型上的剩余配额即将耗尽。"
  },
  {
    "regex": "^Your\\s+quota\\s+for\\s+this\\s+model\\s+has\\s+run\\s+out\\.?",
    "replacement": "您在此模型上的配额已耗尽。"
  },
  {
    "regex": "^View\\s+Usage\\b",
    "replacement": "查看用量明细"
  },
  {
    "regex": "\\bSends\\s+after\\s+agent\\s+finishes\\s+working\\b",
    "replacement": "智能体结束工作后发送"
  },
  {
    "regex": "^Sends\\s+after\\s+agent\\s+finishes\\s+working[。.]?$",
    "replacement": "智能体结束工作后发送"
  },
  {
    "regex": "^Send\\s+Now$",
    "replacement": "立即发送"
  },
  {
    "regex": "^Select\\s+Project(\\s+(?:Ctrl|Cmd|Alt|Shift)\\+[\\w;:,\\/\\+\\-]+)?$",
    "replacement": "选择项目$1"
  },
  {
    "regex": "^Select\\s+Model(\\s+(?:Ctrl|Cmd|Alt|Shift)\\+[\\w;:,\\/\\+\\-]+)?$",
    "replacement": "选择模型$1"
  },
  {
    "regex": "^No\\s+Project$",
    "replacement": "无项目关联"
  },
  {
    "regex": "^Quick\\s+Start$",
    "replacement": "快速入门"
  },
  {
    "regex": "^Copy\\s+项目名称$",
    "replacement": "复制项目名称"
  },
  {
    "regex": "^Copy\\s+Project\\s+Name$",
    "replacement": "复制项目名称"
  },
  {
    "regex": "^Cancel\\s*\\(((?:Ctrl|Cmd|Alt|Shift)\\+[\\w\\+\\-]+)\\)$",
    "replacement": "取消 ($1)"
  },
  {
    "regex": "^Pin$",
    "replacement": "置顶"
  },
  {
    "regex": "^Unpin$",
    "replacement": "取消置顶"
  },
  {
    "regex": "^Good\\s+response$",
    "replacement": "优质回答"
  },
  {
    "regex": "^Bad\\s+response$",
    "replacement": "不佳回答"
  },
  {
    "regex": "^Mark\\s+Unread$",
    "replacement": "标记为未读"
  },
  {
    "regex": "^Mark\\s+Read$",
    "replacement": "标记为已读"
  },
  {
    "regex": "^Copy\\s+Command$",
    "replacement": "复制命令"
  },
  {
    "regex": "^(\\d+)\\s+tasks?\\s+running$",
    "replacement": "$1 个运行中的任务"
  },
  {
    "regex": "^Ran\\s+(.*)$",
    "replacement": "运行 $1"
  },
  {
    "regex": "^Explored\\s+(\\d+)\\s+files?$",
    "replacement": "已浏览探索 $1 个文件"
  },
  {
    "regex": "^Explored\\s+(.*)$",
    "replacement": "已浏览探索 $1"
  },
  {
    "regex": "^Edited\\s+(\\d+)\\s+files?(\\s*\\([^)]+\\))?$",
    "replacement": "已编辑 $1 个文件$2"
  },
  {
    "regex": "^Viewed\\s+(\\d+)\\s+files?(\\s*\\([^)]+\\))?$",
    "replacement": "已查看 $1 个文件$2"
  },
  {
    "regex": "^Edited\\s+(.*)$",
    "replacement": "已编辑 $1"
  },
  {
    "regex": "^Viewed\\s+(.*)$",
    "replacement": "已查看 $1"
  },
  {
    "regex": "^Ran\\s+(\\d+)\\s+commands?$",
    "replacement": "已运行 $1 个命令"
  },
  {
    "regex": "^Explored\\s+(\\d+)\\s+tasks?$",
    "replacement": "已查看 $1 个任务"
  },
  {
    "regex": "^Timed\\s+(\\d+)\\s+seconds?$",
    "replacement": "已计时 $1 秒"
  },
  {
    "regex": "^Timed\\s+(\\d+)\\s+minutes?$",
    "replacement": "已计时 $1 分钟"
  },
  {
    "regex": "(:?\\s*)Timer has expired$",
    "replacement": "$1定时器已到期"
  },
  {
    "regex": "(\\s+)finished$",
    "replacement": "$1已完成"
  },
  {
    "regex": "^Outside\\s+of\\s+Project$",
    "replacement": "项目外"
  },
  {
    "regex": "^Inside\\s+of\\s+Project$",
    "replacement": "项目内"
  },
  {
    "regex": "^Updated\\s+(.*)$",
    "replacement": "更新于 $1"
  },
  {
    "regex": "^Created\\s+(.*)$",
    "replacement": "创建于 $1"
  },
  {
    "regex": "继承您的“通用”设置\\s+when working in this project\\.?",
    "replacement": "在此项目中工作时，继承您的“通用”设置。"
  },
  {
    "regex": "Inherits\\s+your\\s+[“\\\"]?General[”\\\"]?\\s+settings\\s+when working in this project\\.?",
    "replacement": "在此项目中工作时，继承您的“通用”设置。"
  },
  {
    "regex": "\\bwhen working in this project\\.?",
    "replacement": "在此项目中工作时。"
  },
  {
    "regex": "^Tool\\s+Permissions$",
    "replacement": "工具权限"
  },
  {
    "regex": "^Controls\\s+the\\s+actions\\s+the\\s+agent\\s+can\\s+take[。.]?$",
    "replacement": "控制智能体可以执行的操作。"
  },
  {
    "regex": "^Whether\\s+the\\s+agent\\s+asks\\s+you\\s+to\\s+review\\s+its\\s+documents[。.]?$",
    "replacement": "智能体在创建产物文档时是否请求您审查。"
  },
  {
    "regex": "^Browser\\s+settings\\s+have\\s+moved$",
    "replacement": "浏览器设置已迁移"
  },
  {
    "regex": "Browser\\s+settings\\s+have\\s+moved\\s+to\\s+the\\s+Browser\\s+section\\s+of\\s+General\\s+settings\\.?",
    "replacement": "浏览器设置已迁移至“通用设置”中的“浏览器”板块。"
  },
  {
    "regex": "^Go\\s+to\\s+General\\s+settings$",
    "replacement": "前往通用设置"
  },
  {
    "regex": "^Worked\\s+for\\s+(\\d+)\\s*h\\s+(\\d+)\\s*m\\s+(\\d+(?:\\.\\d+)?)\\s*s$",
    "replacement": "已运行 $1 小时 $2 分 $3 秒"
  },
  {
    "regex": "^Worked\\s+for\\s+(\\d+)\\s*h\\s+(\\d+)\\s*m$",
    "replacement": "已运行 $1 小时 $2 分钟"
  },
  {
    "regex": "^Worked\\s+for\\s+(\\d+)\\s*h$",
    "replacement": "已运行 $1 小时"
  },
  {
    "regex": "^Worked\\s+for\\s+(\\d+)\\s*m\\s+(\\d+(?:\\.\\d+)?)\\s*s$",
    "replacement": "已运行 $1 分 $2 秒"
  },
  {
    "regex": "^Worked\\s+for\\s+(\\d+)\\s*m$",
    "replacement": "已运行 $1 分钟"
  },
  {
    "regex": "^Worked\\s+for\\s+(\\d+(?:\\.\\d+)?)\\s*s$",
    "replacement": "已运行 $1 秒"
  },
  {
    "regex": "^Stopped\\s+after\\s+(\\d+)\\s*h\\s+(\\d+)\\s*m\\s+(\\d+(?:\\.\\d+)?)\\s*s$",
    "replacement": "在 $1 小时 $2 分 $3 秒后停止"
  },
  {
    "regex": "^Stopped\\s+after\\s+(\\d+)\\s*h\\s+(\\d+)\\s*m$",
    "replacement": "在 $1 小时 $2 分钟后停止"
  },
  {
    "regex": "^Stopped\\s+after\\s+(\\d+)\\s*h$",
    "replacement": "在 $1 小时后停止"
  },
  {
    "regex": "^Stopped\\s+after\\s+(\\d+)\\s*m\\s+(\\d+(?:\\.\\d+)?)\\s*s$",
    "replacement": "在 $1 分 $2 秒后停止"
  },
  {
    "regex": "^Stopped\\s+after\\s+(\\d+)\\s*m$",
    "replacement": "在 $1 分钟后停止"
  },
  {
    "regex": "^Stopped\\s+after\\s+(\\d+(?:\\.\\d+)?)\\s*s$",
    "replacement": "在 $1 秒后停止"
  },
  {
    "regex": "^Message\\s+from\\s+(.+)$",
    "replacement": "来自 $1 的消息"
  },
  {
    "regex": "^Executing\\s+task:\\s+(.+)$",
    "replacement": "正在执行任务: $1"
  },
  {
    "regex": "^Record Audio(\\s+Ctrl\\+[A-Za-z])$",
    "replacement": "录制音频$1"
  },
  {
    "regex": "^Create\\s+(?:New\\s+)?Project$",
    "replacement": "新建项目"
  },
  {
    "regex": "^New Terminal(\\s+Ctrl\\+Shift\\+.*?)$",
    "replacement": "新建终端$1"
  },
  {
    "regex": "^Add Terminal(\\s+Ctrl\\+Shift\\+.*?)$",
    "replacement": "添加终端$1"
  },
  {
    "regex": "^Add Context(\\s+.*)$",
    "replacement": "添加上下文$1"
  },
  {
    "regex": "^(\\d+)\\s+agents?\\s+running$",
    "replacement": "$1 个运行中的智能体"
  },
  {
    "regex": "Remote Control,\\s*or\\s*",
    "replacement": "远程控制，或 "
  },
  {
    "regex": "^(?:继承您的全局权限|Inherits\\s+your\\s+(?:Global\\s+Permissions|global\\s+permissions))[\\s,，]*(?:when\\s+working\\s+in\\s+this\\s+project|在此项目中工作时)[。.]?$",
    "replacement": "在此项目中工作时，继承您的全局权限。"
  },
  {
    "regex": "^Inherits\\s+your\\s+(?:Global\\s+Permissions|global\\s+permissions)[。.]?$",
    "replacement": "继承您的全局权限。"
  },
  {
    "regex": "\\b(?:Inherits\\s+your|继承您的)[\\s,，]*(?:Global\\s+Permissions|global\\s+permissions|全局权限)[\\s,，]*(?:when\\s+working\\s+in\\s+this\\s+project|在此项目中工作时)[。.]?",
    "replacement": "在此项目中工作时，继承您的全局权限。"
  },
  {
    "regex": "^(?:Also\\s+includes|也包含)[\\s,，]*(?:Global\\s+Permissions|global\\s+permissions|全局权限)[\\s,，]*(?:when\\s+working\\s+in\\s+this\\s+project|在此项目中工作时)[。.]?\\s*(?:Learn\\s+more|了解更多)[。.]?$",
    "replacement": "在此项目中工作时也包含全局权限。了解更多。"
  },
  {
    "regex": "^(?:Also\\s+includes|也包含)[\\s,，]*(?:Global\\s+Permissions|global\\s+permissions|全局权限)[\\s,，]*(?:when\\s+working\\s+in\\s+this\\s+project|在此项目中工作时)[。.]?$",
    "replacement": "在此项目中工作时也包含全局权限。"
  },
  {
    "regex": "\\b(?:Also\\s+includes|也包含)[\\s,，]*(?:Global\\s+Permissions|global\\s+permissions|全局权限)[\\s,，]*(?:when\\s+working\\s+in\\s+this\\s+project|在此项目中工作时)[。.]?",
    "replacement": "在此项目中工作时也包含全局权限。"
  },
  {
    "regex": "^[Rr]esets?\\s+in\\s+(\\d+)\\s*(?:d|days?)[,\\s]+(\\d+)\\s*(?:h|hours?)[,\\s]+(\\d+)\\s*(?:m|mins?|minutes?)[。.]?$",
    "replacement": "$1 天 $2 小时 $3 分钟后重置"
  },
  {
    "regex": "^[Rr]esets?\\s+in\\s+(\\d+)\\s*(?:d|days?)[,\\s]+(\\d+)\\s*(?:h|hours?)[。.]?$",
    "replacement": "$1 天 $2 小时后重置"
  },
  {
    "regex": "^[Rr]esets?\\s+in\\s+(\\d+)\\s*(?:h|hours?)[,\\s]+(\\d+)\\s*(?:m|mins?|minutes?)[。.]?$",
    "replacement": "$1 小时 $2 分钟后重置"
  },
  {
    "regex": "^[Rr]esets?\\s+in\\s+(\\d+)\\s*(?:m|mins?|minutes?)[,\\s]+(\\d+)\\s*(?:s|secs?|seconds?)[。.]?$",
    "replacement": "$1 分 $2 秒后重置"
  },
  {
    "regex": "^[Rr]esets?\\s+in\\s+(\\d+)\\s*(?:d|days?)[。.]?$",
    "replacement": "$1 天后重置"
  },
  {
    "regex": "^[Rr]esets?\\s+in\\s+(\\d+)\\s*(?:h|hours?)[。.]?$",
    "replacement": "$1 小时后重置"
  },
  {
    "regex": "^[Rr]esets?\\s+in\\s+(\\d+)\\s*(?:m|mins?|minutes?)[。.]?$",
    "replacement": "$1 分钟后重置"
  },
  {
    "regex": "^[Rr]esets?\\s+in\\s+(\\d+)\\s*(?:s|secs?|seconds?)[。.]?$",
    "replacement": "$1 秒后重置"
  },
  {
    "regex": "^[Rr]esets?\\s+in\\s+less\\s+than\\s+a\\s+minute[。.]?$",
    "replacement": "不到 1 分钟后重置"
  },
  {
    "regex": "^[Rr]esets?\\s+in\\s+a\\s+few\\s+seconds[。.]?$",
    "replacement": "几秒后重置"
  },
  {
    "regex": "^[Rr]esets?\\s+soon[。.]?$",
    "replacement": "即将重置"
  },
  {
    "regex": "\\b[Rr]esets?\\s+in\\s+(\\d+)\\s*(?:d|days?)[,\\s]+(\\d+)\\s*(?:h|hours?)",
    "replacement": "$1 天 $2 小时后重置"
  },
  {
    "regex": "\\b[Rr]esets?\\s+in\\s+(\\d+)\\s*(?:h|hours?)[,\\s]+(\\d+)\\s*(?:m|mins?|minutes?)",
    "replacement": "$1 小时 $2 分钟后重置"
  },
  {
    "regex": "\\b[Rr]esets?\\s+in\\s+(\\d+)\\s*(?:m|mins?|minutes?)[,\\s]+(\\d+)\\s*(?:s|secs?|seconds?)",
    "replacement": "$1 分 $2 秒后重置"
  },
  {
    "regex": "\\b[Rr]esets?\\s+in\\s+(\\d+)\\s*(?:d|days?)",
    "replacement": "$1 天后重置"
  },
  {
    "regex": "\\b[Rr]esets?\\s+in\\s+(\\d+)\\s*(?:h|hours?)",
    "replacement": "$1 小时后重置"
  },
  {
    "regex": "\\b[Rr]esets?\\s+in\\s+(\\d+)\\s*(?:m|mins?|minutes?)",
    "replacement": "$1 分钟后重置"
  },
  {
    "regex": "^[Rr]efreshes?\\s+in\\s+(\\d+)\\s*(?:d|days?)[,\\s]+(\\d+)\\s*(?:h|hours?)[,\\s]+(\\d+)\\s*(?:m|mins?|minutes?)[。.]?$",
    "replacement": "$1 天 $2 小时 $3 分钟后重置刷新"
  },
  {
    "regex": "^[Rr]efreshes?\\s+in\\s+(\\d+)\\s*(?:d|days?)[,\\s]+(\\d+)\\s*(?:h|hours?)[。.]?$",
    "replacement": "$1 天 $2 小时后重置刷新"
  },
  {
    "regex": "^[Rr]efreshes?\\s+in\\s+(\\d+)\\s*(?:h|hours?)[,\\s]+(\\d+)\\s*(?:m|mins?|minutes?)[。.]?$",
    "replacement": "$1 小时 $2 分钟后重置刷新"
  },
  {
    "regex": "^[Rr]efreshes?\\s+in\\s+(\\d+)\\s*(?:m|mins?|minutes?)[,\\s]+(\\d+)\\s*(?:s|secs?|seconds?)[。.]?$",
    "replacement": "$1 分 $2 秒后重置刷新"
  },
  {
    "regex": "^[Rr]efreshes?\\s+in\\s+(\\d+)\\s*(?:d|days?)[。.]?$",
    "replacement": "$1 天后重置刷新"
  },
  {
    "regex": "^[Rr]efreshes?\\s+in\\s+(\\d+)\\s*(?:h|hours?)[。.]?$",
    "replacement": "$1 小时后重置刷新"
  },
  {
    "regex": "^[Rr]efreshes?\\s+in\\s+(\\d+)\\s*(?:m|mins?|minutes?)[。.]?$",
    "replacement": "$1 分钟后重置刷新"
  },
  {
    "regex": "^[Rr]efreshes?\\s+in\\s+(\\d+)\\s*(?:s|secs?|seconds?)[。.]?$",
    "replacement": "$1 秒后重置刷新"
  },
  {
    "regex": "^[Rr]efreshes?\\s+soon[。.]?$",
    "replacement": "即将重置刷新"
  },
  {
    "regex": "^(?:All|全部)\\s+scheduled\\s+tasks\\s+run\\s+as\\s+(.+?)[。.]?$",
    "replacement": "所有定时任务均以 $1 模型运行。"
  },
  {
    "regex": "^scheduled\\s+tasks\\s+run\\s+as\\s+(.+?)[。.]?$",
    "replacement": "定时任务均以 $1 模型运行。"
  },
  {
    "regex": "^Search\\s+tasks[\\.…]*$",
    "replacement": "搜索任务..."
  },
  {
    "regex": "^Search\\s+conversations[\\.…]*$",
    "replacement": "搜索会话..."
  },
  {
    "regex": "^Enter\\s+scheduled\\s+task\\s+name[\\.…]*$",
    "replacement": "输入定时任务名称..."
  },
  {
    "regex": "^Enter\\s+a\\s+prompt\\s+for\\s+the\\s+agent\\s+to\\s+run[\\.…]*$",
    "replacement": "输入供智能体执行的提示词..."
  },
  {
    "regex": "\\bProject\\s*\\+\\s*Worktree\\b",
    "replacement": "项目 + 工作树"
  },
  {
    "regex": "^Undo\\s+to\\s+(?:this\\s+point|here)[。.]?$",
    "replacement": "撤销到此处"
  },
  {
    "regex": "^Failed\\s+to\\s+revalidate\\s+slash\\s+commands:[\\s]*(.*)$",
    "replacement": "重新验证斜杠命令失败：$1"
  },
  {
    "regex": "^Failed\\s+to\\s+add\\s+plugin[。.]?\\s*(?:Please\\s+try\\s+again[。.]?)?$",
    "replacement": "添加插件失败。请重试。"
  },
  {
    "regex": "^(?:All|全部)\\s+scheduled\\s+tasks?\\s+run\\s+as\\s+(.+?)[。.]?$",
    "replacement": "所有定时任务均以 $1 模型运行。"
  },
  {
    "regex": "^(?:All|全部)\\s+plugins?\\s+run\\s+as\\s+(.+?)[。.]?$",
    "replacement": "所有插件均以 $1 模型运行。"
  },
  {
    "regex": "^(?:All|全部)\\s+automations?\\s+run\\s+as\\s+(.+?)[。.]?$",
    "replacement": "所有自动化任务均以 $1 模型运行。"
  },
  {
    "regex": "^Mark\\s+all\\s+(\\d+)\\s+conversations\\s+as\\s+read$",
    "replacement": "将全部 $1 个会话标记为已读"
  },
  {
    "regex": "^Mark\\s+(\\d+)\\s+conversations?\\s+as\\s+read$",
    "replacement": "将 $1 个会话标记为已读"
  },
  {
    "regex": "^Are\\s+you\\s+sure\\s+you\\s+want\\s+to\\s+mark\\s+all\\s+(\\d+)\\s+conversations\\s+as\\s+read\\?\\s+This\\s+action\\s+cannot\\s+be\\s+undone\\.?$",
    "replacement": "您确定要将全部 $1 个会话标记为已读吗？此操作无法撤销。"
  },
  {
    "regex": "^Are\\s+you\\s+sure\\s+you\\s+want\\s+to\\s+mark\\s+(\\d+)\\s+conversations?\\s+as\\s+read\\?\\s+This\\s+action\\s+cannot\\s+be\\s+undone\\.?$",
    "replacement": "您确定要将 $1 个会话标记为已读吗？此操作无法撤销。"
  },
  {
    "regex": "\\bWorkspace\\s*\\+\\s*Worktree\\b",
    "replacement": "工作区 + 工作树"
  },
  {
    "regex": "^(\\d+)\\s+active\\s+conversations?$",
    "replacement": "$1 个活跃会话"
  },
  {
    "regex": "^(\\d+)\\s+archived\\s+conversations?$",
    "replacement": "$1 个已归档会话"
  },
  {
    "regex": "^Try\\s+(?:远程控制|Remote Control)$",
    "replacement": "体验远程控制"
  },
  {
    "regex": "^(\\d+)\\s+tools?\\s+enabled$",
    "replacement": "已启用 $1 个工具"
  },
  {
    "regex": "^Plugin:\\s*(.*)$",
    "replacement": "插件: $1"
  },
  {
    "regex": "^This plugin provides a specialized suite of skills for data engineers.*$",
    "replacement": "此插件为在 Google Cloud 上工作的数据工程师和数据库从业者提供专业技能套件。它充当专家助手，让您轻松与数据库交互、分析数据并优化数据库工作负载。"
  },
  {
    "regex": "^Build applications with the Gemini Interactions API.*$",
    "replacement": "使用 Gemini Interactions API 和 Live API 构建应用，包括文本生成、多轮对话、流式传输、函数调用、托管智能体以及实时音视频。"
  },
  {
    "regex": "^Kick off work on your computer and continue working with your agents from your phone or another device\\.\\s*Turn on (?:远程控制|Remote Control) in app settings\\.?$",
    "replacement": "在您的计算机上开启工作，并通过手机或其他设备继续与您的智能体协同。可在应用设置中开启远程控制。"
  },
  {
    "regex": "^Build with (.+) Plugins$",
    "replacement": "Build with $1 插件目录"
  },
  {
    "regex": "^Plugins are packaged collections of skills and MCPs to help the Agent in (.+?) work with Google developer products\\.\\s*You can always change your choices in Settings\\.?$",
    "replacement": "插件是技能与 MCP 的打包集合，用于辅助 $1 中的智能体协同使用 Google 开发者产品。您随时可以在“设置”中更改选择。"
  },
  {
    "regex": "^Plugins are packaged collections of skills and MCPs to help the Agent work with Google developer products\\.\\s*You can always change your choices in Settings\\.?$",
    "replacement": "插件是技能与 MCP 的打包集合，用于辅助智能体协同使用 Google 开发者产品。您随时可以在“设置”中更改选择。"
  },
  {
    "regex": "^There are currently no Build with (.+) plugins available\\.?$",
    "replacement": "当前暂无可用的 Build with $1 插件。"
  },
  {
    "regex": "^Specialized suite of skills for data engineers and database practitioners (?:working )?on Google Cloud\\.?$",
    "replacement": "专为 Google Cloud 上的数据工程师与数据库从业者打造的专业技能套件。"
  },
  {
    "regex": "^(\\d+)\\s+tools?\\s+disabled$",
    "replacement": "已禁用 $1 个工具"
  },
  {
    "regex": "^Disable\\s+(.+)\\s+tool\\s+for\\s+(.+)$",
    "replacement": "为 $2 禁用 $1 工具"
  },
  {
    "regex": "^Enable\\s+(.+)\\s+tool\\s+for\\s+(.+)$",
    "replacement": "为 $2 启用 $1 工具"
  },
  {
    "regex": "^Auth code for (.+)$",
    "replacement": "$1 的授权码"
  },
  {
    "regex": "^The (.+) MCP server requires configuration parameters before it can be started\\.?$",
    "replacement": "$1 MCP 服务需要先配置参数才能启动。"
  },
  {
    "regex": "^See more in (.+)$",
    "replacement": "在 $1 中查看更多"
  },
  {
    "regex": "^(?:See less|收起) in (.+)$",
    "replacement": "在 $1 中收起"
  },
  {
    "regex": "^(?:More actions|更多操作) for (.+)$",
    "replacement": "$1 的更多操作"
  },
  {
    "regex": "^Failed to enable plugin (.+)$",
    "replacement": "启用插件 $1 失败"
  },
  {
    "regex": "^Failed to update agent:\\s*(.+)$",
    "replacement": "更新智能体失败：$1"
  },
  {
    "regex": "^Failed to remove agent:\\s*(.+)$",
    "replacement": "移除智能体失败：$1"
  },
  {
    "regex": "^Failed to remove plugin:\\s*(.+)$",
    "replacement": "移除插件失败：$1"
  },
  {
    "regex": "^Failed to toggle plugin:\\s*(.+)$",
    "replacement": "切换插件状态失败：$1"
  },
  {
    "regex": "^Error updating agent:\\s*(.+)$",
    "replacement": "更新智能体出错：$1"
  },
  {
    "regex": "^Failed to write MCP config:\\s*(.+)$",
    "replacement": "写入 MCP 配置失败：$1"
  },
  {
    "regex": "^Unnamed [Aa]gent (\\d+)$",
    "replacement": "未命名智能体 $1"
  },
  {
    "regex": "^Unnamed [Ss]kill (\\d+)$",
    "replacement": "未命名技能 $1"
  },
  {
    "regex": "^UI Extension (\\d+)$",
    "replacement": "界面扩展 $1"
  },
  {
    "regex": "^Automation (\\d+)$",
    "replacement": "自动化任务 $1"
  },
  {
    "regex": "^Rule (\\d+)$",
    "replacement": "规则 $1"
  },
  {
    "regex": "^Show (\\d+) breakdowns?$",
    "replacement": "显示 $1 项明细"
  },
  {
    "regex": "^(.+),\\s*setup required$",
    "replacement": "$1（需要配置）"
  },
  {
    "regex": "^Your\\s+plan's\\s+baseline\\s+quota\\s+will\\s+refresh\\s+on\\s+(.+?)\\.\\s+You\\s+can\\s+upgrade\\s+to\\s+a\\s+Google\\s+AI\\s+Ultra\\s+plan\\s+to\\s+receive\\s+higher\\s+rate\\s+limits[。.]?$",
    "replacement": "您的套餐基础配额将于 $1 重置刷新。您可以升级至 Google AI Ultra 以获取更高的请求配额与速率上限。"
  },
  {
    "regex": "^Your\\s+plan's\\s+baseline\\s+quota\\s+will\\s+refresh\\s+on\\s+(.+?)\\.\\s+To\\s+continue\\s+using\\s+this\\s+model\\s+now,\\s*enable\\s+AI\\s+Credit\\s+overages[。.]?$",
    "replacement": "您的套餐基础配额将于 $1 重置刷新。若要立即继续使用此模型，请启用超额 AI 积分计费。"
  },
  {
    "regex": "^Your\\s+plan's\\s+baseline\\s+quota\\s+will\\s+refresh\\s+on\\s+([^.。]+)[。.]?$",
    "replacement": "您的套餐基础配额将于 $1 重置刷新。"
  },
  {
    "regex": "^(?:Model|Your)\\s+quota\\s+will\\s+refresh\\s+on\\s+([^.。]+)[。.]?$",
    "replacement": "您的模型配额将于 $1 重置刷新。"
  },
  {
    "regex": "^You\\s+need\\s+at\\s+least\\s+(\\d+)\\s+AI\\s+Credits\\s+to\\s+send\\s+messages[。.]?$",
    "replacement": "您至少需要 $1 点 AI 积分才能发送消息。"
  },
  {
    "regex": "^To\\s+continue\\s+using\\s+this\\s+model\\s+now,\\s*purchase\\s+more\\s+AI\\s+Credits[。.]?$",
    "replacement": "若要立即继续使用此模型，请购买更多 AI 积分。"
  },
  {
    "regex": "^To\\s+continue\\s+using\\s+this\\s+model\\s+now,\\s*enable\\s+AI\\s+Credit\\s+overages[。.]?$",
    "replacement": "若要立即继续使用此模型，请启用超额 AI 积分计费。"
  },
  {
    "regex": "^To\\s+continue\\s+using\\s+(.+?)\\s+now,\\s*purchase\\s+more\\s+AI\\s+Credits[。.]?$",
    "replacement": "若要立即继续使用 $1，请购买更多 AI 积分。"
  },
  {
    "regex": "^To\\s+continue\\s+using\\s+(.+?)\\s+now,\\s*enable\\s+AI\\s+Credit\\s+overages[。.]?$",
    "replacement": "若要立即继续使用 $1，请启用超额 AI 积分计费。"
  },
  {
    "regex": "^Available\\s+AI\\s+Credits:\\s*(.+)$",
    "replacement": "可用 AI 积分：$1"
  },
  {
    "regex": "^Shared\\s+with:\\s*(.+)$",
    "replacement": "共享模型：$1"
  },
  {
    "regex": "^Your\\s+Plan:\\s*(.+)$",
    "replacement": "当前方案：$1"
  },
  {
    "regex": "^(\\d+)\\s+models\\s+selected$",
    "replacement": "已选择 $1 个模型"
  },
  {
    "regex": "^Select\\s+model,\\s*current:\\s*(.+)$",
    "replacement": "选择模型，当前：$1"
  },
  {
    "regex": "^You have (\\d+) conversations in progress\\. Updating will interrupt them, and they will automatically resume once the update completes\\.$",
    "replacement": "您当前有 $1 个正在进行的会话。更新将暂时中断这些会话，并在更新完成后自动恢复。"
  },
  {
    "regex": "^You have (\\d+) conversations in progress\\. Updating will cancel them and you'll need to manually restart them\\.$",
    "replacement": "您当前有 $1 个正在进行的会话。更新将取消这些会话，更新后您需要手动重新开始。"
  },
  {
    "regex": "^Set up (.+)$",
    "replacement": "设置 $1"
  },
  {
    "regex": "^Review permissions for (.+)$",
    "replacement": "审查 $1 的权限"
  },
  {
    "regex": "^(.+) needs a few details from you before it can run\\.$",
    "replacement": "$1 运行前需要您补充几项详细信息。"
  },
  {
    "regex": "^Agents created by (.+) run in a dedicated (?:project|workspace) with its own permissions, which you can change anytime in the (?:project|workspace) settings page\\. On top of those defaults, (.+) requests the access below\\.$",
    "replacement": "由 $1 创建的智能体将在专属工作区中运行并拥有独立权限，您可以随时在设置页面中更改。除默认权限外，$2 还请求以下访问权限。"
  },
  {
    "regex": "^Agents created by (.+) run in a dedicated (?:project|workspace) with its own permissions, which you can change anytime in the (?:project|workspace) settings page\\.$",
    "replacement": "由 $1 创建的智能体将在专属工作区中运行并拥有独立权限，您可以随时在设置页面中更改。"
  },
  {
    "regex": "^On top of those defaults, (.+) requests the access below\\.$",
    "replacement": "除默认权限外，$1 还请求以下访问权限。"
  },
  {
    "regex": "^Failed to load skills:\\s*(.+)$",
    "replacement": "加载技能失败：$1"
  },
  {
    "regex": "^Failed to scan skills config file:\\s*(.+)$",
    "replacement": "扫描技能配置文件失败：$1"
  },
  {
    "regex": "^Failed to load page (\\d+):\\s*(.+)$",
    "replacement": "加载第 $1 页失败：$2"
  },
  {
    "regex": "^Failed to load text layer for page (\\d+):\\s*(.+)$",
    "replacement": "加载第 $1 页的文本图层失败：$2"
  },
  {
    "regex": "^Text layer render failed:\\s*(.+)$",
    "replacement": "文本图层渲染失败：$1"
  },
  {
    "regex": "^Failed to initialize text layer:\\s*(.+)$",
    "replacement": "初始化文本图层失败：$1"
  },
  {
    "regex": "^Tool Definition:\\s*(.+)$",
    "replacement": "工具定义：$1"
  },
  {
    "regex": "^Invocation:\\s*(.+)$",
    "replacement": "调用：$1"
  },
  {
    "regex": "^Agent permissions preset selector, current:\\s*(.+)$",
    "replacement": "智能体权限预设选择器，当前：$1"
  },
  {
    "regex": "^([\\d,]+)\\s*\\/\\s*([\\d,]+)\\s*tokens\\s*\\(([\\d.]+%)\\)$",
    "replacement": "$1 / $2 个 Token ($3)"
  },
  {
    "regex": "^\\(([\\d,]+)\\s*tokens\\)\\s*([\\d.]+%)$",
    "replacement": "($1 个 Token) $2"
  },
  {
    "regex": "^\\(([\\d,]+)\\s*tokens\\)$",
    "replacement": "($1 个 Token)"
  },
  {
    "regex": "^Unused capacity:\\s*([\\d,]+)\\s*tokens$",
    "replacement": "未用容量：$1 个 Token"
  },
  {
    "regex": "^Rules:\\s*([\\d,]+)\\s*tokens$",
    "replacement": "规则：$1 个 Token"
  },
  {
    "regex": "^Skills:\\s*([\\d,]+)\\s*tokens$",
    "replacement": "技能：$1 个 Token"
  },
  {
    "regex": "^Subagents:\\s*([\\d,]+)\\s*tokens$",
    "replacement": "子智能体：$1 个 Token"
  },
  {
    "regex": "^MCP Tools:\\s*([\\d,]+)\\s*tokens$",
    "replacement": "MCP 工具：$1 个 Token"
  },
  {
    "regex": "^MCP Servers:\\s*([\\d,]+)\\s*tokens$",
    "replacement": "MCP 服务：$1 个 Token"
  },
  {
    "regex": "^System Prompt:\\s*([\\d,]+)\\s*tokens$",
    "replacement": "系统提示词：$1 个 Token"
  },
  {
    "regex": "^Customizations:\\s*([\\d,]+)\\s*tokens$",
    "replacement": "自定义扩展：$1 个 Token"
  },
  {
    "regex": "^Other Customizations:\\s*([\\d,]+)\\s*tokens$",
    "replacement": "其他自定义扩展：$1 个 Token"
  },
  {
    "regex": "^(.+):\\s*([\\d,]+)\\s*tokens$",
    "replacement": "$1：$2 个 Token"
  },
  {
    "regex": "^(\\d+)\\s+demoted$",
    "replacement": "$1 项已降级"
  },
  {
    "regex": "^(\\d+)\\s+excluded$",
    "replacement": "$1 项已排除"
  },
  {
    "regex": "^(\\d+)\\s+tools?\\s+excluded$",
    "replacement": "已排除 $1 个工具"
  },
  {
    "regex": "^(\\d+)\\s+tools$",
    "replacement": "$1 个工具"
  },
  {
    "regex": "^Show\\s+(\\d+)\\s+breakdowns?$",
    "replacement": "显示 $1 项明细"
  },
  {
    "regex": "^(\\d+)\\s+rules?\\s+exceeded the rules budget and (?:was|were) demoted from full inline content to a file-path pointer\\.$",
    "replacement": "$1 条规则超出规则预算，已从完整内联内容降级为文件路径指针。"
  },
  {
    "regex": "^(\\d+)\\s+items?\\s+in\\s+(.+?)\\s+exceeded the customization budget and (?:was|were) excluded from context\\.$",
    "replacement": "$2 中的 $1 个项目超出自定义扩展预算，已从上下文中排除。"
  },
  {
    "regex": "^Exceeded the rules token budget\\. Full rule content \\(([\\d,]+)\\s*tokens\\) was replaced with a lightweight file-path pointer in context\\.$",
    "replacement": "已超出规则 Token 预算。完整规则内容（$1 个 Token）已在上下文中替换为轻量级文件路径指针。"
  },
  {
    "regex": "^All tools in this MCP server \\(([\\d,]+)\\s*tokens\\) exceeded the customization budget and were excluded from context\\.$",
    "replacement": "此 MCP 服务中的所有工具（$1 个 Token）均超出自定义扩展预算，已从上下文中排除。"
  },
  {
    "regex": "^(\\d+)\\s+tools?\\s+in this MCP server \\(([\\d,]+)\\s*tokens\\) exceeded the customization budget and were excluded from context\\.$",
    "replacement": "此 MCP 服务中的 $1 个工具（$2 个 Token）超出自定义扩展预算，已从上下文中排除。"
  },
  {
    "regex": "^Exceeded the customization token budget \\(([\\d,]+)\\s*tokens\\) and was excluded from context\\.$",
    "replacement": "已超出自定义扩展 Token 预算（$1 个 Token），已从上下文中排除。"
  },
  {
    "regex": "^Worked\\s+for\\s+(\\d+)\\s*d\\s+(\\d+)\\s*h\\s+(\\d+)\\s*m$",
    "replacement": "已工作 $1 天 $2 小时 $3 分钟"
  },
  {
    "regex": "^Stopped\\s+after\\s+(\\d+)\\s*d\\s+(\\d+)\\s*h\\s+(\\d+)\\s*m$",
    "replacement": "在 $1 天 $2 小时 $3 分钟后停止"
  },
  {
    "regex": "^Send\\s+feedback\\s+as\\s+(.+)$",
    "replacement": "以 $1 身份发送反馈"
  },
  {
    "regex": "^Branch\\s+([a-zA-Z0-9_\\-\\.\\/]+)$",
    "replacement": "分支 $1"
  },
  {
    "regex": "^All changes since\\s+(.+)$",
    "replacement": "自 $1 以来的全部更改"
  },
  {
    "regex": "^(\\d+)\\s+commits?\\s+to\\s+push$",
    "replacement": "$1 个待推送的提交"
  },
  {
    "regex": "^(\\d+)\\s+commits?\\s+to\\s+pull$",
    "replacement": "$1 个待拉取的提交"
  },
  {
    "regex": "^Send\\s+[mM]essage\\s+(Enter|Return|Ctrl\\+Enter|Cmd\\+Enter|↵)$",
    "replacement": "发送消息 $1"
  },
  {
    "regex": "^Send\\s+[mM]essage\\s+\\((Enter|Return|Ctrl\\+Enter|Cmd\\+Enter|↵)\\)$",
    "replacement": "发送消息 ($1)"
  },
  {
    "regex": "^e\\.g\\.,?\\s+(.+)$",
    "replacement": "例如：$1"
  },
  {
    "regex": "^main\\s+\\(or\\s+e\\.g\\.,\\s*(.+)\\)$",
    "replacement": "main（或例如：$1）"
  },
  {
    "regex": "^Setting up WSL:\\s*(.+)$",
    "replacement": "正在配置 WSL：$1"
  }
].map(p => [new RegExp(p.regex, 'i'), p.replacement]);

// ============================================================================
// 4. 局部片段替换规则 (PARTIAL_TRANSLATIONS)
// ============================================================================

const PARTIAL_TRANSLATIONS = [
  [
    "Learn more.",
    "了解更多。"
  ],
  [
    "your plan. Enable AI Credit Overages to continue using models when your quota is exhausted.",
    "您的套餐。启用 AI 点数超额使用以在额度用尽时继续使用模型。"
  ],
  [
    "Inherits from global settings.",
    "继承自全局设置。"
  ],
  [
    "Local permissions have higher priority.",
    "本地权限具有更高优先级。"
  ],
  [
    "Manage your plan, credentials, and general preferences.",
    "管理您的套餐、凭据和常规偏好。"
  ],
  [
    "Configure global allowed and denied resource permissions.",
    "配置全局允许和拒绝的资源权限。"
  ],
  [
    "Configure AI models and view your quota.",
    "配置 AI 模型并查看额度。"
  ],
  [
    "Configure default behaviors, skills, and MCP servers.",
    "配置默认行为、技能和 MCP 服务器。"
  ],
  [
    "View your available model quota and AI credits.",
    "查看您的可用模型额度和 AI 点数。"
  ],
  [
    "Model quota refreshes periodically based on",
    "模型额度会根据规则定期刷新"
  ],
  [
    "You currently don't have any MCP Servers installed.",
    "您当前尚未安装任何 MCP 服务器。"
  ],
  [
    "Add an MCP server above",
    "请在上方添加 MCP 服务器"
  ],
  [
    "Orchestrates Android development tasks including project creation, deployment, SDK management, and environment diagnostics using the `android` command-line tool.",
    "使用 `android` 命令行工具编排 Android 开发任务，包括项目创建、部署、SDK 管理和环境诊断。"
  ],
  [
    "AI Credits are used when you've exceeded your model quota. Keep track of your current AI Credits in the",
    "当您超出模型额度时会使用 AI 点数。您可以在以下位置跟踪当前 AI 点数："
  ],
  [
    "Antigravity would like to use the browser.",
    "Antigravity 想要使用浏览器。"
  ],
  [
    "Are you sure you want to delete the scheduled task",
    "确定要删除定时任务"
  ],
  [
    "by allowing Google to collect and use my Interactions data, subject to the",
    "允许 Google 收集并使用我的交互数据，受以下条款约束："
  ],
  [
    "Commands the agent can run outside the sandbox in this workspace.",
    "智能体可在此工作区的沙盒外运行的命令。"
  ],
  [
    "Commands the agent can run outside the sandbox.",
    "智能体可在沙盒外运行的命令。"
  ],
  [
    "Confirm the command is safe to run outside of the sandbox with full network and disk access.",
    "请确认该命令可在沙盒外安全运行，并拥有完整网络和磁盘访问权限。"
  ],
  [
    "Controls whether terminal commands require your approval before running.",
    "控制终端命令运行前是否需要您的批准。"
  ],
  [
    "does not collect any of your prompts, content, or model responses but will still collect general usage patterns",
    "不会收集您的任何提示词、内容或模型响应，但仍会收集一般使用模式"
  ],
  [
    "Long pages like this one will be broken down into outlines and read as needed.",
    "像这样的长页面会被拆分成大纲，并按需读取。"
  ],
  [
    "Model must be available on the Gemini API and use the gemini-api scheme.",
    "模型必须可通过 Gemini API 使用，并使用 gemini-api 协议。"
  ],
  [
    "Now that you've created a project, configure your project's agent settings or start a conversation.",
    "您已创建项目，现在可以配置项目的智能体设置或开始对话。"
  ],
  [
    "options. Agent settings and permissions can be further customized below.",
    "选项。下方可进一步自定义智能体设置和权限。"
  ],
  [
    "Pages currently open in Antigravity's Browser instance are shown below.",
    "下方显示当前在 Antigravity 浏览器实例中打开的页面。"
  ],
  [
    "Paths the agent can modify inside this workspace.",
    "智能体可在此工作区内修改的路径。"
  ],
  [
    "Paths the agent can modify.",
    "智能体可修改的路径。"
  ],
  [
    "Paths the agent can read inside this workspace.",
    "智能体可在此工作区内读取的路径。"
  ],
  [
    "Paths the agent can read.",
    "智能体可读取的路径。"
  ],
  [
    "Please describe the feature you'd like to see.",
    "请描述您希望看到的功能。"
  ],
  [
    "Please describe the issue in detail.",
    "请详细描述该问题。"
  ],
  [
    "Please list the steps to reproduce the issue",
    "请列出复现该问题的步骤"
  ],
  [
    "Please verify your account to continue using",
    "请验证您的账户以继续使用"
  ],
  [
    "The Agent attempted to interact with some sites that are not allowlisted",
    "智能体尝试与一些未加入允许列表的网站交互"
  ],
  [
    "The agent can read and edit your Google Drive documents.",
    "智能体可以读取和编辑您的 Google Drive 文档。"
  ],
  [
    "The agent was prevented from accessing some sites",
    "智能体已被阻止访问某些网站"
  ],
  [
    "The agent will wait for you to install the browser extension.",
    "智能体将等待您安装浏览器扩展。"
  ],
  [
    "There was an error with your authentication.",
    "您的身份验证出现错误。"
  ],
  [
    "This error is likely temporary.",
    "此错误可能是暂时性的。"
  ],
  [
    "To use the Google Workspace CLI",
    "要使用 Google Workspace CLI"
  ],
  [
    "URLs the agent can actuate on in this workspace.",
    "智能体可在此工作区中操作的网址。"
  ],
  [
    "URLs the agent can actuate on using the browser.",
    "智能体可使用浏览器操作的网址。"
  ],
  [
    "URLs the agent can read or open in the browser.",
    "智能体可在浏览器中读取或打开的网址。"
  ],
  [
    "URLs the agent can read or open in this workspace.",
    "智能体可在此工作区中读取或打开的网址。"
  ],
  [
    "View your available model quota and AI credits. Model quota refreshes periodically based on your plan. Enable AI Credit Overages to continue using models when your quota is exhausted.",
    "查看您的可用模型额度和 AI 点数。模型额度会根据您的套餐定期刷新。启用 AI 点数超额使用后，即使额度耗尽也可继续使用模型。"
  ],
  [
    "View your available model quota. Quota refreshes periodically based on your plan.",
    "查看您的可用模型额度。额度会根据您的套餐定期刷新。"
  ],
  [
    "We recommend attaching logs.",
    "建议附加日志。"
  ],
  [
    "When debug mode is on, you can see additional information about each steps in the conversation.",
    "开启调试模式后，您可以在对话中查看每个步骤的更多信息。"
  ],
  [
    "When enabled, Agent is given awareness of lint errors created by its edits and may fix them without explicit user prompting.",
    "启用后，智能体会感知其编辑产生的 lint 错误，并可在无需明确提示的情况下修复它们。"
  ],
  [
    "When enabled, Agent will use IDE's shell integration to detect and report terminal command execution.",
    "启用后，智能体将使用 IDE 的 Shell 集成来检测并报告终端命令执行情况。"
  ],
  [
    "When enabled, Antigravity will play a sound when Agent finishes generating a response.",
    "启用后，智能体完成响应生成时 Antigravity 会播放声音。"
  ],
  [
    "When enabled, sandboxed commands are allowed to make network requests.",
    "启用后，沙盒命令可以发起网络请求。"
  ],
  [
    "When enabled, the agent will be able to access past conversations to inform its responses.",
    "启用后，智能体可以访问过去的对话以辅助生成回答。"
  ],
  [
    "When enabled, the agent will include default customizations, including default skills.",
    "启用后，智能体将包含默认自定义项，包括默认技能。"
  ],
  [
    "Your administrator has disabled MCP servers for this workspace.",
    "您的管理员已为此工作区禁用 MCP 服务器。"
  ],
  [
    "Your AI credits balance is too low to continue.",
    "您的 AI 点数余额过低，无法继续。"
  ],
  [
    "Your model does not support this media.",
    "您的模型不支持此媒体。"
  ],
  [
    "Your quota for this model is running low.",
    "此模型的额度即将用尽。"
  ],
  [
    "Plugins are packaged collections of skills and MCPs to help the Agent in",
    "插件是技能和 MCP 的打包集合，可帮助智能体在"
  ],
  [
    "work with Google developer products. You can always change your choices in Settings.",
    "中使用 Google 开发者产品。您可以随时在“设置”中更改选择。"
  ],
  [
    "Shared conversations live in your x20 user directory, so readers need",
    "分享的对话保存在您的 x20 用户目录中，因此读者需要"
  ],
  [
    "Your feedback directly improves Gemini. See",
    "您的反馈将直接帮助改进 Gemini。请参阅"
  ],
  [
    "To write effective feedback, see our",
    "要编写有效的反馈，请参阅我们的"
  ]
];

// 需要翻译的属性名列表
const TRANSLATABLE_ATTRS = ['placeholder', 'title', 'aria-label', 'alt', 'data-tooltip', 'aria-description'];

// ============================================================================
// 5. 高性能缓存与受保护元素判定
// ============================================================================

const hasOwn = Object.prototype.hasOwnProperty;
const translationCache = typeof Map !== 'undefined' ? new Map() : null;
const MAX_CACHE_SIZE = 10000;

// 构建已翻译中文值集合，遇到已是中文的词条 O(1) 跳过
const translatedValuesSet = typeof Set !== 'undefined' ? new Set(Object.values(EXACT_TRANSLATIONS)) : null;

function cacheGet(key) {
  return translationCache && translationCache.has(key) ? translationCache.get(key) : undefined;
}

function cacheSet(key, val) {
  if (!translationCache) return val;
  if (translationCache.size >= MAX_CACHE_SIZE) {
    const iter = translationCache.keys();
    for (let i = 0; i < 1000; i++) {
      const k = iter.next().value;
      if (k !== undefined) translationCache.delete(k);
      else break;
    }
  }
  translationCache.set(key, val);
  return val;
}

const IGNORED_TAGS = {
  SCRIPT: 1, STYLE: 1, CODE: 1, PRE: 1, NOSCRIPT: 1,
  SVG: 1, PATH: 1, CANVAS: 1,
  IFRAME: 1, VIDEO: 1, AUDIO: 1
};

const IGNORED_CLASSES = [
  'monaco-editor',
  'view-lines',
  'view-line',
  'monaco-mouse-cursor-text',
  'xterm',
  'terminal',
  'hljs',
  'code-block',
  'editor-instance'
];

function isProtectedBoundary(el) {
  if (!el || el.nodeType !== 1) return false;
  if (IGNORED_TAGS[el.tagName]) return true;
  if (el.isContentEditable) return true;
  if (el.getAttribute) {
    const testId = el.getAttribute('data-testid');
    if (testId && (
      testId === 'model-selector-trigger' ||
      testId === 'model-selector-item' ||
      testId === 'model-selector-effort-option' ||
      testId === 'model-selector-effort-group' ||
      testId === 'model-selector-list'
    )) {
      return true;
    }
  }
  if (el.hasAttribute && el.hasAttribute('data-effort')) return true;
  const cls = typeof el.className === 'string' ? el.className : '';
  if (cls) {
    for (let i = 0; i < IGNORED_CLASSES.length; i++) {
      if (cls.indexOf(IGNORED_CLASSES[i]) !== -1) return true;
    }
  }
  return false;
}

function shouldSkipElement(el) {
  if (!el || el.nodeType !== 1) return false;
  if (isProtectedBoundary(el)) return true;
  let anc = el.parentElement;
  for (let d = 0; anc && d < 3; d++) {
    if (isProtectedBoundary(anc)) return true;
    anc = anc.parentElement;
  }
  return false;
}

// ============================================================================
// 6. 翻译核心算法
// ============================================================================

function findContextElement(node, marker, matcher) {
  let element = node && node.parentElement;
  let depth = 0;

  while (element && depth < 8) {
    if (element.dataset && element.dataset[marker] === 'true') {
      return element;
    }

    const normalizedText = String(element.textContent || '').replace(/\s+/g, ' ').trim();
    if (matcher.test(normalizedText)) {
      matcher.lastIndex = 0;
      if (element.dataset) {
        element.dataset[marker] = 'true';
      }
      return element;
    }
    matcher.lastIndex = 0;

    if (element.getAttribute && element.getAttribute('role') === 'dialog') {
      break;
    }
    element = element.parentElement;
    depth++;
  }

  return null;
}

/**
 * 处理被 React 拆成文本节点与强调/链接节点的特定句子。
 */
function translateContextualTextNode(node, text) {
  const projectDeleteContext = findContextElement(
    node,
    'i18nProjectDeleteSummary',
    /^Permanently delete .+ including \d+ active conversations? and \d+ archived conversations?\.$/i,
  );
  if (projectDeleteContext) {
    if (text === 'Permanently delete') {
      node.nodeValue = '永久删除';
      return true;
    }
    if (text === 'including') {
      node.nodeValue = '，包括';
      return true;
    }
    if (text === 'and') {
      node.nodeValue = '和';
      return true;
    }
    const activeMatch = text.match(/^(\d+) active conversations?$/i);
    if (activeMatch) {
      node.nodeValue = `${activeMatch[1]} 个活跃对话`;
      return true;
    }
    const archivedMatch = text.match(/^(\d+) archived conversations?$/i);
    if (archivedMatch) {
      node.nodeValue = `${archivedMatch[1]} 个已归档对话`;
      return true;
    }
    if (text === '.') {
      node.nodeValue = '。';
      return true;
    }
  }

  const localPermissionsContext = findContextElement(
    node,
    'i18nLocalPermissionsSummary',
    /^Also includes global settings when working in this project\. Learn more\.$/i,
  );
  if (localPermissionsContext) {
    const replacements = {
      'Also includes': '还会应用',
      'global settings': '全局设置',
      'when working in this project.': '。',
      'Learn more': '了解更多',
      '.': '。',
    };
    if (replacements[text]) {
      if (text === 'Also includes') {
        for (const child of localPermissionsContext.childNodes) {
          if (child.nodeType === 3 && !child.nodeValue.trim()) {
            child.nodeValue = '';
          }
        }
      }
      node.nodeValue = replacements[text];
      return true;
    }
  }

  const globalPermissionsContext = findContextElement(
    node,
    'i18nGlobalPermissionsSummary',
    /Controls the actions the agent can take\.\s*Modified in\s+\d+\s+projects?/i,
  );
  if (globalPermissionsContext) {
    if (text === 'Controls the actions the agent can take.') {
      node.nodeValue = '控制智能体可以执行的操作。';
      return true;
    }
    if (/^Modified in\s*$/i.test(text)) {
      node.nodeValue = '已在 ';
      return true;
    }
    if (/^projects?$/i.test(text)) {
      node.nodeValue = ' 个项目中修改';
      return true;
    }
  }

  const settingsDialog = node.parentElement && node.parentElement.closest
    ? node.parentElement.closest('[role="dialog"]')
    : null;
  if (settingsDialog && hasOwn.call(SETTINGS_CONTEXT_TRANSLATIONS, text)) {
    node.nodeValue = node.nodeValue.replace(text, SETTINGS_CONTEXT_TRANSLATIONS[text]);
    return true;
  }

  return false;
}

/**
 * 英文时间片段转中文，用于 “Refreshes in ...” 等倒计时文案。
 */
function translateDuration(value) {
  return String(value)
    .replace(/\bseconds?\b/gi, '秒')
    .replace(/\bminutes?\b/gi, '分钟')
    .replace(/\bhours?\b/gi, '小时')
    .replace(/\bdays?\b/gi, '天')
    .replace(/\bweeks?\b/gi, '周')
    .replace(/\bmonths?\b/gi, '个月')
    .replace(/\byears?\b/gi, '年')
    .replace(/(\d+(?:\.\d+)?)\s*d\b/gi, '$1天')
    .replace(/(\d+(?:\.\d+)?)\s*h\b/gi, '$1小时')
    .replace(/(\d+(?:\.\d+)?)\s*m\b/gi, '$1分钟')
    .replace(/(\d+(?:\.\d+)?)\s*s\b/gi, '$1秒')
    .replace(/(\d)\s+(秒|分钟|小时|天|周|个月|年)/g, '$1$2')
    .replace(/,\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * 仅使用精确词表和正则匹配翻译单句（不跑局部子串替换，避免递归膨胀）
 */
function translateExactOrPattern(trimmed) {
  if (!trimmed) return null;
  if (hasOwn.call(EXACT_TRANSLATIONS, trimmed)) {
    return EXACT_TRANSLATIONS[trimmed];
  }
  for (let i = 0; i < REGEX_TRANSLATIONS.length; i++) {
    const [pattern, replacement] = REGEX_TRANSLATIONS[i];
    if (pattern.test(trimmed)) {
      pattern.lastIndex = 0;
      return trimmed.replace(pattern, replacement);
    }
  }
  for (let i = 0; i < COMMUNITY_REGEX_PATTERNS.length; i++) {
    const [pattern, replacement] = COMMUNITY_REGEX_PATTERNS[i];
    if (pattern.test(trimmed)) {
      pattern.lastIndex = 0;
      let res = trimmed.replace(pattern, replacement);
      // 支持级联二次正则（如倒计时内部的时间单位替换）
      for (let j = 0; j < COMMUNITY_REGEX_PATTERNS.length; j++) {
        const [p2, r2] = COMMUNITY_REGEX_PATTERNS[j];
        if (p2.test(res)) {
          p2.lastIndex = 0;
          res = res.replace(p2, r2);
        }
      }
      return res;
    }
  }
  return null;
}

/**
 * 翻译任意字符串：精确匹配 -> 正则匹配 -> 标点/快捷键剥离匹配 -> 多句守恒拆分 -> 部分替换
 */
function translateString(text) {
  if (!text) return text;
  const trimmed = String(text).replace(/\s+/g, ' ').trim();
  if (!trimmed) return text;

  const cached = cacheGet(trimmed);
  if (cached !== undefined) {
    return cached === null ? text : cached;
  }

  // 1. 精确匹配
  if (hasOwn.call(EXACT_TRANSLATIONS, trimmed)) {
    return cacheSet(trimmed, EXACT_TRANSLATIONS[trimmed]);
  }

  // 不含任何英文字母或已是译文，直接短路缓存
  if (!/[a-zA-Z]/.test(trimmed) || (translatedValuesSet && translatedValuesSet.has(trimmed))) {
    cacheSet(trimmed, null);
    return text;
  }

  // 2. 正则规则匹配
  const directPatternRes = translateExactOrPattern(trimmed);
  if (directPatternRes && directPatternRes !== trimmed) {
    return cacheSet(trimmed, directPatternRes);
  }

  // 3. 尾部标点剥离自适应（例如 "Arguments Schema:" -> "参数结构 (Schema)："）
  const puncMatch = trimmed.match(/^([\w\s\-\/()'"]+?)([:：…\.？?!！]+)$/);
  if (puncMatch) {
    const base = puncMatch[1].trim();
    const punc = puncMatch[2];
    if (hasOwn.call(EXACT_TRANSLATIONS, base)) {
      const mappedPunc = punc === ':' ? '：' : punc === '.' ? '。' : punc === '?' ? '？' : punc === '!' ? '！' : punc;
      return cacheSet(trimmed, EXACT_TRANSLATIONS[base] + mappedPunc);
    }
  }

  // 4. 快捷键后缀剥离自适应（例如 "Clear search (Esc)" / "New Window Ctrl+Shift+N"）
  const hotkeyMatch = trimmed.match(/^([\w\s\-\/]+?)\s*(\(?(?:Ctrl|Cmd|Alt|Shift|Esc|Enter|Tab|Backspace|Delete|F\d+)(?:\+[^\s)]+)*\)?)$/i);
  if (hotkeyMatch) {
    const cmdBase = hotkeyMatch[1].trim();
    const hotkey = hotkeyMatch[2].trim();
    if (hasOwn.call(EXACT_TRANSLATIONS, cmdBase)) {
      return cacheSet(trimmed, `${EXACT_TRANSLATIONS[cmdBase]} ${hotkey}`);
    }
  }

  // 5. 多句全句守恒拆分（段落由多句组成时，若每句均可精确/正则翻译，则合并输出）
  if (trimmed.indexOf('. ') !== -1 || trimmed.indexOf('! ') !== -1 || trimmed.indexOf('? ') !== -1) {
    const parts = trimmed.split(/([.!?]\s+)/);
    let anyTrans = false;
    let allTrans = true;
    const out = [];
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const tPart = part.trim();
      if (!tPart || /^[.!?\s]+$/.test(part)) {
        out.push(part.replace(/\.\s*/g, '。'));
        continue;
      }
      const tr = translateExactOrPattern(tPart) || translateExactOrPattern(tPart + '.');
      if (tr) {
        anyTrans = true;
        out.push(tr);
      } else {
        allTrans = false;
        break;
      }
    }
    if (anyTrans && allTrans) {
      const joined = out.join('').replace(/([。！？])[。！？.]*\s*/g, '$1').trim();
      return cacheSet(trimmed, joined);
    }
  }

  // 6. 局部片段替换（兼容长段说明拼接）
  let result = trimmed;
  for (let i = 0; i < PARTIAL_TRANSLATIONS.length; i++) {
    const [source, target] = PARTIAL_TRANSLATIONS[i];
    if (result.includes(source)) {
      result = result.split(source).join(target);
    }
  }

  if (result !== trimmed) {
    return cacheSet(trimmed, result);
  }

  cacheSet(trimmed, null);
  return text;
}

// ============================================================================
// 7. DOM 节点遍历与自愈渲染
// ============================================================================

/**
 * 翻译单个文本节点（带 _agyOriginal 否定标记缓存）
 */
function translateTextNode(node) {
  if (!node || node.nodeType !== 3) return;
  const original = node.nodeValue;
  if (!original) return;

  // O(1) 否定/已翻译缓存短路
  if (node._agyOriginal === original) return;

  const parent = node.parentElement || node.parentNode;
  if (parent && (parent.tagName === 'TEXTAREA' || parent.tagName === 'INPUT' || shouldSkipElement(parent))) {
    node._agyOriginal = original;
    return;
  }

  const text = original.trim();
  if (!text) {
    node._agyOriginal = original;
    return;
  }

  // 孤立句号跟随中文节点自动转全角句号
  if (text === '.' && node.previousSibling && /[\u4e00-\u9fa5]/.test(node.previousSibling.textContent || '')) {
    node.nodeValue = original.replace('.', '。');
    node._agyOriginal = node.nodeValue;
    return;
  }

  if (translateContextualTextNode(node, text)) {
    node._agyOriginal = node.nodeValue;
    return;
  }

  if (hasOwn.call(EXACT_TRANSLATIONS, text)) {
    node.nodeValue = original.replace(text, EXACT_TRANSLATIONS[text]);
    node._agyOriginal = node.nodeValue;
    return;
  }

  const translated = translateString(text);
  if (translated && translated !== text) {
    node.nodeValue = original.replace(text, translated);
    node._agyOriginal = node.nodeValue;
  } else {
    node._agyOriginal = original;
  }
}

/**
 * 翻译元素的属性（带属性值缓存标记）
 */
function translateAttributes(element) {
  if (!element || !element.getAttribute) return;

  for (let i = 0; i < TRANSLATABLE_ATTRS.length; i++) {
    const attr = TRANSLATABLE_ATTRS[i];
    const value = element.getAttribute(attr);
    if (!value) continue;

    const cacheProp = '_agyAttr_' + attr;
    if (element[cacheProp] === value) continue;

    if (hasOwn.call(EXACT_TRANSLATIONS, value)) {
      const target = EXACT_TRANSLATIONS[value];
      element.setAttribute(attr, target);
      element[cacheProp] = target;
    } else {
      const translated = translateString(value);
      if (translated && translated !== value) {
        element.setAttribute(attr, translated);
        element[cacheProp] = translated;
      } else {
        element[cacheProp] = value;
      }
    }
  }
}

/**
 * 翻译按钮、标签、标题等被 React 拆分成多个相邻文本节点的“整段文字”。
 */
function translateElementOwnText(element) {
  if (!element || !element.childNodes || !element.textContent) return;
  const tagName = element.tagName;
  if (!tagName || IGNORED_TAGS[tagName] || tagName === 'TEXTAREA' || tagName === 'INPUT') return;

  const childElements = Array.from(element.children || []);
  if (childElements.length > 2) return;
  if (childElements.some((child) => child.textContent && child.textContent.trim())) return;

  const textNodes = Array.from(element.childNodes).filter((child) => child.nodeType === 3 && child.nodeValue && child.nodeValue.trim());
  if (textNodes.length === 0) return;

  const text = element.textContent.trim();
  if (!text || text.length > 2000) return;

  const translated = translateString(text);
  if (translated && translated !== text) {
    textNodes[0].nodeValue = textNodes[0].nodeValue.replace(textNodes[0].nodeValue.trim(), translated);
    textNodes[0]._agyOriginal = textNodes[0].nodeValue;
    for (let i = 1; i < textNodes.length; i++) {
      textNodes[i].nodeValue = '';
      textNodes[i]._agyOriginal = '';
    }
  }
}

/**
 * 递归翻译 DOM 树
 */
function translateNode(node) {
  if (!node) return;

  if (node.nodeType === 1) {
    if (shouldSkipElement(node)) return;
    if (node.dataset && node.dataset.i18nTranslated === 'skip') return;

    translateAttributes(node);
    if (node.tagName === 'TEXTAREA' || node.tagName === 'INPUT') return;

    translateElementOwnText(node);

    const children = node.childNodes;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        translateNode(children[i]);
      }
    }
  } else if (node.nodeType === 3) {
    translateTextNode(node);
  }
}

// ============================================================================
// 8. MutationObserver 与防抖/节流调度系统
// ============================================================================

let activeObserver = null;
let isObserving = false;
let translateTimer = null;
const pendingNodes = new Set();

function disconnectObserver() {
  if (activeObserver && isObserving) {
    try {
      activeObserver.disconnect();
    } catch {}
    isObserving = false;
  }
}

function reconnectObserver() {
  if (activeObserver && !isObserving && typeof document !== 'undefined' && document.documentElement) {
    try {
      activeObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: TRANSLATABLE_ATTRS,
      });
      isObserving = true;
    } catch {}
  }
}

function translatePage() {
  if (typeof document === 'undefined' || !document.body) return;
  disconnectObserver();
  try {
    translateNode(document.body);
  } finally {
    reconnectObserver();
  }
}

function processPendingTranslations() {
  if (translateTimer) return;

  const schedule = (typeof window !== 'undefined' && window.requestAnimationFrame)
    ? window.requestAnimationFrame
    : (fn) => setTimeout(fn, 16);

  translateTimer = schedule(() => {
    translateTimer = null;
    if (pendingNodes.size === 0) return;

    disconnectObserver();
    try {
      for (const node of pendingNodes) {
        if (node && node.isConnected !== false) {
          translateNode(node);
        }
      }
      pendingNodes.clear();
    } finally {
      reconnectObserver();
    }
  });
}

function setupObserver() {
  if (typeof MutationObserver === 'undefined') return null;

  activeObserver = new MutationObserver((mutations) => {
    for (let i = 0; i < mutations.length; i++) {
      const mutation = mutations[i];
      if (mutation.type === 'childList') {
        const added = mutation.addedNodes;
        for (let j = 0; j < added.length; j++) {
          const node = added[j];
          if (node.nodeType === 1 || node.nodeType === 3) {
            pendingNodes.add(node);
          }
        }
      } else if (mutation.type === 'characterData') {
        if (mutation.target) {
          mutation.target._agyOriginal = undefined;
          pendingNodes.add(mutation.target);
        }
      } else if (mutation.type === 'attributes') {
        if (mutation.target && TRANSLATABLE_ATTRS.includes(mutation.attributeName)) {
          pendingNodes.add(mutation.target);
        }
      }
    }

    if (pendingNodes.size > 0) {
      processPendingTranslations();
    }
  });

  reconnectObserver();
  return activeObserver;
}

/**
 * 悬浮气泡 (Tooltip / Popover / Radix Portal) 瞬时翻译支持
 */
function setupHoverTooltipInterceptor() {
  if (typeof document === 'undefined' || !document.addEventListener) return;
  let lastHoverTime = 0;
  let hoverTimer = null;

  const onHover = (e) => {
    const now = Date.now();
    if (now - lastHoverTime < 100) return;
    lastHoverTime = now;

    if (e && e.target && e.target.nodeType === 1) {
      disconnectObserver();
      try {
        translateAttributes(e.target);
      } finally {
        reconnectObserver();
      }
    }

    if (hoverTimer) clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => {
      hoverTimer = null;
      if (!document.body || !document.querySelectorAll) return;
      disconnectObserver();
      try {
        const portals = document.querySelectorAll(
          '[role="tooltip"], [role="menu"], [role="dialog"], [data-floating-ui-portal], [data-radix-popper-content-wrapper], .popover, .tooltip'
        );
        for (let i = 0; i < portals.length; i++) {
          translateNode(portals[i]);
        }
      } catch {} finally {
        reconnectObserver();
      }
    }, 40);
  };

  try {
    document.addEventListener('pointerenter', onHover, { capture: true, passive: true });
    document.addEventListener('contextmenu', onHover, { capture: true, passive: true });
  } catch {}
}

/**
 * 初始化翻译系统
 */
function initTranslation() {
  if (typeof document === 'undefined' || !document.documentElement) return;
  if (document.documentElement.dataset && document.documentElement.dataset.antigravityZhI18nInitialized === 'true') {
    return;
  }
  if (document.documentElement.dataset) {
    document.documentElement.dataset.antigravityZhI18nInitialized = 'true';
  }

  if (document.body) {
    translatePage();
  }

  setupObserver();
  setupHoverTooltipInterceptor();

  // 启动初期前 5 秒每 500ms 扫描一次以捕获异步懒加载面板，之后转为 15 秒低频空闲巡检
  let retryCount = 0;
  const earlyInterval = setInterval(() => {
    translatePage();
    retryCount++;
    if (retryCount >= 10) {
      clearInterval(earlyInterval);
      setInterval(() => {
        if (typeof window !== 'undefined' && window.requestIdleCallback) {
          window.requestIdleCallback(() => translatePage(), { timeout: 5000 });
        } else {
          translatePage();
        }
      }, 15000);
    }
  }, 500);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTranslation);
  } else {
    initTranslation();
  }
}

// 暴露全局翻译函数供 preload IPC 拦截器（原生右键菜单与系统通知）调用
if (typeof globalThis !== 'undefined') {
  globalThis.__agyTranslateString = translateString;
}

// 导出供 Node.js 测试与外部脚本复用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    EXACT_TRANSLATIONS,
    SETTINGS_CONTEXT_TRANSLATIONS,
    REGEX_TRANSLATIONS,
    PARTIAL_TRANSLATIONS,
    translateString,
    translateNode,
    translatePage,
  };
}

console.log('[Antigravity 汉化补丁 v3.0] 前端高性能翻译引擎已加载');

})();
