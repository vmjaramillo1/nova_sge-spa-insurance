import useAppSelector from '@app/hooks/use-app-selector'
import { selectorProducts } from '@app/store/selectors/selectors'

const useProducts = () => {
  const products = useAppSelector(selectorProducts)

  const offerableProducts = Object.fromEntries(
    Object.entries(products).filter(([_, product]) => product.hasOffer)
  )

  const offerableProductsCodes = Object.keys(offerableProducts)

  const previousProduct = Object.fromEntries(
    Object.entries(products).filter(([_, product]) => !product.hasOffer)
  )

  const previousProductCodes = Object.keys(previousProduct)

  return {
    offerableProducts,
    offerableProductsCodes,
    previousProduct,
    previousProductCodes,
  }
}

export default useProducts
