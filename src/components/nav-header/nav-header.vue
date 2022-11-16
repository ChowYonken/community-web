<template>
  <div class="nav-header">
    <div class="icon" @click="handleFoldClick">
      <template v-if="isFold">
        <i class="iconfont icon-s-unfold"></i>
      </template>
      <template v-else>
        <i class="iconfont icon-s-fold"></i>
      </template>
    </div>
    <div class="content">
      <!-- 面包屑 -->
      <bread-crumb></bread-crumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '@/components/Breadcrumb/bread-crumb.vue'
import UserInfo from '@/components/nav-header/user-info.vue'

export default {
  components: {
    BreadCrumb,
    UserInfo
  },
  data() {
    return {
      isFold: false
    }
  },
  methods: {
    handleFoldClick() {
      this.isFold = !this.isFold
      this.$emit('foldChange', this.isFold)
    }
  }
}
</script>

<style scoped>
.nav-header {
  display: flex;
  width: 100%;
}

.icon {
  cursor: pointer;
}

.icon .iconfont {
  font-size: 24px;
  line-height: 45px;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 0 20px;
}
</style>
