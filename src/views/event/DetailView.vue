<script setup lang="ts">
import { toRefs, defineProps} from 'vue'
import { type Event } from '@/types'
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
const { event } = toRefs(props)
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
        <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
        <p>{{ event.description }}</p>
    <!-- </div> -->
</template>
