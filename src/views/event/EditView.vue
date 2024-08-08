<script setup lang="ts">
import { toRefs, defineProps} from 'vue'
import { type Event } from '@/types'
import { useMessageStore } from '@/stores/message'
import { useRouter } from 'vue-router'
// import EventService from '@/services/EventService' 
// const event = ref<Event | null>(null)
// const props = defineProps({
//     id: {
//         type: String,
//         required: true
//     }
// })
// onMounted(() => {
//     EventService.getEvent(parseInt(props.id))
//     .then((response) => {
//     event.value = response.data
//     })
//   .catch((error) => {
//     console.error('There was an error!',error)
//   })
// })
const props = defineProps<{
    event: Event
    id: String
}>()
//eslint-disble-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs (props)
const store = useMessageStore()
const router = useRouter()
const edit = () => {
  store.updateMessage('You are successfully Edited for ' + props.event.title)
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { id: props.event.id } })
}
</script>
<template>
    <!-- <div v-if="event">
        <h1>{{ event.title }}</h1>
        <nav>
            <router-link :to="{ name: 'event-detail-view', params: { id }}">Details</router-link>
            |
            <router-link :to="{ name: 'event-register-view', params: { id }}">Register</router-link>
            |
            <router-link :to="{ name: 'event-edit-view', params: { id }}">Edit</router-link>
        </nav> -->
        <p class="text-lg font-semibold mb-4">Edit event here</p>
  <button
    @click="edit"
    class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
  >
    Edit
  </button>
    <!-- </div> -->
</template>
