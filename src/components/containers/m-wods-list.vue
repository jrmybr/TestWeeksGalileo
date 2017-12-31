<template>
  <div id="wod-list">
    <div class="grid-list-lg">
      <div id="wod-list-wrapper" class="row wrap">
        <div class="wod-list-wrapper"  v-for='wod in wods' :key='wod.name'>
          <div class="col-xs-12 header-wod-list">
            <div class="wod-id">WOD {{ wod.name }}</div>
            <div class="wod-desc">{{ wod.description }}</div>
            <div class="icons-wrapper">
              <div @click='setShowDetails'><span class="fa fa-plus-square-o"></span></div>
            </div>
          </div>
            <m-detail-list v-if="selectList == 'Athlete'" :scores="scores" :wod='wod.name'></m-detail-list>
            <m-best-detail-list v-if="selectList == 'BestAthlete'" :scores="scores" :wod='wod.name'></m-best-detail-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wods from './../../../src/datas/wods.json'
import DetailList from './m-detail-list'
import BestDetailList from './m-best-detail-list'
export default {
  props: {
    selectList: {
      type: String,
      required: true
    },
    scores: {
      type: Array,
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
    }
  },
  components: {
    'm-detail-list': DetailList,
    'm-best-detail-list': BestDetailList
  }
}
</script>

<style lang="sass">
@import './../../css/colors'
#wod-list-wrapper
  padding: 0px
  .header-wod-list
    display: flex
    justify-content: space-between
    align-items: center
    padding: 6px
    border-bottom: 1px solid grey
    .wod-id
      width: 25%
      font-size: 95%
      font-weight: bold
    .wod-desc
      flex-grow: 2
      font-size: 95%
      font-weight: bold
    .icons-wrapper
      display: flex
      justify-content: space-around
      width: 25%
      color: $blue
      font-size: 24px
      div
        width: 50%
        &:hover
          color: lighten($blue, 10)
          cursor: pointer
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
