import { createApp } from "vue";
import { router } from "./router";

import App from "./App.vue";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/general.scss";

import "@fortawesome/fontawesome-free/css/all.css";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

createApp(App).use(router).mount("#app");
