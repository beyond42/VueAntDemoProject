<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    v-bind="layout">

    <a-form-item
      ref="firstName"
      label="First name"
      name="firstName"
      has-feedback
      help="Please provide us with your name">
      <a-input
        v-model:value="formState.firstName"
        placeholder="Name" />
    </a-form-item>

    <a-form-item
      ref="lastName"
      label="Last name"
      name="lastName"
      has-feedback
      help="Please provide us with your surname">
      <a-input
        v-model:value="formState.lastName"
        placeholder="Surname" />
    </a-form-item>

    <a-form-item
      ref="company"
      label="Company"
      name="company"
      has-feedback
      help="Company or organisation you represent">
      <a-input
        v-model:value="formState.company"
        placeholder="Company / Organization"/>
    </a-form-item>

    <a-form-item
      ref="email"
      label="Email address"
      name="email"
      has-feedback
      help="Please provide us your email address for contact">
      <a-input
        type="email"
        v-model:value="formState.email"
        placeholder="Bussines email address"/>
    </a-form-item>

    <a-form-item
      ref="phone"
      label="Phone number"
      name="phone"
      help="Please provide us your phone number">
      <a-input-group class="phone-group" compact>
        <a-select
          style="width: 25%"
          v-model:value="formState.countryCode">
          <a-select-option value="+381">+381</a-select-option>
          <a-select-option value="+387">+387</a-select-option>
        </a-select>
        <a-input
          style="width: 75%"
          v-model:value="formState.phoneNumber"
          placeholder="555 555-1234"/>
      </a-input-group>
    </a-form-item>

    <a-row :gutter="[0, 16]" justify="center">
      <a-col class="gutter-row" :span="8">
        <a-form-item>
          <a-button-group>
            <a-button type="primary" @click="nextStep">
              Next <right-outlined />
            </a-button>
          </a-button-group>
        </a-form-item>
      </a-col>
    </a-row>

    <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
      <a-button-group>
        <a-button type="dashed" @click="onSubmit">Test</a-button>
        <a-button type="dashed" @click="resetForm">Reset</a-button>
      </a-button-group>
    </a-form-item>

  </a-form>
</template>

<script>
// TODO komentirao axios endpoint nije OK pa pravi console error kad se popravi vratiti
// import axios from 'axios';
import { RightOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref, toRaw } from "vue";
import { checkTextInputGeneral } from "@/utils/validators";

export default defineComponent({
  components: {
    RightOutlined
  },

  setup(props, { emit }) {
    const formRef = ref();

    const formState = reactive({
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      countryCode: "+381",
      phoneNumber: "",
    });

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 12,
      },
    };

    const inputTextValidation = {
      required: true,
      validator: checkTextInputGeneral,
      trigger: 'change',
    };

    const rules = {
      firstName: inputTextValidation,
      lastName: inputTextValidation,
      company: inputTextValidation,
      email: [
        {
          required: true,
          trigger: 'change',
          type: "email",
        }
      ],
    };

    // New handlers
    const resetForm = () => {
      formRef.value.resetFields();
    };

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log('onSubmit values', formState, toRaw(formState));
        })
        .catch(error => {
          console.log('onSubmit error', error);
        });
    };

    // From old methods
    const nextStep = () => {
      emit("user-submit", formState);
    };

    return {
      formState,
      formRef,
      rules,
      layout,
      // New
      resetForm,
      onSubmit,
      // Old
      nextStep,
      // results: [], // TODO unkoment
    };
  }

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
});
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
