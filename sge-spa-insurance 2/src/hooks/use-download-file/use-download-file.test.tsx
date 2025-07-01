import { renderHook, act } from '@testing-library/react'
import useDownloadFile from './use-download-file'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { downloadFile } from '@app/utils/messages'

import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

const axiosMock = new MockAdapter(axios)

jest.mock('@app/utils/messages')

const store = makeStore({
  app: appValues,
  flow: flowValues,
  global: globalValues,
})

describe('useDownloadFile', () => {
  it('should return async function', () => {
    const { result } = renderHook(() => useDownloadFile('My-file'), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current).toBeInstanceOf(Function)
  })

  it('should function send message with', async () => {
    // axiosMock.onPost().reply(200, {
    //   code: '0',
    //   message: 'Ok',
    //   value: {
    //     transactionReference: '',
    //     documents: [
    //       {
    //         name: 'document-x',
    //         contentType: 'application/pdf',
    //         content: 'base64',
    //       },
    //     ],
    //   },
    // })

    axiosMock.onPost().reply(200, {
      value: [
        { name: 'document-x', contentType: 'application/pdf', content: 'base64' },
      ],
    })

    const nameDoc = 'document-x'

    const fileInfo = {
      content: 'base64',
      contentType: 'application/pdf',
      name: nameDoc,
    }

    const { result } = renderHook(() => useDownloadFile(nameDoc), {
      wrapper: createWrapperStore(store),
    })

    await act(async () => {
      await result.current()
    })

    expect(downloadFile).toHaveBeenCalledWith(fileInfo)
  })

  it('should not send message when axios fail', async () => {
    axiosMock.onPost().reply(500, {
      code: '500',
      message: 'Internal Server Error',
    })

    const nameDoc = 'document-x'

    const { result } = renderHook(() => useDownloadFile(nameDoc), {
      wrapper: createWrapperStore(store),
    })

    await act(async () => {
      await result.current()
    })

    expect(downloadFile).not.toHaveBeenCalled()
  })
})
