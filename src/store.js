import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
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
      countryCode: "+381",
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
      streamingEventsTool: "",
      expo_feature: "",
      domain_for_event: "",
    },
  },
  mutations: {
    setEventName(state, payload) {
      state.event.event_name = payload;
    },
    setIsFirstEvent(state, payload) {
      state.event.is_first_event = payload;
    },
    setFirstName(state, payload) {
      state.event.user_firstname = payload;
      console.log(state);
    },
    setLastName(state, payload) {
      state.event.user_lastname = payload;
    },
    setCompanyName(state, payload) {
      state.event.company_name = payload;
    },
    setUserEmail(state, payload) {
      state.event.user_email = payload;
    },
    setUserPhoneNumber(state, payload) {
      state.event.user_phone_number = payload;
    },
    setCountryCode(state, payload) {
      state.event.countryCode = payload;
    },
    setNoOfDays(state, payload) {
      state.event.days_of_event = payload;
    },
    setStartDate(state, payload) {
      state.event.start_date = payload;
    },
    setEndDate(state, payload) {
      state.event.end_date = payload;
    },
    setStartingTime(state, payload) {
      state.event.starting_time = payload;
    },
    setAttendeesNo(state, payload) {
      state.event.attendeesNo = payload;
    },
    setExhibitionersNo(state, payload) {
      state.event.exhibitionersNo = payload;
    },
    setOfficialWebsite(state, payload) {
      state.event.event_hosting = payload;
    },
    setExpoFeature(state, payload) {
      state.event.expo_feature = payload;
    },
    setDomainForEvent(state, payload) {
      state.event.domain_for_event = payload;
    },
    setEventDomainName(state, payload) {
      state.event.event_domain = payload;
    },
    setTypeOfEvent(state, payload) {
      state.event.is_event_opened = payload;
    },
    setBoothsNo(state, payload) {
      state.event.boothsNo = payload;
    },
    setEventAreas(state, payload) {
      state.event.event_areas = payload;
    },
    setMultipleBooths(state, payload) {
      state.event.multiple_types_of_booths = payload;
    },
    setLiveOrRecorded(state, payload) {
      state.event.live_or_recorded_content = payload;
    },
    setParallelSessions(state, payload) {
      state.event.live_parallel_sessions = payload;
    },
    setStreamingEventsTool(state, payload) {
      state.event.streamingEventsTool = payload;
    },
  },
});

export default store;
