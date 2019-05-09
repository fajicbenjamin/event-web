<template>
    <section>
        <v-card-actions>
            <span class="center headline">{{ $tc('location', 2) }}</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click="$router.push('locations/create')">New {{ $tc('location') }}</v-btn>
        </v-card-actions>
        <b-table
                :data="isEmpty ? [] : locations"
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

                <b-table-column field="address" :label="$i18n.tc('address')">
                    {{ props.row.address }}
                </b-table-column>

                <b-table-column :label="$i18n.tc('city')">
                    {{ props.row.city }}
                </b-table-column>

                <b-table-column :label="$i18n.tc('country')">
                    {{ props.row.country }}
                </b-table-column>

                <b-table-column :label="$i18n.tc('action', 2)">
                    <v-btn icon small @click="editLocation(props.row.id)">
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn icon small @click="deleteLocation(props.row.id, props.index)">
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
    import { mapGetters } from 'vuex'
    import {api} from "../../../main";

    export default {
        components: {BTableColumn},
        computed: {
            ...mapGetters({
                isLoggedIn: 'isLoggedIn',
                events: 'getEvents'
            }),
        },
        methods: {
            editLocation(id) {
                this.$router.push(`locations/${id}`)
            },
            deleteLocation(id, index) {
                this.$http.delete(api + '/locations/' + id).then(() => {
                    this.locations.splice(index, 1)
                    this.$toast.open({
                        message: 'Successfully deleted location!',
                        type: 'is-success'
                    })
                })
            }
        },
        data() {
            return {
                locations: [],
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
            this.$http.get(api + '/locations').then(response => {
                this.locations = response.data.content
            })
        }
    }
</script>

<style scoped>

</style>
