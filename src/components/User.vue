<template>
    <a-form
            ref="formRef"
            :model="formState"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            >
            <a-form-item ref="name" label="First name" name="name" required help="Please provide us with your name">
                <a-input v-model:value="formState.name" placeholder="Name" />
            </a-form-item>
            <a-form-item ref="last_name" label="Last name" name="last_name" required help="Please provide us with your surname">
            <a-input v-model:value="formState.last_name" placeholder="Surname" />
            </a-form-item>
            <a-form-item ref="company" label="Company" name="company" required help="Company or organisation you represent">
            <a-input v-model:value="formState.company" placeholder="Company / Organization"/>
            </a-form-item>
            <a-form-item ref="email" label="Email address" name="email" required help="Please provide us your email address for contact">
            <a-input type="email" v-model:value="formState.email" placeholder="Bussines email address"/>
            </a-form-item>
            <a-form-item ref="phone" label="Phone number" name="phone" required help="Please provide us your phone number">
                <a-input-group compact>
                    <a-select style="width: 25%" v-model:value="formState.country_code">
                        <a-select-option value="+381">+381</a-select-option>
                        <a-select-option value="+387">+387</a-select-option>
                    </a-select>
                    <a-input style="width: 75%" v-model:value="formState.phone_num" placeholder="555 555-1234"/>
                </a-input-group>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="nextStep">Next</a-button>
            </a-form-item>
        </a-form>

</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            formState: {
                name: '', 
                last_name: '',
                company: '',
                email: '',
                country_code: '+381',
                phone_num: ''
            },
            results: [],
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 14,
            }
        }
    }, 
    async created() {
        try {
        const res = await axios.get(`https://beyond2.doc.ba/api/getEvents?user_id=` + '1')
        console.log(res);
        this.results = res.data;
        console.log(this.results);
        } catch(e) {
        console.error(e)
        }
    },
    emits: ['next-step'],
    methods: {
        nextStep() {
            this.$emit('next-step');
        }
    }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400;1,500&display=swap');

html, body {
  font-family: 'Poppins', sans-serif;
}

h1 {
    /* position: absolute;
    width: 291px;
    height: 34px;
    left: 645px;
    top: 120px; */

    font-family: 'Poppins';
    font-style: normal;
    font-weight: normal;
    font-size: 28px;
    line-height: 34px;

    color: #000000;
}

section {
    padding: 60px;
}

a-input {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 12px;

    position: static;
    width: 363px;
    height: 40px;
    left: 0px;
    top: 0px;

    /* Gray / gray-1 */
    background: #FFFFFF;
    /* Gray / gray-5 */
    border: 1px solid #D9D9D9;
    box-sizing: border-box;
    border-radius: 2px;

    /* Inside Auto Layout */
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 0px 0px;
}

.ant-form-item-explain, .ant-form-item-extra {
    /* clear: both;
    min-height: 24px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 1.5715;
    transition: color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    padding-top: 0px; */
    position: static;
    width: 363px;
    height: 22px;
    left: 0px;
    top: 2px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 22px;
    /* identical to box height, or 183% */

    /* Gray / gray-7 */
    color: #8C8C8C;


    /* Inside Auto Layout */
    flex: none;
    order: 0;
    flex-grow: 1;
    margin: 0px 0px;
}

.ant-form-item-with-help {
    margin-bottom: 20px;
}

.ant-input {
    font-family: Poppins;
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 24px;
    /* identical to box height, or 171% */

    /* Gray / gray-7 */
    color: #8C8C8C;
}

.ant-steps-item-title {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */

    /* Gray / gray-9 */
    color: #262626;


    /* Inside Auto Layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
    margin: 8px 0px;
}

.ant-steps-item-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 4px 0px 12px;
}

</style>