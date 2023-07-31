var Solar = [{ser1: "2012", ser2: 11.705908},
  {
    ser1: "2013",
    ser2: 18.935963
  },
  {
    ser1: "2014",
    ser2: 35.434574
  },
  {
    ser1: "2015",
    ser2: 27.024391
  },
  {
    ser1: "2016",
    ser2: 42.188133
  },
  {
    ser1: "2017",
    ser2: 59.371902
  },
  {
    ser1: "2018",
    ser2: 41.77957
  },
  {
    ser1: "2019",
    ser2: 35.10234
  },
  {
    ser1: "2020",
    ser2: 62.163147
  },
  {
    ser1: "2021",
    ser2: 87.80618
  }
];

var Gas= [
  { ser1: '2012', ser2:299.12012},
  { ser1: '2013', ser2:189},
  { ser1: '2014', ser2:152.37646},
  { ser1: '2015', ser2:213.19043},
  { ser1: '2016', ser2:55.194336},
  { ser1: '2017', ser2:0},
  { ser1: '2018', ser2:819.71045},
  { ser1: '2019', ser2:290.3662},
  { ser1: '2020' ,ser2:0},
  { ser1: '2021' ,ser2:29.166016},
  { ser1: '2022' ,ser2:454.08887},
];


const margin = { top: 30, right: 50, bottom: 80, left: 80 };
const width = 650 - margin.left ;
const height = 400 - margin.top;

var svg = d3
  .select("#myChart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var x = d3.scaleLinear().range([0, width]);
var xAxis = d3.axisBottom().scale(x);

svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("class", "myXaxis");


var y = d3.scaleLinear().range([height, 0]);
var yAxis = d3.axisLeft().scale(y);
svg.append("g").attr("class", "myYaxis");


function update(data) {

  x.domain([
     d3.min(data, function(d) {
      return d.ser1;
    }),
    d3.max(data, function(d) {
      return d.ser1;
    })
  ]);
  svg
    .selectAll(".myXaxis")
    .transition()
    .duration(2500)
    .call(xAxis);

  // create the Y axis
  y.domain([0,d3.max(data, function(d) {
      return d.ser2;
    })
  ]);
  svg
    .selectAll(".myYaxis")
    .transition()
    .duration(2500)
    .call(yAxis);

  // Create a update selection: bind to the new data
  var u = svg.selectAll(".lineTest").data([data], function(d) {
    return d.ser1;
  });
const tooltip = d3.select('body').append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);
  
  // Update the line
  u.enter()
    .append("path")
    .attr("class", "lineTest")
    .merge(u)
    .transition()
    .duration(2500)
    .attr(
      "d",
      d3
      .line()
      .x(function(d) {
        return x(d.ser1);
      })
      .y(function(d) {
        return y(d.ser2);
      })
    )
    .attr("fill", "none")
    .attr("stroke", "#ef504d")
    .attr("stroke-width", 5)
    .on('mouseover', (d) => {
    tooltip.transition().duration(200).style('opacity', 0.9);
    tooltip.html(`CO2 Value: <span>${d.ser1}</span>`)
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${(d3.event.pageY - 28)}px`);
  })
  .on('mouseout', () => tooltip.transition().duration(500).style('opacity', 0));

}
///
var element = document.getElementsByTagName("h3")[1];
if (update(Solar)) {
  element.innerHTML = "Solar Energy Source Growth Rate from 2012 to 2021";
  console.log("solar");
} else if (update(Gas)) {
  element.innerHTML = "Gas Energy Source Growth Rate from 2012 to 2021";
  console.log("users");
}