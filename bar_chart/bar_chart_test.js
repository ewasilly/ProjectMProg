// Name: Ewa Sillem
// Student number: 12149071
// Description: This file contains all the javascript code for the scatterplot

//set up svg
var margin = {top: 20, right: 20, bottom: 95, left: 50};
var width = 800;
var height = 500;

var xChart = d3.scaleBand()
        .range([0, width]);

var yChart = d3.scaleLinear()
        .range([height, 0]);

var xAxis = d3.axisBottom(xChart);
var yAxis = d3.axisLeft(yChart);

var xChart = d3.scaleBand()
        .range([0, width]);

var yChart = d3.scaleLinear()
        .range([height, 0]);

var xAxis = d3.axisBottom(xChart);
var yAxis = d3.axisLeft(yChart);


function bar(data){
  console.log(data[0]);
  var data2 = data[0];

  //set up data
  var el = [data2['Kenmerken personen'][15], data2['Kenmerken personen'][16],
            data2['Kenmerken personen'][17], data2['Kenmerken personen'][18],
            data2['Kenmerken personen'][19]];

  // //set up svg
  // var margin = {top: 20, right: 20, bottom: 95, left: 50};
  // var width = 800;
  // var height = 500;

  /* Add svg */
  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // var xChart = d3.scaleBand()
  //         .range([0, width]);
  //
  // var yChart = d3.scaleLinear()
  //         .range([height, 0]);
  //
  // var xAxis = d3.axisBottom(xChart);
  // var yAxis = d3.axisLeft(yChart);

  //set up axes
  //left axis
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)

  //bottom axis
  svg.append("g")
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
  svg.append("text")
    .attr("transform", "translate(-45, 10)")
    .text("%");

  svg.append("text")
    .attr("transform", "translate(" + (width/2) + "," + (height + margin.bottom - 40) + ")")
    .text("Education level categories");

  //use bothData to begin with
  update(data, data2, xChart, yChart, el, width, height, svg, data, yAxis, xAxis);

  console.log("TEST");
}

//BIJNA TERUG!!!!

function update(value, data2, xChart, yChart, el, width, height, svg, data, yAxis, xAxis) {
  if(value === 'cigarettes per day'){
    var category = "|||Sigaretten per dag per roker "
  }
  else if(value === 'heavy smokers') {
    var category = '|||Zware rokers onder rokers'
  }
  else {
    var category = '||Stoppoging in afgelopen 12 maanden'
  }

  console.log(data2);
  //list of values for amount of cigarettes smoked per day
  var data_bars = [];
  for(i = 15; i < 20; i++) {
    if(data2[category][i] === ".") {
      data2[category][i] = 0;
    }
    data_bars.push(data2[category][i]);
  }

  //set domain for the x axis
  xChart.domain(el.map(function(d) {
    return d
  }));
  //set domain for y axis
  yChart.domain([0,100]);

  //get the width of each bar
  var barWidth = width / data_bars.length;

  //select all bars on the graph, take them out, and exit the previous data set.
  //then you can add/enter the new data set
  var bars = svg.selectAll(".bar")
          .remove()
          .exit()
          .data(data_bars)


  //now actually give each rectangle the corresponding data
  bars.enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d, i) {
      return i * barWidth + 1;
    })
    .attr("y", function(d){
      if(d === ".") {
        d = 0;
      }
      return yChart(parseFloat(d));
    })
    .attr("height", function(d) {
      if(d === ".") {
        d = 0;
      }
      return height - yChart(parseFloat(d));
    })
    .attr("width", barWidth - 1)
    .attr("fill", function(d) {
      console.log(data)
      if(value === "cigsperday") {
        return "#964B00";
      }
      else if (value === "heavy")
      {
        return "#FFCA23";
      }
      else {
        return "#7FB70C"
      }
    });

  //left axis
  svg.select('.y')
      .call(yAxis)

  //bottom axis
  svg.select('.xAxis')
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", function(d){
        return "rotate(-65)";
      });

}//end update
