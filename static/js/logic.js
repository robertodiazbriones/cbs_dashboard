//Create variable to link drop down menu on html
var dropdownmenu = d3.select('#selDataset');

//Create variable to display map
var myMap = L.map("map", {
    center: [38.9072, -77.0369],
    zoom: 12.5
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
  
  var link = "https://robertodiazbriones.github.io/data/CBS_totals.json";
  // var link = "https://robertodiazbriones.github.io/data/CBS_total.json";
  // Grabbing our GeoJSON data..
  console.log(link);
  d3.json(link, function(data) {
    //var earthquake_loc = [];
    // console.log(data.cbs_data);
    console.log(data.cbs_data.length);

// Render Map 
    for (var i = 0; i < data.cbs_data.length; i++) {
      var lat = +data.cbs_data[i].lat;
      var lng = +data.cbs_data[i].lng;
      var sta_id = data.cbs_data[i].station_id;
      var sta_loc = [lat, lng];
   
      // console.log(school_location);
      // console.log(demo_data);
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
                                          // address:data.cbs_data[i].address,
                                          station:data.cbs_data[i].station_id}}};

      L.circle(sta_loc, {
        fillOpacity: 0.80,
        // color: "white",
        fillColor: "red",
        // Adjust radiuss
        radius: 20
      })
       //.bindPopup("<h1>" + sta_id + "</h1>").addTo(myMap);
      .bindPopup(barchart(demo_data)).addTo(myMap);
    }

    var data_distnames = data.cbs_data;
    data_distnames.forEach(function (d) {
      dropdownmenu
          .append("option")
          .attr('value', d.index) 
          // .text(d.station_id+':'+d.address);
          .text(d.station_id);
          });
  });

  function barchart(data){
    var feature = data.feature;
    // console.log(feature.properties);
    var data = feature.properties.data;
    //console.log(data);
    
    var width = 280;
    var height = 80;
    var margin = {left:5, right:10,top:40,bottom:40};
    var parse = d3.timeParse("%y");
    var format = d3.timeFormat("%b");
    
    var div = d3.create("div")
    var svg = div.append("svg")
      .attr("width", width+margin.left+(margin.right*10))
      .attr("height", height+margin.top+margin.bottom);
    var g = svg.append("g")
      //.attr("transform","translate("+[margin.left,margin.top]+")");
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

  // function piechart(data, district){
    
  //   var width = 200;
  //   var height = 170;
  //   var margin = {left:20,right:20,top:20,bottom:20};

  //   var div = d3.create("div")
  //   var svg = div.append("svg")
  //     .attr("width", width+margin.left+margin.right)
  //     .attr("height", height+margin.top+margin.bottom);
  //   var g=svg.append("g")
  //     .attr("transform","translate(" + (width / 2 -30) + "," + height / 2 + ")");  

    
  //   var color = d3.scaleOrdinal().domain(data).range(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c'])
    
  //   // Compute the position of each group on the pie:
  //   var pie = d3.pie()
  //   .value(function(d) {return d.value; })
  //   var data_ready = pie(d3.entries(data))
  //   // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    
  //   g.selectAll(null)
  //   .data(data_ready)
  //   .enter()
  //   .append('path')
  //   .attr('d', d3.arc()
  //   .innerRadius(30)
  //   .outerRadius(50)
  //   )
  //   .attr('fill', function(d){ return(color(d.data.key)) })
  //   .attr("stroke", "black")
  //   .style("stroke-width", "2px")
  //   .style("opacity", 0.7);
    

  //   svg.append("g")
  //              .attr("transform", "translate(" + (width / 2 - 80) + "," + 20 + ")")
  //              .append("text")
  //              .text(district)
  //             //  .style("font-size", "15px")
  //              .style("textLength", "120")
  //              .attr("class", "title")


  //   var labelHeight = 15;
  //   const legend = svg
  //   .append('g')
  //   .attr('transform', "translate(" + (65*2) + "," + 50 + ")");

  //   legend
  //   .selectAll(null)
  //   .data(data_ready)
  //   .enter()
  //   .append('rect')
  //   .attr('y', d => labelHeight * d.index * 1.8)
  //   .attr('width', labelHeight)
  //   .attr('height', labelHeight)
  //   .attr('fill', function(d){ return(color(d.data.key)) })
  //   .attr('stroke', 'grey')
  //   .style('stroke-width', '1px');

  //   legend
  //   .selectAll(null)
  //   .data(data_ready)
  //   .enter()
  //   .append('text')
  //   // .text(d => d.data.key)
  //   .text(function (d) { return (d.data.value+'% '+d.data.key); })
  //   .attr('x', labelHeight * 1.2)
  //   .attr('y', d => labelHeight * d.index * 1.8 + labelHeight)
  //   .style('font-family', 'sans-serif')
  //   .style('font-size', `${labelHeight}px`);
  //   // .style('font-size', `15px`);

  //   return div.node();
  // }

  function optionChanged(value){
    console.log(value);
    d3.select("#barchart").html('')
    var link = "https://robertodiazbriones.github.io/data/CBS_totals.json";
      d3.json(link, function(data) {
        var i=value;
        var station_id = data.cbs_data[i].station_id;
        //var demo_data = {White:data.district_data[i].ave_prcnt_wht, Black:data.district_data[i].ave_prcnt_bk, Hispanic:data.district_data[i].ave_prcnt_hisp, Asian:data.district_data[i].ave_prcnt_asn, Other:data.district_data[i].ave_prcnt_othr}
        //var demo_data = {White:Math.round(data.district_data[i].ave_prcnt_wht), Black:Math.round(data.district_data[i].ave_prcnt_bk), Hispanic:Math.round(data.district_data[i].ave_prcnt_hisp), Asian:Math.round(data.district_data[i].ave_prcnt_asn), Other:Math.round(data.district_data[i].ave_prcnt_othr)}
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

  // function populate_piechart(data){
  //   var width = 400;
  //   var height = 300;
  //   var margin = {left:20,right:20,top:20,bottom:20};
  //   var svg =d3.select("#demo-piechart")
  //     .append("svg")
  //     .attr("width", width+margin.left+margin.right)
  //     .attr("height", height+margin.top+margin.bottom);
  //   var g=svg.append("g")
  //     .attr("transform","translate(" + ((width / 3)+50) + "," + height / 2 + ")");  

    
  //   var color = d3.scaleOrdinal().domain(data).range(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c'])
    
  //   // Compute the position of each group on the pie:
  //   var pie = d3.pie()
  //   .value(function(d) {return d.value; })
  //   var data_ready = pie(d3.entries(data))
  //   // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    
  //   var arc = d3.arc()
  //   .innerRadius(50)
  //   .outerRadius(80);

  //   var label = d3.arc()
  //                     .outerRadius(50)
  //                     .innerRadius(80);


  //   g.selectAll(null)
  //   .data(data_ready)
  //   .enter()
  //   .append('path')
  //   .attr('d', arc)
  //   .attr('fill', function(d){ return(color(d.data.key)) })
  //   .attr("stroke", "black")
  //   .style("stroke-width", "2px")
  //   .style("opacity", 0.7)
  //   .transition()
  //   .duration(1000)
  //   .attrTween("d", function (d) {
  //       var i = d3.interpolate(d.endAngle, d.startAngle);
  //       return function (t) {
  //           d.startAngle = i(t);
  //           return arc(d);
  //       }
  //   });
    
  //   svg.append("g")
  //              .attr("transform", "translate(" + (width / 2 - 300) + "," + 20 + ")")
  //              .append("text")
  //              .attr("class", "title");

  //   var labelHeight = 18;
  //   const legend = svg
  //   .append('g')
  //   .attr('transform', "translate(" + (100*3) + "," + 80 + ")");
    
  //   legend
  //   .selectAll(null)
  //   .data(data_ready)
  //   .enter()
  //   .append('rect')
  //   .attr('y', d => labelHeight * d.index * 1.8)
  //   .attr('width', labelHeight)
  //   .attr('height', labelHeight)
  //   .attr('fill', function(d){ return(color(d.data.key)) })
  //   .attr('stroke', 'grey')
  //   .style('stroke-width', '1px');

  //   legend
  //   .selectAll(null)
  //   .data(data_ready)
  //   .enter()
  //   .append('text')
  //   // .text(d => d.data.key)
  //   .text(function (d) { return (d.data.value+'% '+d.data.key); })
  //   // .text(piechart_text(data_ready))
  //   .attr('x', labelHeight * 1.2)
  //   .attr('y', d => labelHeight * d.index * 1.8 + labelHeight)
  //   .style('font-family', 'sans-serif')
  //   .style('font-size', `${labelHeight}px`);
  // }

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
      //.attr("transform","translate("+[margin.left,margin.top]+")");
      //.attr("transform","translate(" + (width/8) + "," + height / 2 + ")");  
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





  
