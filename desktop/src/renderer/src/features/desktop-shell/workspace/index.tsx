import { VoiceOrb } from '../../voice-orb'

import type { JSX } from 'react'

export function Workspace(): JSX.Element {
  return (
    <section className="arc-workspace" aria-label="Voice orb workspace">
      <VoiceOrb />
    </section>
  )
}
