<template>
  <section id="athlete-view-wrapper" class="">
    <div class="input-wrapper col-md-offset-2 col-md-8 col-xs-12 text-left">
      <input v-model="currAth" placeholder="Rechercher un athlete" @keyup="updateAthletes" type="search">
      <div v-show="showAthleteList" id="filtered-athletes" class="athlete-list">
        <ul>
          <li @click='updateCurrentAhtlete' v-for="ath in athletes">{{ ath }}</li>
        </ul>
      </div>
    </div>
    <div class="athlete-radar col-xs-12 col-offset-md-1 col-md-5">
      <div @click="showHelp = !showHelp" class="span-help text-right" style="color:#F37E21">
        <span class="fa fa-question"></span>
      </div>
      <div v-show='showHelp' class="help">
        <p>En gros, plus tu t'approches de l'extérieur du cercle, plus t'es bon<br>
          Une nuance de bleu correspond à un palier de 25%. Donc l'extérieur du cercle correspond à 100%</p>
        <p>100% de quoi ?<br>
          100% c'est le meilleur score qui a été fait sur le wod</p>
      </div>
      <m-radar-chart :scores="getValues()" :maxes="currScore"></m-radar-chart>
    </div>
    <div class="athlete-results col-xs-12 col-offset-md-1 col-md-5">
      <div :style="styleDisable" class="disable"></div>
      <m-wod-list :selectList="selectList" :scores="currScore"></m-wod-list>
    </div>


  </section>
</template>

<script>
import RadarChart from './graphes/radar-chart.vue'
import WodList from './containers/m-wods-list.vue'
import Scores from './../../src/datas/scores.json'
import Maxes from './../../src/datas/maxes.json'
import Athlete from './../../src/datas/athletes.json'
export default {
  data () {
    return {
      scores: Scores,
      currAth: null,
      currGender: null,
      athletes: [],
      showAthleteList: false,
      currScore: null,
      selectList: 'Athlete',
      styleDisable: {
        zIndex: 5
      },
      showHelp: false
    }
  },
  methods: {
    athletesList: () => {
      let athleteList = []
      for (let ath of Object.keys(Athlete)) {
        athleteList.push(ath)
      }
      return athleteList
    },
    filteredAthletes () {
      let filteredList = []
      const completeList = this.athletesList()
      if (this.currAth === '') {
        return completeList
      } else {
        if (this.currAth.length > 2) {
          for (let ath of completeList) {
            if (ath.toLowerCase().search(this.currAth.toLowerCase()) > -1) {
              filteredList.push(ath)
            }
          }
          this.showAthleteList = true
          return filteredList
        } else {
          this.showAthleteList = false
          return []
        }
      }
    },
    updateAthletes () {
      this.athletes = this.filteredAthletes()
    },
    updateCurrentAhtlete (event) {
      this.currAth = event.target.innerText
      this.showAthleteList = false
      this.findAthleteGender()
      this.findAtleteScores()
      this.styleDisable['zIndex'] = -5
      this.currScore = this.getScores()
    },
    findAtleteScores () {
      for (let score of this.scores) {
        if (this.currAth === Object.keys(score)[0]) {
          this.currScore = score[this.currAth]
          break
        }
      }
    },
    findAthleteGender () {
      if (Athlete[this.currAth] === 'F') {
        this.currGender = 'max_female'
      } else if (Athlete[this.currAth] === 'H') {
        this.currGender = 'max_male'
      }
    },
    getMaxes () {
      let maxes = []
      for (let idx of [...Array(Maxes.length).keys()].map(i => i++)) {
        let weekMax = {}
        for (let wod of Object.keys(Maxes[idx])) {
          if (this.currGender === null) {
            weekMax[wod] = 0
          } else {
            weekMax[wod] = Maxes[idx][wod][this.currGender]
          }
        }
        maxes.push(weekMax)
      }
      return maxes
    },
    getScores () {
      let scores = []
      if (this.currScore === null) {
        for (let idx of [...Array(Maxes.length).keys()].map(i => i++)) {
          let weekScore = {}
          for (let wod of Object.keys(Maxes[idx])) {
            weekScore[wod] = 0
          }
          scores.push(weekScore)
        }
      } else {
        scores = this.currScore
      }
      return scores
    },
    getValues () {
      let values = []
      const scores = this.getScores()
      const maxes = this.getMaxes()
      for (let idx of [...Array(Maxes.length).keys()].map(i => i++)) {
        let weekValues = {}
        for (let wodId of Object.keys(Maxes[idx])) {
          if (wodId === '4') {
            if (scores[idx][wodId] !== 0) {
              weekValues[wodId] = maxes[idx][wodId] * 100 / scores[idx][wodId]
            } else {
              weekValues[wodId] = 0
            }
          } else {
            weekValues[wodId] = scores[idx][wodId] * 100 / maxes[idx][wodId]
          }
        }
        values.push(weekValues)
      }
      return values
    }
  },
  beforeMount () {
    let scores = []
    // do something after mounting vue instance
    for (let idx of [...Array(Maxes.length).keys()].map(i => i++)) {
      let weekScore = {}
      for (let wod of Object.keys(Maxes[idx])) {
        weekScore[wod] = 0
      }
      scores.push(weekScore)
    }
    this.currScore = scores
  },
  components: {
    'm-radar-chart': RadarChart,
    'm-wod-list': WodList
  }
}
</script>

<style scoped lang="sass">
@import './../css/colors'
@import './../css/fonts'
.athlete-card
  font-family: $main-title
  font-size: 20px
  font-weight: bold
input
  height: 35px
  width: 100%
  border: 1px solid #CCC
  font-size: 15px
  background-color: $white
.athlete-radar
  margin-top: 20px
  .span-help
    cursor: pointer
    .fa
      color: $orange
      font-size: 25px
  .help
    position: absolute
    background: lighten($blue, 20)
    padding: 15px
    border: 2px solid lighten($blue, 10)
.athlete-list
  position: absolute
  z-index: 9
  background-color: $white
  width: 100%
  ul
    list-style: none
    li
      height: 30px
      border-bottom: 1px grey solid
      padding-top: 5px
      padding-left: 15px
      &:hover
        background-color: lighten($blue, 20)
        cursor: pointer
.athlete-results
  background: $white
  border: 2px solid #CCC
  margin-top: 15px
  .disable
    min-height: 100%
    position: absolute
    width: 100%
    margin-left: -15px
    background-color: $mat-orange
    opacity: 0.4
</style>
