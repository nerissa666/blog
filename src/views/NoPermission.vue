<template>
  <a-result style="background-color: #fff;" status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
    <template #extra>
      <a-button type="primary" @click.stop="$router.push('/')">Back Home</a-button>
    </template>
  </a-result>
</template>
