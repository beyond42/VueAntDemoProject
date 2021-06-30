<template>
  <a-form
    ref="formRef"
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    @submit="userSubmit"
  >
    <a-form-item
      ref="name"
      label="First name"
      name="name"
      required
      help="Please provide us with your name"
    >
      <a-input v-model:value="formState.name" placeholder="Name" />
    </a-form-item>
    <a-form-item
      ref="last_name"
      label="Last name"
      name="last_name"
      required
      help="Please provide us with your surname"
    >
      <a-input v-model:value="formState.last_name" placeholder="Surname" />
    </a-form-item>
    <a-form-item
      ref="company"
      label="Company"
      name="company"
      required
      help="Company or organisation you represent"
    >
      <a-input
        v-model:value="formState.company"
        placeholder="Company / Organization"
      />
    </a-form-item>
    <a-form-item
      ref="email"
      label="Email address"
      name="email"
      required
      help="Please provide us your email address for contact"
    >
      <a-input
        type="email"
        v-model:value="formState.email"
        placeholder="Bussines email address"
      />
    </a-form-item>
    <a-form-item
      ref="phone"
      label="Phone number"
      name="phone"
      help="Please provide us your phone number"
    >
      <a-input-group class="phone-group" compact>
        <a-select style="width: 25%" v-model:value="formState.country_code">
          <a-select-option value="+381">+381</a-select-option>
          <a-select-option value="+387">+387</a-select-option>
        </a-select>
        <a-input
          style="width: 75%"
          v-model:value="formState.phone_num"
          placeholder="555 555-1234"
        />
      </a-input-group>
    </a-form-item>
    <a-row :gutter="[0, 16]" justify="center">
      <a-col class="gutter-row" :span="labelCol.span">
        <a-form-item>
          <a-button-group>
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
// TODO komentirao axios endpoint nije OK pa pravi console error kad se popravi vratiti
// import axios from 'axios';

import { RightOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    RightOutlined,
  },
  data() {
    return {
      formState: {
        name: '',
        last_name: '',
        company: '',
        email: '',
        country_code: '+381',
        phone_num: '',
      },
      results: [],
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 12,
      },
    };
  },
  emits: ['user-submit'],
  methods: {
    nextStep() {
      this.$emit('user-submit', this.formState);
    },
  },

  // TODO komentirao axios endpoint nije OK pa pravi console error kad se popravi vratiti
  // async created() {
  //   try {
  //     const res = await axios.get(
  //       `https://beyond2.doc.ba/api/getEvents?user_id=` + '1'
  //     );
  //     console.log(res);
  //     this.results = res.data;
  //     console.log(this.results);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // },
};
</script>

<style>
.phone-group .ant-select-selector {
  height: 34px !important;
  padding-top: 2px;
  padding-bottom: 2px;
}
.phone-group .ant-select-single .ant-select-selector .ant-select-selection-item,
.phone-group
  .ant-select-single
  .ant-select-selector
  .ant-select-selection-placeholder {
  line-height: 34px !important;
}
</style>
