export const flowValues = Object.freeze({
  planSelected: 'plan1',
  periodicitySelected: 'monthly',
})

export const appValues = Object.freeze({
  plans: {
    plan1: {
      name: 'Plan 1',
      coverages: {},
      paymentMethodOptions: {},
      periodicityOptions: {
        monthly: {
          name: 'Mensual',
          description: 'Mensual',
          factor: 1,
          order: 1,
          totalPrice: '100',
          price: '100',
          taxes: '0',
        },
      },
    },
  },
})
