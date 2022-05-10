<template>
  <!-- 只有List 在可视范围内才会检查滚动位置 从而触发onLoad事件 -->
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false"
    :error.sync="error"
    error-text="加载失败,请点击重试"
  >
    <CommentItem
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click', $event)"
    ></CommentItem>
  </van-list>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// 引入获取文章评论接口
import { getComments } from "@/api/comment";
// 引入评论项组件
import CommentItem from "./comment-item.vue";
export default {
  //此组件的名称
  name: "CommentList",
  //import 引入的组件需要注入到对象中才能使用,通常我们说的注册组件写在components: {}里面
  components: {
    CommentItem,
  },
  //父传子在下面prpps中接收,可接收数组或者具体某个值
  props: {
    // 父组件传递过来的文章ID
    source: {
      type: [Number, String, Object],
      required: true,
    },
    list: {
      type: Array,
      // 给了个默认值,默认值需要用函数返回的形式写
      default: () => {
        return [];
      },
    },
    type: {
      type: String,
      // 自定义Prop数据验证
      // value是外部传入props type的值
      validator(value) {
        return ["a", "c"].includes(value);
      },
      default: "a",
    },
  },
  data() {
    //这里存放数据
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, //获取下一页数据的标记
      limit: 10,
      error: false,
    };
  },
  //计算属性 类似于 data 概念
  computed: {},
  //监控 data 中的数据变化
  watch: {},
  //方法集合
  methods: {
    async onLoad() {
      try {
        // 获取文章的评论和获取评论的回复是同一个缺口
        // 唯一的区别是接口参数不一样
        // type     如果是文章评论传递a  如果是评论回复则传递c
        //
        // source   如果获取的是文章id则传递文章id    如果是评论回复，则传递评论的id
        // 1、请求获取接口数据
        const { data } = await getComments({
          type: this.type, //获取文章评论 评论类型，a-对文章(article)的评论
          source: this.source.toString(), //源id，文章id或评论id
          offset: this.offset, //获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit, //获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        });

        // 2、将数据添加到列表中
        const { results } = data.data;

        // 判断是否有数据，有数据则把数据push，没有则直接finish

        this.list.push(...results);

        // 把评论的总数量传递给父组件

        this.$emit("onload-success", data.data);

        // 3、loading 设置为false
        this.loading = false;

        // 4、判断是否还有数据
        if (results.length) {
          //    有就更新获取下一页数据页码
          this.offset = data.data.last_id;
        } else {
          //    没有就finish设置为true
          this.finished = true;
        }
      } catch (error) {
        this.loading = false;
        this.error = true;
        console.log("6");
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前 this 实例）
  created() {
    // 由于徽标是在评论组件渲染出来后才知道有多少评论的，所以页面刚打开不显示评论数量，我们需要当页面昂打开就要调用评论加载
    // 当手动初始load的话，他不会自动开始初始loading
    // 所以我们要手动开启初始loading
    this.loading = true;
    this.onLoad();
  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有 keep-alive 缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped></style>
