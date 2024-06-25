import React from 'react'
import { render } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'
import PointsappInfo from './PointsappInfo'

// Mock useProduct and useCssHandles
jest.mock('vtex.product-context')
jest.mock('vtex.css-handles')

describe('PointsappInfo', () => {
  it('returns null when basePoint or quantityPoint is zero or negative', () => {
    const { container } = render(
      <PointsappInfo basePoint={0} quantityPoint={2} />
    )

    expect(container.firstChild).toBeNull()

    const { container: container2 } = render(
      <PointsappInfo basePoint={500} quantityPoint={0} />
    )

    expect(container2.firstChild).toBeNull()

    const { container: container3 } = render(
      <PointsappInfo basePoint={-100} quantityPoint={2} />
    )

    expect(container3.firstChild).toBeNull()

    const { container: container4 } = render(
      <PointsappInfo basePoint={500} quantityPoint={-2} />
    )

    expect(container4.firstChild).toBeNull()
  })

  it('renders points info correctly when basePoint is 300 and quantityPoint is 2', () => {
    const { getByText } = render(
      <PointsappInfo basePoint={300} quantityPoint={2} />
    )

    expect(
      getByText('Te puedes ganar 6 puntos con esta compra')
    ).toBeInTheDocument()
  })
})

describe('PointsappInfo schema', () => {
  it('should have a valid schema', () => {
    const { schema } = PointsappInfo

    expect(schema).toBeDefined()
    expect(schema.title).toBe('Información puntos a ganar por compra')
    expect(schema.type).toBe('object')
    expect(schema.properties).toEqual({
      basePoint: {
        title: 'base',
        description:
          'Esta es la base en pesos por la que se otorgará puntos (acepta valores positivos, debe ser mayor a 1)',
        type: 'number',
      },
      quantityPoint: {
        title: 'numero de puntos',
        description:
          'Puntos que se otorgarán por el resultado de la compra sobre la base (acepta valores positivos, debe ser mayor a 1)',
        type: 'number',
      },
    })
  })
})
