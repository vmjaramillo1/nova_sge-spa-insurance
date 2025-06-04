import { render, screen } from '@testing-library/react'
import Page from './page'
// import { createWrapper } from '@app/__test__/wrappers'
import { FlowStatus, RoutesFraudAlias } from '@app/utils/enums'
import { APP_ROUTES } from '@app/routes/config'
import { Route } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom' // importa el hook aquí
import { createWrapperStore,createWrapperMemoryStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

jest.mock('@pichincha/events-microsite')

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
}))

describe('<Page />', () => {
  it('should render content', () => {
    ;(useOutletContext as jest.Mock).mockReturnValue({
      isLoading: false,
      changeTitle: jest.fn(),
    })

    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const Wrapper = createWrapperStore(store)

    render(<Page title="Seguro por robos y fraudes">ContentPage</Page>, {
      wrapper: Wrapper,
    })

    const pageContent = screen.getByText('ContentPage')
    expect(pageContent).toBeVisible()
  })

  it('should render fallback when is loading', () => {
    ;(useOutletContext as jest.Mock).mockReturnValue({
      isLoading: true,
      changeTitle: jest.fn(),
    })

    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const Wrapper = createWrapperStore(store)

    render(
      <Page title="Seguro por robos y fraudes" fallback="Fallback">
        ContentPage
      </Page>,
      {
        wrapper: Wrapper,
      }
    )

    const pageContent = screen.getByText('Fallback')
    expect(pageContent).toBeVisible()
  })

  it('should navigate to retry page', () => {
    ;(useOutletContext as jest.Mock).mockReturnValue({
      isLoading: false,
      changeTitle: jest.fn(),
    })

    const store = makeStore({
      app: appValues,
      flow: {
        shared: {
          productCode: 'TU_BAN_PRO',
          accountHashSelected:
            '42e976aea883be9ad3b29487ab3d1a64778bdbfbac9d02f30941d30600b76585',
          planSelected: 'TU_BAN_PRO_2',
          periodicitySelected: 'MONTHLY',
          transactionReference: '60547864-a16d-4571-9771-25d0f98ffc11',
          key: 'aUYg77Dfr/mA8NhDEHfVRbksKZjbdPnuV3ARE29k3vCL2/dnEgSBJl1xbo/Dey3t5LXDvGIRgV7QUAvEacJSHKqyrns3ej5fFPxl59bAxPBTM4cONP2NyRJKomx9RmLA9QOv9x4=',
          contentLoaded: true,
          step: RoutesFraudAlias.PRODUCT_DETAIL,
          status: FlowStatus.RETRY_ACCEPTANCE_ERROR,
        },
      },
      global: globalValues,
    })

    const routes = (
      <Route
        path={APP_ROUTES.RETRY_ACCEPTANCE}
        element={<div>AcceptancePage</div>}
      />
    )

    const Wrapper = createWrapperMemoryStore(store)

    render(
      <Page title="Seguro por robos y fraudes" fallback="Fallback">
        ContentPage
      </Page>,
      {
        wrapper: Wrapper,
      }
    )

    // const wrapper = createWrapper(
    //   {
    //     flow: {
    //       status: FlowStatus.RETRY_ACCEPTANCE_ERROR,
    //       step: RoutesFraudAlias.PRODUCT_DETAIL,
    //     },
    //   },
    //   {
    //     outletValues: { ...contextValues },
    //     routes: (
    //       <Route
    //         path={APP_ROUTES.RETRY_ACCEPTANCE}
    //         element={<div>AcceptancePage</div>}
    //       />
    //     ),
    //   }
    // )

    // render(
    //   <Page title="Seguro por robos y fraudes">
    //     <div>ContentPage</div>
    //   </Page>,
    //   { wrapper }
    // )

    expect(screen.getByText('AcceptancePage')).toBeVisible()
  })

  // it('should navigate to success page', () => {
  //   const wrapper = createWrapper(
  //     {
  //       flow: {
  //         status: FlowStatus.END_SUCCESS,
  //         step: RoutesFraudAlias.ACCEPTANCE,
  //       },
  //     },
  //     {
  //       outletValues: { ...contextValues },
  //       routes: <Route path={APP_ROUTES.SUCCESS} element={<div>SuccessPage</div>} />,
  //     }
  //   )

  //   render(
  //     <Page title="Seguro por robos y fraudes">
  //       <div>ContentPage</div>
  //     </Page>,
  //     { wrapper }
  //   )

  //   expect(screen.getByText('SuccessPage')).toBeVisible()
  // })
})
