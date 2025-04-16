import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import Typography from '@app/components/atoms/typography'

import useApp from '@app/context/app-context/use-app'
import useFlow from '@app/context/flow-context/use-flow'
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

const useSelectAccountPage = () => {
  const {
    accounts: sourceAccounts,
    portal: { selectAccount },
  } = useApp<DefaultPortal>()

  const navigate = useNavigate()

  const { accountHashSelected, dispatchSelectedAccount } = useFlow()

  const handleSelect = (_event: unknown, code: string) => {
    dispatchSelectedAccount(code)
    navigate(APP_ROUTES.PRODUCT)
  }

  useBackButton(() => {
    pushTrackEvent(TrackingEvents.SELECT_ACCOUNT_BUTTON_BACK)
    navigate(APP_ROUTES.PRODUCT)
  })

  usePageTrackingEvent(TrackingEvents.SELECT_ACCOUNT_VIEW_PAGE)

  const accounts = useMemo(() => {
    return sourceAccounts.map((account) => {
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
