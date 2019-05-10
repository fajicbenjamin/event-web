<template>
  <v-app>
    <div id="app">
      <div>
        <router-view/>
      </div>
      <v-footer class="pa-3 v-footer--absolute" :inset="true">
        <v-spacer></v-spacer>
        <div v-html="$t('footer')"></div>
      </v-footer>
    </div>
  </v-app>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  created() {
    let promise = this.$store.dispatch('fetchEvents', { self: this })
    this.$store.commit('setPromise', promise)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
