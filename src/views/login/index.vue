<template>
  <div class="login">
    <!-- 导航栏开始 -->
    <van-nav-bar class="page-nav-bar" title="登陆">
      <!-- <i slot="left" class="iconfont icon-guanbi"></i> -->
      <van-icon
        name="arrow-left"
        slot="left"
        size="20"
        @click="$router.back()"
      />
    </van-nav-bar>
    <!-- 导航栏结束 -->
    <!-- 登陆表单开始 -->
    <!-- 表单验证：
          1、给van-field 组件配置 rules  验证规则
              验证规则参考文档
          2、当表单提交时，会触发表单验证，
              如果验证通过，会触发submit事件
              如果验证失败，则不会触发submit事件
      -->
    <van-form ref="loginForm" @submit="onSubmit">
      <!-- 手机号 -->
      <!-- 验证手机号 -->
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <template #left-icon>
          <i class="iconfont icon-shouji"></i>
        </template>
        <!-- <i slot="left-icon" class="iconfont icon-shouji"></i> -->
      </van-field>
      <!-- 验证码 -->
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <template #left-icon>
          <i class="iconfont icon-yanzhengma"></i>
        </template>
        <!-- 验证码按钮 -->
        <template #button>
          <!-- time就是倒计时时间 -->
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            native-type="button"
            class="send-sms-btn"
            round
            size="small"
            type="default"
            @click="onSendSms"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <!-- 登陆按钮 -->
      <div style="margin: 53px 33px 53px 33px">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登陆</van-button
        >
      </div>
    </van-form>
    <!-- 登陆表单结束 -->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '请输入正确的手机号'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能给空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false // 是否展示倒计时
    }
  },
  methods: {
    async onSubmit () {
      // 1、获取表单数据
      const user = this.user
      // 2、表单验证

      // 在组件中必须通过  this.$stoast  来调用 Toast  组件
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认是2000毫秒，如果为0，则持续展示
      })
      // 3、提交表单请求登陆
      try {
        const {
          data: { data }
        } = await login(user)
        this.$store.commit('setUser', data)
        this.$toast.success('登录成功')
        // 登陆成功后跳转回原页面
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          // console.log("手机号或验证码错误");
          this.$toast.fail('手机号或验证码错误')
        } else {
          console.log('登录失败,请稍后重试' + err)
          this.$toast.fail('登录失败,请稍后重试')
        }
      }

      // 4、根据请求响应结果处理后续结果
    },
    async onSendSms () {
      // 1、校检手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (error) {
        return console.log('验证失败' + error.message)
      }
      // 2、验证通过，显示倒计时例如60s
      this.isCountDownShow = true
      // 3、请求发送验证码
      try {
        const res = await sendSms(this.user.mobile)
        this.$toast('验证码发送成功')
        console.log(res)
      } catch (error) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast('发送验证码太频繁了，请稍后再试')
        } else {
          this.$toast('发送失败，请稍后再试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 37px;
}
.send-sms-btn {
  font-size: 22px;
  width: 152px;
  height: 46px;
  text-align: center;
  line-height: 46px;
  color: #666666;
  background-color: #ededed;
}

.login-btn {
  background-color: #6db4fb;
  border: none;
}

.van-field__control {
  color: #323233;
}
.van-count-down {
  margin: 14px 53px 10px 20px;
}
.icon-guanbi {
  color: #fff;
}
</style>
