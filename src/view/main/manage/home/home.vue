<template>
  <div class="home">
    <el-row :gutter="20">
      <!-- 全国疫情分布地图 -->
      <el-col :span="12">
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
      <el-col :span="12">
        <el-card lass="box-card">
          <!-- 标题 -->
          <div slot="header" class="clearfix">
            <span>社区健康码数量</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import City from '@/components/city-echarts/city.vue'

export default {
  components: {
    City
  }
}
</script>

<style scoped></style>
