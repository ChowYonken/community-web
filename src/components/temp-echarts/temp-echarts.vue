<template>
  <div id="temp" style="width: 500px; height: 400px"></div>
</template>

<script>
import * as echarts from 'echarts'
import { getTempCounts } from '@/network/api/common'

let option = {
  xAxis: {
    type: 'category',
    data: ['37.2及以下', '37.3~37.9', '38.0以上']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
}

export default {
  data() {
    return {
      temp: ''
    }
  },
  created() {
    this._getTempCounts()
  },
  mounted() {
    this.temp = echarts.init(document.getElementById('temp'))
  },
  methods: {
    _getTempCounts() {
      getTempCounts()
        .then((res) => {
          let list = []
          res.data.data.forEach((item) => {
            list.push(item.total)
          })
          option.series[0].data = list
          this.temp.setOption(option)
        })
        .catch((err) => {})
    }
  }
}
</script>

<style scoped></style>
