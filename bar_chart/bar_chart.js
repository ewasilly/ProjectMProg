// Name: Ewa Sillem
// Student number: 12149071
// Description: This file contains all the javascript code for the scatterplot

//
d3.json("data/data_pie_bar.json").then(function(data) {

  console.log(data);
  console.log(data[0]['||Stoppoging in afgelopen 12 maanden']);

    //set up data
  var el = [data[0]['Kenmerken personen'][15], data[0]['Kenmerken personen'][16],
            data[0]['Kenmerken personen'][17], data[0]['Kenmerken personen'][18],
            data[0]['Kenmerken personen'][19]];

  console.log(el);

  /*list of values for percentages of the smokers that tried to quit smoking
  in the past 12 months*/
  var data_quit = [];
  for(i = 15; i < 20; i++) {
    data_quit.push(data[0]['||Stoppoging in afgelopen 12 maanden'][i]);
  }

  console.log(data_quit);

  //list of values for amount of cigarettes smoked per day
  var data_cigs = [];
  for(i = 15; i < 20; i++) {
    data_cigs.push(data[0]["|||Sigaretten per dag per roker "][i]);
  }

  console.log(data_cigs);

  //list of values for heavy for smokers
  var data_heavy = [];
  for(i = 15; i < 20; i++) {
    data_heavy.push(data[0]["|||Zware rokers onder rokers"][i]);
  }
  console.log(data_heavy);


  //functions for toggling between data
  function change(value){
    console.log(value);

  	if(value === 'cigarettes per day'){
  		update(data_cigs, cigsperday);
  	}
    else if(value === 'heavy smokers'){
  		update(data_heavy, heavy);
  	}
    else if(value === 'attempt to quit')
    {
  		update(data_quit, quit);
  	}
  }


  function update(data, value) {
    console.log(data);
  	//set domain for the x axis
  	xChart.domain(el.map(function(d) {
      return d
    }));
  	//set domain for y axis
  	yChart.domain([0,100]);

  	//get the width of each bar
  	var barWidth = width / data.length;

  	//select all bars on the graph, take them out, and exit the previous data set.
  	//then you can add/enter the new data set
  	var bars = svg.selectAll(".bar")
  					.remove()
  					.exit()
  					.data(data)


  	//now actually give each rectangle the corresponding data
  	bars.enter()
  		.append("rect")
  		.attr("class", "bar")
  		.attr("x", function(d, i) {
        return i * barWidth + 1;
      })
  		.attr("y", function(d){
        return yChart(parseFloat(d));
      })
  		.attr("height", function(d) {
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

  //set up svg
  var margin = {top: 20, right: 20, bottom: 95, left: 50};
  var width = 800;
  var height = 500;

  /* Add svg */
  var svg = d3.select("body").append("svg")
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
  update(data_quit);
});
