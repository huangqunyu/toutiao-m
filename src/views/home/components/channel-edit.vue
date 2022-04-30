<template>
  <div class="channel-edit">
    <!-- 我的频道开始 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        @click="isEdit = !isEdit"
        class="edit-btn"
        round
        type="danger"
        plain
        size="mini"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <!-- 拿到我的频道用户数据，然后循环遍历渲染数据 -->
      <van-grid-item
        @click="onMyChannelClick(obj, index)"
        center
        class="grid-item"
        v-for="(obj, index) in myChannels"
        :key="obj.id"
      >
        <!-- 插槽：右上角叉叉 -->
        <van-icon
          v-show="isEdit && !fiexdChannels.includes(obj.id)"
          slot="icon"
          name="clear"
          cla
        ></van-icon>
        <!-- 判断点击的频道是否和我们当前频道索引一致，一样就附加一个样式类名叫：active -->
        <span class="text" :class="{ active: index === active }" slot="text">{{
          obj.name
        }}</span></van-grid-item
      >
    </van-grid>
    <!-- 我的频道结束 -->
    <!-- 频道推荐开始 -->
    <van-cell :border="false" class="recommend-cell">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        icon="plus"
        center
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
    <!-- 频道推荐结束 -->
  </div>
</template>
<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

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
      allChannels: [],
      isEdit: false, // 控制编辑状态的显示与隐藏
      fiexdChannels: [0, 1]
    }
  },
  // 计算属性 类似于 data 概念
  computed: {
    ...mapState(['user']),
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
      } catch (error) {
        this.$toast('获取所有频道失败' + error.message)
      }
    },
    // 点击频道推荐 添加到我的频道
    async onAddChannel (channel) {
      // this.myChannels.push(channel);
      this.$emit('updatauserChannels', channel)
      // console.log(this.myChannels);

      if (this.user) {
        // 已登录，更新到线上
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length
          })
        } catch (error) {
          this.$toast('保存失败，请稍后重试' + error.message)
        }
      } else {
        // 未登录，更新到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    // 点击我的频道内容，删除频道
    onMyChannelClick (channel, index) {
      // console.log(channel, index);
      // 如果是编辑状态则执行删除操作
      // 如果是非编辑状态则执行切换频道
      if (this.isEdit) {
        if (this.fiexdChannels.includes(channel.id)) {
          return
        }
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, this.isEdit)
        }
        this.$emit('delmyChannels', index)
        // this.myChannels.splice(index, 1);

        // 处理持久化
        this.deleteChannel(channel.id)
      } else {
        this.$emit('update-active', index)
      }
    },
    async deleteChannel (id) {
      if (this.user) {
        // 已登录，则将数据更新到线上
        try {
          await deleteUserChannel(id)
        } catch (error) {
          this.$toast('操作失败，请稍后重试' + error.message)
        }
      } else {
        // 未登陆，将数据更新到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
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
  padding: 100px 0;

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
    /deep/.van-grid-item__icon-wrapper {
      position: unset;

      .van-icon-clear {
        position: absolute;
        top: -14px;
        right: -34px;
        font-size: 28px;
        color: #666666;
        z-index: 2;
      }
    }
  }
  .recommend-cell {
    margin-top: 50px;
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
