import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import EventTable from '@/components/EventTable'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/admin',
            name: 'Admin',
            component: EventTable,
            meta: {
                requiresAuth: true
            }
        }
    ]
})
