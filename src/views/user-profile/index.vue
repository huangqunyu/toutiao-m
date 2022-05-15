<template>
  <div class="user-profile">
    <!-- 顶部导航栏开始 -->
    <van-nav-bar title="个人信息">
      <van-icon slot="left" name="arrow-left" @click="$router.back()" />
    </van-nav-bar>
    <!-- 顶部导航栏结束 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 个人信息开始 -->
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      @click="isUpdateNameShow = true"
      title="昵称"
      :value="user.name"
      is-link
    />
    <van-cell
      title="性别"
      @click="isUpdateGenderShow = true"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
    />
    <van-cell
      title="生日"
      @click="isUpdateBirthdayShow = true"
      :value="user.birthday"
      is-link
    />
    <!-- 个人信息结束 -->

    <!-- 编辑头像的弹出层开始 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height: 100%"
    >
      <!-- 头像编辑的组件 -->
      <UpdatePhoto
        v-if="isUpdatePhotoShow"
        :img="img"
        @close="isUpdatePhotoShow = false"
        @update-photo="user.photo = $event"
      ></UpdatePhoto
    ></van-popup>
    <!-- 编辑头像的弹出层结束 -->

    <!-- 编辑昵称的弹出层开始 -->
    <van-popup
      v-model="isUpdateNameShow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <!-- 使用封装好的组件开始 -->
      <UpdateName
        v-if="isUpdateNameShow"
        v-model="user.name"
        @close="isUpdateNameShow = false"
      ></UpdateName>
      <!-- 使用封装好的组件结束 -->
    </van-popup>
    <!-- 编辑昵称的弹出层结束 -->

    <!-- 编辑性别的弹出层开始 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <!-- 此处调用封装好的编辑性别的组件开始 -->
      <UpdateGender
        v-if="isUpdateGenderShow"
        v-model="user.gender"
        @close="isUpdateGenderShow = false"
      ></UpdateGender>
      <!-- 此处调用封装好的编辑性别的组件结束 -->
    </van-popup>
    <!-- 编辑性别的弹出层结束 -->
    <!-- 编辑生日的弹出层开始 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <UpdateBirthday
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
        @close="isUpdateBirthdayShow = false"
      ></UpdateBirthday>
    </van-popup>
    <!-- 编辑生日的弹出层结束 -->
  </div>
</template>
<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// 引入获取当前用户资料的接口
import { getUserProfile } from "@/api/user";
// 引入修改用户性别的组件
import UpdateGender from "./components/update-gender.vue";
// 引入修改昵称的组件
import UpdateName from "./components/update-name.vue";
// 引入修改生日的组件
import UpdateBirthday from "./components/update-birthday.vue";
// 引入修改头像的组件
import UpdatePhoto from "./components/update-photo.vue";
export default {
  // 此组件的名称
  name: "UserProfile",
  // import 引入的组件需要注入到对象中才能使用,通常我们说的注册组件写在components: {}里面
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto,
  },
  // 父传子在下面prpps中接收,可接收数组或者具体某个值
  props: {},
  data() {
    // 这里存放数据
    return {
      // 声明一个空对象，用于存放用户的个人信息
      user: {},
      // 控制编辑头像的弹出层显示和隐藏
      isUpdatePhotoShow: false,
      // 控制编辑昵称的弹出层显示和隐藏
      isUpdateNameShow: false,
      // 控制编辑性别的弹出层的显示和隐藏
      isUpdateGenderShow: false,
      // 控制编辑生日的弹出层的显示和隐藏
      isUpdateBirthdayShow: false,
      // 定义一个img的变量，用于接受用户选择的图片的地址
      img: "",
    };
  },
  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile();

        this.user = data.data;
      } catch (error) {
        console.log("获取失败，请重试" + error);
        this.$toast.fail("获取用户数据失败");
      }
    },
    // 头像input的change事件
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0];
      // 基于文件对象获取blob数据
      this.img = window.URL.createObjectURL(file);
      // 展示预览图片弹出层
      this.isUpdatePhotoShow = true;

      // file-input 如果选了同一个文件，不会触发change事件
      // 解决办法：每次使用完毕，清空value
      this.$refs.file.value = "";
    },
  },
  // 生命周期 - 创建完成（可以访问当前 this 实例）
  created() {
    this.loadUserProfile();
  },
  // 生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有 keep-alive 缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.user-profile {
  /deep/.van-nav-bar__content {
    background-color: #5babfb;

    .van-nav-bar__title {
      color: #fff;
    }

    .van-icon-arrow-left {
      font-size: 35px;
      color: #fff;
    }
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-cell {
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
