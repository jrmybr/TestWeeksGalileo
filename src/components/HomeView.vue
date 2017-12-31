<template>
  <section id="home-view-wrapper" class="">
    <div id="hv-welcome" class='col-sm-11 col-offset-sm-1 col-xs-12 content-wrapper'>
      <h2>
        Bienvenue
      </h2>
      <div>
        <p>
          Je me suis permis de récolter les résultats des test weeks concoctées par les coachs
          et j'en ai fait une petite appli pour que tous les adhérents puissent :
          <ul>
            <li>Garder une trace de leurs résultats pour la prochaine test week</li>
            <li>Consulter les résultats, peut être leur PR, dans la section "Mes scores"  </li>
            <li>Voir quel est le meilleur score</li>
            <li>Se comparer au reste de la box grâce au radar graphe</li>
          </ul>
        </p>
      </div>
    </div>
      <div id="hv-participation" class='col-md-5 col-sm-10 col-offset-sm-1 col-xs-12 text-center content-wrapper'>
        <h2 class=" ">
          Participation
        </h2>
        <div @click="showHelp = !showHelp" class="span-help text-right" style="color:#F37E21">
          <span class="fa fa-question"></span>
        </div>
        <div v-show='showHelp' class="help text-left">
          <p>A GaliléÔ, les athletes viennent tester leur fitness. Par contre, ça reste
          toujours autant viril (ou pas).</p>
        </div>
        <m-bar-chart></m-bar-chart>
      </div>
      <div id="hv-wods" class='col-md-offset-1 col-md-5 col-sm-10 col-offset-sm-1 col-xs-12 text-center content-wrapper'>
        <h2 class="">
          Wods
        </h2>
        <m-wod-list :scores="scores" :selectList="selectList"></m-wod-list>
      </div>
  </section>
</template>

<script>
import BarChart from './graphes/bar-chart.vue'
import WodList from './containers/m-wods-list.vue'
import stats from './../../src/datas/describe.json'
export default {
  data () {
    return {
      selectList: 'BestAthlete',
      scores: stats,
      showHelp: false
    }
  },
  components: {
    'm-bar-chart': BarChart,
    'm-wod-list': WodList
  }
}
</script>

<style lang="sass">
@import './../css/colors'
@import './../css/fonts'
section#home-view-wrapper
  .content-wrapper
    background: #f5f5f5
    border: 2px solid #CCC
    margin-top: 15px
  @media screen and (min-width: 1024px)
    #hv-welcome
      margin:
        bottom: 30px
        top: 40px
    #hv-participation
      padding-bottom: 58px
  .span-help
    cursor: pointer
    color: $orange
    font-size: 25px
  .help
    position: absolute
    background: lighten($blue, 20)
    padding: 15px
    border: 2px solid lighten($blue, 10)
  ul
    list-style: none
    padding-left: 15px
</style>
