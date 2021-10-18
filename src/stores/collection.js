import { defineStore } from 'pinia'
import { queryShopify, queries } from '../api'

export const useCollectionStore = defineStore({
  id: 'collection',
  state: () => ({
    collections: [],
    products: {}
  }),
  actions: {
    async getProductsByCollection(handle) {
      const { collectionByHandle } = await queryShopify(
        queries.collectionByHandle,
        {
          handle
        }
      )
      const products = collectionByHandle?.products.edges.map(
        ({ node }) => {
          const images = node.images.edges.map(({ node }) => {
            return { ...node }
          })
          return {
            ...node,
            images
          }
        }
      )

      this.products[handle] = products
    },
    async getCollections() {
      const { collections } = await queryShopify(
        queries.collections
      )
      this.collections = collections?.edges.map(({ node }) => ({
        ...node
      }))
    }
  }
})
