import usePortalHubSelector from '@app/store/hooks/use-portal-hub-selector'
import useProducts from '@app/store/hooks/use-products'
import { type ProductCardProps } from '@app/components/atoms/product-card/product-card.interface'
import { mapperRouts } from '@app/routes/config'
import useBackButton from '@app/hooks/use-back-button/use-back-button'
import { TrackingEvents, backHomeWithTracking } from '@app/utils/messages'

function useInsurancePage() {
  const [, content] = usePortalHubSelector((portal) => portal.content.home)
  const { offerableProductsCodes } = useProducts()

  //  todo validar traking
  useBackButton(backHomeWithTracking(TrackingEvents.IN_PROGRESS_CLICK_BUTTON_BACK))

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
        action: {
          ...item.action,
          urlTarget: mapperRouts(item.action.urlTarget),
        },
        code,
      })
    }
    return acc
  }, [] as ProductCardProps[])

  return {
    heroContent,
    productCards,
  }
}

export default useInsurancePage
