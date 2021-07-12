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
            :firstName="event.user_firstname"
            :lastName="event.user_lastname"
            :company="event.company_name"
            :email="event.user_email"
            :countryCode="event.countryCode"
            :phoneNumber="event.user_phone_number"
            @event-user-info-next="eventUserInfoNext">
          </event-user-info>
          <event-info
            v-if="current === 1"
            :eventName="event.event_name"
            :firstEvent="event.is_first_event"
            :eventLogo="event.event_logo"
            :noOfDays="event.days_of_event"
            :startDate="event.start_date"
            :endDate="event.end_date"
            :timeOfEvent="event.starting_time"
            @event-info-next="eventInfoNext"
            @event-info-previous="eventInfoPrevious">
          </event-info>
          <event-details
            v-if="current === 2"
            :noOfAttendees="event.attendeesNo"
            :expoFeature="event.expo_feature"
            :noOfExhibitioners="event.exhibitionersNo"
            :officialWebsite="event.event_hosting"
            @event-details-next="eventDetailsNext"
            @event-details-previous="eventDetailsPrevious">
          </event-details>
          <future-virtual-experience
            v-if="current === 3"
            :domainForEvent="event.domain_for_event"
            :domainSubdomainName="event.event_domain"
            :typeOfEvent="event.is_event_opened"
            @future-expirience-next="futureExpirienceNext"
            @future-expirience-previous="futureExpiriencePrevious">
          </future-virtual-experience>
          <general-layout
            v-if="current === 4"
            :noOfBooths="event.boothsNo"
            :areasOfEvent="event.event_areas"
            :eventHaveMultipleBooths="event.multiple_types_of_booths"
            :liveRecorded="event.live_or_recorded_content"
            :parallelSessions="event.live_parallel_sessions"
            :preferredTool="event.streamingEventsTool"
            @general-layout-submit="generalLayoutSubmit"
            @general-layout-previous="generalLayoutPrevious">
          </general-layout>
          <finish v-if="current === 5" :statusMessage="submitStatus"></finish>
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
import { defineComponent } from 'vue';

export default defineComponent({
  name: "HomePage",
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
        // ? Personal Information
        user_firstname: "", // varchar
        user_lastname: "", // varchar
        company_name: "", // varchar
        user_email: "", // varchar
        countryCode: "", // varchar
        user_phone_number: "", // varchar
        // ? Event information
        event_name: "", // varchar
        is_first_event: "", // varchar
        event_logo: "", // blob
        days_of_event: 0, // int
        start_date: undefined, // date
        end_date: undefined, // date
        starting_time: undefined,  // time
        // ? Event details
        attendeesNo: 0, // int
        expo_feature: "", // varchar
        exhibitionersNo: 0, // varchar
        event_hosting: "", // varchar
        // ? Future virtual experience
        domain_for_event: "", // varchar
        event_domain: "", // varchar
        is_event_opened: "", // varchar
        // ? General layout of virtual event
        boothsNo: 0, // int
        event_areas: [], // varchar
        multiple_types_of_booths: "", // varchar
        live_or_recorded_content: "", // varchar
        live_parallel_sessions: "", // varchar
        streamingEventsTool: "", // varchar
      },
      submitStatus: true
    };
  },
  methods: {
    // * Event User Information
    eventUserInfoNext(formState) {
      this.current++;
      this.event.user_firstname = formState.firstName;
      this.event.user_lastname = formState.lastName;
      this.event.company_name = formState.company;
      this.event.user_email = formState.email;
      this.event.user_phone_number = formState.phoneNumber;
      this.event.countryCode = formState.countryCode;
    },

    // * Event Information
    eventInfoPrevious(formState) {
      this.current--;
      this.event.event_name = formState.eventName;
      this.event.is_first_event = formState.firstEvent;
      // this.event.event_logo = formState.eventImage; // TODO: Vratiti kada bude proradio insert image-a
      this.event.days_of_event = formState.noOfDays;
      this.event.start_date = formState.startDate;
      this.event.end_date = formState.endDate; 
      this.event.starting_time = formState.timeOfEvent;
    },
    eventInfoNext(formState) {
      this.current++;
      this.event.event_name = formState.eventName;
      this.event.is_first_event = formState.firstEvent;
      // this.event.event_logo = formState.eventImage; // TODO: Vratiti kada bude proradio insert image-a
      this.event.days_of_event = formState.noOfDays;
      this.event.start_date = formState.startDate;
      this.event.end_date = formState.endDate;
      this.event.starting_time = formState.timeOfEvent;
    },

    // * Event Details
    eventDetailsPrevious(formState) {
      this.current--;
      this.event.attendeesNo = formState.noOfAttendees;
      this.event.expo_feature = formState.expoFeature;
      this.event.exhibitionersNo = formState.noOfExhibitioners;
      this.event.event_hosting = formState.officialWebsite;
    },
    eventDetailsNext(formState) {
      this.current++;
      this.event.attendeesNo = formState.noOfAttendees;
      this.event.expo_feature = formState.expoFeature;
      this.event.exhibitionersNo = formState.noOfExhibitioners;
      this.event.event_hosting = formState.officialWebsite;
    },

    // * Future Virtual Expirience
    futureExpiriencePrevious(formState) {
      this.current--;
      this.event.domain_for_event = formState.domainForEvent;
      this.event.event_domain = formState.domainSubdomainName;
      this.event.is_event_opened = formState.typeOfEvent;
    },
    futureExpirienceNext(formState) {
      this.current++;
      this.event.domain_for_event = formState.domainForEvent;
      this.event.event_domain = formState.domainSubdomainName;
      this.event.is_event_opened = formState.typeOfEvent;
    },

    // * General Layout
    generalLayoutPrevious(formState) {
      this.current--;
      this.event.boothsNo = formState.noOfBooths;
      this.event.event_areas = formState.areasOfEvent;
      this.event.multiple_types_of_booths = formState.eventHaveMultipleBooths;
      this.event.live_or_recorded_content = formState.liveRecorded;
      this.event.live_parallel_sessions = formState.parallelSessions;
      this.event.streamingEventsTool = formState.preferredTool;
    },
    generalLayoutSubmit(formState) {
      this.current++;
      this.event.boothsNo = formState.noOfBooths;
      this.event.event_areas = formState.areasOfEvent;
      this.event.multiple_types_of_booths = formState.eventHaveMultipleBooths;
      this.event.live_or_recorded_content = formState.liveRecorded;
      this.event.live_parallel_sessions = formState.parallelSessions;
      this.event.streamingEventsTool = formState.preferredTool;

      this.submitEventData(this.event);
    },
    submitEventData(ev) {
      ev.event_areas = ev.event_areas.toString();
      ev.start_date = ev.start_date.format("YYYY-MM-DD");
      ev.end_date = ev.end_date.format("YYYY-MM-DD");
      ev.starting_time = ev.starting_time.format("HH:mm");
      let dataForSubmit = JSON.stringify(ev);
      const headers = {
        "Content-Type": "application/json"
      };

      axios
        .post("https://beyond2.doc.ba/api/postEventData", dataForSubmit, {
          headers: headers
        })
        .then((response) => {
          console.log(response);
          this.submitStatus = true;
        })
        .catch((err) => {
          console.log(err.response.data);
          this.submitStatus = false;
        });
    }
  }
});
</script>
