<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import { useRouter, useRoute } from 'vue-router'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  // const totalPages = Math.ceil(totalEvents.value / getPageSize())
  const totalPages = Math.ceil(totalEvents.value / 3)
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

//Get page size
const getPageSize = () => {
  const pageSize = Number(route.query.pageSize)
  return isNaN(pageSize) ? 3 : pageSize
}

onMounted(() => {
  watchEffect(() => {
    // EventService.getEvents(getPageSize(), page.value)
    EventService.getEvents(3, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = Number(response.headers['x-total-count'])
      })
      .catch((error) => {
        console.log('There was an error!', error)
    })
  })
})

// Update the URL with the new page size
const updatePageSize = (pageSize: number) => {
  router.push({ query: { ...route.query, pageSize } })
}
</script>

<template>
  <h1 class="text-center text-2xl font-bold mb-4">Events For Good</h1>
  <!-- new element -->
  <div class="flex flex-col item-center">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="flex w-72 justify-between mt-4">
      <RouterLink
      id="page-prev"
      :to="{ name: 'event-list-view', query: { page: page-1 }}"
      rel="prev"
      v-if="page != 1"
      class="text-blue-500 hover:text-blue-700 text-left flex-1"
      >&#60;Prev Page</RouterLink>

      <RouterLink
      id="page-next"
      :to="{ name: 'event-list-view', query:{ page: page+1}}"
      rel="next"
      v-if="hasNextPage"
      class="text-blue-500 hover:text-blue-700 text-left flex-1"
      >Next Page &#62;</RouterLink>
    </div>
  </div>
</template>

<!-- <style scoped>
/* .events {
  display: flex;
  flex-direction: column;
  align-items: center;
} */
.pagination{
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev{
  text-align: left;
}
#page-next{
  text-align: right;
}
</style> -->
