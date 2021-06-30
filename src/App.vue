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
