export const SUPPORTED_LANGUAGES = ['en', 'ko'] as const

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]
export type LanguagePreference = 'system' | LanguageCode

const FALLBACK_LANGUAGE: LanguageCode = 'en'

const MESSAGES = {
  en: {
    'dock.aria': 'Workspace controls',
    'dock.guard': 'Approval guard',
    'dock.focus': 'Focus',
    'dock.runs': 'Runs overlay',
    'dock.voice': 'Voice',
    'dock.sidebar': 'Sidebar',

    'sidebar.aria.panel': 'Sidebar',
    'sidebar.aria.views': 'Sidebar views',
    'sidebar.approvals.label': 'Approvals',
    'sidebar.context.label': 'Context',
    'sidebar.library.label': 'Library',
    'sidebar.runs.label': 'Runs',
    'sidebar.settings.label': 'Settings',

    'sidebar.section.projects': 'Chat',
    'sidebar.section.sessions': 'Projects',

    'sidebar.item.agents': 'AGENTS.md',
    'sidebar.item.arcDesktopUi': 'Arc desktop UI',
    'sidebar.item.newSession': 'New session',
    'sidebar.item.toolApprovalFlow': 'Tool approval flow',
    'sidebar.item.workspaceRoot': 'Workspace root',

    'sidebar.meta.arc': 'Arc',
    'sidebar.meta.draft': 'Draft',
    'sidebar.meta.mock': 'Mock',
    'sidebar.meta.ready': 'Ready',
    'sidebar.meta.rules': 'Rules',

    'titlebar.navigation': 'Window navigation',
    'titlebar.sidebar.collapse': 'Collapse sidebar',
    'titlebar.sidebar.expand': 'Expand sidebar',

    'workspace.aria': 'Voice orb workspace',
    'workspace.voiceOrb': 'Voice orb'
  },
  ko: {
    'dock.aria': '작업 영역 컨트롤',
    'dock.guard': '승인 보호',
    'dock.focus': '집중',
    'dock.runs': '실행 오버레이',
    'dock.voice': '음성',
    'dock.sidebar': '사이드바',

    'sidebar.aria.panel': '사이드바',
    'sidebar.aria.views': '사이드바 보기',
    'sidebar.approvals.label': '승인',
    'sidebar.context.label': '컨텍스트',
    'sidebar.library.label': '보관함',
    'sidebar.runs.label': '실행',
    'sidebar.settings.label': '설정',

    'sidebar.section.projects': '채팅',
    'sidebar.section.sessions': '프로젝트',

    'sidebar.item.agents': 'AGENTS.md',
    'sidebar.item.arcDesktopUi': 'Arc 데스크톱 UI',
    'sidebar.item.newSession': '새 세션',
    'sidebar.item.toolApprovalFlow': '도구 승인 흐름',
    'sidebar.item.workspaceRoot': '워크스페이스 루트',

    'sidebar.meta.arc': 'Arc',
    'sidebar.meta.draft': '초안',
    'sidebar.meta.mock': 'Mock',
    'sidebar.meta.ready': '준비됨',
    'sidebar.meta.rules': '규칙',

    'titlebar.navigation': '창 이동',
    'titlebar.sidebar.collapse': '사이드바 접기',
    'titlebar.sidebar.expand': '사이드바 펼치기',

    'workspace.aria': '음성 오브 작업 영역',
    'workspace.voiceOrb': '음성 오브'
  }
} as const

export type I18nKey = keyof (typeof MESSAGES)[typeof FALLBACK_LANGUAGE]
export type Translator = (key: I18nKey) => string

export function createTranslator(language: LanguageCode): Translator {
  const messages = MESSAGES[language]

  return (key) => messages[key] ?? MESSAGES[FALLBACK_LANGUAGE][key]
}

export function getSystemLanguage(): string {
  return (
    globalThis.window?.arc?.environment.locale ??
    globalThis.navigator?.language ??
    FALLBACK_LANGUAGE
  )
}

export function resolveLanguage(
  preference: LanguagePreference,
  systemLanguage: string
): LanguageCode {
  if (preference !== 'system') {
    return preference
  }

  return normalizeLanguage(systemLanguage)
}

function normalizeLanguage(language: string): LanguageCode {
  const normalizedLanguage = language.toLowerCase().split('-')[0] as LanguageCode

  if (SUPPORTED_LANGUAGES.includes(normalizedLanguage)) {
    return normalizedLanguage
  }

  return FALLBACK_LANGUAGE
}
