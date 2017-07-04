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

  var toRadian     = Math.PI/180;
  var outerRadius  = (pie && pie.radius && pie.radius < Math.min(_this.canvasHeight, _this.canvasWidth)/2)
                          ? pie.radius
                          : Math.min(_this.canvasHeight, _this.canvasWidth)/2;
  var innerRadius  = (pie && pie.chart && pie.chart.type && pie.chart.type.toUpperCase() === 'DOUGHNUT')
                          ? (pie.chart.width)
                                ? outerRadius - pie.chart.width
                                : outerRadius * 0.75
                          : 0;
  var cornerRadius = (pie && pie.cornerRadius)
                          ? pie.cornerRadius
                          : 0;
  var padAngle     = (pie && pie.padding)
                          ? pie.padding * toRadian
                          : 0;

  var arcElement = d3.arc()
                     .innerRadius(innerRadius)
                     .outerRadius(outerRadius)
                     .cornerRadius(cornerRadius)
                     .padAngle(padAngle);
  return arcElement;

};

PieChart.prototype.createPie = function() {

  var _this      = this,
      pie        = _this.options.pie,
      toRadian   = Math.PI/180,
      endAngle   = (pie && pie.curve)
                        ? pie.curve * toRadian
                        : 2*Math.PI,
      startAngle = (pie && pie.startAngle)
                        ? pie.startAngle * toRadian
                        : 0;

  var pieElement = d3.pie()
                     .value(function(d) { return d[1]; })
                     .startAngle(startAngle)
                     .endAngle(startAngle + endAngle)
                     .sort(null);
  return pieElement;

};

PieChart.prototype.drawPieChart = function() {

  var _this      = this,
      margin     = _this.margin,
      transition = _this.options.transition;

  var arc   = _this.createArc();
  var pie   = _this.createPie();
  var color = _this.setColorPattern();

  var xTranslate = _this.canvasWidth/2 + margin.left,
      yTranslate = _this.canvasHeight/2 + margin.top;

  var outerRadius  = (pie && pie.radius && pie.radius < Math.min(_this.canvasHeight, _this.canvasWidth)/2)
                          ? pie.radius
                          : Math.min(_this.canvasHeight, _this.canvasWidth)/2;
  _this.createCanvas();

  var svg = _this.plot.append('g')
                      .attr('class', 'fc-pie-chart')
                      .attr('transform', 'translate(' + xTranslate + ',' + yTranslate + ')');

  _this.pieChartPlot = svg.selectAll('path')
                          .data(pie(_this.data))
                          .enter()
                          .append('path')
                          .attr('class', 'fc-pie')
                          .attr('d', arc)
                          .attr('fill', function(d) {
                            return color(d.data[0]);
                          });

  _this.checkTooltip();
  if (transition && transition.animate) {
    _this.animateDraw(arc);
  }

};

PieChart.prototype.animateDraw = function(arc) {

  var _this      = this,
      transition = _this.options.transition;

  var duration = (transition && transition.duration)
                              ? transition.duration
                              : 1000;

  var animatePie = function(d) {
    var i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
    return function(t) { return arc(i(t)); };
  };

  _this.pieChartPlot.transition()
                    .ease(d3.easeExp)
                    .duration(duration)
                    .attrTween('d', animatePie);

};

/**
 * To draw the tooltip if the user have opted to.
 * @param {String} type - Type of the chart
 */
PieChart.prototype.checkTooltip = function() {
  var _this = this;

  if (_this.options.tooltip && _this.options.tooltip.show) {
    var event = _this.options.tooltip.listener
                    ? _this.options.tooltip.listener
                    : 'mousemove';
    _this.showTooltip(_this.options.tooltip, event);
  }
};

PieChart.prototype.showTooltip = function(config, event) {
  var _this = this,
      previousValue,
      triggeredEvent,
      tooltipClass =  config.class ? 'fc-tooltip ' + config.class : 'fc-tooltip';

  d3.select(_this.element)
    .selectAll('#fc-tooltip')
    .remove();

  var tooltip = d3.select(_this.element)
                  .append('div')
                  .attr('class', tooltipClass)
                  .attr('id', 'fc-tooltip');

  tooltip.node().style.position = 'absolute';
  tooltip.node().style.display = 'none';

  _this.pieChartPlot.on(event, function(d) {
    triggeredEvent = d3.event.type;
    config.xValue = d.data[0];
    config.yValue = d.data[1];
    if (previousValue !== d) {
      tooltip.node().style.display = 'block';
      tooltip.html(config.formatter ? config.formatter() : _this.tooltipBody(config))
      tooltip.style('top', (d3.event.layerY + 10) + 'px')
             .style('left', (d3.event.layerX + 10) + 'px');
      (d3.event.type != 'mouseover') ? previousValue = d : previousValue = '';
    } else {
      tooltip.node().style.display = 'none';
      previousValue = '';
    }
  })
  .on('mouseout', function() {
    if (triggeredEvent === 'mouseover') {
      tooltip.node().style.display = 'none';
    }
  });

  document.addEventListener('touchstart', function (e) {
      var touch = e.touches[0];
      if (!e.target.classList.contains('fc-pie')) {
        tooltip.node().style.display = 'none';
      }
  }, false);

  document.addEventListener('click', function (e) {
      if (!e.target.classList.contains('fc-pie')) {
        tooltip.node().style.display = 'none';
      }
  }, false);
};

/**
 * Formats the body for tooltip when title, X-Label and Y-Label are given.
 * @param {Object} config   - tooltip configuration options.
 * @return {String} content - Formatted HTML string for tooltip body.
 */
PieChart.prototype.tooltipBody = function(config) {

    var _this   = this;
        title   = config.body && config.body.title ? config.body.title : 'Title',
        xLabel  = config.body && config.body.xLabel ? config.body.xLabel : 'X: ',
        yLabel  = config.body && config.body.yLabel ? config.body.yLabel : 'Y: ',
        xValue  = config.xValue,
        yValue  = config.yValue,
        content = '';

    if (title) {
      content += '<b>' + title + '</b>';
    }
    if (xLabel) {
       content += '<br/>' + xLabel + ': ' + xValue;
    }
    if (yLabel) {
       content += '<br/>' + yLabel + ': ' + yValue;
    }
    return content;

};
