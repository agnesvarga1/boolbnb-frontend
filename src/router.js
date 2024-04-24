import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/Homepage.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
  ],
});
export { router };
