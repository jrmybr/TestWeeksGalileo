import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/components/HomeView'
import AthleteView from '@/components/AthleteView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/byathlete/',
      name: 'AthleteView',
      component: AthleteView
    }
  ]
})
