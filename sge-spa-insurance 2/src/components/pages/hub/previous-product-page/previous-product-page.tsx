import Typography from '@app/components/atoms/typography/'
import SmartContent from '@app/components/atoms/smart-text'
import BackHomeCard from '@app/components/pages/hub/previous-product-page/back-home-card'
import PreviousProductCard from '@app/components/atoms/previous-product-card/previous-product-card'

import usePreviousProductPage from './use-previous-product-page'

const PreviousProductPage = () => {
  const { content, productSaleCards, handleNavigateProduct } =
    usePreviousProductPage()
  return (
    <div className="previous-product-page">
      <Typography
        variant="body"
        className="previous-product-page__title"
        aria-label={content.description.aria}
      >
        <SmartContent>{content.description.value}</SmartContent>
      </Typography>

      <div className="previous-product-page__content -mx-24 mt-8 p-24">
        {productSaleCards.map((card) => (
          <PreviousProductCard
            key={card.code}
            title={card.title}
            account={card.account}
            nextPayment={card.nextPayment}
            amount={card.amount}
            action={card.action}
            status={'error'}
            handleClick={() => handleNavigateProduct(card.code, card.contract)}
          />
        ))}

        <BackHomeCard
          description={content.defaultCard.description}
          action={content.defaultCard.action}
        />
      </div>
    </div>
  )
}

export default PreviousProductPage
