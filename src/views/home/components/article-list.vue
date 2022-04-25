<template>
  <div class="article-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>
<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getArticle } from '@/api/acticle'
export default {
  // 此组件的名称
  name: 'ArticleList',
  // import 引入的组件需要注入到对象中才能使用
  components: {},
  // 父传子在下面prpps中接收,可接收数组或者具体某个值
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  data () {
    // 这里存放数据
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null // 请求获取下一页的时间戳
    }
  },
  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onLoad () {
      // 异步更新数据
      //  1、请求获取数据
      try {
        const {
          data: { data }
        } = await getArticle({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        // 2、把请求到的数据放入data的list中
        //   注意，因为我们需要加载后面的数据，并且前面的数据不能没有，所以我们需要用到push,把后面加载的数据push到前面的数据后面，我们这边用了数组结构的方法
        const { results } = data
        this.list.push(...results)

        // 3、本次数据加载完成以后需要把加载状态改为结束false
        // 加载状态结束
        this.loading = false

        // 4、判断数据是否全部加载完成，终止加载
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.pre_timestamp
        } else {
          // 没有数据时，将finished设置为true,不再加载onload事件加载更多了
          this.finished = true
        }
      } catch (error) {
        this.$toast('获取用户频道文章列表失败' + error.message)
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前 this 实例）
  created () {},
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
<style lang="less" scoped></style>
