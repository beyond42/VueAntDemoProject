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
          <event-user-info
            v-if="current === 0"
            @user-submit="userSubmit">
          </event-user-info>
          <event-info
            v-if="current === 1"
            @event-info-submit="eventInfoSubmit"
            @event-info-previous="eventInfoPrevious">
          </event-info>
          <event-details
            v-if="current === 2"
            @event-details-submit="eventDetailsSubmit"
            @event-details-previous="eventDetailsPrevious">
          </event-details>
          <future-virtual-experience
            v-if="current === 3"
            @future-expirience-submit="futureExpirienceSubmit"
            @future-expirience-previous="futureExpiriencePrevious">
          </future-virtual-experience>
          <general-layout
            v-if="current === 4"
            @general-layout-submit="generalLayoutSubmit"
            @general-layout-previous="generalLayoutPrevious">
          </general-layout>
          <finish v-if="current === 5" :message="submitMessage"></finish>
        </a-col>

        <a-col class="gutter-row" :span="6">
          <a-steps v-model:current="current" direction="vertical">
            <a-step v-for="titles in titles" :key="titles" :title="titles" />
          </a-steps>
        </a-col>
      </a-row>
    </a-form>
  </section>
</template>

<script>
import axios from "axios";
import EventUserInfo from "../components/EventUserInfo.vue";
import EventInfo from "../components/EventInfo.vue";
import EventDetails from "../components/EventDetails.vue";
import FutureVirtualExperience from "../components/FutureVirtualExperience.vue";
import GeneralLayout from "../components/GeneralLayout.vue";
import Finish from "../components/Finish.vue";
import store from "../store";

export default {
  components: {
    EventUserInfo,
    EventInfo,
    EventDetails,
    FutureVirtualExperience,
    GeneralLayout,
    Finish,
  },

  data() {
    return {
      results: [],
      titles: [
        "Personal information",
        "Event information",
        "Event details",
        "Future virtual experience",
        "General layout of virtual event",
      ],
      imageSrc: "",
      current: 0,
      event: {
        event_name: "",
        is_first_event: "",
        event_logo: "",
        days_of_event: 0,
        start_date: "",
        end_date: "",
        starting_time: "",
        user_firstname: "",
        user_lastname: "",
        company_name: "",
        user_email: "",
        user_phone_number: "",
        attendeesNo: 0,
        attendees_location: "",
        exhibitionersNo: "",
        official_event_website_url: "",
        event_hosting: "",
        event_domain: "",
        is_event_opened: 0,
        event_areas: "",
        boothsNo: 0,
        multiple_types_of_booths: 0,
        live_or_recorded_content: "",
        live_parallel_sessions: 0,
        streamingEventsTool: ""
      },
      submitMessage: ""
    };
  },
  methods: {
    userSubmit() {
      this.current++;
    },
    eventInfoPrevious() {
      this.current--;
    },
    eventInfoSubmit() {
      this.current++;
      // TODO: Vratiti kada bude proradio insert image-a
      // this.event.event_logo = formState.eventImage;
    },
    eventDetailsPrevious() {
      this.current--;
    },
    eventDetailsSubmit() {
      this.current++;
    },
    futureExpiriencePrevious() {
      this.current--;
    },
    futureExpirienceSubmit() {
      this.current++;
    },
    generalLayoutSubmit() {
      this.current++;
      this.submitEventData();
    },
    generalLayoutPrevious() {
      this.current--;
    },
    submitEventData() {
      // * MARK: ovaj event prolazi
      // const ev = {
      //   attendeesNo: 99,
      //   attendees_location: '',
      //   boothsNo: 77,
      //   company_name: 'Beyond',
      //   days_of_event: 88,
      //   end_date: '2021-06-20',
      //   event_areas: 'External venue design, Conference rooms, Other, ',
      //   event_domain: 'www.ivanatest.com',
      //   event_hosting: 'Yes',
      //   event_logo: '',
      //   event_name: 'my event vue app 1',
      //   exhibitionersNo: '66',
      //   is_event_opened: 'Closed',
      //   is_first_event: 'Yes',
      //   live_or_recorded_content: 'Live',
      //   live_parallel_sessions: 'Yes',
      //   multiple_types_of_booths: 'Yes',
      //   official_event_website_url: '',
      //   start_date: '2021-06-01',
      //   starting_time: '22:06:00',
      //   streamingEventsTool: 'zoom',
      //   user_email: 'ilic.adam03@gmail.com',
      //   user_firstname: 'Petar',
      //   user_lastname: 'Petrovic',
      //   user_phone_number: '+38177777777777',
      // };

      var ev = store.state.event;
      ev.start_date = ev.start_date.format("YYYY-MM-DD");
      ev.end_date = ev.end_date.format("YYYY-MM-DD");
      ev.starting_time = ev.starting_time.format("HH:MM:SS");
      var areas = "";
      for (const area in ev.event_areas) {
        areas += ev.event_areas[area];
        areas += ", ";
      }
      ev.event_areas = areas;
      ev.user_phone_number = ev.countryCode + ev.phoneNumber;

      console.log(JSON.stringify(ev));
      const headers = {
        "Content-Type": "application/json"
      };

      axios
        .post("https://beyond2.doc.ba/api/postEventData", JSON.stringify(ev), {
          headers: headers
        })
        .then((response) => {
          console.log(response);
          this.submitMessage =
            "Thank you for submitting your information! We will be in touch with you shortly.";
          setTimeout(() => {
            this.$message.success("Event is successfully submitted!");
          }, 1000);
        })
        .catch((err) => {
          console.log(err.response.data);
          this.submitMessage = "Error! Please, try again.";
          setTimeout(() => {
            this.$message.error("Error! Please, try again.");
          }, 1000);
        });
    }
  }
};
</script>
