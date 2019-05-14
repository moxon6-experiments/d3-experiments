const svg = d3.select('svg')
const width = +svg.attr('width');
const height = +svg.attr('height')
const radius = 20;

const circle_data = d3.range(50).map(() => ({
  x : Math.round(Math.random() * (width - radius*2 ) + radius),
  y : Math.round(Math.random() * (height - radius*2 ) + radius)
}))

const circles = svg.append('g')
  .attr('class', 'circles')
  .selectAll('circle')
    .data(circle_data)
    .enter()
    .append('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', radius)
    .attr('fill', 'blue')

const zoom_handler = d3.zoom()
  .on('zoom', zoom_actions)

function zoom_actions() {
  console.log("Zoom")
}
function zoom_actions(){
  console.log(d3.event.transform);
  circles.attr("transform", d3.event.transform);
}

svg
  .call(zoom_handler)