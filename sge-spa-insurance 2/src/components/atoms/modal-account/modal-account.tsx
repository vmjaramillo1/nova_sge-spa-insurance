import { FC } from 'react'
import Typography from '../typography/typography'
import clsx from 'clsx'
import './modal-account.scss'
import AccountRow, { AccountRowProps } from '@app/components/molecules/account-row'
import React from 'react'
import Divider from '@app/components/atoms/divider/divider'
import useModalAccount from './use-modal-account'
import { PAYMENT_METHODS } from '@app/utils/constants'
import { TextWhitAria } from '@app/store/hooks/use-generic-portal-selector'

interface ModalAccountProps {
  content: {
    title: TextWhitAria
    inputByAccount: TextWhitAria
    inputByCard: TextWhitAria
  }
  handleClose: () => void
}

const ModalAccount: FC<ModalAccountProps> = (props) => {
  const { handleClose, content } = props

  const { handleSelect, groupSelected, accountList, creditCards } = useModalAccount()

  const renderAccountItem = (
    item: Omit<AccountRowProps, 'onClick' | 'value'> & { hash: string },
    paymentMethod: string
  ) => {
    return (
      <AccountRow
        value={item.hash}
        onClick={() => {
          handleSelect(item.hash, paymentMethod)
          handleClose()
        }}
        selected={item.selected}
        label={item.label}
        description={item.description}
        amount={item.amount}
        ariaLabel={item.ariaLabel}
        groupSelected={groupSelected == paymentMethod}
        icon={item?.icon}
      />
    )
  }

  return (
    <div className="modal-account__overlay">
      <div className="modal-account__container">
        <div className="modal-account__header ">
          <Typography
            variant="body"
            className="font-semibold text-dark-gray-500"
            aria-label={content.title.aria}
          >
            {content.title.value}
          </Typography>
          <button
            onClick={handleClose}
            className={clsx('product-detail__action')}
            type="button"
            aria-label={'Cerrar'}
          >
            <pichincha-icon
              size="24px"
              type="--outlined"
              color="darkGrey"
              weight_color="400"
              aria-hidden="true"
            >
              close
            </pichincha-icon>
          </button>
        </div>

        <div className="modal-account__content">
          {creditCards.length > 0 && (
            <>
              <Typography
                variant="body"
                className="mt-16 mb-24"
                aria-label={content.inputByCard.aria}
              >
                {content.inputByCard.value}
              </Typography>

              {creditCards.map((item, index) => (
                <React.Fragment key={item.hash}>
                  {renderAccountItem(item, PAYMENT_METHODS.CREDIT_CARD)}
                  {creditCards.length > 1 && index < creditCards.length - 1 && (
                    <Divider />
                  )}
                </React.Fragment>
              ))}
            </>
          )}

          {accountList.length > 0 && (
            <>
              <Typography
                variant="body"
                className="mt-16 mb-24"
                aria-label={content.inputByAccount.aria}
              >
                {content.inputByAccount.value}
              </Typography>

              {accountList.map((item, index) => (
                <React.Fragment key={item.hash}>
                  {renderAccountItem(item, PAYMENT_METHODS.ACCOUNT)}
                  {accountList.length > 1 && index < accountList.length - 1 && (
                    <Divider />
                  )}
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModalAccount
