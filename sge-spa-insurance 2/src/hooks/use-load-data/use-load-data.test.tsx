import { renderHook, screen, waitFor } from '@testing-library/react'
import { Route } from 'react-router-dom'

import { createWrapper } from '@app/__test__/wrappers'
import { APP_ROUTES } from '@app/routes/config'

import useLoadData from './use-load-data'
import InsuranceService from '@app/services/insurance/insurance.service'

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

describe('useLoadData', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should navigate to hub product home if service returns ok', async () => {
    const validateSpy = jest
      .spyOn(InsuranceService, 'validateOffer')
      .mockReturnValue(
        Promise.resolve({
          code: '0',
          message: 'Ok',
          value: {
            key: 'key',
            transactionReference: 'transactionReference',
          },
        })
      )

    jest.spyOn(InsuranceService, 'findOffer').mockReturnValue(
      Promise.resolve({
        code: '0',
        message: 'Ok',
        accounts: [
          {
            alias: 'alias',
            balance: 0,
            favorite: true,
            hash: 'hash',
            mask: 'mask',
            type: 'SAVINGS_ACCOUNT',
            value: 'value',
          },
        ],
        lopdp: {
          acceptedTermsConditions: true,
          hasConsent: true,
          url: 'url',
        },
        odds: [
          {
            type: 1,
            data: [
              {
                code: 'code',
                channelCode: 'channelCode',
                channelProductCode: 'channelProductCode',
                insuranceName: 'insuranceName',
                paymentMethodOptions: [],
                paymentPeriodicityOptions: [],
                planCode: 'planCode',
                plans: [],
                portal: {
                  code: 'code',
                  isActive: true,
                  sections: [],
                },
                product: {
                  code: 'code',
                  assistances: [],
                  benefits: [],
                  coverages: [],
                  deductibles: [],
                  exclusions: [],
                  isActive: true,
                  name: 'name',
                  requirements: [],
                },
                productCode: 'productCode',
                sale: null,
                wayCode: 'wayCode',
              },
            ],
          },
        ],
      })
    )

    const wrapper = createWrapper(
      {
        global: {
          authEvent: { ...identityEvent },
        },
      },
      {
        routes: (
          <>
            <Route path={APP_ROUTES.INSURANCE_PORTAL} element={<>HubHomePage</>} />
          </>
        ),
      }
    )

    renderHook(() => useLoadData(), { wrapper })

    await waitFor(() => {
      expect(screen.getByText('HubHomePage')).toBeInTheDocument()
    })

    validateSpy.mockRestore()
  })

  it('should navigate to error page if service returns error', async () => {
    const wrapper = createWrapper(
      {
        global: {
          authEvent: { ...identityEvent },
        },
      },
      {
        routes: (
          <>
            <Route path={APP_ROUTES.INSURANCE_PORTAL} element={<>HubHomePage</>} />
            <Route path={APP_ROUTES.GENERAL_ERROR} element={<>UnexpectedError</>} />
          </>
        ),
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
