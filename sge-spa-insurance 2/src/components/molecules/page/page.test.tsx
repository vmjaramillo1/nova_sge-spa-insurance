import { render, screen } from '@testing-library/react'
import Page from './page'
import { createWrapper } from '@app/__test__/wrappers'
import { FlowStatus, RoutesAlias, RoutesFraudAlias } from '@app/utils/enums'
import { APP_ROUTES } from '@app/routes/config'
import { Route } from 'react-router-dom'

jest.mock('@pichincha/events-microsite')

describe('<Page />', () => {
  let contextValues = {}

  beforeEach(() => {
    contextValues = {
      isLoading: false,
      changeTitle: jest.fn(),
    }
  })

  it('should render content', () => {
    const wrapper = createWrapper({}, { outletValues: { ...contextValues } })

    render(<Page title="Seguro por robos y fraudes">ContentPage</Page>, { wrapper })

    const pageContent = screen.getByText('ContentPage')

    expect(pageContent).toBeVisible()
  })

  it('should render fallback when is loading', () => {
    const wrapper = createWrapper(
      {},
      {
        outletValues: {
          ...contextValues,
          isLoading: true,
        },
      }
    )

    render(
      <Page title="Seguro por robos y fraudes" fallback="Fallback">
        ContentPage
      </Page>,
      { wrapper }
    )

    const pageContent = screen.getByText('Fallback')

    expect(pageContent).toBeVisible()
  })

  it('should navigate to retry page', () => {
    const wrapper = createWrapper(
      {
        flow: {
          status: FlowStatus.RETRY_ACCEPTANCE_ERROR,
          step: RoutesFraudAlias.PRODUCT_DETAIL,
        },
      },
      {
        outletValues: { ...contextValues },
        routes: (
          <Route
            path={APP_ROUTES.RETRY_ACCEPTANCE}
            element={<div>AcceptancePage</div>}
          />
        ),
      }
    )

    render(
      <Page title="Seguro por robos y fraudes">
        <div>ContentPage</div>
      </Page>,
      { wrapper }
    )

    expect(screen.getByText('AcceptancePage')).toBeVisible()
  })

  it('should navigate to success page', () => {
    const wrapper = createWrapper(
      {
        flow: {
          status: FlowStatus.END_SUCCESS,
          step: RoutesFraudAlias.ACCEPTANCE,
        },
      },
      {
        outletValues: { ...contextValues },
        routes: <Route path={APP_ROUTES.SUCCESS} element={<div>SuccessPage</div>} />,
      }
    )

    render(
      <Page title="Seguro por robos y fraudes">
        <div>ContentPage</div>
      </Page>,
      { wrapper }
    )

    expect(screen.getByText('SuccessPage')).toBeVisible()
  })
})
