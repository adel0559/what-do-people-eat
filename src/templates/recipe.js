import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import heroStyles from '../components/hero.module.css'
import recipeStyles from './recipe.module.css'

class RecipeTemplate extends React.Component {
  render() {
    const recipe = get(this.props, 'data.contentfulRecipe')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    console.log(recipe);
    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={`${recipe.title} | ${siteTitle}`} />
          <div className={heroStyles.hero}>
            <Img className={heroStyles.heroImage} alt={recipe.title} fluid={recipe.heroImage.fluid} />
          </div>
          <div className="wrapper">
            <h1 className="section-headline">{recipe.title}</h1>
            <p
              style={{
                display: 'block',
              }}
            >
            </p>
            <div
              className="section-headline"
              dangerouslySetInnerHTML={{
                __html: recipe.instructions.instructions,
              }}
            />
            {recipe.ingredients &&
              <div>
                <span className={recipeStyles.title}>Ingredients</span>
                <ul>
                  {recipe.ingredients.list.map(ingredient => (
                    <li key={ingredient}>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            }
          </div>
        </div>
      </Layout>
    )
  }
}

export default RecipeTemplate

export const pageQuery = graphql`
  query RecipeBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulRecipe(slug: { eq: $slug }) {
      title
      orderIndex
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      instructions {
        instructions
      }
      ingredients {
        list
      }
    }
  }
`
