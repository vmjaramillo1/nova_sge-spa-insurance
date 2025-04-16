import { renderHook } from '@testing-library/react'
import useSuccessPage from './use-success-page'
import { createWrapper } from '@app/__test__/wrappers'
import { appValues, flowValues } from '@app/__test__/values'

describe('useSuccessPage', () => {
  it('should be defined', () => {
    const wrapper = createWrapper(
      {
        flow: { ...flowValues },
        app: {
          ...appValues,
          portal: {
            success: {
              details: [],
              moreInformation: {
                action: {
                  link: '',
                },
              },
            },
          },
        },
      },
      {
        outletValues: {
          isLoading: false,
          changeTitle: jest.fn(),
        },
      }
    )

    const { result } = renderHook(() => useSuccessPage(), { wrapper })

    expect(result.current.handleDownloadUserGuide).toBeInstanceOf(Function)
    expect(result.current.handleClickCall).toBeInstanceOf(Function)
    expect(result.current.content).toBeDefined()
  })

  it('should return content', () => {
    const wrapper = createWrapper({
      flow: { ...flowValues },
      app: {
        ...appValues,
        portal: {
          success: {
            title: 'title',
            description: 'description',
            button: 'button',
            details: [],
            moreInformation: {
              action: {
                link: '',
              },
            },
          },
        },
      },
    })

    const { result } = renderHook(() => useSuccessPage(), { wrapper })

    expect(result.current.content).toEqual({
      title: 'title',
      description: 'description',
      button: 'button',
      details: [],
      moreInformation: {
        action: {
          link: '',
        },
      },
    })
  })
})
