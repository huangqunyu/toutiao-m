<template>
  <div class="layout-container">
    <!-- 子路由的出口 -->
    <router-view></router-view>
    <!-- 标签导航栏开始 -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont icon-shouye"></i> <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa"
        ><i slot="icon" class="iconfont icon-wenda"></i> <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video"
        ><i slot="icon" class="iconfont icon-wenda"></i>
        <span>视频</span></van-tabbar-item
      >
      <van-tabbar-item to="/my"
        ><i slot="icon" class="iconfont icon-wenda"></i
        ><span>{{
          $store.state.user ? "我的" : "未登录"
        }}</span></van-tabbar-item
      >
    </van-tabbar>

    <!-- 标签导航栏结束 -->
  </div>
</template>

<script>
export default {
  name: "LayoutIndex",
  data() {
    return { active: 0 };
  },
};
</script>

<style lang="less" scoped>
.layout-container {
  .layout-tabbar {
    i.iconfont {
      font-size: 40px;
      padding-left: 6px;
    }
    span {
      font-size: 20px;
    }
  }
}
</style>
