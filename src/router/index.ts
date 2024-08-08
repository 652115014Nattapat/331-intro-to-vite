import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView  from '../views/AboutView.vue'
import StudentView from '@/views/StudentView.vue'
import EventDetailView from '@/views/event/DetailView.vue'
import EventEditView from '@/views/event/EditView.vue'
import EventRegisterView from '@/views/event/RegisterView.vue'
import EventLayoutView from '@/views/event/LayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import EventService from '@/services/EventService'
import nProgress from 'nprogress'
import { useEventStore } from '@/stores/event'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query.page?.toString() || '1')})
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },{
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },{
      path: '/student',
      name: 'student',
      component: StudentView
    },{
      path: '/event/:id',
      // name: 'event-detail-view',
      // component: EventDetailView,
      // props: true
      name: 'event-layout-view',
      component: EventLayoutView,
      props: true,
      beforeEnter: (to) => {
        //put API caall here
        const id = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return EventService.getEvent(id)
        .then((response) => {
          //need to setup the data for the event
          eventStore.setEvent (response.data)
        }).catch((error) => {
          if (error.response && error.response.status === 404) {
            return {
              name: '404-resource-view',
              params: { resource: 'event' }
            }
          } else {
            return { name: 'network-error-view' }
          }
        })
      },
      children: [
        {
          path: '',
          name: 'event-detail-view',
          component: EventDetailView,
          props: true
        },
        {
          path: 'edit',
          name: 'event-edit-view',
          component: EventEditView,
          props: true
        },
        {
          path: 'register',
          name: 'event-register-view',
          component: EventRegisterView,
          props: true
        }
      ]
    // },{
    //   path: '/event/:id/edit',
    //   // name: 'event-edit-view',
    //   // component: EventEditView,
    //   // props: true
    // },{
    //   path: '/event/:id/register',
    //   name: 'event-register-view',
    //   component: EventRegisterView,
    //   props: true
    },{
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView
    }
  ]
})

router.beforeEach(() => {
  nProgress.start();
})

router.afterEach(() =>{
  nProgress.done()
})

export default router
