<template>
  <a-form
    ref="formRef"
    v-bind="layout">

    <a-form-item
      ref="noOfBooths"
      label="Number of booths"
      name="noOfBooths"
      has-feedback
      help="Please enter how many booths you will have">
      <a-input-number
        v-model:value="noOfBooths"
        :min="1"
        placeholder="No of booths"/>
    </a-form-item>

    <a-form-item
      ref="areasOfEvent"
      label="Areas of event should feature"
      name="areasOfEvent"
      has-feedback>
      <a-checkbox-group
        v-model:value="areasOfEvent"
        :options="areasOfEventOptions"/>
    </a-form-item>

    <a-form-item
      ref="eventHaveMultipleBooths"
      label="Will your event have multiple booths"
      name="eventHaveMultipleBooths"
      has-feedback>
      <a-radio-group
        v-model:value="eventHaveMultipleBooths"
        :options="eventHaveMultipleBoothsOptions"/>
    </a-form-item>

    <a-form-item
      ref="liveRecorded"
      label="Live stream or recorded"
      name="liveRecorded"
      has-feedback>
      <a-radio-group
        v-model:value="liveRecorded"
        :options="liveRecordedOptions"/>
    </a-form-item>

    <a-form-item
      ref="parallelSessions"
      label="Parrallel sessions"
      name="parallelSessions"
      has-feedback>
      <a-radio-group
        v-model:value="parallelSessions"
        :options="parallelSessionsOptions"/>
    </a-form-item>

    <a-form-item
      ref="preferredTool"
      label="Preferred tool for live-streaming:"
      name="preferredTool"
      has-feedback>
      <a-radio-group
        v-model:value="preferredTool"
        :options="preferredToolOptions"/>
    </a-form-item>

    <a-form-item
      ref="eventAgenda"
      label="Event Agenda"
      name="eventAgenda"
      has-feedback>
      <a-upload-dragger
        v-model:fileList="fileList"
        name="file"
        :multiple="true"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="handleChange">
        <p class="ant-upload-drag-icon">
          <inbox-outlined />
        </p>
        <p class="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p class="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </a-upload-dragger>
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

    <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
      <a-button-group>
        <a-button type="dashed" @click="resetForm">Reset</a-button>
      </a-button-group>
    </a-form-item>

  </a-form>
</template>

<script>
import { InboxOutlined, LeftOutlined, SaveOutlined } from '@ant-design/icons-vue';
import { checkNumberInputGeneral } from "@/utils/validators";
import { defineComponent, ref } from 'vue';
import store from "../store";

export default defineComponent({
  components: {
    InboxOutlined,
    LeftOutlined,
    SaveOutlined,
  },

  computed: {
    noOfBooths: {
      get() {
        return store.state.event.boothsNo;
      },
      set(value) {
        store.commit('setBoothsNo', value);
      }
    },
    areasOfEvent: {
      get() {
        return store.state.event.event_areas;
      },
      set(value) {
        store.commit('setEventAreas', value);
      }
    },
    eventHaveMultipleBooths: {
      get() {
        return store.state.event.multiple_types_of_booths;
      },
      set(value) {
        store.commit('setMultipleBooths', value);
      }
    },
    liveRecorded: {
      get() {
        return store.state.event.live_or_recorded_content;
      },
      set(value) {
        store.commit('setLiveOrRecorded', value);
      }
    },
    parallelSessions: {
      get() {
        return store.state.event.live_parallel_sessions;
      },
      set(value) {
        store.commit('setParallelSessions', value);
      }
    },
    preferredTool: {
      get() {
        return store.state.event.streamingEventsTool;
      },
      set(value) {
        store.commit('setStreamingEventsTool', value);
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
          type: 'array',
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
      eventAgenda: [
        {
          required: false,
          message: 'Please upload the agenda',
        },
      ],
    }

    // New handlers
    const resetForm = () => {
      formRef.value.resetFields();
    };

    // From old methods
    const onSubmit = () => {
      emit('general-layout-submit');
      console.log(store.state)
      // formRef.value
      //   .validate()
      //   .then(() => {
      //     emit('general-layout-submit', formState);
      //     console.log('onSubmit values', formState, toRaw(formState));
      //   })
      //   .catch(error => {
      //     console.log('onSubmit error', error);
      //   });
    };

    const previousStep = () => {
      emit("general-layout-previous");
    };

    return {
      formRef,
      layout,
      areasOfEventOptions,
      eventHaveMultipleBoothsOptions,
      liveRecordedOptions,
      parallelSessionsOptions,
      preferredToolOptions,
      rules,
      fileList: ref([]),
      // New
      resetForm,
      // Old
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
