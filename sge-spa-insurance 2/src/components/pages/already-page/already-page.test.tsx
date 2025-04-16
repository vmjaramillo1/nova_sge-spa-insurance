import { render } from '@testing-library/react'
import AlreadyPage from './already-page'
import { createWrapper } from '@app/__test__/wrappers'
import { FullIdentityEvent } from '@app/context/global-context'

const authEventValues: FullIdentityEvent = {
  channel: 'movil',
  cif: '1234123121',
  clientId: 'clientId',
  clientIdType: '0001',
  deeplink: 'deeplink',
  device: 'device',
  guid: 'guid',
  ip: 'ip',
  os: 'ios',
  jwtToken: 'jwtToken',
  screenWidth: 'screenWidth',
  session: 'sessionId',
  xsrf: 'xsrf',
}

describe('<AlreadyPage />', () => {
  it('should render', () => {
    const wrapper = createWrapper({
      global: {
        authEvent: { ...authEventValues },
      },
    })
    const { container } = render(<AlreadyPage />, { wrapper })
    expect(container).toMatchSnapshot()
  })
})
