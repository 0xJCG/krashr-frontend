<template>
  <div id="main">

    <div class="jumbotron vertical-center">
      <div class="container padding">
        <img src="../assets/krashr-logo-mini.png" class="img-responsive center-block" alt="Krashᴚ logo" />
        <div class="alert alert-danger" v-if="notLogged">
          You have to be <router-link to='/sign-in' alt="Sign in" class="alert-link">signed in</router-link> to search for vulnerabilities.
        </div>
        <div class="alert alert-danger" v-if="problem">
          There is a problem, try the search later.
        </div>
        <div class="alert alert-warning" v-if="wrongUrl">
          The URL is not right.
        </div>
        <form class="form-vulsearch" role="form" @submit.prevent="onSubmit" enctype="application/x-www-form-urlencoded">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Enter an URL to search for vulnerabilities..." v-model="url" required autofocus>
            <span class="input-group-addon" data-toggle="tooltip" title="Example: http://www.foo.com">?</span>
            <span class="input-group-btn">
              <button class="btn btn-default" type="button" @click="search()">Search!</button>
            </span>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import SearchFunctions from '@/mixins/SearchFunctions.js'

export default {
  name: 'main',
  data: function () {
    return {
      url: '',
      notLogged: false,
      problem: false,
      wrongUrl: false
    }
  },
  mixins: [SearchFunctions],
  mounted: function () {
    $('.url').focus()
  },
  methods: {
    search: function () {
      if (!localStorage.getItem('user')) {
        this.notLogged = true
      } else {
        if (!this.isUrl(this.url)) this.wrongUrl = true
        else {
          var data = {
            'url': this.url
          }
          this.searchVulnerabilities(data).then(response => {
            if (response) this.$router.push('/searching')
            else this.problem = true
          })
        }
      }
    },
    isUrl: function (url) {
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
      return regexp.test(url)
    }
  }
}
</script>

<style scoped>
/*@media only screen and (max-width: 991px) {
  .content {
    top: 50px;
    height: 100%;
    height: -moz-calc(100% - 50px);
    height: -webkit-calc(100% - 50px);
    height: calc(100% - 50px);
  }
}

@media (min-width: 992px) {
  .content {
    top: 81px;
    height: 100%;
    height: -moz-calc(100% - 81px);
    height: -webkit-calc(100% - 81px);
    height: calc(100% - 81px);
  }
}

.content {
  position: fixed;
  left: 0;
  padding: 10px 0 5px 5px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
}

.without-margin-right {
  margin-right: 0;
}

.dashboard-actions {
  list-style: none outside none;
  text-align: center;
}

.dashboard-actions li a {
  color: #fff;
  background-color: #4CAF50;
  display: block;
  position: relative;
  padding: 0;
  width: 100%;
  min-height: 70px;
  float: left;
  margin: 5px;
  padding-top: 10px;
  text-decoration: none;
}

.dashboard-actions li a:hover {
  background-color: #fff;
  color: #000;
}

.dashboard-actions li a span {
  display: block;
  font-size: medium;
}

.dashboard-actions li a i {
  font-size: x-large;
}

.dashboard-actions li a span.important {
  position: absolute;
  padding: 5px;
  top: -5px;
  right: -5px;
  background-color: #f74d4d;
  font-weight: 700;
}*/
</style>
