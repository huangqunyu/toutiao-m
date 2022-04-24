<template>
  <div class="my-container">
    <!-- 用户已登录 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button class="rigth-btn" round size="mini">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 用户未登录 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" /><span
          class="text"
          >登陆 / 注册</span
        >
      </div>
    </div>

    <!-- 宫格导航开始 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 宫格导航结束 -->
    <!-- 消息通知、小智同学、退出登录开始 -->
    <div class="cellBox">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
      <van-cell
        v-if="user"
        clickable
        class="cell-return"
        title="退出登录"
        @click="onLogout"
      />
    </div>

    <!-- 消息通知、小智同学、退出登录结束 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  name: 'MyIndex',
  data () {
    return {
      userInfo: {}
    } // 用户信息
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 用户点击退出的弹窗
    onLogout () {
      this.$dialog
        .confirm({
          width: 300,
          title: '确认退出吗'
          // message: "弹窗内容",
        })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    // 记载用户信息
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (error) {
        this.$toast('获取用户数据失败' + error.message)
      }
    }
  },
  created () {
    // 如果vuex中拿到了用户的token信息，证明我们这边需要加载用户相关信息
    if (this.user) {
      this.loadUserInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    // background-color: pink;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        height: 132px;
        width: 132px;
      }
      .text {
        margin-top: 15px;
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;

      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
        }
        .name {
          margin-left: 23px;
          font-size: 30px;
          color: #fff;
        }
      }
      .right {
        padding-bottom: 30px;
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        flex: 1;
        display: flex;
        height: 130px;
        font-size: 20px;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          margin-top: 5px;
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    height: 190px;
    i.iconfont {
      font-size: 45px;
    }
    .icon-shoucang {
      color: #eb5253;
    }
    .icon-lishi {
      color: #ff9d1d;
    }
    span {
      margin-top: 10px;
    }
    span.text {
      font-size: 28px;
    }
  }
  .cellBox {
    // margin-top: 45px;
    .cell-return {
      margin-top: 15px;
      text-align: center;
      color: #d86262;
    }
  }
}
</style>
