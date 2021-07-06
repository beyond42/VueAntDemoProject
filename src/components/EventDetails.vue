<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    v-bind="layout">

    <a-form-item
      ref="noOfAttendees"
      label="Number of attendees"
      name="noOfAttendees"
      has-feedback
      help="Please provide us with number of attendees you expect">
      <a-input-number
        v-model:value="formState.noOfAttendees"
        :min="1"
        placeholder="No of attendees" />
    </a-form-item>

    <a-form-item
      ref="expoFeature"
      label="Expo feature"
      name="expoFeature"
      has-feedback>
      <a-radio-group
        v-model:value="formState.expoFeature"
        :options="options" />
    </a-form-item>

    <a-form-item
      ref="noOfExhibitioners"
      label="Number of exhibitioners"
      name="noOfExhibitioners"
      has-feedback
      help="Please provide us with number of exhibitioners you expect">
      <a-input-number
        v-model:value="formState.noOfExhibitioners"
        :min="1"
        placeholder="No of exhibitioners" />
    </a-form-item>

    <a-form-item
      ref="officialWebsite"
      label="Official website of event"
      name="officialWebsite"
      has-feedback>
      <a-radio-group
        v-model:value="formState.officialWebsite"
        :options="options" />
    </a-form-item>

    <a-row :gutter="[0, 16]" justify="center">
      <a-col class="gutter-row" :span="8">
        <a-form-item>
          <a-button-group>
            <a-button type="primary" @click.prevent="previousStep">
              <left-outlined /> Previous
            </a-button>
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
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
import { checkNumberInputGeneral } from "@/utils/validators";
import { defineComponent, reactive, ref, toRaw } from 'vue';

export default defineComponent({
  components: {
    LeftOutlined,
    RightOutlined,
  },

  setup(props, { emit }) {
    const formRef = ref();

    const formState = reactive({
      noOfAttendees: undefined,
      expoFeature: "",
      noOfExhibitioners: undefined,
      officialWebsite: "",
    });

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 12,
      },
    };

    const options = [
      {
        label: "Yes",
        value: "Yes"
      },
      {
        label: "No",
        value: "No"
      }
    ];

    const rules = {
      noOfAttendees: [
        {
          required: true,
          validator: checkNumberInputGeneral,
          message: "Please provide us with number of attendees you expect",
          trigger: 'change',
          type: "object",
        }
      ],
      expoFeature: [
        {
          required: true,
          message: "Please chose \"Yes\" or \"No\"",
          trigger: "change",
        }
      ],
      noOfExhibitioners: [
        {
          required: true,
          validator: checkNumberInputGeneral,
          message: "This field is required",
          trigger: 'change',
          type: "object",
        }
      ],
      officialWebsite: [
        {
          required: true,
          message: "Please chose \"Yes\" or \"No\"",
          trigger: "change",
        }
      ],
    };

    // New handlers
    const resetForm = () => {
      formRef.value.resetFields();
    };

    // From old methods
    const nextStep = () => {
      formRef.value
        .validate()
        .then(() => {
          emit('event-details-submit', formState);
          console.log('onSubmit values', formState, toRaw(formState));
        })
        .catch(error => {
          console.log('onSubmit error', error);
        });
    };

    const previousStep = () =>{
      emit('event-details-previous', formState);
    };

    return {
      formRef,
      formState,
      layout,
      options,
      rules,
      // New
      resetForm,
      // Old
      nextStep,
      previousStep,
    };
  }
});
</script>

<style scoped>
.ant-input-number {
  min-width: 180px;
}
</style>
