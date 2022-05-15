<template>
  <div class="update-photo">
    <img class="img" :src="img" alt="" ref="img" />

    <!-- 定义一个工具栏 -->
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// 引入修改头像的接口
import { updateUserPhoto } from "@/api/user";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
export default {
  //此组件的名称
  name: "UpdatePhoto",
  //import 引入的组件需要注入到对象中才能使用,通常我们说的注册组件写在components: {}里面
  components: {},
  //父传子在下面prpps中接收,可接收数组或者具体某个值
  props: {
    img: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    //这里存放数据
    return {
      cropper: null,
    };
  },
  //计算属性 类似于 data 概念
  computed: {},
  //监控 data 中的数据变化
  watch: {},
  //方法集合
  methods: {
    async onConfirm() {
      // 基于服务端的裁切用getData()
      // 基于客户端的裁切用getCroppedCanvas()，获取裁切的文件对象
      // console.log(this.cropper.getData());
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        return this.updateUserPhoto(blob);
      });
    },
    async updateUserPhoto(blob) {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
        duration: 0,
      });

      try {
        // 根据接口我们知道，我们必须传一个formData类型的数据
        // 所以我们需要创建一个formData类型的对象
        const formData = new FormData();
        // 往里面放入一个数据
        formData.append("photo", blob);
        // 调用接口传递数据
        const { data } = await updateUserPhoto(formData);
        // console.log(data);
        // 关闭弹出层
        this.$emit("close");
        // 更新视图
        this.$emit("update-photo", data.data.photo);
        // 提示更新成功
        this.$toast.success("更新成功");
      } catch (error) {
        this.$toast.fail("更新失败");
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前 this 实例）
  created() {},
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      // 只能在画布里面
      viewMode: 1,
      // 拖动模式
      dragMode: "move",
      // 纵横比
      aspectRatio: 1,
      // 自动裁剪区域
      autoCropArea: 1,
      cropBoxMovable: false,
      // 截图区域额缩放
      cropBoxResizable: false,
      // 默认背景不需要
      background: false,
      // 画布是否可以移动
      movable: true,
    });
  },
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
.update-photo {
  background-color: #000;
  height: 100%;
  .img {
    display: block;
    max-width: 100%;
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;

    .cancel,
    .confirm {
      width: 120px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>
