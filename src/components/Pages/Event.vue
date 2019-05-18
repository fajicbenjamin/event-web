<template>
    <div>
        <b-modal :active.sync="isComponentModalActive" has-modal-card>
            <login-modal></login-modal>
        </b-modal>
        <navbar></navbar>
        <section v-if="event">
            <v-flex xs12 sm6 offset-sm3 class="card-custom" hover>
                <v-card>
                    <v-img :src="api + event.imagePath" aspect-ratio="2"></v-img>

                    <v-card-title primary-title>
                        <div>
                            <span class="font-weight-thin display-2">{{ event.name }}</span>
                            <p class="font-weight-thin title">
                                {{ event.description }}
                            </p>
                            <div>
                                {{ new Date(event.startTime).toLocaleString() }}
                            </div>
                            <div>
                                {{ $t('availablePlaces') }}: <span class="tag" :class="available">{{ event.availablePlaces }}</span>
                            </div>
                            <div>
                                {{ $tc('category') }}: {{ event.category.name }}
                            </div>
                            <hr>
                            <div>
                                <div><span class="title">{{ event.location.name }}</span></div>
                                <div>{{ event.location.address }}</div>
                                <div>{{ event.location.city }}, {{ event.location.country }}</div>
                            </div>
                        </div>
                    </v-card-title>

                    <v-card-actions class="card-actions">
                        <v-btn v-if="!event.registration" @click="isComponentModalActive = true">{{ $t('reserve') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </section>
    </div>
</template>

<script>
    import {api} from "../../main";
    import Navbar from "../Navbar";
    import LoginModal from "../LoginModal";

    export default {
        components: {LoginModal, Navbar},
        data: () => ({
            event: null,
            isComponentModalActive: false,
            api
        }),
        computed: {
          available() {
              return this.event.availablePlaces > 0 ? 'is-success' : 'is-danger'
          }
        },
        created() {
            let id = parseInt(this.$route.params.id)
            if (id) {
                this.$http.get(api + 'events/' + id).then(response => {
                    this.event = response.data
                }).catch(() => {
                    this.$router.push('/')
                })
            }
        }
    }
</script>

<style scoped>
    .card-custom {
        margin-bottom: 30px;
        padding-bottom: 50px;
    }
    .card-actions {
        padding-bottom: 30px;
        padding-left: 15px;
    }

    @media (min-width: 768px) {
        .card-custom {
            margin-top: 20px;
        }
    }
</style>
