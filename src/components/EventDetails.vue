<template>
    <a-form
        ref="formRef"
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        v-if="eventCounter === 1"
        >
        <a-form-item ref="name" label="Event name" name="name" required help="Please provide us with your event name">
            <a-input v-model:value="formState.eventName" placeholder="Name" />
        </a-form-item>
        

        <a-form-item ref="firstEvent" label="First Event" name="firstEvent" required>
            <a-checkbox-group v-model:value="checkedList" :options="plainOptions" />
        </a-form-item>

        <a-form-item ref="eventLogo" label="Event logo" name="eventLogo" required>
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
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
                </p>
            </a-upload-dragger>
        </a-form-item>

        <a-form-item ref="noOfDays" label="Days of event" name="noOfDays" required help="Please enter how many days event will last">
            <a-input v-model:value="formState.noOfDays" placeholder="NO of days" />
        </a-form-item>

        <a-form-item ref="startEndDate" label="Start and end date" name="startEndDate" required>
            <a-space direction="horizontal" label="Start and end date">
                <a-date-picker
                v-model:value="formState.startDate"
                format="YYYY-MM-DD"
                placeholder="Start"
                @openChange="handleStartOpenChange"
                />
                <a-date-picker
                v-model:value="formState.endDate"
                format="YYYY-MM-DD"
                placeholder="End"
                @openChange="handleEndOpenChange"
                />
            </a-space>
        </a-form-item>

        <a-form-item ref="time" label="Starting time of event" name="time" required help="Please enter at what time event will start">
            <a-time-picker v-model:value="formState.time" :minute-step="15" :second-step="10" />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="previousStep">Previous</a-button>
        
            <a-button type="primary" @click="nextStepEvent">Next</a-button>
        </a-form-item>

    </a-form>

    <a-form ref="formRef"
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        v-if="eventCounter === 2"
        >
        <a-form-item ref="noOfAttendees" label="Number of attendees" name="attendeesNo" required help="Please provide us with number of attendees you expect">
            <a-input v-model:value="formState.attendeesNo" placeholder="NO" />
        </a-form-item>

        <a-form-item ref="expoFeature" label="Expo feature" name="expoFeature" required>
            <a-checkbox-group v-model:value="expoFeatureCheckedList" :options="plainOptions" />
        </a-form-item>

        <a-form-item ref="noOfExhibitioners" label="Number of exhibitioners" name="exhibitionersNo" required help="Please provide us with number of exhibitioners you expect">
            <a-input v-model:value="formState.exhibitionersNo" placeholder="NO" />
        </a-form-item>

        <a-form-item ref="officialWebsite" label="Official website of event" name="officialWebsite" required>
            <a-checkbox-group v-model:value="officialWebsiteCheckedList" :options="plainOptions" />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="previousStepEvent">Previous</a-button>
        
            <a-button type="primary" @click="nextStep">Next</a-button>
        </a-form-item>
        
    </a-form>


</template>

<script>
import { InboxOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';

export default 
    defineComponent({
    components: {
        InboxOutlined,
    },
    data() {
        return {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 14,
            },
            formState: {
                eventName: '', 
                noOfDays: '',
                startDate: '',
                endDate: '',
                time: '',
                attendeesNo: '',
                exhibitionersNo: '',
            },
            plainOptions: ['Yes', 'No'],
            checkedList: [],
            officialWebsiteCheckedList: [],
            expoFeatureCheckedList: [],
            fileList: ref([]),
            eventCounter: 1,
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
        previousStepEvent() {
            this.eventCounter--;
        },
        nextStepEvent() {
            this.eventCounter++;
        },
        handleChange(info) {
            const status = info.file.status;

            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        handleStartOpenChange(date, dateString) {
            this.formState.startDate = dateString;
            console.log(date, dateString);
        },
        handleEndOpenChange(date, dateString) {
            this.formState.endDate = dateString;
            console.log(date, dateString);
        },
        
    }
    
    })

</script>

<style>

</style>