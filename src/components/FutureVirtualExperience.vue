<template>
  <a-form
    ref="formRef"
    v-bind="layout">

    <a-form-item
      ref="domainForEvent"
      label="Domain for the event"
      name="domainForEvent"
      has-feedback>
      <a-radio-group
        v-model:value="domainForEvent"
        :options="domainForEventOptions"/>
    </a-form-item>

    <a-form-item
      ref="domainSubdomainName"
      label="Domain / subdomain name"
      name="domainSubdomainName"
      has-feedback
      help="Please enter your own domain or subdomain for event">
      <a-input
        v-model:value="domainSubdomainName"
        placeholder="example.com/example.collectivibe.com"/>
    </a-form-item>

    <a-form-item
      ref="typeOfEvent"
      label="Type of event"
      name="typeOfEvent"
      has-feedback>
      <a-radio-group
        v-model:value="typeOfEvent"
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

    <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
      <a-button-group>
        <a-button type="dashed" @click="resetForm">Reset</a-button>
      </a-button-group>
    </a-form-item>

  </a-form>
</template>

<script>
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import { checkTextInputGeneral } from "@/utils/validators";
import store from "../store";

export default defineComponent({
  components: {
    LeftOutlined,
    RightOutlined,
  },

  computed: {
    domainForEvent: {
      get() {
        return store.state.event.domain_for_event;
      },
      set(value) {
        store.commit('setDomainForEvent', value);
      }
    },
    domainSubdomainName: {
      get() {
        return store.state.event.event_domain;
      },
      set(value) {
        store.commit('setEventDomainName', value);
      }
    },
    typeOfEvent: {
      get() {
        return store.state.event.is_event_opened;
      },
      set(value) {
        store.commit('setTypeOfEvent', value);
      }
    },
  },

  setup(props, { emit }) {
    const formRef = ref();

    // const formState = reactive({
    //   domainForEvent: "",
    //   domainSubdomainName: "",
    //   typeOfEvent: "",
    // });

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

    // New handlers
    const resetForm = () => {
      formRef.value.resetFields();
    };

    // From old methods
    const nextStep = () => {
      emit('future-expirience-submit')
      console.log(store.state);
      // formRef.value
      //   .validate()
      //   .then(() => {
      //     emit('future-expirience-submit')
      //     console.log('onSubmit values', formState, toRaw(formState));
      //   })
      //   .catch(error => {
      //     console.log('onSubmit error', error);
      //   });
    };

    const previousStep = () => {
      emit('future-expirience-previous')
    };

    return {
      formRef,
      layout,
      domainForEventOptions,
      typeOfEventOptions,
      rules,
      // New
      resetForm,
      // Old
      nextStep,
      previousStep
    };
  }
});
</script>
