import { renderHook } from '@testing-library/react'
import { createWrapper } from '@app/__test__/wrappers'
import useRouterEvent from './use-router-event'
import { MessageService } from '@pichincha/events-microsite'

jest.mock('@pichincha/events-microsite')

describe('useRouterEvent', () => {
  it('should be defined', () => {
    const wrapper = createWrapper()

    const spySendMessage = jest.spyOn(MessageService, 'sendMessage')

    renderHook(() => useRouterEvent(), { wrapper })

    expect(spySendMessage).toHaveBeenCalledTimes(1)
  })
})
