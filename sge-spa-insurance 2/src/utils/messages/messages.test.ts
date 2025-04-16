import { MessageService, TrackingService } from '@pichincha/events-microsite'
import {
  backHomeWithTracking,
  callModal,
  downloadFile,
  goBackHome,
  openBrowser,
  pushTrackEvent,
  trackingConversion,
} from './messages'

jest.mock('@pichincha/events-microsite')

describe('openBrowser', () => {
  it('should call with', () => {
    const spyMessageService = jest.spyOn(MessageService, 'sendMessage')

    openBrowser('https://wwww.url.com')

    expect(spyMessageService).toBeCalledWith({
      type: 'OPEN_BROWSER',
      url: 'https://wwww.url.com',
    })
  })
})

describe('downloadFile', () => {
  it('should call with', () => {
    const spyMessageService = jest.spyOn(MessageService, 'sendMessage')

    downloadFile({
      content: 'content_in_base64',
      contentType: 'application/pdf',
      name: 'content.pdf',
    })

    expect(spyMessageService).toBeCalledWith({
      type: 'DOWNLOAD_FILE',
      fileInfo: {
        content: 'content_in_base64',
        contentType: 'application/pdf',
        name: 'content.pdf',
      },
    })
  })
})

describe('goBackHome', () => {
  it('should call with', () => {
    const spyMessageService = jest.spyOn(MessageService, 'sendMessage')

    goBackHome()

    expect(spyMessageService).toHaveBeenCalledWith({
      type: 'GO_BACK_HOME',
    })
  })
})

describe('pushTrackEvent', () => {
  it('should call with', () => {
    const spyTrackingService = jest.spyOn(TrackingService, 'pushTrackEvent')

    pushTrackEvent('Source_Product_SubProduct_Element_Action_None')

    expect(spyTrackingService).toBeCalledWith('appsflyer', {
      eventName: 'Source_Product_SubProduct_Element_Action_None',
    })
  })
})

describe('callModal', () => {
  it('should call open with', () => {
    const spyDocumentDispatch = jest.spyOn(document, 'dispatchEvent')

    callModal('OPEN')

    expect(spyDocumentDispatch).toBeCalledWith(
      new CustomEvent('WEBVIEW_MODAL', {
        detail: {
          type: 'SHOW_MODAL',
        },
      })
    )
  })

  it('should call close with', () => {
    const spyDocumentDispatch = jest.spyOn(document, 'dispatchEvent')

    callModal('CLOSE')

    expect(spyDocumentDispatch).toBeCalledWith(
      new CustomEvent('WEBVIEW_MODAL', {
        detail: {
          type: 'CLOSE_MODAL',
        },
      })
    )
  })
})

describe('backHomeWithTracking', () => {
  it('should return function', () => {
    const result = backHomeWithTracking(
      'Source_Product_SubProduct_Element_Action_None'
    )

    expect(result).toBeInstanceOf(Function)
  })
})

describe('trackTagManager', () => {
  beforeEach(() => {
    window.dataLayer = undefined as unknown as unknown[]
  })

  it('should add item in dataLayer', () => {
    trackingConversion({
      value: '3.99',
      subProduct: 'fraudes',
      aux: 'mensual',
      aux2: 'cuenta',
    })

    expect(window.dataLayer).toEqual([
      {
        event: 'conversion_seguro',
        product: 'seguros',
        subproduct: 'fraudes',
        userflow: 'webview',
        aux: 'mensual',
        aux_2: 'cuenta',
        value: '3.99',
      },
    ])
  })
})
