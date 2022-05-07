<template>
  <!-- 已按钮-点击取消关注 -->
  <van-button
    :loading="loading"
    v-if="value"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    >已关注</van-button
  >

  <!-- 未关注按钮，点击关注 -->
  <van-button
    v-else
    :loading="loading"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    >关注</van-button
  >
</template>
<script>
//这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { addFollow, deleteFollow } from "@/api/user";
export default {
  //此组件的名称
  name: "FollowUser",
  //import 引入的组件需要注入到对象中才能使用,通常我们说的注册组件写在components: {}里面
  components: {},
  //父传子在下面prpps中接收,可接收数组或者具体某个值
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: [Number, String, Object],
      reequired: true,
    },
  },
  data() {
    //这里存放数据
    return {
      // 按钮的加载状态
      loading: false,
    };
  },
  //计算属性 类似于 data 概念
  computed: {},
  //监控 data 中的数据变化
  watch: {},
  //方法集合
  methods: {
    // onFollow
    async onFollow() {
      this.loading = true;
      try {
        if (this.value) {
          await deleteFollow(this.userId);

          this.$toast("已取消关注");
        } else {
          await addFollow(this.userId);

          this.$toast("已关注");
        }
        // 更新视图
        // 改为v-model双向绑定时，监听的就不是我们的自定义事件了，改为监听input
        // this.$emit("update-follower", !this.value);
        this.$emit("input", !this.value);
        // 由于这个isfollowed是父组件传过来的，不能在子组件内自己修改，需要调用$emit()
        // this.isFollowed = !this.isFollowed;
      } catch (error) {
        let message = "操作失败,请重试";
        if (error.response && error.response.status === 400) {
          message = "您是这篇文章作者,不能自己关注自己";
        } else if (error.response && error.response.status === 401) {
          message = "成功登录后才能关注";
        }

        this.$toast(message);
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
.van-icon-plus {
  margin-right: 0;
}
</style>
