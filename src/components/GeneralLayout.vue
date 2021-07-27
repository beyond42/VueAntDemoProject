<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    v-bind="layout">

    <a-form-item
      ref="noOfBooths"
      label="Number of booths"
      name="noOfBooths"
      has-feedback
      help="Please enter how many booths you will have">
      <a-input-number
        v-model:value="formState.noOfBooths"
        :min="1"
        placeholder="No of booths"/>
    </a-form-item>

    <a-form-item
      ref="areasOfEvent"
      label="Areas of event should feature"
      name="areasOfEvent"
      has-feedback>
      <a-checkbox-group
        name="checkboxgroupAreasOfEvent"
        v-model:value="formState.areasOfEvent"
        :options="areasOfEventOptions" />
    </a-form-item>

    <a-form-item
      ref="eventHaveMultipleBooths"
      label="Will your event have multiple booths"
      name="eventHaveMultipleBooths"
      has-feedback>
      <a-radio-group
        v-model:value="formState.eventHaveMultipleBooths"
        :options="eventHaveMultipleBoothsOptions"/>
    </a-form-item>

    <a-form-item
      ref="liveRecorded"
      label="Live stream or recorded"
      name="liveRecorded"
      has-feedback>
      <a-radio-group
        v-model:value="formState.liveRecorded"
        :options="liveRecordedOptions"/>
    </a-form-item>

    <a-form-item
      ref="parallelSessions"
      label="Parrallel sessions"
      name="parallelSessions"
      has-feedback>
      <a-radio-group
        v-model:value="formState.parallelSessions"
        :options="parallelSessionsOptions"/>
    </a-form-item>

    <a-form-item
      ref="preferredTool"
      label="Preferred tool for live-streaming:"
      name="preferredTool"
      has-feedback>
      <a-radio-group
        v-model:value="formState.preferredTool"
        :options="preferredToolOptions"/>
    </a-form-item>

    <a-row :gutter="[0, 16]" justify="center">
      <a-col class="gutter-row" :span="8">
        <a-form-item>
          <a-button-group>
            <a-button type="primary" @click.prevent="previousStep">
              <left-outlined /> Previous
            </a-button>
            <a-button type="primary" @click.prevent="onSubmit">
              Submit <save-outlined />
            </a-button>
          </a-button-group>
        </a-form-item>
      </a-col>
    </a-row>

  </a-form>
</template>

<script>
import { LeftOutlined, SaveOutlined } from '@ant-design/icons-vue';
import { notification } from "ant-design-vue";
import { checkNumberInputGeneral } from "@/utils/validators";
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  name: "GeneralLayout",
  components: {
    LeftOutlined,
    SaveOutlined,
  },
  props: {
    noOfBooths: Number,
    areasOfEvent: Array,
    eventHaveMultipleBooths: String,
    liveRecorded: String,
    parallelSessions: String,
    preferredTool: String,
  },

  setup(props, { emit }) {
    const formRef = ref();

    const formState = reactive({
      noOfBooths: props.noOfBooths || undefined,
      areasOfEvent: props.areasOfEvent,
      eventHaveMultipleBooths: props.eventHaveMultipleBooths || undefined,
      liveRecorded: props.liveRecorded,
      parallelSessions: props.parallelSessions || undefined,
      preferredTool: props.preferredTool,
    });

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 12,
      },
    };

    const areasOfEventOptions = [
      {
        label: "External venue design",
        value: "External venue design"
      },
      {
        label: "Lobby/Info desk",
        value: "Lobby/Info desk"
      },
      {
        label: "Conference rooms",
        value: "Conference rooms"
      },
      {
        label: "Expo halls with booths",
        value: "Expo halls with booths"
      },
      {
        label: "Other",
        value: "Other"
      },
    ];

    const eventHaveMultipleBoothsOptions = [
      {
        label: "Yes",
        value: "Yes"
      },
      {
        label: "No",
        value: "No"
      }
    ];

    const liveRecordedOptions = [
      {
        label: "Live",
        value: "Live"
      },
      {
        label: "Recorded",
        value: "Recorded"
      },
      {
        label: "Both",
        value: "Both"
      }
    ];

    const parallelSessionsOptions = [
      {
        label: "Yes",
        value: "Yes"
      },
      {
        label: "No",
        value: "No"
      }
    ];

    const preferredToolOptions = [
      {
        label: "No",
        value: "No"
      },
      {
        label: "Zoom",
        value: "Zoom"
      },
      {
        label: "YouTube",
        value: "YouTube"
      },
      {
        label: "Microsoft Teams",
        value: "Microsoft Teams"
      },
      {
        label: "Other",
        value: "Other"
      },
    ];

    const rules = {
      noOfBooths: [
        {
          required: true,
          validator: checkNumberInputGeneral,
          message: "Please provide us with number of ",
          trigger: 'change',
          type: "object",
        }
      ],
      areasOfEvent: [
        {
          required: true,
          message: 'Please select at least one activity type',
          trigger: 'change',
          type: "array",
        }
      ],
      eventHaveMultipleBooths: [
        {
          required: true,
          message: 'Please select one',
          trigger: 'change',
        },
      ],
      liveRecorded: [
        {
          required: true,
          message: 'Please select one',
          trigger: 'change',
        },
      ],
      parallelSessions: [
        {
          required: true,
          message: 'Please select parrallel session',
          trigger: 'change',
        },
      ],
      preferredTool: [
        {
          required: true,
          message: 'Please select prefered tool',
          trigger: 'change',
        },
      ],
    }

    const onSubmit = () => {
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
            emit('general-layout-submit', formState);
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

    const previousStep = () => {
      emit("general-layout-previous", formState);
    };

    return {
      formRef,
      formState,
      layout,
      areasOfEventOptions,
      eventHaveMultipleBoothsOptions,
      liveRecordedOptions,
      parallelSessionsOptions,
      preferredToolOptions,
      rules,
      onSubmit,
      previousStep,
    };
  },
});
</script>

<style scoped>
.ant-input-number {
  min-width: 180px;
}
</style>
