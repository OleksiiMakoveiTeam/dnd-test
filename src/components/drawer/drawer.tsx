/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Drawer } from '@mui/material'
import React from 'react'
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined'
import { NAV_BAR_URL } from 'src/lib/constants'
import { useNavigate } from 'react-router-dom'
import styles from './drawer.module.scss'

// Default anchor position for the drawer
const DEFAULT_ANCHOR = 'left'

const CustomDrawer = () => {
  // Local state to keep track of the open/closed state of the drawer
  const [open, setOpen] = React.useState(false)

  // Functions to toggle the open/closed state of the drawer
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  // Inbuilt function to navigate to a new page
  const navigate = useNavigate()

  // Function to navigate to the page that was clicked on
  const handleNavigation = (to: string) => {
    navigate(to)
  }

  return (
    <>
      <MenuOpenOutlinedIcon className={styles.icon} sx={{ cursor: 'pointer' }} onClick={handleOpen} />
      <Drawer sx={{ width: 400 }} anchor={DEFAULT_ANCHOR} open={open} onClose={handleClose}>
        <div className={styles.wrapper}>
          <div>
            <MenuOpenOutlinedIcon sx={{ cursor: 'pointer' }} onClick={handleClose} />
          </div>
          <div className={styles.list}>
            <ul>
              {NAV_BAR_URL.map(({ name, to }) => (
                <li key={name} onClick={() => handleNavigation(to)}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default CustomDrawer
