<template>
  <div class="bar-chart-wrapper bar-chart text-xs-center">

  </div>
</template>

<script>
import datas from './../../../src/datas/participation.js'
import * as d3 from './../../../node_modules/d3/build/d3.min.js'
export default {

  data: () => ({
  }),
  mounted () {
    const weeks = datas.week
    const width = 300
    const height = 400
    const padding = 25
    const paddingBottom = 100
    const dateFormat = d3.timeFormat('%m / %Y')

    const vis = d3.select('div.bar-chart-wrapper')
      .append('svg:svg')
      .attr('width', width)
      .attr('height', height)

    const yScale = d3.scaleLinear()
      .domain([0, 300]).nice()
      .range([height - paddingBottom, padding])

    const xScale = d3.scaleTime()
      .domain([new Date(2016, 9), new Date(2018, 3)])
      .range([padding, width - padding])

    const yAxis = d3.axisLeft(yScale)

    const xAxis = d3.axisBottom(xScale)
      .tickFormat(dateFormat)
      .tickValues([new Date(2016, 11), new Date(2017, 5), new Date(2017, 11)])
      // .tickValues(xDomain)
    vis.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + padding + ', 0)')
      .style('font-size', '10px')
      .style('font-weight', 'bold')
      .call(yAxis)

    vis.append('g')
      .attr('class', 'xaxis axis')
      .attr('transform', 'translate(0, ' + (height - paddingBottom) + ')')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .call(xAxis)

    vis.append('g')
      .selectAll('.bar')
      .data(weeks)
      .enter().append('rect')
      .attr('class', 'bar total')
      .attr('x', (d) => {
        return xScale(d.week) - padding * 1.4
      })
      .attr('y', (d) => {
        return yScale(d.total)
      })
      .attr('width', 20)
      .attr('height', (d) => {
        return height - paddingBottom - yScale(d.total)
      })
      .style('fill', '#ff6d00')

    vis.append('g')
      .selectAll('.bar')
      .data(weeks)
      .enter().append('rect')
      .attr('class', 'bar men')
      .attr('x', (d) => {
        return xScale(d.week) - padding * 0.5
      })
      .attr('y', (d) => {
        return yScale(d.men)
      })
      .attr('width', 20)
      .attr('height', (d) => {
        return height - paddingBottom - yScale(d.men)
      })
      .style('fill', '#0091ea')

    vis.append('g')
      .selectAll('.bar')
      .data(weeks)
      .enter().append('rect')
      .attr('class', 'bar women')
      .attr('x', (d) => {
        return xScale(d.week) - padding * 0.5
      })
      .attr('y', (d) => {
        return yScale(d.total)
      })
      .attr('width', 20)
      .attr('height', (d) => {
        return height - paddingBottom - yScale(d.women)
      })
      .style('fill', '#40c4ff')

    vis.append('circle')
      .attr('class', 'circle legend')
      .attr('r', 4)
      .attr('cx', (d) => {
        return width / 4 - 2 * padding
      })
      .attr('cy', (d) => {
        return height - paddingBottom / 2
      })
      .style('stroke', 'black')
      .style('fill', '#ff6d00')

    vis.append('text')
      .attr('class', 'label legend')
      .attr('x', (d) => {
        return (1 * width / 4 - 2 * padding) + 10
      })
      .attr('y', (d) => {
        return (height - paddingBottom / 2) + 4
      })
      .text('Athlete')

    vis.append('circle')
      .attr('class', 'circle legend')
      .attr('r', 4)
      .attr('cx', (d) => {
        return 2 * width / 4 - 2 * padding
      })
      .attr('cy', (d) => {
        return height - paddingBottom / 2
      })
      .style('stroke', 'black')
      .style('fill', '#0091ea')

    vis.append('text')
      .attr('class', 'label legend')
      .attr('x', (d) => {
        return (2 * width / 4 - 2 * padding) + 10
      })
      .attr('y', (d) => {
        return (height - paddingBottom / 2) + 4
      })
      .text('Homme')

    vis.append('circle')
      .attr('class', 'circle legend')
      .attr('r', 4)
      .attr('cx', (d) => {
        return 3 * width / 4 - 2 * padding
      })
      .attr('cy', (d) => {
        return height - paddingBottom / 2
      })
      .style('stroke', 'black')
      .style('fill', '#40c4ff')
    vis.append('text')
      .attr('class', 'label legend')
      .attr('x', (d) => {
        return (3 * width / 4 - 2 * padding) + 10
      })
      .attr('y', (d) => {
        return (height - paddingBottom / 2) + 4
      })
      .text('Femme')
  }
}
</script>

<style scoped lang="sass">

</style>
