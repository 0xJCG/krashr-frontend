<template>
  <div id="sign-in">

    <div class="container less-padding">
      <div class="col-md-5">
        <h1>Sign in</h1>
        <div class="alert alert-warning" v-if="inData">
          All the required data is not inserted.
        </div>
        <div class="alert alert-danger" v-if="inImpossible">
          Impossible to sign in.
        </div>
        <form class="form-horizontal" @submit.prevent="onSubmit" enctype="application/x-www-form-urlencoded">
          <div class="form-group">
            <div class="col-sm-12">
              <div class="input-group">
                <span class="input-group-addon">@</span>
                <input type="text" class="form-control" id="user" placeholder="Username" v-model="user" required autofocus>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-12">
              <input type="password" class="form-control" id="pass" placeholder="Password" v-model="pass" required>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-0 col-sm-12">
              <button type="button" class="btn btn-info" @click="logIn()">Sign in</button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-2">
        <h3 class="text-center">Or</h3>
      </div>
      <div class="col-md-5">
        <h1>Sign up</h1>
        <div class="alert alert-warning" v-if="upData">
          All the required data is not inserted.
        </div>
        <div class="alert alert-warning" v-if="upPass">
          The passwords don't match.
        </div>
        <div class="alert alert-warning" v-if="upEmail">
          The email is not valid.
        </div>
        <div class="alert alert-danger" v-if="upImpossible">
          Impossible to sign up.
        </div>
        <div class="alert alert-danger" v-if="hipbEmail">
          Your email was found in a data breach. Please, do not reuse your passwords. For more information, go to <a href='https://haveibeenpwned.com'>HIBP</a>, service by <a href='https://twitter.com/troyhunt'>Troy Hunt</a>.
        </div>
        <div class="alert alert-danger" v-if="hipbPass">
          The password you are going to use has been found in different data breaches and can be easily crackable. Please, use another one. For more information, go to <a href='https://haveibeenpwned.com'>HIBP</a>, service by <a href='https://twitter.com/troyhunt'>Troy Hunt</a>.
        </div>
        <form id="signupform" class="form-horizontal" role="form" @submit.prevent="onSubmit" enctype="application/x-www-form-urlencoded">
          <div class="form-group">
            <div class="col-md-12">
              <div class="input-group">
                <span class="input-group-addon">@</span>
                <input type="text" class="form-control" id="username" name="user" placeholder="Username" v-model="username" pattern=".{3,}" required>
                <span class="input-group-addon" data-toggle="tooltip" title="3 characters min.">?</span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-12">
              <div class="input-group">
                <input type="email" class="form-control" id="email" name="email" placeholder="Email" v-model="email" required @blur="checkEmail()">
                <span class="input-group-addon" data-toggle="tooltip" title="Must exist.">?</span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-12">
              <div class="input-group">
                <input type="password" class="form-control" id="password" name="password" placeholder="Password" v-model="pass1" pattern=".{6,}" required @blur="checkPass()">
                <span class="input-group-addon" data-toggle="tooltip" title="6 characters min.">?</span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-12">
              <div class="input-group">
                <input type="password" class="form-control" id="password2" name="password2" placeholder="Retype the password" v-model="pass2" pattern=".{6,}" required>
                <span class="input-group-addon" data-toggle="tooltip" title="6 characters min.">?</span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-offset-0 col-md-12">
              <button id="btn-signup" type="button" class="btn btn-info" @click="register()">Sign up</button>
            </div>
          </div>
        </form>
        <div class="well">
          <p class="center">
            When signing up, you are accepting the <router-link to="service-conditions" alt="Service Conditions">Service Conditions</router-link> and the <router-link to="privacy-policy" alt="Privacy Policy">Privacy Policy</router-link>.
          </p>
        </div>
    </div>
    </div>

  </div>
</template>

<script>
import UserFunctions from '@/mixins/UserFunctions.js'

export default {
  name: 'signIn',
  data: function () {
    return {
      user: '',
      pass: '',
      username: '',
      email: '',
      pass1: '',
      pass2: '',
      inData: false,
      inImpossible: false,
      upData: false,
      upEmail: false,
      upPass: false,
      upImpossible: false,
      hipbEmail: false,
      hipbPass: false
    }
  },
  mixins: [UserFunctions],
  methods: {
    logIn: function () {
      if (this.user === '') {
        $('#user').focus()
        this.inData = true
      } else this.inData = false
      if (this.pass === '') {
        $('#pass').focus()
        this.inData = true
      } else this.inData = false
      if (this.user !== '' && this.pass !== '') {
        var data = {
          'username': this.user,
          'password': this.pass
        }
        this.signIn(data).then(response => {
          if (response && response !== [] && response.success) {
            localStorage.setItem('token', response.token)
            localStorage.setItem('user', this.user)
            this.$emit('isLoggedIn', true)
          } else this.inImpossible = true
        })
      }
    },
    register: function () {
      if (this.username === '') {
        $('#username').focus()
        this.upData = true
      } else this.upData = false
      if (this.email === '') {
        $('#email').focus()
        this.upData = true
      } else if (!this.isEmail(this.email)) {
        $('#email').focus()
        this.upEmail = true
      } else this.upData = false
      if (this.pass1 === '') {
        $('#pass1').focus()
        this.upData = true
      } else this.upData = false
      if (this.pass2 === '') {
        $('#pass2').focus()
        this.upData = true
      } else if (this.pass1 !== this.pass2) {
        $('#pass2').focus()
        this.upData = false
        this.upPass = true
      } else this.upData = false
      if (this.username !== '' && this.pass1 !== '' && this.pass1 === this.pass2 && this.isEmail(this.email)) {
        var data = {
          'username': this.username,
          'password': this.pass1,
          'email': this.email
        }
        this.signUp(data).then(response => {
          if (response && response.name !== 'MongoError') {
            this.user = this.username
            this.pass = this.pass1
            this.logIn()
            /* localStorage.setItem('token', response.token)
            this.$router.push('/') */
          } else this.upImpossible = true
        })
      }
    },
    checkEmail: function () {
      if (this.isEmail(this.email)) {
        this.checkEmailPwnage(this.email).then(response => {
          if (response) {
            this.hipbEmail = true
          }
        })
      } else {
        $('#email').focus()
        this.upEmail = true
      }
    },
    checkPass: function () {
      if (this.pass1 !== '') {
        this.checkPasswordPwnage(this.pass1).then(response => {
          if (response) {
            this.hipbPass = true
          }
        })
      }
    },
    isEmail: function (email) {
      var regexp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      return regexp.test(email)
    }
  }
}
</script>

<style scoped>
</style>
