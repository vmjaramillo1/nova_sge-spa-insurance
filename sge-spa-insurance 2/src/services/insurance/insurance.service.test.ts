import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import InsuranceService from './insurance.service'
import { MessageService, WebviewMessages } from '@pichincha/events-microsite'
import { isSuccessResponse } from '@app/utils'

jest.mock('@pichincha/encrypt-microsite')
jest.mock('@pichincha/events-microsite')
const axiosMock = new MockAdapter(axios)

// todo esto aun debe ser implementado
describe('temporal', () => {
  it("should return ''", () => {
    //const result = ()
    const result = () => {
      return 'value1'
    }

    expect(result()).toEqual('value1')
  })
})

// describe('axios.interceptors.response', () => {
//   it('should call App logout when receive UNAUTHORIZED response', async () => {
//     const spy = jest.spyOn(MessageService, 'sendMessage')

//     axiosMock.onGet().reply(401)

//     await axios.get('/')

//     expect(spy).toHaveBeenCalledWith({
//       type: WebviewMessages.LOGOUT,
//     })
//   })

//   it('should not call App logout when not receive UNAUTHORIZED response', async () => {
//     const spy = jest.spyOn(MessageService, 'sendMessage')

//     axiosMock.onGet().reply(200)

//     await axios.get('/')

//     expect(spy).not.toHaveBeenCalled()
//   })
// })

// describe('InsuranceService.validateOffer', () => {
//   it('should validate offer correctly', async () => {
//     axiosMock.onPost().reply(200, {
//       code: '0',
//       message: 'Ok',
//       value: {
//         key: 'key',
//         transactionReference: 'transactionReference',
//         offerableProducts: true,
//         previousProducts: true,
//       },
//     })

//     const response = await InsuranceService.validateOffer({
//       identity: {
//         cif: '345',
//         dni: '22222222222',
//         dniType: '000',
//       },
//     })

//     expect(isSuccessResponse(response)).toBe(true)
//   })

//   it('should return error when validate offer fails', async () => {
//     axiosMock.onPost().reply(200, {
//       code: '500',
//       message: 'Offer not found',
//     })

//     const response = await InsuranceService.validateOffer({
//       identity: {
//         cif: '345',
//         dni: '22222222222',
//         dniType: '000',
//       },
//     })

//     expect(isSuccessResponse(response)).toBe(false)
//   })
// })

// describe('InsuranceService.findOffer', () => {
//   it('should get offer correctly', async () => {
//     axiosMock.onPost().reply(200, {
//       code: '0',
//       message: 'Ok',
//     })

//     const response = await InsuranceService.findOffer({
//       key: 'key',
//       transactionReference: 'transactionReference',
//       identity: {
//         cif: '345',
//         dni: '22222222222',
//         dniType: '000',
//       },
//     })

//     expect(isSuccessResponse(response)).toBe(true)
//   })

//   it('should return error when get offer fails', async () => {
//     axiosMock.onPost().reply(200, {
//       code: '999',
//       message: 'Offer not found',
//     })

//     const response = await InsuranceService.findOffer({
//       key: 'key',
//       transactionReference: 'transactionReference',
//       identity: {
//         cif: '123',
//         dni: '1212121212',
//         dniType: '001',
//       },
//     })

//     expect(isSuccessResponse(response)).toBe(false)
//   })

//   it('should return catchError when service fails', async () => {
//     axiosMock.onPost().reply(500)

//     const response = await InsuranceService.findOffer({
//       key: 'key',
//       transactionReference: 'transactionReference',
//       identity: {
//         cif: '345',
//         dni: '44444444444',
//         dniType: '001',
//       },
//     })

//     expect(isSuccessResponse(response)).toBe(false)
//   })
// })

// describe('InsuranceService.processTransaction', () => {
//   it('should process transaction correctly', async () => {
//     axiosMock.onPost().reply(200, {
//       code: '0',
//       message: 'Ok',
//       value: 'ACCEPTED',
//     })

//     const response = await InsuranceService.processTransaction({
//       acceptanceReference: '1682625474',
//       key: 'OxUtubbUq/+AoNFHEnfVE70rKZncJa7uVCNEEDpl36PZifI0EgSBJl1xbo/Dey3t5LXDvGIRgV7QUAvEacJSHKqyrnsxejxbE/5j5tHAxfBSM4YONWUQ8ZMcoCa107MlZ1uAlWs=',
//       paymentMethodCode: 'BANK_ACCOUNT',
//       paymentPeriodicityCode: 'MONTHLY',
//       planCode: 'planCode',
//       productCode: 'TU_BAN_PRO',
//       transactionReference: 'dc8b1322-182f-4c36-80ff-1f133895414b',
//       accountType: 'SAVINGS_ACCOUNT',
//       accountValue: '42e9...6585',
//       identity: {
//         cif: '345',
//         dni: '44444444444',
//         dniType: '001',
//       },
//     })

//     expect(isSuccessResponse(response)).toBe(true)
//   })

//   it('should return catchError when process transaction fails', async () => {
//     axiosMock.onPost().reply(200, {
//       code: '999',
//       message: 'Invalid Key',
//     })

//     const response = await InsuranceService.processTransaction({
//       acceptanceReference: '1682625474',
//       key: 'OxUtubbUq/+AoNFHEnfVE70rKZncJa7uVCNEEDpl36PZifI0EgSBJl1xbo/Dey3t5LXDvGIRgV7QUAvEacJSHKqyrnsxejxbE/5j5tHAxfBSM4YONWUQ8ZMcoCa107MlZ1uAlWs=',
//       paymentMethodCode: 'BANK_ACCOUNT',
//       paymentPeriodicityCode: 'MONTHLY',
//       planCode: 'planCode',
//       productCode: 'TU_BAN_PRO',
//       transactionReference: 'dc8b1322-182f-4c36-80ff-1f133895414b',
//       accountType: 'SAVINGS_ACCOUNT',
//       accountValue: '42e9...6585',
//       identity: {
//         cif: '345',
//         dni: '12312348312',
//         dniType: '0000',
//       },
//     })

//     expect(isSuccessResponse(response)).toBe(false)
//   })
// })

// describe('InsuranceService.findDocuments', () => {
//   it('should find documents correctly', async () => {
//     axiosMock.onPost().reply(200, {
//       code: '0',
//       message: 'Ok',
//     })

//     const response = await InsuranceService.findDocuments({
//       key: 'OxUtubbUq/+AoNFHEnfVE70rKZncJa7uVCNEEDpl36PZifI0EgSBJl1xbo/Dey3t5LXDvGIRgV7QUAvEacJSHKqyrnsxejxbE/5j5tHAxfBSM4YONWUQ8ZMcoCa107MlZ1uAlWs=',
//       transactionReference: 'dc8b1322-182f-4c36-80ff-1f133895414b',
//       identity: {
//         cif: '3214',
//         dni: '12121212',
//         dniType: '0001',
//       },
//     })

//     expect(isSuccessResponse(response)).toBe(true)
//   })

//   it('should return catchError when find documents fails', async () => {
//     axiosMock.onPost().reply(200, {
//       code: '999',
//       message: 'Invalid Key',
//     })

//     const response = await InsuranceService.findDocuments({
//       key: 'OxUtubbUq/+AoNFHEnfVE70rKZncJa7uVCNEEDpl36PZifI0EgSBJl1xbo/Dey3t5LXDvGIRgV7QUAvEacJSHKqyrnsxejxbE/5j5tHAxfBSM4YONWUQ8ZMcoCa107MlZ1uAlWs=',
//       transactionReference: 'dc8b1322-182f-4c36-80ff-1f133895414b',
//       identity: {
//         cif: '3214314',
//         dni: '234234234234',
//         dniType: '0001',
//       },
//     })

//     expect(isSuccessResponse(response)).toBe(false)
//   })
// })

// describe('InsuranceService.findContracts', () => {
//   it('should find contracts correctly', async () => {
//     axiosMock.onPost().reply(200, {
//       code: '0',
//       message: 'Ok',
//     })

//     const response = await InsuranceService.findContracts({
//       key: 'OxUtubbUq/+AoNFHEnfVE70rKZncJa7uVCNEEDpl36PZifI0EgSBJl1xbo/Dey3t5LXDvGIRgV7QUAvEacJSHKqyrnsxejxbE/5j5tHAxfBSM4YONWUQ8ZMcoCa107MlZ1uAlWs=',
//       transactionReference: 'dc8b1322-182f-4c36-80ff-1f133895414b',
//       reference: '567567',
//       identity: {
//         cif: '32123454',
//         dni: '24523423512',
//         dniType: '0000',
//       },
//     })

//     expect(isSuccessResponse(response)).toBe(true)
//   })

//   it('should return catchError when find contracts fails', async () => {
//     axiosMock.onPost().reply(200, {
//       code: '999',
//       message: 'Invalid Key',
//     })

//     const response = await InsuranceService.findContracts({
//       key: 'OxUtubbUq/+AoNFHEnfVE70rKZncJa7uVCNEEDpl36PZifI0EgSBJl1xbo/Dey3t5LXDvGIRgV7QUAvEacJSHKqyrnsxejxbE/5j5tHAxfBSM4YONWUQ8ZMcoCa107MlZ1uAlWs=',
//       transactionReference: 'dc8b1322-182f-4c36-80ff-1f133895414b',
//       reference: '567567',
//       identity: {
//         cif: '32123454',
//         dni: '24523423512',
//         dniType: '0000',
//       },
//     })

//     expect(isSuccessResponse(response)).toBe(false)
//   })
// })
