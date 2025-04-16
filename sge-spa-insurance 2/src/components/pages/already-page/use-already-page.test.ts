import { act, renderHook } from '@testing-library/react'
import useAlreadyPage from './use-already-page'
import { createWrapper } from '@app/__test__/wrappers'
import { FullIdentityEvent } from '@app/context/global-context'

import * as messagesUtils from '@app/utils/messages'

const authEventValues: FullIdentityEvent = {
  channel: 'movil',
  cif: '123123',
  clientId: '1243123123',
  clientIdType: '0002',
  deeplink: 'deeplink',
  device: '213412123132541234123',
  guid: 'guid',
  ip: 'ip',
  os: 'ios',
  jwtToken: 'jwtToken',
  screenWidth: 'screenWidth',
  session: 'sessionId',
  xsrf: 'xsrf',
}

jest.mock('@pichincha/events-microsite')

jest.mock('@app/utils/messages', () => ({
  __esModule: true,
  ...jest.requireActual('@app/utils/messages'),
}))

describe('useAlreadyPage', () => {
  it('should return defined', () => {
    const wrapper = createWrapper({
      global: {
        authEvent: { ...authEventValues },
      },
    })

    const { result } = renderHook(() => useAlreadyPage(), { wrapper })

    expect(result.current.handleBack).toBeInstanceOf(Function)
    expect(result.current.handleCall).toBeInstanceOf(Function)
  })

  it('should call openBrowser if os is android', () => {
    const spyOpenBrowser = jest.spyOn(messagesUtils, 'openBrowser')

    const wrapper = createWrapper({
      global: {
        authEvent: { ...authEventValues, os: 'android' },
      },
    })

    const { result } = renderHook(() => useAlreadyPage(), { wrapper })

    act(() => {
      result.current.handleCall()
    })

    expect(spyOpenBrowser).toBeCalledWith('tel:022999999')
  })

  it("should call pushTrackEvent but not openBrowser if os isn't android", () => {
    const spyPushTrackEvent = jest.spyOn(messagesUtils, 'pushTrackEvent')
    const spyOpenBrowser = jest.spyOn(messagesUtils, 'openBrowser')

    const wrapper = createWrapper({
      global: {
        authEvent: { ...authEventValues },
      },
    })

    const { result } = renderHook(() => useAlreadyPage(), { wrapper })

    act(() => {
      result.current.handleCall()
    })

    expect(spyPushTrackEvent).toBeCalledWith('BM_Segu_Frau_11YaCuen_Btn_Clk_Call')
    expect(spyOpenBrowser).not.toBeCalled()
  })
})
