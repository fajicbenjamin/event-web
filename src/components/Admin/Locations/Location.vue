<template>
    <section>
        <span class="center headline">{{ create ? 'Create' : 'Edit' }} location</span>
        <v-card flat>
            <v-form ref="form" @submit.prevent="submit">
                <v-container grid-list-xl fluid>
                    <v-layout wrap>
                        <v-flex xs12 sm6>
                            <v-text-field
                                    v-model="form.name"
                                    :rules="rules.field"
                                    :label="$i18n.tc('name')"
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                                    v-model="form.address"
                                    :rules="rules.field"
                                    :label="$i18n.tc('address')"
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                                    v-model="form.country"
                                    :rules="rules.field"
                                    :label="$i18n.tc('country')"
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                                    v-model="form.region"
                                    :label="$i18n.tc('region')"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    v-model="form.city"
                                    :rules="rules.field"
                                    :label="$i18n.tc('city')"
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                                    v-model="form.latitude"
                                    :rules="rules.field"
                                    :label="$i18n.tc('latitude')"
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                                    v-model="form.longitude"
                                    :rules="rules.field"
                                    :label="$i18n.tc('longitude')"
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
                country: '',
                region: '',
                city: '',
                address: '',
                latitude: '',
                longitude: ''
            },
            rules: {
                email: [val => !!val || 'This field is required']
            },
            location: null,
            create: true
        }),
        computed: {
            formIsValid () {
                return (
                    this.form.name &&
                    this.form.city &&
                    this.form.address
                )
            }
        },
        methods: {
            submit () {
                let formData = {
                    name: this.form.name,
                    country: this.form.country,
                    region: this.form.region,
                    city: this.form.city,
                    address: this.form.address,
                    latitude: this.form.latitude,
                    longitude: this.form.longitude
                }

                if (this.create) {
                    this.$http.post(api + 'locations', formData).then(response => {
                        console.log(response)
                        this.$toast.open({
                            message: 'Successfully created location!',
                            type: 'is-success'
                        })
                    }).catch(error => {
                        console.log(error)
                        this.$toast.open({
                            message: 'Error while creating location!',
                            type: 'is-danger'
                        })
                    })
                } else {
                    this.$http.put(api + 'locations/' + this.location.id, formData).then(response => {
                        console.log(response)
                        this.$toast.open({
                            message: 'Successfully updated location!',
                            type: 'is-success'
                        })
                    }).catch(error => {
                        console.log(error)
                        this.$toast.open({
                            message: 'Error while updating location!',
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
                this.$http.get(api + 'locations/' + id).then(response => {
                    this.location = response.data
                    this.form.name = this.location.name
                    this.form.country = this.location.country
                    this.form.region = this.location.region
                    this.form.city = this.location.city
                    this.form.address = this.location.address
                    this.form.latitude = this.location.latitude
                    this.form.longitude = this.location.longitude
                }).catch(() => {
                    this.$router.push('/admin/locations')
                })
            } else if (this.$route.params.id !== 'create') {
                this.$router.push('/admin/locations')
            }
        }
    }
</script>

<style scoped>

</style>
