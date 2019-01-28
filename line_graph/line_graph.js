// Name: Ewa Sillem
// Student number: 12149071
// Description: This file contains all the javascript code for the scatterplot
function test(x){
  d3.json("data/data_line.json").then(function(data){
    console.log(data);
    console.log(x);
    console.log(data[x]);

    var width = 900;
    var height = 400;
    var margin = 50;
    var duration = 250;

    /* Add Axis into svg */
    var xAxis = d3.axisBottom(xScale).ticks(28);
    var yAxis = d3.axisLeft(yScale).ticks(5);

    // format data
    if (x === "Mannen") {
      var gender = "Men"
    }
    if (x === "Vrouwen") {
      var gender = "Women";
    }
    else {
      var gender = "Total"
    }

    var parseDate = d3.timeParse("%Y");
    var value_list = [];
    for(i = 0; i < 28; ++i){
      value_list.push({year: parseDate(data['Jaar'][i]), value: parseInt(data[x][i])});
    }

    var data_update = [{name: gender, values:value_list}]

    console.log(data_update);

    console.log(data_update);

      var color = d3.scaleOrdinal(d3.schemeCategory10);

    /* Scale */
    var xScale = d3.scaleTime()
      .domain(d3.extent(data_update[0].values, d => d.year))
      .range([0, width-margin]);

    var yScale = d3.scaleLinear()
      .domain([0, d3.max(data_update[0].values, d => d.value)])
      .range([height-margin, 0]);


    update(data_update);


    function update(data) {
      svg = d3.select("#lineG")

      /* Add line into svg */
      var line = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.value));

        //d3.select(".lines").remove();

      let lines = svg.append('g')
        .attr('class', 'lines');

      console.log(data);
      // console.log();

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
        // .style('opacity', lineOpacity)
        // .on("mouseover", function(d) {
        //     d3.selectAll('.line')
        //         .style('opacity', otherLinesOpacityHover);
        //     d3.selectAll('.circle')
        //         .style('opacity', circleOpacityOnLineHover);
        //     d3.select(this)
        //       .style('opacity', lineOpacityHover)
        //       .style("stroke-width", lineStrokeHover)
        //       .style("cursor", "pointer");
        //   })
        // .on("mouseout", function(d) {
        //     d3.selectAll(".line")
        //         .style('opacity', lineOpacity);
        //     d3.selectAll('.circle')
        //         .style('opacity', circleOpacity);
        //     d3.select(this)
        //       .style("stroke-width", lineStroke)
        //       .style("cursor", "none");
        //   });
      //
      //
      // lines.selectAll('.line-group')
      //   .data(data[0].values).enter()
      //   .append('g')
      //   .attr('class', 'line-group')
      //   .on("mouseover", function(d, i) {
      //       svg.append("text")
      //         .attr("class", "title-text")
      //         .style("fill", color(i))
      //         .text(d.name)
      //         .attr("text-anchor", "middle")
      //         .attr("x", (width-margin)/2)
      //         .attr("y", 5);
      //     })
      //   .on("mouseout", function(d) {
      //       svg.select(".title-text").remove();
      //     })
      //   .append('path')
      //   .attr('class', 'line')
      //   .attr('d', d => line(d.values))
      //   .style('stroke', (d, i) => color(i))
      //   .style('opacity', "0.25")
      //   .on("mouseover", function(d) {
      //       d3.selectAll('.line')
      //           .style('opacity', "0.1");
      //       d3.selectAll('.circle')
      //           .style('opacity', "0.25");
      //       d3.select(this)
      //         .style('opacity', "0.85")
      //         .style("stroke-width",  "2.5px")
      //         .style("cursor", "pointer");
      //     })
      //   .on("mouseout", function(d) {
      //       d3.selectAll(".line")
      //           .style('opacity', "0.25");
      //       d3.selectAll('.circle')
      //           .style('opacity', "0.85");
      //       d3.select(this)
      //         .style("stroke-width", "1.25px")
      //         .style("cursor", "none");
      //     });
      //
      //
      // /* Add circles in the line */
      // lines.selectAll("circle-group")
      //   .data(data[0]).enter()
      //   .append("g")
      //   .style("fill", (d, i) => color(i))
      //   .selectAll("circle")
      //   .data(d => d.values).enter()
      //   .append("g")
      //   .attr("class", "circle")
      //   .on("mouseover", function(d) {
      //       d3.select(this)
      //         .style("cursor", "pointer")
      //         .append("text")
      //         .attr("class", "text")
      //         .text(`${d.value}`)
      //         .attr("x", d => xScale(d.year) + 5)
      //         .attr("y", d => yScale(d.value) - 10);
      //     })
      //   .on("mouseout", function(d) {
      //       d3.select(this)
      //         .style("cursor", "none")
      //         .transition()
      //         .duration(250)
      //         .selectAll(".text").remove();
      //     })
      //   .append("circle")
      //   .attr("cx", d => xScale(d.year))
      //   .attr("cy", d => yScale(d.value))
      //   .attr("r", 3)
      //   .style('opacity', '0.85')
      //   .on("mouseover", function(d) {
      //         d3.select(this)
      //           .transition()
      //           .duration(250)
      //           .attr("r", 6);
      //       })
      //     .on("mouseout", function(d) {
      //         d3.select(this)
      //           .transition()
      //           .duration(250)
      //           .attr("r", 3);
      //       });
      }}
    )
}

function line(data) {

  /*Function for adding the axes of the line graph*/
  var values_men = [];
  var values_women = [];
  var values_total = [];

  for(key in data["Mannen"]) {
    values_men.push({year: data["Jaar"][key], value: parseFloat(data["Mannen"][key])})
  }

  for(key in data["Vrouwen"]) {
    values_women.push({year: data["Jaar"][key], value: parseFloat(data["Vrouwen"][key])})
  }

  for(key in data["Totaal"]) {
    values_total.push({year: data["Jaar"][key], value: parseFloat(data["Totaal"][key])})
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

  var data_men = [{name:"Men", values:values_men}];
  var data_women = [{name:"Women", values:values_women}];
  var data_total = [{name:"Total", values:values_total}];

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

  console.log(data[0].values);

  /* Scale */
  var xScale = d3.scaleTime()
    .domain(d3.extent(data[0].values, d => d.year))
    .range([0, width-margin]);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data[0].values, d => d.value)])
    .range([height-margin, 0]);

  var color = d3.scaleOrdinal(d3.schemeCategory10);

  /* Add svg */
  svg = d3.select("#line").append("svg")
    .attr("id", "lineSVG")
    .attr("width", width)
    .attr("height", height+100)
    .append("g")
    .attr("id", "lineG")
    .attr("transform", "translate(" + 40 + "," + 10 + ")");

  /* Add Axis into svg */
  var xAxis = d3.axisBottom(xScale).ticks(28);
  var yAxis = d3.axisLeft(yScale).ticks(5);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height-margin})`)
    .call(xAxis)
    .append('text')
    .attr("y", 35)
    .attr("x", 820)
    .attr("fill", "#000")
    .text("Year");

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append('text')
    .attr("y", -25)
    .attr("x", 0)
    .attr("transform", "rotate(-90)")
    .attr("fill", "#000")
    .text("Smokers (%)");


  /* Add line into svg */
  var line = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.value));

  let lines = svg.append('g')
    .attr('class', 'lines');

  console.log(data_total);

  lines.selectAll('.line-group')
    .data(data_total).enter()
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
    .data(data_total).enter()
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
}
