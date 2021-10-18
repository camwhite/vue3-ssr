<template>
  <ul class="flex flex-col">
    <li
      class="p-2"
      v-for="product of collection.products[route.params.handle]"
    >
      <img
        class="w-64 h-64 object-cover"
        :src="product.images[0].originalSrc"
      />
      <h3 class="text-2xl font-bold font-serif">
        {{ product.title }}
      </h3>
    </li>
  </ul>
</template>

<script>
import { computed, onServerPrefetch } from 'vue'
import { useRoute } from 'vue-router'
import { useCollectionStore } from '../stores/collection'

export default {
  async setup() {
    const route = useRoute()
    const collection = useCollectionStore()

    onServerPrefetch(async () => {
      await collection.getProductsByCollection(
        route.params.handle
      )
    })
    if (!collection.products[route.params.handle]) {
      await collection.getProductsByCollection(
        route.params.handle
      )
    }

    return {
      route,
      collection
    }
  }
}
</script>

<style scoped></style>
