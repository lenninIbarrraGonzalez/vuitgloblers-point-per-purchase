import React from "react"
import { useProduct } from "vtex.product-context"


const PointsappInfo = () =>  {
  const productContextValue = useProduct();
  let sellingPrice =  productContextValue.product.priceRange.sellingPrice.highPrice
  sellingPrice = parseInt(sellingPrice, 10);

  let basePoint = parseInt("500",10)
  let quantityPoint = parseInt("2",10)

  let numberPoint = Math.floor((sellingPrice/basePoint))
  numberPoint = numberPoint * quantityPoint

  return <>
  {/* <pre>{JSON.stringify(productContextValue, null, 4)}</pre> */}
  <pre>Te puedes ganar {numberPoint} puntos con esta compra</pre>
  </>

}

export default PointsappInfo
