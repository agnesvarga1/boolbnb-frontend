<script>
import TomTomMap from "../components/TomTomMap.vue";
import axios from "axios";
import { store } from "../store.js";

export default {
  name: "Homepage",
  components: {
    TomTomMap,
  },
  data() {
    return {
      store,
      arrayApartments: [],
      currentPage: "",
      lastPage: "",
      searchInput: "",
      radiusInput: "20",
      arrayAddresses: [],
    };
  },
  computed: {
    autocompleteSearch() {
      let apiRequest = `https://api.tomtom.com/search/2/search/${
        this.searchInput
      }.json?key=${import.meta.env.VITE_TOMTOM_API_KEY}&language=it-IT`;

      if (this.searchInput === "") {
        this.arrayAddresses = [];
        return;
      }

      fetch(apiRequest)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          return response.json();
        })
        .then((data) => {
          let apiResults = data.results;

          this.arrayAddresses = [];

          apiResults.forEach((element) => {
            this.arrayAddresses.push(element.address.freeformAddress);
          });

          console.log(this.arrayAddresses);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    },
  },
  methods: {
    getApartments(postApiPage) {
      axios
        .get(
          `${store.apiBaseUrl}/api/apartments`,

          {
            params: {
              page: postApiPage,
            },
          }
        )
        .then((result) => {
          this.arrayApartments = result.data.apartments.data;
          this.currentPage = result.data.apartments.current_page;
          this.lastPage = result.data.apartments.last_page;

          console.log(this.currentPage, this.lastPage);
        });
    },
  },
  mounted() {
    this.getApartments(1);
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
  <section class="container my-3">
    <div class="input-group d-flex">
      <h2 class="me-4 fw-bolder">Inizia a cercare</h2>
      <input
        type="text"
        class="form-control border border-end-0"
        placeholder="Cerca località..."
        aria-describedby="button-addon2"
        v-model="searchInput"
        list="addressList"
      />
      <button
        class="btn border border-start-0"
        type="button"
        id="button-addon2"
      >
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
      <datalist id="addressList">
        <option v-for="element in arrayAddresses" :value="element"></option>
      </datalist>
    </div>
    <div>
      <label for="rangeZone" class="form-label"
        >Range zona: <strong>{{ radiusInput }} km</strong></label
      >
      <input
        type="range"
        class="form-range"
        id="rangeZone"
        name="rangeZone"
        min="0"
        max="200"
        value="20"
        step="1"
        v-model="radiusInput"
      />
    </div>
  </section>

  <!-- SECTION Homepage body -->
  <section class="container my-5">
    <h1 class="my-2 fw-bold">Appartamenti sponsorizzati</h1>

    <hr />

    <div v-if="arrayApartments.length > 0">
      <div class="row row-gap-4">
        <div
          v-for="element in arrayApartments"
          :key="element.id"
          class="col-md-4"
        >
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
    <div
      v-else
      class="d-flex justify-content-center align-items-center"
      style="min-height: 100vh; background-color: #f8f9fa"
    >
      <span
        class="spinner-border text-primary me-2"
        role="status"
        aria-hidden="true"
      ></span>
      <span>Caricamento in corso...</span>
    </div>

    <TomTomMap />

    <nav aria-label="Page navigation example" class="mt-5">
      <ul class="pagination mx-auto">
        <li class="page-item">
          <button
            class="page-link"
            :class="{ disabled: currentPage === 1 }"
            @click="getApartments(currentPage - 1)"
          >
            Previous
          </button>
        </li>

        <li class="page-item" v-for="(element, index) in lastPage" :key="index">
          <button
            class="page-link"
            :class="{ disabled: currentPage === element }"
            @click="getApartments(element)"
          >
            {{ element }}
          </button>
        </li>

        <li class="page-item">
          <button
            class="page-link"
            :class="{ disabled: currentPage === lastPage }"
            @click="getApartments(currentPage + 1)"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>

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
