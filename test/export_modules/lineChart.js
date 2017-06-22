var fs = require('fs');
var d3 = require('d3');

filedata = fs.readFileSync('./build/js/line.js', 'utf8');
eval(filedata);

exports.lineChart = LineChart.prototype;
