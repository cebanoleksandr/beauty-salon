import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ServiceBookingPage from '../pages/ServiceBookingPage.vue'
import AdminSalonsPage from '../pages/AdminSalonsPage.vue'
import AdminServicesPage from '../pages/AdminServicesPage.vue'
import AdminAppointmentsPage from '../pages/AdminAppointmentsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/book',
      component: ServiceBookingPage
    },
    {
      path: '/salons',
      component: AdminSalonsPage
    },
    {
      path: '/services',
      component: AdminServicesPage
    },
    {
      path: '/appointments',
      component: AdminAppointmentsPage
    }
  ]
})

export default router
