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
        个人博客
      </a-timeline-item>
      <a-timeline-item color="red"
        >Web 前端开发工程师 2023-06</a-timeline-item
      >
      <a-timeline-item>找房app</a-timeline-item>
      <a-timeline-item>
        <template #dot
          ><ClockCircleOutlined style="font-size: 16px"
        /></template>
        幼儿园毕业 2020-06-12
      </a-timeline-item>
    </a-timeline>
  </div>
</template>

<script setup>
import { ClockCircleOutlined } from '@ant-design/icons-vue';
</script>

<style scoped lang="scss"></style>
