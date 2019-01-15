// Name: Ewa Sillem
// Student number: 12149071
// Description: This file contains all the javascript code for the scatterplot


d3.json("data/data_line.json", function(data) {
  console.log(data);
  //set up chart
  var margin = {top: 20, right: 20, bottom: 95, left: 50};
  var width = 800;
  var height = 500;

  /* Add SVG */
  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + 40 + "," + 10 + ")");

  var chart = d3.select(".chart")
  				.attr("width", width + margin.left + margin.right)
  				.attr("height", height + margin.top + margin.bottom)
  				.append("g")
  				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xChart = d3.scaleBand()
  				.range([0, width]);

  var yChart = d3.scaleLinear()
  				.range([height, 0]);

  var xAxis = d3.axisBottom(xChart);
  var yAxis = d3.axisLeft(yChart);

  //set up axes
  //left axis
  	chart.append("g")
  		  .attr("class", "y axis")
  		  .call(yAxis)

  	//bottom axis
  	chart.append("g")
  		.attr("class", "xAxis")
  		.attr("transform", "translate(0," + height + ")")
  		.call(xAxis)
  		.selectAll("text")
  			.style("text-anchor", "end")
  			.attr("dx", "-.8em")
  			.attr("dy", ".15em")
  			.attr("transform", function(d){
  				return "rotate(-65)";
  			});

  //add labels
  chart
  	.append("text")
  	.attr("transform", "translate(-35," +  (height+margin.bottom)/2 + ") rotate(-90)")
  	.text("% of total watch time");

  chart
  	.append("text")
  	.attr("transform", "translate(" + (width/2) + "," + (height + margin.bottom - 5) + ")")
  	.text("age group");

  //use bothData to begin with
  update(bothData);
}
