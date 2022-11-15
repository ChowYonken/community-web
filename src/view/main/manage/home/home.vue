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
        <el-card lass="box-card">
          <!-- 标题 -->
          <div slot="header" class="clearfix">
            <span>社区健康码数量</span>
          </div>
          <!-- 内容 -->
          <health-code></health-code>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import City from '@/components/city-echarts/city.vue'
import HealthCode from '@/components/healthCode-echarts/health-code.vue'
import Notice from '@/components/notice/notice.vue'

export default {
  components: {
    City,
    HealthCode,
    Notice
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
</style>
