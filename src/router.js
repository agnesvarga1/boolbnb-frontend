import { createRouter, createWebHistory } from "vue-router";
import Homepage from "./pages/Homepage.vue";
import AdvancedSearch from "./pages/AdvancedSearch.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Homepage,
    },
    {
      path: "/Advanced",
      name: "Advanced",
      component: AdvancedSearch,
    },

  ],
});
export { router };
