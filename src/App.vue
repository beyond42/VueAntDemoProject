<template>
<!-- <a-row type="flex">
    <new-friend @add-contact="addContact"></new-friend>
</a-row>
<a-row type="flex">
      <friend-contact 
        v-for="friend in results"
        :key="friend.id"
        :id="friend.id"
        :name="friend.name" 
        :phone-number="friend.phone" 
        :emailAddress="friend.email"
        :is-favorite="friend.isFavorite"
        :dateOfBirth="friend.date"
        :imgSrc="findImg(friend.imgSrc)"
        @toggle-favorite='toggleFavoriteStatus'
        @delete='deleteContact'>
      </friend-contact>
</a-row> -->
  
    <!-- <ant-form></ant-form> -->
<!-- <a-row type="flex"> -->
    <!-- <user></user> -->


    
<!-- </a-row> -->

<section>
    <a-row :gutter="16" justify="center">
        <a-col class="gutter-row" :span="14">
            <h1>{{ titles[current] }}</h1>
        </a-col>
    </a-row>

    <a-row :gutter="16" justify="center">
        <a-col class="gutter-row" :span="12">
            <user
            v-if="current === 0"
            @next-step='nextStep'
            ></user>
            <event-details
            v-if="current === 1"
            @next-step='nextStep'
            @previous-step='previousStep'>
            </event-details>
            <future-virtual-experience
            v-if="current === 2"
            @next-step='nextStep'
            @previous-step='previousStep'>
            </future-virtual-experience>
            <general-layout
            v-if="current === 3"
            @previous-step='previousStep'></general-layout>

        </a-col>

        <a-col class="gutter-row" :span="6">
            <a-steps v-model:current="current" direction="vertical">
                <a-step title="Personal information" />
                <a-step title="Event information" />
                <a-step title="Future virtual experience" />
                <a-step title="General layout of virtual event" />
            </a-steps>
        </a-col>
    </a-row>

</section>

</template>

<script>
import axios from 'axios';
import User from './components/User.vue';
import EventDetails from './components/EventDetails.vue';

export default {
  components: { User, EventDetails },
  data() {
    return {
      results: [],
      titles: ['Personal information', 'Event info', 'Future virtual experience', 'General layout of virtual event'],
      imageSrc: '',
      current: 0
    };
  },
  async created() {
    try {
      const res = await axios.get(`http://localhost:3000/users`)
      this.results = res.data;
    } catch(e) {
      console.error(e)
    }
  },
  methods: {
    async toggleFavoriteStatus(friendId) {
       const identifiedFriend = this.results.find(
        (friend) => friend.id === friendId);
      identifiedFriend.isFavorite = !identifiedFriend.isFavorite;
      await axios.patch('http://localhost:3000/users/' + friendId, { isFavorite: identifiedFriend.isFavorite }).then(response => {
        console.log(response)
      })
      .catch(err => console.log(err.response.data));
    },
    async addContact(name, phone, email, date, imgSrc) {
      const newFriendContact = {
        id: new Date().toISOString(),
        name: name,
        phone: phone,
        email: email,
        isFavorite: false,
        date: date,
        imgSrc: imgSrc
      }
      const res = await axios.post(`http://localhost:3000/users`, newFriendContact)
      this.results = [...this.results, res.data]

    },
    deleteContact(friendId) {
      axios
      .delete("http://localhost:3000/users/" + friendId)
      .then(response => {
        this.results = this.results.filter((friend) => friend.id !== friendId);
        console.log(response)
        console.log(this.results);
      });
    },
    findImg(imgSrc) {
      return JSON.parse(window.localStorage.getItem(imgSrc));
    },
    nextStep() {
      this.current++;
      console.log(this.current)
    },
    previousStep() {
      this.current--;
      console.log(this.current)
    }
  }
};
</script>

<style>
/* * {
  box-sizing: border-box;
}
html {
  font-family: "Jost", sans-serif;
}
body {
  margin: 0;
}
header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 3rem auto;
  border-radius: 10px;
  padding: 1rem;
  background-color: #58004d;
  color: white;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}
#app ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
#app li,
#app form {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: left;
  width: 90%;
  max-width: 40rem;
}
#app .user-details {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
}
#app h2 {
  font-size: 1.2rem;
  border-bottom: 4px solid #ccc;
  color: #58004d;
  margin: 0 0 1rem 0;
}

#app input {
  font: inherit;
  padding: 0.15rem;
}
#app label {
  text-align: left;
  margin-right: 1rem;
  margin-bottom: 0.3rem;
  display: inline;
}
#app form div {
  margin: 1rem 0;
} */
</style>
