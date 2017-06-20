# FUBAR CHARTS #

A simple, light-weight charting library built on top of `d3.js`.

---------

# DOCUMENTATION #

## Index ##

1. [Bar Chart](#bar-chart)
    + [Constructor Code](#bar-chart-constructor-code)
    + [DOM Element](#bar-chart-dom-element)
    + [Data Format](#bar-chart-data-format)
    + [Options](#bar-chart-options)
        - [Bar](#bar-chart-options-bar)
        - [Grids](#bar-chart-options-grids)
        - [Transition](#bar-chart-options-transition)
        - [Margin](#bar-chart-options-margin)
        - [Goal Line](#bar-chart-options-goal-line)
        - [Tooltip](#bar-chart-options-tool-tip)
        - [Axis](#bar-chart-options-axis)
    + [Examples](#bar-chart-examples)
        - [Basic Bar chart](#bar-chart-examples-basic)
        - [Full Option Bar chart](#bar-chart-examples-full-option)
2. [Stacked Bar Chart](#stacked-bar-chart)
    + [Constructor Code](#stacked-bar-chart-constructor-code)
    + [DOM Element](#stacked-bar-chart-dom-element)
    + [Data Format](#stacked-bar-chart-data-format)
    + [Stack Format](#stacked-bar-chart-stack)
    + [Options](#stacked-bar-chart-options)
        - [Bar](#stacked-bar-chart-options-bar)
        - [Grids](#stacked-bar-chart-options-grids)
        - [Transition](#stacked-bar-chart-options-transition)
        - [Margin](#stacked-bar-chart-options-margin)
        - [Goal Line](#stacked-bar-chart-options-goal-line)
        - [Tooltip](#stacked-bar-chart-options-tool-tip)
        - [Axis](#stacked-bar-chart-options-axis)
    + [Examples](#stacked-bar-chart-examples)
        - [Basic Stacked Bar chart](#stacked-bar-chart-examples-basic)
        - [Full Option Stacked Bar chart](#stacked-bar-chart-examples-full-option)
3. [Line Chart](#line-chart)
    + [Constructor Code](#line-chart-constructor-code)
    + [DOM Element](#line-chart-dom-element)
    + [Data Format](#line-chart-data-format)
    + [Options](#line-chart-options)
        - [Line](#line-chart-options-line)
        - [Threshold](#line-chart-options-threshold)
        - [Connect Null](#line-chart-options-connect-null)
        - [Grids](#line-chart-options-grids)
        - [Transition](#line-chart-options-transition)
        - [Margin](#line-chart-options-margin)
        - [Goal Line](#line-chart-options-goal-line)
        - [Tooltip](#line-chart-options-tool-tip)
        - [Axis](#line-chart-options-axis)
    + [Examples](#line-chart-examples)
        - [Basic Line chart](#line-chart-examples-basic)
        - [Full Option Line chart](#line-chart-examples-full-option)
4.    [Multi Line Chart](#multi-line-chart)
5.    [Area Chart](#area-chart)
6.    [Area Bar Chart](#area-bar-chart)

------------

# <a name="bar-chart"></a>Bar Chart #

## <a name="bar-chart-constructor-code"></a>Constructor Code ##

The below is the code for invoking a `Barchart`.

```javascript
var barChart = new BarChart(container_element, data, options)
```

- **`container_element`** is the DOM element into which the Chart is to be appended.  
- **`data`** is the data required to draw the chart.  
- **`options`** are the optional features that can be used to alter the chart.  

------------

## <a name="bar-chart-dom-element"></a>DOM Element ##

`container_element` is the element in which the graph is to be drawn. The
`container_element` can be one of the following things,

- Class Name of the element in the format `.class-name`.
    Eg:
    ```html
    <div class="chart-container" id="first-container"> </div>
    ```
    ```javascript
    var element = '.chart-container';
    ```
- ID of the element in the format `#element-id`.
    Eg:
    ```html
    <div class="chart-container" id="first-container"> </div>
    ```
    ```javascript
    var element = '#first-container';
    ```
- The whole DOM element itself.
    Eg:
    ```html
    <div class="chart-container" id="first-container"> </div>
    ```
    ```javascript
    var element = document.querySelector('.chart-container'); // or
    var element = document.querySelector('#first-container'); // or
    var element = document.getElementByClass('chart-container'); // or
    var element = document.getElementById('first-container');
    ```

------------

## <a name="bar-chart-data-format"></a>Data Format ##

The data format used for `BarChart` is simply an array of arrays. Each inner arrays  
contains the X and Y value of each co-ordinate.

**Data Format:**
```
[ [x1, y1], [x2, y2], ... , [xn, yn] ]
```

**Example:**

```javascript
    var data = [
                  ['Jan', 10],
                  ['Feb', 70],
                  ['Mar', 30],
                  ['Apr', 10],
                  ['May', 60],
                  ['Jun', 45],
                  ['Jul', 76],
                  ['Aug', 40],
                  ['Sep', 40],
                  ['Oct', 60],
                  ['Nov', 40],
                  ['Dec', 80]
              ];
```

------------

## <a name="bar-chart-options"></a>Options ##

All the optional functionalities that is needed to be added to the graph are added
in `options` part. This can be used for adding more functionalities or to customize  
the current graph. `options` is a javascript object. The following can be added in  
`options` part.

### <a name="bar-chart-options-bar"></a>1. Bar ###

Defines the attributes related to the Bar of a bar chart.

**Attributes**

* **color**  - The color of the bar in the chart.
    + Expected Value: A valid HEX or RGB code or even name of the color.
* **width**  - Defines the width of the bar in Bar Chart.
    + Expected Value: A positive real number.
* **curve** - To specify whether the top edge of bar is curved or not.
    + Expected Value: Boolean. `true` or `false`.
* **opacity** - To mention the opacity of the bars.
    + Expected Value: A real number between 0 and 1 (both inclusive).
* **padding** - To define the width between two adjacent bars.
    + Expected Value: A real number between 0 and 1 (both inclusive).


**Example:**  

```javascript
var options = {
    bar : {
        color : '#B8D551',
        width : 20,
        curve : true,
        opacity : 0.8,
        padding : .01
    },
};
```

### <a name="bar-chart-options-grids"></a>2. Grids ###

Defines the properties of the grids lines that are to be added on the graph.

**Attributes**

* **vertical**   - To define the properties of vertical grid lines.
    + **show** - To specify whether the vertical grid lines need to be displayed or not.
        - Expected Value: Boolean. `true` or `false`.
    + **color** - The color of the vertical grid line of the chart.
        - Expected Value: A valid HEX or RGB code or even name of the color.
    + **opacity** - To mention the opacity of the vertical grid lines.
        - Expected Value: A real number between 0 and 1 (both inclusive).
    + **values** - The values in x-axis to which the vertical line needs to be drawn.
        - Expected Value: An array of values, which are in the x-axis value of the graph.
* **horizontal** - To define the properties of horizontal grid lines.
    + **show** - To specify whether the horizontal grid lines need to be displayed or not.
        - Expected Value: Boolean. `true` or `false`.
    + **color** - The color of the horizontal grid line of the chart.
        - Expected Value: A valid HEX or RGB code or even name of the color.
    + **opacity** - To mention the opacity of the horizontal grid lines.
        - Expected Value: A real number between 0 and 1 (both inclusive).
    + **values** - The values in y-axis to which the horizontal line needs to be drawn.
        - Expected Value: An array of values, which are defined in the y-axis of the graph.
    + **skipFirst** - To specify whether to skip the first grid line.
        - Expected Value: Boolean. `true` or `false`.
    + **skipLast** - To specify whether to skip the last grid line.
        - Expected Value: Boolean. `true` or `false`.

**Example:**  

```javascript
var options = {
    grids : {
        vertical : {
            show : true,
            color : '#999',
            opacity : .5,
            values : [ 'Jan', 'Mar', 'May', 'Aug', 'Oct', 'Dec']
        },
        horizontal : {
          show : true,
          color : '#999',
          opacity : .5,
          values : [0, 10, 30, 50, 70, 90],
          skipFirst : false,
          skipLast : false
        }
    }
};
```

### <a name="bar-chart-options-transition"></a>3. Transition ###

Defines the transition or animation of the bars involved in the graph.

**Attributes**

* **animate** - To specify whether animation is needed or not.
    + Expected Value: Boolean. `true` or `false`.
* **duration** - To specify the duration of animation at each bar.
    + Expected Value: A positive integer which is duration in milliseconds.
* **delay** - To specify the delay between the animation at adjacent bars.
    + Expected Value: A positive integer which is delay in milliseconds.

**Example:**  

```javascript
var options = {
    transition: {
        animate: true,
        duration : 200,
        delay : 100
    }
};
```

### <a name="bar-chart-options-margin"></a>4. Margin ###

Defines the margin that should be added to the canvas by the user.

**Attributes**

* **left** - The amount of margin on left side.
    + Expected Value: A non negative integer.
* **right** - The amount of margin on right side.
    + Expected Value: A non negative integer.
* **top** - The amount of margin at the top.
    + Expected Value: A non negative integer.
* **bottom** - The amount of margin at the bottom.
    + Expected Value: A non negative integer.

**Example:**  

```javascript
var options = {
    margin : {
        left : 20,
        right : 20,
        top : 0,
        bottom : 0
    }
};
```

### <a name="bar-chart-options-goal-line"></a>5. Goal Line ###

Defines about an additional horizontal line, user can draw on the graph as a  
reference base line.

**Attributes**

* **value** - The value on Y Axis at which the line is to be drawn.
    + Expected Value: A defined value on Y-axis.
* **class** - User defined CSS class for goal line.
    + Expected Value: A user defined CSS class name.
* **icon** - An image that can be on the top of the line.
    - **url** - URL to the image that needs to be added.
        + Expected Value: The URL to the image, either relative path or whole URL.
    - **toBase64** - To specify whether the image needs to be converted to Base64.
        + Expected Value: Boolean. `true` or `false`.
    - **class** - User defined CSS class name for image.
        + Expected Value: A user defined CSS class name.
    - height - Height of the image that is added.
        + Expected Value: A positive integer value.
    - width - Width of the image that is added.
        + Expected Value: A positive integer value.
    - left - Amount by which the added image must be shifted to left.
        + Expected Value: A non negative integer value.

**Example:**  

```javascript
var options = {
    goalLine : {
        value : 50,
        class : 'goal-line-class',
        icon: {
            url: 'https://bharadhwajcn.github.io/fubar-charts/images/goal_arrow.png',
            toBase64: true,
            class: 'goal-icon-class',
            height : 15,
            width : 13,
            left: 0
        }
    }
};
```

### <a name="bar-chart-options-tool-tip"></a>6. Tooltip ###

Defines about the tooltip that shows co-ordinates details. The co-ordinates  
values are available in the scope and can be accessed by using `this.xValue`  
and `this.yValue` for X and Y axis values.

**Attributes**

* **show** - To specify whether the tooltip needs to be displayed or not.
    + Expected Value: Boolean. `true` or `false`.
* **class** - User defined CSS class name for the tooltip.
    + Expected Value: A user defined CSS class name.
* **listener** - Listeners to which the tooltip should appear/disappear.
    + Expected Value: Valid listeners. If more than one, separated by space.
* **body** - Predefined template for body of tooltip.
    - **title** - Title to be shown on tooltip body.
        + Expected Value: A string value for title.
    - **xLabel** - Label for X Axis values.
        + Expected Value: A string value for x axis value label.
    - **yLabel** - Label for Y Axis values.
        + Expected Value: A string value for y axis value label.
* **formatter** - User defined function that can be used to create the customized  
               tooltip. Within the function, user can get the current x-axis and y-axis  
               value as shown below
    - `this.xValue` - Contains the x axis value for the point.
    - `this.yValue` - Contains the y axis value for the point.

**Example:**  

```javascript
var options = {
    tooltip: {
        show : true,
        listener : 'click touchstart',
        class : 'custom-tooltip',
        body : {
            title : 'SALES 2017',
            xLabel : 'Month',
            yLabel : 'Units sold'
        },
        formatter : function() {
            return this.yValue + ' units <br>in ' + this.xValue;
        }
    }
};
```


### <a name="bar-chart-options-axis"></a>7. Axis ###

Defines about the various attributes of X and Y axis.

**Attributes**

* **xAxis** - Details and specifications about the x-axis.
    - **orientation** - To specify the position of the x-axis.
        + Expected Value: `top` or `bottom`.
    - **showAxisLine** - To specify whether to show the x-axis line or not.
        + Expected Value: Boolean. `true` or `false`.
    - **firstLabel** - To specify whether the first label in the x-axis should be shown or not.
        + Expected Value: Boolean. `true` or `false`.
    - **ticks** - To details about the ticks that should appear in x-axis.
        + **values** - Values for which ticks need to be shown.
                - Expected Value: This can be done in 2 ways as the user wants.  
                    i)  Array of valid values in x-axis for which the ticks needs to be shown.
                      `[value1, value2, ..., valuen]`  
                    ii) Array of objects which contains valid x-axis values and its required labels.  
                      `[{ value : value1, label : label1 }, { value : value2, label : label2 }, ..., { value : value3, label : label3 } ]`  
        + **fontSize** - Font size of the tick values of the x-axis.
            - Expected Value: A positive number or a positive number along with its unit.  
        + **padding** - Amount of padding that needed to be given from x-axis.
            - Expected Value: A positive number or a positive number along with its unit.
        + **position** - To specify the changes in x and y co-ordinates and rotation.
            * **angle** - The angle by which the label needs to be rotated.
                - Expected Value: A real number.
            * **x** - Amount needed to be shifted along the x-axis.
                - Expected Value: A real number.
            * **y** - Amount needed to be shifted along the y-axis.
                - Expected Value: A real number.
            * **formatter** - User defined function that can be used to create the customized axis  
                labels. The value of the current tick is available as parameter of the function.
 * **yAxis** - Details and specifications about the y-axis.
    - **orientation** - To specify the position of the y-axis.
        + Expected Value: `left` or `right`.
    - **showAxisLine** - To specify whether to show the y-axis line or not.
        + Expected Value: Boolean. `true` or `false`.
    - **firstLabel** - To specify whether the first label in the y-axis should be shown or not.
        + Expected Value: Boolean. `true` or `false`.
    - **ticks** - To details about the ticks that should appear in y-axis.
        + **values** - Values for which ticks need to be shown.
                - Expected Value: This can be done in 2 ways as the user wants.  
                    i)  Array of valid values in x-axis for which the ticks needs to be shown.
                      `[value1, value2, ..., valuen]`  
                    ii) Array of objects which contains valid y-axis values and its required labels.  
                      `[{ value : value1, label : label1 }, { value : value2, label : label2 }, ..., { value : value3, label : label3 } ]`  
        + **fontSize** - Font size of the tick values of the y-axis.
            - Expected Value: A positive number or a positive number along with its unit.  
        + **padding** - Amount of padding that needed to be given from y-axis.
            - Expected Value: A positive number or a positive number along with its unit.
        + **position** - To specify the changes in x and y co-ordinates and rotation.
            * **angle** - The angle by which the label needs to be rotated.
                - Expected Value: A real number.
            * **x** - Amount needed to be shifted along the x-axis.
                - Expected Value: A real number.
            * **y** - Amount needed to be shifted along the y-axis.
                - Expected Value: A real number.
            * **formatter** - User defined function that can be used to create the customized axis  
                labels. The value of the current tick is available as parameter of the function.

**Example:**  

```javascript
var options = {
    axis : {
        xAxis : {
            showAxisLine : true,
            firstLabel : true,
            orientation: 'bottom',
            ticks : {
                values : [ { value : 'Jan',  label : 'January' },
                           { value : 'Mar',  label : 'March' },
                           { value : 'May',  label : 'May' },
                           { value : 'Aug',  label : 'August' },
                           { value : 'Oct',  label : 'October' },
                           { value : 'Dec',  label : 'December' } ],
                fontSize : '12px',
                padding : 10,
            }
        },
        yAxis : {
            showAxisLine : true,
            firstLabel : true,
            orientation: 'left',
            ticks : {
                values: [ 10, 30, 50, 70, 90],
                fontSize : '12px',
                formatter : function(value) {
                    return String(value) + 'k units';
                },
                position :  {
                    angle : 30,
                    x : -5,
                    y : -10
                },
            }
        }
    }
};
```
------------

## <a name="bar-chart-examples"></a>Examples ##

Here are the examples of the chart drawn, without using any options and with using the  
options that are available.

```html
<div class="chart-container" id="first-container"> </div>
```

```javascript
var element = document.querySelector('.chart-container');

var data = [
              ['Jan', 10],
              ['Feb', 70],
              ['Mar', 30],
              ['Apr', 10],
              ['May', 60],
              ['Jun', 45],
              ['Jul', 76],
              ['Aug', 40],
              ['Sep', 40],
              ['Oct', 60],
              ['Nov', 40],
              ['Dec', 80]
          ];
```

### <a name="bar-chart-examples-basic"></a> Basic Chart Example ###

**Code Snippet:**

```javascript
var chart = new BarChart(element, data);
```

**Output:**

<img src="https://bharadhwajcn.github.io/fubar-charts/example-images/Basic_bar_chart.png" alt="Basic Bar Chart Example" width="500"/>

**Live example:**

Editable working example <a href="https://jsfiddle.net/bharadhwaj_cn/c1tz9jL4/" target="_blank">here</a>


### <a name="bar-chart-examples-full-option"></a> Full option Chart Example ###

**Code Snippet:**

```javascript
var chart = new BarChart(element, data, {
  bar : {
      color : '#B8D551',
      width : 20,
      curve : true,
      opacity : 0.8,
      padding : .01,
  },
  margin : {
      left : 0,
      right : 0,
      top : 0,
      bottom : 0
  },
  transition: {
      animate: true,
      delay : 100,
      duration : 200
  },
  grids : {
      vertical : {
          show : true,
          color : '#999',
          opacity : .5,
          values : [ 'Jan', 'Mar', 'May', 'Aug', 'Oct', 'Dec']
      },
      horizontal : {
          show : true,
          color : '#999',
          opacity : .5,
          skipFirst : false,
          skipLast : false,
          values : [10, 30, 50, 70, 90]
      }
  },
  goalLine : {
      value : 60,
      class : 'goalline',
      icon: {
        url: 'https://bharadhwajcn.github.io/fubar-charts/images/goal_arrow.png',
        toBase64 : true,
        class: 'goal-icon',
        height : 20,
        width : 20,
        left: 0
      }
  },
  axis : {
      xAxis : {
          showAxisLine : false,
          firstLabel : true,
          orientation: 'bottom',
          ticks : {
            values : [ { value : 'Jan',  label : '01' },
                       { value : 'Mar',  label : '03' },
                       { value : 'May',  label : '05' },
                       { value : 'Aug',  label : '08' },
                       { value : 'Oct',  label : '10' },
                       { value : 'Dec',  label : '12' } ],
              padding : 10,
              position :  {
                  angle : 30,
                  x : -10,
                  y : -5
              },
          }
      },
      yAxis : {
          showAxisLine : false,
          firstLabel : false,
          orientation: 'left',
          ticks : {
              values: [10, 30, 50, 70, 90],
              position :  {
                  angle : 30,
                  x : -5,
                  y : -5
              },
              fontSize : '12px',
              formatter : function(value) {
                  return String(value) + 'k units';
              },
          }
      }
  },
  tooltip: {
      show : true,
      listener : 'click touchstart',
      class : 'custom-tooltip',
      formatter : function() {
          return this.yValue + ' units <br>in ' + this.xValue;
      }
  }
});
```

**Output:**

<img src="https://bharadhwajcn.github.io/fubar-charts/example-images/Full_option_bar_chart.png" alt="Full option Bar Chart Example" width="500"/>

**Live example:**

Editable working example <a href="https://jsfiddle.net/bharadhwaj_cn/00ruhhur/" target="_blank">here</a>

-------------------------

# <a name="stacked-bar-chart"></a>Stacked Bar Chart #

## <a name="stacked-bar-chart-constructor-code"></a>Constructor Code ##

The below is the code for invoking a `Stacked Bar chart`.

```javascript
var stackedBarChart = new StackedBarChart(container_element, data, stack, options)
```

- **`container_element`** is the DOM element into which the Chart is to be appended.  
- **`data`** is the data required to draw the chart.  
- **`stack`** is the list of keys in `data` that need be made as stack to draw the chart.  
- **`options`** are the optional features that can be used to alter the chart.  

------------

## <a name="stacked-bar-chart-dom-element"></a>DOM Element ##

`container_element` is the element in which the graph is to be drawn. The
`container_element` can be one of the following things,

- Class Name of the element in the format `.class-name`.
    Eg:
    ```html
    <div class="chart-container" id="first-container"> </div>
    ```
    ```javascript
    var element = '.chart-container';
    ```
- ID of the element in the format `#element-id`.
    Eg:
    ```html
    <div class="chart-container" id="first-container"> </div>
    ```
    ```javascript
    var element = '#first-container';
    ```
- The whole DOM element itself.
    Eg:
    ```html
    <div class="chart-container" id="first-container"> </div>
    ```
    ```javascript
    var element = document.querySelector('.chart-container'); // or
    var element = document.querySelector('#first-container'); // or
    var element = document.getElementByClass('chart-container'); // or
    var element = document.getElementById('first-container');
    ```

------------

## <a name="stacked-bar-chart-data-format"></a>Data Format ##

The data format used for `StackedBarChart` is simply an array of objects. Each inner
objects contains value of each attribute as a property.

**Data Format:**
```
[
  { attribute1 : value11, attribute2 : value12, ..., attributen : value1n },  
  { attribute1 : value21, attribute2 : value22, ..., attributen : value2n },  
  ... ,
  { attribute1 : valuem1, attribute2 : valuem2, ..., attributen : valuemn },  
]
```

**Example:**

```javascript
var data = [
    { year : '2010', firstquarter : 20,  secondquarter : 25, thirdquarter : 18, fourthquarter : 22 },
    { year : '2011', firstquarter : 24,  secondquarter : 22, thirdquarter : 22, fourthquarter : 21 },
    { year : '2012', firstquarter : 21,  secondquarter : 26, thirdquarter : 19, fourthquarter : 23 },
    { year : '2013', firstquarter : 19,  secondquarter : 21, thirdquarter : 21, fourthquarter : 19 },
    { year : '2014', firstquarter : 22,  secondquarter : 19, thirdquarter : 17, fourthquarter : 21 },
    { year : '2015', firstquarter : 23,  secondquarter : 25, thirdquarter : 22, fourthquarter : 24 },
    { year : '2016', firstquarter : 21,  secondquarter : 22, thirdquarter : 25, fourthquarter : 23 }
  ];
```

------------

## <a name="stacked-bar-chart-stack"></a>Stack Format ##

The `stack` used here is used to say, which all keys in `data` needs to be made as  
as stack for `StackedBarChart`. Its format is simply an array of valid keys from  
the `data`.

**Stack Format:**
```
[ attribute2, attribute3, ..., attributen]
```

**Example:**

```javascript
var stack = [ firstquarter, secondquarter, thirdquarter, fourthquarter ];
```

------------

## <a name="stacked-bar-chart-options"></a>Options ##

All the optional functionalities that is needed to be added to the graph are added
in `options` part. This can be used for adding more functionalities or to customize  
the current graph. `options` is a javascript object. The following can be added in  
`options` part.

### <a name="stacked-bar-chart-options-bar"></a>1. Bar ###

Defines the attributes related to the Bar of a bar chart.

**Attributes**

* **color**  - The color of the each stack in bar in the chart.
    + Expected Value: An array of valid HEX or RGB code or even name of the color.
* **width**  - Defines the width of the bar in Bar Chart.
    + Expected Value: A positive real number.
* **curve** - To specify the type of the curve needed for the bars.
    - **show** - To specify whether the top edge of bar is curved or not.
        + Expected Value: Boolean. `true` or `false`.
    - **bars** - To specify whether every bar needs curved top or the top most one.
        + Expected Value: String either `top` for making only top as curved or `all` for making all bars in stacked curved.
* **opacity** - To mention the opacity of the bars.
    + Expected Value: A real number between 0 and 1 (both inclusive).
* **padding** - To define the width between two adjacent bars.
    + Expected Value: A real number between 0 and 1 (both inclusive).


**Example:**  

```javascript
var options = {
    bar : {
        color :  ['#90ED7D', '#757575', '#00526C', '#6ED1F7', '#238FFF'],
        width : 20,
        curve : {
            show : true,
            bars : 'all'
        },
        opacity : 0.8,
        padding : .01
    },
};
```

### <a name="stacked-bar-chart-options-grids"></a>2. Grids ###

Defines the properties of the grids lines that are to be added on the graph.

**Attributes**

* **vertical**   - To define the properties of vertical grid lines.
    + **show** - To specify whether the vertical grid lines need to be displayed or not.
        - Expected Value: Boolean. `true` or `false`.
    + **color** - The color of the vertical grid line of the chart.
        - Expected Value: A valid HEX or RGB code or even name of the color.
    + **opacity** - To mention the opacity of the vertical grid lines.
        - Expected Value: A real number between 0 and 1 (both inclusive).
    + **values** - The values in x-axis to which the vertical line needs to be drawn.
        - Expected Value: An array of values, which are in the x-axis value of the graph.
* **horizontal** - To define the properties of horizontal grid lines.
    + **show** - To specify whether the horizontal grid lines need to be displayed or not.
        - Expected Value: Boolean. `true` or `false`.
    + **color** - The color of the horizontal grid line of the chart.
        - Expected Value: A valid HEX or RGB code or even name of the color.
    + **opacity** - To mention the opacity of the horizontal grid lines.
        - Expected Value: A real number between 0 and 1 (both inclusive).
    + **values** - The values in y-axis to which the horizontal line needs to be drawn.
        - Expected Value: An array of values, which are defined in the y-axis of the graph.
    + **skipFirst** - To specify whether to skip the first grid line.
        - Expected Value: Boolean. `true` or `false`.
    + **skipLast** - To specify whether to skip the last grid line.
        - Expected Value: Boolean. `true` or `false`.

**Example:**  

```javascript
var options = {
    grids : {
        vertical : {
            show : true,
            color : '#999',
            opacity : .5,
            values : [ '2010', '2012', '2014', '2016']
        },
        horizontal : {
          show : true,
          color : '#999',
          opacity : .5,
          values : [0, 10, 30, 50, 70, 90],
          skipFirst : false,
          skipLast : false
        }
    }
};
```

### <a name="stacked-bar-chart-options-transition"></a>3. Transition ###

Defines the transition or animation of the bars involved in the graph.

**Attributes**

* **animate** - To specify whether animation is needed or not.
    + Expected Value: Boolean. `true` or `false`.
* **duration** - To specify the duration of animation at each bar.
    + Expected Value: A positive integer which is duration in milliseconds.
* **delay** - To specify the delay between the animation at adjacent bars.
    + Expected Value: A positive integer which is delay in milliseconds.

**Example:**  

```javascript
var options = {
    transition: {
        animate: true,
        duration : 200,
        delay : 100
    }
};
```

### <a name="stacked-bar-chart-options-margin"></a>4. Margin ###

Defines the margin that should be added to the canvas by the user.

**Attributes**

* **left** - The amount of margin on left side.
    + Expected Value: A non negative integer.
* **right** - The amount of margin on right side.
    + Expected Value: A non negative integer.
* **top** - The amount of margin at the top.
    + Expected Value: A non negative integer.
* **bottom** - The amount of margin at the bottom.
    + Expected Value: A non negative integer.

**Example:**  

```javascript
var options = {
    margin : {
        left : 20,
        right : 20,
        top : 0,
        bottom : 0
    }
};
```

### <a name="stacked-bar-chart-options-goal-line"></a>5. Goal Line ###

Defines about an additional horizontal line, user can draw on the graph as a  
reference base line.

**Attributes**

* **value** - The value on Y Axis at which the line is to be drawn.
    + Expected Value: A defined value on Y-axis.
* **class** - User defined CSS class for goal line.
    + Expected Value: A user defined CSS class name.
* **icon** - An image that can be on the top of the line.
    - **url** - URL to the image that needs to be added.
        + Expected Value: The URL to the image, either relative path or whole URL.
    - **toBase64** - To specify whether the image needs to be converted to Base64.
        + Expected Value: Boolean. `true` or `false`.
    - **class** - User defined CSS class name for image.
        + Expected Value: A user defined CSS class name.
    - height - Height of the image that is added.
        + Expected Value: A positive integer value.
    - width - Width of the image that is added.
        + Expected Value: A positive integer value.
    - left - Amount by which the added image must be shifted to left.
        + Expected Value: A non negative integer value.

**Example:**  

```javascript
var options = {
    goalLine : {
        value : 50,
        class : 'goal-line-class',
        icon: {
            url: 'https://bharadhwajcn.github.io/fubar-charts/images/goal_arrow.png',
            toBase64: true,
            class: 'goal-icon-class',
            height : 15,
            width : 13,
            left: 0
        }
    }
};
```

### <a name="stacked-bar-chart-options-tool-tip"></a>6. Tooltip ###

Defines about the tooltip that shows co-ordinates details. The co-ordinates  
values are available in the scope and can be accessed by using `this.xValue`  
and `this.yValue` for X and Y axis values.

**Attributes**

* **show** - To specify whether the tooltip needs to be displayed or not.
    + Expected Value: Boolean. `true` or `false`.
* **class** - User defined CSS class name for the tooltip.
    + Expected Value: A user defined CSS class name.
* **listener** - Listeners to which the tooltip should appear/disappear.
    + Expected Value: Valid listeners. If more than one, separated by space.
* **body** - Predefined template for body of tooltip.
    - **title** - Title to be shown on tooltip body.
        + Expected Value: A string value for title.
    - **xLabel** - Label for X Axis values.
        + Expected Value: A string value for x axis value label.
    - **yLabel** - Label for Y Axis values.
        + Expected Value: A string value for y axis value label.
* **formatter** - User defined function that can be used to create the customized  
               tooltip. Within the function, user can get the current x-axis and y-axis  
               value as shown below
    - `this.xValue` - Contains the x axis value for the point.
    - `this.stackData` - Contains the corresponding stack element values.

**Example:**  

```javascript
var options = {
    tooltip: {
        show : true,
        listener : 'click touchstart',
        class : 'custom-tooltip',
        body : {
            title : 'SALES',
            xLabel : 'Year',
            yLabel : 'Units sold'
        },
        formatter : function() {
          return '<p> <b> Total </b> ' + this.yValue +
                 '<br> First : ' + this.stackData.firstquarter + ' Second: ' + this.stackData.secondquarter +
                 '<br> Third : ' + this.stackData.thirdquarter + ' Fourth: ' + this.stackData.fourthquarter + '</p>';
        }
    }
};
```


### <a name="stacked-bar-chart-options-axis"></a>7. Axis ###

Defines about the various attributes of X and Y axis.

**Attributes**

* **xAxis** - Details and specifications about the x-axis.
    - **orientation** - To specify the position of the x-axis.
        + Expected Value: `top` or `bottom`.
    - **showAxisLine** - To specify whether to show the x-axis line or not.
        + Expected Value: Boolean. `true` or `false`.
    - **firstLabel** - To specify whether the first label in the x-axis should be shown or not.
        + Expected Value: Boolean. `true` or `false`.
    - **ticks** - To details about the ticks that should appear in x-axis.
        + **values** - Values for which ticks need to be shown.
                - Expected Value: This can be done in 2 ways as the user wants.  
                    i)  Array of valid values in x-axis for which the ticks needs to be shown.
                      `[value1, value2, ..., valuen]`  
                    ii) Array of objects which contains valid x-axis values and its required labels.  
                      `[{ value : value1, label : label1 }, { value : value2, label : label2 }, ..., { value : value3, label : label3 } ]`  
        + **fontSize** - Font size of the tick values of the x-axis.
            - Expected Value: A positive number or a positive number along with its unit.  
        + **padding** - Amount of padding that needed to be given from x-axis.
            - Expected Value: A positive number or a positive number along with its unit.
        + **position** - To specify the changes in x and y co-ordinates and rotation.
            * **angle** - The angle by which the label needs to be rotated.
                - Expected Value: A real number.
            * **x** - Amount needed to be shifted along the x-axis.
                - Expected Value: A real number.
            * **y** - Amount needed to be shifted along the y-axis.
                - Expected Value: A real number.
            * **formatter** - User defined function that can be used to create the customized axis  
                labels. The value of the current tick is available as parameter of the function.
 * **yAxis** - Details and specifications about the y-axis.
    - **orientation** - To specify the position of the y-axis.
        + Expected Value: `left` or `right`.
    - **showAxisLine** - To specify whether to show the y-axis line or not.
        + Expected Value: Boolean. `true` or `false`.
    - **firstLabel** - To specify whether the first label in the y-axis should be shown or not.
        + Expected Value: Boolean. `true` or `false`.
    - **ticks** - To details about the ticks that should appear in y-axis.
        + **values** - Values for which ticks need to be shown.
                - Expected Value: This can be done in 2 ways as the user wants.  
                    i)  Array of valid values in x-axis for which the ticks needs to be shown.
                      `[value1, value2, ..., valuen]`  
                    ii) Array of objects which contains valid y-axis values and its required labels.  
                      `[{ value : value1, label : label1 }, { value : value2, label : label2 }, ..., { value : value3, label : label3 } ]`  
        + **fontSize** - Font size of the tick values of the y-axis.
            - Expected Value: A positive number or a positive number along with its unit.  
        + **padding** - Amount of padding that needed to be given from y-axis.
            - Expected Value: A positive number or a positive number along with its unit.
        + **position** - To specify the changes in x and y co-ordinates and rotation.
            * **angle** - The angle by which the label needs to be rotated.
                - Expected Value: A real number.
            * **x** - Amount needed to be shifted along the x-axis.
                - Expected Value: A real number.
            * **y** - Amount needed to be shifted along the y-axis.
                - Expected Value: A real number.
            * **formatter** - User defined function that can be used to create the customized axis  
                labels. The value of the current tick is available as parameter of the function.

**Example:**  

```javascript
var options = {
    axis : {
        xAxis : {
            showAxisLine : true,
            firstLabel : true,
            orientation: 'bottom',
            ticks : {
                values : [ { value : '2010',  label : '10' },
                           { value : '2011',  label : '11' },
                           { value : '2012',  label : '12' },
                           { value : '2013',  label : '13' },
                           { value : '2014',  label : '14' },
                           { value : '2015',  label : '15' },
                           { value : '2016',  label : '16' } ],
                fontSize : '12px',
                padding : 10,
            }
        },
        yAxis : {
            showAxisLine : true,
            firstLabel : true,
            orientation: 'left',
            ticks : {
                values: [ 10, 30, 50, 70, 90],
                fontSize : '12px',
                formatter : function(value) {
                    return String(value) + 'k units';
                },
                position :  {
                    angle : 30,
                    x : -5,
                    y : -10
                },
            }
        }
    }
};
```
------------

## <a name="stacked-bar-chart-examples"></a>Examples ##

Here are the examples of the chart drawn, without using any options and with using the  
options that are available.

```html
<div class="chart-container" id="first-container"> </div>
```

```javascript
var element = document.querySelector('.chart-container');

var data = [ { year : '2010', firstquarter : 20,  secondquarter : 25, thirdquarter : 18, fourthquarter : 22 },
             { year : '2011', firstquarter : 24,  secondquarter : 22, thirdquarter : 22, fourthquarter : 21 },
             { year : '2012', firstquarter : 21,  secondquarter : 26, thirdquarter : 19, fourthquarter : 23 },
             { year : '2013', firstquarter : 19,  secondquarter : 21, thirdquarter : 21, fourthquarter : 19 },
             { year : '2014', firstquarter : 22,  secondquarter : 19, thirdquarter : 17, fourthquarter : 21 },
             { year : '2015', firstquarter : 23,  secondquarter : 25, thirdquarter : 22, fourthquarter : 24 },
             { year : '2016', firstquarter : 21,  secondquarter : 22, thirdquarter : 25, fourthquarter : 23 } ];

var stack = ['firstquarter' , 'secondquarter', 'thirdquarter', 'fourthquarter'];
```

### <a name="stacked-bar-chart-examples-basic"></a> Basic Chart Example ###

**Code Snippet:**

```javascript
var chart = new StackedBarChart(element, data, stack);
```

**Output:**  

<img src="https://bharadhwajcn.github.io/fubar-charts/example-images/Basic_stacked_bar_chart.png" alt="Basic Stacked Bar Chart Example" width="500"/>

**Live example:**

Editable working example <a href="https://jsfiddle.net/bharadhwaj_cn/cvnk19f8/" target="_blank">here</a>

### <a name="stacked-bar-chart-examples-full-option"></a> Full option Chart Example ###

**Code Snippet:**

```javascript
var chart = new StackedBarChart(element, data, stack, {
    bar : {
        color :  ['#90ED7D', '#757575', '#00526C', '#6ED1F7'],
        width : 20,
        curve : {
            show : true,
            bars : 'top'
        },
        opacity : 0.8,
        padding : .01,
    },
    margin : {
        left : 0,
        right : 0,
        top : 0,
        bottom : 0
    },
    transition: {
        animate: true,
        delay : 100,
        duration : 200
    },
    grids : {
        vertical : {
            show : true,
            color : '#999',
            opacity : .5,
            values : [ '2010', '2012', '2014', '2016']
        },
        horizontal : {
            show : true,
            color : '#999',
            opacity : .5,
            skipFirst : false,
            skipLast : false,
            values : [0, 10, 30, 40, 50, 80]
        }
    },
    goalLine : {
        value : 60,
        class : 'goalline',
        icon: {
            url: 'https://bharadhwajcn.github.io/fubar-charts/images/goal_arrow.png',
            toBase64 : true,
            class: 'goal-icon',
            height : 20,  
            width : 20,
            left: 0
        }
    },
    axis : {
        xAxis : {
            showAxisLine : true,
            firstLabel : true,
            orientation: 'bottom',
            ticks : {
                values : [ '2010', '2012', '2014', '2016'],
                padding : 10,
            }
        },
        yAxis : {
            showAxisLine : true,
            firstLabel : true,
            orientation: 'left',
            ticks : {
                font_size : '12px',
                formatter : function(value) {
                    return String(value) + 'k units';
                }
            }
        }
    },
    tooltip: {
        show : true,
        listener : 'click touchstart',
        class : 'custom-tooltip',
        formatter : function() {
            return '<p> <b> Total </b> ' + this.yValue +
                   '<br> First : ' + this.stackData.firstquarter + ' Second: ' + this.stackData.secondquarter +
                   '<br> Third : ' + this.stackData.thirdquarter + ' Fourth: ' + this.stackData.fourthquarter + '</p>';
        }
    }
});
```

**Output:**  

<img src="https://bharadhwajcn.github.io/fubar-charts/example-images/Full_option_stacked_bar_chart.png" alt="Full option Stacked Bar Chart Example" width="500"/>

**Live example:**

Editable working example <a href="https://jsfiddle.net/bharadhwaj_cn/qLmntobt/" target="_blank">here</a>

-------------------------

# <a name="line-chart"></a>Line Chart #

## <a name="line-chart-constructor-code"></a>Constructor Code ##

The below is the code for invoking a `Linechart`.

```javascript
var lineChart = new LineChart(container_element, data, options)
```

- **`container_element`** is the DOM element into which the Chart is to be appended.  
- **`data`** is the data required to draw the chart.  
- **`options`** are the optional features that can be used to alter the chart.  

------------

## <a name="line-chart-dom-element"></a>DOM Element ##

`container_element` is the element in which the graph is to be drawn. The
`container_element` can be one of the following things,

- Class Name of the element in the format `.class-name`.
    Eg:
    ```html
    <div class="chart-container" id="first-container"> </div>
    ```
    ```javascript
    var element = '.chart-container';
    ```
- ID of the element in the format `#element-id`.
    Eg:
    ```html
    <div class="chart-container" id="first-container"> </div>
    ```
    ```javascript
    var element = '#first-container';
    ```
- The whole DOM element itself.
    Eg:
    ```html
    <div class="chart-container" id="first-container"> </div>
    ```
    ```javascript
    var element = document.querySelector('.chart-container'); // or
    var element = document.querySelector('#first-container'); // or
    var element = document.getElementByClass('chart-container'); // or
    var element = document.getElementById('first-container');
    ```

------------

## <a name="line-chart-data-format"></a>Data Format ##

The data format used for `LineChart` is simply an array of arrays. Each inner arrays  
contains the X and Y value of each co-ordinate.

**Data Format:**
```
[ [x1, y1], [x2, y2], ... , [xn, yn] ]
```

**Example:**

```javascript
var data = [
    ['Jan', 10],
    ['Feb', 70],
    ['Mar', 30],
    ['Apr', 10],
    ['May', 60],
    ['Jun', 45],
    ['Jul', 76],
    ['Aug', 40],
    ['Sep', 40],
    ['Oct', 60],
    ['Nov', 40],
    ['Dec', 80]
];
```

------------

## <a name="line-chart-options"></a>Options ##

All the optional functionalities that is needed to be added to the graph are added
in `options` part. This can be used for adding more functionalities or to customize  
the current graph. `options` is a javascript object. The following can be added in  
`options` part.

### <a name="line-chart-options-line"></a>1. Line ###

Defines the attributes related to the Line of a line chart.

**Attributes**

* **color**  - The color of the line in the chart.
    + Expected Value: A valid HEX or RGB code or even name of the color.
* **width**  - Defines the width of the line in line Chart.
    + Expected Value: A positive real number.
* **icon** - To specify the details of the icons used as plot points.
    - **show** - To specify whether the plot points need to be shown.
        + Expected Value: Boolean. `true` or `false`.
    - **url** - The URL for the image that need to be used as plot point.
        + Expected Value: The URL to the image, either relative path or whole URL. If no URL is provided and `show` is set to `true`, the color of the line is set as plot point.
    - **toBase64** - To specify whether the image needs to be converted to Base64.
        + Expected Value: Boolean. `true` or `false`.
    - **class** - User defined CSS class name for image.
        + Expected Value: A user defined CSS class name.
    - **width**  - Defines the width of the plot point image.
        + Expected Value: A positive real number.


**Example:**  

```javascript
var options = {
    line: {
        color : '#B8D551',
        width: 4,
        icon: {
            show: true,
            url: 'https://bharadhwajcn.github.io/fubar-charts/images/green_circle.png',
            toBase64: false,
            class: 'point-icon',
            width : 10
        }
    }
};
```

## <a name="line-chart-options-threshold"></a>2. Threshold ###

Helps to set the threshold value to each line, after which we can change the plot point image.

**Attributes**

* **color**  - The color of the line in the chart.
    + Expected Value: A valid HEX or RGB code or even name of the color.
* **width**  - Defines the width of the line in line Chart.
    + Expected Value: A positive real number.
* **icon** - To specify the details of the icons used as plot points.
    - **show** - To specify whether the plot points need to be shown.
        + Expected Value: Boolean. `true` or `false`.
    - **url** - The URL for the image that need to be used as plot point.
        + Expected Value: The URL to the image, either relative path or whole URL. If no URL is provided and `show` is set to `true`, the color of the line is set as plot point.
    - **toBase64** - To specify whether the image needs to be converted to Base64.
        + Expected Value: Boolean. `true` or `false`.
    - **class** - User defined CSS class name for image.
        + Expected Value: A user defined CSS class name.
    - **width**  - Defines the width of the plot point image.
        + Expected Value: A positive real number.


**Example:**  

```javascript
var options = {
    threshold: {
        icon: {
            url: 'https://bharadhwajcn.github.io/fubar-charts/images/orange_circle.png',
            toBase64: false
        }
    }
};
```

### <a name="line-chart-options-connect-null"></a>3. Connect Null ###

Defines what should be done, if the user data contains `null` as y-axis value.

**Attributes**

* **connectNull** - Whether to avoid the `null` value and draw a single line or break the line into two when a `null` value is found.
    + Expected Value: Boolean. `true` or `false`. `true` will give output as a single line.

**Example:**  

```javascript
var options = {
    connectNull: true
};
```

### <a name="line-chart-options-grids"></a>4. Grids ###

Defines the properties of the grids lines that are to be added on the graph.

**Attributes**

* **vertical** - To define the properties of vertical grid lines.
    + **show** - To specify whether the vertical grid lines need to be displayed or not.
        - Expected Value: Boolean. `true` or `false`.
    + **color** - The color of the vertical grid line of the chart.
        - Expected Value: A valid HEX or RGB code or even name of the color.
    + **opacity** - To mention the opacity of the vertical grid lines.
        - Expected Value: A real number between 0 and 1 (both inclusive).
    + **values** - The values in x-axis to which the vertical line needs to be drawn.
        - Expected Value: An array of values, which are in the x-axis value of the graph.
* **horizontal** - To define the properties of horizontal grid lines.
    + **show** - To specify whether the horizontal grid lines need to be displayed or not.
        - Expected Value: Boolean. `true` or `false`.
    + **color** - The color of the horizontal grid line of the chart.
        - Expected Value: A valid HEX or RGB code or even name of the color.
    + **opacity** - To mention the opacity of the horizontal grid lines.
        - Expected Value: A real number between 0 and 1 (both inclusive).
    + **values** - The values in y-axis to which the horizontal line needs to be drawn.
        - Expected Value: An array of values, which are defined in the y-axis of the graph.
    + **skipFirst** - To specify whether to skip the first grid line.
        - Expected Value: Boolean. `true` or `false`.
    + **skipLast** - To specify whether to skip the last grid line.
        - Expected Value: Boolean. `true` or `false`.

**Example:**  

```javascript
var options = {
    grids : {
        vertical : {
            show : true,
            color : '#999',
            opacity : .5,
            values : [ 'Jan', 'Mar', 'May', 'Aug', 'Oct', 'Dec']
        },
        horizontal : {
          show : true,
          color : '#999',
          opacity : .5,
          values : [0, 10, 30, 50, 70, 90],
          skipFirst : false,
          skipLast : false
        }
    }
};
```

### <a name="line-chart-options-transition"></a>5. Transition ###

Defines the transition or animation of the lines involved in the graph.

**Attributes**

* **animate** - To specify whether animation is needed or not.
    + Expected Value: Boolean. `true` or `false`.
* **duration** - To specify the duration of animation of drawing the line.
    + Expected Value: A positive integer which is duration in milliseconds.

**Example:**  

```javascript
var options = {
    transition: {
        animate: true,
        duration : 2000
    }
};
```

### <a name="line-chart-options-margin"></a>6. Margin ###

Defines the margin that should be added to the canvas by the user.

**Attributes**

* **left** - The amount of margin on left side.
    + Expected Value: A non negative integer.
* **right** - The amount of margin on right side.
    + Expected Value: A non negative integer.
* **top** - The amount of margin at the top.
    + Expected Value: A non negative integer.
* **bottom** - The amount of margin at the bottom.
    + Expected Value: A non negative integer.

**Example:**  

```javascript
var options = {
    margin : {
        left : 20,
        right : 20,
        top : 0,
        bottom : 0
    }
};
```

### <a name="line-chart-options-goal-line"></a>7. Goal Line ###

Defines about an additional horizontal line, user can draw on the graph as a  
reference base line.

**Attributes**

* **value** - The value on Y Axis at which the line is to be drawn.
    + Expected Value: A defined value on Y-axis.
* **class** - User defined CSS class for goal line.
    + Expected Value: A user defined CSS class name.
* **icon** - An image that can be on the top of the line.
    - **url** - URL to the image that needs to be added.
        + Expected Value: The URL to the image, either relative path or whole URL.
    - **toBase64** - To specify whether the image needs to be converted to Base64.
        + Expected Value: Boolean. `true` or `false`.
    - **class** - User defined CSS class name for image.
        + Expected Value: A user defined CSS class name.
    - **height** - Height of the image that is added.
        + Expected Value: A positive integer value.
    - **width** - Width of the image that is added.
        + Expected Value: A positive integer value.
    - **left** - Amount by which the added image must be shifted to left.
        + Expected Value: A non negative integer value.

**Example:**  

```javascript
var options = {
    goalLine : {
        value : 50,
        class : 'goal-line-class',
        icon: {
            url: 'https://bharadhwajcn.github.io/fubar-charts/images/goal_arrow.png',
            toBase64: true,
            class: 'goal-icon-class',
            height : 15,
            width : 13,
            left: 0
        }
    }
};
```

### <a name="line-chart-options-tool-tip"></a>8. Tooltip ###

Defines about the tooltip that shows co-ordinates details. The co-ordinates  
values are available in the scope and can be accessed by using `this.xValue`  
and `this.yValue` for X and Y axis values.

**Attributes**

* **show** - To specify whether the tooltip needs to be displayed or not.
    + Expected Value: Boolean. `true` or `false`.
* **class** - User defined CSS class name for the tooltip.
    + Expected Value: A user defined CSS class name.
* **listener** - Listeners to which the tooltip should appear/disappear.
    + Expected Value: Valid listeners. If more than one, separated by space.
* **body** - Predefined template for body of tooltip.
    - **title** - Title to be shown on tooltip body.
        + Expected Value: A string value for title.
    - **xLabel** - Label for X Axis values.
        + Expected Value: A string value for x axis value label.
    - **yLabel** - Label for Y Axis values.
        + Expected Value: A string value for y axis value label.
* **formatter** - User defined function that can be used to create the customized  
               tooltip. Within the function, user can get the current x-axis and y-axis  
               value as shown below
    - `this.xValue` - Contains the x axis value for the point.
    - `this.yValue` - Contains the y axis value for the point.

**Example:**  

```javascript
var options = {
    tooltip: {
        show : true,
        listener : 'click touchstart',
        class : 'custom-tooltip',
        body : {
            title : 'SALES 2017',
            xLabel : 'Month',
            yLabel : 'Units sold'
        },
        formatter : function() {
            return this.yValue + ' units <br>in ' + this.xValue;
        }
    }
};
```


### <a name="line-chart-options-axis"></a>9. Axis ###

Defines about the various attributes of X and Y axis.

**Attributes**

* **xAxis** - Details and specifications about the x-axis.
    - **orientation** - To specify the position of the x-axis.
        + Expected Value: `top` or `bottom`.
    - **showAxisLine** - To specify whether to show the x-axis line or not.
        + Expected Value: Boolean. `true` or `false`.
    - **firstLabel** - To specify whether the first label in the x-axis should be shown or not.
        + Expected Value: Boolean. `true` or `false`.
    - **ticks** - To details about the ticks that should appear in x-axis.
        + **values** - Values for which ticks need to be shown.
                - Expected Value: This can be done in 2 ways as the user wants.  
                    i)  Array of valid values in x-axis for which the ticks needs to be shown.
                      `[value1, value2, ..., valuen]`  
                    ii) Array of objects which contains valid x-axis values and its required labels.  
                      `[{ value : value1, label : label1 }, { value : value2, label : label2 }, ..., { value : value3, label : label3 } ]`  
        + **fontSize** - Font size of the tick values of the x-axis.
            - Expected Value: A positive number or a positive number along with its unit.  
        + **padding** - Amount of padding that needed to be given from x-axis.
            - Expected Value: A positive number or a positive number along with its unit.
        + **position** - To specify the changes in x and y co-ordinates and rotation.
            * **angle** - The angle by which the label needs to be rotated.
                - Expected Value: A real number.
            * **x** - Amount needed to be shifted along the x-axis.
                - Expected Value: A real number.
            * **y** - Amount needed to be shifted along the y-axis.
                - Expected Value: A real number.
            * **formatter** - User defined function that can be used to create the customized axis  
                labels. The value of the current tick is available as parameter of the function.
 * **yAxis** - Details and specifications about the y-axis.
    - **orientation** - To specify the position of the y-axis.
        + Expected Value: `left` or `right`.
    - **showAxisLine** - To specify whether to show the y-axis line or not.
        + Expected Value: Boolean. `true` or `false`.
    - **firstLabel** - To specify whether the first label in the y-axis should be shown or not.
        + Expected Value: Boolean. `true` or `false`.
    - **ticks** - To details about the ticks that should appear in y-axis.
        + **values** - Values for which ticks need to be shown.
                - Expected Value: This can be done in 2 ways as the user wants.  
                    i)  Array of valid values in x-axis for which the ticks needs to be shown.
                      `[value1, value2, ..., valuen]`  
                    ii) Array of objects which contains valid y-axis values and its required labels.  
                      `[{ value : value1, label : label1 }, { value : value2, label : label2 }, ..., { value : value3, label : label3 } ]`  
        + **fontSize** - Font size of the tick values of the y-axis.
            - Expected Value: A positive number or a positive number along with its unit.  
        + **padding** - Amount of padding that needed to be given from y-axis.
            - Expected Value: A positive number or a positive number along with its unit.
        + **position** - To specify the changes in x and y co-ordinates and rotation.
            * **angle** - The angle by which the label needs to be rotated.
                - Expected Value: A real number.
            * **x** - Amount needed to be shifted along the x-axis.
                - Expected Value: A real number.
            * **y** - Amount needed to be shifted along the y-axis.
                - Expected Value: A real number.
            * **formatter** - User defined function that can be used to create the customized axis  
                labels. The value of the current tick is available as parameter of the function.

**Example:**  

```javascript
var options = {
    axis : {
        xAxis : {
            showAxisLine : true,
            firstLabel : true,
            orientation: 'bottom',
            ticks : {
                values : [ { value : 'Jan',  label : 'January' },
                           { value : 'Mar',  label : 'March' },
                           { value : 'May',  label : 'May' },
                           { value : 'Aug',  label : 'August' },
                           { value : 'Oct',  label : 'October' },
                           { value : 'Dec',  label : 'December' } ],
                fontSize : '12px',
                padding : 10,
            }
        },
        yAxis : {
            showAxisLine : true,
            firstLabel : true,
            orientation: 'left',
            ticks : {
                values: [ 10, 30, 50, 70, 90],
                fontSize : '12px',
                formatter : function(value) {
                    return String(value) + 'k units';
                },
                position :  {
                    angle : 30,
                    x : -5,
                    y : -10
                },
            }
        }
    }
};
```

------------

## <a name="line-chart-examples"></a>Examples ##

Here are the examples of the chart drawn, without using any options and with using the  
options that are available.

```html
<div class="chart-container" id="first-container"> </div>
```

```javascript
var element = document.querySelector('.chart-container');

var data = [
    ['Jan', 10],
    ['Feb', 70],
    ['Mar', 30],
    ['Apr', 10],
    ['May', 60],
    ['Jun', 45],
    ['Jul', 76],
    ['Aug', 40],
    ['Sep', 40],
    ['Oct', 60],
    ['Nov', 40],
    ['Dec', 80]
];
```

### <a name="line-chart-examples-basic"></a> Basic Chart Example ###

**Code Snippet:**

```javascript
var chart = new LineChart(element, data);
```

**Output:**

<img src="https://bharadhwajcn.github.io/fubar-charts/example-images/Basic_line_chart.png" alt="Basic Line Chart Example" width="500"/>

**Live example:**

Editable working example <a href="https://jsfiddle.net/bharadhwaj_cn/0d7mLjx3/" target="_blank">here</a>


### <a name="line-chart-examples-full-option"></a> Full option Chart Example ###

**Code Snippet:**

```javascript
var chart = new LineChart(element, data, {
    line: {
        color: '#B8D551',
        width: 4,
        icon: {
            show: true,
            url: 'https://bharadhwajcn.github.io/fubar-charts/images/green_circle.png',
            toBase64: false,
            class: 'point-icon',
            width: 10
        }
    },
    threshold: {
        value: 50,
        icon: {
            url: 'https://bharadhwajcn.github.io/fubar-charts/images/orange_circle.png',
            toBase64: false,
        }
    },
    grids: {
        vertical: {
            show: true,
            color: '#999',
            opacity: .5,
        },
        horizontal: {
            show: true,
            color: '#999',
            opacity: .5,
            skipFirst: false,
            skipLast: false,
            values: [10, 30, 50, 70, 80]        
        }
    },
    transition: {
        animate: true,
        duration: 2000
    },
    margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    goalLine: {
        value: 50,
        class: 'goalline',
        icon: {
            url: 'https://bharadhwajcn.github.io/fubar-charts/images/goal_arrow.png',
            class: 'goal-icon',
            height: 15,
            width: 13,
            left: 0
        }
    },
    axis: {
        xAxis: {
            showAxisLine: false,
            firstLabel: true,
            orientation: 'bottom',
            ticks: {
                values: ['Jan', 'Mar', 'May', 'Aug', 'Oct', 'Dec'],
                padding: 10,
                formatter: function(value) {
                    return value + " '17";
                }
            }
        },
        yAxis: {
            showAxisLine: false,
            firstLabel: false,
            orientation: 'left',
            ticks: {
                values: [
                    { value: 10, label: '10 m unit' },
                    { value: 30, label: '30 m unit' },
                    { value: 50, label: '50 m unit' },
                    { value: 70, label: '70 m unit' },
                    { value: 90, label: '90 m unit' },
                ],
                position : {
                    x : 0,
                    y : 10
                },
                font_size: '12px',
            }
        }
    },
    tooltip: {
        show: true,
        listener: 'click touchstart',
        class: 'custom-tooltip',
        formatter: function() {
          return this.yValue + ' units <br>in ' + this.xValue;
        }
    },
    connectNull: true
});
```

**Output:**

<img src="https://bharadhwajcn.github.io/fubar-charts/example-images/Full_option_line_chart.png" alt="Full option Line Chart Example" width="500"/>

**Live example:**

Editable working example <a href="https://jsfiddle.net/bharadhwaj_cn/g89zc7dx/" target="_blank">here</a>

-------------------------
