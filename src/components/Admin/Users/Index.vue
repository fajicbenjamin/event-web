<template>
    <section>
        <v-card-actions>
            <span class="center headline">{{ $tc('user', 2) }}</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click="$router.push('users/create')">New {{ $tc('user') }}</v-btn>
        </v-card-actions>
        <b-table
                :data="isEmpty ? [] : users"
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

                <b-table-column field="username" :label="$i18n.tc('username')">
                    {{ props.row.username }}
                </b-table-column>

                <b-table-column field="email" label="Email">
                    {{ props.row.email }}
                </b-table-column>

                <b-table-column label="Admin">
                    <v-icon v-if="props.row.admin">check</v-icon>
                    <v-icon v-else>close</v-icon>
                </b-table-column>

                <b-table-column :label="$i18n.tc('action', 2)">
                    <v-btn icon small @click="editUser(props.row.id)">
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn icon small @click="deleteUser(props.row.id, props.index)">
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
            editUser(id) {
                this.$router.push(`users/${id}`)
            },
            deleteUser(id, index) {
                this.$http.delete(api + 'users/' + id).then(() => {
                    this.users.splice(index, 1)
                    this.$toast.open({
                        message: 'Successfully deleted user!',
                        type: 'is-success'
                    })
                })
            }
        },
        data() {
            return {
                users: [],
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
            this.$http.get(api + 'users').then(response => {
                this.users = response.data
            })
        }
    }
</script>

<style scoped>

</style>
