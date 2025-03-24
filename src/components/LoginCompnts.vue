<template>
  <div>
    这是登录组件
    <!-- <a-form :model="form" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
      <a-form-item label="用户名" name="username">
        <a-input v-model:value="form.username" />
      </a-form-item>
    </a-form> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
const form = ref({
  username: '',
  password: '',
});
</script>