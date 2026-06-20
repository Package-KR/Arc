import { TbLayoutSidebar, TbLayoutSidebarFilled } from 'react-icons/tb'

import './style.css'

import type { JSX } from 'react'
import type { Translator } from '../../../shared/i18n'

type TitlebarProps = {
  t: Translator
  isSidebarCollapsed: boolean
  onToggleSidebar: () => void
}

export function Titlebar({ t, isSidebarCollapsed, onToggleSidebar }: TitlebarProps): JSX.Element {
  const sidebarToggleLabel = isSidebarCollapsed ? t('titlebar.sidebar.expand') : t('titlebar.sidebar.collapse')
  const SidebarToggleIcon = isSidebarCollapsed ? TbLayoutSidebar : TbLayoutSidebarFilled

  return (
    <nav className="arc-titlebar-controls" aria-label={t('titlebar.navigation')}>
      <button
        className="arc-icon-button"
        type="button"
        aria-label={sidebarToggleLabel}
        title={sidebarToggleLabel}
        onClick={onToggleSidebar}
      >
        <SidebarToggleIcon aria-hidden="true" focusable="false" />
      </button>
    </nav>
  )
}
