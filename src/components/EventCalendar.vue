<template>
    <v-layout>
        <v-flex>
            <v-sheet height="500">
                <v-calendar
                        :now="today"
                        :value="today"
                        color="primary"
                >
                    <template #day="{ date }">
                        <template v-for="event in eventsMap[date]">
                            <v-menu
                                    :key="event.title"
                                    v-model="event.open"
                                    full-width
                                    offset-x
                            >
                                <template #activator="{ on }">
                                    <div
                                            v-if="!event.time"
                                            v-ripple
                                            class="my-event"
                                            v-on="on"
                                            v-html="event.title"
                                    ></div>
                                </template>
                                <v-card
                                        color="grey lighten-4"
                                        min-width="350px"
                                        flat
                                >
                                    <v-toolbar
                                            color="primary"
                                            dark
                                    >
                                        <v-toolbar-title v-html="event.title"></v-toolbar-title>
                                    </v-toolbar>
                                    <v-card-title primary-title>
                                        <span v-html="event.details"></span>
                                    </v-card-title>
                                    <v-card-actions>
                                        <v-btn
                                                flat
                                                color="primary"
                                                @click="seeEvent(event)"
                                        >
                                            See event
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-menu>
                        </template>
                    </template>
                </v-calendar>
            </v-sheet>
        </v-flex>
    </v-layout>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        data: () => ({
            today: '',
            calendarEvents: []
        }),
        computed: {
            ...mapGetters({
                isLoggedIn: 'isLoggedIn',
                events: 'getEvents',
                promise: 'getPromise'
            }),
            // convert the list of events into a map of lists keyed by date
            eventsMap () {
                const map = {}
                this.calendarEvents.forEach(e => (map[e.date] = map[e.date] || []).push(e))
                return map
            }
        },
        methods: {
            seeEvent (event) {
                this.$router.push(`event/${event.id}`)
            }
        },
        created() {
            this.today = new Date().toISOString().slice(0, 10)
            if (this.promise) {
                this.promise.then(() => {
                    this.events.forEach((event) => {
                        let startTime = new Date(event.startTime.toLocaleString())
                        this.calendarEvents.push({
                            id: event.id,
                            date: startTime.toISOString().slice(0, 10),
                            title: event.name,
                            details: event.description,
                            open: false
                        })
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .my-event {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-radius: 2px;
        background-color: #1867c0;
        color: #ffffff;
        border: 1px solid #1867c0;
        width: 100%;
        font-size: 12px;
        padding: 3px;
        cursor: pointer;
        margin-bottom: 1px;
    }
</style>
