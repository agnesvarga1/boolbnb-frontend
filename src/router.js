import { createRouter, createWebHistory } from "vue-router";
import Homepage from "./pages/Homepage.vue";
import AdvancedSearch from "./pages/AdvancedSearch.vue";
import SingleAppartament from "./pages/SingleAppartament.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Homepage,
    },
    {
      path: "/search",
      name: "search",
      component: AdvancedSearch,
    },
    {
      path: "/apartments/:slug",
      name: "apartment",
      component: SingleAppartament,
    },
  ],
});
export { router };
