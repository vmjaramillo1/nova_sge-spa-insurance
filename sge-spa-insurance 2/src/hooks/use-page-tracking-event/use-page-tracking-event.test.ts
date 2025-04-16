import { renderHook } from '@testing-library/react'
import usePageTrackingEvent from './use-page-tracking-event'
import { pushTrackEvent } from '@app/utils/messages'

jest.mock('@app/utils/messages')

describe('usePageTrackingEvent', () => {
  it('should be defined', () => {
    renderHook(() => usePageTrackingEvent('EVENT'))

    expect(pushTrackEvent).toHaveBeenCalledWith('EVENT')
  })
})
