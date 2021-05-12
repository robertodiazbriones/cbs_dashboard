//Create variable to link drop down menu on html
var dropdownmenu = d3.select('#selDataset');

//Create variable to display map
var myMap = L.map("map", {
    center: [38.9072, -77.0369],
    zoom: 13
  });

  //Define layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
  }).addTo(myMap);
  
  //var link = "https://robertodiazbriones.github.io/data/CBS_totals.json";
  var link = "https://robertodiazbriones.github.io/data/CBS_total.json";

  console.log(link);
  d3.json(link, function(data) {
    // console.log(data.cbs_data);
    console.log(data.cbs_data.length);

    // Render Map 
    for (var i = 0; i < data.cbs_data.length; i++) {
      var lat = +data.cbs_data[i].lat;
      var lng = +data.cbs_data[i].lng;
      var sta_id = data.cbs_data[i].station_id;
      var sta_loc = [lat, lng];
      var demo_data={feature:{properties:{data:[data.cbs_data[i].trips_2010, 
                                          data.cbs_data[i].trips_2011,
                                          data.cbs_data[i].trips_2012, 
                                          data.cbs_data[i].trips_2013, 
                                          data.cbs_data[i].trips_2014, 
                                          data.cbs_data[i].trips_2015, 
                                          data.cbs_data[i].trips_2016, 
                                          data.cbs_data[i].trips_2017, 
                                          data.cbs_data[i].trips_2018, 
                                          data.cbs_data[i].trips_2019],
                                          address:data.cbs_data[i].address,
                                          station:data.cbs_data[i].station_id}}};

      L.circle(sta_loc, {
        fillOpacity: 0.80,
        fillColor: "red",
        radius: 20
      })
      .bindPopup(barchart(demo_data)).addTo(myMap);
    }

    var data_distnames = data.cbs_data;
    data_distnames.forEach(function (d) {
      dropdownmenu
          .append("option")
          .attr('value', d.index) 
          .text(d.station_id+':'+d.address);
          });
  });

  function barchart(data){
    var feature = data.feature;
    var data = feature.properties.data;
    var width = 280;
    var height = 80;
    var margin = {left:5, right:10,top:40,bottom:40};

    var div = d3.create("div")
    var svg = div.append("svg")
      .attr("width", width+margin.left+(margin.right*10))
      .attr("height", height+margin.top+margin.bottom);
    var g = svg.append("g")
      .attr("transform","translate(" + (width/7.5) + "," + height / 2 + ")"); 

    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return d; }) ])
      .range([height,0]);
    var yAxis = d3.axisLeft()
      .ticks(6)
      .scale(y);

    g.append("g").call(yAxis);
      
    var x = d3.scaleBand()
      .domain(d3.range(10))
      .range([0,width]);
    var xAxis = d3.axisBottom()
      .scale(x)
      .tickFormat((d, i) => ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'][i]);
      
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("text-anchor","end")
        .attr("transform","rotate(-90)translate(-12,-15)")
      
    var rects = g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y",height)
      .attr("height",0)
      .attr("width", x.bandwidth()-2 )
      .attr("x", function(d,i) { return x(i); })
      .attr("fill","steelblue")
      .transition()
      .attr("height", function(d) { return height-y(d); })
      .attr("y", function(d) { return y(d); })
      .duration(1000);
      
    var title = svg.append("text")
      .style("font-size", "20px")
      .text(feature.properties.station)
      .attr("x", width/2 + margin.left)
      .attr("y", 30)
      .attr("text-anchor","middle");
      
    return div.node();
  }

  function optionChanged(value){
    console.log(value);
    d3.select("#barchart").html('')
    var link = "https://robertodiazbriones.github.io/data/CBS_totals.json";
      d3.json(link, function(data) {
        var i=value;
        var station_id = data.cbs_data[i].station_id;
        var demo_data={feature:{properties:{data:[data.cbs_data[i].trips_2010, 
          data.cbs_data[i].trips_2011,
          data.cbs_data[i].trips_2012, 
          data.cbs_data[i].trips_2013, 
          data.cbs_data[i].trips_2014, 
          data.cbs_data[i].trips_2015, 
          data.cbs_data[i].trips_2016, 
          data.cbs_data[i].trips_2017, 
          data.cbs_data[i].trips_2018, 
          data.cbs_data[i].trips_2019],
          station:data.cbs_data[i].station_id}}};
        
        
        populate_barchart(demo_data, station_id);
    });
  };

  function populate_barchart(data){
    var feature = data.feature;
    // console.log(feature.properties);
    var data = feature.properties.data;
    //console.log(data);
    
    var width = 400;
    var height = 200;
    var margin = {left:0, right:0,top:100,bottom:100};
    var parse = d3.timeParse("%y");
    var format = d3.timeFormat("%b");
    
    var div = d3.create("div")
    var svg =d3.select("#barchart")
      .append("svg")
      .attr("width", (width+margin.left+50)+margin.right)
      .attr("height", height+margin.top+margin.bottom);
    var g = svg.append("g") 
      .attr("transform","translate(" + (margin.left+50)+ "," + height / 2 + ")");  
      
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return d; }) ])
      .range([height,0]);
      
    var yAxis = d3.axisLeft()
      .ticks(6)
      .scale(y);

    g.append("g").call(yAxis);
      
    var x = d3.scaleBand()
      .domain(d3.range(10))
      .range([0,width]);
      
    var xAxis = d3.axisBottom()
      .scale(x)
      .tickFormat((d, i) => ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'][i]);
      
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("text-anchor","end")
        .attr("transform","rotate(-90)translate(-12,-15)")
      
    var rects = g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y",height)
      .attr("height",0)
      .attr("width", x.bandwidth()-2 )
      .attr("x", function(d,i) { return x(i); })
      .attr("fill","steelblue")
      .transition()
      .attr("height", function(d) { return height-y(d); })
      .attr("y", function(d) { return y(d); })
      .duration(1000);
      
    var title = svg.append("text")
      .style("font-size", "20px")
      .text(feature.properties.station)
      .attr("x", width/2 + margin.left)
      .attr("y", 30)
      .attr("text-anchor","middle");
      
    return div.node();
  }





  
