<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import EventService from '@/services/EventService'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / getPageSize())
  return page.value < totalPages
})
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const page = computed(() => props.page)
const router = useRouter()
const route = useRoute()

const getPageSize = () => {
  const pageSize = Number(route.query.pageSize)
  return isNaN(pageSize) ? 3 : pageSize
}

onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(getPageSize(), page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = Number(response.headers['x-total-count'])
      })
      .catch((error) => {
        router.push({ name: 'network-error-view' })
      })
  })
})

const updatePageSize = (pageSize: number) => {
  router.push({ query: { ...route.query, pageSize } })
}
</script>

<template>
  <h1 class="text-center text-2xl font-bold mb-4">Events For Good</h1>
  <div class="flex flex-col items-center">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="flex w-72 justify-between mt-4">
      <RouterLink
        id="page-prev"
        :to="{ name: 'event-list-view', query: { page: page - 1, pageSize: getPageSize() } }"
        rel="prev"
        v-if="page > 1"
        class="text-blue-500 hover:text-blue-700 text-left flex-1"
      >
        &#60; Prev Page
      </RouterLink>
      <RouterLink
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1, pageSize: getPageSize() } }"
        rel="next"
        v-if="hasNextPage"
        class="text-blue-500 hover:text-blue-700 text-right flex-1"
      >
        Next Page &#62;
      </RouterLink>
    </div>
  </div>
</template>
