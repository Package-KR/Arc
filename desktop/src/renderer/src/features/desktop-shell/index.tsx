import { useMemo, useState } from 'react'

import { CgEditFlipH } from 'react-icons/cg'
import { GoKebabHorizontal } from 'react-icons/go'

import { Sidebar } from './sidebar'
import { Workspace } from './workspace'
import { createTranslator, getSystemLanguage, resolveLanguage } from '../../shared/i18n'

import './style.css'

import type { JSX } from 'react'
import type { SidebarViewId } from './sidebar'

export function DesktopShell(): JSX.Element {
  const t = useMemo(() => createTranslator(resolveLanguage('system', getSystemLanguage())), [])
  const [activeViewId, setActiveViewId] = useState<SidebarViewId | null>(null)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
  const sidebarToggleLabel = isSidebarExpanded ? t('titlebar.sidebar.collapse') : t('titlebar.sidebar.expand')

  const toggleSidebar = (): void => {
    setIsSidebarExpanded((currentValue) => !currentValue)
  }

  const toggleSidebarView = (viewId: SidebarViewId): void => {
    setActiveViewId((currentViewId) => (currentViewId === viewId ? null : viewId))
  }

  return (
    <main className="arc-shell" data-sidebar-state={isSidebarExpanded ? 'expanded' : 'collapsed'}>
      <div className="arc-shell__drag-region" aria-hidden="true" />
      <button
        className="arc-shell__sidebar-button"
        type="button"
        aria-label={sidebarToggleLabel}
        aria-controls="arc-sidebar-panel"
        aria-expanded={isSidebarExpanded}
        aria-pressed={isSidebarExpanded}
        title={sidebarToggleLabel}
        onClick={toggleSidebar}
      >
        <span className="arc-shell__header-button-surface">
          <CgEditFlipH aria-hidden="true" />
        </span>
      </button>
      <div className="arc-shell__header-actions">
        <button className="arc-shell__header-button" type="button" aria-label="더보기">
          <span className="arc-shell__header-button-surface">
            <GoKebabHorizontal aria-hidden="true" />
          </span>
        </button>
      </div>
      <div className="arc-shell__layout">
        <div className="arc-shell__sidebar-panel" id="arc-sidebar-panel">
          <Sidebar
            t={t}
            activeViewId={activeViewId}
            isCollapsed={!isSidebarExpanded}
            onSelectView={toggleSidebarView}
          />
        </div>
        <div className="arc-shell__workspace-panel">
          <Workspace />
        </div>
      </div>
    </main>
  )
}
