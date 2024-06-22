import React from "react"
import PropTypes from "prop-types"
import { useProduct } from "vtex.product-context"

type Props = {
  basePoint : number,
  quantityPoint: number

}

const PointsappInfo = ({basePoint, quantityPoint}: Props) =>  {
  const productContextValue = useProduct();
  let sellingPrice =  productContextValue.product.priceRange.sellingPrice.highPrice
  sellingPrice = parseInt(sellingPrice, 10);

  console.log(basePoint,quantityPoint);

  // let basePoint = parseInt("500",10)
  // let quantityPoint = parseInt("2",10)

  let numberPoint = Math.floor((sellingPrice/basePoint))
  numberPoint = numberPoint * quantityPoint

  return <>
  {/* <pre>{JSON.stringify(productContextValue, null, 4)}</pre> */}
  {/* <pre>Te puedes ganar {numberPoint} puntos con esta compra</pre> */}
  <pre>Te puedes ganar {numberPoint} puntos con esta compra</pre>
  <p>{basePoint}</p>
  <p>{quantityPoint}</p>
  </>

}

PointsappInfo.propTypes = {
  basePoint: PropTypes.number.isRequired,
  quantityPoint: PropTypes.number.isRequired
}

PointsappInfo.defaultProps = {
  basePoint: 500,
  quantityPoint: 1

}
export default PointsappInfo
