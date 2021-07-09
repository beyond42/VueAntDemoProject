<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" class="center">
    <a-menu-item key="app">
      <router-link to="/">
        <ant-design-outlined :style="{fontSize: '18px'}" /> Home
      </router-link>
    </a-menu-item>
    <a-menu-item key="test">
      <router-link to="/test">
        <code-outlined :style="{fontSize: '18px'}"/> Test
      </router-link>
    </a-menu-item>
  </a-menu>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { AntDesignOutlined, CodeOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    AntDesignOutlined,
    CodeOutlined,
  },

  setup() {
    const current = ref(['app']);
    return {
      current,
    };
  },
});
</script>

<style scoped>
.center {
  display: flex;
  position: relative;
  justify-content: center;
}
</style>