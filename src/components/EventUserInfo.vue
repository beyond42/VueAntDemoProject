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
          v-model:value="formState.countryCode"
          placeholder="+381"
          style="width: 25%">
          <a-select-option value="+381">+381</a-select-option>
          <a-select-option value="+387">+387</a-select-option>
        </a-select>
        <a-input
          v-model:value="formState.phoneNumber"
          placeholder="555 555-1234"
          style="width: 75%" />
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

  </a-form>
</template>

<script>
import { RightOutlined } from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import { defineComponent, reactive, ref } from "vue";
import { checkTextInputGeneral } from "@/utils/validators";

export default defineComponent({
  name: "EventUserInfo",
  components: {
    RightOutlined
  },
  props: {
    firstName: String,
    lastName: String,
    company: String,
    email: String,
    countryCode: String,
    phoneNumber: String
  },

  setup(props, { emit }) {
    const formRef = ref();

    const formState = reactive({
      firstName: props.firstName,
      lastName: props.lastName,
      company: props.company,
      email: props.email,
      countryCode: props.countryCode || undefined,
      phoneNumber: props.phoneNumber,
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

    const nextStep = () => {
      formRef.value
        .validate()
        .then(() => {
          notification.success({
            message: 'Success',
            description: 'Uspjesno ste popunili sva polja!',
            duration: 2,
            placement: 'bottomRight',
          });
          setTimeout(() => {
            emit("event-user-info-next", formState);
          }, 2250);
        })
        .catch(() => {
          notification.error({
            message: 'Nedostaju podaci',
            description: 'Molimo popunite obavezna polja!',
            duration: 3
          });
        });
    };

    return { formRef, formState, layout, rules, nextStep };
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
