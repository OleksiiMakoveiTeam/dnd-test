import React from 'react'
import Table from 'src/components/table/table'
import { Spell } from 'src/features/api-types'
import SpellDescriptionModal from 'src/components/spell-desctiprion/modal/spell-description-modal'
import CustomDrawer from 'src/components/drawer/drawer'
import useFavoritiesLocalStorage from 'src/features/local-storage'
import styles from './favorite.module.scss'

// The favorite page where user can access the spells added to their list of favourites
const FavoritePage = () => {
  // Local state of the currently selected spell
  const [selectedSpell, setSelectedSpell] = React.useState<Spell | null>(null)

  // The state of the spell description modal for the visibility of the spell description modal
  const [isSpellDescriptionModalOpen, setIsSpellDescriptionModalOpen] = React.useState(false)

  // Function to close the spell description modal
  const handleSpellDescriptionModalClose = () => {
    setIsSpellDescriptionModalOpen(false)
    setSelectedSpell(null)
  }

  // Function to open the spell description modal
  const handleRowClick = (spell: Omit<Spell, 'index'> & { id: string }) => {
    setSelectedSpell({ name: spell.name, index: spell.id, url: spell.url })
    setIsSpellDescriptionModalOpen(true)
  }

  // Data from the local storage for the list of favourites spells
  const { state: data } = useFavoritiesLocalStorage()

  return (
    <div className={styles.wrapper}>
      <CustomDrawer />
      <Table
        onRowClick={handleRowClick}
        columns={[{ field: 'name', headerName: 'Spell Name', width: 200, headerAlign: 'center' }]}
        data={data?.map(value => ({ id: value.index, name: value.name, url: value.url })) || []}
      />
      <SpellDescriptionModal
        selectedSpell={selectedSpell as Spell}
        isVisible={isSpellDescriptionModalOpen}
        onClose={handleSpellDescriptionModalClose}
      />
    </div>
  )
}
export default FavoritePage
