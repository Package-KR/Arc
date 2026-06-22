import { BsGear } from 'react-icons/bs'
import { PiNotePencilLight } from 'react-icons/pi'

import './style.css'

import type { JSX } from 'react'
import type { IconType } from 'react-icons'
import type { I18nKey, Translator } from '../../../shared/i18n'

export type SidebarViewId = 'compose' | 'settings'

type SidebarItem = {
  labelKey: I18nKey
  metaKey?: I18nKey
}

type SidebarSection = {
  titleKey: I18nKey
  items: SidebarItem[]
}

type SidebarView = {
  id: SidebarViewId
  count?: string
  labelKey: I18nKey
  Icon: IconType
}

type SidebarProps = {
  t: Translator
  activeViewId: SidebarViewId | null
  isCollapsed: boolean
  onSelectView: (viewId: SidebarViewId) => void
}

const SIDEBAR_VIEWS: SidebarView[] = [
  { id: 'compose', labelKey: 'sidebar.item.newSession', Icon: PiNotePencilLight }
]

const SIDEBAR_SETTINGS_VIEW: SidebarView = {
  id: 'settings',
  count: '0',
  labelKey: 'sidebar.settings.label',
  Icon: BsGear
}

const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    titleKey: 'sidebar.section.sessions',
    items: [
      { labelKey: 'sidebar.item.newSession', metaKey: 'sidebar.meta.ready' },
      { labelKey: 'sidebar.item.arcDesktopUi', metaKey: 'sidebar.meta.draft' },
      { labelKey: 'sidebar.item.toolApprovalFlow', metaKey: 'sidebar.meta.mock' }
    ]
  },
  {
    titleKey: 'sidebar.section.projects',
    items: [
      { labelKey: 'sidebar.item.workspaceRoot', metaKey: 'sidebar.meta.arc' },
      { labelKey: 'sidebar.item.agents', metaKey: 'sidebar.meta.rules' }
    ]
  }
]

export function Sidebar({ t, activeViewId, isCollapsed, onSelectView }: SidebarProps): JSX.Element {
  return (
    <aside className="arc-sidebar" aria-label={t('sidebar.aria.panel')} aria-hidden={isCollapsed}>
      <div className="arc-sidebar__inner">
        <nav className="arc-sidebar__nav" aria-label={t('sidebar.aria.views')}>
          {SIDEBAR_VIEWS.map((view) => {
            const isActive = view.id === activeViewId
            const Icon = view.Icon
            const label = t(view.labelKey)

            return (
              <button
                className="arc-sidebar__nav-button"
                type="button"
                key={view.id}
                title={label}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
                aria-pressed={isActive}
                data-active={isActive ? 'true' : 'false'}
                onClick={() => onSelectView(view.id)}
              >
                <Icon aria-hidden="true" focusable="false" />
                <span className="arc-sidebar__nav-label">{label}</span>
                {view.count ? (
                  <span className="arc-sidebar__nav-count" aria-hidden="true">
                    {view.count}
                  </span>
                ) : null}
              </button>
            )
          })}
        </nav>

        <div className="arc-sidebar__sections">
          {SIDEBAR_SECTIONS.map((section) => (
            <section className="arc-sidebar__section" key={section.titleKey}>
              <h3 className="arc-sidebar__section-title">{t(section.titleKey)}</h3>

              <ul className="arc-sidebar__list" aria-label={t(section.titleKey)}>
                {section.items.map((item) => (
                  <li className="arc-sidebar__item" key={item.labelKey}>
                    <span className="arc-sidebar__item-label">{t(item.labelKey)}</span>
                    {item.metaKey ? <span className="arc-sidebar__item-meta">{t(item.metaKey)}</span> : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="arc-sidebar__settings">
          <button
            className="arc-sidebar__nav-button"
            type="button"
            title={t(SIDEBAR_SETTINGS_VIEW.labelKey)}
            aria-label={t(SIDEBAR_SETTINGS_VIEW.labelKey)}
            aria-current={activeViewId === SIDEBAR_SETTINGS_VIEW.id ? 'page' : undefined}
            aria-pressed={activeViewId === SIDEBAR_SETTINGS_VIEW.id}
            data-active={activeViewId === SIDEBAR_SETTINGS_VIEW.id ? 'true' : 'false'}
            onClick={() => onSelectView(SIDEBAR_SETTINGS_VIEW.id)}
          >
            <SIDEBAR_SETTINGS_VIEW.Icon aria-hidden="true" focusable="false" />
            <span className="arc-sidebar__nav-label">{t(SIDEBAR_SETTINGS_VIEW.labelKey)}</span>
            <span className="arc-sidebar__nav-count" aria-hidden="true">
              {SIDEBAR_SETTINGS_VIEW.count}
            </span>
          </button>
        </div>
      </div>
    </aside>
  )
}
