window.onload = function() {

  var input = ["data/data_pie_bar.json", "data/data_line.json"]
  var requests = [d3.json(input[0]), d3.json(input[1])];

  Promise.all(requests).then(function(data) {
    console.log([data[1]])
    pie(data[0], data[1]);
    //pie_2(data[0]);
    //pie_3(data[0]);
    //line(data[1]);
    bar();


  }).catch(function(e){
    throw(e);
  });
}
