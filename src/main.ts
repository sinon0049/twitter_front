import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

//bootstrap import
import 'bootstrap'
import './assets/style.scss'

//font awesome import
import { library } from "@fortawesome/fontawesome-svg-core"
import { faGear, faHouse, faArrowRightFromBracket, faArrowLeft, faX, faPeopleArrows } from "@fortawesome/free-solid-svg-icons"
import { faUser, faHeart, faComment } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
library.add(faGear, faHouse, faUser, faArrowRightFromBracket, faHeart, faComment, faArrowLeft, faX, faPeopleArrows)

//day.js import
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/zh-tw'
dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)
dayjs.locale('zh-tw')

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon)

app.mount("#app");