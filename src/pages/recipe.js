import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './recipe.module.css'
import Layout from "../components/layout"
import ArticlePreview from '../components/article-preview'

class RecipeIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const recipes = get(this, 'props.data.Recipe.edges')
    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className={styles.hero}>
            Recipe
          </div>
          <div className="wrapper">
            <h2 className="section-headline">Recent articles</h2>
            <ul className="article-list">
              {recipes.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default RecipeIndex

export const pageQuery = graphql`
  query RecipeIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulRecipe(sort: { fields: [orderIndex], order: DESC }) {
      edges {
        node {
          title
          slug
          orderIndex
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
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
    }
  }
`
