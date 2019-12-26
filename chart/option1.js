export default {
  color: ['#1da1f2','#fa7070'],
  title: {
    text: '饮食习惯',
    x: 'left'
  },
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    x: '15%'
  },
  calculable: true,
  legend: {
    data: ['饮食习惯', '总数'],
    left: 'center',
  },
  xAxis: [{
    type: 'category',
    data: [],
    axisTick: {
      show: false
    },
    axisLabel: {
      interval: 0
    }
  }, ],
  yAxis: [{
    type: 'value',
    name: '单位',
    // max: 15,
    splitLine: {
      show: false,
    },
    axisLine: {
      show: true
    },
    splitLine: {
      show: true
    }
  }],
  series: [{
      name: '饮食习惯',
      type: 'bar',
      data: []
    },
    {
      name: '总数',
      type: 'bar',
      data: []
    }
  ]
};