import { createRouter, createWebHistory } from "vue-router";
import Homepage from "./pages/Homepage.vue";
import AdvancedSearch from "./pages/AdvancedSearch.vue";
import SingleAppartament from "./pages/SingleAppartament.vue";
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
    {
      path: "/Appartament",
      name: "Appartament",
      component: SingleAppartament,
    },

  ],
});
export { router };
