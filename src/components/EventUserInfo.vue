<template>
  <a-form
    ref="formRef"
    v-bind="layout">

    <a-form-item
      ref="firstName"
      label="First name"
      name="firstName"
      has-feedback
      help="Please provide us with your name">
      <a-input
        v-model:value="firstName"
        placeholder="Name" />
    </a-form-item>

    <a-form-item
      ref="lastName"
      label="Last name"
      name="lastName"
      has-feedback
      help="Please provide us with your surname">
      <a-input
        v-model:value="lastName"
        placeholder="Surname" />
    </a-form-item>

    <a-form-item
      ref="company"
      label="Company"
      name="company"
      has-feedback
      help="Company or organisation you represent">
      <a-input
        v-model:value="company"
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
        v-model:value="email"
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
          v-model:value="countryCode">
          <a-select-option value="+381">+381</a-select-option>
          <a-select-option value="+387">+387</a-select-option>
        </a-select>
        <a-input
          style="width: 75%"
          v-model:value="phoneNumber"
          placeholder="555 555-1234"/>
      </a-input-group>
    </a-form-item>

    <a-row :gutter="[0, 16]" justify="center">
      <a-col class="gutter-row" :span="8">
        <a-form-item>
          <a-button-group>
            <a-button type="primary" @click.prevent="nextStep">
              Next <right-outlined />
            </a-button>
          </a-button-group>
        </a-form-item>
      </a-col>
    </a-row>

    <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
      <a-button-group>
        <a-button type="dashed" @click="resetForm">Reset</a-button>
      </a-button-group>
    </a-form-item>

  </a-form>
</template>

<script>
// TODO komentirao axios endpoint nije OK pa pravi console error kad se popravi vratiti
// import axios from 'axios';
import { RightOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import { checkTextInputGeneral } from "@/utils/validators";
import store from "../store";

export default defineComponent({
  components: {
    RightOutlined
  },

  computed: {
    firstName: {
      get() {
        return store.state.event.user_firstname;
      },
      set(value) {
        store.commit('setFirstName', value);
      }
    },
    lastName: {
      get() {
        return store.state.event.user_lastname;
      },
      set(value) {
        store.commit('setLastName', value);
      }
    },
    company: {
      get() {
        return store.state.event.company_name;
      },
      set(value) {
        store.commit('setCompanyName', value);
      }
    },
    email: {
      get() {
        return store.state.event.user_email;
      },
      set(value) {
        store.commit('setUserEmail', value);
      }
    },
    phoneNumber: {
      get() {
        return store.state.event.user_phone_number;
      },
      set(value) {
        store.commit('setUserPhoneNumber', value);
      }
    },
    countryCode: {
      get() {
        return store.state.event.countryCode;
      },
      set(value) {
        store.commit('setCountryCode', value);
      }
    },
  },

  setup(props, { emit }) {
    const formRef = ref();

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

    // From old methods
    const nextStep = () => {
      emit("user-submit");
      console.log(store.state);
      // formRef.value
      //   .validate()
      //   .then(() => {
      //     emit("user-submit", formState);
      //     console.log('onSubmit values', formState, toRaw(formState));
      //   })
      //   .catch(error => {
      //     console.log('onSubmit error', error);
      //   });
    };

    return {
      formRef,
      // formState,
      layout,
      rules,
      
      // New
      resetForm,
      // Old
      nextStep,
      // results: [], // TODO unkoment
    };
  }
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
