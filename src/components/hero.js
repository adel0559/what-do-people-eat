import React from 'react'
import Img from 'gatsby-image'

import styles from './hero.module.css'

export default ({ data }) => (
  <div className={styles.hero}>
    <Img className={styles.heroImage} alt={data.title} fluid={data.heroImage.fluid} />
    <div className={styles.heroDetails}>
      <h3 className={styles.heroHeadline}>{data.title}</h3>
    </div>
  </div>
)
