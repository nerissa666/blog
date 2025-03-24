<template>
  <div class="word_board">
    <div>
      <h2>留言板</h2>
      <article>请文明发言，禁止广告。不然拉黑了嗷\(^o^)/~</article>
      <a-form :model="formState" @submit="onSubmit">
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
            <a-button type="primary" size="small" html-type="submit"
              >发送</a-button
            >
          </div>
        </a-form-item>
      </a-form>
    </div>
    <CommenTree ref="commentTreeRef" />
  </div>
</template>
<script setup>
import { reactive, ref, useRef } from "vue";
import axios from "axios";
import EMojiPanel from "@/components/MessageCompnts/EMojiPanel.vue";
import CommenTree from "@/components/MessageCompnts/CommenTree.vue";
import { message } from "ant-design-vue";
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
const clickEmoji = (item) => {
  formState.words += item;
};
const commentTreeRef = ref(null);
const onSubmit = async () => {
  // message/submit
  axios.post("/msg/submit", {val: formState.words}).then(async ({data: {msg}}) => {
    message.success(msg);
    formState.words = "";
    await commentTreeRef.value.getComment();
  }).catch((err) => {
    message.error(err.msg);
  });
};

const ifShowEmoji = ref(false);
const showEmoji = () => {
  ifShowEmoji.value = !ifShowEmoji.value;
};
</script>
<style scoped lang="scss">
.word_board {
  > div {
    box-shadow: 0 0 4px #ddd;
    margin-bottom: 2%;
    background-color: #fff;
    padding: 2%;
    font-family: Quicksand;
  }

  h2 {
    margin-bottom: 15px;
    font-size: 20px;
    letter-spacing: 3px;
    line-height: 24px;
    border-left: 5px solid #73b899;
    text-indent: 10px;
    text-align: left;
    font-weight: bold;
    color: #000;
  }
  article {
    text-indent: 2em;
    color: #444;
    font-size: 1rem;
    letter-spacing: 0.2rem;
    line-height: 30px;
    text-align: left;
    margin-bottom: 1%;
  }
  .ant-form-item {
    margin-bottom: 10px;
  }
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
h3 {
  margin: 40px 0 0;
}
</style>
