import { useState } from 'react'

import { IoMicOffOutline, IoMicOutline } from 'react-icons/io5'

import { VoiceOrb } from '../../voice-orb'

import './style.css'

import type { JSX } from 'react'

export function Workspace(): JSX.Element {
  const [isMicrophoneMuted, setIsMicrophoneMuted] = useState(false)

  const toggleMicrophone = (): void => {
    setIsMicrophoneMuted((currentValue) => !currentValue)
  }

  return (
    <section className="arc-workspace" aria-label="Voice orb workspace">
      <div className="arc-voice-card">
        <div className="arc-voice-card__orb">
          <div className="arc-voice-card__orb-scale">
            <VoiceOrb label="Voice orb" />
          </div>
        </div>

        <div className="arc-voice-card__content">
          <p className="arc-voice-card__copy">무엇을 도와드릴까요?</p>

          <div className="arc-voice-card__actions" aria-label="Voice controls">
            <button
              className="arc-voice-card__button"
              type="button"
              data-muted={isMicrophoneMuted ? 'true' : 'false'}
              aria-pressed={isMicrophoneMuted}
              aria-label="마이크 음소거"
              onClick={toggleMicrophone}
            >
              <span className="arc-voice-card__button-icon" aria-hidden="true">
                <IoMicOutline className="arc-voice-card__button-icon-on" />
                <IoMicOffOutline className="arc-voice-card__button-icon-off" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
