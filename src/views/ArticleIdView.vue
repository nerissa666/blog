<template>
  <div class="" id="mdToHTML"></div>
</template>

<script setup>
import axios from "axios";
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
onMounted(() => {
  axios.get("/get/articleID?id=" + route.params.id).then((...res) => {
    axios.get(res[0].data.md).then((data) => {
      if (data.code === "ERR_BAD_REQUEST") {
        return router.push('/500');
      }
      console.log(data, 'data');
      window.editormd.markdownToHTML("mdToHTML", {
        markdown: data,
        emoji: true,
      });
    }).catch((err)=>{
      console.log(err, 'err');
      // err 404 不进 axios 的catch？？？
    });
  });
});
</script>

<style scoped lang="scss"></style>
