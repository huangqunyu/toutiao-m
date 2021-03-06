<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>

    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- 复用关注用户的组件 -->
          <!-- 下方的$event是事件参数，子组件传过来的值我们要用到
              正常写法是声明一个方法，方法里面用形参
              但是节约代码时，形参由于没有声明，形参的值就是$event这个事件参数  -->
          <!-- 当我们传递给子组件的数据既要用也要改

                传递:props
                :is-followed="article.is_followed"

                修改：自定义事件
                @update-follower="article.is_followed = $event"

                简写方式：在组件上使用v-model
                v-model="article.is_followed"

                会给子组件传递value的数据，数据是value的值
                value="article.is_followed"

                同时会监听input事件
                @input='article.is_followed=$event'

                1、子组件原先接受的值要改为现在v-model的value
                2、把原先子组件监听的事件改为监听input


                如果需要修改  v-model 的规则名称，可以通过子组件的model属性来配置
                如果 有多个数据需要实现类似于 v-model 的效果，可以使用属性
                  -->
          <FollowUser
            class="follow-btn"
            v-model="article.is_followed"
            :user-id="article.aut_id"
          ></FollowUser>

          <!-- /复用关注用户的组件 -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          v-html="article.content"
          class="article-content markdown-body"
          ref="article-content"
        >
          这是文章内容
        </div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论列表组件复用 -->
        <!-- 把文章的ID传递到评论的子组件中 -->
        <CommentList
          :list="commentList"
          :source="article.art_id"
          @onload-success="totalCommentCount = $event.total_count"
          @reply-click="onReplyClick"
        ></CommentList>
        <!-- /文章评论列表组件复用 -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
            >写评论</van-button
          >
          <!-- 徽标 -->
          <van-icon name="comment-o" :badge="totalCommentCount" color="#777" />
          <!-- <van-icon color="#777" name="star-o" /> -->
          <!-- 收藏组件的复用 -->
          <CollectArticle
            v-model="article.is_collected"
            :article-id="article.art_id"
          ></CollectArticle>
          <!-- /收藏组件的复用 -->
          <LikeArticle
            v-model="article.attitude"
            :article-id="article.art_id"
          ></LikeArticle>
          <!-- 点赞组件复用 -->
          <!-- /点赞组件复用 -->

          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 发布评论弹出层开始 -->
        <van-popup v-model="isPostShow" position="bottom">
          <CommentPost
            :target="article.art_id"
            @post-success="onPostSuccess"
          ></CommentPost>
        </van-popup>
        <!-- 发布评论弹出层结束 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errorStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论回复弹出层开始 -->
    <!-- 弹出层是蓝渲染的：
        只有在第一次展示的时候才会渲染里面的内容，
        之后它的关闭和显示都是在切换内容的显示和隐藏  -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 86%">
      <!-- v-if 条件渲染
              true:渲染元素节点
              false:不渲染     
        -->
      <CommentReplay
        v-if="isReplyShow"
        :comment="currentComment"
        @close="isReplyShow = false"
      ></CommentReplay>
    </van-popup>

    <!-- 评论回复弹出层结束 -->
  </div>
</template>

<script>
import { getArticleById } from "@/api/acticle";
import { ImagePreview } from "vant";
// 引入关注组件
import FollowUser from "@/components/follow-user";
// 引入收藏组件
import CollectArticle from "@/components/collect-article";
// 引入点赞组件
import LikeArticle from "@/components/like-article";
// 引入文章评论组件
import CommentList from "./components/comment-list.vue";
// 引入文章评论的弹出层
import CommentPost from "./components/comment-post.vue";
// 引入评论回复组件
import CommentReplay from "./components/comment-replay.vue";

export default {
  name: "ArticleIndex",
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReplay,
  },
  // 依赖注入
  // 给所有的后台组件提供数据
  // 后台组件需要自行决定需不需要接收
  provide: function () {
    return {
      articleId: this.articleId,
    };
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      // 文章详情
      article: {},
      //  加载中的loading状态
      loading: true,
      //失败的情况变量
      errorStatus: 0,
      totalCommentCount: 0,
      // 弹出层的变量，控制弹出层显示和隐藏
      isPostShow: false,
      // 评论列表
      commentList: [],
      // 评论回复弹出层，控制弹出层的显示与隐藏
      isReplyShow: false,
      // 当前点击回复的评论项
      currentComment: {},
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticle();
  },
  mounted() {},
  methods: {
    async loadArticle() {
      this.loading = true;
      try {
        //   1、获取文章详情数据
        const { data } = await getArticleById(this.articleId);

        // 模拟加载失败（不是404）
        // if (Math.random() > 0.5) {
        //   JSON.parse("ssssssss");
        // }

        //
        this.article = data.data;
        // console.log(this.article);
        // 请求成功,关闭loading
        // this.loading = false;

        // 初始化图片点击预览
        setTimeout(() => {
          this.previewImage();
        }, 0);

        // console.log(this.$refs.article - content);
      } catch (error) {
        // this.loading = false;
        if (error.response && error.response.status === 404) {
          this.errorStatus = 404;
        }
        this.$toast("获取文章详情失败");
      }
      //   无论获取文章详情成功还是失败，都需要关闭loading
      this.loading = false;
    },
    previewImage() {
      // 得到所有的image节点
      const articleContent = this.$refs["article-content"];
      const imgs = articleContent.querySelectorAll("img");
      // console.log(imgs);
      // 声明一个数组，存放图片的url,
      const images = [];
      // 遍历dom元素上的img节点，遍历到的全部放入这个定义的images数组，并且绑定点击事件，调用vant的eImagePreview
      imgs.forEach((img, index) => {
        images.push(img.src);
        img.onclick = () => {
          ImagePreview({
            // images: images,
            // es6简写如下
            images,
            // 起始位置，我从哪个图片开始预览,初始是从0开始，不是1开始
            // 点了哪个图片，就从那个图片开始，比如10个图片，我点的3图片，图片显示就是从3/10开始
            startPosition: index,
          });
        };
      });
    },
    onPostSuccess(data) {
      // 弹出层关闭
      this.isPostShow = false;
      // 把数据渲染到评论列表的最上方
      this.commentList.unshift(data.new_obj);
      this.totalCommentCount++;
    },

    // 点击评论列表项中的回复，控制弹出层的显示与隐藏
    onReplyClick(comment) {
      this.currentComment = comment;
      this.isReplyShow = true;
    },
  },
};
</script>

<style scoped lang="less">
// 引入github-markdown.css文件
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
