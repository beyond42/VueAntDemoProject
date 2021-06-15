<template>
    <form @submit.prevent="submitData">
        <div>
            <label>Name</label>
            <input type="text" v-model='enteredName' />
        </div>
        <div>
            <label>Phone</label>
            <input type="tel" v-model='enteredPhone' />
        </div>
        <div :class="[isEmailValid()]">
            <label>E-mail</label>
            <input type="email" v-model='enteredEmail' />
        </div>
        <div>
            <label>Date of birth</label>
            <input type="date" v-model="date">
        </div>
        <div>
            <button>Add contact</button>
        </div>
    </form>
    <form @submit.prevent="submitFile">
        <div>
            <label>File</label>
            <input type="file" id="file" ref="file" v-on:change="loadTextFromFile"/>
            <!-- <input type='file' files.bind="file" id="input"/> -->
        </div>
        <div>
            <img id="coverImage" :src="imgSrc" width="650px" height="300px"/>
        </div>
        <div>
            <button>Add file</button>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            enteredName: '',
            enteredPhone: '',
            enteredEmail: '',
            file: '',
            imgSrc: '',
            date: new Date().toISOString().slice(0,10),
            reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
        }
    },
    emits: ['add-contact', 'add-contact-image'],
    methods: {
        handleFileUpload(){
            this.file = this.$refs.file.files[0];

            // if (this.file  !== null) {
            //     console.log('u ifu smo')
            //     var reader = new FileReader();
            //     reader.onload = e => console.log(e);
                // reader.onload = (e) => {
                //     var tmpE = e;
                //     // $('#coverImage').attr('src', tmpE.target.result);
                //     // this.file = tmpE.target.result;
                //     console.log('file')
                //     console.log(this.file)
                //     console.log('target.result')
                //     console.log(tmpE.target.result)
                // }
                // reader.readAsDataURL(this.file[0]);
            // }
            console.log('van ifa file')
            console.log(this.file)
        },
        loadTextFromFile(ev) {
            const file = ev.target.files[0];
            const reader = new FileReader();

            // reader.onload = e => this.$emit("load", e.target.result);
            reader.onload = e => {
                console.log(e.target.result);
                this.imgSrc = e.target.result;
                console.log(this.imgSrc)
            }
            
            reader.readAsDataURL(file);

            

        },
        submitData() {
            this.$emit('add-contact', this.enteredName, this.enteredPhone, this.enteredEmail, this.date);
            // this.$emit('add-contact-image', this.enteredName, this.enteredPhone, this.enteredEmail, this.date, this.file);
            this.enteredName = '';
            this.enteredPhone = '';
            this.enteredEmail = '';
        },
        submitFile() {
            // this.$emit('add-contact-image', this.enteredName, this.enteredPhone, this.enteredEmail, this.date, this.file);
        },
        isEmailValid: function() {
            return (this.enteredEmail == "")? "" : (this.reg.test(this.enteredEmail)) ? 'has-success' : 'has-error';
        }
    }
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

    #coverImage {
        width: 300px;
        height: 300px;
    }

</style>