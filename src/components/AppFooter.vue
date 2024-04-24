<script>
export default {
  name: "AppFooter",
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<template>
  <footer class="text-center text-lg-start text-light bg-dark">
    <section class="d-flex flex-column align-items-center p-4 border-bottom">
      <div
        class="d-flex justify-content-between col-8 gap-3 my-2 pb-4 border-bottom"
      >
        <!-- Links -->
        <div>
          <a href="#" class="text-light me-4 text-decoration-none">Privacy</a>
          <a href="#" class="text-light me-4 text-decoration-none">Policy</a>
          <a href="#" class="text-light me-4 text-decoration-none"
            >Website Map</a
          >
          <a href="#" class="text-light me-4 text-decoration-none"
            >Agency's Details</a
          >
        </div>

        <!-- Language and currency selectors -->
        <div class="d-flex justify-content-center">
          <!-- Language selector -->
          <div class="dropdown me-4 text-decoration-none">
            <a
              class="text-light dropdown-toggle text-decoration-none"
              href="#"
              role="button"
              id="dropdownLanguageLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              English (EN)
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownLanguageLink">
              <li>
                <a class="dropdown-item text-decoration-none" href="#">
                  Italiano (IT)</a
                >
              </li>
              <li>
                <a class="dropdown-item text-decoration-none" href="#"
                  >Español (ES)</a
                >
              </li>
              <!-- Add other languages here -->
            </ul>
          </div>
          <!-- Currency selector -->
          <div class="dropdown">
            <a
              class="text-light dropdown-toggle text-decoration-none"
              href="#"
              role="button"
              id="dropdownCurrencyLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              € EUR
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownCurrencyLink">
              <li>
                <a class="dropdown-item text-decoration-none" href="#">$ USD</a>
              </li>
              <li>
                <a class="dropdown-item text-decoration-none" href="#">£ GBP</a>
              </li>
              <!-- Add other currencies here -->
            </ul>
          </div>
        </div>

        <!-- Social icons -->
        <div class="">
          <a href="#" class="text-light me-4 text-decoration-none">
            <i class="fab fa-facebook-f fs-4"></i>
          </a>
          <a href="#" class="text-light me-4 text-decoration-none">
            <i class="fab fa-twitter fs-4"></i>
          </a>
          <a href="#" class="text-light me-4 text-decoration-none">
            <i class="fab fa-instagram fs-4"></i>
          </a>
          <a href="#" class="text-light me-4 text-decoration-none">
            <i class="fab fa-telegram-plane fs-4"></i>
          </a>
        </div>
      </div>

      <!-- Brand -->
      <div class="my-2">
        <span>&copy; 2024 BoolBnB</span>
      </div>
    </section>
  </footer>
</template>

<style lang="scss"></style>
