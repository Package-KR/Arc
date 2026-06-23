import { useLayoutEffect, useRef, useState } from 'react'

import { IoAdd, IoMicOffOutline, IoMicOutline } from 'react-icons/io5'
import { RiVoiceprintFill } from 'react-icons/ri'

import { VoiceOrb } from '../../voice-orb'

import './style.css'

import type { ChangeEvent, FormEvent, JSX } from 'react'

type WorkspaceMode = 'chat' | 'voice'

const MAX_PROMPT_INPUT_HEIGHT = 180
const MIN_PROMPT_INPUT_HEIGHT = 34

const resizePromptInput = (input: HTMLTextAreaElement): void => {
  input.style.height = 'auto'

  const inputHeight = Math.min(Math.max(input.scrollHeight, MIN_PROMPT_INPUT_HEIGHT), MAX_PROMPT_INPUT_HEIGHT)

  input.style.height = `${inputHeight}px`
  input.dataset.scrollable = input.scrollHeight > MAX_PROMPT_INPUT_HEIGHT ? 'true' : 'false'
}

export function Workspace(): JSX.Element {
  const [promptValue, setPromptValue] = useState('')
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>('chat')
  const [isMicrophoneMuted, setIsMicrophoneMuted] = useState(false)
  const promptInputRef = useRef<HTMLTextAreaElement>(null)
  const hasPrompt = promptValue.trim().length > 0
  const isVoiceMode = workspaceMode === 'voice'

  useLayoutEffect(() => {
    const promptInput = promptInputRef.current

    if (!promptInput) {
      return
    }

    resizePromptInput(promptInput)
  }, [promptValue, workspaceMode])

  useLayoutEffect(() => {
    const promptInput = promptInputRef.current

    if (!promptInput || typeof ResizeObserver === 'undefined') {
      return
    }

    const observer = new ResizeObserver(() => {
      resizePromptInput(promptInput)
    })

    observer.observe(promptInput)

    return () => {
      observer.disconnect()
    }
  }, [])

  const toggleMicrophone = (): void => {
    setIsMicrophoneMuted((currentValue) => !currentValue)
  }

  const toggleWorkspaceMode = (): void => {
    setWorkspaceMode((currentMode) => (currentMode === 'chat' ? 'voice' : 'chat'))
  }

  const submitPrompt = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (!hasPrompt) {
      return
    }
  }

  const updatePromptValue = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    resizePromptInput(event.currentTarget)
    setPromptValue(event.target.value)
  }

  return (
    <section className="arc-workspace" aria-label="Voice orb workspace">
      <div className="arc-workspace__main" data-mode={workspaceMode}>
        <div
          className="arc-workspace__pane arc-workspace__pane--chat"
          data-active={workspaceMode === 'chat' ? 'true' : 'false'}
          aria-hidden={workspaceMode !== 'chat'}
        >
          <div className="arc-workspace__conversation" aria-live="polite" />
        </div>

        <div
          className="arc-workspace__pane arc-workspace__pane--voice"
          data-active={isVoiceMode ? 'true' : 'false'}
          aria-hidden={!isVoiceMode}
        >
          <div className="arc-voice-stage">
            <div className="arc-voice-stage__orb">
              <VoiceOrb label="음성 입력 상태" />
            </div>

            <button
              className="arc-voice-stage__microphone"
              type="button"
              data-muted={isMicrophoneMuted ? 'true' : 'false'}
              aria-pressed={isMicrophoneMuted}
              aria-label={isMicrophoneMuted ? '마이크 켜기' : '마이크 끄기'}
              onClick={toggleMicrophone}
            >
              <span className="arc-voice-stage__microphone-icon" aria-hidden="true">
                <IoMicOutline className="arc-voice-stage__microphone-icon-on" />
                <IoMicOffOutline className="arc-voice-stage__microphone-icon-off" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <form className="arc-composer" data-mode={workspaceMode} aria-label="메시지 입력" onSubmit={submitPrompt}>
        <button className="arc-composer__add" type="button" aria-label="추가">
          <IoAdd aria-hidden="true" />
        </button>
        <textarea
          ref={promptInputRef}
          className="arc-composer__input"
          rows={1}
          value={promptValue}
          placeholder="무엇을 도와드릴까요?"
          aria-label="메시지"
          disabled={isVoiceMode}
          onChange={updatePromptValue}
        />
        <span className="arc-composer__action-slot">
          <button
            className="arc-composer__submit"
            type="submit"
            data-visible={hasPrompt && !isVoiceMode ? 'true' : 'false'}
            aria-label="보내기"
            disabled={!hasPrompt || isVoiceMode}
          >
            <RiVoiceprintFill aria-hidden="true" />
          </button>
          <button
            className="arc-composer__voice-toggle"
            type="button"
            data-active={isVoiceMode ? 'true' : 'false'}
            data-visible={!hasPrompt || isVoiceMode ? 'true' : 'false'}
            aria-label={isVoiceMode ? '채팅 화면 열기' : '보이스 화면 열기'}
            aria-pressed={isVoiceMode}
            onClick={toggleWorkspaceMode}
          >
            <span className="arc-composer__voice-toggle-orb">
              <VoiceOrb label="음성 입력" />
            </span>
          </button>
        </span>
      </form>
    </section>
  )
}
