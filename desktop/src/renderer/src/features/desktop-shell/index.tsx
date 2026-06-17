import { useState } from 'react'

import { Sidebar } from './sidebar'
import { Titlebar } from './titlebar'
import { Workspace } from './workspace'

import type { JSX } from 'react'

export function DesktopShell(): JSX.Element {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <main className="arc-shell" data-sidebar-state={isSidebarCollapsed ? 'collapsed' : 'expanded'}>
      <div className="arc-window-drag-region" aria-hidden="true" />

      <Sidebar isCollapsed={isSidebarCollapsed} />

      <Titlebar
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed((currentValue) => !currentValue)}
      />

      <Workspace />
    </main>
  )
}
