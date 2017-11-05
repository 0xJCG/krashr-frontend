<template>
  <div id="user-profile">

    <div class="container">

      <h1>My profile</h1>
      <!--<div class="alert alert-danger" ng-hide="pass">
          The password doesn't match.
      </div>
      <div class="alert alert-danger" ng-hide="impossible">
          Impossible to update the profile.
      </div>
      <div class="alert alert-danger" ng-hide="r_impossible">
          Impossible to retrieve your user profile.
      </div>
      <div class="alert alert-success" ng-hide="successful">
          Profile updated successfully.
      </div>
      <div class="alert alert-warning" ng-hide="in_data">
              All the required data is not inserted.
          </div>-->
      <form id="signupform" class="form-horizontal" role="form" @submit.prevent="onSubmit" enctype="application/x-www-form-urlencoded">
        <div class="form-group">
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-addon">@</span>
              <input type="text" class="form-control" id="user" name="user" placeholder="Username" v-model="user" disabled>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-12">
            <input type="email" class="form-control" id="email" name="email" placeholder="Email address" v-model="email" disabled>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-12">
            <input type="password" class="form-control" id="password" name="password" placeholder="Enter your password to update your profile" v-model="password" disabled>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-offset-0 col-md-12">
            <button id="btn-update" type="button" class="btn btn-info" @click="updateProfile()" disabled>Update profile</button>
            <button id="btn-signout" type="button" class="btn btn-warning" @click="close()">Sign out</button>
            <button id="btn-delete-account" type="button" class="btn btn-danger" @click="removeUser()" disabled>Delete account</button>
          </div>
        </div>
    </form>
  </div>

  </div>
</template>

<script>
import UserFunctions from '@/mixins/UserFunctions.js'

export default {
  name: 'userProfile',
  data: function () {
    return {
      profile: null,
      user: '',
      email: '',
      password: ''
    }
  },
  mixins: [UserFunctions],
  mounted: function () {
    this.getProfile().then(p => {
      if (p) {
        this.profile = p
        this.user = p.username
        this.email = p.email
      }
    })
  },
  methods: {
    close: function () {
      this.signOut()
    }
  }
}
</script>

<style scoped>
#e404 {
	margin: 50px auto;
	text-align: center;
}
</style>
