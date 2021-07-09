import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./main.css";

// AntDesign import only what we use
import {
  alert,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Icon,
  Image,
  Input,
  InputNumber,
  Layout,
  Menu,
  message,
  notification,
  Radio,
  Row,
  Select,
  Space,
  Steps,
  Switch,
  TimePicker,
  Upload,
  Result,
} from "ant-design-vue";

// Components import
import EventUserInfo from "./components/EventUserInfo.vue";
import EventInfo from "./components/EventInfo.vue";
import EventDetails from "./components/EventDetails.vue";
import FutureVirtualExperience from "./components/FutureVirtualExperience.vue";
import GeneralLayout from "./components/GeneralLayout.vue";
import Finish from "./components/Finish.vue";

// Views import
import HomePage from "./views/HomePage.vue";
import TestPage from "./views/TestPage.vue";

// Create App
const app = createApp(App);

// Component Register
app.component("event-user-info", EventUserInfo);
app.component("event-info", EventInfo);
app.component("event-details", EventDetails);
app.component("future-virtual-experience", FutureVirtualExperience);
app.component("general-layout", GeneralLayout);
app.component("finish", Finish);

// Page Register
app.component("home-page", HomePage);
app.component("test-page", TestPage);

// Router use
app.use(router);

// Antd use
app.use(alert);
app.use(Button);
app.use(Checkbox);
app.use(Col);
app.use(DatePicker);
app.use(Form);
app.use(Icon);
app.use(Image);
app.use(Input);
app.use(InputNumber);
app.use(Layout);
app.use(Menu);
app.use(Radio);
app.use(Row);
app.use(Select);
app.use(Space);
app.use(Steps);
app.use(Switch);
app.use(Upload);
app.use(TimePicker);
app.use(Result);

app.config.globalProperties.$message = message;
app.config.globalProperties.$notification = notification;

// Mount App
app.mount("#app");
