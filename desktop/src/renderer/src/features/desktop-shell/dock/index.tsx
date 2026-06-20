import { BsArrowsFullscreen, BsLayoutSidebar, BsMic, BsRecordCircle, BsShieldCheck } from 'react-icons/bs'

import './style.css'

import type { JSX } from 'react'
import type { IconType } from 'react-icons'
import type { I18nKey, Translator } from '../../../shared/i18n'

export type DockControlId = 'sidebar' | 'voice' | 'focus' | 'runs' | 'guard'
export type DockControlState = Record<DockControlId, boolean>

type DockControl = {
  id: DockControlId
  labelKey: I18nKey
  Icon: IconType
}

type DockProps = {
  t: Translator
  controls: DockControlState
  onToggleControl: (controlId: DockControlId) => void
}

const DOCK_CONTROLS: DockControl[] = [
  { id: 'sidebar', labelKey: 'dock.sidebar', Icon: BsLayoutSidebar },
  { id: 'voice', labelKey: 'dock.voice', Icon: BsMic },
  { id: 'focus', labelKey: 'dock.focus', Icon: BsArrowsFullscreen },
  { id: 'runs', labelKey: 'dock.runs', Icon: BsRecordCircle },
  { id: 'guard', labelKey: 'dock.guard', Icon: BsShieldCheck }
]

export function Dock({ t, controls, onToggleControl }: DockProps): JSX.Element {
  return (
    <nav className="arc-dock" aria-label={t('dock.aria')}>
      <div className="arc-dock__group">
        {DOCK_CONTROLS.map((item) => {
          const isActive = controls[item.id]
          const Icon = item.Icon
          const label = t(item.labelKey)

          return (
            <button
              className="arc-dock__button"
              type="button"
              key={item.id}
              title={label}
              aria-label={label}
              aria-pressed={isActive}
              data-active={isActive ? 'true' : 'false'}
              onClick={() => onToggleControl(item.id)}
            >
              <Icon aria-hidden="true" focusable="false" />
            </button>
          )
        })}
      </div>
    </nav>
  )
}
