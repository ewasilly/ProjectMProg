// Name: Ewa Sillem
// Student number: 12149071
// Description: This file contains all the javascript code for the scatterplot


d3.json("data/data_line.json", function(data) {
  console.log(data);

  var values_men = [];
  var values_women = [];
  var values_total = [];

  for(key in data["Mannen"]) {
    values_men.push({year: data["Jaar"][key], value: data["Mannen"][key]})
  }

  for(key in data["Vrouwen"]) {
    values_women.push({year: data["Jaar"][key], value: data["Vrouwen"][key]})
  }

  for(key in data["Totaal"]) {
    values_total.push({year: data["Jaar"][key], value: data["Totaal"][key]})
  }

  var data = [
    {
      name: "Men",
      values: values_men
    },
    {
      name: "Women",
      values: values_women
    },
    {
      name: "Total",
      values: values_total
    }
  ];

  console.log(data);

  var width = 900;
  var height = 400;
  var margin = 50;
  var duration = 250;

  var lineOpacity = "0.25";
  var lineOpacityHover = "0.85";
  var otherLinesOpacityHover = "0.1";
  var lineStroke = "1.5px";
  var lineStrokeHover = "2.5px";

  var circleOpacity = '0.85';
  var circleOpacityOnLineHover = "0.25"
  var circleRadius = 3;
  var circleRadiusHover = 6;


  /* Format Data */
  var parseDate = d3.timeParse("%Y");
  data.forEach(function(d) {
    d.values.forEach(function(d) {
      d.year = parseDate(d.year);
      d.value = +d.value;
    });
  });


  /* Scale */
  var xScale = d3.scaleTime()
    .domain(d3.extent(data[0].values, d => d.year))
    .range([0, width-margin]);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data[0].values, d => d.value)])
    .range([height-margin, 0]);

  var color = d3.scaleOrdinal(d3.schemeCategory10);

  /* Add SVG */
  // var svg = d3.select("#chart").append("svg")
  //   .attr("width", (width+margin)+"px")
  //   .attr("height", (height+margin)+"px")
  //   .append('g')
  //   .attr("transform", `translate(${margin}, ${margin})`);

  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + 30 + "," + 40 + ")");


  /* Add line into SVG */
  var line = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.value));

  let lines = svg.append('g')
    .attr('class', 'lines');

  lines.selectAll('.line-group')
    .data(data).enter()
    .append('g')
    .attr('class', 'line-group')
    .on("mouseover", function(d, i) {
        svg.append("text")
          .attr("class", "title-text")
          .style("fill", color(i))
          .text(d.name)
          .attr("text-anchor", "middle")
          .attr("x", (width-margin)/2)
          .attr("y", 5);
      })
    .on("mouseout", function(d) {
        svg.select(".title-text").remove();
      })
    .append('path')
    .attr('class', 'line')
    .attr('d', d => line(d.values))
    .style('stroke', (d, i) => color(i))
    .style('opacity', lineOpacity)
    .on("mouseover", function(d) {
        d3.selectAll('.line')
  					.style('opacity', otherLinesOpacityHover);
        d3.selectAll('.circle')
  					.style('opacity', circleOpacityOnLineHover);
        d3.select(this)
          .style('opacity', lineOpacityHover)
          .style("stroke-width", lineStrokeHover)
          .style("cursor", "pointer");
      })
    .on("mouseout", function(d) {
        d3.selectAll(".line")
  					.style('opacity', lineOpacity);
        d3.selectAll('.circle')
  					.style('opacity', circleOpacity);
        d3.select(this)
          .style("stroke-width", lineStroke)
          .style("cursor", "none");
      });


  /* Add circles in the line */
  lines.selectAll("circle-group")
    .data(data).enter()
    .append("g")
    .style("fill", (d, i) => color(i))
    .selectAll("circle")
    .data(d => d.values).enter()
    .append("g")
    .attr("class", "circle")
    .on("mouseover", function(d) {
        d3.select(this)
          .style("cursor", "pointer")
          .append("text")
          .attr("class", "text")
          .text(`${d.value}`)
          .attr("x", d => xScale(d.year) + 5)
          .attr("y", d => yScale(d.value) - 10);
      })
    .on("mouseout", function(d) {
        d3.select(this)
          .style("cursor", "none")
          .transition()
          .duration(duration)
          .selectAll(".text").remove();
      })
    .append("circle")
    .attr("cx", d => xScale(d.year))
    .attr("cy", d => yScale(d.value))
    .attr("r", circleRadius)
    .style('opacity', circleOpacity)
    .on("mouseover", function(d) {
          d3.select(this)
            .transition()
            .duration(duration)
            .attr("r", circleRadiusHover);
        })
      .on("mouseout", function(d) {
          d3.select(this)
            .transition()
            .duration(duration)
            .attr("r", circleRadius);
        });


  /* Add Axis into SVG */
  var xAxis = d3.axisBottom(xScale).ticks(28);
  var yAxis = d3.axisLeft(yScale).ticks(5);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height-margin-30})`)
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", `translate(0, -30)`)
    .call(yAxis)

  // Add a label to the y axis
  svg.append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", 0 - 20)
   .attr("x", 0 - 150)
   .attr("dy", "1em")
   .style("text-anchor", "middle")
   .text("Smokers (%)")
   .attr("class", "y axis label");

  // svg.append("g")
  //   .attr("class", "y axis")
  //   .attr("transform", `translate(0, -30)`)
  //   .call(yAxis)
  //   .append('text')
  //   .attr("y", 15)
  //   .attr("transform", "rotate(-90)")
  //   .attr("fill", "#000")
  //   .text("Smokers (%)");

})

//   // Create a list of the values on the x-axis
//   var years = [];
//   for (key in data['Jaar']) {
//     years.push(data['Jaar'][key]);
//   }
//
//   console.log(years);
//
//   var margin = {top: 50, right: 50, bottom: 50, left: 50}
//     , width = window.innerWidth - margin.left - margin.right // Use the window's width
//     , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height
//
//   // The number of datapoints
//   var n = 28;
//
//   // X scale will use the index of our data
//   var xScale = d3.scaleLinear()
//       .domain(1990, 2017) // input
//       .range([0, width]); // output
//
//   // Y scale will use the randomly generate number
//   var yScale = d3.scaleLinear()
//       .domain([0, 100]) // input
//       .range([height, 0]); // output
//
//   // d3's line generator
//   var line = d3.line()
//       .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
//       .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
//       .curve(d3.curveMonotoneX); // apply smoothing to the line
//
//   // An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
//   var dataset =
//
//   // Add the SVG to the page and employ #2
//   var svg = d3.select("body").append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//   // Call the x axis in a group tag
//   svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom
//
//   // Call the y axis in a group tag
//   svg.append("g")
//       .attr("class", "y axis")
//       .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft
//
//   // Append the path, bind the data, and call the line generator
//   svg.append("path")
//       .datum(dataset) // 10. Binds data to the line
//       .attr("class", "line") // Assign a class for styling
//       .attr("d", line); // 11. Calls the line generator
//
//   // Appends a circle for each datapoint
//   svg.selectAll(".dot")
//       .data(dataset)
//     .enter().append("circle") // Uses the enter().append() method
//       .attr("class", "dot") // Assign a class for styling
//       .attr("cx", function(d, i) { return xScale(i) })
//       .attr("cy", function(d) { return yScale(d.y) })
//       .attr("r", 5);
// })
