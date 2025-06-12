import { ModalEventDetails } from '@app/hooks/use-modal/use-modal'
import {
  AppMessage,
  WebviewMessages,
  LocalEvents as PackageLocalEvents,
  MessageService,
  TrackingService,
  TrackApplication,
} from '@pichincha/events-microsite'
import { TrackingEvents } from '@app/utils/messages/tracking-events'

export const LocalEvents = {
  HEADER_PRESS_EVENT: PackageLocalEvents.HEADER_PRESS_EVENT,
  WEBVIEW_MODAL: 'WEBVIEW_MODAL',
} as const

export function callModal(type: 'OPEN' | 'CLOSE') {
  const message: AppMessage = {
    type: type === 'OPEN' ? WebviewMessages.SHOW_MODAL : WebviewMessages.CLOSE_MODAL,
  }

  document.dispatchEvent(
    new CustomEvent<ModalEventDetails>(LocalEvents.WEBVIEW_MODAL, {
      detail: message,
    })
  )
}

callModal.OPEN = 'OPEN' as const
callModal.CLOSE = 'CLOSE' as const

export function pressHeader() {
  document.dispatchEvent(new CustomEvent(LocalEvents.HEADER_PRESS_EVENT))
}

export function openBrowser(url: string) {
  const message: AppMessage = {
    type: WebviewMessages.OPEN_BROWSER,
    url,
  }

  MessageService.sendMessage(message)
}

interface FileInfo {
  content: string
  contentType: string
  name: string
}

export function downloadFile(fileInfo: FileInfo) {
  const message: AppMessage = {
    type: WebviewMessages.DOWNLOAD_FILE,
    fileInfo,
  }

  MessageService.sendMessage(message)
}

export function goBackHome() {
  const message: AppMessage = {
    type: WebviewMessages.GO_BACK_HOME,
  }

  MessageService.sendMessage(message)
}

// export function pushTrackEvent(eventName: string) {
//   TrackingService.pushTrackEvent(TrackApplication.APPSFLYER, {
//     eventName,
//   })
// }

export function pushTrackEvent(eventName: string) {
  if (
    [TrackingEvents.ONBOARDING_VIEW_PAGE, TrackingEvents.SUCCESS_VIEW_PAGE].includes(
      eventName
    )
  ) {
    MessageService.sendMessage({
      type: WebviewMessages.PUSH_TRACK_EVENT,
      customData: {
        eventName,
        eventValues: {
          tool: 'Moengage',
        },
      },
    })
  }
 
  TrackingService.pushTrackEvent(TrackApplication.APPSFLYER, {
    eventName,
  })
}

export function customMessage<T>(customData?: T) {
  const message: AppMessage = {
    type: 'CUSTOM_MESSAGE', // temporary until availability in package @pichincha/events-microsite
    customData,
  }

  MessageService.sendMessage(message)
}

export function backHomeWithTracking(eventName: string) {
  return () => {
    pushTrackEvent(eventName)
    goBackHome()
  }
}

interface TrackTagManagerLog {
  subProduct: string
  value: string
  aux?: string
  aux2?: string
}

export async function trackingConversion(params: TrackTagManagerLog) {
  try {
    const { subProduct: subproduct, aux = '', value, aux2: aux_2 = '' } = params

    window.dataLayer = window?.dataLayer ?? []

    window.dataLayer.push({
      event: 'conversion_seguro',
      product: 'seguros',
      subproduct,
      aux,
      aux_2,
      value,
      userflow: 'webview',
    })

    return true
  } catch (error) {
    return false
  }
}

export default {
  goBackHome,
  openBrowser,
  downloadFile,
  pushTrackEvent,
}

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}
