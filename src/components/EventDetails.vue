<template>
  <a-form
    ref="formRef"
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item
      ref="noOfAttendees"
      label="Number of attendees"
      name="attendeesNo"
      required
      help="Please provide us with number of attendees you expect"
    >
      <a-input v-model:value="formState.attendeesNo" placeholder="NO" />
    </a-form-item>

    <a-form-item
      ref="expoFeature"
      label="Expo feature"
      name="expoFeature"
      required
    >
      <a-checkbox-group
        v-model:value="expoFeatureCheckedList"
        :options="plainOptions"
      />
    </a-form-item>

    <a-form-item
      ref="noOfExhibitioners"
      label="Number of exhibitioners"
      name="exhibitionersNo"
      required
      help="Please provide us with number of exhibitioners you expect"
    >
      <a-input v-model:value="formState.exhibitionersNo" placeholder="NO" />
    </a-form-item>

    <a-form-item
      ref="officialWebsite"
      label="Official website of event"
      name="officialWebsite"
      required
    >
      <a-checkbox-group
        v-model:value="officialWebsiteCheckedList"
        :options="plainOptions"
      />
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
        attendeesNo: '',
        exhibitionersNo: '',
      },
      plainOptions: ['Yes', 'No'],
      checkedList: [],
      officialWebsiteCheckedList: [],
      expoFeatureCheckedList: [],
    };
  },

  methods: {
    handleStartOpenChange(date, dateString) {
      this.formState.startDate = dateString;
      console.log(date, dateString);
    },
    handleEndOpenChange(date, dateString) {
      this.formState.endDate = dateString;
      console.log(date, dateString);
    },
  },
};
</script>

<style></style>
