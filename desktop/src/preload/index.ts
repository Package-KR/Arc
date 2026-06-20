import { contextBridge } from 'electron'

const ARC_LOCALE_ARGUMENT_PREFIX = '--arc-locale='

function readInitialLocale(): string | undefined {
  const localeArgument = process.argv.find((argument) => argument.startsWith(ARC_LOCALE_ARGUMENT_PREFIX))

  if (!localeArgument) {
    return undefined
  }

  const locale = localeArgument.slice(ARC_LOCALE_ARGUMENT_PREFIX.length).trim()

  if (!locale) {
    return undefined
  }

  return decodeURIComponent(locale)
}

contextBridge.exposeInMainWorld('arc', {
  environment: {
    locale: readInitialLocale()
  }
})
