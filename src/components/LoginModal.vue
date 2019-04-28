<template>
    <form action="">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Login</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Email">
                    <b-input
                            type="text"
                            v-model="username"
                            placeholder="Your username"
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
                <span v-show="failed">Your username and password don't match.</span>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Close</button>
                <button class="button is-primary" @click.prevent="login">Login</button>
            </footer>
        </div>
    </form>
</template>

<script>
    // import {api} from "../main";
    export default {
        data: () => ({
            username: '',
            password: '',
            failed: false,
        }),
        methods: {
            login() {
                let promise = this.$store.dispatch('login', {username: this.username, password: this.password})
                promise.then(response => {
                        localStorage.setItem('token', response.headers.authorization)
                        this.$parent.close()
                        this.$toast.open({
                            message: 'You successfully logged in!',
                            type: 'is-success'
                        })
                    }).catch((error) => {
                        console.log(error.response)
                        this.failed = true
                    })
            }
        }
    }
</script>

<style scoped>
    span{
        color: red;
    }
</style>
