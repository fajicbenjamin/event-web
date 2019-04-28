<template>
    <section>
        <b-field grouped group-multiline>
            <div class="control">
                <b-switch v-model="isBordered">Bordered</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="isStriped">Striped</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="isNarrowed">Narrowed</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="isHoverable">Hoverable</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="isFocusable">Focusable</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="isLoading">Loading state</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="isEmpty">Empty</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="hasMobileCards">Mobile cards <small>(collapsed rows)</small></b-switch>
            </div>
        </b-field>

        <b-table
                :data="isEmpty ? [] : data"
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

                <b-table-column field="name" label="Name">
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column field="description" label="Description">
                    {{ props.row.description }}
                </b-table-column>

                <b-table-column field="date" label="Start time" centered>
                    <span class="tag is-success">
                        {{ new Date(props.row.startTime).toLocaleString() }}
                    </span>
                </b-table-column>

                <b-table-column label="Available places">
                    {{ props.row.availablePlaces }}
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
                        <p>Nothing here.</p>
                    </div>
                </section>
            </template>
        </b-table>
    </section>
</template>

<script>
    // import {api} from "../main";
    export default {
        props: ['data'],
        data() {
            return {
                isEmpty: false,
                isBordered: false,
                isStriped: false,
                isNarrowed: false,
                isHoverable: false,
                isFocusable: false,
                isLoading: false,
                hasMobileCards: true
            }
        }
    }
</script>

<style scoped>

</style>
