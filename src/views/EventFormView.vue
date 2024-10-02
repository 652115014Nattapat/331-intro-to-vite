<script setup lang="ts">
import type {Event, Organizer} from '@/types';
import {onMounted, ref} from 'vue'
import EventService from '@/services/EventService';
import OrganizerService from "@/services/OrganizersService";
import BaseInput from '@/components/BaseInput.vue'; 
import BaseSelect from '@/components/BaseSelect.vue';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';
import { options } from 'node_modules/axios/index.cjs';
 
const event = ref<Event>({
    id: 0,
    category: '',
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    petsAllowed: false,
    organizer: {
        id: 0,
        name: ''
    }
})
 
const router = useRouter()
const store = useMessageStore()
function saveEvent() {
    EventService.saveEvent(event.value)
        .then((response) => {
            router.push({ name: 'event-list-view' , params: { id: response.data.id }})
            store.updateMessage('You are successfully add a new event for ' + response.data.title)
            setTimeout(() => {
                store.resetMessage()
            }, 3000)
        })
        .catch(() => {
            router.push({ name: 'network-error-view'})
        })
}

const organizers = ref<Organizer[]>([])
onMounted(() => {
    OrganizerService.getOrganizers()
    .then(response => {
        organizers.value = response.data
    }).catch(() =>{
        router.push({ name: 'network-error-view'})
    })
})

</script>
<template>
    <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-6 text-gray-700">Create an event</h1>
      <form @submit.prevent="saveEvent" class="space-y-4">
        <!-- Category -->
        <div>
          <BaseInput v-model="event.category" type="text" label="Category " />
        </div>
  
        <!-- Event Name & Description -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Name & describe your event</h3>
          <BaseInput v-model="event.title" type="text" label="title " />
          <BaseInput v-model="event.description" type="text" label="description " />
        </div>
  
        <!-- Location -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Where is your event?</h3>
          <BaseInput v-model="event.location" type="text" label="location " />
        </div>

        <h3>Who is your organizer?</h3>
        <BaseSelect v-model="event.organizer.id" :options="organizers" label="Organizer" />
  
        <!-- Submit Button -->
        <button
          class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          type="submit"
        >
          Submit
        </button>
      </form>
  
      <pre class="mt-6 p-4 bg-gray-100 rounded-md">{{ event }}</pre>
    </div>
  </template>