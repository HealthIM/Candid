var width  = 400,
    height = 250,
    scores = [{"key":"red","colour": "#cc0000","score" : 0}, {"key":"blue","colour": "#0099ff","score" : 0}, {"key":"green","colour": "#99cc00","score" : 0}];

 window.onload = function(){
   	scores.map(function(d, i) {d.score = data[i]; return d;});

  	var x = d3.scaleBand().range([0, width]).domain(scores.map(function(d){return d.key;})).padding(0.2),
    		y = d3.scaleLinear().range([height, 0]).domain([0,10]);

    var svg = d3.select('body').append('svg').attr("height", height + 50).attr("width", width + 50);
    var g = svg.append("g")
                .attr("width", width).attr("height", height)
                .attr("transform", "translate(25,25)");

  	g.append("g").attr("transform", "translate(0," + height + ")")
  		            .call(d3.axisBottom(x));

    g.selectAll(".bar")
    	.data(scores)
    	.enter().append("rect")
    		.attr("x", function(d){ return x(d.key); })
    		.attr("y", function(d){ return y(d.score); })
    		.attr("fill", function(d){return d.colour})
    		.attr("width",  x.bandwidth())
    		.attr("height", function(d){ return height - y(d.score)});

    g.selectAll(".title")
    	.data([title])
   		.enter().append("text")
   			.attr("class", "title")
   			.attr("text-anchor", "middle")
   			.attr("x", width/2)
    		.attr("y", 0)
    		.text(function(d) {return d;});
}	