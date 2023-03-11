import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import withMarkup from 'src/test/helpers/withMarkup/withMarkup'
import SpellDescriptionModal from './spell-description-modal'

jest.mock('src/features/useSeparateSpell', () => ({
  __esModule: true,
  default: () => ({ data: { name: 'Spell 1' }, isLoading: false }),
}))

jest.mock('src/features/local-storage', () => ({
  __esModule: true,
  default: () => ({ state: [], saveLocalStorage: jest.fn() }),
}))

describe('SpellDescriptionModal', () => {
  const onCloseMock = jest.fn()

  it('should render correctly', () => {
    const selectedSpell = { name: 'Spell 1', index: '1', url: '/api/spells/1', classes: [] }
    render(<SpellDescriptionModal isVisible onClose={onCloseMock} selectedSpell={selectedSpell} />)
    expect(screen.getByText('Add to favorite')).toBeInTheDocument()
    expect(withMarkup(screen.getByText)('Spell Name: Spell 1')).toBeInTheDocument()
    expect(withMarkup(screen.getByText)('Casting time: -')).toBeInTheDocument()
  })

  it('should add selected spell to favorites when clicked on favorite icon', async () => {
    const selectedSpell = { name: 'Spell 1', index: '1', url: '/api/spells/1' }
    render(<SpellDescriptionModal isVisible onClose={onCloseMock} selectedSpell={selectedSpell} />)

    // Select the SVG element using the `getByTestId` query
    const favoriteIcon = screen.getByTestId('FavoriteIcon')

    // Click on the SVG element
    fireEvent.click(favoriteIcon)

    expect(onCloseMock).not.toHaveBeenCalled()
  })

  it('should remove selected spell from favorities when clicked on favorite border icon', async () => {
    const selectedSpell = { name: 'Spell 1', index: '1', url: '/api/spells/1' }
    render(<SpellDescriptionModal isVisible onClose={onCloseMock} selectedSpell={selectedSpell} />)

    // Select the SVG element using the `getByTestId` query
    const favoriteIcon = screen.getByTestId('FavoriteIcon')

    // Click on the SVG element
    fireEvent.click(favoriteIcon)

    expect(onCloseMock).not.toHaveBeenCalled()
  })
})
