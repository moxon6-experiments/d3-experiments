var width = 960,
    height = 1160;

var projection = d3.geoAlbers()
    .center([0, 55.4])
    .rotate([4.4, 0])
    .parallels([50, 60])
    .scale(6000)
    .translate([width / 2, height / 2]);

var path = d3.geoPath()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("uk.json", function(error, uk) {

  var subunits = topojson.feature(uk, uk.objects.subunits);
  var path = d3.geoPath().projection(projection);

  svg.append("path")
      .datum(subunits)
      .attr("d", path);
  svg.selectAll('.subunit')
      .data(topojson.feature(uk, uk.objects.subunits).features)
    .enter().append('path')
      .attr('class', d => 'subunit ' + d.id)
      .attr('d', path)
});