# FUBAR CHARTS #

[![Build Status](https://travis-ci.org/bharadhwajcn/fubar-charts.svg?branch=master)](https://travis-ci.org/bharadhwajcn/fubar-charts)

A simple, light-weight charting library built on top of `d3.js`. The only  
dependency for this library is d3.js. Make sure you are using d3.js version 4+,  
if you are adding dependency explicitly.

---------
## INSTALLATION ##

### Github ###

From `Github`, you can clone this repository, and the can find the required    
files under the folder `build`.

For cloning the repository, via `HTTPS` use,

```
git clone https://github.com/bharadhwajcn/fubar-charts.git
```

or using `SSH` use,

```
git clone git@github.com:bharadhwajcn/fubar-charts.git
```

or you can download the zip file for the repository by [clicking here](https://github.com/bharadhwajcn/fubar-charts/archive/master.zip).


### Bower ###

You can easily install the package from [Bower](https://bower.io). Make sure that, you already have  
`bower` installed.

```
bower install fubar-charts
```

-----------

## EXAMPLE ##

Let's see how to draw a simple bar chart using this library.

**HTML**

```html
<div class="chart-container" id="first-container"> </div>
```

**JavaScript**

```javascript
var element = document.querySelector('.chart-container');

var data = [ ['2014', 50], ['2015', 70], ['2016', 30], ['2017', 40] ];

var chart = new BarChart(element, data);
```

**Output**

<a href="https://jsfiddle.net/bharadhwaj_cn/kd7zk2bL/">
<img src="https://bharadhwajcn.github.io/fubar-charts/example-images/Example_bar_chart.png" alt="Basic Bar Chart Example" width="500"/>
</a>

**Live Example**

[Here](https://jsfiddle.net/bharadhwaj_cn/kd7zk2bL/) is the JSFiddle link for the same.

----------------

## DOCUMENTATION ##

1. [Bar Chart](./docs/bar-chart.md#bar-chart)
2. [Stacked Bar Chart](./docs/stacked-bar-chart.md#stacked-bar-chart)
3. [Line Chart](./docs/line-chart.md#line-chart)
4. [Multi Line Chart](./docs/multi-line-chart.md#line-chart)
5. [Area Chart](./docs/area-chart.md#area-chart)
6. [Pie Chart](./docs/pie-chart.md#pie-chart)

-------------
