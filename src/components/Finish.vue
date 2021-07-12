<template>
  <a-result
    v-if="statusMessage"
    status="success"
    title="Thank you for submitting your information!"
    sub-title="We will be in touch with you shortly.">
  </a-result>

  <a-result v-else status="warning" title="Error! Please, try again.">
  </a-result>

</template>

<script>
export default {
  props: ['statusMessage'],
};
</script>
