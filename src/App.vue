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

import { onMounted, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
store.commit(
  "setInfoLogin",
  JSON.parse(localStorage.getItem("loginInfo")) || {}
);
document.addEventListener("click", (e) => {
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    const x = e.clientX;
    const y = e.clientY;
    const angle = Math.random() * 2 * Math.PI;
    const radius = 50 + Math.random() * 10;
    const offsetX = Math.cos(angle) * radius;
    const offsetY = Math.sin(angle) * radius;

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty("--x", `${offsetX}px`);
    particle.style.setProperty("--y", `${offsetY}px`);
    particle.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 600);
  }
});
</script>
<style lang="scss">
.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  pointer-events: none;
  background: red;
  border-radius: 50%;
  animation: explode 0.6s ease-out forwards;
}
@keyframes explode {
  0% {
    transform: scale(1) translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: scale(0) translate(var(--x), var(--y));
    opacity: 0;
  }
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 0;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: red;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

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
.ant-btn-primary {
  background-color: #bfe2e6;
  // font-weight: 700;
  // font-size: 16px;
  // letter-spacing: 2px;
  // font-family: Quicksand, "sans-serif";
  color: #000;
}
.ant-switch.ant-switch-checked {
  background: #bfe2e6;
}
</style>
