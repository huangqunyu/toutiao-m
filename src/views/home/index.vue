<template>
  <div class="home-container">
    <!-- 导航栏开始 -->
    <van-nav-bar class="page-nav-bar" fixed>
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
    <!-- 导航栏结束 -->
    <!-- 频道列表开始 -->
    <!--
        通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。
        通过 animated 属性可以开启切换标签内容时的转场动画。
        通过 swipeable 属性可以开启滑动切换标签页。
    -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab v-for="obj in userChannels" :key="obj.id" :title="obj.name">
        <!-- 文章列表开始 -->
        <article-list :channel="obj" />
        <!-- 文章列表结束 -->
      </van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <!-- 汉堡按钮 -->
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChennelEditShow = true"
      >
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道列表结束 -->
    <!-- 频道编辑弹出层开始 -->
    <van-popup
      v-model="isChennelEditShow"
      round
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '90%' }"
    >
      <ChannelEdit></ChannelEdit>
    </van-popup>
    <!-- 频道编辑弹出层关闭 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      userChannels: [], // 用户频道列表
      isChennelEditShow: false // 控制编辑频道弹出层的显示与隐藏
    }
  },
  methods: {
    async loadChannels () {
      try {
        const {
          data: { data }
        } = await getUserChannels()
        console.log(data.channels)
        this.userChannels = data.channels
        console.log(this.userChannels)
      } catch (error) {
        this.$toast('获取用户频道失败')
      }
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;

  ::v-deep .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    padding-top: 8px;
    width: 555px;
    height: 64px;
    border: none;
    font-size: 28px;
    background-color: #5babfb;
  }
  .van-icon {
    color: #fff;
    font-size: 32px;
  }
  ::v-deep .channel-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;

      .van-tab {
        min-width: 200px;
        font-size: 30px;
        color: #777777;
        // border-left: 1px solid #edeff3;
        // border-right: 1px solid pink;
        border-right: 1px solid #edeff3;
        // &:last-child {
        //   border-right: 2px solid pink !important;
        // }
      }

      .van-tab:nth-last-child(4) {
        border-right: 0px;
      }

      .van-tab--active {
        color: #333333;
      }
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      margin-bottom: 8px;
      // bottom: 18px;
      background-color: #3296fa;
    }
    .placeholder {
      min-width: 50px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;
      background-color: rgb(248, 245, 245);

      .icon-gengduo {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
