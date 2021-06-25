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
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 12,
      },
      formState: {
        boothsNo: '',
      },
    };
  },
};
</script>

<style></style>
