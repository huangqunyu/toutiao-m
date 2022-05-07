<template>
  <div class="search-container">
    <!-- 顶部搜索栏开始 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 顶部搜索栏结束 -->
    <!-- 搜索结果开始 -->
    <SearchResult v-if="isResultShow" :search-text="searchText"></SearchResult>
    <!-- 搜索结果结束 -->

    <!-- 联想建议开始 -->
    <SearchSuggestion
      @search="onSearch"
      v-else-if="searchText"
      :search-text="searchText"
    ></SearchSuggestion>
    <!-- 联想建议结束 -->

    <!-- 顶部搜索栏结束 -->
    <!-- 搜索历史记录开始 -->
    <SearchHistory
      v-else
      :search-histories="searchHistories"
      @clear-search-histories="searchHistories = []"
      @search="onSearch"
    ></SearchHistory>

    <!-- 搜索历史记录结束 -->
  </div>
</template>
<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import SearchHistory from "./components/search-history.vue";
import SearchSuggestion from "./components/search-suggestion.vue";
import SearchResult from "./components/search-result.vue";
import { setItem, getItem } from "@/utils/storage";
export default {
  // 此组件的名称
  name: "SearchIndex",
  // import 引入的组件需要注入到对象中才能使用,通常我们说的注册组件下载下方
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  // 父传子在下面prpps中接收,可接收数组或者具体某个值
  props: {},
  data() {
    // 这里存放数据
    return {
      searchText: "",
      //  控制搜索结果的展示
      isResultShow: false,
      searchHistories: getItem("TOUTIAO_SEARCH_HISTORIES") || [],
    };
  },
  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {
    searchHistories: {
      handler(val) {
        console.log("1");
        setItem("TOUTIAO_SEARCH_HISTORIES", val);
      },
    },
  },
  // 方法集合
  methods: {
    onSearch(val) {
      // 当触发了确定按钮或者点击了联想词，搜索词变成了我们点击的选项
      this.searchText = val;

      // 在数组中找有没有搜索过这个val
      const index = this.searchHistories.indexOf(val);
      // 如果搜索过，就删除这个搜索过的词
      if (index !== -1) {
        this.searchHistories.splice(index, 1);
      }
      // 然后无论搜没搜索过，都将搜索的词放入搜索历史记录数组的最前面
      this.searchHistories.unshift(val);
      // 渲染搜索结果组件
      this.isResultShow = true;
    },
    onCancel() {
      console.log("取消");
      this.$router.back();
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
<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
