import Vue from 'vue'
import Router from 'vue-router'
import Krashr from '@/components/Krashr'
import Main from '@/components/Main'
import SignIn from '@/components/SignIn'
import PrivacyPolicy from '@/components/PrivacyPolicy'
import ServiceConditions from '@/components/ServiceConditions'
// import UserProfile from '@/components/UserProfile'
import Searching from '@/components/Searching'
import AllSearches from '@/components/AllSearches'
import e404 from '@/components/e404'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',
      component: Krashr,
      children: [
      { path: '', component: Main },
      { path: 'sign-in', component: SignIn },
      { path: 'privacy-policy', component: PrivacyPolicy },
      { path: 'service-conditions', component: ServiceConditions },
      // { path: 'user-profile', component: UserProfile }, */
      { path: 'searching', component: Searching },
      { path: 'all-searches', component: AllSearches }
      ]
    },
    { path: '*', component: e404 }
  ]
})
