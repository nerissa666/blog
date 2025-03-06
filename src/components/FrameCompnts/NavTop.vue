<template>
  <div class="nav_top">
    <a href="/">guixia</a>
    <a-tabs v-model:activeKey="activeKey" @change="onChange">
      <a-tab-pane key="home" tab="首页" />
      <a-tab-pane key="article" tab="文章" />
      <a-tab-pane key="message" tab="留言" />
      <a-tab-pane key="link" tab="友链" />
      <a-tab-pane key="about" tab="关于" />
      <template v-if="isAdmin">
        <a-tab-pane  key="admin" tab="管理" />
      </template>
    </a-tabs>
    <a-popover placement="bottomRight">
      <template #content>
        <a-button type="primary" size="small" @click.stop="updateMsg">修改信息</a-button>
        <a style="display: inline-block;width: 5px;"></a>
        <a-button type="primary" size="small" danger>退出登录</a-button>
      </template>
      <template #title>
      </template>
      <a-avatar
        src="https://www.antdv.com/assets/logo.1ef800a8.svg"
        :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }"
      />
    </a-popover>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const isAdmin = ref(true);
const activeKey = ref("home");
const router = useRouter();
const updateMsg = () => {
  router.push("/user");
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
