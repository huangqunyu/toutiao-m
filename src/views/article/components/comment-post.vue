<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onPost" :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
// 引入发布评论或者对评论进行回复的接口
import { addComment } from "@/api/comment";
export default {
  name: "CommentPost",
  components: {},
  // 使用inject:这个选项来接受祖先组件传过来的值
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      this.$toast.loading({
        message: "发布中...",
        forbidClick: true, // 禁用背景点击
        duration: 0, // 持续时间，默认是2000毫秒，如果为0，则持续展示
      });

      try {
        const { data } = await addComment({
          target: this.target.toString(), //评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message, //评论的内容
          art_id: this.articleId ? this.articleId.toString() : null, //文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        });
        // 清空弹出层文本内容
        this.message = "";
        // 自定义一个事件，让父组件执行，顺带把我们成功评论返回回来的数据给父组件使用
        this.$emit("post-success", data.data, 1);
        this.$toast.success("发布成功");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail("登陆后才能发标评论");
        } else {
          this.$toast.fail("评论失败，请重试");
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
