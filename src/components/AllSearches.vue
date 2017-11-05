<template>
  <div id="all-searches">

    <div class="container">
      <h1>My searches <span v-if="!searching" class="badge">{{ totalItems }}</span></h1>
      <div class="alert alert-info" v-if="searching">
          Recovering searches information.
      </div>
      <div class="alert alert-danger" v-if="noSearchs">
          Currently, there are no vulnerability found.
      </div>
      <div v-if="searches" class="panel panel-primary">
        <div class="panel-heading">
          <h3 class="panel-title">Information about the search</h3>
        </div>
        <div class="panel-body">
          <div class="panel panel-primary">
            <div class="panel-body">
              <p>URL: <a href=""></a>.</p>
              <p>Date:.</p>
              <p>Vulnerability:.</p>
            </div>
          </div>
        </div>
    </div>
    </div>

  </div>
</template>

<script>
import SearchFunctions from '@/mixins/SearchFunctions.js'

export default {
  name: 'allSearches',
  data: function () {
    return {
      s: null,
      totalItems: 0,
      searches: false,
      searching: true,
      noSearchs: false
    }
  },
  mixins: [SearchFunctions],
  mounted: function () {
    this.getSearchNumberResults().then(n => {
      if (n) this.totalItems = n.length
    })
    this.getSearchResults().then(s => {
      if (s && s.length > 0) {
        this.s = s
        this.searching = false
        this.searches = true
        this.result = true
      } else {
        this.searching = false
        this.noSearchs = true
      }
    })
  },
  methods: {}
}
</script>

<style scoped>
</style>
