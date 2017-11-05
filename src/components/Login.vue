<template>
  <div id="login">

    <!--<div class="overlay">
      <video autoplay="" loop="">
        <source src="/static/video/processed_450.mp4" type="video/mp4">
      </video>
    </div>-->
    <div v-if="loginCredentialFail" class="alert alert-danger" role="alert">
      <span v-translate>Las credenciales introducidas son incorrectas.</span>
    </div>
    <div v-if="loginNetFail" class="alert alert-danger" role="alert">
      <span v-translate>No se ha podido conectar. Por favor, inténtelo de nuevo en unos minutos.</span>
    </div>

    <div class="form-login">
      <img src='../assets/logo.svg' onerror='this.src="../assets/logo.png"' alt='Logo' class='logo'>
      <div v-if="loading" id="loadingDiv"></div>
      <form v-on:submit.prevent="login" enctype="application/x-www-form-urlencoded">
        <div class="input-group">
          <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
          <input type="text" v-model="user" class="form-control" placeholder="Email" aria-describedby="user" autofocus required>
        </div>
        <div class="input-group margin-top-sm">
          <span class="input-group-addon"><i class="fa fa-shield"></i></span>
          <input type="password" v-model="password" class="form-control" placeholder="Password" aria-describedby="password" required>
        </div>
        <div class="text-center margin-top-m">
          <button type="submit" class="btn btn-primary"><span v-translate>Conectar</span></button>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'login',
  data: function () {
    return {
      user: '',
      password: '',
      loading: false,
      loginCredentialFail: false,
      loginNetFail: false
    }
  },
  computed: mapState({
    auth: 'auth'
  }),
  locales: require('@/i18n/Login.js'),
  created () {
    if (localStorage.getItem('auth')) this.$router.push('/')
  },
  methods: {
    login: function () {
      this.loading = true
      var data = {
        'UserName': this.user,
        'Password': this.password,
        'grant_type': 'password'
      }
      this.$http.post('https://192.168.1.150:44313/oauth/token', data).then(response => {
        localStorage.setItem('auth', response.data.access_token)
        localStorage.setItem('username', this.user)
        localStorage.setItem('expiration_date', Math.floor(Date.now() / 1000) + response.data.expires_in) // Storing token expiration date.
        this.loading = false
        this.$router.push('/')
      }, response => {
        if (response.status === 400) {
          this.loginCredentialFail = true
        } else {
          this.loginNetFail = true
        }
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
.form-login {
  width: 330px;
  height: 270px;
  background-color: white;
  -webkit-box-shadow: 1px 2px 5px rgba(0,0,0,.31);
  -moz-box-shadow: 1px 2px 5px rgba(0,0,0,.31);
  box-shadow: 1px 2px 5px rgba(0,0,0,.31);
  border: solid 1px #cbc9c9;
  position: absolute;
  left:0; right:0;
  top:0; bottom:0;
  margin:auto;
  max-width:100%;
  max-height:100%;
}

.alert {
  width: 550px;
  margin: 0 auto;
  z-index: 1000;
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
}

.logo {
  display: block;
  margin: 20px auto 20px auto;
  height: 80px;
}

#loadingDiv {
  background: url("../assets/spinner.gif") no-repeat scroll center center #fff;
  position: absolute;
  display: block;
  height: 50%;
  width: 92%;
  z-index: 2000;
}

form {
  margin: 0 30px;
}

.margin-top-sm {
  margin-top: 10px;
}

.margin-top-m {
  margin-top: 20px;
}

.input-group-addon {
  min-width: 40px;
  text-align: center;
  background-color: #428bca;
  color: white;
}

/*.overlay {
  position: absolute;
  width: 100%;
}

.overlay:after {
  position: relative;
  width: 100%;
  content:'\A';
  position: absolute;
  width: 100%; height: 100%;
  top:0; left:0;
  background: rgba(0,0,0,0.6);
  opacity: 1;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}*/

video {
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
  -ms-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}
</style>
