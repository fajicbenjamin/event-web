<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                :clipped="$vuetify.breakpoint.lgAndUp"
                fixed
                app
        >
            <v-list dense>
                <template v-for="item in items">
                    <v-list-group
                            v-if="item.children"
                            :key="item.text"
                            v-model="item.model"
                            :prepend-icon="item.model ? item.icon : item['icon-alt']"
                            append-icon=""
                    >
                        <template #activator>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        {{ item.text }}
                                    </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>
                        <v-list-tile
                                v-for="(child, i) in item.children"
                                :key="i"
                                @click="switchTab(item.value)"
                        >
                            <v-list-tile-action v-if="child.icon">
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ child.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                    <v-list-tile v-else :key="item.text" @click="switchTab(item.value)" :style="getActiveItem(item)">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                color="blue darken-3"
                dark
                app
                fixed
        >
            <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <a href="" @click="$router.push('/')" class="white--text"><span class="hidden-sm-and-down" v-t="'app'"></span></a>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <language></language>
            <v-btn icon large>
                <v-icon>perm_identity</v-icon>
            </v-btn>
        </v-toolbar>
        <v-content class="custom-container">
            <dashboard-content class="mr-4 ml-4"></dashboard-content>
        </v-content>
    </v-app>
</template>

<script>
    import DashboardContent from './Content.vue'
    import { mapGetters } from 'vuex'
    import Language from "../Language";

    export default {
        name: 'admin',
        components: {
            Language,
            DashboardContent
        },
        data: () => ({
            dialog: false,
            drawer: null,
        }),
        computed: {
            ...mapGetters({
                isLoggedIn: 'isLoggedIn',
                events: 'getEvents',
                activeTab: 'getActiveTab'
            }),
            items() {
                return [
                    { icon: 'dashboard', text: this.$i18n.t('overview'), value: 'overview'},
                    { icon: 'event', text: this.$i18n.tc('event', 2), value: 'events' },
                    { icon: 'account_box', text: this.$i18n.tc('user', 2), value: 'users' },
                    { icon: 'location_on', text: this.$i18n.tc('location', 2), value: 'locations' },
                    { icon: 'category', text: this.$i18n.tc('category', 2), value: 'categories' }
                ]
            }
        },
        methods: {
            switchTab(child) {
                this.$router.push('/admin/' + child.toLowerCase())
            },
            getActiveItem(item) {
                return this.$route.name === item.text ? 'background: rgba(0,0,0,0.15);' : ''
            }
        }
    }
</script>

<style scoped>
    .custom-container {
        margin-top: 30px;
    }

</style>
