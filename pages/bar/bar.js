import * as echarts from '../../ec-canvas/echarts';

let chart = null;
let chart1 = null;
let chart2 = null;

function request(url, cb) {
  wx.request({
    url: url,
    success: function(res) {
      if (res) {
        cb(res)
      }
    },
    fail() {
      console.log('err');
    }
  })
}

function loop(opt) {
  var newArr = [
      [],
      []
    ],
    tA = [],
    total = 0;
  for (var k in opt) {
    total += opt[k];
    newArr[0].push(k);
    newArr[1].push(opt[k]);
  }
  newArr[0].forEach(res => {
    tA.push(total);
  })
  return [newArr, tA];
}

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  return chart;
}

function initChart1(canvas, width, height) {
  chart1 = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  return chart1;
}

function initChart2(canvas, width, height) {
  chart2 = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  return chart2;
}

Page({
  onShareAppMessage: function(res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  data: {
    ec: {
      onInit: initChart
    },
    ec1: {
      onInit: initChart1
    },
    ec2: {
      onInit: initChart2
    }
  },
  onReady() {
    setTimeout(() => {
      this.getChart('http://localhost:8873/data/1.json');
      this.getChart1('http://localhost:8873/data/2.json');
      this.getChart2('http://localhost:8873/data/3.json');
    }, 100);
  },
  getChart(url) {
    request(url, res => {
      if (res.statusCode == 200) {
        var data = res.data;
        data = loop(data);
        var areas = data[0][0],
          tgtVals = data[0][1],
          compVals = data[1];
        var option = {
          color: ['#1da1f2', '#fa7070'],
          title: {
            text: '兴趣爱好', //主标题
            x: 'left' //标题位置
          }, //图表标题
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            x: '15%',
            top: '20%'
          },
          calculable: true,
          legend: {
            data: ['活动', '总数'],
            left: 'center',
          },
          xAxis: [{
            type: 'category',
            data: areas,
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0
            }
          }],
          yAxis: [{
            type: 'value',
            name: '活动数',
            max: 15,
            splitLine: { // 分隔线
              show: false, // 默认显示，属性show控制显示与否
            },
            axisLine: {
              show: true // 坐标轴是否显示
            },
            splitLine: {
              show: true, //网格线开关
            }
          }],
          series: [{
              name: '活动',
              type: 'bar',
              data: tgtVals
            },
            {
              name: '总数',
              type: 'bar',
              data: compVals
            }
          ]
        }
        chart.setOption(option);
      }
    });
  },
  getChart1(url) {
    request(url, res => {
      if (res.statusCode == 200) {
        var data = res.data;
        data = loop(data);
        var areas = data[0][0],
          tgtVals = data[0][1],
          compVals = data[1];
        var option = {
          color: ['#1da1f2', '#fa7070'],
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
            data: ['习惯', '总数'],
            left: 'center',
          },
          xAxis: [{
            type: 'category',
            data: areas,
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
            max: 15,
            splitLine: { // 分隔线
              show: false, // 默认显示，属性show控制显示与否
            },
            axisLine: {
              show: true // 坐标轴是否显示
            },
            splitLine: {
              show: true, //网格线开关
            }
          }],
          series: [{
              name: '习惯',
              type: 'bar',
              label: {
                formatter: function() {

                }
              },
              data: tgtVals
            },
            {
              name: '总数',
              type: 'bar',
              data: compVals
            }
          ]
        }
        chart1.setOption(option);
      }
    });
  },
  getChart2(url) {
    request(url, res => {
      if (res.statusCode == 200) {
        var data = res.data;
        data = loop(data);
        var areas = data[0][0],
          tgtVals = data[0][1],
          compVals = data[1];
        var option = {
          color: ['#1da1f2', '#fa7070'],
          title: {
            text: '作息时间',
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
            data: ['目标', '完成情况'],
            left: 'center',
          },
          xAxis: [{
            type: 'category',
            data: areas,
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              // formatter: function (value) {

              //   return value.split("").join("\n");
              // }  
            }
          }],
          yAxis: [{
            type: 'value',
            name: '作息时间',
            max: 24,
            splitLine: { // 分隔线
              show: false, // 默认显示，属性show控制显示与否
            },
            axisLine: {
              show: true // 坐标轴是否显示
            },
            splitLine: {
              show: true, //网格线开关
            }
          }],
          series: [{
              name: '目标',
              type: 'bar',
              data: tgtVals
            },
            {
              name: '完成情况',
              type: 'bar',
              data: compVals
            }
          ]
        }
        chart2.setOption(option);
      }
    });
  }
});