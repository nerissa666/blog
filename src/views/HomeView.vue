<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- 这是首页view -->
    <IntroduceSelf />
    <HotArticle />
    <WorkExperience />
    <ContactMe />
  </div>
</template>

<script setup>
import IntroduceSelf from "@/components/HomeCompnts/IntroduceSelf.vue";
import HotArticle from "@/components/HomeCompnts/HotArticle.vue";
import WorkExperience from "@/components/HomeCompnts/WorkExperience.vue";
import ContactMe from "@/components/HomeCompnts/ContactMe.vue";
</script>
<style lang="scss">
.home > div {
  box-shadow: 0 0 4px #ddd;
  margin-bottom: 3%;
  background-color: #fff;
  padding: 2%;
  font-family: Quicksand;
  h2 {
    font-weight: bold;
    font-size: 2rem;
    letter-spacing: 3px;
    padding: 2% 0 3% 0;
    text-align: left;
  }
  article {
    text-indent: 2em;
    color: #444;
    font-size: 1rem;
    letter-spacing: 0.2rem;
    line-height: 30px;
    text-align: left;
    padding-bottom: 3%;
    margin-bottom: 1%;
    border-bottom: 1px solid #ddd;
    a {
      text-decoration: underline;
      color: #aaa;
    }
  }
}
</style>
