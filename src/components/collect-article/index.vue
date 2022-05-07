<template>
  <div class="box">
    <van-button @click="onCollect" :loading="loading">
      <van-icon v-if="value" color="#ffa500" name="star" />
      <van-icon v-else name="star-o" />
    </van-button>
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { addCollect, deleteCollect } from "@/api/acticle";
export default {
  //此组件的名称
  name: "CollectArticle",
  //import 引入的组件需要注入到对象中才能使用,通常我们说的注册组件写在components: {}里面
  components: {},
  //父传子在下面prpps中接收,可接收数组或者具体某个值
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    articleId: {
      type: [String, Number, Object],
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
    async onCollect() {
      this.loading = true;
      try {
        if (this.value) {
          // 当已经收藏了，点击时需要取消收藏
          await deleteCollect(this.articleId);
        } else {
          // 没有收藏，点击时需要收藏
          await addCollect(this.articleId);
        }
        // 当添加收藏或者取消收藏后，我们需要把页面的视图更新
        this.$emit("input", !this.value);
        this.$toast.success(this.value ? "取消收藏" : "收藏成功");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail("登录后才可以收藏");
        } else {
          this.$toast.fail("收藏失败,请重试");
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
.box {
  width: 60px;
}
.van-button--default {
  font-size: 40px;
  border: 0px solid #fff;
}
.van-button--normal {
  padding: 0 10px 50px 20px;
}
.van-icon {
  margin: 0;
}
</style>
