<template>
  <div class="radar-chart-wrapper radar-chart text-xs-center">
    <svg width="300" height="400">
      <g transform="translate(150,150)"></g>
    </svg>
  </div>
</template>

<script>
import datas from './../../../src/datas/describe.js'
import * as d3 from './../../../node_modules/d3/build/d3.min.js'
export default {

  data: () => ({
    stats: datas.stats
  }),
  mounted () {
    const stats = this.stats
    const strokeColor = ['#e65100', '#ff6d00', '#dd2c00']
    const strokeFill = ['#fb8c00', '#ffd180', '#ff9e80']
    const nCurve = stats.length
    const nAngle = Object.keys(stats[0]).length
    const rayon = 100
    const reN = /[0-9]/
    const resN = Object.keys(stats[0]).map(i => i.match(reN))
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
    }

    for (let w of [...Array(nCurve).keys()].map(i => i++)) {
      let aWeekPath = []
      let computedData = []
      for (let idx in idWod) {
        computedData.push(
          {
            id: idWod[idx],
            radius: stats[w][idWod[idx]]['moy_male'] * 100 / stats[w][idWod[idx]]['max_male'],
            angle: angles[idx]
          }
        )
      }
      for (let key in idWod) {
        if (w === 0) {
          // console.log(computedData[key]['id'], computedData[key]['radius'], computedData[key]['angle'])
          d3.select('g')
            .append('text')
            .attr('x', 110 * Math.cos(computedData[key]['angle'] - 1.6) - 7)
            .attr('y', 110 * Math.sin(computedData[key]['angle'] - 1.6) + 5)
            .style('font-size', '12px')
            .style('font-weight', 'bold')
            .text(computedData[key]['id'])
        }
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
}
</script>

<style scoped lang="sass">

</style>
