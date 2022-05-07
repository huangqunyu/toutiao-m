<template>
  <div class="box">
    <van-button @click="onLike" :loading="loading">
      <van-icon v-if="value === 1" color="#e5645f" name="good-job" />
      <van-icon v-else name="good-job-o" />
    </van-button>
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { addLike, deleteLike } from "@/api/acticle";
export default {
  //此组件的名称
  name: "LikeArticle",
  //import 引入的组件需要注入到对象中才能使用,通常我们说的注册组件写在components: {}里面
  components: {},
  //父传子在下面prpps中接收,可接收数组或者具体某个值
  props: {
    value: {
      type: Number,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    //这里存放数据
    return {
      loading: false,
    };
  },
  //计算属性 类似于 data 概念
  computed: {},
  //监控 data 中的数据变化
  watch: {},
  //方法集合
  methods: {
    async onLike() {
      this.loading = true;
      try {
        let status = -1;
        if (this.value === 1) {
          //   确认已点赞，我们需要取消点赞
          await deleteLike(this.articleId);
        } else {
          // 确认没有点赞，我们需要点赞
          await addLike(this.articleId);
          status = 1;
        }
        this.$emit("input", status);
        this.$toast.success(status === 1 ? "点赞成功" : "取消点赞");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail("登录后才可以点赞");
        } else {
          this.$toast.fail("点赞失败,请重试");
        }
      }
      this.loading = false;
    },
  },
  //生命周期 - 创建完成（可以访问当前 this 实例）
  created() {},
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
<style lang="less" scoped>
.van-button--default {
  font-size: 40px;
  border: 0px solid #fff;
}
.box {
  width: 60px;
}
.van-button--normal {
  padding: 0 10px 50px 15px;
}
.van-icon {
  margin: 0;
}
</style>
