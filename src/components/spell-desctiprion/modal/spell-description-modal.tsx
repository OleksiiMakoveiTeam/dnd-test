import React from 'react'
import CustomModal from 'src/components/modal/modal'
import { Spell } from 'src/features/api-types'
import useFavoritiesLocalStorage from 'src/features/local-storage'
import useSeparateSpell from 'src/features/useSeparateSpell'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import styles from './spell-description-modal.module.scss'
import formatValue from '../utils'

interface ISpellDescriptionModal {
  /**
   * State which is used to show the modal.
   * @default false
   */
  isVisible: boolean
  /**
   * Function to be called when the modal is closed.
   * @default () => null
   */
  onClose: () => void
  /**
   * The selected spell.
   */
  selectedSpell: Spell
}

const SpellDescriptionModal = ({ isVisible = false, onClose = () => null, selectedSpell }: ISpellDescriptionModal) => {
  const { data, isLoading } = useSeparateSpell({ selectedSpell })
  const { state, saveLocalStorage } = useFavoritiesLocalStorage()

  const checkFavorities = () => state?.some(item => item?.index === selectedSpell?.index) ?? false

  const addToFavorites = () => {
    saveLocalStorage([...state, selectedSpell])
  }

  const removeFromFavorites = () => {
    const filteredState = state.filter(item => item?.index !== selectedSpell?.index)
    saveLocalStorage(filteredState)
  }

  return (
    <CustomModal isVisible={isVisible} onClose={onClose}>
      {isLoading && <div>Loading..</div>}
      {!isLoading && data && Object.keys(data).length > 0 && (
        <div className={styles.wrapper}>
          {checkFavorities() ? (
            <div>
              <span>Remove from favorite</span>
              <FavoriteBorderIcon onClick={removeFromFavorites} />
            </div>
          ) : (
            <div>
              <span>Add to favorite</span>
              <FavoriteIcon onClick={addToFavorites} />
            </div>
          )}
          <div>
            <div>
              Spell Name: <span>{formatValue(data?.name)}</span>
            </div>
            <div>
              Casting time: <span>{formatValue(data?.casting_time)}</span>
            </div>
            <div>
              Classes:
              <span>{data?.classes?.length > 0 ? data?.classes?.map(({ name }) => name)?.join(' ') : '-'}</span>
            </div>
            <div>
              Subclasses:
              <span>{data?.subclasses?.length > 0 ? data?.subclasses?.map(({ name }) => name)?.join(' ') : '-'}</span>
            </div>
            <div>
              Components: <span>{formatValue(data?.components)}</span>
            </div>
            <div>
              Duration: <span>{formatValue(data?.duration)}</span>
            </div>
            <div>
              Higher levels:
              <span>{formatValue(data?.higher_level)}</span>
            </div>
            <div>
              Level: <span>{formatValue(data?.level)}</span>
            </div>
            <div>
              Material: <span>{formatValue(data?.material)}</span>
            </div>
            <div>
              Range: <span>{formatValue(data?.range)}</span>
            </div>
            <div>
              Ritual: <span>{formatValue(data?.ritual)}</span>
            </div>
            <div>
              School: <span>{data?.school?.name}</span>
            </div>
            <div className={styles.desc}>
              Description: <span>{formatValue(data?.desc)}</span>
            </div>
          </div>
        </div>
      )}
    </CustomModal>
  )
}

export default SpellDescriptionModal
