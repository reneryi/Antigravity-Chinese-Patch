/**
 * Antigravity 前端界面中文翻译映射表 (兼容导出层)
 *
 * 自 v3.0 起，所有前端精确词条 (5,470+ 条)、动态正则与局部规则已统一收敛至 i18n_inject.js。
 * 本文件直接桥接导出 i18n_inject.js 中的词库，确保外部脚本引用时始终获得最新全量词表。
 */

const {
  EXACT_TRANSLATIONS,
  SETTINGS_CONTEXT_TRANSLATIONS,
  REGEX_TRANSLATIONS,
  PARTIAL_TRANSLATIONS,
  translateString,
} = require('./i18n_inject.js');

module.exports = {
  exactTranslations: EXACT_TRANSLATIONS,
  partialTranslations: Object.fromEntries(PARTIAL_TRANSLATIONS),
  EXACT_TRANSLATIONS,
  SETTINGS_CONTEXT_TRANSLATIONS,
  REGEX_TRANSLATIONS,
  PARTIAL_TRANSLATIONS,
  translateString,
};
