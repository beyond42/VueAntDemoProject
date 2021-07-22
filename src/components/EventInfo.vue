<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    v-bind="layout">

    <a-form-item
      ref="eventName"
      label="Event name"
      name="eventName"
      has-feedback>
      <a-input
        v-model:value="formState.eventName"
        placeholder="Name" />
    </a-form-item>

    <a-form-item
      ref="firstEvent"
      label="First Event"
      name="firstEvent"
      has-feedback>
      <a-radio-group
        v-model:value="formState.firstEvent"
        :options="options" />
    </a-form-item>

    <a-form-item
      ref="eventLogo"
      label="Event logo"
      name="eventLogo"
      has-feedback>
      <a-upload-dragger
        v-model:fileList="fileList"
        name="file"
        :multiple="true"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="handleChange"
        accept="image/*">
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
        placeholder="No of days" />
    </a-form-item>

    <a-form-item label="Start and end date" class="ant-form-item-required erodin-mb-0">
      <div class="datumi-inline">
        <a-form-item
          ref="startDate"
          name="startDate"
          has-feedback>
          <a-date-picker
            v-model:value="formState.startDate"
            format="YYYY-MM-DD"
            placeholder="Start"
            style="width: 180px" />
        </a-form-item>
        <a-form-item
          ref="endDate"
          name="endDate"
          has-feedback>
          <a-date-picker
            v-model:value="formState.endDate"
            format="YYYY-MM-DD"
            placeholder="End"
            style="width: 180px" />
        </a-form-item>
      </div>
    </a-form-item>

    <a-form-item
      class="timeofevent"
      ref="timeOfEvent"
      label="Starting time of event"
      name="timeOfEvent"
      has-feedback>
      <a-time-picker
        v-model:value="formState.timeOfEvent"
        format="HH:mm"
        :minute-step="5"
        style="width: 180px" />
    </a-form-item>

    <a-row :gutter="[0, 16]" justify="center">
      <a-col class="gutter-row" :span="8">
        <a-form-item>
          <a-button-group>
            <a-button type="primary" @click.prevent="previousStep">
              <left-outlined /> Previous
            </a-button>
            <a-button type="primary" @click.prevent="nextStep">
              Next <right-outlined />
            </a-button>
          </a-button-group>
        </a-form-item>
      </a-col>
    </a-row>

  </a-form>
</template>

<script>
import { InboxOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref } from "vue";
import { message } from "ant-design-vue"
import { checkNumberInput } from "@/utils/validators";

export default defineComponent({
  name: "EventInfo",
  components: {
    InboxOutlined,
    LeftOutlined,
    RightOutlined,
  },
  props: {
    eventName: String,
    firstEvent: String,
    eventLogo: String,
    noOfDays: Number,
    startDate: Object,
    endDate: Object,
    timeOfEvent: Object,
  },

  setup(props, { emit }) {
    const formRef = ref();

    const formState = reactive({
      eventName: props.eventName,
      firstEvent: props.firstEvent,
      eventLogo: props.eventLogo,
      noOfDays: props.noOfDays || undefined,
      startDate: props.startDate || undefined,
      endDate: props.endDate || undefined,
      timeOfEvent: props.timeOfEvent || undefined,
    });

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 12,
      },
    };

    const options = [
      {
        label: "Yes",
        value: "Yes"
      },
      {
        label: "No",
        value: "No"
      }
    ];

    const rules = {
      eventName: [
        {
          required: true,
          message: "Please provide us with your event name",
          trigger: "change",
        },
        {
          min: 3,
          max: 250,
          message: "Length should be 3 to 250",
          trigger: "change",
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
          required: false,
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
      timeOfEvent: [
        {
          required: false,
          message: 'The time of the event',
          trigger: 'change',
          type: 'object',
        }
      ]
    };

    // * Logo upload
    const handleChange = info => {
      console.log(info);
      const status = info.file.status;

      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        // TODO: Proveriti sta treba da se upise u bazu, da li info.file ili nesto drugo, da bi se fajl prikazao u assets folderu na Marsu
        // Primer dobrog upisa u bazi: {fileName: "collectiVibeLogo.png", data: JavaObject[byte[]], size: 12581, contentType: "image/png"}
        // Nas trenutni upis: {"uid":"vc-upload-1626946808493-2","lastModified":1.62383082532E12,"lastModifiedDate":"2021-06-16 08:07:05","name":"avatar.png","size":2801,"type":"image\/png","percent":100,"originFileObj":{"uid":"vc-upload-1626946808493-2"},"status":"done","response":{"name":"xxx.png","status":"done","url":"https:\/\/zos.alipayobjects.com\/rmsportal\/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png","thumbUrl":"https:\/\/zos.alipayobjects.com\/rmsportal\/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"},"xhr":{}}
        formState.eventLogo = info;
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    };

    const nextStep = () => {
      formRef.value
        .validate()
        .then(() => {
          emit("event-info-next", formState);
        })
        .catch(error => {
          console.log('event-info-next error', error);
        });
    };

    const previousStep = () => {
      emit("event-info-previous", formState);
    };

    return {
      formRef,
      formState,
      layout,
      options,
      rules,
      fileList: ref([]),
      handleChange,
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
.timeofevent .ant-form-item-control-input,
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
