<template>
  <div id="app" v-bind:lang="language">
    <router-view v-on:languageChanged="updateLanguage"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
      language: null
    }
  },
  mounted: function () {
    this.language = localStorage.getItem('language')
    if (this.language) {
      this.$translate.setLang(this.language)
    } else {
      this.$translate.setLang('en')
      localStorage.setItem('language', 'en')
      this.language = 'en'
    }
  },
  methods: {
    updateLanguage: function (l) {
      this.language = l
    }
  }
}
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
@import '../node_modules/font-awesome/css/font-awesome.min.css';

.padding {
    padding-top: 5%;
}

.less-padding {
    padding-top: 20px;
}

.center {
    padding-top: 15px;
    float: none;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    /*background-color: #F8F8F8;*/
}

/*http://stackoverflow.com/questions/9421966/how-do-i-center-the-twitter-bootstrap-tabs-on-the-page*/
.nav-tabs.centered > li, .nav-pills.centered > li {
    float:none;
    display:inline-block;
    display:inline; /* ie7 fix */
    zoom:1; /* hasLayout ie7 trigger */
}

.nav-tabs.centered, .nav-pills.centered {
    text-align:center;
}

/* http://stackoverflow.com/questions/11555931/make-footer-stick-to-bottom-of-page-using-twitter-bootstrap */
html,body{
    height: 100%
}

#holder{
    min-height: 100%;
    position: relative;
}

#ng-view {
    padding-bottom: 40px;    /* height of footer */
}

footer {
    height: 40px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: -40px;
}

/* http://stackoverflow.com/questions/22904102/how-to-change-the-background-color-of-jumbrotron */
.jumbotron {
    background-color:transparent !important;
}

/*
    Original version: http://www.bootply.com/128062
    This version adds support for IE 10+ and Firefox.
*/
.glyphicon-refresh-animate {
    -animation: spin .7s infinite linear;
    -ms-animation: spin .7s infinite linear;
    -webkit-animation: spinw .7s infinite linear;
    -moz-animation: spinm .7s infinite linear;
}

@keyframes spin {
    from { transform: scale(1) rotate(0deg);}
    to { transform: scale(1) rotate(360deg);}
}

@-webkit-keyframes spinw {
    from { -webkit-transform: rotate(0deg);}
    to { -webkit-transform: rotate(360deg);}
}

@-moz-keyframes spinm {
    from { -moz-transform: rotate(0deg);}
    to { -moz-transform: rotate(360deg);}
}
</style>
