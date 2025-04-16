/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void
    }
  }
}

export {}
