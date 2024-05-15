document.addEventListener('DOMContentLoaded', function () {
  var units = "Widgets";

  var margin = { top: 10, right: 10, bottom: 10, left: 10 },
      width = 960 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

  var formatNumber = d3.format(",.0f"),
      format = function(d) { return formatNumber(d) + " " + units; },
      color = d3.scaleOrdinal(d3.schemeCategory10);

  var svg = d3.select("#sankey").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var sankey = d3.sankey()
      .nodeWidth(36)
      .nodePadding(40)
      .extent([[1, 1], [width - 1, height - 6]]);

  var graph = {
    "nodes": [
      {"name":"vendor1001"},
      {"name":"vendor1002"},
      {"name":"vendor1003"},
      {"name":"plant4"},
      {"name":"plant5"},
      {"name":"plant6"},
      {"name":"plant7"},
      {"name":"plant8"},
      {"name":"destination1"},
      {"name":"destination2"},
      {"name":"destination3"},
      {"name":"destination4"},
      {"name":"destination5"}
    ],
    "links":[
      {"source":0,"target":3,"value":6855, "delay": 0},
      {"source":0,"target":3,"value":1416, "delay": 1},
      {"source":0,"target":6,"value":93, "delay": 0},
      {"source":0,"target":6,"value":14, "delay": 1},
      {"source":1,"target":4,"value":3037, "delay": 0},
      {"source":1,"target":4,"value":591, "delay": 1},
      {"source":1,"target":7,"value":2940, "delay": 0},
      {"source":1,"target":7,"value":615, "delay": 1},
      {"source":2,"target":5,"value":3679, "delay": 0},
      {"source":2,"target":5,"value":760, "delay": 1},
      {"source":3,"target":8,"value":8269},
      {"source":4,"target":9,"value":3628},
      {"source":5,"target":10,"value":4439},
      {"source":6,"target":11,"value":107},
      {"source":7,"target":12,"value":3555}
    ]
  };

  sankey
    .nodes(graph.nodes)
    .links(graph.links);
  sankey();

  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
      .enter().append("path")
      .attr("class", "link")
      .attr("d", d3.sankeyLinkHorizontal())
      .style("stroke-width", function(d) { return Math.max(1, d.width); })
      .style("stroke", function(d) { return d.delay === 1 ? "#FF6347" : "#4682B4"; })  // 红色为延迟>0，蓝色为延迟<=0
      .append("title")
      .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

  var node = svg.append("g").selectAll(".node")
      .data(graph.nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });

  node.append("rect")
      .attr("height", function(d) { return d.y1 - d.y0; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
      .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
      .append("title")
      .text(function(d) { return d.name + "\n" + format(d.value); });

  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return (d.y1 - d.y0) / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
    .filter(function(d) { return d.x0 < width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");
      
      node.on("mouseover", function(d, i) {
        console.log("Mouseover event triggered on: ", d.name);
        if (d) {
          switch (d.name) {
            case "vendor1001":
              document.getElementById('popup-image').style.display = 'block';
              break;
            case "vendor1002":
              document.getElementById('popup-image-vendor1002').style.display = 'block';
              break;
            case "vendor1003":
              document.getElementById('popup-image-vendor1003').style.display = 'block';
              break;
          }
        }
      }).on("mouseout", function(d, i) {
        document.getElementById('popup-image').style.display = 'none';
        document.getElementById('popup-image-vendor1002').style.display = 'none';
        document.getElementById('popup-image-vendor1003').style.display = 'none';
      });
});
