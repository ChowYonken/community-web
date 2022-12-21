<template>
  <div class="home">
    <el-row class="notice">
      <!-- 公告栏 -->
      <el-col :span="18" :offset="3">
        <el-card class="box-card">
          <!-- 标题 -->
          <div slot="header" class="clearfix">
            <i class="iconfont icon-zuixinnew3"></i>
            <span> 最新公告</span>
          </div>
          <!-- 内容 -->
          <notice />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <!-- 全国疫情分布地图 -->
      <el-col :span="14">
        <el-card class="box-card">
          <!-- 标题 -->
          <div slot="header" class="clearfix">
            <span>全国疫情分布地图</span>
          </div>
          <!-- 内容 -->
          <city />
        </el-card>
      </el-col>
      <!-- 红黄绿码数据 -->
      <el-col :span="10">
        <el-card class="box-card">
          <!-- 标题 -->
          <div slot="header" class="clearfix">
            <span>社区健康码数量</span>
          </div>
          <!-- 内容 -->
          <health-code></health-code>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="temp">
      <!-- 小区体温范围分布 -->
      <el-col :span="12">
        <el-card class="box-card">
          <!-- 标题 -->
          <div slot="header" class="clearfix">
            <span>体温范围分布</span>
          </div>
          <!-- 内容 -->
          <temp />
        </el-card>
      </el-col>
      <!-- 设备 -->
      <el-col :span="12">
        <el-card class="box-card">
          <!-- 标题 -->
          <div slot="header" class="clearfix">
            <span>设备状况</span>
          </div>
          <!-- 内容 -->
          <device />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import City from '@/components/city-echarts/city.vue'
import HealthCode from '@/components/healthCode-echarts/health-code.vue'
import Notice from '@/components/notice/notice.vue'
import Temp from '@/components/temp-echarts/temp-echarts.vue'
import Device from '@/components/device-echarts/device-echarts.vue'

export default {
  components: {
    City,
    HealthCode,
    Notice,
    Temp,
    Device
  }
}
</script>

<style scoped>
.notice {
  margin-bottom: 20px;
}
.notice .iconfont {
  color: #d81e06;
}
.temp {
  margin-top: 20px;
}
</style>
