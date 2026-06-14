import { VoiceOrb } from './features/voice-orb/VoiceOrb'

import type { JSX } from 'react'

/**
 * @description Renders the initial Arc desktop screen.
 */
function App(): JSX.Element {
  return (
    <main className="arc-shell">
      <VoiceOrb />
    </main>
  )
}

export default App
