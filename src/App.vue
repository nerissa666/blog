<template>
  <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/> -->
  <div>
    <nav>
      <nav-top />
    </nav>
    <main>
      <left-aside />
      <div class="right-aside">
        <router-view />
      </div>
    </main>
    <!-- <router-link to="/"/> -->
    <!-- <router-link to="/about">About</router-link> -->
  </div>
</template>
<script setup>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import NavTop from "@/components/FrameCompnts/NavTop.vue";
import LeftAside from "@/components/FrameCompnts/LeftAside.vue";
import { reactive } from "vue";
import { useStore } from "vuex";
const store = useStore();
store.commit("setInfoLogin", JSON.parse(localStorage.getItem("loginInfo")) || {});

</script>
<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-family: Quicksand, Microsoft YaHei, sans-serif;
}

nav {
  position: sticky;
  top: 0;
  left: 0;
  padding: 0.15% 2%;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 999;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
main {
  display: flex !important;
  gap: 2%;
  padding: 2%;

  > div:first-child {
    width: 30%;
  }
  > div:last-child {
    flex: 1;
  }
}
</style>
