import { render } from '@testing-library/react'
import ProductPage from './product-page'
import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

jest.mock('@pichincha/events-microsite')

const store = makeStore({
  app: appValues,
  flow: {
    ...flowValues,
    shared: {
      productCode: 'LIFE_HEALTH',
      accountHashSelected:
        '727653384647637a774b5a7077486c595a3467516258316a4f7432694273727379625875583637366331453d',
      planSelected: 'LIFE_HEALTH_3',
      periodicitySelected: 'MONTHLY',
      transactionReference: '8d4d1a40-5901-44be-9046-cf26f9a468d6',
      contentLoaded: true,
      step: 'PRODUCT',
      status: 'WAIT_LOAD',
      contract: '',
    },
  },
  global: globalValues,
})

const wrapper = createWrapperStore(store)

describe('<ProductPage />', () => {
  it('should render', () => {
    const { container } = render(<ProductPage />, { wrapper })

    expect(container).toMatchSnapshot()
  })
})
