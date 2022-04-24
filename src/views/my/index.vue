<template>
  <div class="my-container">
    <div class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" /><span
          class="text"
          >登陆 / 注册</span
        >
      </div>
    </div>
    <div class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            round
            fit="cover"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <span class="name">黑马头条</span>
        </div>
        <div class="right">
        <van-button class="rigth-btn" round size="mini">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">粉丝</span>
          </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">获赞</span>
          </div>
      </div>
    </div>
    <!-- 宫格导航开始 -->
    <van-grid  class="grid-nav" :column-num="2" clickable>
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
    <van-cell  class="cell-return" title="退出登录" />
    </div>

    <!-- 消息通知、小智同学、退出登录结束 -->
  </div>
</template>

<script>
export default {
  name: 'MyIndex'
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

      .left{
        display: flex;
        align-items: center;
        .avatar{
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
        }
        .name{
          margin-left: 23px;
          font-size: 30px;
          color: #fff;
        }
      }
      .right{
        padding-bottom:30px ;
      }
    }
    .data-stats {
      display: flex;
      .data-item{
        flex: 1;
        display: flex;
        height: 130px;
        font-size: 20px;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;
        .count{
          font-size: 36px;
        }
        .text{
          margin-top: 5px;
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav{
    height: 141px;
    i.iconfont{
      font-size: 45px;
    }
      .icon-shoucang{
        color: #eb5253;
      }
      .icon-lishi{
        color: #ff9d1d;
      }
    span{
      margin-top: 10px;
    }
    span.text{
      font-size: 28px;
    }
  }
  .cellBox{
    margin-top: 50px;
    .cell-return{
      margin-top: 15px;
      text-align: center;
      color: #d86262;
    }
  }
}
</style>
