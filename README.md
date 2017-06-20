# FUBAR CHARTS #

A simple, light-weight charting library built on top of `d3.js`.

---------
## INSTALLATION ##

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

var data = [ ['2014', 50], ['2015', 70], ['2016', 30], ['Apr', 40] ];

var chart = new BarChart(element, data);
```

**Output**

<a href="https://jsfiddle.net/bharadhwaj_cn/kd7zk2bL/">
<img src="https://bharadhwajcn.github.io/fubar-charts/example-images/Basic_bar_chart.png" alt="Basic Bar Chart Example" width="500"/>
</a>

**Live Example**

[Here](https://jsfiddle.net/bharadhwaj_cn/kd7zk2bL/) is the JSFiddle link for the same.

----------------

## DOCUMENTATION ##

1. [Bar Chart](./docs/bar-chart.md#bar-chart)
2. [Stacked Bar Chart](./docs/stacked-bar-chart.md#stacked-bar-chart)
3. [Line Chart](./docs/line-chart.md#line-chart)
4. [Multi Line Chart](./docs/multi-line-chart.md#line-chart)

-------------
