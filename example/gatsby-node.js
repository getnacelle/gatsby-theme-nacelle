const path = require('path')

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  // Fetch all products
  const products = await graphql(`
    {
      nacelle {
        getProducts {
          items {
            title
            handle
            featuredMedia {
              src
            }
          }
        }
      }
    }  
  `)
  products.data.nacelle.getProducts.items.forEach( item => {
    const { title, handle } = item
    let src
    if (item.featuredMedia) {
      src = item.featuredMedia.src
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
      products: products.data.nacelle.getProducts.items
    }
  })

  // Fetch all collections
  const collections = await graphql(`
    {
      nacelle {
        getCollections {
          items {
            title
            handle
            featuredMedia {
              src
            }
            productLists {
              handles
            }
          }
        }
      }
    }
  `)
  collections.data.nacelle.getCollections.items.forEach( item => {
    const { title, handle } = item
    let src, handles
    if (item.featuredMedia) {
      src = item.featuredMedia.src
    }
    if (item.productLists) {
      const [handlesArray] = item.productLists
      handles = handlesArray ? handlesArray.handles : []
    }
    createPage({
      // Build a page for each collection
      path: `/collections/${handle}`,
      component: path.resolve('./src/components/templates/collection.js'),
      context: {
        title,
        imageSrc: src,
        handles,
        allProducts: products.data.nacelle.getProducts.items
      }
    })
  })
}
