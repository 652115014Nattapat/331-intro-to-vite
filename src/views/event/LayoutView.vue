<script setup lang="ts">
import { useEventStore } from '@/stores/event'
import { storeToRefs } from 'pinia'

const store = useEventStore()
const { event } = storeToRefs(store)
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav class="flex justify-center space-x-4 py-4">
      <RouterLink
        :to="{ name: 'event-detail-view' }"
        class="text-blue-500 hover:text-blue-700 font-semibold"
      >
        Details
      </RouterLink>
      <span>|</span>
      <RouterLink
        :to="{ name: 'event-register-view' }"
        class="text-blue-500 hover:text-blue-700 font-semibold"
      >
        Register
      </RouterLink>
      <span>|</span>
      <RouterLink
        :to="{ name: 'event-edit-view' }"
        class="text-blue-500 hover:text-blue-700 font-semibold"
      >
        Edit
      </RouterLink>
    </nav>
    <RouterView :event="event" />
  </div>
</template>
