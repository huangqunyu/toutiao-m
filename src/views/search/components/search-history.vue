<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span class="allDel" @click="$emit('clear-search-histories')"
          >全部删除</span
        >
        <span @click="isDeleteShow = false">完成</span>
      </div>

      <!-- 使用插槽-定义右侧删除图标 -->
      <van-icon v-else name="delete-o" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistories"
      :key="index"
      :title="item"
      @click="onSearchItemClick(item, index)"
    >
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>
<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
export default {
  // 此组件的名称
  name: "SearchHistory",
  // import 引入的组件需要注入到对象中才能使用,通常我们说的注册组件下载下方
  components: {},
  // 父传子在下面prpps中接收,可接收数组或者具体某个值
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    // 这里存放数据
    return {
      // 控制删除显示状态
      isDeleteShow: false,
    };
  },
  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
    onSearchItemClick(item, index) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1);
        // 删除状态,删除历史记录数据
      } else {
        this.$emit("search", item);
        //非删除状态，直接进入搜索
      }
    },
    delallsearchHistories() {
      this.$emit("delallsearchHistories");
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
.search-history {
  .allDel {
    padding-right: 20px;
  }
}
</style>
