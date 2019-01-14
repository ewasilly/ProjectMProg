// Name: Ewa Sillem
// Student number: 12149071
// Description: This file contains all the javascript code for the scatterplot

d3.json("data/data_pie_bar.json", function(data) {
  console.log(data);
  var data = data[0];
  var smokers = parseInt(data['||Rokers'][0]);
  var nonsmokers = 100 - smokers;

  var data = [smokers, 100-smokers];

  var width = 700,
    height = 400,
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



  // legend dimensions
  var legendRectSize = 25; // defines the size of the colored squares in legend
  var legendSpacing = 6; // defines spacing between squares

  // define legend
  var legend = svg.selectAll('.legend') // selecting elements with class 'legend'
    .data(color.domain()) // refers to an array of labels from our dataset
    .enter() // creates placeholder
    .append('g') // replace placeholders with g elements
    .attr('class', 'legend') // each g is given a legend class
    .attr('transform', function(d, i) {
      console.log(d);
      console.log(i);
      var height = legendRectSize + legendSpacing; // height of element is the height of the colored square plus the spacing
      var offset =  height * color.domain().length / 2; // vertical offset of the entire legend = height of a single element & half the total number of elements
      var horz = 18 *legendRectSize - 750; // the legend is shifted to the left to make room for the text
      var vert = i * height - offset - 130; // the top of the element is hifted up or down from the center using the offset defiend earlier and the index of the current element 'i'
        return 'translate(' + horz + ',' + vert + ')'; //return translation
     });

  // adding colored squares to legend
  legend.append('rect') // append rectangle squares to legend
    .attr('width', legendRectSize) // width of rect size is defined above
    .attr('height', legendRectSize) // height of rect size is defined above
    .style('fill', color) // each fill is passed a color
    .style('stroke', color) // each stroke is passed a color
    .on('click', function(label) {
      var rect = d3.select(this); // this refers to the colored squared just clicked
      var enabled = true; // set enabled true to default
      var totalEnabled = d3.sum(dataset.map(function(d) { // can't disable all options
        return (d.enabled) ? 1 : 0; // return 1 for each enabled entry. and summing it up
      }));
      if (rect.attr('class') === 'disabled') { // if class is disabled
            rect.attr('class', ''); // remove class disabled
          } else { // else
            if (totalEnabled < 2) return; // if less than two labels are flagged, exit
            rect.attr('class', 'disabled'); // otherwise flag the square disabled
            enabled = false; // set enabled to false
          }

          pie.value(function(d) {
            if (d.label === label) d.enabled = enabled; // if entry label matches legend label
              return (d.enabled) ? d.count : 0; // update enabled property and return count or 0 based on the entry's status
          });

          path = path.data(pie(dataset)); // update pie with new data

          path.transition() // transition of redrawn pie
            .duration(750) //
            .attrTween('d', function(d) { // 'd' specifies the d attribute that we'll be animating
              var interpolate = d3.interpolate(this._current, d); // this = current path element
              this._current = interpolate(0); // interpolate between current value and the new value of 'd'
              return function(t) {
                return arc(interpolate(t));
              };
            });
        });

      console.log(legend)

      // adding text to legend
      legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d, i){
          if (i == 0) {
            return "Smokers"
          }
          else {
            return "Non-smokers"
          }
        }); // return label
});
