<template>
    <section>
<!--        <span class="center headline">{{ $tc('event', 2) }}</span>-->
        <span class="center headline">{{ create ? 'Create' : 'Edit' }} event</span>
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
                        <v-flex xs12 sm6 md3>
                            <v-menu
                                    v-model="picker1"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    min-width="290px"
                            >
                                <template #activator="{ on }">
                                    <v-text-field
                                            v-model="form.startPickerDate"
                                            :label="$i18n.tc('startDate')"
                                            prepend-icon="event"
                                            v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="form.startPickerDate" @input="picker1 = false" locale="sk"></v-date-picker>
                            </v-menu>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-menu
                                    ref="menu"
                                    v-model="picker2"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    :return-value.sync="form.startPickerTime"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px"
                            >
                                <template #activator="{ on }">
                                    <v-text-field
                                            v-model="form.startPickerTime"
                                            :label="$i18n.tc('startTime')"
                                            prepend-icon="access_time"
                                            required
                                            v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-time-picker
                                        v-if="picker2"
                                        v-model="form.startPickerTime"
                                        full-width
                                        format="24hr"
                                        @click:minute="$refs.menu.save(form.startPickerTime)"
                                ></v-time-picker>
                            </v-menu>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea
                                    v-model="form.description"
                            >
                                <template #label>
                                    <div>
                                        Description
                                    </div>
                                </template>
                            </v-textarea>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-select
                                    v-model="form.category"
                                    :items="categoryNames"
                                    :label="$i18n.tc('category')"
                                    required
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-select
                                    v-model="form.location"
                                    :items="locationNames"
                                    :label="$i18n.tc('location')"
                                    required
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm4>
                            <v-text-field
                                    mask="######"
                                    :label="$i18n.tc('availablePlaces')"
                                    v-model="form.availablePlaces"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm2>
                            <v-switch v-model="form.repeating" :label="$i18n.tc('repeating')"></v-switch>
                        </v-flex>
                        <v-flex xs12 sm2>
                            <v-switch v-model="form.registration" :label="$i18n.tc('registration')"></v-switch>
                        </v-flex>
                        <v-flex xs12 sm2>
                            <label>File
                                <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                            </label>
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
                <hr>
                <v-flex xs10 class="member-table" v-if="currentEvent">
                    <span class="font-weight-thin title">Guests on this event</span>
                    <members-table :event="currentEvent"></members-table>
                </v-flex>
            </v-form>
        </v-card>
    </section>
</template>

<script>
    import {api} from "../../../main";
    import MembersTable from './MembersTable.vue'

    export default {
        components: {
          MembersTable
        },
        data: () => ({
            currentEvent: null,
            create: true,
            form: {
                name: '',
                description: '',
                startPickerDate: new Date().toISOString().substr(0, 10),
                startPickerTime: null,
                category: '',
                location: '',
                availablePlaces: 0,
                repeating: false,
                registration: false,
            },
            rules: {
                name: [val => (val || '').length > 0 || 'This field is required']
            },
            categories: [],
            categoryNames: [],
            locations: [],
            locationNames: [],
            picker1: false,
            picker2: false,
            picker3: false,
            picker4: false,
            file: ''
        }),
        computed: {
            formIsValid () {
                return (
                    this.form.name &&
                    this.form.description &&
                    this.form.category &&
                    this.form.location &&
                    this.form.startPickerTime &&
                    this.form.startPickerDate
                )
            }
        },
        methods: {
            submit () {
                // if (!this.isValidDate(this.form.startPickerDate)) {
                //     this.$toast.open({
                //         message: 'Your start date is not good!',
                //         type: 'is-danger'
                //     })
                //     return
                // }
                if (!this.isValidTime(this.form.startPickerTime)) {
                    this.$toast.open({
                        message: 'Your start time is not good!',
                        type: 'is-danger'
                    })
                    return
                }

                let startTime = new Date(this.form.startPickerDate + ' ' + this.form.startPickerTime);

                let formData = new FormData()

                formData.append('name', this.form.name)
                formData.append('description', this.form.description)
                formData.append('startTime', startTime.toISOString())
                formData.append('endTime', startTime.toISOString())
                formData.append('availablePlaces', this.form.availablePlaces)
                formData.append('repeating', this.form.repeating)
                formData.append('registration', this.form.registration)
                formData.append('category_id', this.categories.find(x => x.name === this.form.category).id)
                formData.append('location_id', this.locations.find(x => x.name === this.form.location).id)
                formData.append('file', this.file)

                if (this.create) {
                    this.$http.post(api + 'events', formData).then(response => {
                        console.log(response)
                        this.$toast.open({
                            message: 'Successfully created event!',
                            type: 'is-success'
                        })
                    }).catch(error => {
                        console.log(error)
                        this.$toast.open({
                            message: 'Error while creating event!',
                            type: 'is-danger'
                        })
                    })
                } else {
                    this.$http.put(api + 'events/' + this.currentEvent.id, formData).then(response => {
                        console.log(response)
                        this.$toast.open({
                            message: 'Successfully updated event!',
                            type: 'is-success'
                        })
                    }).catch(error => {
                        console.log(error)
                        this.$toast.open({
                            message: 'Error while updating event!',
                            type: 'is-danger'
                        })
                    })
                }
            },
            isValidDate(d) {
                return d instanceof Date && !isNaN(d);
            },
            isValidTime(t) {
                return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(t);
            },
            handleFileUpload(){
                this.file = this.$refs.file.files[0];
            }
        },
        created() {
            this.$http.get(api + 'categories').then(response => {
                this.categories = response.data.content
                this.categories.forEach(category => {
                    this.categoryNames.push(category.name)
                })
            })
            this.$http.get(api + 'locations').then(response => {
                this.locations = response.data.content
                this.locations.forEach(location => {
                    this.locationNames.push(location.name)
                })
            })

            let id = parseInt(this.$route.params.id)
            if (id) {
                this.create = false
                this.$http.get(api + 'events/' + id).then(response => {
                    this.currentEvent = response.data
                    this.form.name = this.currentEvent.name
                    this.form.description = this.currentEvent.description
                    this.form.availablePlaces = this.currentEvent.availablePlaces
                    this.form.registration = this.currentEvent.registration
                    this.form.repeating = this.currentEvent.repeating
                    this.form.category = this.categoryNames.find(x => x === this.currentEvent.category.name)
                    this.form.location = this.locationNames.find(x => x === this.currentEvent.location.name)
                    this.form.startPickerDate = this.currentEvent.startTime.substr(0, 10) // take date from timestamp
                    this.form.startPickerTime = this.currentEvent.startTime.substr(11, 5) // take time from timestamp
                }).catch(() => {
                    this.$router.push('/admin/events')
                })
            } else if (this.$route.params.id !== 'create') {
                this.$router.push('/admin/events')
            }
        }
    }
</script>

<style scoped>
    .member-table {
        margin: 20px auto;
        padding-bottom: 20px;
        text-align: center;
    }
    section {
        padding-bottom: 20px;
        margin-bottom: 20px;
    }
</style>
