import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Dashboard from '@/components/Dashboard'
import Overview from '@/components/Overview'
// import Events from '@/components/Events'
import EventTable from "../components/EventTable";

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
            component: Dashboard,
            redirect: '/admin/overview',
            children: [
                {
                    path: 'overview',
                    name: 'Overview',
                    component: Overview
                },
                {
                    path: 'events',
                    name: 'Events',
                    component: EventTable
                },
                {
                    path: 'event/:id',
                    name: 'Event',
                    component: Event
                    // props: true
                }
            ]
        }
    ]
})
