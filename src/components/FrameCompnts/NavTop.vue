<template>
  <div class="nav_top">
    <a
      href="/"
      class="logo"
      style="width: 4vw; height: 100%; transform: translateY(-2%)"
    >
      <img src="@/assets/img/bg/Jerry.jpeg" alt="logo" width="100%" height="" />
    </a>
    <a-tabs v-model:activeKey="activeKey" @tabClick="onChange">
      <a-tab-pane key="/" accesskey="home" tab="首页" />
      <a-tab-pane key="/article" accesskey="article" tab="文章" />
      <a-tab-pane key="/message" accesskey="message" tab="留言" />
      <a-tab-pane key="/link" accesskey="link" tab="友链" />
      <a-tab-pane key="/about" accesskey="about" tab="关于" />
      <template v-if="isAdmin">
        <a-tab-pane key="/admin" accesskey="admin" tab="管理" />
      </template>
    </a-tabs>
    <div @click="modal2Visible = true">
      <a-button v-if="!loginInfo?.user" type="primary" size="small"
        >登录/注册</a-button
      >
      <a-popover v-else placement="bottomRight">
        <template #content>
          <a-button type="primary" size="small" @click.stop="updateMsg"
            >修改信息</a-button
          >
          <a style="display: inline-block; width: 5px"></a>
          <a-button type="primary" size="small" danger @click.stop="logout"
            >退出登录</a-button
          >
        </template>
        <template #title>{{ loginInfo?.user }}</template>
        <a-avatar
          :src="loginInfo?.photo"
          :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }"
          style="cursor: pointer"
        />
      </a-popover>
    </div>
    <LoginModal
      :modal2Visible="modal2Visible"
      @update:modal2Visible="updateModal2Visible"
      @update:isLogin="updateIsLogin"
    />
  </div>
</template>
<script setup>
import { reactive, ref, watch } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import LoginModal from "./LoginModal.vue";
import { useStore, mapState, mapGetters } from "vuex";
const store = useStore();
const isAdmin = ref(true);
const tempInfo = JSON.parse(localStorage.getItem("loginInfo")) || {};
console.log(tempInfo, "tempInfo");
store.commit("setInfoLogin", tempInfo);
const loginInfo = reactive(store.state.infoLogin);
watch(
  () => store.state.infoLogin,
  (newVal) => {
    console.log(newVal, "watch");
    Object.assign(loginInfo, newVal);
  },
  { deep: true }
);
const activeKey = ref("home");
const router = useRouter();
const updateMsg = () => {
  router.push("/user");
};
const modal2Visible = ref(false);
const updateModal2Visible = (newVal) => {
  modal2Visible.value = newVal;
};
const updateIsLogin = (newVal) => {
  // console.log(newVal, "newValupdateIsLogin");
  // Object.assign(loginInfo, newVal);
  // Object.keys(newVal).forEach((key) => {
  //   loginInfo[key] = newVal[key];
  // });
};
const onChange = (key) => {
  switch (key) {
    case "home":
      router.push("/");
      break;
    default:
      router.push(key);
      break;
  }
};
const logout = () => {
  console.log(loginInfo, "退出登录触发了，，");
  localStorage.removeItem("loginInfo");
  store.commit("setInfoLogin", {});
  // 使用ref来创建响应式对象
  // // 或者使用reactive
  Object.keys(loginInfo).forEach((key) => {
    delete loginInfo[key];
  });
};
</script>
<style scoped lang="scss">
.nav_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18%;
  a {
    font-size: 2rem;
    letter-spacing: 0.2rem;
    font-family: Pacifico;
    color: rgba(0, 0, 0, 0.7);
    transform: translateY(-25%);
  }
  .ant-tabs {
    flex: 1;
    // ::v-deep .ant-tabs-nav-wrap {
    //   width: 100%;
    // }
    ::v-deep .ant-tabs-nav {
      margin: 0;
    }
    ::v-deep .ant-tabs-tab {
      flex: 1;
    }
    ::v-deep .ant-tabs-nav .ant-tabs-nav-list {
      width: 100%;
    }
    .ant-tabs-tab {
      flex: 1;
    }
    ::v-deep .ant-tabs-tab-btn {
      width: 100%;
    }
  }
}

h3 {
  margin: 40px 0 0;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
#components-popover-demo-placement .ant-btn {
  width: 70px;
  text-align: center;
  padding: 0;
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
