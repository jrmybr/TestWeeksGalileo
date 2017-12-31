<template>
  <div class="radar-chart-wrapper radar-chart text-xs-center">
    <svg width="300" height="400">
      <g transform="translate(150,150)"></g>
    </svg>
  </div>
</template>

<script>
// import datas from './../../../src/datas/describe.js'
import * as d3 from './../../../node_modules/d3/build/d3.min.js'
export default {
  props: {
    scores: {
      type: Array,
      required: true
    },
    maxes: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      stats: this.scores
    }
  },
  watch: {
    scores: (newVal, oldVal) => {
      d3.selectAll('path.week')
        .remove()
      const stats = newVal
      const nAngle = Object.keys(stats[0]).length
      const strokeColor = ['#e65100', '#ff6d00', '#dd2c00']
      const strokeFill = ['#fb8c00', '#ffd180', '#ff9e80']
      const nCurve = stats.length
      const reN = /[0-9]/
      const resN = Object.keys(stats[0]).map(i => i.match(reN))
      let idWod = resN.sort().map(i => i['input'])
      let radLineGenerator = d3.lineRadial()
      const angles = [...Array(nAngle).keys()].map(i => i * 2 / nAngle * Math.PI)
      for (let w of [...Array(nCurve).keys()].map(i => i++)) {
        let aWeekPath = []
        let computedData = []
        for (let idx in idWod) {
          // console.log(stats[w])
          computedData.push(
            {
              id: idWod[idx],
              radius: stats[w][idWod[idx]],
              angle: angles[idx]
            }
          )
        }
        for (let key in idWod) {
          aWeekPath.push([computedData[key]['angle'], computedData[key]['radius']])
        }
        aWeekPath.push([computedData[0]['angle'], computedData[0]['radius']])
        d3.select('g')
          .append('path')
          .attr('id', 'week' + w)
          .attr('class', 'week')
          .attr('d', radLineGenerator(aWeekPath))
          .style('stroke', strokeColor[w])
          .style('stroke-width', 2)
          .style('marker', 'visible')
          .style('fill', 'none')
          .on('mouseover', () => {
            d3.select('g')
              .selectAll('#week' + w)
              .style('fill', strokeFill[w])
              .style('z-index', 100)
          })
          .on('mouseout', () => {
            d3.select('g')
              .selectAll('#week' + w)
              .style('fill', 'none')
              .style('z-index', 0)
          })
      }
    }
  },
  mounted () {
    const stats = this.stats
    const nCurve = stats.length
    const nAngle = Object.keys(stats[0]).length
    const rayon = 100
    const reN = /[0-9]/
    const resN = Object.keys(stats[0]).map(i => i.match(reN))
    const strokeColor = ['#e65100', '#ff6d00', '#dd2c00']
    const strokeFill = ['#fb8c00', '#ffd180', '#ff9e80']
    const width = 300
    let idWod = resN.sort().map(i => i['input'])
    const angles = [...Array(nAngle).keys()].map(i => i * 2 / nAngle * Math.PI)
    let radLineGenerator = d3.lineRadial()
    let fullCircle = []
    let halfCircle = []
    let tQuartCircle = []
    let fQuartCircle = []

    for (let angle of angles) {
      fullCircle.push([angle, rayon])
      halfCircle.push([angle, rayon / 2])
      tQuartCircle.push([angle, 3 * rayon / 4])
      fQuartCircle.push([angle, rayon / 4])
    }
    fullCircle.push([0, rayon])
    halfCircle.push([0, rayon / 2])
    tQuartCircle.push([0, 3 * rayon / 4])
    fQuartCircle.push([0, rayon / 4])
    d3.select('g')
      .append('path')
      .style('fill', '#80d8ff')
      .style('stroke', '#0288d1')
      .attr('d', radLineGenerator(fullCircle))
    d3.select('g')
      .append('path')
      .style('fill', '#40c4ff')
      .style('stroke', '#039be5')
      .attr('d', radLineGenerator(tQuartCircle))
    d3.select('g')
      .append('path')
      .style('fill', '#00b0ff')
      .style('stroke', '#0288d1')
      .attr('d', radLineGenerator(halfCircle))
    d3.select('g')
      .append('path')
      .style('fill', '#0091ea')
      .style('stroke', '#039be5')
      .attr('d', radLineGenerator(fQuartCircle))
    for (let idx of [...Array(nAngle).keys()].map(i => i++)) {
      d3.select('g')
        .append('path')
        .attr('d', radLineGenerator([
          [0, 0],
          [angles[idx], rayon + 5]
        ]))
        .style('stroke', '#b2ebf2')
      d3.select('g')
        .append('text')
        .attr('x', 110 * Math.cos(angles[idx] - 1.6) - 7)
        .attr('y', 110 * Math.sin(angles[idx] - 1.6) + 5)
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .text(idWod[idx])
    }
    for (let idx of [...Array(nCurve).keys()].map(i => i + 1)) {
      d3.select('g')
        .append('circle')
        .attr('class', 'circle legend')
        .attr('r', 4)
        .attr('cx', (d) => {
          return (idx * width / 4) - 170
        })
        .attr('cy', (d) => {
          return 140
        })
        .style('stroke', strokeColor[idx - 1])
        .style('fill', strokeFill[idx - 1])

      d3.select('g')
        .append('text')
        .attr('class', 'label legend')
        .attr('x', (d) => {
          return ((idx) * width / 4) - 160
        })
        .attr('y', (d) => {
          return 144
        })
        .text('Sem. ' + idx)
    }
  }
}
</script>

<style scoped lang="sass">

</style>
