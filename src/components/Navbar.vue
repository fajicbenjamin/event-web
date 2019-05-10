<template>
    <div>
        <b-modal :active.sync="isComponentModalActive" has-modal-card>
            <login-modal></login-modal>
        </b-modal>
        <v-toolbar>
            <img src="@/assets/logo.png" :alt="$i18n.t('app')" style="height: 60px;">
            <v-toolbar-title>{{ $t('app') }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat @click="isComponentModalActive = true">Member login</v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </div>
</template>

<script>
    import LoginModal from '../components/LoginModal'
    export default {
        components: {
            LoginModal
        },
        data: () => ({
            isComponentModalActive: false
        }),
    }
</script>

<style scoped>

</style>
