import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

//bootstrap import
import "bootstrap";
import "./assets/style.scss";

//font awesome import
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGear,
  faHouse,
  faArrowRightFromBracket,
  faArrowLeft,
  faX,
  faPeopleArrows,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faHeart,
  faComment,
  faBell,
  faEnvelope,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  faGear,
  faHouse,
  faUser,
  faArrowRightFromBracket,
  faHeart,
  faComment,
  faArrowLeft,
  faX,
  faPeopleArrows,
  faCamera,
  faBell,
  faEnvelope
);

//day.js import
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/zh-tw";
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.locale("zh-tw");

// import env variables
const env = import.meta.env;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: env.VITE_APIKEY,
  authDomain: env.VITE_AUTH_DOMAIN,
  projectId: env.VITE_PROJECT_ID,
  storageBucket: env.VITE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_MESSAGING_SENDER_ID,
  appId: env.VITE_APP_ID,
  measurementId: env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(fireBaseApp);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
