import { render, screen } from '@testing-library/react'
import SuccessPage from './success-page'
// import { createWrapper } from '@app/__test__/wrappers'
import { appValues, flowValues } from '@app/__test__/values'

const accountData = {
  alias: 'PRINCIPAL',
  balance: 1031.0,
  favorite: true,
  hash: '1as465d3as4d',
  mask: '******2234',
  type: 'SAVING_ACCOUNT',
  value: '1as465d3as4d',
}

const portalContent = {
  success: {
    title: '¡Contratación exitosa!',
    description: 'Póliza Maestra Nro: 50157',
    alert: 'Enviamos a tu correo el certificado',
    moreInformation: {
      isActive: true,
      action: {
        label: 'Llámanos al (02) 2999 999',
        link: 'https://www.google.com',
      },
      description: {
        aria: 'Si tienes requerimientos o más información, comunícate a Banca telefónica.',
        value: 'Para requerimientos o más información',
      },
    },
    details: [
      {
        isActive: true,
        key: 'item_3',
        order: 2,
        aria: 'Fecha de vencimiento Indefinido, fecha de contratación {3}',
        subItems: [
          {
            isActive: true,
            key: 'subItem_2',
            order: 1,
            label: 'Fecha de contratación',
            value: '{2}',
          },
          {
            isActive: true,
            key: 'subItem_1',
            order: 0,
            label: 'Fecha de vencimiento',
            value: 'Indefinido',
          },
        ],
      },
      {
        isActive: true,
        key: 'item_2',
        order: 1,
        aria: 'Cuenta de débito termina en {4}, fecha para débitos {1}',
        subItems: [
          {
            isActive: true,
            key: 'subItem_1',
            order: 0,
            value: '{0}',
            label: 'Cuenta de débito',
          },
          {
            isActive: true,
            key: 'subItem_2',
            order: 1,
            value: '{1}',
            label: 'Fecha para débitos',
          },
        ],
      },
      {
        isActive: true,
        key: 'item_1',
        order: 0,
        aria: 'Seguro por robos y fraudes, cobertura total. Precio incluido impuesto, 3 dólares con 99 centavos',
        subItems: [
          {
            isActive: true,
            key: 'subItem_1',
            order: 0,
            value: '$ 3,99',
            label: 'Precio incluido impuestos',
          },
          {
            isActive: true,
            key: 'subitem_2',
            order: 1,
            value: 'Cobertura total',
            label: 'Mi banca protegida',
          },
        ],
      },
    ],
  },
}

const mockDate = new Date(1692075600000)

// describe('<SuccessPage />', () => {
//   beforeEach(() => {
//     jest
//       .spyOn(global, 'Date')
//       .mockImplementation(() => mockDate as unknown as string)
//   })

//   afterEach(() => {
//     jest.clearAllMocks()
//   })

//   it('should render', () => {
//     const wrapper = createWrapper({
//       flow: {
//         ...flowValues,
//         accountHashSelected: '1as465d3as4d',
//       },
//       app: {
//         ...appValues,
//         accounts: [accountData],
//         portal: portalContent,
//       },
//       global: {
//         authEvent: {
//           os: 'android',
//         } as never,
//       },
//     })

//     const { baseElement } = render(<SuccessPage />, { wrapper })

//     expect(baseElement).toMatchSnapshot()
//   })

//   it('should show call action in android device', () => {
//     const wrapper = createWrapper({
//       flow: {
//         ...flowValues,
//         accountHashSelected: '1as465d3as4d',
//       },
//       app: {
//         ...appValues,
//         accounts: [accountData],
//         portal: portalContent,
//       },
//       global: {
//         authEvent: {
//           os: 'android',
//         } as never,
//       },
//     })

//     render(<SuccessPage />, { wrapper })

//     const moreInfoTitle = screen.getByText('Para requerimientos o más información')
//     const moreInfoButton = screen.getByRole('button', {
//       name: 'Llámanos al (02) 2999 999',
//     })

//     expect(moreInfoTitle).toBeInTheDocument()
//     expect(moreInfoButton).toBeInTheDocument()
//   })

//   it('should append call label in ios device', () => {
//     const wrapper = createWrapper({
//       flow: {
//         ...flowValues,
//         accountHashSelected: '1as465d3as4d',
//       },
//       app: {
//         ...appValues,
//         accounts: [accountData],
//         portal: portalContent,
//       },
//       global: {
//         authEvent: {
//           os: 'ios',
//         } as never,
//       },
//     })

//     render(<SuccessPage />, { wrapper })

//     const moreInfoTitle = screen.getByText(
//       'Para requerimientos o más información, llámanos al (02) 2999 999'
//     )

//     const moreInfoButton = screen.queryByRole('button', {
//       name: 'Llámanos al (02) 2999 999',
//     })

//     expect(moreInfoTitle).toBeInTheDocument()
//     expect(moreInfoButton).toBeNull()
//   })
// })
