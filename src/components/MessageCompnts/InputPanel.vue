<template>
  <!-- <div> -->
  <a-form :model="formState" @submit="onSubmit" @keydown.enter="onSubmit">
    <a-form-item>
      <a-textarea
        v-model:value="formState.words"
        placeholder="请输入内容"
        :maxlength="100"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 24 }">
      <div class="emoji_send">
        <EMojiPanel
          :emoji="emoji"
          @update:formState="($event) => (formState.words += $event)"
        />
        <a-button type="primary" size="small" html-type="submit">Submit</a-button>
      </div>
    </a-form-item>
  </a-form>
  <!-- </div> -->
</template>

<script setup>
import { reactive, defineEmits,defineProps,defineExpose } from "vue";
import EMojiPanel from "@/components/MessageCompnts/EMojiPanel.vue";
import axios from "axios";
const CancelToken = axios.CancelToken;
const emit = defineEmits(['getComment', 'rewriteSubmit'])
const formState = reactive({
  words: "",
});
const emoji = reactive([
  "😀",
  "😁",
  "😂",
  "😊",
  "🙃",
  "🥰",
  "😘",
  "🤭",
  "🤔",
  "😏",
  "😵",
  "😟",
  "🙁",
  "😳",
  "😰",
  "😭",
  "😖",
  "😡",
  "😠",
  "😈",
  "🤡",
  "☠️",
  "👻",
  "🙈",
  "🙉",
  "❤️",
  "💖",
  "💢",
  "💣",
  "💤",
  "👋",
  "👍",
  "👌",
  "🤞",
  "🤟",
  "🤙",
  "👊",
  "🖕",
  "🤝",
  "🙏",
  "🙅",
  "🙅‍♂️",
  "👨‍✈️",
  "👩‍✈️",
  "👷",
  "👷‍♀️",
  "🤦",
  "🤦‍♂️",
  "👴",
  "🧓",
  "🐴",
  "🐮",
  "🐖",
  "🐑",
  "🐓",
  "🦚",
  "🐲",
  "🐳",
  "🐟",
  "🐌",
  "🐹",
  "🐶",
  "🐣",
  "🐭",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐻‍❄️",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐽",
  "🐸",
  "🐵",
  "🙊",
  "🐒",
  "🐔",
  "🐧",
  "🐦",
  "🐤",
  "🐥",
  "🦄",
  "🐡",
  "🐬",
  "🐠",
  "🐬",
  "🌸",
  "🌚",
  "🔥",
  "☃️",
  "🌟",
  "🍭",
  "🍬",
]);
const props = defineProps({
    rewrite: Boolean
})
const onSubmit =  () => {
    if (props.rewrite) {
        emit('rewriteSubmit',formState.words)
        return}
  // message/submit
  axios.post("/msg/submit", {val: formState.words},{
    cancelToken: new CancelToken(c => {})
  }).then( ({code,message:msg,name}) => {
    if (code === "ERR_CANCELED") return
    formState.words = "";
    emit('getComment')
  });
};
const clearInput = ()=>{
  formState.words = ''
}
defineExpose({
  clearInput,
});
</script>
<style scoped lang="scss">
.ant-form-item {
  margin-bottom: 10px;
}
.emoji_send {
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    width: 40%;
    text-align: left;
  }
}
:deep(.ant-popover) {
  width: 100%;
}
.ant-btn-primary {
  // background-color: #bfe2e6;
  font-weight: 700;
  // font-size: 16px;
  letter-spacing: 1px;
  font-family: Quicksand, "sans-serif";
  // color: #333;
}
</style>
