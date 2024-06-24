import React from "react"
import PropTypes from "prop-types"
import { useProduct } from "vtex.product-context"

type Props = {
  basePoint : number,
  quantityPoint: number

}

const PointsappInfo = ({basePoint, quantityPoint}: Props) =>  {
  const productContextValue = useProduct();
  console.log("productContextValue",productContextValue);

  let sellingPrice =  productContextValue.selectedItem.sellers[0].commertialOffer.Price

  sellingPrice = parseInt(sellingPrice, 10);

  console.log("basePoint", basePoint);
  console.log("quantityPoint", quantityPoint);
  console.log("sellingPrice",sellingPrice);



  let numberPoint = Math.floor((sellingPrice/basePoint))
  numberPoint = numberPoint * quantityPoint

  return (
          <div>
            {(numberPoint > 0)
            ? <pre>Te puedes ganar {numberPoint} puntos con esta compra</pre>
            : <pre>Por productos superiores a {basePoint} gana puntos</pre>}
          </div>
  )
}

PointsappInfo.propTypes = {
  basePoint: PropTypes.number.isRequired,
  quantityPoint: PropTypes.number.isRequired
}

PointsappInfo.defaultProps = {
  basePoint: 500,
  quantityPoint: 1

}

PointsappInfo.schema = {
  title: "Información puntos a ganar por compra",
  type: "object",
  properties: {
    basePoint: {
      title:"base",
      description: "Esta es la base en pesos por la que se otorgara puntos",
      type:"number"
    },
    quantityPoint: {
      title:"numero de puntos",
      description: "Puntos que se otorgaran por el resultado de la compra sobre la base",
      type:"number"
    },
  }

}


export default PointsappInfo
