import AccountCard from '@app/components/molecules/account-card'
import useSelectAccountPage from './use-select-account-page'
import './select-account-page.scss'

const SelectAccountPage = () => {
  const { accounts, accountHashSelected, handleSelect } = useSelectAccountPage()

  return (
    <div className="select-account">
      <div className="select-account__content">
        {accounts.map((account) => (
          <AccountCard
            key={account.hash}
            value={account.hash}
            onClick={handleSelect}
            selected={accountHashSelected === account.hash}
            label={account.label}
            description={account.description}
            amount={account.value}
            ariaLabel={account.ariaLabel}
          />
        ))}
      </div>
    </div>
  )
}

export default SelectAccountPage
