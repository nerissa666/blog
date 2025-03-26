<template>
  <div class="" id="mdToHTML"></div>
</template>

<script setup>
import axios from "axios";
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();

onMounted(() => {
  axios.get("/get/articleID?id=" + route.params.id).then(({ data }) => {
    axios.get(data.data.md).then(({ data: md }) => {
      window.editormd.markdownToHTML("mdToHTML", {
        markdown: md,
        emoji: true,
      });
    });
  });
});
</script>

<style scoped lang="scss"></style>
