<template>
  <div class="">
    <h2>WORK EXPERIENCE</h2>
    <a-timeline mode="alternate" :reverse="true"  pending="Recording...">
      <a-timeline-item>loading...</a-timeline-item>
      <a-timeline-item color="green"
        >Web 前端开发工程师  2025-01</a-timeline-item
      >
      <a-timeline-item>
        <template #dot
          ><ClockCircleOutlined style="font-size: 16px"
        /></template>
        工作于 江苏润和软件西安分公司（外包浙江华云科技信息有限公司）配网自动化事业部
      </a-timeline-item>
      <a-timeline-item color="red"
        >Web 前端开发工程师 2023-06</a-timeline-item
      >
      <a-timeline-item>工作于 中电金信杭州分公司（外包招商银行网络分公司 人力资源应用系统开发部</a-timeline-item>
      <a-timeline-item>
        <template #dot
          ><ClockCircleOutlined style="font-size: 16px"
        /></template>
        新疆工程学院 物联网工程 本科毕业 2020-06-12
      </a-timeline-item>
    </a-timeline>
  </div>
</template>

<script setup>
import { ClockCircleOutlined } from '@ant-design/icons-vue';
</script>

<style scoped lang="scss"></style>
