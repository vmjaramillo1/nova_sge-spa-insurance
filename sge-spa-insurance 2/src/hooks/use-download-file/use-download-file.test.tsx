import { FC, PropsWithChildren } from 'react'
import { renderHook, act } from '@testing-library/react'
import useDownloadFile from './use-download-file'
import { WrapperProviders, WrapperRoutes } from '@app/__test__/wrappers'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { downloadFile } from '@app/utils/messages'

const axiosMock = new MockAdapter(axios)

jest.mock('@app/utils/messages')

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <WrapperProviders
    flow={{
      key: 'key',
      transactionReference: 'transactionReference',
    }}
    global={{
      authEvent: {
        channel: 'channel',
        cif: 'cif',
        clientId: 'clientId',
        clientIdType: 'clientIdType',
        deeplink: 'deeplink',
        device: 'device',
        guid: 'guid',
        ip: 'ip',
        os: 'android',
        jwtToken: 'jwtToken',
        screenWidth: 'screenWidth',
        session: 'session',
        xsrf: 'xsrf',
      },
    }}
  >
    <WrapperRoutes>{children}</WrapperRoutes>
  </WrapperProviders>
)

const emptyDocumentInfo = {
  channelCode: '',
  channelProductCode: '',
  planCode: '',
  productCode: '',
}

describe('useDownloadFile', () => {
  it('should return async function', () => {
    const { result } = renderHook(() => useDownloadFile('My-file'), { wrapper })

    expect(result.current).toBeInstanceOf(Function)
  })

  it('should function send message with', async () => {
    axiosMock.onPost().reply(200, {
      code: '0',
      message: 'Ok',
      value: [
        {
          ...emptyDocumentInfo,
          documents: [
            {
              name: 'document-x',
              contentType: 'application/pdf',
              content: 'base64',
            },
          ],
        },
      ],
    })

    const nameDoc = 'document-x'

    const fileInfo = {
      content: 'base64',
      contentType: 'application/pdf',
      name: nameDoc,
    }

    const { result } = renderHook(() => useDownloadFile(nameDoc), { wrapper })

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

    const { result } = renderHook(() => useDownloadFile(nameDoc), { wrapper })

    await act(async () => {
      await result.current()
    })

    expect(downloadFile).not.toHaveBeenCalled()
  })
})
