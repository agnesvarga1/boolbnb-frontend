<script>
import { store } from "../store.js";

export default {
  name: "AppHeader",
  components: {},
  data() {
    return {
      store,
      isScrolled: false,
    };
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 30;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<template>
  <nav
    class="navbar navbar-expand-lg navbar-light fixed-top p-0 shadow-lg"
    :class="{ 'scrolled': isScrolled }"
    >
    <div class="container">
      <router-link class="navbar-brand m-0" :to="{ name: 'home' }">
        <img src="/logo-boolbnb-nome.png" alt="Logo" style="max-height: 70px" />
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto p-3 gap-5">
          <!-- <li class="nav-item">
            <router-link :to="{ name: 'Home' }" class="nav-link">
              Home
            </router-link>
          </li> -->
          <li class="nav-item">
            <router-link :to="{ name: 'search' }" class="nav-link">
              Ricerca Avanzata
            </router-link>
          </li>

          <li>
            <a
              class="btn btn-green"
              :href="`${store.apiBaseUrl}/login`"
              target="_blank"
              role="button"
              >Area Personale</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
.navbar{
  background-color: rgb(255, 255, 255, 0.6);
}
.navbar.scrolled {
  transition: background-color 0.3s;
  background-color: white; 
}
</style>
