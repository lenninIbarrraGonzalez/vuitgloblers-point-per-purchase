import React from 'react'
import PropTypes from 'prop-types'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedPrice } from 'vtex.formatted-price'

// Define the CSS handles for styling purposes
const CSS_HANDLES = ['container'] as const

// Define the props interface for PointsappInfo component
type Props = {
  basePoint: number,         // The base price threshold for earning points
  quantityPoint: number      // Number of points earned per base unit price
}


const PointsappInfo = ({ basePoint, quantityPoint }: Props) => {
  // Accessing product context using VTEX's useProduct hook
  const productContextValue = useProduct()
  // Accessing CSS handles for styling
  const handles = useCssHandles(CSS_HANDLES)

  // Extracting the selling price of the currently selected product
  let sellingPrice = productContextValue?.selectedItem?.sellers[0]?.commertialOffer?.Price
  sellingPrice = parseInt(sellingPrice, 10)

  // Calculating the number of points user can earn based on the selling price
  let numberPoint = Math.floor((sellingPrice / basePoint))
  numberPoint = numberPoint * quantityPoint

  if(basePoint <= 0 || quantityPoint <= 0) {
    return null
  }

  return (
    <div className={`${handles.container} flex `}>
      {numberPoint > 0 ? (
        <span>Te puedes ganar <span className='fw6'>{numberPoint}</span> puntos con esta compra</span>
      ) : (
        <span>Gana puntos con productos superiores a <FormattedPrice value={basePoint}/></span>
      )}
    </div>
  );
}

// Define propTypes for type checking
PointsappInfo.propTypes = {
  basePoint: PropTypes.number.isRequired,      // basePoint must be a required number
  quantityPoint: PropTypes.number.isRequired   // quantityPoint must be a required number
}

// Define defaultProps for default values
PointsappInfo.defaultProps = {
  basePoint: 500,     // Default basePoint value if not provided
  quantityPoint: 1    // Default quantityPoint value if not provided
}

// Define schema for props documentation (if using a component documentation tool)
PointsappInfo.schema = {
  title: 'Información puntos a ganar por compra',
  type: 'object',
  properties: {
    basePoint: {
      title: 'base',
      description: 'Esta es la base en pesos por la que se otorgará puntos (acepta valores positivos, debe ser mayor a 1)',
      type: 'number'
    },
    quantityPoint: {
      title: 'numero de puntos',
      description: 'Puntos que se otorgarán por el resultado de la compra sobre la base (acepta valores positivos, debe ser mayor a 1)',
      type: 'number'
    },
  }
}

export default PointsappInfo;
