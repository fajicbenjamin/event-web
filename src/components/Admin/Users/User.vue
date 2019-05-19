<template>
    <section>
        <span class="center headline">{{ create ? 'Create' : 'Edit' }} user</span>
        <v-card flat>
            <v-form ref="form" @submit.prevent="submit">
                <v-container grid-list-xl fluid>
                    <v-layout wrap>
                        <v-flex xs12 sm6>
                            <v-text-field
                                    v-model="form.username"
                                    :rules="rules.username"
                                    :label="$i18n.tc('username')"
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                                    type="email"
                                    v-model="form.email"
                                    :rules="rules.email"
                                    label="Email"
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-switch v-model="form.isAdmin" label="Admin"></v-switch>
                        </v-flex>
                        <v-flex xs12 sm4>
                            <v-text-field
                                    type="password"
                                    :label="$i18n.tc('password')"
                                    v-model="form.password"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            :disabled="!formIsValid"
                            flat
                            color="primary"
                            type="submit"
                    >Save</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </section>
</template>

<script>
    import {api} from "../../../main";

    export default {
        data: () => ({
            form: {
                username: '',
                email: '',
                password: '',
                isAdmin: false,
            },
            rules: {
                username: [val => (val || '').length > 0 || 'This field is required'],
                email: [val => !!val || 'E-mail is required',
                    val => /.+@.+/.test(val) || 'E-mail must be valid'],
                password: [val => (val || '').length > 6 || 'Password has to be at least 6 characters']
            },
            user: null,
            create: true
        }),
        computed: {
            formIsValid () {
                return (
                    this.form.username &&
                    this.form.email
                )
            }
        },
        methods: {
            submit () {
                let formData = {
                    username: this.form.username,
                    email: this.form.email,
                    admin: this.form.isAdmin
                }

                if (this.create) {
                    this.$http.post(api + 'users', formData).then(() => {
                        this.$toast.open({
                            message: 'Successfully created user!',
                            type: 'is-success'
                        })
                    }).catch(() => {
                        this.$toast.open({
                            message: 'Error while creating user!',
                            type: 'is-danger'
                        })
                    })
                } else {
                    if (this.form.password !== '') {
                        formData.password = this.form.password
                    }
                    this.$http.put(api + 'users/' + this.user.id, formData).then(() => {
                        this.$toast.open({
                            message: 'Successfully updated user!',
                            type: 'is-success'
                        })
                    }).catch(() => {
                        this.$toast.open({
                            message: 'Error while updating user!',
                            type: 'is-danger'
                        })
                    })
                }
            },
        },
        created() {
            let id = parseInt(this.$route.params.id)
            if (id) {
                this.create = false
                this.$http.get(api + 'users/' + id).then(response => {
                    this.user = response.data
                    this.form.username = this.user.username
                    this.form.email = this.user.email
                    this.form.isAdmin = this.user.admin
                }).catch(() => {
                    this.$router.push('/admin/users')
                })
            } else if (this.$route.params.id !== 'create') {
                this.$router.push('/admin/users')
            }
        }
    }
</script>

<style scoped>

</style>
