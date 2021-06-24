<template>
    <a-form
            ref="formRef"
            :model="formState"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            >

            <a-form-item ref="domainForEvent" label="Domain for the event" name="domainForEvent" required>
                <a-checkbox-group v-model:value="checkedList" :options="plainOptions" />
            </a-form-item>

            <a-form-item ref="domainSubdomainName" label="Domain / subdomain name" name="domainSubdomainName" required help="Please enter your own domain or subdomain for event">
                <a-input v-model:value="formState.domainSubdomainName" placeholder="example.com/example.collectivibe.com" />
            </a-form-item>
            
            <a-form-item ref="typeOfEvent" label="Type of event" name="typeOfEvent" required>
                <a-checkbox-group v-model:value="typeOfEventCheckedList" :options="typeOfEventOptions" />
            </a-form-item>
            
            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="previousStep">Previous</a-button>
            
                <a-button type="primary" @click="nextStep">Next</a-button>
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
                domainSubdomainName: '',
            },
            plainOptions: ['Yes', 'No'],
            typeOfEventOptions: ['Opened', 'Closed'],
            checkedList: [],
            typeOfEventCheckedList: [],
        }
    },
    emits: ['next-step', 'previous-step'],
    methods: {
        nextStep() {
            this.$emit('next-step');
        },
        previousStep() {
            this.$emit('previous-step');
        },
    }
}
</script>

<style>

</style>