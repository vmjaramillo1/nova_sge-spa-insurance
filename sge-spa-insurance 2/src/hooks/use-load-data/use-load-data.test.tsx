import { renderHook, screen, waitFor } from '@testing-library/react'
import { Route } from 'react-router-dom'

// import { createWrapper } from '@app/__test__/wrappers'
import { APP_ROUTES } from '@app/routes/config'

import useLoadData from './use-load-data'
import InsuranceService from '@app/services/insurance/insurance.service'

import {
  createWrapperMemoryStore,
  makeStore,
} from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'
import { useOutletContext } from 'react-router-dom'



const identityEvent = Object.freeze({
  clientId: '1212121212',
  clientIdType: '0001',
  device: '8f6as5d76asd8asdf',
  guid: 'a41d2756c0bc44a2b1eae8c016111e5a',
  session: 'bbfd6972-3ae1-455c-85da-fa7e6a43d73a',
  ip: '234.10.30.233',
  cif: '457687',
  jwtToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9',
  channel: 'movil',
  xsrf: '',
  os: 'ios',
  screenWidth: '',
  deeplink: '',
})

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
}))

// todo ajustar prueba
describe('useLoadData', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

//   it('should navigate to hub product home if service returns ok', async () => {
//     ;(useOutletContext as jest.Mock).mockReturnValue({
//       isLoading: false,
//       changeTitle: jest.fn(),
//     })

//     const validateSpy = jest
//       .spyOn(InsuranceService, 'validateOffer')
//       .mockReturnValue(
//         Promise.resolve({
//           code: '0',
//           message: 'Ok',
//           value: {
//             transactionReference: '8d4d1a40-5901-44be-9046-cf26f9a468d6',
//             lopdpAcceptation: true,
//             offerableProducts: [
//               {
//                 productCode: 'TU_BAN_PRO',
//                 portalCode: 'POR_BP_BANCAMOVIL_TU_BAN_PRO',
//               },
//               {
//                 productCode: 'LIFE_HEALTH',
//                 portalCode: 'POR_BP_BANCAMOVIL_LIFE_HEALTH',
//               },
//             ],
//             previousProducts: [],
//             availablePaymentOptions: {},
//             portal: {},
//             client: {},
//           },
//         })
//       )

//     jest.spyOn(InsuranceService, 'findOffer').mockReturnValue(
//       Promise.resolve({
//         code: '0',
//         message: 'Ok',
//         value: [
//           {
//             code: null,
//             productCode: 'TU_BAN_PRO',
//             planCode: null,
//             channelCode: 'BANCO01',
//             channelProductCode: 'BP_BM_REQUESTS',
//             wayCode: 'BPEMBEBIDO',
//             insuranceName: 'AIG Metropolitana',
//             paymentMethodOptions: [],
//             paymentPeriodicityOptions: [],
//             sale: null,
//             product: {
//               code: 'TU_BAN_PRO',
//               name: 'Seguro tu banca protegida',
//               isActive: true,
//               coverages: [],
//               exclusions: [],
//               assistances: [],
//               benefits: [],
//               deductibles: [],
//               requirements: [],
//             },
//             plans: [],
//             portal: {
//               code: 'POR_BP_BANCAMOVIL_TU_BAN_PRO',
//               params: [
//                 {
//                   key: 'FlowCode',
//                   value: 'FLOW_TU_BAN_PRO',
//                 },
//               ],
//               isActive: true,
//               sections: [],
//             },
//           },
//         ],
//       })
//     )


//     jest.mock('@app/hooks/use-identity', () => ({
//   __esModule: true,
//   default: () => ({
//     cif: '2383122',
//     dni: '1234567890',
//     dniType: 'CED',
//     device: 'device123',
//     guid: 'guid123',
//     session: 'session123',
//     ip: '0.0.0.0',
//   }),
// }))

//     // const wrapper = createWrapper(
//     //   {
//     //     global: {
//     //       authEvent: { ...identityEvent },
//     //     },
//     //   },
//     //   {
//     //     routes: (
//     //       <>
//     //         <Route path={APP_ROUTES.INSURANCE_PORTAL} element={<>HubHomePage</>} />
//     //       </>
//     //     ),
//     //   }
//     // ) 

//     const wrapper = createWrapperMemoryStore(
//       {
//         app: appValues,
//         flow: flowValues,
//         global: globalValues,
//       },
//       {
//         outletValues: { isLoading: false, changeTitle: jest.fn() },
//         routes: (
//           <>
//             <Route path={APP_ROUTES.INSURANCE_PORTAL} element={<>HubHomePage</>} />
//             <Route path={APP_ROUTES.GENERAL_ERROR} element={<>UnexpectedError</>} />
//           </>
//         ),
//         initialEntries: ['/seguros', '/error'],
//       }
//     )

//     renderHook(() => useLoadData(), { wrapper })

//     await waitFor(() => {
//       expect(screen.getByText('HubHomePage')).toBeInTheDocument()
//     })

//     validateSpy.mockRestore()
//   })

  it('should navigate to error page if service returns error', async () => {
    ;(useOutletContext as jest.Mock).mockReturnValue({
      isLoading: false,
      changeTitle: jest.fn(),
    })

    const wrapper = createWrapperMemoryStore(
      {
        app: appValues,
        flow: flowValues,
        global: globalValues,
      },
      {
        outletValues: { isLoading: false, changeTitle: jest.fn() },
        routes: (
          <>
            <Route path={APP_ROUTES.INSURANCE_PORTAL} element={<>HubHomePage</>} />
            <Route path={APP_ROUTES.GENERAL_ERROR} element={<>UnexpectedError</>} />
          </>
        ),
        initialEntries: ['/seguros', '/error'],
      }
    )

    const validateSpy = jest
      .spyOn(InsuranceService, 'validateOffer')
      .mockReturnValue(
        Promise.resolve({
          code: '1',
          message: 'Error',
        })
      )

    renderHook(() => useLoadData(), { wrapper })

    await waitFor(() => {
      expect(screen.getByText('UnexpectedError')).toBeInTheDocument()
    })

    validateSpy.mockRestore()
  })
})
