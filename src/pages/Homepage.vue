<script>
export default {
  name: "Homepage",
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<template>
  <!-- Hero Image -->
  <div
    class="bg-image py-5 text-center shadow-1-strong mb-5 d-flex align-items-end justify-content-center"
    style="
      width: 100vw;
      height: 70vh;
      background-size: cover;
      background-position: center;
      background-image: url('./immobili-di-prestigio-milano-1024x681.jpg');
    "
  >
    <div class="col-12">
      <div
        class="row mt-5 mx-0 col-12 bg-primary shadow bg-opacity-50 py-3 text-light"
      >
        <h2 class="fw-bold">Foresty Appartments</h2>
      </div>
      <div class="py-2 mt-3">
        <a class="btn btn-primary" href="#" role="button">Get Details!</a>
      </div>
    </div>
  </div>

  <!-- Search Section -->
  <section class="container my-5 d-flex">
    <div class="col-3">
      <h2 class="mb-4">Where to go?</h2>
    </div>

    <div class="input-group">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control border border-end-0"
          placeholder="Where?"
          aria-describedby="button-addon2"
        />
        <button
          class="btn border border-start-0"
          type="button"
          id="button-addon2"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>
  </section>

  <section class="container my-5">
    <h2 class="mb-4">Featured Appartments</h2>
    <div class="row">
      <!-- Card (Fare v-for o foreach (laravel o vue)) -->
      <div class="row">
        <router-link :to="{ name: 'Appartament' }" class="nav-link">
          <!-- Appartment -->

          <!-- @foreach ($apartments as $apartment) -->

          <div class="col-md-4 mb-4">
            <div class="card h-100" onclick="window.location='';">
              <!-- <img src="{{ $apartment->cover_image }}" class="card-img-top" alt="{{ $apartment->slug }}"> -->

              <div class="card-body d-flex flex-column">
                <h5 class="card-title">
                  <!-- {{ $apartment->title }} -->
                </h5>

                <p class="card-text mb-2">
                  <!-- {{ $apartment->full_address }} -->
                </p>

                <h6 class="card-title">
                  <!-- {{ $apartment->price }}€/notte -->
                </h6>

                <!-- Redirect alla show -->
              </div>
            </div>
          </div>
        </router-link>
        <!-- @endforeach -->
      </div>
    </div>
  </section>
</template>

<style lang="scss"></style>
