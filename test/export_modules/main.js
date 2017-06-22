var fs = require('fs');
var d3 = require('d3');

filedata = fs.readFileSync('./build/js/main.js', 'utf8');
eval(filedata);

exports.main = Chart.prototype;
