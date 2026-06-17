import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { TbLayoutSidebar, TbLayoutSidebarFilled } from 'react-icons/tb'

import type { JSX } from 'react'

type TitlebarProps = {
  isSidebarCollapsed: boolean
  onToggleSidebar: () => void
}

export function Titlebar({ isSidebarCollapsed, onToggleSidebar }: TitlebarProps): JSX.Element {
  const sidebarToggleLabel = isSidebarCollapsed ? '사이드바 펼치기' : '사이드바 접기'
  const SidebarToggleIcon = isSidebarCollapsed ? TbLayoutSidebar : TbLayoutSidebarFilled

  return (
    <nav className="arc-titlebar-controls" aria-label="Window navigation">
      <button
        className="arc-icon-button"
        type="button"
        aria-label={sidebarToggleLabel}
        title={sidebarToggleLabel}
        onClick={onToggleSidebar}
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
  )
}
