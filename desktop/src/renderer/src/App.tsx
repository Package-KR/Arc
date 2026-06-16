import { useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { TbLayoutSidebar, TbLayoutSidebarFilled } from 'react-icons/tb'

import { VoiceOrb } from './features/voice-orb/VoiceOrb'

import type { JSX } from 'react'

/**
 * @description Renders the initial Arc desktop screen.
 */
function App(): JSX.Element {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const sidebarToggleLabel = isSidebarCollapsed ? '사이드바 펼치기' : '사이드바 접기'
  const SidebarToggleIcon = isSidebarCollapsed ? TbLayoutSidebar : TbLayoutSidebarFilled

  return (
    <main className="arc-shell" data-sidebar-state={isSidebarCollapsed ? 'collapsed' : 'expanded'}>
      <div className="arc-window-drag-region" aria-hidden="true" />

      <aside className="arc-sidebar" aria-label="Sidebar" aria-hidden={isSidebarCollapsed} />

      <nav className="arc-titlebar-controls" aria-label="Window navigation">
        <button
          className="arc-icon-button"
          type="button"
          aria-label={sidebarToggleLabel}
          title={sidebarToggleLabel}
          onClick={() => setIsSidebarCollapsed((currentValue) => !currentValue)}
        >
          <SidebarToggleIcon aria-hidden="true" focusable="false" />
        </button>

        <button className="arc-icon-button" type="button" aria-label="뒤로 이동" title="뒤로 이동" disabled>
          <MdKeyboardArrowLeft aria-hidden="true" focusable="false" />
        </button>

        <button className="arc-icon-button" type="button" aria-label="앞으로 이동" title="앞으로 이동" disabled>
          <MdKeyboardArrowRight aria-hidden="true" focusable="false" />
        </button>
      </nav>

      <section className="arc-workspace" aria-label="Voice orb workspace">
        <VoiceOrb />
      </section>
    </main>
  )
}

export default App
