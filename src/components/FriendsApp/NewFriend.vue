<template>
  <a-form @submit.prevent="submitData">
    <a-row>
      <label>Name</label>
      <a-input type="text" v-model:value="enteredName" placeholder="Please input your name" />
    </a-row>
    <a-row>
      <label>Phone number</label>
      <a-input type="tel" v-model:value="enteredPhone" placeholder="Please input your phone number"/>
    </a-row>
    <a-row :class="[isEmailValid()]">
      <label>E-mail</label>
      <a-input type="email" v-model:value="enteredEmail" placeholder="Please input your e-mail"/>
    </a-row>
    <a-row justify="space-between">
      <a-col :flex="6">
        <label>Date of birth</label>
        <a-date-picker @change="onChange" />
      </a-col>

      <a-col :flex="6">
        <a-upload
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :before-upload="beforeUpload"
          @change="handleChange">
          <img v-if="imgSrc" :src="imgSrc" alt="avatar" />
          <div v-else>
            <!-- <a-icon :type="loading ? 'loading' : 'plus'" /> -->
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
      </a-col>
    </a-row>
    <a-row justify="center">
      <a-button @click="submitData">
        Add contact
      </a-button>
    </a-row>
  </a-form>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data() {
    return {
      enteredName: '',
      enteredPhone: '',
      enteredEmail: '',
      imgSrc: '',
      imgName: '',
      date: new Date().toISOString().slice(0,10),
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      loading: false,
    }
  },
  emits: ['add-contact'],
  methods: {
    onChange(date, dateString) {
      this.date = dateString;
      console.log(date, dateString);
    },
    submitData() {
      this.imgName = "imageSource" + new Date().toISOString()
      window.localStorage.setItem(this.imgName, JSON.stringify(this.imgSrc));
      console.log('u new friend')
      console.log(this.enteredName, this.enteredPhone, this.enteredEmail, this.date, this.imgName)
      this.$emit('add-contact', this.enteredName, this.enteredPhone, this.enteredEmail, this.date, this.imgName);
      this.enteredName = '';
      this.enteredPhone = '';
      this.enteredEmail = '';
      this.imgSrc = '';
      this.date = ''
    },
    isEmailValid: function() {
      return (this.enteredEmail == "")? "" : (this.reg.test(this.enteredEmail)) ? 'has-success' : 'has-error';
    },
    isButtonEnabled() {
      if (this.isEmailValid() === 'has-success') {
        return true;
      } else {
        return false;
      }
    },
    handleChange(info) {
      console.log(info.file.status)
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imgSrc = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
  },
}
</script>

<style>
    .has-error input {
        color: #a94442;
        border-color: #a94442;
        -webkit-box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
        box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
    }

    .has-success input:focus {
        border-color: #2b542c;
        color: #2b542c;
        -webkit-box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 6px #67b168;
        box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 6px #67b168;
    }

    .avatar-uploader > .ant-upload {
        width: 128px;
        height: 128px;
    }
    .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
    }

    /* .ant-input {
        width: 70%;
        display: inline-table;
    } */

</style>