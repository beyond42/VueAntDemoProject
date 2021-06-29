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
  Image,
  Icon,
  Radio,
  message,
  notification,
} from 'ant-design-vue';

import App from './App.vue';
import FriendContact from './components/FriendsApp/FriendContact.vue';
import NewFriend from './components/FriendsApp/NewFriend.vue';

import User from './components/User.vue';
import EventInfo from './components/EventInfo.vue';
import EventDetails from './components/EventDetails.vue';
import FutureVirtualExperience from './components/FutureVirtualExperience.vue';
import GeneralLayout from './components/GeneralLayout.vue';
import NextPrev from './components/NextPrev.vue';

const app = createApp(App);

app.component('friend-contact', FriendContact);
app.component('new-friend', NewFriend);
app.component('user', User);
app.component('event-info', EventInfo);
app.component('event-details', EventDetails);
app.component('future-virtual-experience', FutureVirtualExperience);
app.component('general-layout', GeneralLayout);
app.component('next-previous', NextPrev);

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
app.use(Radio);
app.use(Image);
app.use(Icon);
app.config.globalProperties.$message = message;
app.config.globalProperties.$notification = notification;

app.mount('#app');
