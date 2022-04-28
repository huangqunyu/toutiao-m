<template>
  <div class="channel-edit">
    <!-- 我的频道开始 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" round type="danger" plain size="mini"
        >编辑</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <!-- 拿到我的频道用户数据，然后循环遍历渲染数据 -->
      <van-grid-item
        icon="clear"
        center
        class="grid-item"
        v-for="(obj, index) in myChannels"
        :key="obj.id"
      >
        <!-- 判断点击的频道是否和我们当前频道索引一致，一样就附加一个样式类名叫：active -->
        <span class="text" :class="{ active: index === active }" slot="text">{{
          obj.name
        }}</span></van-grid-item
      >
    </van-grid>
    <!-- 我的频道结束 -->
    <!-- 频道推荐开始 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        icon="plus"
        center
        class="grid-item"
        v-for="value in 8"
        :key="value"
        text="文字"
      />
    </van-grid>
    <!-- 频道推荐结束 -->
  </div>
</template>
<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getAllChannels } from '@/api/channel'
export default {
  // 此组件的名称
  name: 'ChannelEdit',
  // import 引入的组件需要注入到对象中才能使用,通常我们说的注册组件下载下方
  components: {},
  // 父传子在下面prpps中接收,可接收数组或者具体某个值
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    // 这里存放数据
    return {
      allChannels: []
    }
  },
  // 计算属性 类似于 data 概念
  computed: {
    recommendChannels: {
      set (value) {},
      get () {
        const channels = [] // 定义一个推荐频道的数组
        this.allChannels.forEach((channel) => {
          const res = this.myChannels.find((myChannel) => {
            return myChannel.id === channel.id
          })
          if (!res) {
            channels.push(channel)
          }
        })
        return channels
      }
    }
  },
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
        console.log(this.allChannels)
      } catch (error) {
        this.$toast('获取所有频道失败' + error.message)
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前 this 实例）
  created () {
    this.loadAllChannels()
  },
  // 生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted () {},
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有 keep-alive 缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border-color: #f85959;
  }
  .grid-item {
    width: 160px;
    height: 86px;

    /deep/.van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;

      .van-grid-item__text,
      .text {
        font-size: 28px;
        margin-top: 0;
        color: #222;
      }
      .active {
        color: #cc3c3c;
      }
    }
  }
  .my-grid {
    /deep/.van-grid-item__icon {
      position: absolute;
      top: -14px;
      right: -34px;
      font-size: 28px;
      color: #666666;
      z-index: 2;
    }
  }
  .recommend-grid {
    vertical-align: middle;
    .grid-item {
      /deep/.van-grid-item__content {
        flex-direction: row;

        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
