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
        v-model:value="formState.expoFeatureCheckedList"
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
        v-model:value="formState.officialWebsiteCheckedList"
        :options="plainOptions"
      />
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
import { defineComponent } from 'vue';
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
        attendeesNo: '',
        exhibitionersNo: '',
        officialWebsiteCheckedList: [],
        expoFeatureCheckedList: [],
      },
      plainOptions: ['Yes', 'No'],
    };
  },
  emits: ['event-details-submit', 'event-details-previous'],
  methods: {
    handleStartOpenChange(date, dateString) {
      this.formState.startDate = dateString;
      console.log(date, dateString);
    },
    handleEndOpenChange(date, dateString) {
      this.formState.endDate = dateString;
      console.log(date, dateString);
    },
    nextStep() {
      this.$emit('event-details-submit', this.formState);
    },
    previousStep() {
      this.$emit('event-details-previous', this.formState);
    },
  },
});
</script>

<style></style>
