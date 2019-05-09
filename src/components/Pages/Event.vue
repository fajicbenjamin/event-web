<template>
    <section v-if="event">
        <span class="font-weight-thin display-2">{{ event.name }}</span>
        <p class="font-weight-thin title">
            {{ event.description }}
        </p>
        <span>{{ event.startTime }}</span>
        <span class="tag is-success">{{ event.availablePlaces }}</span>
        <span>{{ event.category.name }}</span>
        <hr>
        <span class="title">{{ $tc('location') }}</span>
        <div>{{ event.location.name }}</div>
        <div>{{ event.location.address }}</div>
        <div>{{ event.location.city }}, {{ event.location.country }}</div>
        <v-btn v-if="event.registration">Make reservation</v-btn>
        <v-footer class="pa-3 v-footer--absolute">
            <v-spacer></v-spacer>
            <div>&copy; 2019</div>
        </v-footer>
    </section>
</template>

<script>
    import {api} from "../../main";

    export default {
        data: () => ({
            event: null
        }),
        created() {
            let id = parseInt(this.$route.params.id)
            if (id) {
                this.$http.get(api + '/events/' + id).then(response => {
                    this.event = response.data
                }).catch(() => {
                    this.$router.push('/')
                })
            }
        }
    }
</script>

<style scoped>

</style>
