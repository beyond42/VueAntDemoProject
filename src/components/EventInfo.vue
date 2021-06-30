<template>
  <a-form
    ref="formRef"
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item
      ref="eventName"
      label="Event name"
      name="eventName"
      required
      help="Please provide us with your event name"
    >
      <a-input v-model:value="formState.eventName" placeholder="Name" />
    </a-form-item>

    <a-form-item
      ref="firstEvent"
      label="First Event"
      name="firstEvent"
      required
    >
      <a-radio-group
        v-model:value="formState.firstEvent"
        :options="firstEvent"
      />
    </a-form-item>

    <a-form-item ref="eventLogo" label="Event logo" name="eventLogo" required>
      <a-upload-dragger
        v-model:fileList="fileList"
        name="file"
        :multiple="true"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="handleChange"
      >
        <p class="ant-upload-drag-icon">
          <inbox-outlined></inbox-outlined>
        </p>
        <p class="ant-upload-text">Click or drag file to this area to upload</p>
        <p class="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </a-upload-dragger>
    </a-form-item>

    <a-form-item
      ref="noOfDays"
      label="Days of event"
      name="noOfDays"
      required
      help="Please enter how many days event will last"
    >
      <a-input-number
        v-model:value="formState.noOfDays"
        :min="1"
        placeholder="No of days"
      />
    </a-form-item>

    <a-form-item
      ref="startEndDate"
      label="Start and end date"
      name="startEndDate"
      required
    >
      <a-space direction="horizontal" label="Start and end date">
        <a-date-picker
          v-model:value="formState.startDate"
          format="DD-MM-YYYY"
          placeholder="Start"
          @openChange="handleStartOpenChange"
        />
        <a-date-picker
          v-model:value="formState.endDate"
          format="DD-MM-YYYY"
          placeholder="End"
          @openChange="handleEndOpenChange"
        />
      </a-space>
    </a-form-item>

    <a-form-item
      ref="timeOfEvent"
      label="Starting time of event"
      name="timeOfEvent"
      required
      help="Please enter at what time event will start"
    >
      <a-time-picker
        v-model:value="formState.timeOfEvent"
        :minute-step="15"
        :second-step="10"
      />
    </a-form-item>

    <a-row :gutter="[0, 16]" justify="center">
      <a-col class="gutter-row" :span="labelCol.span">
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
import {
  InboxOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    InboxOutlined,
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
        eventName: '',
        firstEvent: ref(1).value,
        eventImage: '',
        noOfDays: '',
        startDate: '',
        endDate: '',
        timeOfEvent: '',
      },
      firstEvent: ['Yes', 'No'],
      fileList: ref([]),
    };
  },
  emits: ['event-info-submit', 'event-info-previous'],
  methods: {
    handleChange(info) {
      const status = info.file.status;

      console.log('info');
      console.log(info);

      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
        this.formState.eventImage = info.file;
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    handleStartOpenChange(date, dateString) {
      this.formState.startDate = dateString;
      console.log(date, dateString);
    },
    handleEndOpenChange(date, dateString) {
      this.formState.endDate = dateString;
      console.log(date, dateString);
    },
    nextStep() {
      this.$emit('event-info-submit', this.formState);
    },
    previousStep() {
      this.$emit('event-info-previous', this.formState);
    },
  },
});
</script>

<style scoped>
.ant-input-number {
  min-width: 150px;
}
</style>
