<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="加载失败，请重试"
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
import { getSearchResult } from "@/api/search";
export default {
  // 此组件的名称
  name: "SearchResult",
  // import 引入的组件需要注入到对象中才能使用,通常我们说的注册组件下载下方
  components: {},
  // 父传子在下面prpps中接收,可接收数组或者具体某个值
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    // 这里存放数据
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false,
    };
  },
  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onLoad() {
      try {
        // 1、请求获取数据
        const { data } = await getSearchResult({
          page: this.page, //页码
          per_page: this.per_page, //每页大小
          q: this.searchText, //搜索关键词
        });

        // 模拟加载失败的情况
        // if (Math.random() > 0.5) {
        //   JSON.parse("sadasdasdasd");
        // }

        // 2、将数据添加到数组列表中
        const { results } = data.data;
        this.list.push(...results);
        // 3、将本次加载中的loading 关闭
        this.loading = false;
        // 4、判断是否还有数据
        if (results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (error) {
        // 展示加载失败的体式状态
        this.error = true;
        // 加载失败了，loading也要关闭
        this.loading = false;
      }

      // 如果有，则更新获取下一个数据的页码
      // 如果没有，将加载状态 finished设置为结束
    },
  },
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
<style lang="less" scoped></style>
