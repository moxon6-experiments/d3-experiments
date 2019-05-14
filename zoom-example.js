function dottype(d) {
  d.x = +d.x;
  d.y = +d.y;
  return d;
}

const loadData = path =>
  new Promise((resolve, reject) =>
    d3.tsv(path, dottype, (error, data) => resolve(data))
  );

async function main() {

  function zoomed() {
    container.attr(
      "transform",
      "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"
    );
  }


  const margin = { top: 0, right: 0, bottom: 0, left: 0 };
  const width = "100%"
  const height = "100%"

  const zoom = d3.behavior
    .zoom()
    .scaleExtent([1, 10])
    .on("zoom", zoomed);

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
    .call(zoom);

  svg
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all");

  const container = svg
    .append("g");
  const dots = await loadData("dots.tsv");
  container
    .append("g")
    .attr("class", "dot")
    .selectAll("circle")
    .data(dots)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
}
main();