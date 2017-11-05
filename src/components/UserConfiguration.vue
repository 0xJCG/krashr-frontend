<template>
  <div id="user-configuration">
  	
    <div class="content">
      <i class="fa fa-user-o very-big" aria-hidden="true"></i>
      <h3 class="media-heading">{{ user }}</h3>
      <hr>
      <div class="dropdown">
        <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          <span v-translate>Idioma</span>: <b>{{ lang }}</b>
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu">
          <li @click="changeLanguage('es')">
            <router-link to=''>ES <i v-if="checked" class="fa fa-check" aria-hidden="true"></i></router-link> 
          </li>
          <li @click="changeLanguage('en')">
            <router-link to=''>EN <i v-if="!checked" class="fa fa-check" aria-hidden="true"></i></router-link>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'user-configuration',
  locales: require('@/i18n/UserConfiguration.js'),
  data: function () {
    return {
      lang: 'ES',
      checked: true
    }
  },
  created () {
    var expirationDate = localStorage.getItem('expiration_date')
    if (!expirationDate && this.$router.path !== '/login') {
      this.$router.push('/login')
    } else {
      if (expirationDate - 10 < Math.floor(Date.now() / 1000)) { // 10 second margin.
        localStorage.removeItem('auth')
        localStorage.removeItem('username')
        localStorage.removeItem('expiration_date')
        this.$router.push('/login')
      }
    }
  },
  mounted: function () {
    var l = localStorage.getItem('language')
    if (l === 'en') {
      this.lang = 'EN'
      this.checked = false
    }

    var tabData = {
      title: 'Panel de usuario',
      url: '/user',
      newTab: false
    }
    this.$emit('send-tab-data', tabData)
  },
  computed: {
    user: function () {
      return localStorage.getItem('username')
    }
  },
  methods: {
    changeLanguage: function (l) {
      if (this.lang !== l.toUpperCase()) {
        this.lang === 'ES' ? this.lang = 'EN' : this.lang = 'ES'
        this.$translate.setLang(l)
        localStorage.setItem('language', l)
        this.$emit('languageChanged', this.lang.toLowerCase())
        this.checked = !this.checked
        $('.navbar-center').show('medium').delay(2000).fadeOut()
      }
    }
  }
}
</script>

<style scoped>
@media only screen and (max-width: 991px) {
  .content {
    top: 50px;
    height: 100%;
    height: -moz-calc(100% - 50px);
    height: -webkit-calc(100% - 50px);
    height: calc(100% - 50px);
    overflow-x: auto;
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
  text-align: center;
  width: 100%;
  margin: 15px 0 15px -15px;
}

.dropdown {
  margin: 0 auto;
  width: 160px;
}

.very-big {
  font-size: 100px;
}
</style>
