<template>
  <div id="e404">
    <div class="error">
      <router-link to='/'><img src='../assets/krashr-logo-mini.png' alt='Logo' class='logo'></router-link>
      <h4 class="margin-top-bg" v-translate>Page not found.</h4>
      <router-link to='/' class="btn btn-primary margin-top-bg"><span v-translate>Start again ;)</span></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'e404'
}
</script>

<style scoped>
#e404 {
	margin: 50px auto;
	text-align: center;
}
</style>
