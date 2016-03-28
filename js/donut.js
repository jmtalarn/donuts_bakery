define(['./lib/utils', './lib/format'], function(utils, format) {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";

    function Donut(data) {
        if (!(this instanceof Donut)) {
            throw new TypeError("Ouch! Not a doughnut!");
        }

        this.data = data;
    }
    Donut.prototype = {
        constructor: Donut,
        bake: function(where) {
            var width = 460, // 460 + 100
                height = 300,
                //radius = Math.min(width, height) / 2;
                radius = Math.max((width), height) / 2;
            var data = this.data;
            var pie = d3.layout.pie()
                .value(function(d) {
                    return d.value.sum();
                })
                .sort(null);

            var arc = d3.svg.arc()
                .innerRadius(radius - 100)
                .outerRadius(radius - 80);

            var svg = d3.select(where).append("svg")
                .data([data.source])
                .attr("width", width)
                .attr("height", height + 100)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            var tweenPie = function(finish) {
                var start = {
                    startAngle: 0,
                    endAngle: 0
                };
                var i = d3.interpolate(start, finish);
                return function(d) {
                    return arc(i(d));
                };
            }
            var path = svg.selectAll("path")
                .data(pie)
                .enter().append("path")
                .attr("id", function(d, i) {
                    return d.data.target;
                })
                .attr("fill", function(d, i) {
                    return d.data.color;
                })
                .attr("d", arc)
                .transition()
                .duration(2000)
                .attrTween('d', tweenPie);;

            var dots = svg.append("g");
            for (var i = 0; i < 4; i++) {
                dots.append('circle')
                    .attr("cx", (radius - 110) * Math.cos(2 * Math.PI * i / 4))
                    .attr("cy", (radius - 110) * Math.sin(2 * Math.PI * i / 4))
                    .attr("r", 3)
                    .style("fill", function(d, i) {
                        return middleColor(data.source[0].color, data.source[1].color);
                    })
                    .style("stroke", function(d, i) {
                        return middleColor(data.source[0].color, data.source[1].color);
                    });
            }
            var title = svg.append("text")
                .text(data.title)
                .attr("y", "-40px")
                .attr("font-family", "sans-serif")
                .attr("font-size", "20px")
                .attr("text-anchor", "middle")
                .style("fill", "darkgrey");
            var sumTotal = data.source[0].value.sum() + data.source[1].value.sum();
            var sumTotalText = sumTotal.format(null, null, data.units);
            var total = svg.append("text")
                .text(sumTotalText)
                .attr("y", "-10px")
                .attr("font-family", "sans-serif")
                .attr("font-size", "30px")
                .attr("font-weight", "bold")
                .attr("text-anchor", "middle")
                .style("fill", "grey");

            var text = svg.append("g").selectAll("text")
                .data(pie)
                .enter();

            var textLabels = text.append("text")
                .attr("x", function(d, i) {
                    if (i == 0) return (width / 2) * -1;
                    if (i == 1) return (width / 2);
                })
                .attr("y", function(d, i) {
                    return (height / 2) + 10;
                })
                .text(function(d) {
                    return d.data.target;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "20px")
                .attr("font-weight", "bold")
                .style("fill", function(d, i) {
                    return d.data.color;
                })
                .attr("text-anchor",
                    function(d, i) {
                        if (i == 0) return "start";
                        if (i == 1) return "end"
                    });
            var percentLabels = text.append("text")
                .attr("x", function(d, i) {
                    if (i == 0) return (width / 2) * -1;
                    if (i == 1) return (width / 2);
                })
                .attr("y", function(d, i) {
                    return (height / 2) + 10 + 30;
                })
                .text(function(d) {
                    return Math.floor(d.data.value.sum() / sumTotal * 100) + "%";
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "20px")
                .attr("font-weight", "bold")
                .attr("id", function(d, i) {
                    return "percent_" + i;
                })
                .style("fill", "grey")
                .attr("text-anchor",
                    function(d, i) {
                        if (i == 0) return "start";
                        if (i == 1) return "end"
                    });

            var sumLabels = text
                .append("text")
                .attr("x", function(d, i) {
                    if (i == 0) return ((width / 2) * -1) + 60;
                    if (i == 1) return (width / 2);
                })
                .attr("y", function(d, i) {
                    return (height / 2) + 10 + 30;
                })
                .text(function(d) {
                    return d.data.value.sum().format(null, null, data.units);
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "20px")
                .attr("font-weight", "bold")
                .style("fill", "darkgrey")
                .attr("text-anchor",
                    function(d, i) {

                        if (i == 0) return "start";
                        if (i == 1) {
                            //Move right percentage
                            //UGLY HACKING
                            var rp = d3.select(this.parentElement.querySelector("#percent_1"));
                            rp.attr("x", parseInt(rp.attr("x")) - 10 - this.getBoundingClientRect().width);

                            return "end";
                        }
                    });

            /*AREA CHART*/
            var areaData = [];
            for (var i = 0; i < Math.max(this.data.source[0].value.length, this.data.source[1].value.length); i++) {
                areaData.push({
                    x: i,
                    y: this.data.source[0].value[i] + this.data.source[1].value[i]
                });
            };
            var areasize = {
                width: width / 2.5,
                height: height / 3.5
            };

            var svgarea = svg.append("g").attr("transform", "translate(-" + areasize.width / 2 + ", -3 )");

            var x = d3.scale.linear()
                .domain(d3.extent(areaData, function(d) { return d.x; }))
                .range([ 0, areasize.width]);


            var y = d3.scale.linear()
                .domain([0, d3.max(areaData, function(d) {
                    return d.y;
                })])
                .range([areasize.height, 0]);
            var area = d3.svg.area()
                .x(function(d) {
                    return x(d.x);
                })
                .y0(areasize.height)
                .y1(function(d) {
                    return y(d.y);
                });
            var strokeColor = middleColor(data.source[0].color, data.source[1].color);
            var fillColor = middleColor("white", strokeColor);
            svgarea.append("path")
                .datum(areaData)
                .style("fill","white").style("stroke","white")
                .transition().duration(1500).delay(500)
                .attr("class", "area")
                .attr("d", area)
                .style("fill", fillColor)
                .style("stroke", strokeColor);








            /***********************/

        }
    };
    return Donut;
});
