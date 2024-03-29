<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    v-bind="layout">

    <a-form-item
      ref="domainForEvent"
      label="Domain for the event"
      name="domainForEvent"
      has-feedback>
      <a-radio-group
        v-model:value="formState.domainForEvent"
        :options="domainForEventOptions"/>
    </a-form-item>

    <a-form-item
      ref="domainSubdomainName"
      label="Domain / subdomain name"
      name="domainSubdomainName"
      has-feedback
      help="Please enter your own domain or subdomain for event">
      <a-input
        v-model:value="formState.domainSubdomainName"
        placeholder="example.com/example.collectivibe.com"/>
    </a-form-item>

    <a-form-item
      ref="typeOfEvent"
      label="Type of event"
      name="typeOfEvent"
      has-feedback>
      <a-radio-group
        v-model:value="formState.typeOfEvent"
        :options="typeOfEventOptions" />
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
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
import { notification } from "ant-design-vue";
import { defineComponent, reactive, ref } from 'vue';
import { checkTextInputGeneral } from "@/utils/validators";

export default defineComponent({
  name: "FutureExpirience",
  components: {
    LeftOutlined,
    RightOutlined,
  },
  props: {
    domainForEvent: String,
    domainSubdomainName: String,
    typeOfEvent: String
  },

  setup(props, { emit }) {
    const formRef = ref();

    const formState = reactive({
      domainForEvent: props.domainForEvent,
      domainSubdomainName: props.domainSubdomainName,
      typeOfEvent: props.typeOfEvent,
    });

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 12,
      }
    };

    const domainForEventOptions = [
      {
        label: "Yes",
        value: "Yes"
      },
      {
        label: "No",
        value: "No"
      }
    ]

    const typeOfEventOptions = [
      {
        label: "Opened",
        value: "Opened"
      },
      {
        label: "Closed",
        value: "Closed"
      }
    ];

    const rules = {
      domainForEvent: [
        {
          required: true,
          message: "Please chose \"Yes\" or \"No\"",
          trigger: "change",
        },
      ],
      domainSubdomainName: [
        {
          required: true,
          validator: checkTextInputGeneral,
          trigger: 'change',
        },
      ],
      typeOfEvent: [
        {
          required: true,
          message: "Please chose \"Opened\" or \"Closed\"",
          trigger: "change",
        },
      ],
    };

    const nextStep = () => {
      formRef.value
        .validate()
        .then(() => {
          notification.success({
            message: 'Success',
            description: 'Uspjesno ste popunili sva polja na ovom koraku!',
            duration: 2,
            placement: 'bottomRight',
          });
          setTimeout(() => {
            emit('future-expirience-next', formState);
          }, 2250);
        })
        .catch(() => {
          notification.error({
            message: 'Nedostaju podaci',
            description: 'Molimo popunite obavezna polja!',
            duration: 3
          });
        });
    };

    const previousStep = () => {
      emit('future-expirience-previous', formState)
    };

    return {
      formRef,
      formState,
      layout,
      domainForEventOptions,
      typeOfEventOptions,
      rules,
      nextStep,
      previousStep
    };
  }
});
</script>
