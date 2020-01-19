import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const recipes = get(this, 'props.data.allContentfulRecipe.edges')
    const [landing] = get(this, 'props.data.allContentfulLanding.edges')
    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <Hero data={landing.node} />
          <div className="wrapper">
            <h2 className="section-headline">Recipes</h2>
            <ul className="article-list">
              {recipes.map((node) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview recipe={node.node} />
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

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
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
            fluid(
              quality: 100
            ) {
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
    allContentfulLanding(filter: { contentful_id: { eq: "1gFRR29V9eu3jCBZILonTq" } }) {
      edges {
        node {
          title
          heroImage {
            fluid(
              quality: 100
            ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
