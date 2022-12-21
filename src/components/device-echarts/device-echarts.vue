<template>
  <div id="device" style="width: 500px; height: 400px"></div>
</template>

<script>
import { getDeviceCounts } from '@/network/api/common'
import * as echarts from 'echarts'

let option = {
  title: {
    text: '设备状况',
    left: 'center'
  },
  color: ['#ee6666', '#73c0de'],
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
      device: ''
    }
  },
  created() {
    this._getDeviceCounts()
  },
  mounted() {
    this.device = echarts.init(document.getElementById('device'))
  },
  methods: {
    _getDeviceCounts() {
      getDeviceCounts()
        .then((res) => {
          let list = res.data.data.map((item) => ({
            value: item.counts,
            name: item.status === '0' ? '损坏' : '正常'
          }))
          option.series[0].data = list
          this.device.setOption(option)
        })
        .catch((err) => {})
    }
  }
}
</script>

<style scoped></style>
