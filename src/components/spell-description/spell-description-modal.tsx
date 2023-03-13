import React from 'react';
import CustomModal from 'src/common/modal/modal';
import {Formatter, Spell} from 'src/features/api-types';
import useFavoritiesLocalStorage from 'src/features/local-storage';
import useSeparateSpell from 'src/features/useSeparateSpell';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Loader from 'src/common/loader/loader';
import styles from './spell-description-modal.module.scss';

interface ISpellDescriptionModal {
  /**
   * State which is used to show the modal.
   * @default false
   */
  isVisible: boolean;
  /**
   * Function to be called when the modal is closed.
   * @default () => null
   */
  onClose: () => void;
  /**
   * The selected spell.
   */
  selectedSpell: Spell;

  formatter?: Formatter;
}

const SpellDescriptionModal = ({
  isVisible = false,
  onClose = () => null,
  selectedSpell,
  formatter = {keys: {}, value: value => JSON.stringify(value, null, 2)},
}: ISpellDescriptionModal) => {
  const {data, isLoading} = useSeparateSpell({selectedSpell});
  const {state, saveLocalStorage, removeLocalStorage} = useFavoritiesLocalStorage();

  const checkFavorities = () => state?.some(item => item?.index === selectedSpell?.index) ?? false;

  const addToFavorites = () => {
    saveLocalStorage([...state, selectedSpell]);
  };

  const removeFromFavorites = () => {
    removeLocalStorage(selectedSpell.index);
  };

  const isContentReady = !isLoading && data && Object.keys(data).length > 0;

  return (
    <CustomModal isVisible={isVisible} onClose={onClose}>
      {isLoading && <Loader />}

      {isContentReady && (
        <div className={styles.wrapper}>
          {checkFavorities() ? (
            <div>
              <span>Remove from favorite</span>
              <BookmarkIcon onClick={removeFromFavorites} />
            </div>
          ) : (
            <div>
              <span>Add to favorite</span>
              <BookmarkBorderIcon onClick={addToFavorites} />
            </div>
          )}

          <div>
            {Object.entries(data).map(([key, value]) => {
              if (!formatter.keys[key]) {
                return null;
              }

              return (
                <div>
                  {formatter.keys[key]}: <span>{formatter.value(value)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </CustomModal>
  );
};

export default SpellDescriptionModal;
