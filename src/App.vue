<script setup lang="ts">
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
// import { SpeedInsights } from '@vercel/speed-insights/next';
const store = useMessageStore()
const { message } = storeToRefs(store)

const router = useRouter()
const route = useRoute()
const pageSize = ref(getPageSize())

function getPageSize() {
  const pageSize = Number(route.query.pageSize)
  return isNaN(pageSize) ? 2 : pageSize
}

const updatePageSize = (newPageSize: number) => {
  router.push({ name: 'event-list-view', query: { ...route.query, pageSize: newPageSize } })
}
</script>

<template>
  <SpeedInsights/>
  <div class="text-center font-sans text-gray-700 antialiased">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <h1>Deploy with Vercel</h1>
      <div class="wrapper">
        <nav class="py-6">
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'event-list-view' }"
            >Event</RouterLink
          >
          <span class="mx-2">|</span>
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'about' }"
            >About</RouterLink
          >
          <span class="mx-2">|</span>
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'add-event' }"
            >New Event</RouterLink
          >
          <span class="mx-2">|</span>
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'add-organizer' }"
            >New Oreganizer</RouterLink
          >
        </nav>
      </div>
      <!-- Page Size Selection -->
      <div class="mt-4">
        <label class="mr-2">Set Page Size: </label>
        <span v-for="size in [1, 2, 3, 4, 5, 6]" :key="size" class="mr-2">
          <RouterLink
            class="text-gray-700 hover:text-green-500"
            exact-active-class="text-green-500"
            :to="{ name: 'event-list-view', query: { ...route.query, pageSize: size } }"
          >
            {{ size }}
          </RouterLink>
        </span>
      </div>
    </header>
    <RouterView />
  </div>
</template>
