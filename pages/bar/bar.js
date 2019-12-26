import * as echarts from '../../ec-canvas/echarts';
import config from '../../config.js'
import chartOption from '../../chart/option.js'
import chartOption1 from '../../chart/option1.js'
import chartOption2 from '../../chart/option2.js'

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
  ]
  for (var k in opt) {
    newArr[0].push(k);
    newArr[1].push(opt[k]);
  }
  return newArr;
}

function getTotal(data, len) {
  var newArr = [];
  for (var i = 0; i < len; i++) {
    newArr.push(data);
  }
  return newArr;
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
      console.log(config);
      var chart = config.chart,
        chart1 = config.chart1,
        chart2 = config.chart2;
      this.getChart(chart.data, chart.total);
      this.getChart1(chart1.data, chart1.total);
      this.getChart2(chart1.data, chart2.total);
    }, 100);
  },
  createChart(detl, total, option, chart) {
    var userName = wx.getStorageSync('userName');
    detl += '?userName=' + userName;
    request(detl, res => {
      if (res.statusCode == 200) {
        var data = res.data;
        data = loop(data);
        option.xAxis[0].data = data[0];
        option.series[0].data = data[1];
        request(total, res => {
          var v = getTotal(res.data.total, data[0].length);
          option.series[1].data = v;
          chart.setOption(option);
        })
      }
    });
  },
  getChart(detl, total) {
    this.createChart(detl, total, chartOption, chart);
  },
  getChart1(detl, total) {
    this.createChart(detl, total, chartOption1, chart1);
  },
  getChart2(detl, total) {
    this.createChart(detl, total, chartOption2, chart2);
  }
});