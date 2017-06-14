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

  var _this     = this,
      line      = _this.options.line ? _this.options.line : { }
      legend    = _this.options.legend,
      threshold = _this.options.threshold;

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

    _this.drawMultiLines(type, _this.data, line, threshold);
    _this.checkTransition();
  }

  if (legend && legend.show && legend.position === 'bottom') {
    _this.checkLegend(type, _this.data);
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
MultiLineChart.prototype.drawMultiLines = function(type, data, line, threshold) {
  var _this = this;

  data.forEach(function(d, i) {
    var currentLineConfig      = _this.getLineConfig(line, i);
    var currentThresholdConfig = _this.getThresholdConfig(threshold, i);
    var lineId                 = 'line-' + String(i+1);
    _this.drawLine(type, d.value, currentLineConfig, currentThresholdConfig, lineId);
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
                                  : threshold.value;

  thresholdConfig.icon.url = (threshold && threshold.icon && threshold.icon.url)
                                    ? (threshold.icon.url instanceof Array)
                                            ? threshold.icon.url[i]
                                            : threshold.icon.url
                                    : threshold.icon.url;
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
  if (_this.options.legend && _this.options.legend.show && type === 'multiline') {
    _this.addLegend(type, data)
  }
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
