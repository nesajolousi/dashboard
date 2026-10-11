import type { ReactNode } from 'react'
import styles from './PanelHeading.module.css'

type PanelHeadingProps = {
  title: string
  description: string
  children?: ReactNode
}

export function PanelHeading({ title, description, children }: PanelHeadingProps) {
  return (
    <div className={styles['panel-heading']}>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </div>
  )
}
