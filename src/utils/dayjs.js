import dayjs from "dayjs";
import Vue from "vue";

// 引入相对时间的插件
import relativeTime from "dayjs/plugin/relativeTime";

// 加载中文语言包
import "dayjs/locale/zh-cn";
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime);
// dayjs 默认语言是英文,我们配置为中文
dayjs.locale("zh-cn"); // 全局使用

// dayjs()  这个的意思是获取当前最新时间
// dayjs().format('YY-MM-DD DDD HH:mm:ss')

// dayjs().to(dayjs('1990-01-01')) // 31 年前
Vue.filter("relativeTime", (value) => {
  return dayjs().to(dayjs(value));
});
