<template>
  <a-row :gutter="[0, 16]" justify="center">
    <a-image :src="require('../assets/collectiVibeLogo.png')" :width="307" />
  </a-row>
  <a-row :gutter="[0, 16]" justify="center">
    <h1>
      <br />
      {{ message }}
    </h1>
  </a-row>
</template>

<script>
export default {
  props: ['message'],
};
</script>
