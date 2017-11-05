<template>
  <div id="top-nav">
    <nav class="navbar navbar-default fixed-top">
      <div class="container-fluid">
        <div class="col-md-2 col-xs-6 logo">
          <router-link to='/'><img src='../assets/krashr-logo.png' class="img-logo" alt='Krashr logo'></router-link>
        </div>

        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div> <!-- /.navbar-header -->

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="navbar-collapse">
          <ul class="nav navbar-nav navbar-left">
            <li id="home" class="navtab-button">
              <router-link to='/'>
                <i class="fa fa-home navtab-icon" aria-hidden="true"></i>
                <span v-translate class="navtab-text">Home</span>
              </router-link>
            </li>
            <li v-if="!user" class="navtab-button">
              <router-link to='/sign-in'>
                <i class="fa fa-search navtab-icon" aria-hidden="true"></i>
                <span v-translate class="navtab-text">Sign in</span>
              </router-link>
            </li>
            <li v-if="user" class="navtab-button">
              <router-link to='/all-searches'>
                <i class="fa fa-search navtab-icon" aria-hidden="true"></i>
                <span v-translate class="navtab-text">All searches</span>
              </router-link>
            </li>
            <li v-if="user" class="navtab-button">
              <router-link to='/searching'>
                <i class="fa fa-search navtab-icon" aria-hidden="true"></i>
                <span v-translate class="navtab-text">Searching</span>
              </router-link>
            </li>
          </ul>

          <ul v-if="user" class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                <i class="fa fa-user-o" aria-hidden="true"></i>
                {{ user }} <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <router-link to='/user-profile'>
                    <i class="fa fa-cog" aria-hidden="true"></i>
                    <span v-translate>Perfil</span>
                  </router-link>
                </li>
                <li role="separator" class="divider"></li>
                <li @click="logout">
                  <router-link to=''>
                    <i class="fa fa-sign-out" aria-hidden="true"></i>
                    <span v-translate>Cerrar sesión</span>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div> <!-- /.navbar-collapse -->

      </div><!-- /.container-fluid -->

    </nav>

  </div>
</template>

<script>
import UserFunctions from '@/mixins/UserFunctions.js'

export default {
  name: 'topNav',
  mixins: [UserFunctions],
  computed: {
    user: function () {
      return localStorage.getItem('user')
    }
  },
  watch: {
    user: function (newVal) {
      console.log(newVal)
    }
  },
  methods: {
    logout: function () {
      this.signOut()
    }
  }
}
</script>

<style scoped>
/*@media only screen and (max-width: 992px) {
  .navbar-header {
    float: none;
  }

  .navbar-left,.navbar-right {
    float: none !important;
  }

  .navbar-toggle {
    display: block;
  }

  .navbar-collapse {
    border-top: 1px solid transparent;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
    z-index: 3;
  }

  .navbar-fixed-top {
    top: 0;
    border-width: 0 0 1px;
  }

  .navbar-collapse.collapse {
    display: none!important;
  }

  .navbar-nav {
    float: none!important;
    margin-top: 7.5px;
  }

  .navbar-nav > li {
    float: none;
  }

  .navbar-nav > li > a {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .collapse.in {
    display:block !important;
  }

  .navbar-center, .nav-tabs {
    display: none;
  }

  .img-logo {
    position: absolute;
    top: 12px;
    height: 25px;
  }
}*/

/*@media (min-width: 992px) {
  .dropdown-menu {*/
    /*position: fixed;*/
    /*z-index: 2;*/
  /*}

  .navbar-toggle {
    margin-left: 15px;
  }

  .navbar-brand {
    padding: 12px 0 0 0;
  }

  .companies {
    font-size: 9px;
    float: left;
  }

  .navbar-center {
    display: none;
    position: absolute;
    width: 100%;
    left: 0;
    text-align: center;
    margin: 0 auto;
  }

  .alert {
    display: inline-block;
    border: none;
    height: 40px;
    margin-top: 5px;
    padding-bottom: 5px;
  }

  .nav-tabs {
    border: none;*/
    /*margin-left: 211px;*/
  /*}

  .nav-tabs > li > a {
    padding: 5px 10px;
    cursor: pointer;
    border: 1px solid #ddd;
    border-bottom: 1px solid transparent;
    border-radius: 0;
  }

  .close-tab {
    font-size: 11px;
    position: absolute;
    padding: 5px;
    top: -5px;
    right: 0px;
    color: grey;
    cursor: pointer
  }

  .close-tab:hover {
    color: #f00;
  }

  .logo {
    padding: 10px auto;
  }

  .img-logo {
    position: absolute;
    top: 15px;
    width: 100px;
  }
}

.fixed-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
}

.highlighted > a > span, .highlighted > a > i {
  color: #4CAF50;
}

.highlighted:hover, .highlighted > a:hover, .highlighted > a > span:hover, .highlighted > a > i:hover {*/
  /*color: #006600!important;*/
  /*color: #4CAF50;
}*/

.img-logo {
  width: 50px;
}
</style>
