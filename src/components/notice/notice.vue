<template>
  <div class="notice">
    <!-- 标题 -->
    <div class="title">
      {{ title }}
    </div>
    <!-- 创建时间 -->
    <div class="createTime">
      <template v-if="priority === '1'">
        <el-tag type="danger" size="mini">紧急</el-tag>
      </template>
      <template v-else>
        <el-tag type="success" size="mini">普通</el-tag>
      </template>
      {{ createTime }}
    </div>
    <!-- 内容 -->
    <div class="content">
      {{ content }}
    </div>
  </div>
</template>

<script>
import { getNewNotice } from '@/network/api/common'

export default {
  data() {
    return {
      title: '', // 标题
      content: '', // 内容
      priority: '', // 类型
      createTime: '' // 创建时间
    }
  },
  created() {
    // 获取最新通告
    this._getNewNotice()
  },
  methods: {
    _getNewNotice() {
      getNewNotice()
        .then((res) => {
          const data = res.data.data
          this.title = data.title
          this.content = data.content
          this.priority = data.priority
          this.createTime = data.createAt
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.notice {
  min-height: 200px;
}

.title {
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
}

.createTime {
  font-size: 12px;
  color: #9b9898;
  text-align: center;
  margin-bottom: 30px;
}

.content {
  padding: 0 60px;
}
</style>
