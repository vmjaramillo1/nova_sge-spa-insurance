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

  const previousProducts = offerProductCodes.previousProducts
  const previousCodes = Array.from(
    new Set(offerProductCodes.previousProducts.map((item) => item.productCode))
  )

  const previousByProductCode = previousProducts.reduce<
    Record<string, typeof previousProducts[number]>
  >((acc, item) => {
    acc[item.productCode] = item
    return acc
  }, {})

  return {
    offerableProducts,
    offerableProductsCodes,
    previousProduct: previousByProductCode,
    previousProductCodes: previousCodes,
  }
}

export default useProducts
