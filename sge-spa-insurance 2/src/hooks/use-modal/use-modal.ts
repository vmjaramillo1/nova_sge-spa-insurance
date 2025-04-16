import { useState, useEffect } from 'react'
import { WebviewMessages } from '@pichincha/events-microsite'

import { LocalEvents } from '@app/utils/messages'

export interface ModalEventDetails {
  type: string
}
export type ModalEvent = CustomEvent<ModalEventDetails>

const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggle = () => setIsOpen((prev) => !prev)

  useEffect(() => {
    const callback = (event: ModalEvent) => {
      const { type } = event.detail
      setIsOpen(type === WebviewMessages.SHOW_MODAL)
    }

    document.addEventListener(LocalEvents.WEBVIEW_MODAL, callback)

    return () => {
      document.removeEventListener(LocalEvents.WEBVIEW_MODAL, callback)
    }
  }, [])

  return { isOpen, toggle }
}

export default useModal

declare global {
  interface DocumentEventMap {
    [LocalEvents.WEBVIEW_MODAL]: ModalEvent
  }
}
