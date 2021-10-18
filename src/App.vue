<template>
  <nav class="fixed h-16 flex items-center w-full bg-white">
    <router-link
      to="/"
      class="px-2 transform transition-all"
      active-class="scale-125 -rotate-12"
      exact
    >
      <img
        alt="Bite logo"
        class="h-12 p-2 flex-shrink"
        src="./assets/logo.svg"
      />
    </router-link>
    <ul class="flex justify-around w-48">
      <li>
        <router-link to="/todos" active-class="underline"
          >todos</router-link
        >
      </li>
      <li>
        <collection-dropdown />
      </li>
    </ul>
  </nav>
  <router-view :key="route.fullPath" v-slot="{ Component }">
    <suspense>
      <main class="min-h-screen flex flex-col pt-16 px-2">
        <component :is="Component" />
      </main>
      <template #fallback>
        <p class="pt-16">
          Loading...
        </p>
      </template>
    </suspense>
  </router-view>
</template>

<script setup>
import { useRoute } from 'vue-router'
import CollectionDropdown from './components/CollectionDropdown.vue'

const route = useRoute()
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
