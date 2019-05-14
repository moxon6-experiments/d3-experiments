/* global d3 */
/* global topojson */

const width = 960

const height = 1160

const projection = d3
  .geoAlbers()
  .center([0, 55.4])
  .rotate([4.4, 0])
  .parallels([50, 60])
  .scale(1200 * 5)
  .translate([width / 2, height / 2])

const path = d3
  .geoPath()
  .projection(projection)
  .pointRadius(2)

const svg = d3
  .select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

d3.json('uk-vlow.geo.json', function (error, uk) {
  if (error) {
    console.log(error)
  }
  const subunitSelection = svg
    .selectAll('.subunit')
    .data(uk.features)
    .enter()
    .append('path')
    .attr('class', function (d) {
      return 'subunit ' + d.id
    })
    .attr('d', path)

  // const placeSelection = svg
  //   .selectAll('.place-label')
  //   .data(topojson.feature(uk, uk.objects.places).features)
  //   .enter()
  //   .append('path')
  //   .attr('d', path)
  //   .attr('class', 'place')

  // const placeLabelSelection = svg
  //   .selectAll('.place-label')
  //   .data(topojson.feature(uk, uk.objects.places).features)
  //   .enter()
  //   .append('text')
  //   .attr('class', 'place-label')
  //   .attr('transform', d => `translate(${projection(d.geometry.coordinates)})`)
  //   .attr('x', d => d.geometry.coordinates[0] > -1 ? 6 : -6)
  //   .attr('dy', '.35em')
  //   .style('text-anchor', d => d.geometry.coordinates[0] > -1 ? 'start' : 'end')
  //   .text(d => d.properties.name)
  const zoomHandler = d3.zoom().on('zoom', zoomActions)

  function zoomActions () {
    [subunitSelection /*, placeSelection */].forEach(selection => {
      selection.attr('transform', d3.event.transform)
    })
    /*
    placeLabelSelection.attr('transform', function (d) {
      return `
        ${d3.event.transform}
        translate(${projection(d.geometry.coordinates)})
      `
    })
    */
  };

  svg.call(zoomHandler)
})
