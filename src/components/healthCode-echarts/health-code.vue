<template>
  <div id="health-code" style="width: 500px; height: 400px"></div>
</template>

<script>
import { getHealthCodeCounts } from '@/network/api/common'
import * as echarts from 'echarts'

let option = {
  title: {
    text: '红黄绿码情况',
    left: 'center'
  },
  color: ['#ee6666', '#91cc75', '#fac858'],
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}

export default {
  data() {
    return {
      healthCode: ''
    }
  },
  created() {
    this._getHealthCodeCounts()
  },
  mounted() {
    this.healthCode = echarts.init(document.getElementById('health-code'))
  },
  methods: {
    _getHealthCodeCounts() {
      getHealthCodeCounts()
        .then((res) => {
          let list = res.data.data.map((item) => ({
            value: item.counts,
            name: item.healthCode
          }))
          option.series[0].data = list
          this.healthCode.setOption(option)
        })
        .catch((err) => {})
    }
  }
}
</script>

<style scoped></style>
