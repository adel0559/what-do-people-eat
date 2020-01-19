const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const Recipe = path.resolve('./src/templates/recipe.js')
    resolve(
      graphql(
        `
          {
            allContentfulRecipe {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulRecipe.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/recipe/${post.node.slug}/`,
            component: Recipe,
            context: {
              slug: post.node.slug
            },
          })
        })
      })
    )
  })
}
