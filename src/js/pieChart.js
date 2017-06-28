/**
  * Class definition for Pie charts.
  */
var PieChart = function(element, data, options) {

  var _this = this;

  _this.setValues(element, data, options);
  _this.drawPieChart();

  // Redraw the graph when window size is altered so as to make it responsive.
  window.addEventListener('resize', function(event) {
    _this.setValues(element, data, options);
    _this.drawPieChart();
  });
};

PieChart.prototype.setValues = function(element, data, options) {

  var _this  = this;
  _this.options = options || { },
  _this.data    = data;

  var margin = _this.options.margin;

  _this.getElement(element);

  _this.margin  =  {
    left   : (margin && margin.left) ? margin.left : 0,
    right  : (margin && margin.right) ? margin.right : 0,
    top    : (margin && margin.top) ? margin.top : 0,
    bottom : (margin && margin.bottom) ? margin.bottom : 0
  };

  _this.setCanvasBoundary();

};

PieChart.prototype.getElement = function(element) {

  var _this = this;

  // To check whether it is the DOM element or classname or id of the DOM element
  if (typeof element === 'object') {
    _this.element = element;
  } else {
    if (element[0] === '#' || element[0] === '.') {
      _this.element = document.querySelector(element);
    }
    else {
      console.error('Error: Wrong Element format.');
    }
  }
  _this.elementClass = _this.element.className;

};

PieChart.prototype.setCanvasBoundary = function() {

  var _this   = this,
      margin = _this.margin;

  // The height and width of the window if the user haven't specified the dimension
  // for the graphs.
  var width = window.innerWidth
              || document.documentElement.clientWidth
              || document.body.clientWidth;

  var height = window.innerHeight
               || document.documentElement.clientHeight
               || document.body.clientHeight;


  _this.width  = (_this.element.offsetWidth === 0)
                              ? width
                              : _this.element.offsetWidth;
  _this.height = (_this.element.offsetHeight === 0)
                              ? height
                              : _this.element.offsetHeight;

  _this.canvasHeight = _this.height - (margin.top + margin.bottom),
  _this.canvasWidth  = _this.width - (margin.left + margin.right);

};

PieChart.prototype.setColorPattern = function() {

  var _this = this,
      pie   = _this.options.pie;

  if (pie && pie.color && Array.isArray(pie.color)) {
    return d3.scaleOrdinal().range(pie.color);
  } else {
    return d3.scaleOrdinal(d3.schemeCategory20c);
  }

};

/**
  * Creates the canvas under the element user mentions.
  */
PieChart.prototype.createCanvas = function() {

  var _this  = this;

  // Removes if any svg exists before drawing
  d3.select(_this.element)
    .selectAll('svg')
    .remove();

  // All elements like axis, lines, bars are to be attached to this object.
  _this.plot = d3.select(_this.element)
                 .append('svg')
                 .attr('width', _this.width)
                 .attr('height', _this.height)
                 .attr('class', 'fc-graph-area');

};

PieChart.prototype.createArc = function() {

  var _this = this,
      pie   = _this.options.pie;
  var outerRadius = (pie && pie.radius && pie.radius < Math.min(_this.canvasHeight, _this.canvasWidth)/2)
                          ? pie.radius
                          : Math.min(_this.canvasHeight, _this.canvasWidth)/2;
  var innerRadius = 0;


  var arcElement = d3.arc()
                     .innerRadius(0)
                     .outerRadius(outerRadius)
                     .cornerRadius(0);
  return arcElement;

};

PieChart.prototype.createPie = function() {
  var _this    = this,
      pie      = _this.options.pie,
      toRadian = Math.PI/180,
      padAngle = (pie && pie.padding)
                      ? pie.padding * toRadian
                      : 0;

  var pieElement = d3.pie()
                     .value(function(d) { return d[1]; })
                     .padAngle(padAngle)
                     .startAngle(0)
                     .endAngle(2*Math.PI)
                     .sort(null);
  return pieElement;

};



PieChart.prototype.drawPieChart = function() {

  var _this = this;

  var arc   = _this.createArc();
  var pie   = _this.createPie();
  var color = _this.setColorPattern();

  var xTranslate = _this.canvasWidth/2,
      yTranslate = _this.canvasHeight/2;

  _this.createCanvas();

  var svg = _this.plot.append('g')
                      .attr('class', 'fc-pie-chart')
                      .attr('transform', 'translate(' + xTranslate + ',' + yTranslate + ')');

  var path = svg.selectAll('path')
                .data(pie(_this.data))
                .enter()
                .append('path')
                .attr('class', 'fc-pie')
                .attr('d', arc)
                .attr('fill', function(d) {
                  return color(d.data[0]);
                });
};
