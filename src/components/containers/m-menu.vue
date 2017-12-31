<template>
  <div id="navigation">
    <div id="disp-menu" v-show="showMenu" @click="showNav = !showNav" class="col-xs-12 text-center">
      <span class="fa fa-chevron-down fa-2x"></span>
    </div>
    <nav v-show='showNav' :style='navStyle' id="menu">
      <div id="menu-title-wrapper" class="col-xs-12">
        <div id="menu-title" class="col-xs-8 text-left">
          Menu
        </div>
        <div v-show='showMenu' @click="showNav = !showNav" class="col-xs-4 text-right" style="font-size: 30px;">
          <span class="fa fa-times-circle-o"></span>
        </div>
      </div>
      <div id='menu-content' class="col-xs-12" @click='canIHideMenu'>
        <slot></slot>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    isSmallScreen: true,
    showMenu: true,
    showNav: false,
    navStyle: {
      height: '150%',
      width: '200px',
      zIndex: '999'
    }
  }),
  methods: {
    checkScreenWidth (event) {
      if (window.matchMedia('(min-width: 600px)').matches) {
        /* the viewport is at least 600 pixels wide */
        this.isSmallScreen = false
        this.showMenu = false
        this.showNav = true
        this.navStyle['top'] = '193px'
        this.navStyle['position'] = 'absolute'
      } else {
        /* the viewport is less than 400 pixels wide */
        this.isSmallScreen = true
        this.showMenu = true
        this.showNav = false
        this.navStyle['top'] = '0px'
        this.navStyle['position'] = 'fixed'
      }
    },
    canIHideMenu () {
      if (this.isSmallScreen === true) {
        this.showNav = !this.showNav
      }
    }
  },
  mounted () {
    this.checkScreenWidth()
    window.addEventListener('resize', this.checkScreenWidth)
  }
}
</script>

<style scoped lang="sass">
@import './../../css/colors'
@import './../../css/fonts'
#disp-menu
  background-color: $blue
  color: #f5f5f5
nav
  background-color: $white
  #menu-title-wrapper
    padding:
      top: 5px
      bottom: 5px
    background-color: $blue
    color: $white
    #menu-title
      padding-top: 2px
      font-size: 24px
      font-family: $main-title
  #menu-content
    padding-top: 50px
    left: 14px
    ul
      list-style: none
      font-weight: bold
      font-family: $main-title
      .li-rg-1
        font-size: 16px
        background-color: $orange
        padding-left: 15px
        margin-top: 5px
        padding: 5px 4px
        display: flex
        padding: 0px
        a
          color: $white
          flex-grow: 1
          height: 30px
          padding-top: 5px
          padding-left: 15px
        .router-link-exact-active
          background-color: lighten($orange, 10)
          color: $white
          text-decoration: none
        &:hover
          background-color: darken($orange, 10)
          text-decoration: none

</style>
