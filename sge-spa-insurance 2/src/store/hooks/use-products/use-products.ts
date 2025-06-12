import useAppSelector from '@app/hooks/use-app-selector'
import {
  selectorProducts,
  selectorOfferProducts,
} from '@app/store/selectors/selectors'

const useProducts = () => {
  const products = useAppSelector(selectorProducts)
  const offerProductCodes = useAppSelector(selectorOfferProducts)

  const offerableCodes = offerProductCodes.offerableProducts.reduce<string[]>(
    (acc, item) => [...acc, item.productCode],
    []
  )

  const offerableProducts = Object.fromEntries(
    Object.entries(products).filter(([, product]) =>
      offerableCodes.includes(product.code)
    )
  )

  const offerableProductsCodes = Object.keys(offerableProducts)

  const previousProduct = Object.fromEntries(
    Object.entries(products).filter(
      ([, product]) => !offerableCodes.includes(product.code)
    )
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
