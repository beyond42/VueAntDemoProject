import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./main.css";

// AntDesign import only what we use
import {
  Menu,
  Button,
  Input,
  InputNumber,
  Form,
  Layout,
  DatePicker,
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
  Switch,
} from "ant-design-vue";

// Components import
import User from "./components/User.vue";
import EventInfo from "./components/EventInfo.vue";
import EventDetails from "./components/EventDetails.vue";
import FutureVirtualExperience from "./components/FutureVirtualExperience.vue";
import GeneralLayout from "./components/GeneralLayout.vue";
import Finish from "./components/Finish.vue";
import Test from "./components/Test.vue";

// Views import
import HomePage from "./views/HomePage.vue";
import TestPage from "./views/TestPage.vue";

// Create App
const app = createApp(App);

// Component Register
app.component("user", User);
app.component("event-info", EventInfo);
app.component("event-details", EventDetails);
app.component("future-virtual-experience", FutureVirtualExperience);
app.component("general-layout", GeneralLayout);
app.component("next-previous", Test);
app.component("finish", Finish);

// Page Register
app.component("home-page", HomePage);
app.component("test-page", TestPage);

// Router use
app.use(router);

// Antd use
app.use(Menu);
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
app.use(Switch);
app.config.globalProperties.$message = message;
app.config.globalProperties.$notification = notification;

// Mount App
app.mount("#app");
