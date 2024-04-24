import { createApp } from "vue";
import { router } from "./router";
//import './style.css'
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import '@fortawesome/fontawesome-free/css/all.css'

createApp(App).use(router).mount("#app");
