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

    <a-row :gutter="[0, 16]" justify="center">
      <a-col class="gutter-row" :span="10">
        <a-form-item>
          <a-button-group>
            <a-button type="primary" @click="previousStep">
              <LeftOutlined /> Previous
            </a-button>
            <a-button type="primary" @click="nextStep">
              Next <RightOutlined />
            </a-button>
          </a-button-group>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    LeftOutlined,
    RightOutlined,
  },
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
        checkedList: [],
        typeOfEventCheckedList: [],
      },
      plainOptions: ['Yes', 'No'],
      typeOfEventOptions: ['Opened', 'Closed'],
    };
  },
  methods: {
    nextStep() {
      this.$emit('future-expirience-submit', this.formState);
    },
    previousStep() {
      this.$emit('future-expirience-previous', this.formState);
    },
  },
});
</script>

<style></style>
