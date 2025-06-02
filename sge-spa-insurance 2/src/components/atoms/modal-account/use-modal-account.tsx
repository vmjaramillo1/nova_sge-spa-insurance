import { ReactNode } from 'react'
import { CARD_BRANDS } from '@app/utils/constants'
import MasterCard from '@app/components/icons/MasterCard'
import VisaIcon from '@app/components/icons/VisaIcon'
import { useState } from 'react'
import useAppDispatch from '@app/hooks/use-app-dispatch'
import { setSelectedAccount } from '@app/store/reducers/flow-slice'
import useAppSelector from '@app/hooks/use-app-selector'
import { selectorAccountHashSelected } from '@app/store/selectors/selectors'
import { selectorAccounts } from '@app/store/selectors/selectors'
import { useMemo } from 'react'
import {
  ACCOUNT_FORMATS,
  getAriaAccountMoney,
  getAriaAccountNumber,
} from '@app/utils'
import { PAYMENT_METHODS } from '@app/utils/constants'

import { formatMoney } from '@app/utils/format'

const useModalAccount = () => {
  const dispatch = useAppDispatch()

  const sourceAccounts = useAppSelector(selectorAccounts)
  const accountSelected = useAppSelector(selectorAccountHashSelected)

  const [groupSelected, setGroupSelected] = useState('')
  const [selectedAccountState, setSelectedAccountState] = useState('')

  const MAPPER_CARD: Record<string, ReactNode> = {
    [CARD_BRANDS.VISA]: <VisaIcon />,
    [CARD_BRANDS.MASTERCARD]: <MasterCard />,
    UNKNOWN: null,
  }

  const { accountList, creditCards } = useMemo(() => {
    const hashAccountList = Object.keys(sourceAccounts)

    const allAccounts = hashAccountList.map((hashAccount) => {
      const account = sourceAccounts[hashAccount]

      const format = ACCOUNT_FORMATS[account.type] || ACCOUNT_FORMATS.DEFAULT
      const ariaLastNumbers = getAriaAccountNumber(account.mask)
      const ariaBalance = getAriaAccountMoney(account.balance)
      const ariaResult = `${format.type}, saldo disponible de ${ariaBalance}, Número de cuenta termina en ${ariaLastNumbers}`

      const brand = getCreditCardBrand(account.mask)
      const iconAccount = MAPPER_CARD[brand]

      if (accountSelected === account.hash) {
        setSelectedAccountState(account.hash)
        setGroupSelected(PAYMENT_METHODS.ACCOUNT)
      }

      const elementType = iconAccount
        ? PAYMENT_METHODS.CREDIT_CARD
        : PAYMENT_METHODS.ACCOUNT

      return {
        hash: account.hash,
        label: account.type,
        description: account.mask,
        amount: formatMoney(account.balance.toString()),
        ariaLabel: ariaResult,
        disabled: false,
        selected: accountSelected === account.hash,
        icon: iconAccount,
        type: elementType, // account.type, // necesario para filtrar
      }
    })

    const accountList = allAccounts.filter((a) => a.type === PAYMENT_METHODS.ACCOUNT)
    const creditCards = allAccounts.filter(
      (a) => a.type === PAYMENT_METHODS.CREDIT_CARD
    )
    return { accountList, creditCards }
  }, [sourceAccounts, accountSelected])


  const handleSelect = (code: string, paymentMethod: string) => {
    dispatch(setSelectedAccount(code))
    setSelectedAccountState(code)
    setGroupSelected(paymentMethod)
  }

  function getCreditCardBrand(value: string) {
    const numberToValidate = value.replaceAll(' ', '')

    const masterCardPattern =
      /^(?:5[1-5]\d{2}|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)\d{12}$/
    const visaPattern = /^4\d{12}(?:\d{3})?$/
    const sameNumbersPattern = /^(\d)\1*$/

    if (sameNumbersPattern.test(numberToValidate)) return CARD_BRANDS.UNKNOWN
    if (visaPattern.test(numberToValidate)) return CARD_BRANDS.VISA
    if (masterCardPattern.test(numberToValidate)) return CARD_BRANDS.MASTERCARD

    return CARD_BRANDS.UNKNOWN
  }

  return {
    handleSelect,
    groupSelected,
    accountList,
    creditCards,
    getCreditCardBrand,
    selectedAccountState,
  }
}

export default useModalAccount
