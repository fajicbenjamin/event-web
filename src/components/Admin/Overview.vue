<template>
    <div>
        <span class="center headline">{{ $t('overview') }}</span>

        <v-layout wrap>
            <v-flex xs12 sm3>
                <v-card color="blue-grey darken-2" class="white--text">
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">{{ $tc('event', 2) }}</div>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                       {{ count }} {{ $tc('event', count).toLowerCase() + ' ' + $t('upcoming') }}
                    </v-card-actions>
                </v-card>
            </v-flex>

            <v-flex xs12 sm3 offset-sm1>
                <v-card color="cyan darken-2" class="white--text">
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">{{ $t('next') + ' ' + $tc('event', 1).toLowerCase() }}</div>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        {{ nextEvent.name }}
                    </v-card-actions>
                </v-card>
            </v-flex>

            <v-flex xs12 sm3 offset-sm1>
                <v-card color="purple darken-2" class="white--text">
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">{{ $tc('guest', 2) }}</div>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        {{ guestsCount + ' ' + $t('guestsRegistered') }}
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>


    </div>
</template>

<script>
    import {api} from "../../main";

    export default {
        data: () => ({
            count: 0,
            nextEvent: '',
            guestsCount: 0
        }),
        created() {
            this.$http.get(api + 'events/overview').then((response) => {
                this.count = response.data.incomingEvents
                this.nextEvent = response.data.nextEvent
                this.guestsCount = this.nextEvent.memberList.length
            })
        }
    }
</script>

<style scoped>

</style>
