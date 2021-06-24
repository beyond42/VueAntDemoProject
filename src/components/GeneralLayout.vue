<template>
  <a-form
    ref="formRef"
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item
      ref="noOfBooths"
      label="Number of booths"
      name="boothsNo"
      required
      help="Please enter how many booths you will have"
    >
      <a-input v-model:value="formState.boothsNo" placeholder="NO of booths" />
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="previousStep">Previous</a-button>

      <a-button type="primary" @click="onSubmit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      formState: {
        boothsNo: '',
      },
    };
  },
  emits: ['next-step'],
  methods: {
    previousStep() {
      this.$emit('previous-step');
    },
    onSubmit() {
      console.log('Submit');
    },
  },
};
</script>

<style></style>
