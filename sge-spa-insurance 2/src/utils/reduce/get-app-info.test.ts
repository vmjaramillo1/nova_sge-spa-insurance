import { MergeOfferablePreviousType } from '../enums/merge-offerable-previous-type'
import { OfferableWithType, getAppInfo } from './get-app-info'

// const fraudsOffer: OfferableWithType = {
//  // type: MergeOfferablePreviousType.OFFER,
//   code: 'BP_BANCAMOVIL_TU_BAN_PRO_2',
//   productCode: 'TU_BAN_PRO',
//   planCode: 'TU_BAN_PRO_2',
//   channelCode: 'BANCO01',
//   channelProductCode: 'BANCAMOVIL_TU_BAN_PRO',
//   wayCode: 'BPEMBEBIDO',
//   insuranceName: 'AIG Metropolitana',
//   paymentMethodOptions: [],
//   paymentPeriodicityOptions: [],
//   sale: null,
//   product: {
//     code: 'TU_BAN_PRO',
//     name: 'Seguro tu banca protegida',
//     isActive: true,
//     coverages: [],
//     exclusions: [],
//     assistances: [],
//     benefits: [],
//     deductibles: [],
//     requirements: [],
//   },
//   plans: [],
//   portal: {
//     code: 'BANCAMOVIL_TU_BAN_PRO',
//     sections: [],
//     params: [],
//   },
// }

// describe('getAppInfo', () => {
//   // todo ajustar
//   // it('should be defined', () => {
//   //   const result = getAppInfo({
//   //     offerablePrevious: { ...fraudsOffer },
//   //   })

//   //   expect(result).toEqual({
//   //     assistances: {},
//   //     benefits: {},
//   //     code: 'TU_BAN_PRO',
//   //     coverages: {},
//   //     exclusions: {},
//   //     insuranceName: 'AIG Metropolitana',
//   //     name: 'Seguro tu banca protegida',
//   //     plans: {},
//   //     portal: {},
//   //     sale: null,
//   //   })
//   // })
// })


// todo esto aun debe ser implementado
describe('getAppInfo', () => {
  it("should return ''", () => {
    //const result = getAppInfo()
    const result = () => {
      return 'value1'
    }

    expect(result).toEqual('value')
  })
})