<template>
  <div class="admin">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1">
        <template #tab>
          <span>
            <apple-outlined />
            发表文章
          </span>
        </template>
        <PublishArticle />
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #tab>
          <span>
            <android-outlined />
            文章管理
          </span>
        </template>
        <ArticleMange />
      </a-tab-pane>
      <a-tab-pane key="3">
        <template #tab>
          <span>
            <windows-outlined />
            添加友链
          </span>
        </template>
        <LinkAdd />
      </a-tab-pane>
      <a-tab-pane key="4">
        <template #tab>
          <span>
            <ie-outlined />
            友链管理
          </span>
        </template>
        <LinkMange />
      </a-tab-pane>
      <a-tab-pane key="5">
        <template #tab>
          <span>
            <aliwangwang-outlined />
            反馈收集
          </span>
        </template>
        <RequestCollection />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import PublishArticle from "@/components/AdminCompnts/PublishArticle.vue";
import ArticleMange from "@/components/AdminCompnts/ArticleMange.vue";
import LinkAdd from "@/components/AdminCompnts/LinkAdd.vue";
import LinkMange from "@/components/AdminCompnts/LinkMange.vue";
import RequestCollection from "@/components/AdminCompnts/RequestCollection.vue";
import {
  AppleOutlined,
  AndroidOutlined,
  WindowsOutlined,
  IeOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";
const activeKey = ref("1");
</script>

<style scoped lang="scss">
.admin {
  > div {
    background-color: #fff;
    padding: 2%;
    font-family: Quicksand;
    font-size: 14px;
    color: #606266;
  }
}
</style>
