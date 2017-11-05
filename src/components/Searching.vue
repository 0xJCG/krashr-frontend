<template>
  <div id="searching">

    <div class="container">
      <h1>Now searching...</h1>
      <div class="alert alert-info" v-if="searching">
        Recovering search information.
      </div>
      <div class="alert alert-danger" v-if="noSearch">
        Currently, there is no search executed.
      </div>
      <div class="alert alert-success" v-if="search">
        <span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> There is a search executing right now.
      </div>
      <div class="panel panel-primary" v-if="result">
        <div class="panel-heading">
          <h3 class="panel-title">Information about the current search</h3>
        </div>
        <div class="panel-body">
          <p>URL: {{ s.web }}.</p>
          <p>Date: {{ s.date }}.</p>
          <p>Search type: {{ s.stype }}.</p>
          <p>Status: {{ s.status }}.</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import SearchFunctions from '@/mixins/SearchFunctions.js'

export default {
  name: 'searching',
  data: function () {
    return {
      s: null,
      searching: true,
      noSearch: false,
      search: false,
      result: false
    }
  },
  mixins: [SearchFunctions],
  mounted: function () {
    this.getCurrentSearchResult().then(s => {
      if (s) {
        this.s = s
        this.searching = false
        this.search = true
        this.result = true
      } else {
        this.searching = false
        this.noSearch = true
      }
    })
  },
  methods: {}
}
</script>

<style scoped>
</style>
