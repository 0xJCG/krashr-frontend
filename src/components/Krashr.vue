<template>
  <div id="krashr">
    <top-nav v-bind:loggedIn="loggedIn"></top-nav>
    <router-view v-on:isLoggedIn="isLoggedIn"></router-view>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav'

export default {
  name: 'krashr',
  components: { TopNav },
  data: function () {
    return {
      loggedIn: false
    }
  },
  methods: {
    isLoggedIn: function (l) {
      this.loggedIn = l
    }
  }
}
</script>

<style scoped>
</style>
