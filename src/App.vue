<template>
  <div id="app">
      <m-header></m-header>
      <m-nav>
        <ul>
          <li class="li-rg-1 active"><router-link to="/">Home</router-link></li>
          <li class='li-rg-1'><router-link to="/byathlete/">Mes scores</router-link></li>
        </ul>
      </m-nav>
      <main class="">
        <div :style='styleHomeView' class="page-content">
          <router-view></router-view>
        </div>
      </main>
  </div>

</template>

<script>
import Header from './components/containers/m-header.vue'
import Nav from './components/containers/m-menu.vue'
// import('./../node_modules/vuetify/dist/vuetify.min.css')
// import('./../static/js/fontawesome-all.min.js')
export default {
  name: 'app',
  data () {
    return {
      styleHomeView: {
        marginLeft: '60px'
      }
    }
  },
  components: {
    'm-header': Header,
    'm-nav': Nav
  },
  methods: {
    checkScreenWidth (event) {
      if (window.matchMedia('(min-width: 600px)').matches) {
        /* the viewport is at least 400 pixels wide */
        this.styleHomeView.marginLeft = '250px'
      } else {
        /* the viewport is less than 400 pixels wide */
        this.styleHomeView.marginLeft = '5px'
      }
    }
  },
  mounted () {
    this.checkScreenWidth()
    window.addEventListener('resize', this.checkScreenWidth)
  }
}
</script>

<style lang="sass">
  @import './css/colors'
  html
    height: 100vh
    body
      min-height: 100vh
      color: $black
      background-color: #DDD

</style>
