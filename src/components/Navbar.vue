<template>
    <div>
        <b-modal :active.sync="isComponentModalActive" has-modal-card>
            <login-modal></login-modal>
        </b-modal>
        <v-toolbar>
            <a href="/"><v-toolbar-title>{{ $t('app') }}</v-toolbar-title></a>

            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat @click="isComponentModalActive = true">Member login</v-btn>
            </v-toolbar-items>
            <language></language>
        </v-toolbar>
    </div>
</template>

<script>
    import LoginModal from '../components/LoginModal'
    import Language from "./Language";
    export default {
        components: {
            Language,
            LoginModal
        },
        data: () => ({
            isComponentModalActive: false
        }),
    }
</script>

<style scoped>
    a {
        text-decoration: none;
        color: #2c3e50;
    }
</style>
