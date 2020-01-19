import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './article-preview.module.css'

export default ({ recipe }) => (
  <div className={styles.preview}>
    <Img alt="" fluid={recipe.heroImage.fluid} />
    <h3 className={styles.previewTitle}>
      <Link to={`/recipe/${recipe.slug}`}>{recipe.title}</Link>
    </h3>
    <p
      dangerouslySetInnerHTML={{
        __html: recipe.instructions.instructions
      }}
    />
  </div>
)
