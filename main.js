window.onload = function() {

  var input = ["data/data_pie_bar.json", "data/data_line.json"]
  var requests = [d3.json(input[0]), d3.json(input[1])];

  Promise.all(requests).then(function(data) {
    bar(data[0]);
    pie(data[0]);
    line(data[1]);

  }).catch(function(e){
    throw(e);
  });
}
