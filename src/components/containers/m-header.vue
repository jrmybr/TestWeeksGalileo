<template>
  <div id="header">
    <header class="">
      <div class="col-xs-12 text-center">
        <div id="logo-wrapper">
          <img :src="logo" :width='width' :height='height' alt="logo">
        </div>
      </div>
      <div id="title" class="col-xs-12 text-center">
        <h1>TEST WEEKS RESULTS</h1>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data: () => ({
    logo: 'static/img/logo_galileo.png',
    width: '125px',
    height: '125px'
  })
}
</script>

<style scoped lang="sass">
@import './../../css/colors'
@import './../../css/fonts'
#header
  background-color: $blue
  min-height: 150px
  #logo-wrapper
    margin:
      bottom: 10px
      top: 15px
  #title
    background-color: $orange
    color: $white
    h1
      font-family: $main-title
      font-size: 28px
      margin-top: 10px

</style>
