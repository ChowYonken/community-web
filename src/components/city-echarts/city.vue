<template>
  <div id="chart-city" style="width: 500px; height: 400px"></div>
</template>

<script>
import * as echarts from 'echarts'

import jsonp from 'jsonp'

// 注册中国地图
import chinaJson from './data/china.json'
echarts.registerMap('china', chinaJson)

let option = {
  title: {
    text: '全国疫情地图',
    x: 'center',
    textStyle: {
      color: '#9c0505'
    }
  },
  series: [
    {
      type: 'map',
      map: 'china',
      data: [],
      label: {
        show: true,
        color: '#000',
        fontSize: 10
      },
      zoom: 1.25,
      itemStyle: {
        borderColor: 'gray'
      },
      emphasis: {
        label: {},
        itemStyle: {
          areaColor: 'green',
          borderColor: 'orange'
        }
      }
    }
  ],
  visualMap: [
    {
      type: 'piecewise',
      show: true,
      pieces: [
        { min: 10000 },
        { min: 1000, max: 9999 },
        { min: 100, max: 999 },
        { min: 10, max: 99 },
        { min: 1, max: 9 },
        { value: 0 }
      ],
      inRange: {
        color: ['#ccc', '#ffaa85', '#660208']
      },
      itemWidth: 10,
      itemHeight: 10
    }
  ],
  tooltip: {
    trigger: 'item',
    formatter: '地区：{b}<br/>确诊：{c}'
  }
}

export default {
  data() {
    return {
      chinaChart: ''
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.chinaChart = echarts.init(document.getElementById('chart-city'))
  },
  methods: {
    getData() {
      jsonp(
        'https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1585%20397547299',
        (err, data) => {
          let lists = data.data.list.map((item) => ({
            name: item.name,
            value: item.econNum
          }))
          option.series[0].data = lists
          this.chinaChart.setOption(option)
        }
      )
    }
  }
}
</script>

<style scoped>
#chart-city {
  margin: 0 auto;
}
</style>
