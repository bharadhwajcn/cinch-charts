const CONSTANTS = {
  DEFAULT_MARGIN: {
    LEFT: 15,
    BOTTOM: 30,
    RIGHT: 15,
    TOP: 15
  },
  ORIENTATION_MARGIN: {
    LEFT: 35,
    BOTTOM: 30,
    RIGHT: 35,
    TOP: 22
  },
  BAR: {
    color: '#4682B4',
    curve: false,
    opacity : 1,
    padding : .05
  },
  DEFAULT_COLORS : ['#CDDC39', '#4CAF50', '#009688', '#00BCD4', '#2196F3', '#3F51B5', '#673AB7'],
  LABEL_WIDTH: 35,
  LABEL_LINE_HEIGHT: .3,
  ICON: {
    DEFAULT_WIDTH : 10,
    DEFAULT_HEIGHT: 10
  },

  DEFAULT_BAR_RADIUS: 0,
  BAR_CHART : {
    type : 'bar',
    element : '.bar',
    class: 'bar'
  },
  STACK_CHART : {
    type : 'stack',
    element : '.bars',
    class: 'bars'
  },
  LINE_CHART : {
    type : 'line',
    element : '.points',
    class: 'points'
  },
  AREA_CHART : {
    type : 'line',
    element : '.points',
    class: 'points'
  },
  FIRST_CHILD: 1,
  AXIS_CONFIG: {
    X_AXIS: {
      orientation: 'bottom',
      firstLabel: true,
      ticks: {
        font_size: '13px',
        alignment: 'middle',
        padding: 5
      },
      showAxisLine: true
    },
    Y_AXIS: {
      orientation: 'left',
      ticks: {
        font_size: '13px',
        padding: 5,
        alignment: 'end'
      },
      firstLabel: true,
      showAxisLine: true
    }
  },
  TOOLTIP: {
    LISTENERS: 'mouseover click touchstart',
    BODY: {
      title : 'Title',
      xLabel : 'X value',
      yLabel : 'Y value'
    }
  },
  THRESHOLD: { }
};
