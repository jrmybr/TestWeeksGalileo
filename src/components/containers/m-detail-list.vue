<template>
  <div class="cols-xs-12 detail-wod-list">
    <div v-for='(score, idx) in scores' :key='idx'>
      <div class="week-wrapper col-xs-12">
        <span class="col-xs-5 text-left">SEMAINE {{ idx + 1 }}</span>
        <span v-if="score[wod].score == 0" class="col-xs-4 text-right"> - </span>
        <span v-if="score[wod].score != 0" class="col-xs-4 text-right">{{ score[wod] }}</span>
        <span class="col-xs-3 text-left">{{ getUnit() }}</span>
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
  methods: {
    setShowDetails (event) {
      let isShown = event.target.closest('div.wod-list-wrapper').children[1].style.display
      isShown = isShown === 'block' ? 'none' : 'block'
      event.target.closest('div.wod-list-wrapper').children[1].style.display = isShown
    },
    getUnit () {
      for (let w of this.wods) {
        if (this.wod === w.name) {
          return w.unit
        }
      }
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
    min-height: 20px
    background-color: $blue
    border-bottom: 1px solid darken($blue, 10)
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
    color: $white
    font-weight: bold

</style>
