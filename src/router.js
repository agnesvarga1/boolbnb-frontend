import { createRouter, createWebHistory } from "vue-router";
import Homepage from "./pages/Homepage.vue";
import AdvancedSearch from "./pages/AdvancedSearch.vue";
import SingleApartment from "./pages/SingleApartment.vue";
import NotFound from "./pages/NotFound.vue";

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
      name: "not-found",
      path: "/:pathMatch(.*)*",
      component: NotFound,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});
router.beforeEach((to, from, next) => {
  // Utilizza il selettore specifico per il tuo menu di Bootstrap
  let element = document.getElementById('navbarNav');
  if (element.classList.contains('show')) {
    let button = document.querySelector('.navbar-toggler');
    button.click(); // Simula un click sul bottone per chiudere il collapse utilizzando le API di Bootstrap
  }
  next();
});
export { router };
