// Name: Ewa Sillem
// Student number: 12149071
// Description: This file contains all the javascript code for the scatterplot

function bar() {
  var width = 800;
  var height = 400;
  var margin = {top: 20, right: 20, bottom: 30, left: 40}

  var svg = d3v4.select("#bar").append("svg")
    .attr("width", 1100)
    .attr("height", 500)
      //width = +svg.attr("width") - margin.left - margin.right,
      //height = +svg.attr("height") - margin.top - margin.bottom,

  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + (margin.top+40) + ")")

  // The scale spacing the groups:
  var x0 = d3v4.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1);

  // The scale for spacing each group's bar:
  var x1 = d3v4.scaleBand()
      .padding(0.05);

  var y = d3v4.scaleLinear()
      .rangeRound([height, 0]);

  var z = d3v4.scaleOrdinal()
      .range(["#6b486b", "#a05d56", "#d0743c"]);

  d3v4.csv("data/data_barChart.csv", function(d, i, columns) {
    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    return d;
  }, function(error, data) {
    if (error) throw error;

    var keys = data.columns.slice(1);

    x0.domain(data.map(function(d) {
      return d.Onderwijsniveau;
    }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3v4.max(data, function(d) {
      return d3v4.max(keys, function(key) {
        return d[key];
      });
    })]).nice();

   g.append("g")
      .selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("class","bar")
      .attr("transform", function(d) { return "translate(" + x0(d.Onderwijsniveau) + ",0)"; })
      .selectAll("rect")
      .data(function(d) {
        return keys.map(function(key) {
          return {key: key, value: d[key]};
        });
      })
      .enter().append("rect")
        .attr("x", function(d) { return x1(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x1.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", function(d) { return z(d.key); });

    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3v4.axisBottom(x0));

    g.append("g")
        .attr("class", "y axis")
        .call(d3v4.axisLeft(y).ticks(null, "s"))
      .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("% or number");

    var legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys.slice().reverse())
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(200," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 17)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", z)
        .attr("stroke", z)
        .attr("stroke-width",2)
        .on("click",function(d) { update(d) });

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });

    var filtered = [];

    ////
    //// Update and transition on click:
    ////

    function update(d) {

      //
      // Update the array to filter the chart by:
      //

      // add the clicked key if not included:
      if (filtered.indexOf(d) == -1) {
       filtered.push(d);
        // if all bars are un-checked, reset:
        if(filtered.length == keys.length) filtered = [];
      }
      // otherwise remove it:
      else {
        filtered.splice(filtered.indexOf(d), 1);
      }

      //
      // Update the scales for each group(/states)'s items:
      //
      var newKeys = [];
      keys.forEach(function(d) {
        if (filtered.indexOf(d) == -1 ) {
          newKeys.push(d);
        }
      })
      x1.domain(newKeys).rangeRound([0, x0.bandwidth()]);
      y.domain([0, d3v4.max(data, function(d) { return d3v4.max(keys, function(key) { if (filtered.indexOf(key) == -1) return d[key]; }); })]).nice();

      // update the y axis:
              svg.select(".y")
              .transition()
              .call(d3v4.axisLeft(y).ticks(null, "s"))
              .duration(500);


      //
      // Filter out the bands that need to be hidden:
      //
      var bars = svg.selectAll(".bar").selectAll("rect")
        .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })

     bars.filter(function(d) {
           return filtered.indexOf(d.key) > -1;
        })
        .transition()
        .attr("x", function(d) {
          return (+d3v4.select(this).attr("x")) + (+d3v4.select(this).attr("width"))/2;
        })
        .attr("height",0)
        .attr("width",0)
        .attr("y", function(d) { return height; })
        .duration(500);

      //
      // Adjust the remaining bars:
      //
      bars.filter(function(d) {
          return filtered.indexOf(d.key) == -1;
        })
        .transition()
        .attr("x", function(d) { return x1(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .attr("width", x1.bandwidth())
        .attr("fill", function(d) { return z(d.key); })
        .duration(500);


      // update legend:
      legend.selectAll("rect")
        .transition()
        .attr("fill",function(d) {
          if (filtered.length) {
            if (filtered.indexOf(d) == -1) {
              return z(d);
            }
             else {
              return "white";
            }
          }
          else {
           return z(d);
          }
        })
        .duration(100);


    }

  });
}
// function bar() {
//   var width = 960;
//   var height = 500;
//   var margin = {top: 20, right: 20, bottom: 30, left: 40}
//
//   var svg = d3v4.select("#bar").append("svg")
//       .attr("width", width - margin.left - margin.right)
//       .attr("height", height - margin.top - margin.bottom)
//
//   var g = svg.append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//   // The scale spacing the groups:
//   var x0 = d3v4.scaleBand()
//       .rangeRound([0, width])
//       .paddingInner(0.1);
//
//   // The scale for spacing each group's bar:
//   var x1 = d3v4.scaleBand()
//       .padding(0.05);
//
//   var y = d3v4.scaleLinear()
//       .rangeRound([height, 0]);
//
//   var z = d3v4.scaleOrdinal()
//       .range(["#98abc5", "#8a89a6", "#7b6888"]);
//
// d3v4.csv("data/data_bar_new.csv").then(function(d, i)
//  {
//   var data = d;
//   var keys = [];
//
//   for(i = 0; i < 4; ++i) {
//     keys.push(d[i]["Onderwijsniveau"]);
//   }
//
//   console.log(keys);
//
//     x0.domain(d.map(function(d) {
//       console.log(d.Onderwijsniveau);
//       return d.Onderwijsniveau;
//     }));
//     x1.domain(keys).rangeRound([0, x0.bandwidth()]);
//     y.domain([0, d3v4.max(d, function(d) {
//       return d3v4.max(keys, function(key) {
//         console.log(d);
//         console.log(key);
//         console.log(d[key]);
//         return d[key];
//       });
//     })]).nice();
//
//     g.append("g")
//       .selectAll("g")
//       .data(data)
//       .enter().append("g")
//       .attr("class","bar")
//       .attr("transform", function(d) { return "translate(" + x0(d.Onderwijsniveau) + ",0)"; })
//       .selectAll("rect")
//       .data(function(d) {
//         return keys.map(function(key) {
//           console.log(d);
//           console.log({key: key, value: d[key]});
//           return {key: key, value: d[key]};
//         });
//       })
//       .enter().append("rect")
//         .attr("x", function(d) { console.log(d);return x1(d.key); })
//         .attr("y", function(d) { return y(d.value); })
//         .attr("width", x1.bandwidth())
//         .attr("height", function(d) { return height - y(d.value); })
//         .attr("fill", function(d) { return z(d.key); });
//
//     g.append("g")
//         .attr("class", "axis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3v4.axisBottom(x0));
//
//     g.append("g")
//         .attr("class", "y axis")
//         .call(d3v4.axisLeft(y).ticks(null, "s"))
//       .append("text")
//         .attr("x", 2)
//         .attr("y", y(y.ticks().pop()) + 0.5)
//         .attr("dy", "0.32em")
//         .attr("fill", "#000")
//         .attr("font-weight", "bold")
//         .attr("text-anchor", "start")
//         .text("Population");
//
//     var legend = g.append("g")
//         .attr("font-family", "sans-serif")
//         .attr("font-size", 10)
//         .attr("text-anchor", "end")
//       .selectAll("g")
//       .data(keys.slice().reverse())
//       .enter().append("g")
//         .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
//
//     legend.append("rect")
//         .attr("x", width - 17)
//         .attr("width", 15)
//         .attr("height", 15)
//         .attr("fill", z)
//         .attr("stroke", z)
//         .attr("stroke-width",2)
//         .on("click",function(d) { update(d) });
//
//     legend.append("text")
//         .attr("x", width - 24)
//         .attr("y", 9.5)
//         .attr("dy", "0.32em")
//         .text(function(d) { return d; });
//
//     var filtered = [];
//
//     ////
//     //// Update and transition on click:
//     ////
//
//     function update(d) {
//
//       //
//       // Update the array to filter the chart by:
//       //
//
//       // add the clicked key if not included:
//       if (filtered.indexOf(d) == -1) {
//        filtered.push(d);
//         // if all bars are un-checked, reset:
//         if(filtered.length == keys.length) filtered = [];
//       }
//       // otherwise remove it:
//       else {
//         filtered.splice(filtered.indexOf(d), 1);
//       }
//
//       //
//       // Update the scales for each group(/states)'s items:
//       //
//       var newKeys = [];
//       keys.forEach(function(d) {
//         if (filtered.indexOf(d) == -1 ) {
//           newKeys.push(d);
//         }
//       })
//       x1.domain(newKeys).rangeRound([0, x0.bandwidth()]);
//       y.domain([0, d3v4.max(data, function(d) { return d3v4.max(keys, function(key) { if (filtered.indexOf(key) == -1) return d[key]; }); })]).nice();
//
//       // update the y axis:
//               svg.select(".y")
//               .transition()
//               .call(d3v4.axisLeft(y).ticks(null, "s"))
//               .duration(500);
//
//
//       //
//       // Filter out the bands that need to be hidden:
//       //
//       var bars = svg.selectAll(".bar").selectAll("rect")
//         .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
//
//      bars.filter(function(d) {
//            return filtered.indexOf(d.key) > -1;
//         })
//         .transition()
//         .attr("x", function(d) {
//           return (+d3v4.select(this).attr("x")) + (+d3v4.select(this).attr("width"))/2;
//         })
//         .attr("height",0)
//         .attr("width",0)
//         .attr("y", function(d) { return height; })
//         .duration(500);
//
//       //
//       // Adjust the remaining bars:
//       //
//       bars.filter(function(d) {
//           return filtered.indexOf(d.key) == -1;
//         })
//         .transition()
//         .attr("x", function(d) { return x1(d.key); })
//         .attr("y", function(d) { return y(d.value); })
//         .attr("height", function(d) { return height - y(d.value); })
//         .attr("width", x1.bandwidth())
//         .attr("fill", function(d) { return z(d.key); })
//         .duration(500);
//
//
//       // update legend:
//       legend.selectAll("rect")
//         .transition()
//         .attr("fill",function(d) {
//           if (filtered.length) {
//             if (filtered.indexOf(d) == -1) {
//               return z(d);
//             }
//              else {
//               return "white";
//             }
//           }
//           else {
//            return z(d);
//           }
//         })
//         .duration(100);
//     }
// })}
