<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <input type="text" v-model="username" placeholder="username">
    <input type="password" v-model="password" placeholder="password">
    <button @click="login">Login</button>
  </div>
</template>

<script>
  /* eslint-disable no-console */
import {api} from "../main";

export default {
  name: 'Index',
  props: {
    msg: String
  },
  data: () => ({
    username: '',
    password: '',
    user: ''
  }),
  methods: {
    login() {
      this.$http.post(api + '/login', {
        username: this.username,
        password: this.password
      }).then(response => {
        localStorage.setItem('authorization', response.headers.authorization)
      })
    }
  },
  created() {
    console.log(localStorage.getItem('authorization'))
    this.$http.get(api + '/events', {
      headers: {
        Authorization: localStorage.getItem('authorization')
      }
    }).then( response => {
      console.log(response.data)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
