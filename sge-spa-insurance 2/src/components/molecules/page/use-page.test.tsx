import { renderHook } from '@testing-library/react'
import usePage from './use-page'
import { FlowStatus, RoutesHubAlias, RoutesSharedAlias } from '@app/utils/enums'
import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { globalValues, appValues } from '@app/__test__/values'
import { useOutletContext } from 'react-router-dom'

jest.mock('@pichincha/events-microsite')

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
}))

describe('usePage', () => {
  it('should return defaults', () => {
    ;(useOutletContext as jest.Mock).mockReturnValue({
      isLoading: false,
      changeTitle: jest.fn(),
    })

    const store = makeStore({
      app: appValues,
      flow: {
        shared: {
          productCode: 'TU_BAN_PRO',
          accountHashSelected:
            '42e976aea883be9ad3b29487ab3d1a64778bdbfbac9d02f30941d30600b76585',
          planSelected: 'TU_BAN_PRO_2',
          periodicitySelected: 'MONTHLY',
          transactionReference: '60547864-a16d-4571-9771-25d0f98ffc11',
          key: 'aUYg77Dfr/mA8NhDEHfVRbksKZjbdPnuV3ARE29k3vCL2/dnEgSBJl1xbo/Dey3t5LXDvGIRgV7QUAvEacJSHKqyrns3ej5fFPxl59bAxPBTM4cONP2NyRJKomx9RmLA9QOv9x4=',
          contentLoaded: true,
          status: FlowStatus.NORMAL,
          step: RoutesSharedAlias.PRODUCT_DETAIL,
        },
      },
      global: globalValues,
    })

    const { result } = renderHook(() => usePage('my title'), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current).toEqual({
      isLoading: false,
      isEndSuccess: false,
      isEndRetryError: false,
      isEndError: false,
      step: 'PRODUCT_DETAIL',
    })
  })

  it('should call changeTitle with flowConfigStep', () => {
    const changeTitle = jest.fn()
    ;(useOutletContext as jest.Mock).mockReturnValue({
      isLoading: false,
      changeTitle: changeTitle,
    })

    const store = makeStore({
      app: appValues,
      flow: {
        shared: {
          productCode: 'TU_BAN_PRO',
          accountHashSelected:
            '42e976aea883be9ad3b29487ab3d1a64778bdbfbac9d02f30941d30600b76585',
          planSelected: 'TU_BAN_PRO_2',
          periodicitySelected: 'MONTHLY',
          transactionReference: '60547864-a16d-4571-9771-25d0f98ffc11',
          key: 'aUYg77Dfr/mA8NhDEHfVRbksKZjbdPnuV3ARE29k3vCL2/dnEgSBJl1xbo/Dey3t5LXDvGIRgV7QUAvEacJSHKqyrns3ej5fFPxl59bAxPBTM4cONP2NyRJKomx9RmLA9QOv9x4=',
          contentLoaded: true,
          status: FlowStatus.NORMAL,
          step: RoutesSharedAlias.PRODUCT_DETAIL,
        },
        client: {
          address: 'CALLE FALSA 123 Y REFERENCIA PERDIDA',
          cellPhone: '0933889966',
          city: 'CALVAS',
          province: 'LOJA',
          civilStatus: 'S',
          dateBirth: '25/12/2005',
          email: 'mail@mail.com',
          firstLastName: 'PEREZ',
          firstName: 'MARIA',
          gender: 'F',
          homePhone: '022987456',
          identification: '1100225588',
          identificationType: 'C',
          identificationByChannel: '1236548',
          income: '2000',
          ipClient: '168.192.1.1',
          patrimony: '50000',
          secondLastName: 'LOPEZ',
          secondName: 'MERCEDES',
          economicActivity: '17000',
          economicSubActivity: '17532',
          segment: 'PERSONAS',
          subSegment: 'CONSUMO',
          workPhone: '022589652',
          legalName: 'INDUSTRIA DE CONFECCIONES INZATEX CIA. LTDA.',
          businessName: 'CONFECCIONES INZATEX',
          companyPurpose: 'INDUSTRIA DE TEXTILES',
          nationality: 'ECUADOR',
          birthPlace: 'ECUADOR/PICHINCHA/QUITO',
          employmentSituation: 'DEPENDENT',
        },
      },
      global: globalValues,
    })

    renderHook(() => usePage('Seguro por Robos y Fraudes'), {
      wrapper: createWrapperStore(store),
    })
    expect(changeTitle).toHaveBeenCalledWith('Seguro por Robos y Fraudes')
  })

  it('should call changeTitle', () => {
    const changeTitle = jest.fn()
    ;(useOutletContext as jest.Mock).mockReturnValue({
      isLoading: false,
      changeTitle: changeTitle,
    })

    const store = makeStore({
      app: appValues,
      flow: {
        shared: {
          productCode: 'TU_BAN_PRO',
          accountHashSelected:
            '42e976aea883be9ad3b29487ab3d1a64778bdbfbac9d02f30941d30600b76585',
          planSelected: 'TU_BAN_PRO_2',
          periodicitySelected: 'MONTHLY',
          transactionReference: '60547864-a16d-4571-9771-25d0f98ffc11',
          key: 'aUYg77Dfr/mA8NhDEHfVRbksKZjbdPnuV3ARE29k3vCL2/dnEgSBJl1xbo/Dey3t5LXDvGIRgV7QUAvEacJSHKqyrns3ej5fFPxl59bAxPBTM4cONP2NyRJKomx9RmLA9QOv9x4=',
          contentLoaded: true,
          status: FlowStatus.NORMAL,
          step: 'N/A',
        },
        client: {
          address: 'CALLE FALSA 123 Y REFERENCIA PERDIDA',
          cellPhone: '0933889966',
          city: 'CALVAS',
          province: 'LOJA',
          civilStatus: 'S',
          dateBirth: '25/12/2005',
          email: 'mail@mail.com',
          firstLastName: 'PEREZ',
          firstName: 'MARIA',
          gender: 'F',
          homePhone: '022987456',
          identification: '1100225588',
          identificationType: 'C',
          identificationByChannel: '1236548',
          income: '2000',
          ipClient: '168.192.1.1',
          patrimony: '50000',
          secondLastName: 'LOPEZ',
          secondName: 'MERCEDES',
          economicActivity: '17000',
          economicSubActivity: '17532',
          segment: 'PERSONAS',
          subSegment: 'CONSUMO',
          workPhone: '022589652',
          legalName: 'INDUSTRIA DE CONFECCIONES INZATEX CIA. LTDA.',
          businessName: 'CONFECCIONES INZATEX',
          companyPurpose: 'INDUSTRIA DE TEXTILES',
          nationality: 'ECUADOR',
          birthPlace: 'ECUADOR/PICHINCHA/QUITO',
          employmentSituation: 'DEPENDENT',
        },
      },
      global: globalValues,
    })

    renderHook(() => usePage('my title'), {
      wrapper: createWrapperStore(store),
    })
    expect(changeTitle).toHaveBeenCalledWith('my title')
  })

  it('should return isEndSuccess true', () => {
    const changeTitle = jest.fn()
    ;(useOutletContext as jest.Mock).mockReturnValue({
      isLoading: false,
      changeTitle: changeTitle,
    })

    const store = makeStore({
      app: appValues,
      flow: {
        shared: {
          productCode: 'TU_BAN_PRO',
          accountHashSelected:
            '42e976aea883be9ad3b29487ab3d1a64778bdbfbac9d02f30941d30600b76585',
          planSelected: 'TU_BAN_PRO_2',
          periodicitySelected: 'MONTHLY',
          transactionReference: '60547864-a16d-4571-9771-25d0f98ffc11',
          key: 'aUYg77Dfr/mA8NhDEHfVRbksKZjbdPnuV3ARE29k3vCL2/dnEgSBJl1xbo/Dey3t5LXDvGIRgV7QUAvEacJSHKqyrns3ej5fFPxl59bAxPBTM4cONP2NyRJKomx9RmLA9QOv9x4=',
          contentLoaded: true,
          status: FlowStatus.END_SUCCESS,
          step: RoutesSharedAlias.SUCCESS,
        },
      },
      global: globalValues,
    })

    const { result } = renderHook(() => usePage('my title'), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current.isEndSuccess).toBe(true)
  })

  it('should return isEndRetryError true', () => {
    const changeTitle = jest.fn()
    ;(useOutletContext as jest.Mock).mockReturnValue({
      isLoading: false,
      changeTitle: changeTitle,
    })

    const store = makeStore({
      app: appValues,
      flow: {
        shared: {
          productCode: 'TU_BAN_PRO',
          accountHashSelected:
            '42e976aea883be9ad3b29487ab3d1a64778bdbfbac9d02f30941d30600b76585',
          planSelected: 'TU_BAN_PRO_2',
          periodicitySelected: 'MONTHLY',
          transactionReference: '60547864-a16d-4571-9771-25d0f98ffc11',
          key: 'aUYg77Dfr/mA8NhDEHfVRbksKZjbdPnuV3ARE29k3vCL2/dnEgSBJl1xbo/Dey3t5LXDvGIRgV7QUAvEacJSHKqyrns3ej5fFPxl59bAxPBTM4cONP2NyRJKomx9RmLA9QOv9x4=',
          contentLoaded: true,
          status: FlowStatus.RETRY_ACCEPTANCE_ERROR,
          step: RoutesHubAlias.RETRY_ACCEPTANCE,
        },
      },
      global: globalValues,
    })

    const { result } = renderHook(() => usePage('my title'), {
      wrapper: createWrapperStore(store),
    })
    expect(result.current.isEndRetryError).toBe(true)
  })

  it('should return isEndError true', () => {
    const changeTitle = jest.fn()
    ;(useOutletContext as jest.Mock).mockReturnValue({
      isLoading: false,
      changeTitle: changeTitle,
    })

    const store = makeStore({
      app: appValues,
      flow: {
        shared: {
          productCode: 'TU_BAN_PRO',
          accountHashSelected:
            '42e976aea883be9ad3b29487ab3d1a64778bdbfbac9d02f30941d30600b76585',
          planSelected: 'TU_BAN_PRO_2',
          periodicitySelected: 'MONTHLY',
          transactionReference: '60547864-a16d-4571-9771-25d0f98ffc11',
          key: 'aUYg77Dfr/mA8NhDEHfVRbksKZjbdPnuV3ARE29k3vCL2/dnEgSBJl1xbo/Dey3t5LXDvGIRgV7QUAvEacJSHKqyrns3ej5fFPxl59bAxPBTM4cONP2NyRJKomx9RmLA9QOv9x4=',
          contentLoaded: true,
          status: FlowStatus.END_ERROR,
          step: RoutesHubAlias.GENERAL_ERROR,
        },
      },
      global: globalValues,
    })

    const { result } = renderHook(() => usePage('my title'), {
      wrapper: createWrapperStore(store),
    })
    expect(result.current.isEndError).toBe(true)
  })
})
