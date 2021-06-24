import { createApp } from 'vue';

import {
  Button,
  Input,
  Form,
  Layout,
  DatePicker,
  InputNumber,
  Upload,
  Row,
  Col,
  Select,
  Steps,
  Checkbox,
  Space,
  TimePicker,
} from 'ant-design-vue';

import App from './App.vue';
import FriendContact from './components/FriendsApp/FriendContact.vue';
import NewFriend from './components/FriendsApp/NewFriend.vue';

import User from './components/User.vue';
import EventDetails from './components/EventDetails.vue';
import FutureVirtualExperience from './components/FutureVirtualExperience.vue';
import GeneralLayout from './components/GeneralLayout.vue';

const app = createApp(App);

app.component('friend-contact', FriendContact);
app.component('new-friend', NewFriend);
app.component('user', User);
app.component('event-details', EventDetails);
app.component('future-virtual-experience', FutureVirtualExperience);
app.component('general-layout', GeneralLayout);

app.use(Button);
app.use(Input);
app.use(Form);
app.use(Layout);
app.use(DatePicker);
app.use(InputNumber);
app.use(Upload);
app.use(Row);
app.use(Col);
app.use(Select);
app.use(Steps);
app.use(Checkbox);
app.use(Space);
app.use(TimePicker);

app.mount('#app');
