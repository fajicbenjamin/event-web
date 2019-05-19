<template>
    <div>
        <b-modal :active.sync="isComponentModalActive" has-modal-card>
            <login-modal :register="false"></login-modal>
        </b-modal>
        <v-toolbar>
            <a href="/"><v-toolbar-title>{{ $t('app') }}</v-toolbar-title></a>

            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn v-if="!member" flat @click="isComponentModalActive = true">Member login</v-btn>
                <v-menu v-else offset-y>
                    <template #activator="{ on }">
                        <v-btn small flat v-on="on">
                            <v-icon>perm_identity</v-icon> {{ memberName }}
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-tile
                                v-for="(item, index) in options"
                                :key="index"
                                @click="logout"
                        >
                            <v-list-tile-title>Logout</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
            <language></language>
        </v-toolbar>
    </div>
</template>

<script>
    import LoginModal from './Modals/LoginModal'
    import Language from "./Language";
    import { mapGetters } from 'vuex'

    export default {
        components: {
            Language,
            LoginModal
        },
        computed: {
            ...mapGetters({
                member: 'getMember'
            }),
            memberName() {
                let member = this.member
                return member.substring(member.indexOf('-') + 1, member.lastIndexOf('-'))
            }
        },
        data: () => ({
            isComponentModalActive: false,
            options: ['Logout']
        }),
        methods: {
            logout() {
                this.$store.commit('setMember', null)
                localStorage.removeItem('member')
            }
        },
        created() {
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
        color: #2c3e50;
    }
</style>
