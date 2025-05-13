import usePortalHubSelector from '@app/store/hooks/use-portal-hub-selector'
import useProducts from '@app/store/hooks/use-products'
import { type ProductCardProps } from '@app/components/atoms/product-card/product-card.interface'

function useInsurancePage() {
  const [_, content] = usePortalHubSelector((portal) => portal.content.home)

  const { offerableProductsCodes } = useProducts()

  const heroContent = {
    title: content.sectionHero.title,
  }

  const productCards = offerableProductsCodes.reduce((acc, code) => {
    const item = content.sectionProducts.cards[code]
    if (item) {
      acc.push({
        title: item.title,
        description: item.description,
        paymentType: item.paymentType,
        price: item.price,
        coverages: item.coverages as ProductCardProps['coverages'],
        action: item.action,
        code,
      })
    }
    return acc
  }, [] as ProductCardProps[])

  // debugger

  return {
    heroContent,
    productCards,
  }
}

export default useInsurancePage
