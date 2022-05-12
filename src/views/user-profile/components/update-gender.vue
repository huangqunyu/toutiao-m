<template>
  <div class="update-gender">
    <van-picker
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onPickerChange"
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
    />
  </div>
</template>
<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// 引入更新用户资料的接口
import { updateUserProfile } from '@/api/user'
export default {
  // 此组件的名称
  name: 'UpdateGender',
  // import 引入的组件需要注入到对象中才能使用,通常我们说的注册组件写在components: {}里面
  components: {},
  // 父传子在下面prpps中接收,可接收数组或者具体某个值
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    // 这里存放数据
    return {
      columns: ['男', '女'],
      localGender: this.value
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
        const localGender = this.localGender
        await updateUserProfile({
          gender: localGender
        })

        // 关闭弹层
        this.$emit('close')
        //   更新视图
        this.$emit('input', localGender)
        // 弹窗提示
        this.$toast.success('保存成功！')
      } catch (error) {
        this.$toast.fail('保存失败')
      }
    },
    onPickerChange (picker, value, index) {
      this.localGender = index
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
<style lang="less" scoped></style>
