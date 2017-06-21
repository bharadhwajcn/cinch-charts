var CONSTANTS = {
  DEFAULT_MARGIN: {
    LEFT: 15,
    BOTTOM: 30,
    RIGHT: 15,
    TOP: 15
  },
  ORIENTATION_MARGIN: {
    LEFT: 35,
    BOTTOM: 30,
    RIGHT: 35,
    TOP: 22
  },
  BAR: {
    color: '#4682B4',
    curve: false,
    opacity : 1,
    padding : .05
  },
  STACKED_BAR: {
    color: ['#CDDC39', '#4CAF50', '#009688', '#00BCD4', '#2196F3', '#3F51B5', '#673AB7'],
    curve: false,
    opacity : 1,
    padding : .05
  },
  LINE: {
    color: '#4682B4',
    width: 4,
    opacity : 1,
    icon : {
      show : true,
      width : 10
    }
  },
  MULTI_LINE: {
    color: ['#CDDC39', '#4CAF50', '#009688', '#00BCD4', '#2196F3', '#3F51B5', '#673AB7'],
    width: 4,
    opacity : 1,
    icon : {
      width : 10
    }
  },
  LABEL_WIDTH: 35,
  LABEL_LINE_HEIGHT: .3,
  ICON: {
    DEFAULT_WIDTH : 10,
    DEFAULT_HEIGHT: 10
  },

  DEFAULT_BAR_RADIUS: 0,
  BAR_CHART : {
    type : 'bar',
    element : '.fc-bar',
    class: 'fc-bar'
  },
  STACK_CHART : {
    type : 'stackedBar',
    element : '.fc-stacked-bar',
    class: 'fc-stacked-bar'
  },
  LINE_CHART : {
    type : 'line',
    element : '.fc-line-point',
    class: 'fc-line-point'
  },
  AREA_CHART : {
    type : 'line',
    element : '.points',
    class: 'points'
  },
  FIRST_CHILD: 1,
  AXIS_CONFIG: {
    X_AXIS: {
      orientation: 'bottom',
      firstLabel: true,
      ticks: {
        fontSize: '13px',
        alignment: 'middle',
        padding: 5
      },
      showAxisLine: true
    },
    Y_AXIS: {
      orientation: 'left',
      ticks: {
        fontSize: '13px',
        padding: 5,
        alignment: 'end'
      },
      firstLabel: true,
      showAxisLine: true
    }
  },
  TOOLTIP: {
    LISTENERS: 'mouseover click touchstart',
    BODY: {
      title : 'Title',
      xLabel : 'X value',
      yLabel : 'Y value'
    }
  }
};

/**
  * Base class prototype for all Charts.
  */
var Chart = function() { };

/**
  * For making all user inputs to global scope.
  * @param {String} element - Name of the element to which graph is to be drawn
  * @param {Object} data    - Data for which graph is to be drawn
  * @param {Object} options - Config options that can be added to the graph.
  * @param {Array} metaData - Meta data about the other graphs.
  */
Chart.prototype.setValues = function(element, data, options, metaData) {

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
  _this.data         = data;
  _this.options      = options || { };

  if (metaData) {
    switch (metaData.type) {
      case 'bar':
        var bar = _this.options.bar;
        _this.color = (bar && bar.color)
                            ? bar.color
                            : CONSTANTS.BAR.color;
        break;
      case 'stackedBar':
        var bar = _this.options.bar;
        _this.stackList = metaData.stack || [ ];
        _this.color = (bar && bar.color)
                            ? bar.color
                            : CONSTANTS.STACKED_BAR.color;
        break;
      case 'line':
        var line = _this.options.line;
        _this.color = (line && line.color)
                             ? line.color
                             : CONSTANTS.LINE.color;
        break;
      case 'multiLine':
        var line = _this.options.line;
        _this.color = (line && line.color)
                             ? line.color
                             : CONSTANTS.MULTI_LINE.color;
        break;

    }
  }

  var margin = _this.options.margin;

  _this.margin =  {
    left   : (margin && margin.left) ? margin.left : 0,
    right  : (margin && margin.right) ? margin.right : 0,
    top    : (margin && margin.top) ? margin.top : 0,
    bottom : (margin && margin.bottom) ? margin.bottom : 0
  };

  var axis   = _this.options.axis;
  var legend = _this.options.legend;
  if (axis && axis.xAxis && axis.xAxis.orientation) {
    var excessHeight = CONSTANTS.DEFAULT_MARGIN.BOTTOM;
  } else {
    var excessHeight = CONSTANTS.DEFAULT_MARGIN.TOP;
  }

  // The height and width of the window if the user haven't specified the dimension
  // for the graphs.
  var width = window.innerWidth
              || document.documentElement.clientWidth
              || document.body.clientWidth;

  var height = window.innerHeight
               || document.documentElement.clientHeight
               || document.body.clientHeight;


  _this.width         = (_this.element.offsetWidth === 0)
                              ? width
                              : _this.element.offsetWidth;
  _this.height        = (_this.element.offsetHeight === 0)
                              ? height
                              : _this.element.offsetHeight;
  _this.elementHeight = (_this.element.offsetHeight === 0)
                              ? height
                              : _this.element.offsetHeight;

  _this.element.addEventListener('touchstart', handleTouch, false);

  function handleTouch(e) {
    e.defaultPrevented();
  };

};

/**
  * Creates the canvas, calculate and draw X and Y axis of the graph & add grid lines.
  */
Chart.prototype.drawChart = function() {
  var _this  = this,
      legend = _this.options.legend,
      axis   = _this.options.axis;

  if (legend && legend.show) {
    if (legend.height) {
      _this.legendHeight = legend.height;
      _this.height -= _this.legendHeight;
      _this.elementHeight -= _this.legendHeight;
    } else {
      _this.legendHeight = 45;
      _this.height -= _this.legendHeight;
      _this.elementHeight -= _this.legendHeight;
    }
  }

  _this.createCanvas();
  _this.xScales();
  _this.yScales();
  _this.addAxes();

  if (_this.options.grids) {
    _this.addGridLines(_this.options.grids);
  }

};

/**
  * Creates the canvas under the element user mentions.
  * @return {Object} plot - Object where all elements of graph need to be attached
  */
Chart.prototype.createCanvas = function() {

  var _this  = this;

  // Removes if any svg exists before drawing
  d3.select(_this.element)
    .selectAll('svg')
    .remove();

  // All elements like axis, lines, bars are to be attached to this object.
  _this.plot = d3.select(_this.element)
                 .append('svg')
                 .attr('width', '100%')
                 .attr('height', _this.elementHeight)
                 .attr('class', 'fc-graph-area');

};

/**
  * Calculate the max and min values of X axis from the user data.
  */
Chart.prototype.xScales = function() {

  var _this   = this,
      axis    = _this.options.axis,
      bar     = _this.options.bar,
      margin  = _this.margin,
      width   = _this.width,
      xExtent = _this.xExtent,
      padding = (bar && bar.padding)
                     ? parseFloat(bar.padding)
                     : CONSTANTS.BAR.padding;

  // To set the extend at every possible orientation
  if (axis && axis.yAxis && axis.yAxis.orientation) {
    if (axis.yAxis.orientation === 'left') {
      _this.xMin = margin.left + CONSTANTS.DEFAULT_MARGIN.LEFT + CONSTANTS.ORIENTATION_MARGIN.LEFT;
      _this.xMax = width - (margin.right + CONSTANTS.DEFAULT_MARGIN.LEFT);
    } else {
      _this.xMin = margin.left + CONSTANTS.DEFAULT_MARGIN.LEFT;
      _this.xMax = width - (margin.right + CONSTANTS.DEFAULT_MARGIN.RIGHT + CONSTANTS.ORIENTATION_MARGIN.RIGHT);
    }
  } else {
    _this.xMin = margin.left + CONSTANTS.DEFAULT_MARGIN.LEFT + CONSTANTS.ORIENTATION_MARGIN.LEFT;
    _this.xMax = width - (margin.right + CONSTANTS.DEFAULT_MARGIN.RIGHT);
  }

  _this.xScale = d3.scaleBand()
                   .padding(padding)
                   .range([_this.xMin, _this.xMax])
                   .domain(xExtent);
};

/**
  * Calculate the max and min values of Y axis from the user data.
  */
Chart.prototype.yScales = function() {

  var _this    = this,
      margin   = _this.margin,
      axis     = _this.options.axis,
      goalLine = _this.options.goalLine,
      height   = _this.height,
      yExtent  = _this.yExtent;

  // To set the extend at every possible orientation
  if (axis && axis.xAxis && axis.xAxis.orientation) {
    if (axis.xAxis.orientation === 'bottom') {
      _this.yMin = height - (margin.bottom + CONSTANTS.DEFAULT_MARGIN.BOTTOM);
      _this.yMax = CONSTANTS.DEFAULT_MARGIN.TOP + margin.top;
    } else {
      _this.yMin = height - (margin.bottom + CONSTANTS.DEFAULT_MARGIN.BOTTOM);
      _this.yMax = margin.top + CONSTANTS.DEFAULT_MARGIN.TOP + CONSTANTS.ORIENTATION_MARGIN.TOP;
    }
  } else {
    _this.yMin = height - (margin.bottom + CONSTANTS.DEFAULT_MARGIN.BOTTOM);
    _this.yMax = CONSTANTS.DEFAULT_MARGIN.TOP + margin.top;
  }

  var yAxisTicks    = (axis && axis.yAxis && axis.yAxis.ticks)
                                ? axis.yAxis.ticks
                                : CONSTANTS.AXIS_CONFIG.Y_AXIS.ticks,
      goalLineValue = (goalLine && goalLine.value)
                                ? goalLine.value
                                : 0,
      tickValues    = (yAxisTicks.values)
                                ? yAxisTicks.values
                                : [ ];
  // To capture the tickValues if alias name is to be provided to ticks
  var ticks = [ ];
  if (typeof tickValues[0] === 'object') {
    tickValues.forEach(function(d) {
      ticks.push(d.value);
    });
  } else {
    ticks = tickValues;
  }

  yExtent[1] = d3.max([goalLineValue, yExtent[1], d3.max(ticks)]);

  // If goal value is greater than maximum yvalue, add a 10% buffer space
  if (goalLineValue === yExtent[1]) {
    yExtent[1] *= 1.1;
    tickValues.push(Math.round(yExtent[1]));
  }
  _this.yScale = d3.scaleLinear()
                   .rangeRound([_this.yMin, _this.yMax])
                   .domain(yExtent);

  //If there are no tick values, round off to a whole number
  if (tickValues.length === 0) {
    _this.yScale.nice();
  }

};

/**
  * Draws X and Y axis to the graph with the help of xScale and yScales.
  */
Chart.prototype.addAxes = function() {

  var _this   = this,
      axis    = _this.options.axis,
      xConfig = (axis && axis.xAxis)
                      ? _this.options.axis.xAxis
                      : { },
      yConfig = (axis && axis.yAxis)
                      ? _this.options.axis.yAxis
                      : { };

  _this.addXAxis(xConfig);
  _this.addYAxis(yConfig);

};

/**
 * To add X axis
 * @param {object} config - X axis configuration options
 */
Chart.prototype.addXAxis = function(config) {

  var _this        = this,
      margin       = _this.margin,
      scale        = _this.xScale,
      padding      = (config && config.ticks && config.ticks.padding)
                            ? config.ticks.padding
                            : CONSTANTS.AXIS_CONFIG.X_AXIS.ticks.padding,
      firstLabel   = (config && config.firstLabel !== undefined)
                            ? config.firstLabel
                            : CONSTANTS.AXIS_CONFIG.X_AXIS.firstLabel,
      orientation  = (config && config.orientation)
                          ? config.orientation
                          : CONSTANTS.AXIS_CONFIG.X_AXIS.orientation,
      showAxisLine = (config && config.showAxisLine !== undefined)
                            ? config.showAxisLine
                            : CONSTANTS.AXIS_CONFIG.X_AXIS.showAxisLine;

  switch (orientation) {
    case 'top':
        var xAxis = d3.axisTop(scale)
                      .tickPadding(padding);
        xAxis = _this.checkXAxisLabels(xAxis, config);
        _this.drawXAxis(config, xAxis, _this.yMax);
        break;
    default:
        var xAxis = d3.axisBottom(scale)
                      .tickPadding(padding);
        xAxis = _this.checkXAxisLabels(xAxis, config);
        _this.drawXAxis(config, xAxis, _this.yMin);
        break;
  }

  if (!firstLabel) {
    if (_this.element.querySelector('#x-axis').children === undefined && _this.element.querySelector('#x-axis').childNodes[CONSTANTS.FIRST_CHILD] !== undefined){
      _this.element.querySelector('#x-axis')
                   .childNodes[CONSTANTS.FIRST_CHILD]
                   .remove();
    } else if (_this.element.querySelector('#x-axis').children[CONSTANTS.FIRST_CHILD] !== undefined){
      _this.element.querySelector('#x-axis')
                   .children[CONSTANTS.FIRST_CHILD]
                   .remove();
    }
  }

  if(!showAxisLine) {
    _this.element.querySelector('#x-axis path')
                 .remove();
  }

};

/**
 * To add check whether X axis has alias labels
 * @param {object} axis   - X Axis variable
 * @param {object} config - X Axis configuration options
 */
Chart.prototype.checkXAxisLabels = function(axis, config) {

  var _this = this;

  if (config.ticks && config.ticks.values) {
    var tick = config.ticks.values;
    if (typeof tick[0] === 'object') {
      var values = [ ],
          labels = [ ];
      tick.forEach(function(d) {
        values.push(d.value);
        labels.push(d.label)
      });
    } else {
      var values = tick,
          labels = tick;
    }
  } else {
    var values = _this.xExtent,
        labels = _this.xExtent;
  }

  axis.tickValues(values)
      .tickFormat(function(d, i) {
        if (config && config.ticks && config.ticks.formatter)
          return config.ticks.formatter(d);
        else
          return labels[i];
      });

  return axis;
};

/**
 * To add Y axis
 * @param {object} config - Y Axis configuration options
 */

Chart.prototype.addYAxis = function(config) {
  var _this          = this,
      scale          = _this.yScale,
      ticksConfig    = config.ticks ? config.ticks : CONSTANTS.AXIS_CONFIG.Y_AXIS.ticks,
      firstLabel     = (config && config.firstLabel !== undefined)
                          ? config.firstLabel
                          : CONSTANTS.AXIS_CONFIG.Y_AXIS.firstLabel,
      orientation    = (config && config.orientation)
                          ? config.orientation
                          : CONSTANTS.AXIS_CONFIG.Y_AXIS.orientation,
      padding        = ticksConfig.padding
                          ? ticksConfig.padding
                          : (orientation === 'left')
                                ? 5
                                : 30,
      showAxisLine   = (config && config.showAxisLine !== undefined)
                          ? config.showAxisLine
                          : CONSTANTS.AXIS_CONFIG.Y_AXIS.showAxisLine;

  switch (orientation) {
    case 'right':
        var yAxis = d3.axisRight(scale)
                      .tickPadding(padding);
        yAxis = _this.checkYAxisLabels(yAxis, config);
        _this.drawYAxis(config, yAxis, _this.xMax);
        break;

    default:
        var yAxis = d3.axisLeft(scale)
                      .tickPadding(padding);
        yAxis = _this.checkYAxisLabels(yAxis, config);
        _this.drawYAxis(config, yAxis, _this.xMin);
        break;
  }

  if (!firstLabel) {
    if (_this.element.querySelector('#y-axis').children === undefined  &&
        _this.element.querySelector('#y-axis').childNodes[CONSTANTS.FIRST_CHILD] !== undefined) {
      _this.element.querySelector('#y-axis')
                   .childNodes[CONSTANTS.FIRST_CHILD]
                   .remove();
    } else if (_this.element.querySelector('#y-axis').children[CONSTANTS.FIRST_CHILD] !== undefined) {
      _this.element.querySelector('#y-axis')
                   .children[CONSTANTS.FIRST_CHILD]
                   .remove();
    }
  }

  if(!showAxisLine) {
    _this.element.querySelector('#y-axis path')
                 .remove();

   d3.select('#y-axis')
     .selectAll('line')
     .remove();
  }
};

/**
 * To add check whether Y axis has alias labels
 * @param {object} axis   - Y Axis variable
 * @param {object} config - Axis configuration options
 */
Chart.prototype.checkYAxisLabels = function(axis, config) {

  var _this      = this;

  var firstLabel = (config && config.firstLabel !== undefined)
                            ? config.firstLabel
                            : CONSTANTS.AXIS_CONFIG.Y_AXIS.firstLabel;

  if (config.ticks && config.ticks.values) {
    var tick = config.ticks.values;
    if (typeof tick[0] === 'object') {
      var values = [ ],
          labels = [ ];
      if (tick.indexOf(_this.yExtent[0]) < 0)
        tick.unshift({ value : _this.yExtent[0], label : _this.yExtent[0] });
      tick.forEach(function(d) {
        values.push(d.value);
        labels.push(d.label)
      });

    } else {
      if (tick.indexOf(_this.yExtent[0]) < 0)
        tick.unshift(_this.yExtent[0]);
      var values = tick,
          labels = tick;
    }

    axis.tickValues(values)
        .tickFormat(function(d, i) {
          if (config && config.ticks && config.ticks.formatter)
            return config.ticks.formatter(d);
          else
            return labels[i];
        });
  } else {
    axis.tickFormat(function(d) {
          if (config && config.ticks && config.ticks.formatter)
            return config.ticks.formatter(d);
          else
            return d;
        });
  }
  return axis;
};

/**
 * To draw X axis based on user input
 * @param {object} config     - X Axis configuration options
 * @param {Object} xAxis      - X axis object to draw the axis
 * @param {Integer} topMargin - Amount the top margin needs to be shifted
 * @param {String} className  - CSS classname for X Axis
 */
  Chart.prototype.drawXAxis = function(config, xAxis, topMargin) {

  var _this          = this,
      translateLeft  = _this.defaultMargin(),
      fontSize       = (config.ticks && config.ticks.fontSize)
                            ? config.ticks.fontSize
                            : CONSTANTS.AXIS_CONFIG.X_AXIS.ticks.fontSize;



  _this.xAxisLabels = _this.plot.append('g')
                                .attr('class', 'fc-axis fc-x-axis')
                                .attr('id', 'x-axis')
                                .attr('transform', 'translate(0,' + topMargin + ')')
                                .call(xAxis)
                                .selectAll('.tick text')
                                .attr('font-size', fontSize);

  _this.checkAxisLabelAlteration(config, 'x');

};

/**
 * To check whether X axis label is to be rotated or not.
 * @param {object} config - X Axis configuration options
 * @param {String} axis   - axis code
 */
Chart.prototype.checkAxisLabelAlteration = function(config, axis) {

  var _this = this,
      ticks = config.ticks;
  if (ticks && ticks.position) {
    var angle  = ticks.position.angle || 0,
        xShift = ticks.position.x || '0',
        yShift = ticks.position.y || '0';
    _this.alterAxisLabel(axis, xShift, yShift, angle);
  }

};

/**
 * To draw y axis based on user input
 * @param {object} config      - configuration options
 * @param {Object} yAxis       - y-axis object to draw the axis
 * @param {Integer} leftMargin - Amount the left margin needs to be shifted
 */
Chart.prototype.drawYAxis = function(config, yAxis, leftMargin) {
  var _this     = this,
      margin    = _this.margin,
      alignment = (config.ticks && config.ticks.alignment)
                                ? config.ticks.alignment
                                : CONSTANTS.AXIS_CONFIG.Y_AXIS.ticks.alignment,
      fontSize = (config.ticks && config.ticks.fontSize)
                                ? config.ticks.fontSize
                                : CONSTANTS.AXIS_CONFIG.Y_AXIS.ticks.fontSize;

  _this.yAxisLabels =  _this.plot.append('g')
                                 .attr('class', 'fc-axis fc-y-axis')
                                 .attr('id', 'y-axis')
                                 .attr('transform', 'translate(' + leftMargin + ', 0)')
                                 .call(yAxis)
                                 .selectAll('.tick text')
                                 .attr('font-size', fontSize)
                                 .call(_this.wrap, CONSTANTS.LABEL_WIDTH, alignment);

  _this.checkAxisLabelAlteration(config, 'y');

};

/**
  * For adding horizontal and vertical grid lines
  * @param {object} config - Grid configuration options
  */
Chart.prototype.addGridLines = function(config) {

  var _this = this,
      axis  = _this.options.axis;

  if (config.vertical && config.vertical.show) {
    _this.addVerticalGridLines(config.vertical);
  }

  if (config.horizontal && config.horizontal.show) {
    _this.addHorizontalGridLines(config.horizontal);
  }

};

/**
  * For rotating the text on x-axis
  * @param{String} axis   - Axis string
  * @param{String} xShift - The amount by which the text is to be shifted in X Axis
  * @param{String} yShift - The amount by which the text is to be shifted in Y Axis
  * @param{Integer} angle - Angle of rotation
  */
Chart.prototype.alterAxisLabel = function(axis, xShift, yShift, angle) {

  var _this = this;
      axis  = (axis === 'x' || axis === 'X')
                    ? _this.xAxisLabels
                    : _this.yAxisLabels;

  if (angle === 0 ) {
    axis.attr('transform','translate(' + xShift + ',' + yShift + ')');
  } else if (xShift === 0 && yShift === 0) {
    axis.attr('transform', 'rotate(-' + angle + ')');
  } else {
    axis.attr('transform', 'rotate(-' + angle + '), translate(' + xShift + ',' + yShift + ')');
  }

};


/**
 * To wrap labels into lines
 * @param  {String} text      - Text to wrap
 * @param  {Integer} width    - width of each line
 * @param  {text} textAlign   - Alignment
 * @return {String}           - Svg elements
 */
Chart.prototype.wrap = function (text, width, textAlign) {
  text.each(function() {
    var word,
        text        = d3.select(this),
        words       = text.text().split(/\s+/).reverse(),
        line        = [],
        lineNumber  = 0,
        lineHeight  = CONSTANTS.LABEL_LINE_HEIGHT,
        x           = text.attr('x'),
        y           = text.attr('y'),
        dy          = parseFloat(text.attr('dy'))+ lineHeight,
        tspan       = text.text(null)
                          .append('tspan')
                          .attr('x', x)
                          .attr('y', y)
                          .attr('dy', dy + 'em')
                          .attr('text-anchor', textAlign);

    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(' '));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(' '));
        line = [word];
        tspan = text.append('tspan')
                    .attr('x', x)
                    .attr('y', y)
                    .attr('dy', (++lineNumber) * lineHeight + dy + 'em')
                    .attr('text-anchor', textAlign)
                    .text(word);
      }
    }
  });
};

/**
* Method to add the vertical grid lines to the chart.
* @param  {Object} config  - Vertical grid line config
**/
Chart.prototype.addVerticalGridLines = function(config) {

  var _this  = this,
      legend = _this.options.legend,
      axis   = _this.options.axis,
      margin = _this.margin;

  var orientation = (axis && axis.xAxis && axis.xAxis.orientation)
                          ? axis.xAxis.orientation
                          : 'bottom';

  var yTranslate = _this.yMin;

  _this.plot.append('g')
            .attr('id', 'vertical-grid')
            .attr('class', 'fc-grid vertical-grid')
            .attr('transform', 'translate(0 ,' + yTranslate + ')')
            .call(_this.verticalGridLines());


  [].forEach.call(_this.element.querySelectorAll('#vertical-grid line'),
    function (elt) {
        var style = '';
        if (config.color) style += 'stroke : ' + config.color + ';';
        if (config.opacity) style += 'stroke-opacity : ' + config.opacity + ';';
        elt.setAttribute('style', style);
    });

};

/**
 * Method to add the horizontal grid lines to the chart.
 * @param  {Object} config  - Horizontal grid line config
 **/
Chart.prototype.addHorizontalGridLines = function(config) {

  var _this         = this,
      margin        = _this.margin,
      axis          = _this.options.axis,
      showAxisLine  = (axis && axis.yAxis && axis.yAxis.showAxisLine !== undefined)
                            ? axis.yAxis.showAxisLine
                            : CONSTANTS.AXIS_CONFIG.Y_AXIS.showAxisLine,
      orientation   = (axis && axis.yAxis && axis.yAxis.orientation)
                            ? axis.yAxis.orientation
                            : CONSTANTS.AXIS_CONFIG.Y_AXIS.orientation,
      xShift        =  (showAxisLine)
                            ? (orientation === 'left')
                                    ? CONSTANTS.ORIENTATION_MARGIN.LEFT + CONSTANTS.DEFAULT_MARGIN.LEFT + margin.left
                                    : CONSTANTS.DEFAULT_MARGIN.LEFT + margin.left
                            : 0;

  _this.plot.append('g')
            .attr('id', 'horizontal-grid')
            .attr('class', 'fc-grid horizontal-grid')
            .attr('transform', 'translate(' + xShift + ',0)')
            .call( _this.horizontalGridLines());

  var lineNodes       = _this.element.querySelectorAll('#horizontal-grid g'),
      lineNodesLength = lineNodes.length;

  [].forEach.call(lineNodes, function (elt, i) {
    var style = '';
    if (config.color)   style += 'stroke : ' + config.color + ';';
    if (config.opacity) style += 'stroke-opacity : ' + config.opacity + ';';
    elt.querySelector('line').setAttribute('style', style);
  });

  if (config.skipFirst) {
    lineNodes[0].remove()
  }
  if (config.skipLast) {
    lineNodes[lineNodesLength-1].remove()
  }

};

/**
 * Method to add the horizontal goal lines at user specified height on the
 * chart.
 **/
Chart.prototype.addGoalLines = function() {

  var _this        = this,
      goalLine     = _this.options.goalLine,
      margin       = _this.margin,
      axis         = _this.options.axis,
      showAxisLine = (axis && axis.yAxis && axis.yAxis.showAxisLine !== undefined)
                            ? axis.yAxis.showAxisLine
                            : CONSTANTS.AXIS_CONFIG.Y_AXIS.showAxisLine,
      orientation  = (axis && axis.yAxis && axis.yAxis.orientation)
                            ? axis.yAxis.orientation
                            : CONSTANTS.AXIS_CONFIG.Y_AXIS.orientation,
      value        = goalLine.value,
      className    = goalLine.class
                        ? 'fc-goalLine-line ' + goalLine.class
                        : 'fc-goalLine-line',

      xShift       =  (showAxisLine)
                            ? (orientation === 'left')
                                    ? CONSTANTS.ORIENTATION_MARGIN.LEFT + CONSTANTS.DEFAULT_MARGIN.LEFT + margin.left
                                    : CONSTANTS.DEFAULT_MARGIN.LEFT + margin.left
                            : 0,
      yShift       = _this.yScale(value) - _this.yMin;

  var goalElement = _this.plot.append('g')
                              .attr('class', 'fc-goalLine');

  goalElement.append('g')
             .attr('class', className)
             .attr('transform', 'translate(' + xShift + ', ' + yShift + ')')
             .call( _this.goalLine());

  if (goalLine.icon) {
    var  height    = goalLine.icon.height,
         width     = goalLine.icon.width,
         url       = goalLine.icon.url,
         iconClass = goalLine.icon.class
                            ? 'qd-goalLine-image ' + iconClass
                            : 'qd-goalLine-image',
         left      = (goalLine.icon.left)
                            ? goalLine.icon.left + margin.left - 2.5
                            : margin.left - 2.5;

    if (showAxisLine) {
      if (orientation === 'left')
        left += CONSTANTS.ORIENTATION_MARGIN.LEFT + CONSTANTS.DEFAULT_MARGIN.LEFT;
    }

    if (goalLine.icon.toBase64) {
      _this.getBase64Image(url, function(base64url) {
        goalElement.append('svg:image')
                   .attr('x', left)
                   .attr('y', _this.yScale(value) - height/2 + 1)
                   .attr('width', width)
                   .attr('height', height)
                   .attr('xlink:href', base64url)
                   .attr('class', iconClass);
      });
    } else {
      goalElement.append('svg:image')
                 .attr('x', left)
                 .attr('y', _this.yScale(value) - height/2 + 1)
                 .attr('width', width)
                 .attr('height', height)
                 .attr('xlink:href', url)
                 .attr('class', iconClass);
    }

    }
};

/**
 * To draw the tooltip if the user have opted to.
 * @param {String} type - Type of the chart
 */
Chart.prototype.checkTooltip = function(type) {

  var graph, _this = this;

  switch (type) {
    case 'bar':
      graph = CONSTANTS.BAR_CHART;
      break;
    case 'stackedBar':
      graph = CONSTANTS.STACK_CHART;
      break;
    case 'line':
    case 'multiLine':
      graph = CONSTANTS.LINE_CHART;
      break;
    case 'area':
      graph = CONSTANTS.AREA_CHART;
  }

  if (_this.options.tooltip && _this.options.tooltip.show) {
    var event = _this.options.tooltip.listener
                    ? _this.options.tooltip.listener
                    : CONSTANTS.TOOLTIP.LISTENERS;
    _this.showTooltip(_this.options.tooltip, event, graph);
  }

};

/**
 * Method to add the tooltip to the chart. On hovering above the graph
 * @param {Object} config - configuration options
 * @param {String} event  - Name of the event to which Tooltip should respond.
 * @param {Object} graph  - Graph defaults.
 **/
Chart.prototype.showTooltip = function(config, event, graph) {
  var _this = this,
      previousValue,
      triggeredEvent,
      tooltipClass =  config.class ? config.class : '';

  d3.select(_this.element)
    .selectAll('#fc-tooltip')
    .remove();

  var tooltip = d3.select(_this.element)
                  .append('div')
                  .attr('class', 'fc-tooltip ' + tooltipClass)
                  .attr('id', 'fc-tooltip');

  tooltip.node().style.position = 'absolute';
  tooltip.node().style.visibility = 'hidden';

  _this.plot.selectAll(graph.element)
            .on(event, function(d) {
              triggeredEvent = d3.event.type;
              switch (graph.type) {
                case 'bar':
                  config.xValue = d[0];
                  config.yValue = d[1];
                  break;
                case 'stackedBar':
                  config.xValue = d.data[_this.xAxisKey];
                  config.yValue = _this.valueSum(d.data, _this.stackList);
                  config.stackData = d.data;
                  break;
                case 'line':
                  config.xValue = d[0];
                  config.yValue = d[1];
                case 'multiline':
                  config.xValue = d[0];
                  config.yValue = d[1];
                  config.line = d[2];
                  break;
              }

              if (previousValue !== d) {
                tooltip.html(config.formatter ? config.formatter() : _this.tooltipBody(config))
                tooltip.node().style.visibility = 'visible';
                tooltip.node().style.left = _this.calculatePosition('left', [config.xValue, config.yValue]);
                tooltip.node().style.top =  _this.calculatePosition('top', [config.xValue, config.yValue]);
                (d3.event.type != 'mouseover') ? previousValue = d : previousValue = '';
              }
              else {
                tooltip.node().style.visibility = 'hidden';
                previousValue = '';
              }
            })
            .on('mouseout', function() {
              if (triggeredEvent === 'mouseover') {
                tooltip.node().style.visibility = 'hidden';
              }
            });

  document.addEventListener('touchstart', function (e) {
      var touch = e.touches[0];
      if (!e.target.classList.contains(graph.class)) {
        tooltip.node().style.visibility = 'hidden';
      }
  }, false);

  document.addEventListener('click', function (e) {
      if (!e.target.classList.contains(graph.class)) {
        tooltip.node().style.visibility = 'hidden';
      }
  }, false);
};

/**
 * To calculate position of tooltip
 * @param  {string} position  - position
 * @param  {Array} d          - data
 * @return {Integer}          - position value
 */
Chart.prototype.calculatePosition = function(position, d) {

  var _this   = this,
      legend  = _this.options.legend,
      line    = _this.options.line,
      tooltip = _this.element.querySelector('#fc-tooltip'),
      border_left_width = parseInt(window.getComputedStyle(_this.element.querySelector('#fc-tooltip'), ':after')
                                         .getPropertyValue('border-left-width')),
      border_top_width  = parseInt(window.getComputedStyle(_this.element.querySelector('#fc-tooltip'), ':after')
                                         .getPropertyValue('border-top-width')),
      tipHeight         = (border_left_width > border_top_width)
                                          ? border_left_width
                                          : border_top_width,
      tooltipHeight     = tipHeight + tooltip.offsetHeight,
      tooltipClasses    = tooltip.classList,
      left    = _this.xScale(d[0]) + _this.shiftCalculate('x', '#fc-tooltip', tipHeight),
      top     = _this.element.offsetTop
                     + _this.yScale(d[1])
                     + _this.shiftCalculate('y', '#fc-tooltip', tipHeight)
                     - _this.margin.top;
  if (line && line.plotPoints && line.plotPoints.icon && line.plotPoints.icon.width) {
    top -= line.plotPoints.icon.width/2;
  }

  //if there is not enough space on top, move the tooltip down
  if (top - _this.element.offsetTop < 0) {
    top += (tooltipHeight + tipHeight);
    if (line && line.plotPoints && line.plotPoints.icon && line.plotPoints.icon.width) {
      top += line.plotPoints.icon.width + 2;
    }
    tooltipClasses.add('bottom');
    tooltipClasses.remove('left', 'top', 'right');
  }
  else {
    tooltipClasses.remove('bottom', 'left', 'right');
    tooltipClasses.add('top');
  }

  if ((left - _this.element.offsetLeft) < 0) {
    left += (tooltip.offsetWidth/2 + tipHeight);
    top  += (tooltipHeight/2 + tipHeight/2);
    tooltipClasses.add('right');
    tooltipClasses.remove('bottom', 'top');
  }
  else if((left + tooltip.offsetWidth) > _this.element.offsetWidth) {
    left -= (tooltip.offsetWidth/2 + tipHeight);
    top  += (tooltipHeight/2 + tipHeight/2);
    tooltipClasses.remove('bottom', 'top', 'right');
    tooltipClasses.add('left');
  }

  if (position === 'left') {
    return left + 'px';
  } else {
    if (legend && legend.position === 'top') {
      return (top + _this.legendHeight + tipHeight/2) + 'px';
    } else {
      return top + 'px';
    }
  }
};

/** Amount of shifting required in both so that tooltip appears in
  * correct co-ordinates and above the bar.
  * @param {String} axis        - Value of which axis is to be returned.
  * @param {String} element     - Tooltip element name.
  * @param {Integer} paddingVal - Padding value used in tooltip.
  * @return {Integer}           -  The amount of units to be shifted in corresponding axis.
  **/

Chart.prototype.shiftCalculate = function(axis, element, tipHeight) {

  var _this = this,
      elementWidth = _this.element.querySelector(element).offsetWidth,
      elementHeight = _this.element.querySelector(element).offsetHeight,
      xShift = _this.xScale.bandwidth()/2 - elementWidth/2,
      yShift = -(elementHeight + tipHeight);

  if (_this.margin) {
    yShift += _this.margin.top;
  }

  if (axis === 'x' || axis === 'X')
    return xShift;
  else if (axis === 'y' || axis === 'Y')
    return yShift;
};

/**
 * Formats the body for tooltip when title, X-Label and Y-Label are given.
 * @param {Object} config   - tooltip configuration options.
 * @return {String} content - Formatted HTML string for tooltip body.
 */
Chart.prototype.tooltipBody = function(config) {

  if (config.body) {
    var _this   = this;
        title   = config.body.title ? config.body.title : CONSTANTS.TOOLTIP.BODY.title,
        xLabel  = config.body.xLabel ? config.body.xLabel : CONSTANTS.TOOLTIP.BODY.xLabel,
        yLabel  = config.body.yLabel ? config.body.yLabel : CONSTANTS.TOOLTIP.BODY.yLabel,
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
  }

};

/**
  * For creating vertical lines.
  */
Chart.prototype.verticalGridLines = function() {

  var _this  = this,
      grids  = _this.options.grids,
      axis  = _this.options.axis,
      height = _this.yMin - _this.yMax;

  var xTick = d3.axisBottom(_this.xScale)
                .tickSize(-height)
                .tickFormat('');

  if (grids && grids.vertical && grids.vertical.values) {
    var tick = grids.vertical.values;
    if (typeof tick[0] === 'object') {
      var key = [ ];
      tick.forEach(function(d) {
        key.push(d.key);
      });
    } else {
      var key = tick;
    }
    xTick.tickValues(key);
  }
  return xTick;
};

/**
  * For creating horizontal lines.
  */
Chart.prototype.horizontalGridLines = function() {

  var _this = this,
      axis  = _this.options.axis,
      grids = _this.options.grids,
      width = (axis && axis.xAxis && axis.xAxis.showAxisLine)
                    ? _this.width - (CONSTANTS.DEFAULT_MARGIN.LEFT + CONSTANTS.DEFAULT_MARGIN.RIGHT + _this.margin.left)
                    : _this.width;

  var orientation = (axis && axis.yAxis && axis.yAxis.orientation)
                          ? axis.yAxis.orientation
                          : 'left';

  if (axis && axis.xAxis && axis.xAxis.showAxisLine) {
    if (orientation === 'left') {
      width -= CONSTANTS.ORIENTATION_MARGIN.LEFT;
    } else {
      width -= CONSTANTS.ORIENTATION_MARGIN.RIGHT;
    }
  }

  var yTick = d3.axisLeft(_this.yScale)
                .tickSize(-width)
                .tickFormat('');

  if (grids && grids.horizontal && grids.horizontal.values) {
    var tick = grids.horizontal.values;
    if (tick.indexOf(_this.yExtent[0]) < 0) {
      tick.unshift(_this.yExtent[0]);
      // if (axis && axis.yAxis && axis.yAxis.ticks && axis.yAxis.ticks.values) {
      //   if (typeof axis.yAxis.ticks.values === 'object') {
      //     axis.yAxis.ticks.values.unshift({ value : _this.yExtent[0], label : _this.yExtent[0]});
        console.log('HHA',axis.yAxis.ticks.values, tick )
        // } else {
        //   axis.yAxis.ticks.values.unshift(_this.yExtent[0]);
        // }
      // }
    }
    yTick.tickValues(tick);
  }
  return yTick;
};

/**
 * For creating horizontal lines at user specified point on y-Axis.
 */
Chart.prototype.goalLine = function() {

  var _this = this,
      axis  = _this.options.axis,
      width = (axis && axis.xAxis && axis.xAxis.showAxisLine)
                    ? _this.width - (CONSTANTS.DEFAULT_MARGIN.LEFT + CONSTANTS.DEFAULT_MARGIN.RIGHT + _this.margin.left)
                    : _this.width;

  var orientation = (axis && axis.yAxis && axis.yAxis.orientation)
                          ? axis.yAxis.orientation
                          : 'left';

  if (axis && axis.xAxis && axis.xAxis.showAxisLine) {
    if (orientation === 'left') {
      width -= CONSTANTS.ORIENTATION_MARGIN.LEFT;
    } else {
      width -= CONSTANTS.ORIENTATION_MARGIN.RIGHT;
    }
  }



  return d3.axisLeft(_this.yScale)
           .tickSize(-width)
           .ticks(1)
           .tickFormat('')
};

/**
 * For automatically finding the margin.
 */
Chart.prototype.defaultMargin = function() {

  var _this  = this,
      config = _this.options.axis;

  if (config && config.yAxis && config.yAxis.orientation) {
    if (config.yAxis.orientation === 'left') {
      return CONSTANTS.DEFAULT_MARGIN.LEFT;
    } else {
      return 0;
    }
  }
  else {
    if (CONSTANTS.AXIS_CONFIG.Y_AXIS.orientation === 'left') {
      return CONSTANTS.DEFAULT_MARGIN.LEFT;
    } else {
      return 0;
    }
  }
};

/**
 * To find the sum of values in an `object` that is mentioned in `list`.
 * Eg: Object = { a : 1, b : 2, c : 5 } list = ['a', 'b'], returns 3
 * @param {Object} object - The source object whose sum of values to be found.
 * @param {Array} list - The list of key whose sum of values are to be found.
 * @return {Integer} sum - The sum of values of keys mentioned in `list`.
 */
Chart.prototype.valueSum = function(object, list) {

  var sum = 0;
  for (var elt in object) {
    if (object.hasOwnProperty(elt) && list.indexOf(elt) !== -1) {
      sum += parseFloat(object[elt]);
    }
  }
  return sum;
};

/**
 * To check whether a given string is a real number or not.
 */
Chart.prototype.isNumber =function(value) {
  var x;
  if (isNaN(value)) {
    return false;
  }
  x = parseFloat(value);
  return (x | 0) === x;
};


/**
 * To get the base64 URL of image.
 */
Chart.prototype.getBase64Image = function(url, callback) {

  var img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = url;
  img.id = 'qd-image-id';
  var div = document.createElement('div');
  div.style.display = 'none';
  div.id = 'qd-invisible-div';
  document.body.appendChild(div);

  img.onload = function () {
    div.appendChild(img);
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL('image/png');
      d3.selectAll('#qd-image-id').remove();
      d3.selectAll('#qd-invisible-div').remove();
      callback(dataURL);

  };
};

/**
 * To find elements that is in source array but not in check array.
 * Eg: Source = [1, 2, 3, 4] Check = [1, 2], Diff = [3, 4]
 * @param {Array} a - Check array.
 * @return {Array} - The elements in source array and not in check array.
 */
Array.prototype.diff = function(a) {
  return this.filter(function(i) { return a.indexOf(i) < 0; });
};

/**
 * To find unique elements from an array.
 * Eg: arr = [1, 2, 3, 4, 1, 2, 3, 1, 2, 3] arr.unique() = [1, 2, 3, 4]
 * @return {Array} - Unique elements in that array.
 */
Array.prototype.unique = function() {
  var a = [ ];
  for (var i = 0,  l = this.length; i < l; i++)
      if (a.indexOf(this[i]) === -1)
          a.push(this[i]);
  return a;
}


Array.range = function(start, stop, step) {
  var a = [ ];
  step = step || 1;
  a[0] = start;
  while (start+step <= stop) {
    a[a.length] = start+= step;
  }
  return a;
};

if (Element.prototype.remove === undefined) {
  Element.prototype.remove = function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

if (String.prototype.contains === undefined) {
  String.prototype.contains = function() {
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}

/**
  * Used for drawing barcharts.
  * Barchart class definition.
  *
  * @param {String} element - Name of the element to which graph is to be drawn.
  * @param {Object} data - Data for which graph is to be drawn
  * @param {Object} options - Other options that can be added to the graph.
  */
var BarChart = function(element, data, options) {

  var _this = this;

  // Set all the parameter values to global scope
  _this.setValues(element, data, options, {
    type : 'bar'
  });

  // Range of x and y axis values.
  _this.xExtent = _this.xExtentCalculate(_this.data);
  _this.yExtent = _this.yExtentCalculate(_this.data);

  _this.drawBarChart('bar');

  // Redraw the graph when window size is altered so as to make it responsive.
  window.addEventListener('resize', function(event) {
    _this.setValues(element, data, options, {
      type : 'bar'
    });
    _this.drawBarChart('bar');
  });

};


// Cloning the baseclass `Chart` so as to access all its methods.
BarChart.prototype = Object.create(Chart.prototype);

/**
  * Function which finds the X Axis ticks from the data provided.
  * @return {Array} - An array which contains all x Axis ticks.
  */
BarChart.prototype.xExtentCalculate = function(data) {
  return data.map(function(d) { return d[0]; });
};

/**
  * Function which finds the range of Y Axis values from the data provided.
  * @return {Array} - An array which contains minimum and maximum value.
  */
BarChart.prototype.yExtentCalculate = function(data) {
  var yExtent = d3.extent(data, function(d) { return d[1]; });
  if (yExtent[0] > 0) {
    yExtent[0] = 0;
  }
  return yExtent;
};

/**
  * Draws Barchart according to user input.
  * @param {Integer} barWidth - User defined width of each bar.
  */
BarChart.prototype.drawBarChart = function(type) {

  var _this  = this,
      margin = _this.margin;

  // Calls the base class function to draw canvas.
  _this.drawChart();

  // Display svg only in the graph area.
  _this.plot.append('clipPath')
            .attr('id', 'bar-clip')
            .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', _this.width)
            .attr('height', _this.height - (margin.bottom + CONSTANTS.DEFAULT_MARGIN.BOTTOM));

  _this.checkGoalLine();
  _this.createBars(type, _this.data);
  _this.checkTransition();
  _this.checkTooltip(type);

};

/**
  * Create the element for bars checking whether it is normal or stacked graph.
  * @param {String} type - Type of the graph (stack/bar)
  */
BarChart.prototype.createBars = function(type, data) {

  var _this  = this,
      margin = _this.margin,
      bar    = _this.options.bar ? _this.options.bar : CONSTANTS.BAR;

  switch (type) {
    case 'bar':
      var barPlot = _this.plot.append('g')
                              .attr('class', 'fc-bars ');

      _this.bar = barPlot.selectAll('bar')
                          .data(data)
                          .enter()
                          .append('path')
                          .attr('class', 'fc-bar')
                          .attr('fill', _this.color);
      break;
    case 'stackedBar':
      var barPlot = _this.plot.append('g')
                            .attr('class', 'fc-stacked-bars');

      _this.groups = barPlot.selectAll('g.stack')
                               .data(_this.stack_data)
                               .enter()
                               .append('g')
                               .style('fill', function(d, i) { return _this.color[i]; });

      _this.rect = _this.groups.selectAll('path')
                               .data(function(d) { return d; })
                               .enter()
                               .append('path')
                               .attr('class', 'fc-stacked-bar');
      break;
  }
};

/**
  * To decide whether transition is need or not. If yes, what kind of transition
  */
BarChart.prototype.checkTransition = function() {

  var _this      = this,
      transition = _this.options.transition,
      barWidth   = _this.calculateBarwidth();

  if (transition && transition.animate) {
    var animationDelay = (transition.delay)
                            ? transition.delay
                            : 0,
        duration       = (transition.duration)
                            ? transition.duration
                            : 1000;
    _this.drawBarsWithAnimation(barWidth, animationDelay, duration);
  } else {
    _this.drawBarsWithoutAnimation(barWidth);
  }

};

/**
  * To draw the goal lines if the user have opted to.
  */
BarChart.prototype.checkGoalLine = function() {
  var _this = this;
  if (_this.options.goalLine && _this.options.goalLine.value) {
    _this.addGoalLines();
  }
};

/**
  * Calculates the responsive bar width for the graph.
  */
BarChart.prototype.calculateBarwidth = function() {
  var _this = this,
      bar   = _this.options.bar;

  var barWidth = (bar && bar.width)
                      ? bar.width
                      : _this.xScale.bandwidth();

  barWidth = (barWidth > _this.xScale.bandwidth())
                      ? _this.xScale.bandwidth()
                      : barWidth;

  return barWidth;
};

/**
  * Draws bars in a Barchart with animation.
  * @param {Integer} barWidth - User defined width of each bar.
  * @param {Integer} animationDelay - Delay after which each bars are drawn(in ms)
  */
BarChart.prototype.drawBarsWithAnimation = function(barWidth, animationDelay, duration) {

  var _this   = this,
      bar     = _this.options.bar,
      radius  = barWidth/2,
      xShift  = _this.barCentering(barWidth, _this.xScale.bandwidth()),
      opacity = (bar && bar.opacity)
                      ? bar.opacity
                      : CONSTANTS.BAR.opacity;

  _this.bar.attr('d', function(d) {
            var x = _this.xScale(d[0]) + xShift;
            return _this.drawRoundedRectangle(d, x, _this.yMin, barWidth, 0, 0);
          })
          .attr('clip-path', 'url(#bar-clip)')
          .transition()
          .delay(function(d, i) { return i*animationDelay; })
          .duration(duration)
          .attr('d', function(d) {
            return _this.drawBar(d, xShift, barWidth)
          })
          .attr('opacity', opacity);

};


/**
  * Draws bars in a Barchart without animation.
  * @param {Integer} barWidth - User defined width of each bar.
  */
BarChart.prototype.drawBarsWithoutAnimation = function(barWidth) {

  var _this   = this,
      bar     = _this.options.bar,
      radius  = barWidth/2,
      opacity = (bar && bar.opacity)
                      ? bar.opacity
                      : CONSTANTS.BAR.opacity,
      xShift  = _this.barCentering(barWidth, _this.xScale.bandwidth());

  _this.bar.attr('d', function(d) {
              return _this.drawBar(d, xShift, barWidth);
            })
            .attr('clip-path', 'url(#bar-clip)')
            .attr('opacity', opacity);

};

/**
 * Draws rounded rectangle bars
 * @param  {Integer} d        - data
 * @param  {Integer} y        - Y-axis coordinate
 * @param  {Integer} barWidth - width of each bar
 * @param  {Integer} height   - height of each bar
 * @param  {Integer} radius   - radius of curve
 * @return {string}           - path of svg element
 */
BarChart.prototype.drawRoundedRectangle = function (d, x, y, width, height, radius) {

  return 'M' + (x + radius) + ' ' + y
          + 'h' + (width - 2*radius)
          + 'a' + radius + ' ' + radius + ' '+ 0 + ' ' + 0 + ' ' + 1 + ' ' + radius + ' ' + radius
          + 'v' + (height - 2*radius)
          + 'v' + radius
          + 'h' + -radius
          + 'h' + (2*radius - width)
          + 'h' + -radius
          + 'v' + -radius
          + 'v' + (2*radius - height)
          + 'a' + radius + ' ' + radius + ' '+ 0 + ' ' + 0 + ' ' + 1 + ' ' + radius + ' ' + -radius
          + 'z';

};

/**
  * To draw the bar with curved end at the top.
  * @param {Object} d - Data
  * @param {Integer} margin - margin amount to be shifted
  * @param {Integer} barWidth - Width of each bar
  */
BarChart.prototype.drawBar = function(d, margin, barWidth) {

  var _this = this,
      bar   = _this.options.bar;
  var x, y, height, radius;
  radius = (bar && bar.curve) ? barWidth/2 : 0;
  x      = _this.xScale(d[0]) + margin,
  y      = _this.yScale(d[1]),
  height = _this.yMin - _this.yScale(d[1]);

  return _this.drawRoundedRectangle(d, x, y, barWidth, height, radius);
};

/**
  * To find how much more length is to be shifted on X axis when user defines
  * the widht of the bar in chart.
  * @param {Integer} barWidth - User defined bar width for the chart.
  * @return {Integer} - The amount of units in the X axis that needs to be shifted.
  */
BarChart.prototype.barCentering = function(barWidth) {
  var _this = this;
  if (barWidth <  _this.xScale.bandwidth())
    return (_this.xScale.bandwidth()-barWidth)/2;
  else
    return 0;
};

/**
  * Used for drawing linecharts.
  * Linechart class definition.
  *
  * @param {String} element - Name of the element to which graph is to be drawn.
  * @param {Object} data - Data for which graph is to be drawn
  * @param {Object} options - Other options that can be added to the graph.
  */
var LineChart = function(element, data, options) {

  var _this = this;

  // Set all the parameter values to global scope
  _this.setValues(element, data, options, {
    type : 'line'
  });

  // Range of x and y axis values.
  _this.xExtent = _this.xExtentCalculate(_this.data);
  _this.yExtent = _this.yExtentCalculate(_this.data);

  _this.initiateDraw('line');

  // Redraw the graph when window size is altered so as to make it responsive.
  window.addEventListener('resize', function(event) {
    _this.setValues(element, data, options, {
      type : 'line'
    });
    _this.initiateDraw('line');
  });
};


// Cloning the baseclass `Chart` so as to access all its methods.
LineChart.prototype = Object.create(Chart.prototype);


/**
  * Function which finds the X Axis ticks from the data provided.
  * @return {Array} - An array which contains all x Axis ticks.
  */
LineChart.prototype.xExtentCalculate = function(data) {
  return data.map(function(d) { return d[0]; });
};

/**
  * Function which finds the range of Y Axis values from the data provided.
  * @return {Array} - An array which contains minimum and maximum value.
  */
LineChart.prototype.yExtentCalculate = function(data) {
  var yExtent = d3.extent(data, function(d) {return d[1]});
  if (yExtent[0] > 0) {
    yExtent[0] = 0;
  }
  return yExtent;
};

/**
  * Function to initiate draw by finding the base64 of plotpoint images before
  * start drawing the graph.
  * @param {String} type - type of the graph.
  */
LineChart.prototype.initiateDraw = function(type) {

  var _this      = this,
      threshold  = _this.options.threshold;

  _this.dataExist = _this.doesDataExist(_this.data);

  if (threshold && threshold.value && threshold.icon && threshold.icon.url && _this.dataExist) {
    if (threshold.icon.toBase64) {
      _this.getBase64Image(threshold.icon.url, function(base64url) {
        _this.thresholdIconUrl = base64url;
        _this.drawLineChart(type);
      })
    } else {
      _this.thresholdIconUrl = threshold.icon.url;
      _this.drawLineChart(type);
    }
  } else {
    _this.drawLineChart(type);
  }

};

/**
  * Function to draw the line chart by drawing the axis, goal lines, line
  * @param {String} type - type of the graph.
  */
LineChart.prototype.drawLineChart = function(type) {

  var _this       = this,
      line        = _this.options.line ? _this.options.line : CONSTANTS.LINE;
      threshold   = _this.options.threshold,
      connectNull = _this.options.connectNull;

  // Calls the base class function to draw canvas.
  _this.drawChart();

  if (_this.dataExist) {
    _this.checkGoalLine();

    //Defining the line
    _this.line = d3.line()
                   .x(function(d) { return _this.xScale(d[0]) + _this.xScale.bandwidth()/2; })
                   .y(function(d) { return _this.yScale(d[1]); })
                   .defined(function(d, i) {
                      return d[1] != null;
                      // returns true if line is defined; in this case, if y value is not null
                    })
                   .curve(d3.curveMonotoneX);

    _this.drawLine(type, _this.data, line, threshold, connectNull, 'line');
    _this.checkTransition();
  }

};

/**
  * Function to draw the line of the line chart
  * @param {String} type      - type of the graph.
  * @param {Object} data      - Data to draw the line on the graph.
  * @param {Object} line      - line config of the graph.
  * @param {Object} threshold - threshold config of the graph.
  * @param {String} lineId    - ID for the line.
  */
LineChart.prototype.drawLine = function(type, data, line, threshold, connectNull, lineId) {

  var _this       = this;

  var linePlot = _this.plot.append('g')
                           .attr('class', 'fc-line')
                           .attr('id', 'fc-' + lineId);

  var filteredData = connectNull
                          ? data.filter(_this.line.defined())
                          : data;

  var strokeWidth = (line && line.width)
                          ? line.width
                          : 4;

  var className = (line && line.class)
                          ? 'fc-line-stroke ' + line.class
                          : 'fc-line-stroke';
  var color = (line && line.color)
                          ? line.color
                          : _this.color;

  linePlot.selectAll('.line')
          .data([data])
          .enter()
          .append('path')
          .attr('class', className)
          .attr('id', 'fc-path-' + lineId)
          .attr('stroke', color)
          .attr('stroke-width', strokeWidth)
          .attr('d', _this.line(filteredData))
          .attr('fill', 'none')
          .attr('clip-path', 'url(#fc-clip-' + lineId + ')');

  if (line && line.icon && line.icon.show) {
    _this.drawPlotPoints(type, linePlot, filteredData, line, threshold, lineId);
  }
  _this.clipPath = _this.plot.append('clipPath')
                             .attr('id', 'fc-clip-' + lineId)
                             .append('rect');

};

/**
  * Function to draw the plot points to the line chart
  * @param {String} type      - type of the graph.
  * @param {Object} plot      - plot to which new elements need to be added.
  * @param {Object} data      - Data to draw the line on the graph.
  * @param {Object} line       - line config of the graph.
  * @param {Object} thresholdConfig - threshold config of the graph.
  * @param {String} lineId    - ID for the line.
  */
LineChart.prototype.drawPlotPoints = function(type, plot, data, line, thresholdConfig, lineId) {

  var _this        = this,
      thresholdVal = (thresholdConfig && thresholdConfig.value)
                          ? thresholdConfig.value
                          : null,
      iconConfig   = line.icon;

  var normalIconData = data.filter(function(d) {
                          if (thresholdVal === null) {
                            if (d[1] !== null) {
                              return d;
                            }
                          } else {
                            if (d[1] !== null && d[1] < thresholdVal) {
                              return d;
                            }
                          }
                        });

  var thresholdData = data.filter(function(d) {
                              if (thresholdVal !== null && d[1] !== null && d[1] >= thresholdVal) {
                                  return d;
                              }
                            });

  if (iconConfig && iconConfig.url) {
    if (iconConfig.toBase64) {
      _this.getBase64Image(iconConfig.url, function(normalIconBase64Url) {
        _this.addImagePlotPoints(plot, normalIconData, iconConfig, normalIconBase64Url, lineId)
        _this.addImagePlotPoints(plot, thresholdData, iconConfig, _this.thresholdIconUrl, lineId)
        _this.checkTooltip(type);
      });
    } else {
      _this.addImagePlotPoints(plot, normalIconData, iconConfig, iconConfig.url, lineId)
      _this.addImagePlotPoints(plot, thresholdData, iconConfig, _this.thresholdIconUrl, lineId)
      _this.checkTooltip(type);
    }
  } else {
    _this.addColorPlotPoints(plot, normalIconData, line, iconConfig.url, lineId)
    _this.addImagePlotPoints(plot, thresholdData, iconConfig, _this.thresholdIconUrl, lineId)
    _this.checkTooltip(type);
  }

};

/**
  * Function to add the image plot points to the line chart
  * @param {Object} plot       - plot to which new elements need to be added.
  * @param {Object} data       - Data to draw the line on the graph.
  * @param {Object} line       - line config of the graph.
  * @param {String} iconUrl    - url for the icon.
  * @param {String} lineId     - ID for the line.
  */
LineChart.prototype.addImagePlotPoints = function(plot, data, iconConfig, iconUrl, lineId) {

  var _this       = this,
      currentLine = '.fc-' + lineId
      iconWidth   = iconConfig.width
                      ? iconConfig.width
                      : CONSTANTS.LINE.icon.width;

  plot.selectAll(currentLine)
      .data(data.filter(function(d) { return d[1] !== null; }))
      .enter()
      .append('svg:image')
      .attr('class', 'fc-line-point')
      .attr('x', function(d) { return _this.xScale(d[0]) + _this.xScale.bandwidth()/2 - iconWidth/2; })
      .attr('y', function(d) { return _this.yScale(d[1]) - iconWidth/2; })
      .attr('width', iconWidth)
      .attr('height', iconWidth)
      .attr('xlink:href', iconUrl)
      .attr('clip-path', 'url(#fc-clip-' + lineId + ')');

};

/**
  * Function to add the color plot points to the line chart
  * @param {Object} plot       - plot to which new elements need to be added.
  * @param {Object} data       - Data to draw the line on the graph.
  * @param {Object} iconConfig - icon config of the graph.
  * @param {String} iconUrl    - url for the icon.
  * @param {String} lineId     - ID for the line.
  */
LineChart.prototype.addColorPlotPoints = function(plot, data, line, iconUrl, lineId) {

  var _this       = this,
      iconConfig  = line.icon
      currentLine = '.fc-' + lineId
      iconWidth   = iconConfig.width
                        ? iconConfig.width
                        : CONSTANTS.LINE.icon.width,
      radius      = (line && line.width)
                        ? 1.25 * line.width
                        : 1.25 * CONSTANTS.LINE.width,
      color       = (line && line.color)
                        ? line.color
                        : _this.color;

  plot.selectAll(currentLine)
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'fc-line-point')
      .attr('cx', function(d) { return _this.xScale(d[0]) + _this.xScale.bandwidth()/2; })
      .attr('cy', function(d) { return _this.yScale(d[1]); })
      .attr('r', radius)
      .attr('stroke-width', 1)
      .attr('stroke', color)
      .attr('fill', '#fff')
      .attr('clip-path', 'url(#fc-clip-' + lineId + ')');
};

/**
  * To decide whether transition is need or not. If yes, what kind of transition
  */
LineChart.prototype.checkTransition = function() {

  var _this      = this,
      transition = _this.options.transition;

  if (transition && transition.animate) {
      var duration = (transition.duration)
                          ? transition.duration
                          : 1000;
      _this.drawLineWithAnimation(duration);
    } else {
      _this.drawLineWithoutAnimation();
    }

};

/**
  * To draw the threshold lines if the user have opted to.
  */
LineChart.prototype.checkGoalLine = function() {

  var _this = this;

  if (_this.options.goalLine && _this.options.goalLine.value) {
    _this.addGoalLines();
  }

};

/**
  * To draw the lines with animation.
  * @param {Integer} duration - Duration of the animation.
  */
LineChart.prototype.drawLineWithAnimation = function(duration) {
  var _this  = this,
      margin = _this.margin,
      height =  _this.height + margin.top + margin.bottom + CONSTANTS.DEFAULT_MARGIN.TOP;

  _this.clipPath.attr('width', 0)
                .attr('height', height)
                .transition()
                .duration(duration)
                .attr('width', _this.width)
};

/**
  * To draw the lines without animation.
  */
LineChart.prototype.drawLineWithoutAnimation = function() {
  var _this = this;

  _this.clipPath.attr('width', _this.width)
                .attr('height', _this.height);
};

/**
  * To check whether the data exist or not
  * @param {Object} data - Data to draw the graph.
  */
LineChart.prototype.doesDataExist = function(data) {
  if (data && data.length > 0) {
    return true;
  } else {
    return false;
  }
};

/**
  * Used for drawing Multilinecharts.
  * MultiLinechart class definition.
  *
  * @param {String} element - Name of the element to which graph is to be drawn.
  * @param {Object} data - Data for which graph is to be drawn
  * @param {Object} options - Other options that can be added to the graph.
  */
var MultiLineChart = function(element, data, options) {

  var _this = this;

  // Set all the parameter values to global scope
  _this.setValues(element, data, options, {
    type : 'multiLine'
  });

  // Range of x and y axis values.
  _this.xExtent = _this.xExtentCalculate(_this.data);
  _this.yExtent = _this.yExtentCalculate(_this.data);

  _this.initiateDraw('multiLine');

  // Redraw the graph when window size is altered so as to make it responsive.
  window.addEventListener('resize', function(event) {
    _this.setValues(element, data, options);
    _this.initiateDraw('multiLine');
  });

}

// Cloning the baseclass `Chart` so as to access all its methods.
MultiLineChart.prototype = Object.create(LineChart.prototype);


/**
  * Function which finds the X Axis ticks from the data provided.
  * @return {Array} - An array which contains all x Axis ticks.
  */
MultiLineChart.prototype.xExtentCalculate = function(data) {

  var _this  = this;

  var values = _this.flattenArray(data).map(function(d) { return d[0]; });
  return values.unique();

};

/**
  * Function which finds the range of Y Axis values from the data provided.
  * @return {Array} - An array which contains minimum and maximum value.
  */
MultiLineChart.prototype.yExtentCalculate = function(data) {
  var _this = this;
  var yExtent = d3.extent(_this.flattenArray(data).map(function(d) { return d[1]; }));
  if (yExtent[0] > 0) {
    yExtent[0] = 0;
  }
  return yExtent;
};

/**
  * Function to draw the line chart by drawing the axis, goal lines, line
  * @param {String} type - type of the graph.
  */
MultiLineChart.prototype.drawLineChart = function(type) {

  var _this      = this,
      line       = _this.options.line ? _this.options.line : { }
      legend     = _this.options.legend,
      threshold  = _this.options.threshold ? _this.options.threshold : { },
      transition = _this.options.transition;

  if (legend && legend.show && legend.position === 'top') {
    _this.checkLegend(type, _this.data)
  }

  // Calls the base class function to draw canvas.
  _this.drawChart();

  if (_this.dataExist) {
    _this.checkGoalLine();

    //Defining the line
    _this.line = d3.line()
                   .x(function(d) { return _this.xScale(d[0]) + _this.xScale.bandwidth()/2; })
                   .y(function(d) { return _this.yScale(d[1]); })
                   .defined(function(d, i) {
                      return d[1] != null;
                      // returns true if line is defined; in this case, if y value is not null
                    })
                   .curve(d3.curveMonotoneX);
    if (transition && transition.delay && transition.delay > 0) {
      _this.drawMultiLinesWithDelay(type, _this.data, line, threshold, transition.delay, 0);
    } else {
      _this.drawMultiLinesWithoutDelay(type, _this.data, line, threshold, 0);
    }
  }

  if (legend && legend.show && legend.position === 'bottom') {
    _this.checkLegend(type, _this.data);
  }

};

/**
  * Function to draw the line of the line chart with delay between each line
  * @param {String} type      - type of the graph.
  * @param {Object} data      - Data to draw the line on the graph.
  * @param {Object} line      - line config of the graph.
  * @param {Object} threshold - threshold config of the graph.
  * @param {Integer} delay    - Delay between drawing 2 lines.
  * @param {Integer} i        - Iteration number.
  */
MultiLineChart.prototype.drawMultiLinesWithDelay = function(type, data, line, threshold, delay, i) {
  var _this       = this,
      connectNull = _this.options.connectNull;

  var currentLineConfig      = _this.getLineConfig(line, i);
  var currentThresholdConfig = _this.getThresholdConfig(threshold, i);
  var lineId                 = 'line-' + String(i+1);

  _this.drawLine(type, data[i].value, currentLineConfig, currentThresholdConfig, connectNull[i], lineId);
  _this.checkTransition();

  if (++i < data.length) {
    setTimeout(function() {
      _this.drawMultiLinesWithDelay(type, data, line, threshold, delay, i);
    }, delay);
  }

};

/**
  * Function to draw the line of the line chart without delay between lines
  * @param {String} type      - type of the graph.
  * @param {Object} data      - Data to draw the line on the graph.
  * @param {Object} line      - line config of the graph.
  * @param {Object} threshold - threshold config of the graph.
  */
MultiLineChart.prototype.drawMultiLinesWithoutDelay = function(type, data, line, threshold) {
  var _this = this;

  data.forEach(function(d, i) {
    var currentLineConfig      = _this.getLineConfig(line, i);
    var currentThresholdConfig = _this.getThresholdConfig(threshold, i);
    var lineId                 = 'line-' + String(i+1);
    _this.drawLine(type, d.value, currentLineConfig, currentThresholdConfig, lineId);
    _this.checkTransition();
  });
};


MultiLineChart.prototype.getLineConfig = function(line, i) {
  var _this      = this,
      lineConfig = { icon : { } };

  lineConfig.color = _this.color[i];
  lineConfig.width = (line && line.width)
                          ? (line.width instanceof Array)
                                  ? (line.width[i] !== undefined)
                                          ? line.width[i]
                                          : CONSTANTS.MULTI_LINE.width
                                  : line.width
                          : CONSTANTS.MULTI_LINE.width;
  lineConfig.icon.show = (line && line.icon && line.icon.show)
                              ? (line.icon.show instanceof Array)
                                      ? (line.icon.show[i] !== undefined)
                                              ? line.icon.show[i]
                                              : false
                                      : line.icon.show
                              : false;
  lineConfig.icon.url = (line && line.icon && line.icon.url)
                              ? (line.icon.url instanceof Array)
                                      ? line.icon.url[i]
                                      : line.icon.url
                              : null;
  lineConfig.icon.toBase64 = (line && line.icon && line.icon.toBase64)
                                  ? (line.icon.toBase64 instanceof Array)
                                          ? (line.icon.toBase64[i] !== undefined)
                                                  ? line.icon.toBase64[i]
                                                  : false
                                          : line.icon.toBase64
                                  : false;
  lineConfig.icon.width = (line && line.icon && line.icon.width)
                                ? (line.icon.width instanceof Array)
                                        ? (line.icon.width[i] !== undefined)
                                                ? line.icon.width[i]
                                                : CONSTANTS.MULTI_LINE.icon.width
                                        : line.icon.width
                                : CONSTANTS.MULTI_LINE.icon.width;
  return lineConfig;

};



MultiLineChart.prototype.getThresholdConfig = function(threshold, i) {

  var _this           = this,
      thresholdConfig = { icon : { } };

  thresholdConfig.value = (threshold && threshold.value)
                                  ? (threshold.value instanceof Array)
                                          ? threshold.value[i]
                                          : threshold.value
                                  : null;

  thresholdConfig.icon.url = (threshold && threshold.icon && threshold.icon.url)
                                    ? (threshold.icon.url instanceof Array)
                                            ? threshold.icon.url[i]
                                            : threshold.icon.url
                                    : null;
  thresholdConfig.icon.toBase64 = (threshold && threshold.icon && threshold.icon.toBase64)
                                    ? (threshold.icon.toBase64 instanceof Array)
                                            ? (threshold.icon.toBase64[i] !== undefined)
                                                    ? threshold.icon.toBase64[i]
                                                    : false
                                            : threshold.icon.toBase64
                                    : false;
  return thresholdConfig;

};

/**
  * To draw the legend details if the user have opted to.
  */
MultiLineChart.prototype.checkLegend = function(type, data) {
  var _this = this;
  if (_this.options.legend && _this.options.legend.show) {
    _this.addLegend(type, data)
  }
};

MultiLineChart.prototype.addLegend = function(type, data) {

  var _this  = this,
      line   = _this.options.line,
      legend = _this.options.legend;

  var className =  (legend && legend.class)
                            ? 'fc-legend ' + legend.class
                            : 'fc-legend';

  var legendSpace = _this.width/data.length;

  d3.select(_this.element)
    .selectAll('#fc-legend')
    .remove();

  var legendPlot = d3.select(_this.element)
                     .append('div')
                     .attr('class', className)
                     .attr('id', 'fc-legend');


  data.forEach(function(d, i) {

    var clickable = _this.checkClickable(legend, i)
    var listener  = document.ontouchstart !== null ? 'click' : 'touchstart';
        d.active  = true;
    var legendCanvas = legendPlot.append('div')
                                 .attr('id', 'fc-legend-' + String(i+1))
                                 .attr('class', 'fc-legend-element')
                                 .on(listener, function() {
                                   if (clickable)
                                     return _this.toggleVisibility(d, i);
                                 });

    legendCanvas.node().style.width = legendSpace;
    if (!clickable) {
      legendCanvas.node().style.cursor = 'default';
    }

    if (legend && legend.show) {
      if (line.icon && line.icon.url && line.icon.url[i]) {
        var imageUrl = line.icon.url[i];
        _this.getBase64Image(imageUrl, function(base64url) {
          legendCanvas.append('img')
                      .attr('src', base64url);
          legendCanvas.append('span')
                      .text(d.key);
        });
      } else {
        var image = legendCanvas.append('div')
                                .attr('class', 'fc-legend-circle');

        image.node().style.background = _this.color[i];
        legendCanvas.append('span')
                    .attr('float', 'left')
                    .text(d.key);
      }
    }

  });
};

MultiLineChart.prototype.checkClickable = function(legend, i) {

  if (legend) {
    if (legend.clickable[i] || (legend.clickable[i] === undefined && legend.clickable)) {
      return true;
    }
  }
  return false;

};


MultiLineChart.prototype.toggleVisibility = function(d, i) {
  var _this  = this,
      legend = _this.options.legend;

  if (d.active) {
    d3.select(_this.element)
      .selectAll('#fc-line-' + String(i+1))
      .transition(100)
      .style('display', 'none');
    d3.select(_this.element)
      .selectAll('#fc-legend-' + String(i+1))
      .transition(100)
      .style('opacity', 0.5);
  } else {
    d3.select(_this.element)
      .selectAll('#fc-line-' + String(i+1))
      .transition(100)
      .style('display', null);
    d3.select(_this.element)
      .selectAll('#fc-legend-' + String(i+1))
      .transition(100)
      .style('opacity', 1);
  }
  d.active = !d.active;
  return d;

};

MultiLineChart.prototype.flattenArray = function(array) {
  var data = [ ];
  array.forEach(function(d) { data.push(d.value); });
  return [].concat.apply([], data);
};

/**
  * To check whether the data exist or not
  * @param {Object} data - Data to draw the graph.
  */
MultiLineChart.prototype.doesDataExist = function(data) {
  if (data && data.length > 0) {
    for (i = 0; i < data.length; i++) {
      if (data[i].value.length > 0) {
        return true;
      }
    }
  }
  return false;
};

/**
  * Used for drawing Stacked Barcharts.
  * Stacked Barchart class definition.
  *
  * @param {String} element - Name of the element to which graph is to be drawn.
  * @param {Object} data - Data for which graph is to be drawn
  * @param {Array} stack - List of json Keys that forms the stack
  * @param {Object} options - Other options that can be added to the graph.
  */
var StackedBarChart = function(element, data, stack, options) {

  var _this = this;

  _this.setValues(element, data, options, {
    type : 'stackedBar',
    stack : stack
  });

  _this.createStack();

  // Range of x and y axis values.
  _this.xExtent = _this.xExtentCalculate(_this.data);
  _this.yExtent = _this.yExtentCalculate(_this.data);

  _this.drawBarChart('stackedBar');

  // Redraw the graph when window size is altered so as to make it responsive.
  window.addEventListener('resize', function(event) {
    _this.setValues(element, data, options, {
      type : 'stackedBar',
      stack : stack
    });
    _this.drawBarChart('stackedBar');
  });

};


// Cloning the baseclass `BarChart` so as to access all its methods.
StackedBarChart.prototype = Object.create(BarChart.prototype);


/**
  * To create the array to draw stacked graph from the given user data
  */
StackedBarChart.prototype.createStack = function() {

  var _this = this,
      bar   = _this.options.bar;

  // Creating `stack` data structure
  _this.stack = d3.stack()
                  .keys(_this.stackList)
                  .order(d3.stackOrderNone)
                  .offset(d3.stackOffsetNone);

  // Converting user data to d3 stack form.
  _this.stack_data =  _this.stack(_this.data);
  if (bar && bar.curve && bar.curve.show && bar.curve.bars.toUpperCase() === 'ALL') {
    _this.stack_data.reverse().forEach(function(data) {
      var len = data.length;
      for (var i = 0; i < len; i++) {
        data[i][0] = 0;
      }
    });
    _this.color.reverse();
  }


  // Getting the x-Axis tick values from the data
  _this.xAxisKey = Object.keys(_this.data[0]).diff(_this.stackList)[0];

};

/**
  * Function which finds the X Axis ticks from the data provided.
  * @return {Array} - An array which contains all x Axis ticks.
  */
StackedBarChart.prototype.xExtentCalculate = function(data) {

  var _this = this;

  return Object.keys(data)
               .map(function (key) {
                  return data[key][_this.xAxisKey];
                });
};

/**
  * Function which finds the range of Y Axis values from the data provided.
  * @return {Array} - An array which contains minimum and maximum value.
  */
StackedBarChart.prototype.yExtentCalculate = function(data) {

  var _this = this;
  var yExtent =  d3.extent(data.map(function(d) { return _this.valueSum(d, _this.stackList); }));
  if (yExtent[0] > 0) {
    yExtent[0] = 0;
  }
  return yExtent;

};

/**
  * Draws bars in a Barchart with animation.
  * @param {Integer} barWidth - User defined width of each bar.
  * @param {Integer} animationDelay - Delay after which each bars are drawn(in ms)
  */
StackedBarChart.prototype.drawBarsWithAnimation = function(barWidth, animationDelay, duration) {

  var _this  = this,
      xShift = _this.barCentering(barWidth, _this.xScale.bandwidth());

  _this.rect.attr('d', function(d) {
              var x = xShift + _this.xScale(d.data[_this.xAxisKey]),
                  y = _this.yMin;
              return _this.drawRoundedRectangle(d, x, y, barWidth, 0, 0);
            })
            .attr('clip-path', 'url(#bar-clip)')
            .transition()
            .delay(function(d, i) { return i*animationDelay; })
            .duration(duration)
            .attr('d', function(d) {
              return _this.drawBar(d, xShift, barWidth);
            });
};

/**
  * Draws bars in a Barchart without animation.
  * @param {Integer} barWidth - User defined width of each bar.
  */
StackedBarChart.prototype.drawBarsWithoutAnimation = function(barWidth) {

  var _this  = this,
      xShift = _this.barCentering(barWidth, _this.xScale.bandwidth());

  _this.rect.attr('d', function(d) {
              return _this.drawBar(d, xShift, barWidth);
            })
            .attr('clip-path', 'url(#bar-clip)');
};

/**
  * To draw the stacked graph with curved end at the top.
  * @param {Object} d - Data
  * @param {Integer} margin - margin amount to be shifted
  * @param {Integer} barWidth - Width of each bar
  */
StackedBarChart.prototype.drawBar = function(d, margin, barWidth) {

  var _this = this,
      bar   = _this.options.bar;

  if (bar && bar.curve && bar.curve.show) {
    var radius = barWidth/2;
  } else {
    var radius = 0;
  }

  var x = margin + _this.xScale(d.data[_this.xAxisKey]);
  var totalheight = _this.valueSum(d.data, _this.stackList);

  if (isNaN(d[1])) {
    var y  = _this.yScale(d[0]);
    height = 0;
  } else {
    var y  = _this.yScale(d[1]);
    height = _this.yScale(d[0]) - _this.yScale(d[1]);
  }
  if (bar && bar.curve && bar.curve.show && bar.curve.bars.toUpperCase() === 'ALL') {
    return _this.drawRoundedRectangle(d, x, y, barWidth, height, radius);
  } else {
    if (totalheight === d[1]) {
      return _this.drawRoundedRectangle(d, x, y, barWidth, height, radius);
    } else {
      return _this.drawRoundedRectangle(d, x, y, barWidth, height, 0);
    }
  }
};
