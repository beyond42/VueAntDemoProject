<template>
  <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
    <a-button-group>
      <a-button type="primary" @click="previousStep">
        <LeftOutlined /> Previous
      </a-button>
      <a-button type="primary" @click="nextStep">
        Next <RightOutlined />
      </a-button>
    </a-button-group>
  </a-form-item>
</template>

<script>
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    LeftOutlined,
    RightOutlined,
  },

  emits: ['next-step', 'previous-step'],

  methods: {
    nextStep() {
      this.$emit('next-step');
    },
    previousStep() {
      this.$emit('previous-step');
    },
  },
};
</script>

<style></style>
