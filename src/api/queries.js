export default {
  collectionByHandle: `
  query ($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      products(first: 20) {
        edges {
          node {
            id
            handle
            title
            images(first: 1) {
              edges {
                node {
                  originalSrc
                }
              }
            }
          }
        }
      }
    }
  }
  `,
  collections: `
  {
    collections(first: 20) {
      edges {
        node {
         title
         handle
        }
      }
    }
  }
  `
}
