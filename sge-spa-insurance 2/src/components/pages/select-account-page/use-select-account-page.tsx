import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import Typography from '@app/components/atoms/typography'

import useBackButton from '@app/hooks/use-back-button'
import usePageTrackingEvent from '@app/hooks/use-page-tracking-event'

import { APP_ROUTES } from '@app/routes/config'

import {
  ACCOUNT_FORMATS,
  getAriaAccountMoney,
  getAriaAccountNumber,
} from '@app/utils'
import { formatMoney } from '@app/utils/format'
import { DefaultPortal } from '@app/utils/interfaces'
import { TrackingEvents, pushTrackEvent } from '@app/utils/messages'

import useAppSelector from '@app/hooks/use-app-selector'

import { setSelectedAccount } from '@app/store/reducers/flow-slice'

import {
  selectorAccountHashSelected,
  selectorAccounts,
  selectorPortal,
} from '@app/store/selectors/selectors'
import useAppDispatch from '@app/hooks/use-app-dispatch'

const useSelectAccountPage = () => {
  const sourceAccounts = useAppSelector(selectorAccounts)
  const { selectAccount } = useAppSelector(selectorPortal) as {
    selectAccount: DefaultPortal['selectAccount']
  }

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const accountHashSelected = useAppSelector(selectorAccountHashSelected)

  const handleSelect = (_event: unknown, code: string) => {
    dispatch(setSelectedAccount(code))
    navigate(APP_ROUTES.PRODUCT)
  }

  useBackButton(() => {
    pushTrackEvent(TrackingEvents.SELECT_ACCOUNT_BUTTON_BACK)
    navigate(APP_ROUTES.PRODUCT)
  })

  usePageTrackingEvent(TrackingEvents.SELECT_ACCOUNT_VIEW_PAGE)

  const accounts = useMemo(() => {
    const hashAccountList = Object.keys(sourceAccounts)

    return hashAccountList.map((hashAccount) => {
      const account = sourceAccounts[hashAccount]

      const format = ACCOUNT_FORMATS[account.type] || ACCOUNT_FORMATS.DEFAULT

      const ariaLastNumbers = getAriaAccountNumber(account.mask)
      const ariaBalance = getAriaAccountMoney(account.balance)

      const ariaResult = `${format.type}, saldo disponible de ${ariaBalance}, Número de cuenta termina en ${ariaLastNumbers}`

      return {
        ...account,
        label: account.alias ?? format.label,
        description: (
          <Typography
            variant="caption"
            className="font-medium text-dark-gray-400"
            as="span"
          >
            {account.mask}
          </Typography>
        ),
        value: formatMoney(account.balance.toString()),
        ariaLabel: ariaResult,
      }
    })
  }, [sourceAccounts])

  return {
    accounts,
    accountHashSelected,
    content: selectAccount,
    handleSelect,
  }
}

export default useSelectAccountPage
