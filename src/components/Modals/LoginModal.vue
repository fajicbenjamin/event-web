<template>
    <form action="">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p v-if="!registerToggle" class="modal-card-title">Enter your credentials in order<br> to make reservation</p>
                <p v-if="registerToggle" class="modal-card-title">Fill form to sign up</p>
            </header>
            <section class="modal-card-body">
                <b-field v-show="registerToggle" label="Name">
                    <b-input
                            type="text"
                            v-model="name"
                            placeholder="Your Name"
                            required>
                    </b-input>
                </b-field>

                <b-field label="Email">
                    <b-input
                            type="email"
                            v-model="email"
                            placeholder="Your Email"
                            required>
                    </b-input>
                </b-field>

                <b-field label="Password">
                    <b-input
                            type="password"
                            v-model="password"
                            password-reveal
                            placeholder="Your password"
                            required>
                    </b-input>
                </b-field>
                <p v-if="!registerToggle">You are not member? <a href="#" @click.prevent="registerToggle = true">Sign up</a> here.</p>
                <p v-if="registerToggle">You are member? Click <a href="#" @click.prevent="registerToggle = false">here</a> to login.</p>
                <span v-show="failed">Your email and password don't match.</span>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Close</button>
                <button v-if="!registerToggle" class="button is-primary" @click.prevent="login">Login</button>
                <button v-if="registerToggle" class="button is-primary" @click.prevent="signUp">Sign up</button>
            </footer>
        </div>
    </form>
</template>

<script>
    import {api} from "../../main";

    export default {
        props: ['register'],
        data: () => ({
            name: '',
            email: '',
            password: '',
            failed: false,
            registerToggle: false,
        }),
        methods: {
            login() {
                let formData = new FormData()
                formData.append('email', this.email)
                formData.append('password', this.password)

                this.$http.post(`${api}members/login`, formData).then((response) => {
                    localStorage.setItem('member', response.data)
                    this.$store.commit('setMember', response.data)
                    this.$parent.close()
                    this.$toast.open({
                        message: 'You successfully logged in',
                        type: 'is-success'
                    })
                }).catch(() => {
                    this.failed = true
                })
            },
            signUp() {
                let formData = new FormData()
                formData.append('name', this.name)
                formData.append('email', this.email)
                formData.append('password', this.password)
                this.$http.post(`${api}members`, formData).then((response) => {
                    localStorage.setItem('member', response.data)
                    this.$store.commit('setMember', response.data)
                    this.$parent.close()
                    this.$toast.open({
                        message: 'You are successfully registered',
                        type: 'is-success'
                    })
                }).catch(() => {
                })
            }
        },
        created() {
            this.registerToggle = this.register
        }
    }
</script>

<style scoped>
    span{
        color: red;
    }
</style>
