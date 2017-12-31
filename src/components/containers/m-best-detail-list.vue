<template>
  <div class="cols-xs-12 detail-wod-list">
    <div class="week-wrapper" v-for='(value, key) in scores' :key='key'>
      <div class="col-xs-6 best-score">
        <span class="fa fa-mars"></span>
        <span class="ath-name text-left">{{ value[wod].best_male | capitalize }}</span>
        <span class="ath-score text-right">{{ value[wod].max_male }}</span>
      </div>
      <div class="col-xs-6 best-score">
        <span class="fa fa-venus"></span>
        <span class="ath-name text-left">{{ value[wod].best_female | capitalize }}</span>
        <span class="ath-score text-right">{{ value[wod].max_female }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import wods from './../../../src/datas/wods.json'
export default {
  props: {
    scores: {
      type: Array,
      required: true
    },
    wod: {
      type: String,
      required: true
    }
  },
  data: () => ({
    wods: wods
  }),
  filters: {
    capitalize: (ath) => {
      return ath.slice(0, ath.search(' '))[0].toUpperCase() +
        '.' +
        ath.slice(ath.search(' '), ath.length)
    }
  }
}
</script>

<style scoped lang="sass">
@import './../../css/colors'
.detail-wod-list
  display: none
  .week-wrapper
    text-transform: uppercase
    .best-score
      display: flex
      justify-content: space-between
      font-size: 12px
      background-color: #40c4ff
      font-weight: 600
      padding-bottom: 8px
      border-bottom: 1px solid $white
      padding-top: 4px
  .detail-header
    padding-top: 7px
    padding-bottom: 7px
    display: flex
    justify-content: space-around
    background-color: #0091ea
    color: #f5f5f5
    font-weight: bold
  svg
  .fa-venus
    color: pink
  .fa-mars
    color: blue

</style>
