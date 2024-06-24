import React from "react"
import PropTypes from "prop-types"
import { useProduct } from "vtex.product-context"
import { useCssHandles } from 'vtex.css-handles'
import { FormattedPrice } from 'vtex.formatted-price'

const CSS_HANDLES = ['container'] as const

type Props = {
  basePoint : number,
  quantityPoint: number

}

const PointsappInfo = ({basePoint, quantityPoint}: Props) =>  {
  const productContextValue = useProduct();
  const handles = useCssHandles(CSS_HANDLES);
  // console.log("productContextValue",productContextValue);

  let sellingPrice =  productContextValue?.selectedItem?.sellers[0]?.commertialOffer?.Price

  sellingPrice = parseInt(sellingPrice, 10);

  // console.log("basePoint", basePoint);
  // console.log("quantityPoint", quantityPoint);
  // console.log("sellingPrice",sellingPrice);



  let numberPoint = Math.floor((sellingPrice/basePoint))
  numberPoint = numberPoint * quantityPoint

  return (
          <div className={`${handles.container} flex `  }>
            {(numberPoint > 0)
            ? <span >Te puedes ganar <span className="fw6">{numberPoint}</span>  puntos con esta compra</span>
            : <span >Gana puntos con productos superiores a <FormattedPrice value={basePoint}/> </span>}
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
