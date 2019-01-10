// Name: Ewa Sillem
// Student number: 12149071
// Description: This file contains all the javascript code for the scatterplot

// var json = 'data/data_pie_bar.json'
// var data = JSON.parse(json);


d3.json("/data/data_pie_bar.json", function(data) {
  console.log(data);
  var smokers = parseInt(data['||Rokers'][0]);
  var nonsmokers = 100 - smokers;
  console.log(smokers);
  console.log(nonsmokers);


  var data = [smokers, 100-smokers];

  var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

  var color = d3.scaleOrdinal()
    .range(["#FFDD75", "#ABCDEF"]);

  var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  var labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

  var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d; });

  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data; });

});
