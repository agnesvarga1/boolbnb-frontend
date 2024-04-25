<script>
import axios from "axios";
import { store } from "../store.js";

export default {
  name: "Homepage",
  components: {},
  data() {
    return {
      apartments: [],
      store,
    };
  },
  methods: {
    autocompleteSearch() {},
  },
  mounted() {
    axios
      .get(`${store.apiBaseUrl}/api/apartments`)
      .then((response) => {
        console.log(response.data.apartments.data);

        this.apartments = response.data.apartments.data;
      })
      .catch((error) => {
        console.error("There was an error fetching the apartments:", error);
      });
  },
};
</script>

<template>
  <!-- Hero Image -->
  <div
    class="bg-image py-5 text-center shadow-1-strong mb-5 d-flex align-items-end justify-content-center"
    style="
      width: 100%;
      height: 70vh;
      background-size: cover;
      background-position: center;
      background-image: url('/immobili-di-prestigio-milano-1024x681.jpg');
    "
  >
    <div class="col-12">
      <div
        class="row mt-5 bg-success mx-0 col-12 shadow bg-opacity-50 py-3 text-light"
      >
        <h2 class="fw-bold">Appartamenti Boscosi</h2>
      </div>
      <div class="py-2 mt-3">
        <a class="btn btn-success" href="#" role="button">Get Details!</a>
      </div>
    </div>
  </div>

  <!-- Search Section -->
  <section class="container my-3 d-flex">
    <div class="input-group mx-5">
      <h2 class="me-4 fw-bolder">Inizia a cercare</h2>
      <input
        type="text"
        class="form-control border border-end-0"
        placeholder="Cerca località..."
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
  </section>

  <!-- SECTION Homepage body -->
  <section class="container my-5">
    <h1 class="my-2 fw-bold">Appartamenti sponsorizzati</h1>

    <hr />

    <div>
      <div class="row row-gap-4">
        <div v-for="element in apartments" :key="element.id" class="col-md-4">
          <router-link
            :to="{ name: 'apartment', params: { slug: element.slug } }"
            class="nav-link"
          >
            <div class="card h-100">
              <figure class="mb-0">
                <img
                  v-if="
                    element.cover_image.startsWith(
                      'https://images.unsplash.com'
                    )
                  "
                  :src="element.cover_image"
                  class="card-img-top"
                  :alt="element.slug"
                />
                <img
                  v-else
                  :src="`${store.apiBaseUrl}/storage/apartment_images/${element.cover_image}`"
                  class="card-img-top"
                  :alt="element.slug"
                />
              </figure>
              <div class="card-body d-flex flex-column bg-light">
                <h4 class="card-title fw-bolder">{{ element.title }}</h4>
                <h6 class="mb-2 col-5 price-tag fw-bolder">
                  {{ element.price }} €/notte
                </h6>
                <p class="card-text text-body-secondary">
                  {{ element.full_address }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- <div class="row row-gap-4">
      <div v-for="apartment in apartments" :key="apartment.id" class="col-md-4">
        <router-link :to="{ name: 'apartment' }" class="nav-link">
          <div class="card h-100">
            <img :src="apartment.cover_image" class="card-img-top" :alt="apartment.title">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ apartment.title }}</h5>
              <p class="card-text mb-2">{{ apartment.full_address }}</p>
              <h6 class="card-title">{{ apartment.price }}€/notte</h6>               </div>
            </div>
        </router-link>
      </div>
    </div>     -->
  </section>
</template>

<style lang="scss">
.price-tag {
  color: #1ac6b6;
}
</style>
