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
      <a-tab-pane key="/"  tab="首页" />
      <a-tab-pane key="/article"  tab="文章" />
      <a-tab-pane key="/message"  tab="留言" />
      <a-tab-pane key="/link"  tab="友链" />
      <a-tab-pane key="/about"  tab="关于" />
      <template v-if="isAdmin">
        <a-tab-pane key="/admin"  tab="管理" />
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
          <a-button size="small" danger @click.stop="logout"
            >退出登录</a-button
          >
        </template>
        <template #title>{{ loginInfo?.user }}</template>
        <a-avatar

          :src="$formatSRC(loginInfo?.photo)"

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
import { reactive, ref, watch, nextTick } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import LoginModal from "./LoginModal.vue";
import { useStore, mapState, mapGetters } from "vuex";
import { formatSrc } from '@/utils'
const store = useStore();
const isAdmin = ref(store.getters.isAdmin);
console.log(isAdmin.value, 'isAdmin');
const tempInfo = JSON.parse(localStorage.getItem("loginInfo")) || {};
store.commit("setInfoLogin", tempInfo);
const loginInfo = reactive(store.state.infoLogin);
const router = useRouter();
let activeKey = ref(store.state.activeKey);
watch(
  () => store.state.activeKey,
  (newVal) => {
    activeKey.value = newVal;
  }
);
watch(
  () => store.state.infoLogin,
  (newVal) => {
    Object.assign(loginInfo, newVal);
  },
  { deep: true }
);
watch(router.currentRoute, (newRoute) => {
  // 根据路由路径更新activeKey
  const key = newRoute.path;
  if (
    ["/", "/article", "/message", "/link", "/about"].includes(key)
  ) {
    store.commit("setActiveKey", key);
  }
  // 如果需要处理管理员路由，可以添加额外的逻辑
  if (!isAdmin.value && key === "/admin") {
    message.warning("您不是管理员");
    router.push("/");
  }
});

const updateMsg = () => {
  router.push("/user");
};
const modal2Visible = ref(false);
const updateModal2Visible = (newVal) => {
  modal2Visible.value = newVal;
};
const updateIsLogin = (newVal) => {
  // Object.assign(loginInfo, newVal);
  // Object.keys(newVal).forEach((key) => {
  //   loginInfo[key] = newVal[key];
  // });
};
const onChange = (key) => {
  router.push(key);
  store.commit("setActiveKey", "home");
};
const logout = () => {
  localStorage.removeItem("loginInfo");
  store.commit("setInfoLogin", {});
  // 使用ref来创建响应式对象
  // // 或者使用reactive
  Object.keys(loginInfo).forEach((key) => {
    delete loginInfo[key];
  });
  router.push("/");
  // store.commit("setActiveKey", "/");
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
    // transform: translateY(-25%);
  }
  .ant-tabs {
    flex: 1;
    // ::v-deep .ant-tabs-nav-wrap {
    //   width: 100%;
    // }
    :deep(.ant-tabs-nav ){
      margin: 0;
    }
    :deep(.ant-tabs-tab ){
      flex: 1;
    }
    :deep(.ant-tabs-nav .ant-tabs-nav-list ){
      width: 100%;
    }
    .ant-tabs-tab {
      flex: 1;
    }
    :deep(.ant-tabs-tab-btn ){
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
