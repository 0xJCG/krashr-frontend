module.exports = {
  data: function () {
    return {
      get api () {
        return 'http://192.168.1.12:3000/'
      },
      get hibp () {
        return 'https://haveibeenpwned.com/api/v2/'
      }
    }
  },
  methods: {
    signOut: function () {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push('/')
    },
    signIn: function (data) {
      return this.$http.post(this.api + 'authenticate', data).then(response => {
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
    signUp: function (data) {
      return this.$http.post(this.api + 'users', data).then(response => {
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
    /* updateProfile: function (data) {
      return this.$http.post(this.api + 'updateprofile', data).then(response => {
        return response.data
      }, response => {
        if (response.status === 401) {
          this.signOut()
        } else {
          return false
        }
      })
    },
    updatePassword: function (data) {
      return this.$http.post(this.api + 'updatepassword', data).then(response => {
        return response.data
      }, response => {
        console.log(response)
        if (response.status === 401) {
          this.signOut()
        } else {
          return false
        }
      })
    }, */
    getProfile: function (data) {
      return this.$http.get(this.api + 'user').then(response => {
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
    },
    /* removeUser: function (data) {
      return this.$http.post(this.api + 'removeuser', data).then(response => {
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
    }, */
    checkEmailPwnage: function (email) {
      return this.$http.get(this.hibp + 'breachedaccount/' + email + '?truncateResponse=true').then(response => {
        return response.data
      }, response => {
        if (response.status === 400) {
          return 400
        } else if (response.status === 401) {
          this.signOut()
        } else {
          return false
        }
      })
    },
    checkPasswordPwnage: function (password) {
      return this.$http.get(this.hibp + 'pwnedpassword/' + password).then(response => {
        return true
      }, response => {
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
