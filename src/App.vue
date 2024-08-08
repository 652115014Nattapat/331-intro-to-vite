<script setup lang="ts">
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
const store = useMessageStore()
const { message } = storeToRefs(store)

const router = useRouter()
const route = useRoute()
const pageSize = ref(getPageSize())

// Get the page size from the query parameter or use a default value
function getPageSize() {
  const pageSize = Number(route.query.pageSize)
  return isNaN(pageSize) ? 2 : pageSize
}

// Update the URL with the new page size
const updatePageSize = (newPageSize: number) => {
  router.push({ name: 'event-list-view', query: { ...route.query, pageSize: newPageSize } })
}
</script>

<template>
  <div class="text-center font-sans text-gray-700 antialias">
    <header>
      <div id="flashMessage" class="animate-fate" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <div class = "wrapper">
        <nav class="py-6">
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{name: 'event-list-view'}">Event</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{name: 'student'}">Student</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{name: 'about'}">About</RouterLink>
        </nav>
      </div>
      <!-- Page Size Selection -->
      <div class="page-size-links">
        <label>Set Page Size: </label>
        <RouterLink
          v-for="size in [1, 2, 3, 4, 5, 6]"
          :key="size"
          :to="{ name: 'event-list-view', query: { ...route.query, pageSize: size } }"
        >
          {{ size }}
        </RouterLink>
      </div>
    </header>
  <RouterView />
  </div>
</template>

<style>
/* #layout{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smooothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

h2{
  font-size: 20px;
}

.page-size-links {
  margin-top: 20px;
}

.page-size-links a {
  margin: 0 5px;
  text-decoration: none;
  color: #2c3e50;
}

.page-size-links a.router-link-exact-active {
  color: #42b983;
}

/* @keyframes yellow-fade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}
#flashMessage {
  animation: yellow-fade 3s ease-in-out;
} */
</style>
