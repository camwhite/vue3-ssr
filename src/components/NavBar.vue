<template>
  <nav class="fixed h-16 flex items-center w-full bg-white">
    <router-link
      to="/"
      class="px-2 transform transition-all"
      active-class="scale-125 -rotate-12"
      exact
    >
      <img alt="Vite logo" class="h-12 p-2 flex-shrink" src="../assets/logo.svg" />
    </router-link>
    <ul class="flex justify-around w-48">
      <li>
        <router-link to="/todos" active-class="underline">todos</router-link>
      </li>
      <li>
        <collection-dropdown />
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
import CollectionDropdown from './CollectionDropdown.vue'

const route = useRoute()
</script>

<style></style>
