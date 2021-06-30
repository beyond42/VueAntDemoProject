<template>
  <a-form
    ref="formRef"
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item
      ref="noOfBooths"
      label="Number of booths"
      name="noOfBooths"
      required
      help="Please enter how many booths you will have"
    >
      <a-input-number
        v-model:value="formState.noOfBooths"
        :min="1"
        placeholder="No of booths"
      />
    </a-form-item>

    <a-form-item
      ref="areasOfEvent"
      label="Areas of event should feature"
      name="areasOfEvent"
      required
    >
      <a-checkbox-group
        v-model:value="formState.areasOfEvent"
        :options="areasOfEvent"
      />
    </a-form-item>

    <a-form-item
      ref="eventHaveMultipleBooths"
      label="Will your event have multiple booths"
      name="eventHaveMultipleBooths"
      required
    >
      <a-radio-group
        v-model:value="formState.eventHaveMultipleBooths"
        :options="eventHaveMultipleBooths"
      />
    </a-form-item>

    <a-form-item
      ref="liveRecorded"
      label="Live stream or recorded"
      name="liveRecorded"
      required
    >
      <a-radio-group
        v-model:value="formState.liveRecorded"
        :options="liveRecorded"
      />
    </a-form-item>

    <a-form-item
      ref="parallelSessions"
      label="Parrallel sessions"
      name="parallelSessions"
      required
    >
      <a-radio-group
        v-model:value="formState.parallelSessions"
        :options="parallelSessions"
      />
    </a-form-item>

    <a-form-item
      ref="eventAgenda"
      label="Event Agenda"
      name="eventAgenda"
      required
    >
      <a-upload-dragger
        v-model:fileList="fileList"
        name="file"
        :multiple="true"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="handleChange"
      >
        <p class="ant-upload-drag-icon">
          <inbox-outlined />
        </p>
        <p class="ant-upload-text">Click or drag file to this area to upload</p>
        <p class="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </a-upload-dragger>
    </a-form-item>

    <a-row :gutter="[0, 16]" justify="center">
      <a-col class="gutter-row" :span="labelCol.span">
        <a-form-item>
          <a-button-group>
            <a-button type="primary" @click="previousStep">
              <LeftOutlined /> Previous
            </a-button>
            <a-button type="primary" @click.prevent="onSubmit">
              Submit <SaveOutlined />
            </a-button>
          </a-button-group>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import { LeftOutlined, SaveOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    LeftOutlined,
    SaveOutlined,
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
        noOfBooths: '',
        areasOfEvent: [],
        eventHaveMultipleBooths: ref(1).value,
        liveRecorded: ref(1).value,
        parallelSessions: ref(1).value,
      },
      areasOfEvent: [
        'External venue design',
        'Lobby/Info desk',
        'Conference rooms',
        'Expo halls with booths',
        'Other',
      ],
      eventHaveMultipleBooths: ['Yes', 'No'],
      liveRecorded: ['Live', 'Recorded', 'Both'],
      parallelSessions: ['Yes', 'No'],
    };
  },
  methods: {
    onSubmit() {
      //this.$emit('general-layout-submit', this.formState);
      setTimeout(() => {
        this.$message.success('This is a success message');
      }, 1000);
    },
    previousStep() {
      this.$emit('general-layout-previous', this.formState);
    },
  },
});
</script>

<style scoped>
.ant-input-number {
  min-width: 150px;
}
</style>
