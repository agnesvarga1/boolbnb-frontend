<script>
import { store } from "../store.js";

export default {
  name: "AppHeader",
  components: {},
  data() {
    return {
      store,
      isScrolled: false,
      dropdownOpen: false,
    };
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<template>
  <nav
    class="navbar navbar-expand-lg navbar-light fixed-top p-0 shadow-lg"
    :class="{ scrolled: isScrolled, 'dropdown-open': dropdownOpen }"
  >
    <div class="container">
      <router-link class="navbar-brand m-0" :to="{ name: 'home' }">
        <img
          src="/logo-boolbnb-nome.png"
          alt="Logo"
          style="max-height: 70px"
          class="p-2"
        />
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        @click="toggleDropdown"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto text-end mt-3 mb-4 gap-4">
          <li class="">
            <router-link :to="{ name: 'search' }" class="nav-link">
              Ricerca Avanzata
            </router-link>
          </li>

          <li class="">
            <a
              class="btn btn-green"
              :href="`${store.apiBaseUrl}`"
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

<style lang="scss" scoped>
.navbar {
  background-color: rgb(255, 255, 255, 0.7);
}
.navbar.scrolled,
.navbar.dropdown-open {
  background-color: white;
}
</style>
