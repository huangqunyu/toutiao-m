<template>
  <div class="update-name">
    <!-- 顶部导航栏开始 -->
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <!-- 顶部导航栏结束 -->
    <!-- 文本输入框开始 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>

    <!-- 文本输入框结束 -->
  </div>
</template>
<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// 引入更新用户资料的接口
import { updateUserProfile } from '@/api/user'
export default {
  // 此组件的名称
  name: 'UpdateName',
  // import 引入的组件需要注入到对象中才能使用,通常我们说的注册组件写在components: {}里面
  components: {},
  // 父传子在下面prpps中接收,可接收数组或者具体某个值
  props: {
    value: {
      type: String,
      requied: true
    }
  },
  data () {
    // 这里存放数据
    return {
      localName: this.value
    }
  },
  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onConfirm () {
      this.$toast.loading({
        // 提示的文字
        message: '保存中...',
        // 禁止背景点击
        forbidClick: true,
        // 持续时间    0是持续展示
        duration: 0
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        await updateUserProfile({
          name: localName
        })
        // 关闭弹层
        this.$emit('close')
        // 更新视图
        this.$emit('input', localName)

        // 提示成功
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前 this 实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted () {},
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有 keep-alive 缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
.update-name /deep/.van-nav-bar__content {
  background-color: #fff !important;
  color: black;

  .van-nav-bar__title {
    color: black !important;
  }
}
.field-wrap {
  padding: 20px;
}
</style>
s
