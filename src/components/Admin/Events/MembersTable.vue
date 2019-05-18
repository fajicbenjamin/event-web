<template>
    <b-table
            :data="isEmpty ? [] : event.memberList"
            :bordered="true"
            :striped="true"
            :mobile-cards="true">

        <template slot-scope="props">
            <b-table-column field="id" label="ID" width="40" numeric>
                {{ props.row.id }}
            </b-table-column>

            <b-table-column field="name" :label="$i18n.tc('name')">
                {{ props.row.name }}
            </b-table-column>

            <b-table-column field="description" :label="$i18n.tc('description')">
                {{ props.row.email }}
            </b-table-column>

            <b-table-column :label="$i18n.tc('action', 2)">
                <v-btn icon small @click="deleteGuest(props.row.id, props.index)">
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
</template>

<script>
    import BTableColumn from "buefy/src/components/table/TableColumn";
    import {api} from "../../../main";

    export default {
        components: {
            BTableColumn
        },
        props: ['event'],
        data: () => ({
            isEmpty: false,
            search: '',
            selected: [],
            headers: [
                { text: 'ID', align: 'left', value: 'id' },
                {text: 'Name', align: 'center', value: 'name'},
                {text: 'Email', align: 'center', value: 'email'},
            ]
        }),
        created() {
        },
        methods: {
            deleteGuest(id, index) {
                this.$http.get(api + 'events/' + this.event.id + '/remove-guest/' + id).then(() => {
                    this.event.memberList.splice(index, 1)
                    this.$toast.open({
                        message: 'Successfully removed guest from the list!',
                        type: 'is-success'
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>
