var fs = require('fs');
var d3 = require('d3');

filedata = fs.readFileSync('./build/js/bar.js', 'utf8');
eval(filedata);

exports.barChart = BarChart.prototype;
