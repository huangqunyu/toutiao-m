<template>
  <!-- :to="'/article/' + article.art_id" -->
  <van-cell
    class="article-item"
    :to="{
      //根据路由名称进行跳转
      name: 'article',
      //传递路由动态参数
      params: {
        //属性名：路由路径中设计的动态参数名称
        articleId: article.art_id,
      },
    }"
  >
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <!-- 每个文章的底部标签开始 -->
    <div slot="label">
      <!-- 底部标签上层的三张图片 -->
      <!-- 当有3张图片则显示这个div -->
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <!-- 遍历每个文章图片个数，循环出几个内部装图片的容器 -->
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <!-- 循环出的每个数组图片放入vant的图片标签中，图片地址放入src中 -->
          <van-image class="cover-item-image" fit="cover" :src="img" />
        </div>
      </div>
      <!-- 底部标签下层的相关信息  -作者-评论数-时间 -->
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
      <!-- 文章底部标签结束 -->
    </div>
    <!-- 文章右侧图片开始 -->
    <van-image
      class="rigth-cover"
      v-if="article.cover.type === 1"
      slot="default"
      fit="cover"
      :src="article.cover.images[0]"
    />
    <!-- 文章右侧图片结束 -->
  </van-cell>
</template>
<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
export default {
  // 此组件的名称
  name: "ArticleItem",
  // import 引入的组件需要注入到对象中才能使用,通常我们说的注册组件下载下方
  components: {},
  // 父传子在下面prpps中接收,可接收数组或者具体某个值
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    // 这里存放数据
    return {};
  },
  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {},
  // 生命周期 - 创建完成（可以访问当前 this 实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有 keep-alive 缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    margin-left: 25px;

    .rigth-cover {
      width: 100%;
      height: 100%;
    }
  }
  .label-info-wrap span {
    margin-right: 25px;
    font-size: 22px;
    color: #b4b4b4;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:nth-child(2) {
        margin: 0 4px 0 4px;
      }

      .cover-item-image {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
