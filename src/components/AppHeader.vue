<script>
export default {
  name: "AppHeader",
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light fixed-top bg-opacity-75 p-0"
  >
    <div class="container">
      <router-link class="navbar-brand m-0" :to="{ name: 'Home' }">
        <img src="/photo_5839426266103660487_x.jpg" alt="Logo" style="max-height: 70px;">
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
            <router-link :to="{ name: 'Advanced' }" class="nav-link">
              Search
            </router-link>
          </li>

          <li>
            <a class="btn btn-green" href="#" role="button">Get Details!</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss"></style>
