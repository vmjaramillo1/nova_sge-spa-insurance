import { FC, PropsWithChildren } from 'react'
import { act, renderHook } from '@testing-library/react'
import useApp from './use-app'
import AppProvider from './app-provider'
import { initialState } from './app-context'

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <AppProvider>{children}</AppProvider>
)

describe('useApp', () => {
  it('should throw without AppProvider', () => {
    let error: Error | undefined = undefined

    try {
      renderHook(() => useApp())
    } catch (err) {
      error = err as Error
    }

    expect(error).toBeDefined()
    expect(error?.message).toBe('useApp must be used within a AppProvider')
  })

  it('should return app context', () => {
    const { result } = renderHook(() => useApp(), { wrapper })

    const currentState = {
      code: result.current.code,
      name: result.current.name,
      sale: result.current.sale,
      coverages: result.current.coverages,
      benefits: result.current.benefits,
      assistances: result.current.assistances,
      exclusions: result.current.exclusions,
      insuranceName: result.current.insuranceName,
      plans: result.current.plans,
      portal: result.current.portal,
      lopdp: result.current.lopdp,
      accounts: [],
    }

    expect(currentState).toEqual(initialState)
    expect(result.current.isMultiAccount).toBe(false)
    expect(result.current.dispatchLoadValues).toBeInstanceOf(Function)
    expect(result.current.dispatch).toBeInstanceOf(Function)
  })

  it('should dispatch LoadValues', () => {
    const { result } = renderHook(() => useApp(), { wrapper })

    const coverageCOBE001 = {
      id: 'COBE001',
      name: 'name',
      isActive: true,
      limitEventMax: 0,
      limitEventMin: 0,
      limitValueMax: 0,
      limitValueMin: 0,
    }

    const benefitBENE001 = {
      name: 'name',
      description: 'description',
      isActive: true,
      priority: 1,
    }

    const assistanceASE001 = {
      name: 'name',
      description: 'description',
      isActive: true,
      priority: 1,
      maxEvents: 0,
      minEvents: 0,
    }

    const exclusionEXCL001 = {
      name: 'name',
      description: 'description',
      isActive: true,
      priority: 1,
    }

    const planPLAN001 = {
      name: 'name',
      coverages: {
        COBE001: {
          coverageLimit: {
            isActive: true,
            maxAmount: '0',
            maxEvents: 0,
            minAmount: '0',
            minEvents: 0,
          },
          limitEventMax: 0,
          limitEventMin: 0,
          limitValueMax: 0,
          limitValueMin: 0,
          name: 'name',
        },
      },
      paymentMethodOptions: {
        MONTHLY: {
          name: 'name',
          description: 'description',
          order: 1,
        },
      },
      periodicityOptions: {
        MONTHLY: {
          name: 'name',
          description: 'description',
          order: 1,
          factor: 1,
          price: '0',
          taxes: '0',
          totalPrice: '0',
        },
      },
    }

    act(() => {
      result.current.dispatchLoadValues({
        code: 'code',
        name: 'name',
        sale: null,
        coverages: { COBE001: coverageCOBE001 },
        benefits: { BENE001: benefitBENE001 },
        assistances: { ASE001: assistanceASE001 },
        exclusions: { EXCL001: exclusionEXCL001 },
        plans: { PLAN001: planPLAN001 },
        insuranceName: 'insuranceName',
        portal: 'portal',
        accounts: [
          {
            hash: '0x00',
            mask: '27XXXX57',
            type: 'AHO',
            balance: 2000,
            alias: null,
            favorite: true,
            value: 'as6d54a36sd4as5d46a',
          },
          {
            hash: '0x01',
            mask: '12XXXX12',
            type: 'CTE',
            balance: 800,
            alias: null,
            favorite: false,
            value: 'as34d1asd567as',
          },
        ],
        lopdp: {
          hasConsent: true,
          acceptedTermsConditions: true,
          url: 'url',
        },
      })
    })

    expect(result.current.code).toBe('code')
    expect(result.current.name).toBe('name')
    expect(result.current.coverages.COBE001).toEqual(coverageCOBE001)
    expect(result.current.benefits.BENE001).toEqual(benefitBENE001)
    expect(result.current.assistances.ASE001).toEqual(assistanceASE001)
    expect(result.current.exclusions.EXCL001).toEqual(exclusionEXCL001)
    expect(result.current.insuranceName).toBe('insuranceName')
    expect(result.current.plans.PLAN001).toEqual(planPLAN001)
    expect(result.current.portal).toBe('portal')
    expect(result.current.isMultiAccount).toEqual(true)
    expect(result.current.sale).toBeNull()
    expect(result.current.lopdp).toEqual({
      hasConsent: true,
      acceptedTermsConditions: true,
      url: 'url',
    })
  })

  it('should preserve state if an invalid action is passed', () => {
    const { result } = renderHook(() => useApp(), { wrapper })

    expect(result.current.isMultiAccount).toBe(false)

    const prevState = {
      code: result.current.code,
      name: result.current.name,
      coverages: result.current.coverages,
      benefits: result.current.benefits,
      assistances: result.current.assistances,
      exclusions: result.current.exclusions,
      insuranceName: result.current.insuranceName,
      plans: result.current.plans,
      portal: result.current.portal,
      accounts: [],
    }

    act(() => {
      result.current.dispatch({ type: 'RANDOM' } as never)
    })

    const newState = {
      code: result.current.code,
      name: result.current.name,
      coverages: result.current.coverages,
      benefits: result.current.benefits,
      assistances: result.current.assistances,
      exclusions: result.current.exclusions,
      insuranceName: result.current.insuranceName,
      plans: result.current.plans,
      portal: result.current.portal,
      accounts: [],
    }

    expect(result.current.isMultiAccount).toBe(false)
    expect(newState).toEqual(prevState)
  })

  it('should dispatch setLopdp', () => {
    const { result } = renderHook(() => useApp(), { wrapper })

    expect(result.current.lopdp).toEqual({
      acceptedTermsConditions: false,
      hasConsent: null,
      url: '',
    })

    act(() => {
      result.current.dispatchLopdp({
        hasConsent: true,
        acceptedTermsConditions: true,
        url: 'https://lopdp.com',
      })
    })

    expect(result.current.lopdp).toEqual({
      hasConsent: true,
      acceptedTermsConditions: true,
      url: 'https://lopdp.com',
    })
  })
})
