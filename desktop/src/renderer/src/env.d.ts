/// <reference types="vite/client" />

type ArcDesktopEnvironment = {
  locale?: string
}

type ArcDesktopApi = {
  environment: ArcDesktopEnvironment
}

interface Window {
  arc?: ArcDesktopApi
}
