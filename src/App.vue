<template>
<a-row type="flex">
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
</a-row>
  
    
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      results: [],
      imageSrc: ''
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
    }
  }
};
</script>

<style>
* {
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
}
</style>
