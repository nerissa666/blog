<template>
    <a-result style="background-color: #fff;" status="500" title="500" sub-title="Sorry, the server is wrong.">
    <template #extra>
      <a-button type="primary" @click.stop="$router.push('/')">Back Home</a-button>
    </template>
  </a-result>
</template>

