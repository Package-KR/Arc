import type { JSX } from 'react'

type SidebarProps = {
  isCollapsed: boolean
}

export function Sidebar({ isCollapsed }: SidebarProps): JSX.Element {
  return <aside className="arc-sidebar" aria-label="Sidebar" aria-hidden={isCollapsed} />
}
