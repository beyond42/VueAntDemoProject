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
      name="boothsNo"
      required
      help="Please enter how many booths you will have"
    >
      <a-input v-model:value="formState.boothsNo" placeholder="NO of booths" />
    </a-form-item>

    <a-form-item
      ref="areasofEvent"
      class="areasofenvent"
      label="Areas of event should feature"
      name="areasofEvent"
      required
    >
      <a-checkbox-group
        v-model:value="areasofEventCheckedList"
        :options="areasofEventOptions"
      />
    </a-form-item>

    <a-form-item
      ref="multipleBooths"
      label="Will your event have multiple booths"
      name="multipleBooths"
      required
    >
      <a-radio-group
        v-model:value="multipleBoothsCheckedList"
        :options="multipleBoothsOptions"
      />
    </a-form-item>

    <a-form-item
      ref="liveStreamRecord"
      label="Live stream or recorded"
      name="liveStreamRecord"
      required
    >
      <a-radio-group
        class="liveStream"
        v-model:value="liveStreamRecordRadio"
        :options="liveStreamRecordRadioOptions"
      >
      </a-radio-group>
    </a-form-item>

    <a-form-item
      ref="parallelSessions"
      label="Parrallel sessions"
      name="parallelSessions"
      required
    >
      <a-radio-group
        class="parallelsessions"
        v-model:value="parallelSessionsRadio"
        :options="parallelSessionsRadioOptions"
      >
      </a-radio-group>
    </a-form-item>

    <a-form-item
      ref="eventAgenda"
      label="Event Agenda"
      class="eventAgenda"
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
          <inbox-outlined></inbox-outlined>
        </p>
        <p class="ant-upload-text">Click or drag file to this area to upload</p>
        <p class="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </a-upload-dragger>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 12,
      },
      formState: {
        boothsNo: '',
      },

      areasofEventOptions: [
        'External venue design',
        'Lobby/Info desk',
        'Conference rooms',
        'Expo halls with booths',
        'Other',
      ],
      areasofEventCheckedList: [],

      multipleBoothsOptions: ['Yes', 'No'],
      multipleBoothsCheckedList: [],

      liveStreamRecordRadioOptions: ['Live', 'Recorded', 'Both'],
      liveStreamRecordRadio: [],

      parallelSessionsRadioOptions: ['Yes', 'No'],
      parallelSessionsRadio: [],

      plainOptions: ['Yes', 'No'],
      checkedList: [],

      plainOptionsBooths: ['Yes', 'No'],
      checkedBoothsList: [],
    };
  },
};
</script>

<style>
/* .liveStream {
  margin-left: 145px;
}
.liveStreamTitle {
  position: absolute;
}
.parallelsessionsTitle {
  margin-top: 24px;
}
.parallelsessions {
  position: absolute;
  top: 248px;
  left: 152px;
}
.eventAgenda {
  margin-top: 24px;
} */
</style>
