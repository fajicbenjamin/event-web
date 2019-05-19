<template>
    <section>
        <v-card-actions>
            <span class="center headline">{{ $tc('event', 2) }}</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click="$router.push('events/create')">{{ $tc('event') }} <v-icon>add</v-icon></v-btn>
        </v-card-actions>

        <b-table
                :data="isEmpty ? [] : events"
                :bordered="isBordered"
                :striped="isStriped"
                :narrowed="isNarrowed"
                :hoverable="isHoverable"
                :loading="isLoading"
                :focusable="isFocusable"
                :mobile-cards="hasMobileCards">

            <template slot-scope="props">
                <b-table-column field="id" label="ID" width="40" numeric>
                    {{ props.row.id }}
                </b-table-column>

                <b-table-column field="name" :label="$i18n.tc('name')">
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column field="description" :label="$i18n.tc('description')">
                    {{ props.row.description }}
                </b-table-column>

                <b-table-column field="date" :label="$i18n.tc('startTime')" centered>
                    <span class="tag is-success">
                        {{ new Date(props.row.startTime).toLocaleString() }}
                    </span>
                </b-table-column>

                <b-table-column :label="$i18n.tc('availablePlaces')">
                    {{ props.row.availablePlaces }}
                </b-table-column>

                <b-table-column :label="$i18n.tc('category')">
                    {{ props.row.category.name }}
                </b-table-column>

                <b-table-column :label="$i18n.tc('location')">
                    {{ props.row.location.name }}
                </b-table-column>

                <b-table-column :label="$i18n.tc('action', 2)">
                    <v-btn icon small @click="editEvent(props.row.id)">
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn icon small @click="deleteEvent(props.row.id, props.index)">
                        <v-icon>delete</v-icon>
                    </v-btn>
                </b-table-column>
            </template>

            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                    icon="emoticon-sad"
                                    size="is-large">
                            </b-icon>
                        </p>
                        <p>{{ $t('emptyTable') }}</p>
                    </div>
                </section>
            </template>
        </b-table>
    </section>
</template>

<script>
    import BTableColumn from "buefy/src/components/table/TableColumn";
    import {api} from "../../../main";

    export default {
        components: {BTableColumn},
        methods: {
            editEvent(id) {
                // let event = this.events.find(x => x.id === id)
                // this.$store.commit('setCurrentEvent', event)
                this.$router.push(`events/${id}`)
            },
            deleteEvent(id, index) {
                this.$http.delete(api + 'events/' + id).then(() => {
                    this.events.splice(index, 1)
                    this.$toast.open({
                        message: 'Successfully deleted event!',
                        type: 'is-success'
                    })
                })
            }
        },
        data() {
            return {
                events: [],
                isEmpty: false,
                isBordered: true,
                isStriped: true,
                isNarrowed: false,
                isHoverable: false,
                isFocusable: false,
                isLoading: false,
                hasMobileCards: true
            }
        },
        created() {
            this.$http.get(api + 'events').then(response => {
                this.events = response.data
            })
        }
    }
</script>

<style scoped>

</style>
