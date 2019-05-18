import Vue from 'vue'
import Router from 'vue-router'
import EventsIndex from "../components/Admin/Events/Index";
import Index from "../components/Index";
import Dashboard from "../components/Admin/Dashboard";
import Overview from "../components/Admin/Overview";
import UsersIndex from "../components/Admin/Users/Index";
import User from "../components/Admin/Users/User";
import Event from "../components/Admin/Events/Event";
import LocationsIndex from "../components/Admin/Locations/Index";
import Location from "../components/Admin/Locations/Location";
import CategoriesIndex from "../components/Admin/Categories/Index";
import EventPage from "../components/Pages/Event";
import Login from "../components/Admin/Login";
import Category from "../components/Admin/Categories/Category";

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
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/event/:id',
            name: 'EventPage',
            component: EventPage
        },
        {
            path: '/admin',
            component: Dashboard,
            redirect: '/admin/overview',
            beforeEnter(to, from, next) {
                if (localStorage.getItem('token')) {
                    next();
                } else {
                    next('/login');
                }
            },
            children: [
                {
                    path: 'overview',
                    name: 'Overview',
                    component: Overview
                },
                {
                    path: 'events',
                    name: 'Events',
                    component: EventsIndex
                },
                {
                    path: 'events/:id',
                    name: 'Event',
                    component: Event
                    // props: true
                },
                {
                    path: 'users',
                    name: 'Users',
                    component: UsersIndex
                },
                {
                    path: 'users/:id',
                    name: 'User',
                    component: User
                },
                {
                    path: 'locations',
                    name: 'Locations',
                    component: LocationsIndex
                },
                {
                    path: 'locations/:id',
                    name: 'Location',
                    component: Location
                },
                {
                    path: 'categories',
                    name: 'Categories',
                    component: CategoriesIndex
                },
                {
                    path: 'categories/:id',
                    name: 'Category',
                    component: Category
                }
            ]
        }
    ]
})
