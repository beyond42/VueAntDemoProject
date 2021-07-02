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
          <user v-if="current === 0" @user-submit="userSubmit"></user>
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
          <test v-if="current === 5"></test>
          <finish v-if="current === 6" :message="submitMessage"></finish>
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
import User from "../components/User.vue";
import EventInfo from "../components/EventInfo.vue";
import EventDetails from "../components/EventDetails.vue";
import FutureVirtualExperience from "../components/FutureVirtualExperience.vue";
import GeneralLayout from "../components/GeneralLayout.vue";
import Finish from "../components/Finish.vue";
import Test from "../components/Test.vue";

export default {
  components: {
    User,
    EventInfo,
    EventDetails,
    FutureVirtualExperience,
    GeneralLayout,
    Finish,
    Test
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
        "Test"
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
    userSubmit(formState) {
      this.current++;
      this.event.user_firstname = formState.name;
      this.event.user_lastname = formState.last_name;
      this.event.company_name = formState.company;
      this.event.user_email = formState.email;
      this.event.user_phone_number =
        formState.country_code + formState.phone_num;
      console.log(this.event);
    },
    eventInfoPrevious(formState) {
      this.current--;
      console.log("previous");
      console.log(formState);
    },
    eventInfoSubmit(formState) {
      this.current++;
      this.event.event_name = formState.eventName;
      this.event.days_of_event = formState.noOfDays;
      this.event.start_date = formState.startDate.format("YYYY-MM-DD");
      this.event.end_date = formState.endDate.format("YYYY-MM-DD");
      this.event.starting_time = formState.timeOfEvent.format("HH:MM:SS");
      this.event.is_first_event = formState.firstEvent;
      // TODO: Vratiti kada bude proradio insert image-a
      // this.event.event_logo = formState.eventImage;
      console.log(formState);
      console.log(this.event);
    },
    eventDetailsPrevious(formState) {
      this.current--;
      console.log(formState);
    },
    eventDetailsSubmit(formState) {
      this.current++;
      this.event.exhibitionersNo = formState.noOfExhibitioners;
      this.event.event_hosting = formState.officialWebsite;
      this.event.attendeesNo = formState.noOfAttendees;

      //TODO: expoFeature je ostao neupisan nigde

      console.log(formState);
      console.log(this.event);
    },
    futureExpiriencePrevious(formState) {
      this.current--;
      console.log("previous");
      console.log(formState);
    },
    futureExpirienceSubmit(formState) {
      this.current++;
      this.event.event_domain = formState.domainSubdomainName;
      this.event.is_event_opened = formState.typeOfEvent;
      this.event.event_hosting = formState.domainForEvent;

      console.log(formState);
      console.log(this.event);
    },
    generalLayoutSubmit(formState) {
      this.current++;
      this.event.boothsNo = formState.noOfBooths;
      for (const area in formState.areasOfEvent) {
        this.event.event_areas += formState.areasOfEvent[area];
        this.event.event_areas += ", ";
      }
      this.event.multiple_types_of_booths = formState.eventHaveMultipleBooths;
      this.event.live_or_recorded_content = formState.liveRecorded;
      this.event.live_parallel_sessions = formState.parallelSessions;
      this.event.streamingEventsTool = formState.preferredTool;
      console.log(formState);
      console.log(this.event);
      this.submitEventData(this.event);
    },
    generalLayoutPrevious(formState) {
      this.current--;
      console.log("previous");
      console.log(formState);
    },
    submitEventData(ev) {
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
