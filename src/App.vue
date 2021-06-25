<template>
  <section>
    <a-form>
      <a-row :gutter="[0, 16]" justify="center">
        <a-col class="gutter-row" :span="10">
          <h1>{{ titles[current] }}</h1>
        </a-col>
      </a-row>

      <a-row :gutter="16" justify="center">
        <a-col class="gutter-row" :span="12">
          <user v-if="current === 0" @next-step="nextStep"></user>
          <event-info
            v-if="current === 1"
            @next-step="nextStep"
            @previous-step="previousStep"
          >
          </event-info>
          <event-details
            v-if="current === 2"
            @next-step="nextStep"
            @previous-step="previousStep"
          >
          </event-details>
          <future-virtual-experience
            v-if="current === 3"
            @next-step="nextStep"
            @previous-step="previousStep"
          >
          </future-virtual-experience>
          <general-layout
            v-if="current === 4"
            @previous-step="previousStep"
          ></general-layout>
        </a-col>

        <a-col class="gutter-row" :span="6">
          <a-steps v-model:current="current" direction="vertical">
            <a-step title="Personal information" />
            <a-step title="Event information" />
            <a-step title="Event details" />
            <a-step title="Future virtual experience" />
            <a-step title="General layout of virtual event" />
          </a-steps>
        </a-col>
      </a-row>

      <a-row :gutter="[0, 16]" justify="center">
        <a-col class="gutter-row" :span="10">
          <a-form-item>
            <a-button-group>
              <a-button v-if="current > 0" type="primary" @click="previousStep">
                <LeftOutlined /> Previous
              </a-button>
              <a-button
                v-if="current < titles.length - 1"
                type="primary"
                @click="nextStep"
              >
                Next <RightOutlined />
              </a-button>
              <a-button
                v-if="current == titles.length - 1"
                type="primary"
                @click="success"
              >
                Submit <SaveOutlined />
              </a-button>
            </a-button-group>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </section>
</template>

<script>
import {
  LeftOutlined,
  RightOutlined,
  SaveOutlined,
} from '@ant-design/icons-vue';

import axios from 'axios';
import User from './components/User.vue';
import EventInfo from './components/EventInfo.vue';
import EventDetails from './components/EventDetails.vue';
import FutureVirtualExperience from './components/FutureVirtualExperience.vue';
import GeneralLayout from './components/GeneralLayout.vue';

export default {
  components: {
    User,
    EventInfo,
    EventDetails,
    FutureVirtualExperience,
    GeneralLayout,
    LeftOutlined,
    RightOutlined,
    SaveOutlined,
  },

  data() {
    return {
      results: [],
      titles: [
        'Personal information',
        'Event information',
        'Event details',
        'Future virtual experience',
        'General layout of virtual event',
      ],
      imageSrc: '',
      current: 0,
    };
  },

  async created() {
    try {
      const res = await axios.get(`http://localhost:3000/users`);
      this.results = res.data;
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    async toggleFavoriteStatus(friendId) {
      const identifiedFriend = this.results.find(
        (friend) => friend.id === friendId
      );
      identifiedFriend.isFavorite = !identifiedFriend.isFavorite;
      await axios
        .patch('http://localhost:3000/users/' + friendId, {
          isFavorite: identifiedFriend.isFavorite,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err.response.data));
    },
    async addContact(name, phone, email, date, imgSrc) {
      const newFriendContact = {
        id: new Date().toISOString(),
        name: name,
        phone: phone,
        email: email,
        isFavorite: false,
        date: date,
        imgSrc: imgSrc,
      };
      const res = await axios.post(
        `http://localhost:3000/users`,
        newFriendContact
      );
      this.results = [...this.results, res.data];
    },
    deleteContact(friendId) {
      axios
        .delete('http://localhost:3000/users/' + friendId)
        .then((response) => {
          this.results = this.results.filter(
            (friend) => friend.id !== friendId
          );
          console.log(response);
          console.log(this.results);
        });
    },
    findImg(imgSrc) {
      return JSON.parse(window.localStorage.getItem(imgSrc));
    },

    nextStep() {
      this.current++;
      console.log(this.current);
    },
    previousStep() {
      this.current--;
      console.log(this.current);
    },
    success() {
      this.$message.success('This is a success message');
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400;1,500&display=swap');

html,
body {
  font-family: 'Poppins', sans-serif;
}

h1 {
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
  background: #ffffff;
  /* Gray / gray-5 */
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  border-radius: 2px;

  /* Inside Auto Layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 0px;
}

.ant-form-item-explain,
.ant-form-item-extra {
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

  /* Gray / gray-7 */
  color: #8c8c8c;

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

  /* Gray / gray-7 */
  color: #8c8c8c;
}

.ant-steps-item-title {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;

  /* Gray / gray-9 */
  color: #262626;

  /* Inside Auto Layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 0px 0px;
}

.ant-steps-item-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 12px;
  min-height: 68px !important;
}
</style>
