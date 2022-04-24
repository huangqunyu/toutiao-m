<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        round
        size="small"
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex'
}
</script>

<style scoped lang="less">
.home-container {
  // 这个样式不起作用
  ::v-deep .van-nav-bar__title {
    max-width: 90%;
  }

  .search-btn {
    // width: 450px;
    width: 555px;
    height: 64px;
    border: none;
    background-color: #5babfb;
  }
  .van-icon {
    color: #fff;
  }
}
</style>
