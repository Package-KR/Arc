import './VoiceOrb.css'

import type { JSX } from 'react'

/**
 * @description Renders the animated central voice orb.
 */
export function VoiceOrb(): JSX.Element {
  return (
    <div className="voice-orb" aria-label="Voice orb" role="img">
      <span className="voice-orb__surface" />
      <span className="voice-orb__wash voice-orb__wash--cyan" />
      <span className="voice-orb__wash voice-orb__wash--rose" />
      <span className="voice-orb__wash voice-orb__wash--violet" />
    </div>
  )
}
