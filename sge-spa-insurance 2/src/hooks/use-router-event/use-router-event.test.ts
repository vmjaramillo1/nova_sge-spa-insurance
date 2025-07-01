import { renderHook } from '@testing-library/react'
import useRouterEvent from './use-router-event'
import { MessageService } from '@pichincha/events-microsite'

import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

jest.mock('@pichincha/events-microsite')

describe('useRouterEvent', () => {
  it('should be defined', () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const spySendMessage = jest.spyOn(MessageService, 'sendMessage')

    renderHook(() => useRouterEvent(), { wrapper: createWrapperStore(store) })

    expect(spySendMessage).toHaveBeenCalledTimes(1)
  })
})
