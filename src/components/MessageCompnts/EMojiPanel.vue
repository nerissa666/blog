<template>
  <div class="">
    <a-popover
      placement="bottomLeft"
      trigger="click"
      :getPopupContainer="triggerNode"
      :arrow="true"
      :destroyTooltipOnHide="true"
    >
      <template #content>
        <a-row class="emoji" :gutter="[0, 0]">
          <a-col
            class="gutter-row"
            :span="1"
            v-for="item in props.emoji"
            :key="item"
            @click="emit('update:formState', item)"
          >
            <div class="gutter-box">{{ item }}</div>
          </a-col>
        </a-row>
      </template>

      <i class="iconfont icon-biaoqing" />
    </a-popover>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps(["emoji"]);
const emit = defineEmits(["update:formState"]);
const triggerNode = (triggerNode) => {
  return document.querySelector('.emoji_send >div')
};
</script>

<style scoped lang="scss">

.icon-biaoqing {
  font-size: 20px;
  cursor: pointer;
}

.ant-col {
  cursor: pointer;
}
</style>
