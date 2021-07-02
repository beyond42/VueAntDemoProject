<template>
  <a-form
    name="event-info-form"
    ref="formRef"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed">
    <a-form-item
      ref="eventName"
      label="Event name"
      name="eventName"
      has-feedback>
      <a-input v-model:value="formState.eventName" placeholder="Name" />
    </a-form-item>

    <a-form-item
      ref="firstEvent"
      label="First Event"
      name="firstEvent"
      has-feedback>
      <a-radio-group v-model:value="formState.firstEvent">
        <a-radio value="Yes">Yes</a-radio>
        <a-radio value="No">No</a-radio>
      </a-radio-group>
    </a-form-item>

    <a-form-item ref="eventLogo" label="Event logo" name="eventLogo" has-feedback>
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

    <a-form-item
      class="noofdays"
      ref="noOfDays"
      label="Days of event"
      name="noOfDays"
      has-feedback>
      <a-input-number
        v-model:value="formState.noOfDays"
        :min="1"
        placeholder="No of days"/>
    </a-form-item>

    <a-form-item label="Start and end date" class="erodin-mb-0">
      <div class="datumi-inline">
        <a-form-item
          ref="startDate"
          name="startDate"
          has-feedback>
          <a-date-picker
            v-model:value="formState.startDate"
            format="DD-MM-YYYY"
            placeholder="Start"
            style="width: 180px"/>
        </a-form-item>
        <a-form-item
          ref="endDate"
          name="endDate"
          has-feedback>
          <a-date-picker
            v-model:value="formState.endDate"
            format="DD-MM-YYYY"
            placeholder="End"
            style="width: 180px" />
        </a-form-item>
      </div>
    </a-form-item>

    <a-form-item
      ref="timeOfEvent"
      label="Starting time of event"
      name="timeOfEvent"
      has-feedback>
      <a-time-picker
        v-model:value="formState.timeOfEvent"
        :minute-step="15"
        :second-step="10"
        style="width: 180px" />
    </a-form-item>

    <a-row :gutter="[0, 16]" justify="center">
      <a-col class="gutter-row" :span="8">
        <a-form-item>
          <a-button-group>
            <a-button type="primary" @click="previousStep">
              <left-outlined /> Previous
            </a-button>
            <a-button type="primary" @click="nextStep">
              Next <right-outlined />
            </a-button>
          </a-button-group>
        </a-form-item>
      </a-col>
    </a-row>

    <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
      <a-button-group>
        <a-button type="dashed" @click="onSubmit">Test</a-button>
        <a-button type="dashed" @click="resetForm">Reset</a-button>
      </a-button-group>
    </a-form-item>
  </a-form>
</template>

<script>
import {
  InboxOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, reactive, ref, toRaw } from "vue";
import checkNumberInput from "@/utils/checkNumberInput";

export default defineComponent({
  components: {
    InboxOutlined,
    LeftOutlined,
    RightOutlined,
  },

  setup(props, { emit }) {
    const formRef = ref();

    const formState = reactive({
      eventName: "",
      firstEvent: "",
      eventLogo: "",
      noOfDays: undefined,
      startDate: undefined,
      endDate: undefined,
      timeOfEvent: undefined,
    });

    const rules = {
      eventName: [
        {
          required: true,
          message: "Please provide us with your event name",
          trigger: "blur",
        },
        {
          min: 3,
          max: 250,
          message: "Length should be 3 to 250",
          trigger: "blur",
        },
      ],
      firstEvent: [
        {
          required: true,
          message: 'Please select is it your first event',
          trigger: 'change',
        },
      ],
      // TODO Vidjeti za file upload rule ovo nije testirano jel ispravno
      eventLogo: [
        {
          required: true,
          message: 'Please upload the logo',
        },
      ],
      noOfDays: [
        {
          required: true,
          validator: checkNumberInput,
          trigger: "change",
          type: "object",
        },
      ],
      startDate: [
        {
          required: true,
          message: 'Please pick a start date',
          trigger: 'change',
          type: 'object',
        },
      ],
      endDate: [
        {
          required: true,
          message: 'Please pick a end date',
          trigger: 'change',
          type: 'object',
        },
      ],

    };

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 12,
      },
    };

    // New handlers
    const handleFinish = values => {
      console.log(values, formState);
    };

    const handleFinishFailed = errors => {
      console.log(errors);
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log('onSubmit values', formState, toRaw(formState));
        })
        .catch(error => {
          console.log('onSubmit error', error);
        });
    };

    // From old methods
    const handleChange = info => {
      const status = info.file.status;
      console.log("info");
      console.log(info);
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
        this.formState.eventImage = info.file;
      } else if (status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    };

    const handleStartOpenChange = (date, dateString) => {
      this.formState.startDate = dateString;
      console.log(date, dateString);
    };

    const handleEndOpenChange = (date, dateString) => {
      this.formState.endDate = dateString;
      console.log(date, dateString);
    };

    const nextStep = () => {
      emit("event-info-submit", this.formState);
    };

    const previousStep = () => {
      emit("event-info-previous", this.formState);
    };

    return {
      formState,
      formRef,
      rules,
      layout,
      fileList: ref([]),
      // TODO prebaciti handlere u utils koji mogu nekad kasnije
      // New
      handleFinishFailed,
      handleFinish,
      onSubmit,
      resetForm,
      // Old
      handleChange,
      handleStartOpenChange,
      handleEndOpenChange,
      nextStep,
      previousStep,
    };
  },
});
</script>

<style>
.ant-input-number {
  min-width: 180px;
}
.noofdays .ant-form-item-control-input {
  max-width: 215px;
}
.ant-upload.ant-upload-drag p.ant-upload-hint {
  font-size: 80%;
  margin: 0 15px;
}
.datumi-inline {
  display: inline-flex !important;
}
.datumi-inline .ant-col.ant-form-item-control {
  width: 215px !important;
  max-width: 215px !important;
}
.erodin-mb-0 {
  margin-bottom: 0;
}
</style>
