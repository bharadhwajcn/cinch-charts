var assert     = require('assert');
var main       = require('./export_modules/main').main;
var bar        = require('./export_modules/barChart').barChart;
var line       = require('./export_modules/lineChart').lineChart;
var multiLine  = require('./export_modules/multiLineChart').multiLineChart;
var stackedBar = require('./export_modules/stackedBarChart').stackedBarChart;

describe('Bar Chart', function() {
  describe('#xExtentCalculate()', function() {
    it('return the x-value from data', function() {
      assert.deepEqual(['Jan', 'Feb'], bar.xExtentCalculate([['Jan', 10], ['Feb', 30]]));
    });
  });
  describe('#yExtentCalculate()', function() {
    it('return the minimum(min = 0, if min > 0) and maximum y-value from data', function() {
      assert.deepEqual([0, 30], bar.yExtentCalculate([['Jan', 10], ['Feb', 30]]));
    });
  });
});


describe('Line Chart', function() {
  describe('#xExtentCalculate()', function() {
    it('return the x-value from data', function() {
      assert.deepEqual(['Jan', 'Feb'], line.xExtentCalculate([['Jan', 10], ['Feb', 30]]));
    });
  });
  describe('#yExtentCalculate()', function() {
    it('return the minimum(min = 0, if min > 0) and maximum y-value from data', function() {
        assert.deepEqual([0, 30], line.yExtentCalculate([['Jan', 10], ['Feb', 30]]));
    });
  });
});


describe('Multi Line Chart', function() {
  var data = [ { key : 'Series 1',
    value : [ ['Jan', 177], ['Feb', 104], ['Mar', 124] ]
  },
  { key : 'Series 2',
    value : [ ['Jan', 82], ['Feb', 97], ['Mar', 78] ]
  }];
  describe('#xExtentCalculate()', function() {
    it('return the x-value from data', function() {
      assert.deepEqual(['Jan', 'Feb', 'Mar'], multiLine.xExtentCalculate(data));
    });
  });
  describe('#yExtentCalculate()', function() {
    it('return the minimum(min = 0, if min > 0) and maximum y-value from data', function() {
        assert.deepEqual([0, 177], multiLine.yExtentCalculate(data));
    });
  });
});
