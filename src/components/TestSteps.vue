<template>
  <a-row type="flex" justify="center">
    <a-col :span="12">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="steps-content">
        {{ steps[current].content }}
      </div>
      <div class="steps-action">
        <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
          <left-outlined /> Previous
        </a-button>
        <a-button v-if="current < steps.length - 1" type="primary" @click="next">
          Next <right-outlined/>
        </a-button>
        <a-button
          v-if="current == steps.length - 1"
          type="primary"
          @click="$message.success('Processing complete!')">
          Done
        </a-button>
      </div>
    </a-col>
  </a-row>
</template>
<script>
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    LeftOutlined,
    RightOutlined
  },

  setup() {
    const current = ref(0);

    const next = () => {
      current.value++;
    };

    const prev = () => {
      current.value--;
    };

    return {
      current,
      steps: [
        {
          title: "First",
          content: "First-content"
        },
        {
          title: "Second",
          content: "Second-content"
        },
        {
          title: "Last",
          content: "Last-content"
        }
      ],
      next,
      prev
    };
  }
});
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}
</style>
