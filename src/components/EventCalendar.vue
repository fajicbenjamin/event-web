<template>
    <v-layout>
        <v-flex>
            <v-sheet height="500">
                <v-calendar
                        :now="today"
                        :value="today"
                        color="primary"
                >
                    <template v-slot:day="{ date }">
                        <template v-for="event in eventsMap[date]">
                            <v-menu
                                    :key="event.title"
                                    v-model="event.open"
                                    full-width
                                    offset-x
                            >
                                <template v-slot:activator="{ on }">
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
                                        <v-btn icon>
                                            <v-icon>edit</v-icon>
                                        </v-btn>
                                        <v-toolbar-title v-html="event.title"></v-toolbar-title>
                                        <v-spacer></v-spacer>
                                        <v-btn icon>
                                            <v-icon>favorite</v-icon>
                                        </v-btn>
                                        <v-btn icon>
                                            <v-icon>more_vert</v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                    <v-card-title primary-title>
                                        <span v-html="event.details"></span>
                                    </v-card-title>
                                    <v-card-actions>
                                        <v-btn
                                                flat
                                                color="secondary"
                                        >
                                            Cancel
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
    import {api} from "../main";

    export default {
        data: () => ({
            today: '',
            events: []
        }),
        computed: {
            // convert the list of events into a map of lists keyed by date
            eventsMap () {
                const map = {}
                this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
                return map
            }
        },
        methods: {
            open (event) {
                alert(event.title)
            }
        },
        created() {
            this.today = new Date().toISOString().slice(0, 10)
            this.$http.get(api + '/events').then( response => {
                let events = response.data.content
                events.forEach((event) => {
                    let startTime = new Date(event.startTime.toLocaleString())
                    this.events.push({
                        date: startTime.toISOString().slice(0, 10),
                        title: event.name,
                        details: event.description,
                        open: false
                    })
                })
            })
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
