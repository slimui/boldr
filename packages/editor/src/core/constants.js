// Thanks :) https://github.com/draft-js-utils/draft-js-utils/blob/master/src/Constants.js.
export const BLOCK_TYPES = {
  'header-one': 'h1',
  'header-two': 'h2',
  'header-three': 'h3',
  unstyled: 'p',
  blockquote: 'blockquote',
};

export const ENTITY_TYPE = {
  LINK: 'LINK',
  IMAGE: 'IMAGE',
  DOCUMENT: 'DOCUMENT',
  MODEL: 'MODEL',
  EMBED: 'EMBED',
  HORIZONTAL_RULE: 'HORIZONTAL_RULE',
};

export const INLINE_STYLE = {
  BOLD: 'BOLD',
  CODE: 'CODE',
  ITALIC: 'ITALIC',
  STRIKETHROUGH: 'STRIKETHROUGH',
  UNDERLINE: 'UNDERLINE',
};

export const BR_TYPE = 'BR';

// Originally from https://github.com/facebook/draft-js/blob/master/src/component/utils/getDefaultKeyBinding.js.
export const KEY_CODES = {
  K: 75,
  B: 66,
  U: 85,
  J: 74,
  I: 73,
  0: 48,
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
};

export const KEYBOARD_SHORTCUTS = {};
KEYBOARD_SHORTCUTS[BLOCK_TYPES.UNSTYLED] = { other: 'ctrl + alt + 0', macOS: '⌘ + option + 0' };
KEYBOARD_SHORTCUTS[BLOCK_TYPES.HEADER_ONE] = { other: 'ctrl + alt + 1', macOS: '⌘ + option + 1' };
KEYBOARD_SHORTCUTS[BLOCK_TYPES.HEADER_TWO] = { other: 'ctrl + alt + 2', macOS: '⌘ + option + 2' };
KEYBOARD_SHORTCUTS[BLOCK_TYPES.HEADER_THREE] = { other: 'ctrl + alt + 3', macOS: '⌘ + option + 3' };
KEYBOARD_SHORTCUTS[BLOCK_TYPES.HEADER_FOUR] = { other: 'ctrl + alt + 4', macOS: '⌘ + option + 4' };
KEYBOARD_SHORTCUTS[BLOCK_TYPES.HEADER_FIVE] = { other: 'ctrl + alt + 5', macOS: '⌘ + option + 5' };
KEYBOARD_SHORTCUTS[BLOCK_TYPES.HEADER_SIX] = { other: 'ctrl + alt + 6', macOS: '⌘ + option + 6' };
KEYBOARD_SHORTCUTS[BLOCK_TYPES.UNORDERED_LIST_ITEM] = {
  other: 'ctrl + shift + 8',
  macOS: '⌘ + shift + 8',
};
KEYBOARD_SHORTCUTS[BLOCK_TYPES.ORDERED_LIST_ITEM] = {
  other: 'ctrl + shift + 7',
  macOS: '⌘ + shift + 7',
};
KEYBOARD_SHORTCUTS[ENTITY_TYPE.LINK] = { other: 'ctrl + K', macOS: '⌘ + K' };
KEYBOARD_SHORTCUTS[BR_TYPE] = { other: 'shift + enter', macOS: 'shift + enter' };
KEYBOARD_SHORTCUTS[INLINE_STYLE.BOLD] = { other: 'ctrl + B', macOS: '⌘ + B' };
KEYBOARD_SHORTCUTS[INLINE_STYLE.ITALIC] = { other: 'ctrl + I', macOS: '⌘ + I' };
KEYBOARD_SHORTCUTS[INLINE_STYLE.UNDERLINE] = { other: 'ctrl + U', macOS: '⌘ + U' };
KEYBOARD_SHORTCUTS[INLINE_STYLE.STRIKETHROUGH] = {
  other: 'alt + shift + 5',
  macOS: 'option + shift + 5',
};

export const NBSP = '\u00a0';

export const HANDLED = 'handled';
export const NOT_HANDLED = 'not-handled';

export const EDITOR_PROPS = [
  'onChange',
  'onEditorStateChange',
  'onContentStateChange',
  'initialContentState',
  'defaultContentState',
  'contentState',
  'editorState',
  'defaultEditorState',
  'toolbarOnFocus',
  'toolbar',
  'toolbarCustomButtons',
  'toolbarClassName',
  'editorClassName',
  'toolbarHidden',
  'wrapperClassName',
  'toolbarStyle',
  'editorStyle',
  'wrapperStyle',
  'uploadCallback',
  'onFocus',
  'onBlur',
  'onTab',
  'mention',
  'hashtag',
  'ariaLabel',
  'customBlockRenderFunc',
  'customDecorators',
];

export default {
  BLOCK_TYPES,
  ENTITY_TYPE,
  INLINE_STYLE,
};
