import React from 'react'

import styles from './Title.css'
import check from './assets/checkmark_white.png'

const renderTitle = (title: string) => {
  return (
    <div className={styles.titleWrapper}>
      <div className={styles.titleIcon}>
        <img src={check} alt="" />
      </div>
      <div className={styles.titleText}>{title}</div>
    </div>
  )
}

const renderSubtitle = (title: string) => {
  return (
    <div className={styles.subtitleWrapper}>
      <div className={styles.subtitleText}>{title}</div>
    </div>
  )
}

export default function Title(props: any) {
  const { title, type } = props

  if (type === 'subtitle') return renderSubtitle(title)

  return renderTitle(title)
}
