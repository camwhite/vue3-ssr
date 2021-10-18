import ky from 'ky-universal'
import { useMainStore } from '../stores/main'

const shopify = ky.create({
  prefixUrl: 'https://codeandcamlabs.myshopify.com/api/2021-04',
  headers: {
    'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_STOREFRONT_TOKEN
  },
  hooks: {
    afterResponse: [
      async response => {
        if (response?.status >= 400) {
          const main = useMainStore()
          main.error = await response.json()
        }
        return response
      }
    ]
  }
})

export const queryShopify = async (query, variables) => {
  try {
    const response = await shopify.post('graphql.json', {
      json: { query, variables }
    })
    const { data, errors } = await response.json()
    if (errors) {
      throw errors[0]
    }

    return data
  } catch (err) {
    const main = useMainStore()
    main.error = err

    return {}
  }
}

export { default as queries } from './queries'
