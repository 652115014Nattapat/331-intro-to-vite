<script setup lang="ts">
import { toRefs, defineProps} from 'vue'
import { type Event } from '@/types'
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
const router =useRouter()
const register =() =>{
    //if the registration API call successful
    //Push back to the event details view
    router.push ({ name: 'event-detail-view' })
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
        <p>Register event here</p>
        <button @click="register">Register</button>
    <!-- </div> -->
</template>
