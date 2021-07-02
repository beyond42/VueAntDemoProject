<template>
  <a-col :flex="4" class="user-details">
    <img id="coverImage" :src="imgSrc"/>
    <h2>{{ name }} {{ isFavorite ? '(Favorite)' : ''}}</h2>
    <a-button @click="toggleFavorite">
      Toggle favorite
    </a-button>
    <a-button @click="toggleDetails">
      {{ detailsAreVisible ? 'Hide' : 'Show' }} Details
    </a-button>
    <ul v-if="detailsAreVisible">
      <li>
        <strong>Phone:</strong>
        {{ phoneNumber }}
      </li>
      <li>
        <strong>Email:</strong>
        {{ emailAddress }}
      </li>
      <li>
        <strong>Date of birth:</strong>
        {{ dateOfBirth }}
      </li>
    </ul>
    <a-button @click="deleteFriend">
      Delete friend
    </a-button>
  </a-col>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    emailAddress: {
      type: String,
      required: true
    },
    isFavorite: {
      type: Boolean,
      required: false,
      default: false,
    },
    dateOfBirth: {
      type: String,
      required: true
    },
    imgSrc: {
      type: String,
      required: false,
      default: '../assets/avatar.png'
    }
  },
  emits: ['toggle-favorite', 'delete'],
  data() {
    return {
      detailsAreVisible: false,
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
    toggleFavorite() {
      this.$emit('toggle-favorite', this.id);
    },
    deleteFriend() {
      this.$emit('delete', this.id);
    }
  }
};
</script>

<style>
    #coverImage {
        width: 300px;
        height: 300px;
    }
</style>