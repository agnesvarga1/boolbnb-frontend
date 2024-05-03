import { createRouter, createWebHistory } from "vue-router";
import Homepage from "./pages/Homepage.vue";
import AdvancedSearch from "./pages/AdvancedSearch.vue";
import SingleApartment from "./pages/SingleApartment.vue";
import NotFound from './pages/NotFound.vue';

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
      component: SingleApartment,
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound
    },
  ],
});
export { router };
