<template>
  <div>
    <navbar></navbar>

    <v-flex sm8 offset-sm2 class="calendar-container mt-3">
      <span class="font-weight-thin display-2">{{ $tc('event', 2) }}</span>
      <event-calendar></event-calendar>
    </v-flex>

  </div>
</template>

<script>
  import {api} from "../main";
  import EventCalendar from "./EventCalendar";
  import Navbar from "./Navbar";

  export default {
    components: {
      EventCalendar,
      Navbar
    },
    name: 'Index',
    data: () => ({
      isComponentModalActive: false,
      events: []
    }),
    methods: {
      // methods
    },
    created() {
      this.$http.get(api + 'events').then(response => {
        this.events = response.data
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
  .calendar-container {
    text-align: center;
    margin-bottom: 10vh;
  }
</style>
