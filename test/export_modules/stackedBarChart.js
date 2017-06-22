var fs = require('fs');
var d3 = require('d3');

filedata = fs.readFileSync('./build/js/stackedBar.js', 'utf8');
eval(filedata);

exports.stackedBarChart = StackedBarChart.prototype;
