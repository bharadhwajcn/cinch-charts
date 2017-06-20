# <a name="multi-line-chart"></a> MULTI LINE CHART #

## Index ##

+ [Constructor Code](#constructor-code)
+ [DOM Element](#dom-element)
+ [Data Format](#data-format)
+ [Options](#options)
    - [Line](#options-line)
    - [Threshold](#options-threshold)
    - [Connect Null](#options-connect-null)
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

The below is the code for invoking a `MultiLinechart`.

```javascript
var multiLineChart = new MultiLineChart(container_element, data, options)
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

The data format used for `MultiLineChart` is simply an array of multiple line objects.  
Each line object is represented as a key-value pair containing the identifing key  
of that line and the data of that line.

**Data Format:**
```
[
  {
    key : line-name-1,
    value : [ [x11, y11], [x12, y12], ..., [x1n,y1n] ]
  },
  {
    key : line-name-2,
    value : [ [x21, y21], [x22, y22], ..., [x2n,y2n] ]
  },
  ...,
  {
    key : line-name-m,
    value : [ [xm1, ym1], [xm2, ym2], ..., [xmn,ymn] ]
  }
]
```

**Example:**

```javascript
var data = [
    { key : 'Series 1',
      value : [
                ['Jan', 177],
                ['Feb', 104],
                ['Mar', 124],
                ['Apr', 127],
                ['May', 143],
                ['Jun', 130],
                ['Jul', 90],
                ['Aug', 154],
                ['Sep', 114],
                ['Oct', 102],
                ['Nov', 123],
                ['Dec', 135]
              ]
    },
    { key : 'Series 2',
      value : [
                ['Jan', 82],
                ['Feb', 97],
                ['Mar', 78],
                ['Apr', 86],
                ['May', 116],
                ['Jun', 95],
                ['Jul', 109],
                ['Aug', 78],
                ['Sep', 86],
                ['Oct', 116],
                ['Nov', 95],
                ['Dec', 109]
              ]
    }
];
```

------------

## <a name="options"></a>Options ##

All the optional functionalities that is needed to be added to the graph are added
in `options` part. This can be used for adding more functionalities or to customize
the current graph. `options` is a javascript object. The following can be added in
`options` part.

### <a name="options-line"></a>1. Line ###

Defines the attributes related to the Line of a line chart.

**Attributes**

* **color**  - The color for each of the line in the chart.
    + Expected Value: An array of valid HEX or RGB code or even name of the color.
* **width**  - Defines the width of each line in line Chart.
    + Expected Value: An array of positive real number where each represent the width of each line.
* **icon** - To specify the details of the icons used as plot points.
    - **show** - To specify whether the plot points need to be shown for a particular line.
        + Expected Value: Boolean array. `true` or `false`.
    - **url** - The array of URL for the image that need to be used as plot point for each line.
        + Expected Value: The array of URL to the image, either relative path or whole URL. If no URL is provided and `show` is set to `true`, the color of the line is set as plot point.
    - **toBase64** - To specify whether the image needs to be converted to Base64.
        + Expected Value: Boolean array. `true` or `false`.
    - **class** - User defined CSS class name for image.
        + Expected Value: A user defined CSS class name.
    - **width** - Defines the width of the plot point image.
        + Expected Value: An array positive real number where each represent the width of plot point of that line.


**Example:**

```javascript
var options = {
    line: {
        color : ['#359fd1', '#B8D551', '#FD8635'],,
        width: [4, 8, 4],
        icon: {
            show: [true, true, true],
            url: ['https://bharadhwajcn.github.io/fubar-charts/images/blue_star.png',
                  'https://bharadhwajcn.github.io/fubar-charts/images/green_circle.png',
                  'https://bharadhwajcn.github.io/fubar-charts/images/orange_circle.png',
                ],
            toBase64: [false, true, false],
            class: 'point-icon',
            width : [10, 15, 10]
        }
    }
};
```

## <a name="options-threshold"></a>2. Threshold ###

Helps to set the threshold value to each line, after which we can change the plot point image.

**Attributes**

* **value**  - Array of threshold value where each represents the value of corresponding line.
    + Expected Value: An array of integers.
* **icon** - To specify the details of the icons used as plot points.
    - **url** - The URL for the image that need to be used as threshold plot point.
        + Expected Value: The URL to the image, either relative path or whole URL.
    - **toBase64** - To specify whether the image needs to be converted to Base64.
        + Expected Value: Boolean. `true` or `false`.
    - **width**  - Defines the width of the plot point image.
        + Expected Value: A positive real number.


**Example:**

```javascript
var options = {
    threshold: {
        value : [131, 90, null]
        icon: {
            url: 'https://bharadhwajcn.github.io/fubar-charts/images/orange_circle.png',
            toBase64: false
        }
    }
};
```

### <a name="options-connect-null"></a>3. Connect Null ###

Defines what should be done, if the user data contains `null` as y-axis value.

**Attributes**

* **connectNull** - Whether to avoid the `null` value and draw a single line or break the line into two when a `null` value is found.
    + Expected Value: Boolean array. `true` or `false`. `true` will give output as a single line.

**Example:**

```javascript
var options = {
    connectNull: [true, false, true]
};
```

### <a name="options-grids"></a>4. Grids ###

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

### <a name="options-transition"></a>5. Transition ###

Defines the transition or animation of the lines involved in the graph.

**Attributes**

* **animate** - To specify whether animation is needed or not.
    + Expected Value: Boolean. `true` or `false`.
* **duration** - To specify the duration of animation of drawing the line.
    + Expected Value: A positive integer which is duration in milliseconds.
* **delay** - To specify the delay between the animation of adjacent lines.
    + Expected Value: A positive integer which is delay in milliseconds.

**Example:**

```javascript
var options = {
    transition: {
        animate: true,
        duration : 2000,
        delay : 1000,
    }
};
```

### <a name="options-margin"></a>6. Margin ###

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

### <a name="options-goal-line"></a>7. Goal Line ###

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

### <a name="options-tool-tip"></a>8. Tooltip ###

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


### <a name="options-axis"></a>9. Axis ###

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

### <a name="options-legend"></a>10. Legend ###

Defines about the `legend` to be added so as to identify the lines.

**Attributes**

+ **show** - To specify whether to show the legend or not.
    - Expected Value: Boolean. `true` or `false`.
* **class** - The user defined CSS class to the legend.
    + Expected Value: A user defined CSS class name.
* **position** - The position where the legend needs to be placed.
    + Expected Value: String. Either `top` or `bottom`.
* **clickable**  - Whether clicking on legend should toggle the visibility of line.
    + Expected Value: Boolean array. `true` or `false`.
* **height** - Height of the legend.
    + Expected Value: A positive integer.

**Example:**

```javascript
var options = {
    legend: {
        show: true,
        class: 'legend-class',
        position : 'bottom',
        clickable : [true, true, true],
        height : 45
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
    {
        key : 'Series 1',
        value : [
                  ['Jan', 177],
                  ['Feb', 104],
                  ['Mar', 124],
                  ['Apr', 127],
                  ['May', 143],
                  ['Jun', 130],
                  ['Jul', 90],
                  ['Aug', 154],
                  ['Sep', 114],
                  ['Oct', 102],
                  ['Nov', 123],
                  ['Dec', 135]
                ]
    },
    {
        key : 'Series 2',
        value : [
                  ['Jan', 82],
                  ['Feb', 97],
                  ['Mar', 78],
                  ['Apr', 86],
                  ['May', 116],
                  ['Jun', 95],
                  ['Jul', null],
                  ['Aug', 78],
                  ['Sep', 86],
                  ['Oct', 116],
                  ['Nov', 95],
                  ['Dec', 109]
                ]
    },
    {
        key : 'Series 3',
        value : [
                  ['Jan', 50],
                  ['Feb', 40],
                  ['Mar', 95],
                  ['Apr', 75],
                  ['May', 90],
                  ['Jun', null],
                  ['Jul', 74],
                  ['Aug', 68],
                  ['Sep', 60],
                  ['Oct', 90],
                  ['Nov', 48],
                  ['Dec', 66]
                ]
    }
];
```

### <a name="examples-basic-chart"></a> Basic Chart Example ###

**Code Snippet:**

```javascript
var chart = new MultiLineChart(element, data);
```

**Output:**

<img src="https://bharadhwajcn.github.io/fubar-charts/example-images/Basic_multi_line_chart.png" alt="Basic Multi Line Chart Example" width="500"/>

**Live example:**

Editable working example <a href="https://jsfiddle.net/bharadhwaj_cn/nnu5xqj4/">here</a>


### <a name="examples-full-option-chart"></a> Full option Chart Example ###

**Code Snippet:**

```javascript
var chart = new MultiLineChart(element, data, {
    line: {
        width: [4, 8, 4],
        color: ['#359fd1', '#B8D551', '#FD8635'],
        icon: {
            show: [true, true, true],
            url: ['https://bharadhwajcn.github.io/fubar-charts/images/blue_star.png',
                  'https://bharadhwajcn.github.io/fubar-charts/images/green_circle.png',
                  'https://bharadhwajcn.github.io/fubar-charts/images/orange_circle.png',
            ],
            width: [10, 15, 10]
        }
    },
    threshold: {
        value: [131, 90, null],
        icon: {
            url: ['https://bharadhwajcn.github.io/fubar-charts/images/orange_circle.png'],
            width: 10,
        }
    },
    connectNull: [true, false, true],
    grids: {
        vertical: {
            show: true,
            color: '#999',
            opacity: .5,
            values: ['Jan', 'Mar', 'May', 'Aug', 'Oct', 'Dec']
        },
        horizontal: {
            show: true,
            color: '#999',
            opacity: .5,
            skipFirst: false,
            skipLast: false,
            values: [30, 60, 90, 120, 150, 180]
        }
    },
    transition: {
        animate: true,
        duration: 2000,
        delay: 1000,
    },
    margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    goalLine: {
        value: 130,
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
            }
        },
        yAxis: {
            showAxisLine: false,
            firstLabel: false,
            orientation: 'left',
            ticks: {
                values: [{
                  value: 30,
                  label: '30m unit'
                }, {
                  value: 60,
                  label: '60m unit'
                }, {
                  value: 90,
                  label: '90m unit'
                }, {
                  value: 120,
                  label: '120m unit'
                }, {
                  value: 150,
                  label: '150m unit'
                }, {
                  value: 180,
                  label: '180m unit'
                }],
                position: {
                  y: 10,
                },
                font_size: '12px'
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
    legend: {
        show: true,
        class: 'legend-class',
        position: 'bottom',
        height: 45,
        clickable: [true, true, true]
    }
});
```

**Output:**

<img src="https://bharadhwajcn.github.io/fubar-charts/example-images/Full_option_multi_line_chart.png" alt="Full option Multi Line Chart Example" width="500"/>

**Live example:**

Editable working example <a href="https://jsfiddle.net/bharadhwaj_cn/reya463o/" target="_blank">here</a>

-------------------------
