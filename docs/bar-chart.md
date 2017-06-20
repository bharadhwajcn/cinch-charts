# <a name="bar-chart"></a> BAR CHART #

## Index ##

+ [Constructor Code](#constructor-code)
+ [DOM Element](#dom-element)
+ [Data Format](#data-format)
+ [Options](#options)
    - [Bar](#options-bar)
    - [Grids](#options-grids)
    - [Transition](#options-transition)
    - [Margin](#options-margin)
    - [Goal Line](#options-goal-line)
    - [Tooltip](#options-tool-tip)
    - [Axis](#options-axis)
+ [Examples](#examples)
    - [Basic Bar chart](#examples-basic-chart)
    - [Full Option Bar chart](#examples-full-option-chart)

-----------------------------

## <a name="constructor-code"></a>Constructor Code ##

The below is the code for invoking a `Barchart`.

```javascript
var barChart = new BarChart(container_element, data, options)
```

- **`container_element`** is the DOM element into which the Chart is to be appended.
- **`data`** is the data required to draw the chart.
- **`options`** are the optional features that can be used to alter the chart.

------------

## <a name="dom-element"></a>DOM Element ##

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

## <a name="data-format"></a>Data Format ##

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

## <a name="options"></a>Options ##

All the optional functionalities that is needed to be added to the graph are added
in `options` part. This can be used for adding more functionalities or to customize
the current graph. `options` is a javascript object. The following can be added in
`options` part.

### <a name="options-bar"></a>1. Bar ###

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

### <a name="options-grids"></a>2. Grids ###

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

### <a name="options-transition"></a>3. Transition ###

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

### <a name="options-margin"></a>4. Margin ###

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

### <a name="options-goal-line"></a>5. Goal Line ###

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

### <a name="options-tool-tip"></a>6. Tooltip ###

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


### <a name="options-axis"></a>7. Axis ###

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

## <a name="examples"></a>Examples ##

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

### <a name="examples-basic-chart"></a> Basic Chart Example ###

**Code Snippet:**

```javascript
var chart = new BarChart(element, data);
```

**Output:**

<img src="https://bharadhwajcn.github.io/fubar-charts/example-images/Basic_bar_chart.png" alt="Basic Bar Chart Example" width="500"/>

**Live example:**

Editable working example <a href="https://jsfiddle.net/bharadhwaj_cn/c1tz9jL4/" target="_blank">here</a>


### <a name="examples-full-option-chart"></a> Full option Chart Example ###

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

---------------
