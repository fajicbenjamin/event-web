<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Login</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field prepend-icon="person" name="username" :label="$i18n.tc('username')" type="text" v-model="username"></v-text-field>
                                    <v-text-field id="password" prepend-icon="lock" name="password" :label="$i18n.tc('password')" type="password" v-model="password"></v-text-field>
                                    <span v-show="failed">Your username and password don't match.</span>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="login">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        data: () => ({
            username: '',
            password: '',
            failed: false
        }),
        methods: {
            login() {
                let promise = this.$store.dispatch('login', {username: this.username, password: this.password})
                promise.then(response => {
                    localStorage.setItem('token', response.headers.authorization)
                    this.$toast.open({
                        message: this.$i18n.tc('successfullyLogged'),
                        type: 'is-success'
                    })
                    this.$router.push('/admin')
                }).catch(() => {
                    this.failed = true
                })
            }
        }
    }
</script>

<style scoped>
    span {
        color: red;
    }
</style>
