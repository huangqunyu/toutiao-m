<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        class="like-btn"
        @click="onCommentLike"
        :loading="commentLoading"
        :class="{ liked: comment.is_liking }"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
      >
        {{ comment.like_count > 0 ? comment.like_count : "赞" }}</van-button
      >
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          comment.pubdate | relativeTime
        }}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('reply-click', comment)"
          >回复 {{ comment.reply_count }}</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
// 把对评论或评论回复点赞、取消对评论或评论回复点赞   两个接口引入进来
import { addCommentLike, deleteCommentLike } from "@/api/comment";
export default {
  name: "CommentItem",
  components: {},
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      commentLoading: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 对评论或评论回复点赞或者取消功能
    async onCommentLike() {
      this.commentLoading = true;
      try {
        // 判断当前的点赞状态
        if (this.comment.is_liking) {
          // 如果是true,就是已经点赞了，那我们需要取消点赞
          await deleteCommentLike(this.comment.com_id);

          this.comment.like_count--;
          this.$toast.success("已取消点赞");
        } else {
          // 如果是false，就是没有点赞，那我们需要点赞操作
          await addCommentLike(this.comment.com_id);

          this.comment.like_count++;
          this.$toast.success("已点赞");
        }
        this.comment.is_liking = !this.comment.is_liking;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail("您需要登陆后才能进行操作");
        } else {
          this.$toast.fail("操作失败，请重试");
        }
      }
      this.commentLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
.comment-item {
  .van-icon {
    margin-right: 5px;
  }
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 150px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.liked {
      color: #e5645f;
    }
  }
}
</style>
