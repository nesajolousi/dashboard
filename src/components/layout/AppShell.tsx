import type { ReactNode } from 'react'
import { useAppContext } from '../../context/AppContext'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import styles from './AppShell.module.css'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const { menuOpen, closeMenu } = useAppContext()

  return (
    <div className={styles['app-shell']}>
      <Sidebar />
      {menuOpen && (
        <button className={styles['overlay']} aria-label="بستن منو" onClick={closeMenu} />
      )}
      <main className={styles['main-content']}>
        <Topbar />
        {children}
      </main>
    </div>
  )
}
