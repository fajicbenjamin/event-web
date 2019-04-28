<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <p>{{ $t('message.hello') }}</p>

    <section>
      <event-table :data="events"></event-table>
    </section>

    <section>
      <button class="button is-primary is-medium"
              @click="isComponentModalActive = true">
        Login
      </button>

      <b-modal :active.sync="isComponentModalActive" has-modal-card>
        <login-modal></login-modal>
      </b-modal>
    </section>
  </div>
</template>

<script>
import {api} from "../main";
import { mapGetters } from 'vuex'
import LoginModal from '../components/LoginModal'
import EventTable from './EventTable'

export default {
  components: {
    LoginModal,
    EventTable
  },
  name: 'Index',
  props: {
    msg: String
  },
  data: () => ({
    isComponentModalActive: false,
    events: []
  }),
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
    }),
  },
  methods: {
    // methods
  },
  created() {
    console.log(this.isLoggedIn)
    this.$http.get(api + '/events').then( response => {
      this.events = response.data.content
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
