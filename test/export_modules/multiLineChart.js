var fs = require('fs');
var d3 = require('d3');

filedata = fs.readFileSync('./build/js/multiLine.js', 'utf8');
eval(filedata);

exports.multiLineChart = MultiLineChart.prototype;
