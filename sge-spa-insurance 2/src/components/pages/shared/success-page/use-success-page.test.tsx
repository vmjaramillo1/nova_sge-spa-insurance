import { act, renderHook } from '@testing-library/react'
import useSuccessPage from './use-success-page'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'
import { MessageService, WebviewMessages } from '@pichincha/events-microsite'


const axiosMock = new MockAdapter(axios)

jest.mock('@pichincha/events-microsite')

describe('useSuccessPage', () => {
  it('should return content', () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const { result } = renderHook(() => useSuccessPage(), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current.content).toBeDefined()
    expect(result.current.handleDownloadUserGuide).toBeInstanceOf(Function)
    expect(result.current.handleClickCall).toBeInstanceOf(Function)
    expect(result.current.handleBackHome).toBeInstanceOf(Function)
  })

  // todo adjust
  // it('should call phone', () => {
  //   const callPhoneMock = jest.spyOn(Messages, 'callPhone').mockImplementation(() => {})
  //   const store = makeStore({
  //     app: appValues,
  //     flow: flowValues,
  //     global: globalValues,
  //   })

  //   const { result } = renderHook(() => useSuccessPage(), {
  //     wrapper: createWrapperStore(store),
  //   })



  // })

  it('should download user guide', async () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    axiosMock.onPost().reply(200, {
      code: '0',
      message: 'Ok',
      value: [
        {
          content: 'serviceContent',
          contentType: 'application/pdf',
          name: 'previsualización-de-documentos.pdf',
        },
      ],
    })

    const spySendMessage = jest.spyOn(MessageService, 'sendMessage')

    const { result } = renderHook(() => useSuccessPage(), {
      wrapper: createWrapperStore(store),
    })

    await act(async () => {
      await result.current.handleDownloadUserGuide()
    })

    expect(spySendMessage).toHaveBeenCalledWith({
      type: WebviewMessages.DOWNLOAD_FILE,
      fileInfo: {
        content: 'serviceContent',
        contentType: 'application/pdf',
        name: 'previsualización-de-documentos.pdf',
      },
    })
  })
})
