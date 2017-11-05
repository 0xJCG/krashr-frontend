module.exports = {
  data: function () {
    return {
      get api () {
        return 'http://192.168.1.12:3000/'
      }
    }
  },
  methods: {
    getSearchResults: function () {
      return this.$http.get(this.api + 'results').then(response => {
        return response.data
      }, response => {
        console.log(response)
        if (response.status === 401) {
          this.signOut()
        } else {
          return []
        }
      })
    },
    getSearchResult: function (id, data) {
      return this.$http.post(this.api + 'results/' + id, data).then(response => {
        return response.data
      }, response => {
        console.log(response)
        if (response.status === 401) {
          this.signOut()
        } else {
          return false
        }
      })
    },
    getSearchNumberResults: function (data) {
      return this.$http.get(this.api + 'result/number', data).then(response => {
        return response.data
      }, response => {
        if (response.status === 401) {
          this.signOut()
        } else {
          return false
        }
      })
    },
    getCurrentSearchResult: function () {
      return this.$http.get(this.api + 'result/current').then(response => {
        return response.data
      }, response => {
        console.log(response)
        if (response.status === 401) {
          this.signOut()
        } else {
          return false
        }
      })
    },
    searchVulnerabilities: function (data) {
      return this.$http.post(this.api + 'search', data).then(response => {
        return response.data
      }, response => {
        console.log(response)
        if (response.status === 400) {
          return 400
        } else if (response.status === 401) {
          this.signOut()
        } else {
          return false
        }
      })
    }
  }
}
