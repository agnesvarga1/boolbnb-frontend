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

  <section class="p-3 d-flex flex-wrap justify-content-center justify-content-lg-between align-items-center border-bottom flex-column">
    
    <div class="col-8 gap-3 pb-2 border-bottom">

      <!-- Social icons -->
      <div class="d-flex gap-5 justify-content-center">
        <a href="#" class="text-light text-decoration-none"><i class="fab fa-facebook-f fs-4"></i></a>
        <a href="#" class="text-light text-decoration-none"><i class="fab fa-twitter fs-4"></i></a>
        <a href="#" class="text-light text-decoration-none"><i class="fab fa-instagram fs-4"></i></a>
        <a href="#" class="text-light text-decoration-none"><i class="fab fa-telegram-plane fs-4"></i></a>
      </div>

    </div>

    
    <div class="container pt-3">
      
      <!-- Language and currency selectors -->
      <div class="d-flex flex-row align-items-center justify-content-around justify-content-md-center gap-md-5">

        <!-- Language selector -->
        <div class="dropdown">
          <a class="text-light dropdown-toggle text-decoration-none" href="#" role="button" id="dropdownLanguageLink" data-bs-toggle="dropdown" aria-expanded="false">
            Italiano (IT)
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownLanguageLink">
            <li><a class="dropdown-item text-decoration-none" href="#">English (EN)</a></li>
            <li><a class="dropdown-item text-decoration-none" href="#">Español (ES)</a></li>
          </ul>
        </div>

        <!-- Currency selector -->
        <div class="dropdown">
          <a class="text-light dropdown-toggle text-decoration-none" href="#" role="button" id="dropdownCurrencyLink" data-bs-toggle="dropdown" aria-expanded="false">
            € EUR
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownCurrencyLink">
            <li><a class="dropdown-item text-decoration-none" href="#">$ USD</a></li>
            <li><a class="dropdown-item text-decoration-none" href="#">£ GBP</a></li>
          </ul>
        </div>

      </div>

      <div class="d-flex flex-row align-items-center justify-content-around">
        <!-- Links -->
        <div class="d-flex flex-row flex-lg-row gap-2 mt-3">
          <a href="#" class="text-light mx-1 text-decoration-underline">Privacy</a>
          <a href="#" class="text-light mx-1 text-decoration-underline">Policy</a>
          <a href="#" class="text-light mx-1 text-decoration-underline">Mappa del sito</a>
          <a href="#" class="text-light mx-1 text-decoration-underline">Agency's Details</a>
        </div>
      </div>

    </div>

  </section>

  <!-- Brand -->
  <div class="my-2 text-center py-2">
      <span>&copy; 2024 BoolBnB</span>
  </div>
</footer>

</template>

<style lang="scss">
footer {
  min-height: 170px;
}
</style>
