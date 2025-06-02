import { render } from '@testing-library/react'
import AcceptancePage from './acceptance-page'
// import { createWrapper } from '@app/__test__/wrappers'
import { FlowStatus } from '@app/utils/enums'
import { appValues, flowValues } from '@app/__test__/values'

jest.mock('@pichincha/events-microsite')

// describe('<AcceptancePage />', () => {
//   it('should render', () => {
//     const wrapper = createWrapper({
//       global: {
//         authEvent: {
//           channel: 'movil',
//           cif: '123123',
//           clientId: '1212121212',
//           clientIdType: '0002',
//           deeplink: 'deeplink',
//           device: '34a1sd32asd',
//           guid: 'a65s3da4s3d543as45da3sd',
//           ip: 'ip',
//           os: 'os',
//           jwtToken: 'jwtToken',
//           screenWidth: '1280',
//           session: 'a4s3das36d5a4sd6',
//           xsrf: 'xsrf',
//         },
//       },
//       flow: {
//         status: FlowStatus.NORMAL,
//         accountHashSelected: '0x00',
//         ...flowValues,
//       },
//       app: {
//         ...appValues,
//         accounts: [
//           {
//             alias: 'alias',
//             balance: 100,
//             favorite: true,
//             hash: '0x00',
//             mask: '******0000',
//             type: 'SAVINGS_ACCOUNT',
//             value: '0000',
//           },
//         ],
//         portal: {
//           acceptance: {
//             descriptions: {
//               aria: '',
//               from: '',
//               toPay: '',
//             },
//           },
//         },
//       },
//     })

//     const { container } = render(<AcceptancePage />, { wrapper })

//     expect(container).toMatchSnapshot()
//   })
// })
