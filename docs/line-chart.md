# <a name="line-chart"></a> LINE CHART #

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

The below is the code for invoking a `Linechart`.

```javascript
var lineChart = new LineChart(container_element, data, options)
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
    var element = document.getElementsByClassName('chart-container')[0]; // or
    var element = document.getElementById('first-container');
    ```

------------

## <a name="data-format"></a>Data Format ##

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

## <a name="options"></a>Options ##

All the optional functionalities that is needed to be added to the graph are added
in `options` part. This can be used for adding more functionalities or to customize
the current graph. `options` is a javascript object. The following can be added in
`options` part.

### <a name="options-line"></a>1. Line ###

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
            url: 'https://bharadhwajcn.github.io/cinch-charts/static/images/green_circle.png',
            toBase64: false,
            class: 'point-icon',
            width : 10
        }
    }
};
```

## <a name="options-threshold"></a>2. Threshold ###

Helps to set the threshold value to each line, after which we can change the plot point image.

**Attributes**

* **value**  - The threshold value above which the plotpoint icon needs to be changed.
    + Expected Value: An integer.
* **icon** - To specify the details of the icons used as plot points.
    - **url** - The URL for the image that need to be used as plot point.
        + Expected Value: The URL to the image, either relative path or whole URL. If no URL is provided and `show` is set to `true`, the color of the line is set as plot point.
    - **toBase64** - To specify whether the image needs to be converted to Base64.
        + Expected Value: Boolean. `true` or `false`.
    - **width**  - Defines the width of the plot point image.
        + Expected Value: A positive real number.


**Example:**

```javascript
var options = {
    threshold: {
      value : 80,
        icon: {
            url: 'https://bharadhwajcn.github.io/cinch-charts/static/images/orange_circle.png',
            toBase64: false
        }
    }
};
```

### <a name="options-connect-null"></a>3. Connect Null ###

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

**Example:**

```javascript
var options = {
    transition: {
        animate: true,
        duration : 2000
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
            url: 'https://bharadhwajcn.github.io/cinch-charts/static/images/goal_arrow.png',
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
var chart = new LineChart(element, data);
```

**Output:**

<img src="https://bharadhwajcn.github.io/cinch-charts/static/images/example-images/Basic_line_chart.png" alt="Basic Line Chart Example" width="500"/>

**Live example:**

Editable working example <a href="https://jsfiddle.net/bharadhwaj_cn/0d7mLjx3/" target="_blank">here</a>


### <a name="examples-full-option-chart"></a> Full option Chart Example ###

**Code Snippet:**

```javascript
var chart = new LineChart(element, data, {
    line: {
        color: '#B8D551',
        width: 4,
        icon: {
            show: true,
            url: 'https://bharadhwajcn.github.io/cinch-charts/static/images/green_circle.png',
            toBase64: false,
            class: 'point-icon',
            width: 10
        }
    },
    threshold: {
        value: 50,
        icon: {
            url: 'https://bharadhwajcn.github.io/cinch-charts/static/images/orange_circle.png',
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
            url: 'https://bharadhwajcn.github.io/cinch-charts/static/images/goal_arrow.png',
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

<img src="https://bharadhwajcn.github.io/cinch-charts/static/images/example-images/Full_option_line_chart.png" alt="Full option Line Chart Example" width="500"/>

**Live example:**

Editable working example <a href="https://jsfiddle.net/bharadhwaj_cn/g89zc7dx/" target="_blank">here</a>

-------------------------
