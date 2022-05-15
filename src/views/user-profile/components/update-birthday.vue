<template>
  <div class="update-birthday">
    <!-- 
        currentDate:双向绑定了日期选择器
            1、  设置日期选择器的默认值
            2、  同步日期选择器的选择的日期
        min-date:可选的最小日期
        max-date:可选的最大日期
       -->
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择生日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// 引入修改生日的接口
import { updateUserProfile } from "@/api/user";
// 引入修改时间的插件
import dayjs from "dayjs";
export default {
  //此组件的名称
  name: "UpdateBirthday",
  //import 引入的组件需要注入到对象中才能使用,通常我们说的注册组件写在components: {}里面
  components: {},
  //父传子在下面prpps中接收,可接收数组或者具体某个值
  props: {
    value: {
      type: String,
      reuqired: true,
    },
  },
  data() {
    //这里存放数据
    return {
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    };
  },
  //计算属性 类似于 data 概念
  computed: {},
  //监控 data 中的数据变化
  watch: {},
  //方法集合
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const currentDate = dayjs(this.currentDate).format("YYYY-MM-DD");
        const { data } = await updateUserProfile({
          birthday: currentDate,
        });
        // 关闭弹层
        this.$emit("close");
        // 更新视图
        this.$emit("input", currentDate);
        // 提示更新成功
        this.$toast.success("更新成功!");
      } catch (error) {
        this.$toast.fail("修改失败,请重试");
      }
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
<style lang="less" scoped></style>
