var width = 330
    height = 330
    margin = 5

var radius = Math.min(width, height) / 2 - margin

    
    var color = d3.scaleOrdinal()
     .domain([0, 1, 2])
     .range(["#5cb85c", "#f0ad4e", "#d9534f"]);
    

    var arc = d3.arc()
     .innerRadius(function(d) {return d.wind*radius/20})
     .outerRadius(function(d) {return (d.wind+5)*radius/20})
     .startAngle(function(d) {return (d.angle-22.5)*(Math.PI/180)})
     .endAngle(function(d) {return (d.angle+22.5)*(Math.PI/180)})

     var outerArc = d3.arc()
     .innerRadius(radius * 0.9)
     .outerRadius(radius * 0.9)

    var updatescore = function(d, i){
        i.score = (i.score == 2 ? 0 : i.score + 1)
        
        d3.select(this)
        .style("fill", function(d) { return color(i.score); });
    
    };

    svg.append('g')
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
      .attr("d", function (d) { return arc(d); } )
      .style("fill", function (d) { return color(d.score) } )
      .style("stroke", '#EAECEE' )
      {% if user.is_superuser %}
      .on("click", updatescore)
      {% endif %}
    
      svg
      .selectAll('labels')
      .data(data)
      .enter()
      .append('text')
      .attr("font-size", 14)
      .attr("pointer-events", "none")
    .text( function(d) { return  d.label} )
    .attr('fill', 'white')
    .attr('transform', function(d) {
        var pos = arc.centroid(d)
        return 'translate(' + pos + ')';
    })