import {
  mapperPlan,
  mapperProduct,
  reduceGeneric,
  reducePaymentMethodsOptions,
  reducePaymentPeriodicityOptions,
  reducePlanCoverages,
  reducePlans,
  reducePrices,
} from './reduce'

describe('reduceGeneric', () => {
  it('should return record of properties without key param', () => {
    const result = reduceGeneric(
      [
        { id: '1', name: 'name 1' },
        { id: '2', name: 'name 2' },
      ],
      'id'
    )

    expect(result).toEqual({
      '1': { name: 'name 1' },
      '2': { name: 'name 2' },
    })
  })
})

describe('reducePrices', () => {
  it('should return record of prices with periodicityPaymentCode as key', () => {
    const result = reducePrices([
      {
        periodicityPaymentCode: 'MONTHLY',
        price: '2.00',
        taxes: '0.50',
        totalPrice: '2.50',
      },
      {
        periodicityPaymentCode: 'ANNUAL',
        price: '3.00',
        taxes: '0.75',
        totalPrice: '3.75',
      },
    ])

    expect(result).toEqual({
      MONTHLY: {
        price: '2.00',
        taxes: '0.50',
        totalPrice: '2.50',
      },
      ANNUAL: {
        price: '3.00',
        taxes: '0.75',
        totalPrice: '3.75',
      },
    })
  })
})

describe('reducePaymentMethodsOptions', () => {
  it('should reduce record of payment method options with code as key', () => {
    const result = reducePaymentMethodsOptions([
      {
        code: 'BANK_ACCOUNT',
        description: 'Bank account',
        name: 'Bank account',
        order: 1,
        embebedProductRuleId: '1',
      },
    ])

    expect(result).toEqual({
      BANK_ACCOUNT: {
        description: 'Bank account',
        name: 'Bank account',
        order: 1,
      },
    })
  })
})

describe('reducePaymentPeriodicityOptions', () => {
  it('should return record of periodicity options with code as key', () => {
    const result = reducePaymentPeriodicityOptions(
      [
        {
          code: 'MONTHLY',
          description: 'Monthly',
          factor: 1,
          name: 'Monthly',
          order: 1,
          embebedProductRuleId: '1',
        },
        {
          code: 'ANNUAL',
          description: 'Annual',
          factor: 12,
          name: 'Annual',
          order: 2,
          embebedProductRuleId: '1',
        },
      ],
      {
        MONTHLY: {
          price: '2.00',
          taxes: '0.50',
          totalPrice: '2.50',
        },
        ANNUAL: {
          price: '3.00',
          taxes: '0.75',
          totalPrice: '3.75',
        },
      }
    )

    expect(result).toEqual({
      MONTHLY: {
        description: 'Monthly',
        factor: 1,
        name: 'Monthly',
        order: 1,
        price: '2.00',
        taxes: '0.50',
        totalPrice: '2.50',
      },
      ANNUAL: {
        description: 'Annual',
        factor: 12,
        name: 'Annual',
        order: 2,
        price: '3.00',
        taxes: '0.75',
        totalPrice: '3.75',
      },
    })
  })
})

describe('reducePlanCoverages', () => {
  it('should return record of plan coverages with code as key', () => {
    const result = reducePlanCoverages(
      [
        {
          coverageId: 'coverageId-1',
          maxAmount: '1000.00',
          minAmount: '100.00',
          maxEvents: 1,
          minEvents: 1,
        },
      ],
      {
        'coverageId-1': {
          code: 'COBE001',
          name: 'name 1',
          isActive: true,
          limitEventMax: 1,
          limitEventMin: 1,
          limitValueMax: 1000,
          limitValueMin: 100,
        },
      }
    )

    expect(result).toEqual({
      COBE001: {
        coverageLimit: {
          maxAmount: '1000.00',
          minAmount: '100.00',
          maxEvents: 1,
          minEvents: 1,
        },
        isActive: true,
        limitEventMax: 1,
        limitEventMin: 1,
        limitValueMax: 1000,
        limitValueMin: 100,
        name: 'name 1',
      },
    })
  })
})

describe('mapperPlan', () => {
  it('should return new object plan with code, name, coverages record, periodicityOptions record, and paymentMethodOptions record', () => {
    const result = mapperPlan(
      {
        code: 'PLAN004',
        name: 'name 4',
        coverageLimits: [
          {
            coverageId: 'coverageId-312',
            maxAmount: '100.00',
            minAmount: '10.00',
            maxEvents: 2,
            minEvents: 2,
          },
        ],
        prices: [
          {
            periodicityPaymentCode: 'MONTHLY',
            price: '2.45',
            taxes: '0.40',
            totalPrice: '4.85',
          },
        ],
      },
      {
        'coverageId-312': {
          code: 'COBE020',
          name: 'name 1',
          isActive: true,
          limitEventMax: 2,
          limitEventMin: 2,
          limitValueMax: 100,
          limitValueMin: 10,
        },
      },
      {
        BANK_ACCOUNT: {
          description: 'Bank account',
          name: 'Bank account',
          order: 3,
        },
      },
      [
        {
          code: 'MONTHLY',
          description: 'Monthly',
          factor: 12,
          name: 'Monthly',
          order: 2,
          embebedProductRuleId: '3',
        },
      ]
    )

    expect(result).toEqual({
      code: 'PLAN004',
      coverages: {
        COBE020: {
          coverageLimit: {
            maxAmount: '100.00',
            maxEvents: 2,
            minAmount: '10.00',
            minEvents: 2,
          },
          isActive: true,
          limitEventMax: 2,
          limitEventMin: 2,
          limitValueMax: 100,
          limitValueMin: 10,
          name: 'name 1',
        },
      },
      name: 'name 4',
      paymentMethodOptions: {
        BANK_ACCOUNT: {
          description: 'Bank account',
          name: 'Bank account',
          order: 3,
        },
      },
      periodicityOptions: {
        MONTHLY: {
          description: 'Monthly',
          factor: 12,
          name: 'Monthly',
          order: 2,
          price: '2.45',
          taxes: '0.40',
          totalPrice: '4.85',
        },
      },
    })
  })
})

describe('mapperProduct', () => {
  it('should return new object with code, name, coverages record, benefits record, assistances record, and exclusions record', () => {
    const result = mapperProduct({
      code: 'PROD001',
      name: 'name 1',
      assistances: [],
      benefits: [],
      coverages: [
        {
          id: 'coverageId-1',
          code: 'COBE001',
          name: 'name 1',
          isActive: true,
          limitEventMax: 1,
          limitEventMin: 1,
          limitValueMax: 1000,
          limitValueMin: 100,
        },
      ],
      deductibles: [],
      exclusions: [],
      isActive: true,
      requirements: [],
    })

    expect(result).toEqual({
      code: 'PROD001',
      name: 'name 1',
      coverages: {
        COBE001: {
          id: 'coverageId-1',
          isActive: true,
          limitEventMax: 1,
          limitEventMin: 1,
          limitValueMax: 1000,
          limitValueMin: 100,
          name: 'name 1',
        },
      },
      benefits: {},
      assistances: {},
      exclusions: {},
    })
  })
})

describe('reducePlans', () => {
  it('should return record of mapperPlan with code as key', () => {
    const result = reducePlans(
      [
        {
          code: 'PLAN001',
          name: 'name 1',
          coverageLimits: [
            {
              coverageId: 'coverageId-1',
              maxAmount: '1000.00',
              minAmount: '100.00',
              maxEvents: 1,
              minEvents: 1,
            },
          ],
          prices: [
            {
              periodicityPaymentCode: 'MONTHLY',
              price: '2.00',
              taxes: '0.50',
              totalPrice: '2.50',
            },
          ],
        },
      ],
      {
        'coverageId-1': {
          code: 'COBE001',
          name: 'name 1',
          isActive: true,
          limitEventMax: 1,
          limitEventMin: 1,
          limitValueMax: 1000,
          limitValueMin: 100,
        },
      },
      {
        BANK_ACCOUNT: {
          description: 'Bank account',
          name: 'Bank account',
          order: 1,
        },
      },
      [
        {
          code: 'MONTHLY',
          description: 'Monthly',
          factor: 1,
          name: 'Monthly',
          order: 1,
          embebedProductRuleId: '1',
        },
      ]
    )

    expect(result).toEqual({
      PLAN001: {
        coverages: {
          COBE001: {
            coverageLimit: {
              maxAmount: '1000.00',
              maxEvents: 1,
              minAmount: '100.00',
              minEvents: 1,
            },
            isActive: true,
            limitEventMax: 1,
            limitEventMin: 1,
            limitValueMax: 1000,
            limitValueMin: 100,
            name: 'name 1',
          },
        },
        name: 'name 1',
        paymentMethodOptions: {
          BANK_ACCOUNT: {
            description: 'Bank account',
            name: 'Bank account',
            order: 1,
          },
        },
        periodicityOptions: {
          MONTHLY: {
            description: 'Monthly',
            factor: 1,
            name: 'Monthly',
            order: 1,
            price: '2.00',
            taxes: '0.50',
            totalPrice: '2.50',
          },
        },
      },
    })
  })
})

// todo esto aun debe ser implementado
describe('reduceAccounts', () => {
  it("should return ''", () => {
    //const result = reduceAccounts()
    const result = () => {
      return 'value1'
    }

    expect(result).toEqual('value')
  })
})

// todo esto aun debe ser implementado
describe('reduceOffer', () => {
  it("should return ''", () => {
    //const result = reduceOffer()
    const result = () => {
      return 'value1'
    }

    expect(result).toEqual('value')
  })
})
