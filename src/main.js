import { createApp } from 'vue';

import { Button, Input, Form, Layout, DatePicker, InputNumber, Upload, Row, Col} from 'ant-design-vue';

import App from './App.vue';
import FriendContact from './components/FriendContact.vue';
import NewFriend from './components/NewFriend.vue'

const app = createApp(App);

app.component('friend-contact', FriendContact);
app.component('new-friend', NewFriend);
app.use(Button);
app.use(Input);
app.use(Form);
app.use(Layout);
app.use(DatePicker);
app.use(InputNumber);
app.use(Upload);
app.use(Row);
app.use(Col);
app.mount('#app');
