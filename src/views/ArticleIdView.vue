<template>
  <div class="" id="mdToHTML"></div>
</template>

<script setup>
import axios from "axios";
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();

onMounted(() => {
  axios.get("/get/articleID?id=" + route.params.id).then((...res) => {
    console.log(res[0].data.md, 'res');
    axios.get(res[0].data.md).then((data) => {
      console.log(data, 'data');
      window.editormd.markdownToHTML("mdToHTML", {
        markdown: data,
        emoji: true,
      });
    });
  });
});
</script>

<style scoped lang="scss"></style>
