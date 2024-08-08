import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/652115014Nattapat/331-intro-to-vite-data',
    withCredentials: false,
    headers: { 'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getEvents(perPage: Number, page: Number){
        return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
    },
    getEvent (id: number) {
        return apiClient.get('/events/' + id)
    }
}