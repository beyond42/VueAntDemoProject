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
      <a-checkbox-group
        v-model:value="multipleBoothsCheckedList"
        :options="multipleBoothsOptions"
      />
    </a-form-item>

    <a-step title="Live stream or recorded" class="liveStreamTitle" />
    <a-radio-group v-model:value="value" class="liveStream">
      <a-radio :style="radioStyle" :value="1">Live</a-radio>
      <a-radio :style="radioStyle" :value="2">Recorded</a-radio>
      <a-radio :style="radioStyle" :value="3">Both</a-radio>
    </a-radio-group>
    <a-step title="Parrallel sessions" class="parallelsessionsTitle" />
    <a-radio-group v-model:value="value" class="parallelsessions">
      <a-radio :style="radioStyle" :value="1">Yes</a-radio>
      <a-radio :style="radioStyle" :value="2">No</a-radio>
    </a-radio-group>
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
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      formState: {
        boothsNo: "",
      },

      plainOptions: ["Yes", "No"],
      areasofEventOptions: [
        "External venue design",
        "Lobby/Info desk",
        "Conference rooms",
        "Expo halls with booths",
        "Other",
      ],
      checkedList: [],
      areasofEventCheckedList: [],

      plainOptionsBooths: ["Yes", "No"],
      multipleBoothsOptions: ["Yes", "No"],
      checkedBoothsList: [],
      multipleBoothsCheckedList: [],
    };
  },
};
</script>

<style>
.liveStream {
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
}
</style>
