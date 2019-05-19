<template>
    <section>
        <v-card-actions>
            <span class="center headline">{{ $tc('category', 2) }}</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click="$router.push('categories/create')">{{ $tc('category') }} <v-icon>add</v-icon></v-btn>
        </v-card-actions>
        <b-table
                :data="isEmpty ? [] : categories"
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

                <b-table-column :label="$i18n.tc('action', 2)">
                    <v-btn icon small @click="editCategory(props.row.id)">
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn icon small @click="deleteCategory(props.row.id, props.index)">
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
            editCategory(id) {
                this.$router.push(`categories/${id}`)
            },
            deleteCategory(id, index) {
                this.$http.delete(api + 'categories/' + id).then(() => {
                    this.categories.splice(index, 1)
                    this.$toast.open({
                        message: 'Successfully deleted category!',
                        type: 'is-success'
                    })
                })
            }
        },
        data() {
            return {
                categories: [],
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
            this.$http.get(api + 'categories').then(response => {
                this.categories = response.data.content
            })
        }
    }
</script>

<style scoped>

</style>
