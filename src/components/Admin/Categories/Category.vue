<template>
    <section>
        <span class="center headline">{{ create ? 'Create' : 'Edit' }} category</span>
        <v-card flat>
            <v-form ref="form" @submit.prevent="submit">
                <v-container grid-list-xl fluid>
                    <v-layout wrap>
                        <v-flex xs12 sm6>
                            <v-text-field
                                    v-model="form.name"
                                    :rules="rules.name"
                                    :label="$i18n.tc('name')"
                                    required
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
                name: '',
            },
            rules: {
                name: [val => (val || '').length > 0 || 'This field is required']
            },
            category: null,
            create: true
        }),
        computed: {
            formIsValid () {
                return (
                    this.form.name
                )
            }
        },
        methods: {
            submit () {
                let formData = {
                    name: this.form.name
                }

                if (this.create) {
                    this.$http.post(api + 'categories', formData).then(response => {
                        console.log(response)
                        this.$toast.open({
                            message: 'Successfully created category!',
                            type: 'is-success'
                        })
                    }).catch(error => {
                        console.log(error)
                        this.$toast.open({
                            message: 'Error while creating category!',
                            type: 'is-danger'
                        })
                    })
                } else {
                    if (this.form.password !== '') {
                        formData.password = this.form.password
                    }
                    console.log('da', formData)
                    this.$http.put(api + 'categories/' + this.category.id, formData).then(response => {
                        console.log(response)
                        this.$toast.open({
                            message: 'Successfully updated category!',
                            type: 'is-success'
                        })
                    }).catch(error => {
                        console.log(error)
                        this.$toast.open({
                            message: 'Error while updating category!',
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
                this.$http.get(api + 'categories/' + id).then(response => {
                    this.category = response.data
                    this.form.name = this.category.name
                }).catch(() => {
                    this.$router.push('/admin/categories')
                })
            } else if (this.$route.params.id !== 'create') {
                this.$router.push('/admin/categories')
            }
        }
    }
</script>

<style scoped>

</style>
