const path = require('path')

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  // Fetch all products
  const products = await graphql(`
  {
    nacelle {
      getAllProducts {
        edges {
          node {
            title
            handle
            featuredMedia {
              src
            }
          }
        }
      }
    }
  }  
  `)
  products.data.nacelle.getAllProducts.edges.forEach( item => {
    const { title, handle } = item.node
    let src
    if (item.node.featuredMedia) {
      src = item.node.featuredMedia.src
    }
    createPage({
      // Build a page for each product
      path: `/products/${handle}`,
      component: path.resolve('./src/components/templates/product-detail.js'),
      context: {
        title,
        imageSrc: src
      }
    })
  })
  createPage({
    // Build a page with all products
    path: `/shop`,
    component: path.resolve('./src/components/templates/all-products.js'),
    context: {
      products: products.data.nacelle.getAllProducts.edges
    }
  })

  // Fetch all collections
  const collections = await graphql(`
    {
      nacelle {
        getAllCollections {
          edges {
            node {
              title
              handle
              featuredMedia {
                src
              }
              products {
                edges {
                  node {
                    title
                    handle
                    featuredMedia {
                      src
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  collections.data.nacelle.getAllCollections.edges.forEach( item => {
    const { title, handle } = item.node
    let src, products
    if (item.node.featuredMedia) {
      src = item.node.featuredMedia.src
    }
    if (item.node.products) {
      products = item.node.products.edges
    }
    createPage({
      // Build a page for each collection
      path: `/collections/${handle}`,
      component: path.resolve('./src/components/templates/collection.js'),
      context: {
        title,
        imageSrc: src,
        products
      }
    })
  })
}
