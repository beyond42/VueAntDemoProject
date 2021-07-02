<template>
  <header>
    <navigation-menu></navigation-menu>
  </header>
  <router-view class="erodin-mt"/>
</template>

<script>
import NavigationMenu from "./components/NavigationMenu.vue";

export default {
  components: {
    NavigationMenu,
  }
};
</script>

<style>
.erodin-mt {
  margin-top: 4rem;
}
</style>
