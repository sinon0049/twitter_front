import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import './assets/style.scss'

import { library } from "@fortawesome/fontawesome-svg-core"
import { faGear, faHouse, faArrowRightFromBracket, faArrowLeft, faX } from "@fortawesome/free-solid-svg-icons"
import { faUser, faHeart, faComment } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faGear, faHouse, faUser, faArrowRightFromBracket, faHeart, faComment, faArrowLeft, faX)

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon)

app.mount("#app");