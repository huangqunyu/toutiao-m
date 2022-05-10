<template>
  <div class="comment-replay">
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <!-- 用一个滚动的div包裹住内容 -->
    <div class="scroll-wrap">
      <!-- 当前评论项开始 -->
      <CommentItem :comment="comment"></CommentItem>
      <!-- 当前评论项结束 -->
      <!-- 评论的回复列表开始 -->
      <van-cell title="全部回复"></van-cell>
      <CommentList
        :source="comment.com_id"
        type="c"
        :list="commentList"
      ></CommentList>
      <!-- 评论的回复列表结束 -->
    </div>
    <!-- 发布评论开始 -->
    <div class="post-wrap">
      <van-button class="post-btn" round size="small" @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- 发布评论结束 -->
    <!-- 发布评论的弹出层开始 -->
    <van-popup v-model="isPostShow" position="bottom">
      <CommentPost
        :target="comment.com_id"
        @post-success="onPostSuccess"
      ></CommentPost>
    </van-popup>

    <!-- 发布评论的弹出层结束 -->
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// 加载评论项组件
import CommentItem from "./comment-item.vue";
// 加载评论别表组件，因为和评论回复样子一样，所以可以复用
import CommentList from "./comment-list.vue";
// 引入发布回复评论的组件
import CommentPost from "./comment-post.vue";
export default {
  //此组件的名称
  name: "CommentReplay",
  //import 引入的组件需要注入到对象中才能使用,通常我们说的注册组件写在components: {}里面
  components: {
    CommentItem,
    CommentList,
    CommentPost,
  },
  //父传子在下面prpps中接收,可接收数组或者具体某个值
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    //这里存放数据
    return {
      isPostShow: false,
      commentList: [], //评论的回复列表
    };
  },
  //计算属性 类似于 data 概念
  computed: {},
  //监控 data 中的数据变化
  watch: {},
  //方法集合
  methods: {
    onPostSuccess(data) {
      // 更新回复的数量
      this.comment.reply_count++;
      // 关闭弹层
      this.isPostShow = false;
      // 将最新回复内容展示到列表顶部
      this.commentList.unshift(data.new_obj);
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
.scroll-wrap {
  position: fixed;
  top: 320px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    font-size: 28px;
    width: 60%;
  }
}
</style>
