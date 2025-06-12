import { act, renderHook } from '@testing-library/react'
import usePreviousProductDetailPage from './use-previous-product-detail-page'
// import { createWrapper } from '@app/__test__/wrappers'
import { MessageService, WebviewMessages } from '@pichincha/events-microsite'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { appValues, flowValues } from '@app/__test__/values'

const axiosMock = new MockAdapter(axios)

jest.mock('@pichincha/events-microsite')

const mockSale = Object.freeze({
  idGpsSale: '545623',
  endVigency: '2021-05-05T00:00:00.000Z',
  startVigency: '2021-05-05T00:00:00.000Z',
  state: 'PENDIENTE',
})

// describe('usePreviousProductPage', () => {
//   it('should return defined', () => {
//     const wrapper = createWrapper({
//       app: {
//         ...appValues,
//         portal: {
//           sale: {
//             coverages: { items: [] },
//             actions: {
//               call: 'tel:999999999',
//               whatsapp:
//                 'https://api.whatsapp.com/send?phone=9999999999&text=Hola%20Nova%2c%20busco%20ayuda%20con%20mi%20seguro%20de%20fraudes',
//               userGuide: 'guia-de-uso-frauds',
//             },
//             range: {
//               aria: '',
//               items: [],
//             },
//             contract: {
//               aria: '',
//               value: 'contractValue',
//             },
//             description: {
//               aria: '',
//               value: '',
//             },
//           },
//         },
//         sale: { ...mockSale },
//       },
//       flow: { ...flowValues },
//     })

//     const { result } = renderHook(() => usePreviousProductPage(), { wrapper })

//     expect(result.current.content).toBeDefined()
//     expect(result.current.handleDownloadContract).toBeInstanceOf(Function)
//     expect(result.current.handleDownloadUseGuide).toBeInstanceOf(Function)
//     expect(result.current.handleOpenCall).toBeInstanceOf(Function)
//     expect(result.current.handleOpenWhatsapp).toBeInstanceOf(Function)
//   })

//   it('should handleDownloadContract', async () => {
//     const wrapper = createWrapper({
//       app: {
//         ...appValues,
//         portal: {
//           sale: {
//             coverages: { items: [] },
//             actions: {
//               call: 'tel:999999999',
//               whatsapp:
//                 'https://api.whatsapp.com/send?phone=9999999999&text=Hola%20Nova%2c%20busco%20ayuda%20con%20mi%20seguro%20de%20fraudes',
//               userGuide: 'guia-de-uso-frauds',
//             },
//             range: {
//               aria: '',
//               items: [],
//             },
//             contract: {
//               aria: '',
//               value: 'contractValue',
//             },
//             description: {
//               aria: '',
//               value: '',
//             },
//           },
//         },
//         sale: { ...mockSale },
//       },
//       flow: {
//         ...flowValues,
//         key: 'key',
//         transactionReference: 'transactionReference',
//       },
//       global: {
//         authEvent: {
//           channel: 'channel',
//           cif: 'cif',
//           clientId: 'clientId',
//           clientIdType: 'clientIdType',
//           deeplink: 'deeplink',
//           device: 'device',
//           guid: 'guid',
//           ip: 'ip',
//           os: 'os',
//           jwtToken: 'jwtToken',
//           screenWidth: 'screenWidth',
//           session: 'session',
//           xsrf: 'xsrf',
//         },
//       },
//     })

//     axiosMock.onPost().reply(200, {
//       code: '0',
//       message: 'Ok',
//       value: [
//         {
//           content: 'serviceContent',
//           contentType: 'application/pdf',
//           name: 'previsualización-de-documentos.pdf',
//         },
//       ],
//     })

//     const spySendMessage = jest.spyOn(MessageService, 'sendMessage')

//     const { result } = renderHook(() => usePreviousProductPage(), { wrapper })

//     await act(async () => {
//       await result.current.handleDownloadContract()
//     })

//     expect(spySendMessage).toHaveBeenCalledWith({
//       type: WebviewMessages.DOWNLOAD_FILE,
//       fileInfo: {
//         content: 'serviceContent',
//         contentType: 'application/pdf',
//         name: 'previsualización-de-documentos.pdf',
//       },
//     })
//   })

//   it('should return filtered and sorted coverages', () => {
//     const wrapper = createWrapper({
//       app: {
//         ...appValues,
//         portal: {
//           sale: {
//             coverages: {
//               items: [
//                 {
//                   key: '1',
//                   label: 'Label 1',
//                   value: 'Value 1',
//                   isActive: true,
//                   order: 2,
//                 },
//                 {
//                   key: '2',
//                   label: 'Label 2',
//                   value: 'Value 2',
//                   isActive: false,
//                   order: 2,
//                 },
//                 {
//                   key: '3',
//                   label: 'Label 3',
//                   value: 'Value 3',
//                   isActive: true,
//                   order: 1,
//                 },
//               ],
//             },
//             actions: {
//               call: 'tel:999999999',
//               whatsapp:
//                 'https://api.whatsapp.com/send?phone=9999999999&text=Hola%20Nova%2c%20busco%20ayuda%20con%20mi%20seguro%20de%20fraudes',
//               userGuide: 'guia-de-uso-frauds',
//             },
//             range: {
//               aria: '',
//               items: [],
//             },
//             contract: {
//               aria: '',
//               value: '',
//             },
//             description: {
//               aria: '',
//               value: '',
//             },
//           },
//         },
//         sale: { ...mockSale },
//       },
//       flow: { ...flowValues },
//     })

//     const { result } = renderHook(() => usePreviousProductPage(), { wrapper })

//     expect(result.current.coverages).toEqual([
//       {
//         key: '3',
//         label: 'Label 3',
//         value: 'Value 3',
//         isActive: true,
//         order: 1,
//       },
//       {
//         key: '1',
//         label: 'Label 1',
//         value: 'Value 1',
//         isActive: true,
//         order: 2,
//       },
//     ])
//   })
// })
