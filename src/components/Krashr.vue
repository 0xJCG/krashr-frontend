<template>
  <div id="krashr">
    <top-nav></top-nav>
    <router-view v-on:languageChanged="updateLanguage"></router-view>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav'

export default {
  name: 'krashr',
  components: { TopNav },
  methods: {
    updateLanguage: function (l) {
      this.$emit('languageChanged', l)
    }
  }
}
</script>

<style scoped>
</style>
