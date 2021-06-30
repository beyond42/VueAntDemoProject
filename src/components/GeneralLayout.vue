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
        v-model:value="formState.areasofEventCheckedList"
        :options="areasofEventOptions"
      />
    </a-form-item>

    <a-form-item
      ref="multipleBooths"
      label="Will your event have multiple booths"
      name="multipleBooths"
      required
    >
<<<<<<< HEAD
      <a-radio-group
        v-model:value="multipleBoothsCheckedList"
=======
      <a-checkbox-group
        v-model:value="formState.multipleBoothsCheckedList"
>>>>>>> 89ca5542b03a231c5a5d44239473fb6f2e677445
        :options="multipleBoothsOptions"
      />
    </a-form-item>

<<<<<<< HEAD
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

=======
    <a-step title="Live stream or recorded" class="liveStreamTitle" />
    <a-radio-group
      v-model:value="formState.liveRecorded"
      :options="liveRecorded"
      class="liveStream"
    >
    </a-radio-group>
    <a-step title="Parrallel sessions" class="parallelsessionsTitle" />
    <a-radio-group
      v-model:value="formState.parallelsessions"
      :options="plainOptions"
      class="parallelsessions"
    >
    </a-radio-group>
>>>>>>> 89ca5542b03a231c5a5d44239473fb6f2e677445
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
    <a-row :gutter="[0, 16]" justify="center">
      <a-col class="gutter-row" :span="10">
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
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
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
        boothsNo: '',
<<<<<<< HEAD
      },

=======
        areasofEventCheckedList: [],
        multipleBoothsCheckedList: [],
        liveRecorded: ref(1).value,
        parallelsessions: ref(1).value,
      },
      plainOptions: ['Yes', 'No'],
>>>>>>> 89ca5542b03a231c5a5d44239473fb6f2e677445
      areasofEventOptions: [
        'External venue design',
        'Lobby/Info desk',
        'Conference rooms',
        'Expo halls with booths',
        'Other',
      ],
<<<<<<< HEAD
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
=======
      plainOptionsBooths: ['Yes', 'No'],
      multipleBoothsOptions: ['Yes', 'No'],
      liveRecorded: ['Live', 'Recorded', 'Both'],
>>>>>>> 89ca5542b03a231c5a5d44239473fb6f2e677445
    };
  },
  methods: {
    nextStep() {
      this.$emit('general-layout-submit', this.formState);
    },
    previousStep() {
      this.$emit('general-layout-previous', this.formState);
    },
  },
});
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
