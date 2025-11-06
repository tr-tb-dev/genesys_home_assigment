import { Link, NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { useTheme } from '@mui/material/styles'
import classNames from 'classnames'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'
import styles from './Navigation.module.scss'

function Navigation() {
  const theme = useTheme()

  const navStyles = {
    '--nav-bg': theme.palette.navigation.background,
    '--nav-text': theme.palette.navigation.text,
    '--nav-hover': theme.palette.navigation.hover,
    '--nav-active': theme.palette.navigation.active,
  }

  const getLinkClassName = ({ isActive }) =>
    classNames(styles.menuLink, {
      [styles.active]: isActive,
    })

  return (
    <nav className={styles.navigation} style={navStyles}>
      <div className={styles.leftSection}>
        <Link to="/" className={styles.logo}>
          HN
        </Link>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <NavLink to="/" className={getLinkClassName} end>
              <FormattedMessage id="navigation.newPosts" />
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink to="/top" className={getLinkClassName}>
              <FormattedMessage id="navigation.topPosts" />
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={styles.rightSection}>
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Navigation
