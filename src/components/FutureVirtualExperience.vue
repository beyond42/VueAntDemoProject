<template>
  <a-form
    ref="formRef"
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item
      ref="domainForEvent"
      label="Domain for the event"
      name="domainForEvent"
      required
    >
      <a-checkbox-group v-model:value="checkedList" :options="plainOptions" />
    </a-form-item>

    <a-form-item
      ref="domainSubdomainName"
      label="Domain / subdomain name"
      name="domainSubdomainName"
      required
      help="Please enter your own domain or subdomain for event"
    >
      <a-input
        v-model:value="formState.domainSubdomainName"
        placeholder="example.com/example.collectivibe.com"
      />
    </a-form-item>

    <a-form-item
      ref="typeOfEvent"
      label="Type of event"
      name="typeOfEvent"
      required
    >
      <a-checkbox-group
        v-model:value="typeOfEventCheckedList"
        :options="typeOfEventOptions"
      />
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
        domainSubdomainName: '',
      },
      plainOptions: ['Yes', 'No'],
      typeOfEventOptions: ['Opened', 'Closed'],
      checkedList: [],
      typeOfEventCheckedList: [],
    };
  },
};
</script>

<style></style>
