<template>
  <div class="search-suggestion">
    <van-cell
      v-show="isShow"
      v-for="(text, index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>
<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getSearchSuggestions } from "@/api/search";
// 按需加载lodash包中的debounce函数，用于防抖
import { debounce } from "lodash";
export default {
  // 此组件的名称
  name: "SearchSuggestion",
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
      // 联想建议词数据列表存放在这里
      suggestions: [],
      isShow: true,
    };
  },
  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {
    searchText: {
      //   当searchText发生改变时，就会调用这个handler函数
      //   注意：handler  函数名称是固定的
      // debounce函数
      // 参数1：一个需要用到防抖的函数
      // 参数2：延迟时间，单位毫秒
      // 返回值：防抖之后的函数
      handler: debounce(function (val) {
        this.loadSearchSuggestions(val);
      }, 300),
      // handler(val) {
      //   // 调用封装好的获取联想词的方法
      //   this.loadSearchSuggestions(val);
      //   // console.log(val);
      // },
      //  配置了这个后，该回调将会在侦听开时候被立即调用
      immediate: true,
    },
  },
  // 方法集合
  methods: {
    // 封装了一个方法，用于获取联想词
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestions(q);
        this.suggestions = data.data.options;
        // console.log(this.suggestions);
      } catch (error) {
        this.$toast("获取联想词失败" + error.message);
      }
    },
    // 高亮的函数,返回给v-html
    highlight(text) {
      const highlightStr = `<span style="color:red">${this.searchText}</span>`;
      // 正则表达式中的//中间的内容都会当做匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动new RegExp 构造函数
      // RegExp正则表达式
      // 参数1：匹配模式字符串或者变量，他会根据字符串创建正则表达式
      // 参数2：匹配模式，要写到字符串中

      const reg = new RegExp(this.searchText, "gi");
      if (text == null) {
        return (this.isShow = false);
      }
      return text.replace(reg, highlightStr);
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
