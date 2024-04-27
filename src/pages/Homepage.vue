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
      radiusInput: 20,
      arrayAddresses: [],
      automcompleteApiResponseArray: [],
      infoApartmentsArray: [],
      isFiltered: false,
    };
  },
  methods: {
    getApartments(postApiPage) {
      axios
        .get(`${store.apiBaseUrl}/api/apartments`, {
          params: {
            page: postApiPage,
          },
        })
        .then((result) => {
          this.arrayApartments = result.data.apartments.data;
          this.currentPage = result.data.apartments.current_page;
          this.lastPage = result.data.apartments.last_page;
          this.infoApartmentsArray = result.data.apartments;
        });
    },
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
          this.automcompleteApiResponseArray = data.results;

          this.arrayAddresses = this.automcompleteApiResponseArray.map(
            (element) => element.address.freeformAddress
          );
          console.log(this.arrayAddresses);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    },
    radiusSearch(postApiPage) {
      if (this.searchInput.length === "" || this.searchInput.length < 4) {
        console.log("input invalido");
        return;
      }

      const params = {
        page: postApiPage,
        latitude: this.automcompleteApiResponseArray[0].position.lat,
        longitude: this.automcompleteApiResponseArray[0].position.lon,
        radius: this.radiusInput,
      };

      axios
        .get(`${store.apiBaseUrl}/api/apartments/search`, { params })
        .then((response) => {
          console.log(response);
          this.arrayApartments = response.data.apartments.data;
          this.currentPage = response.data.apartments.current_page;
          this.lastPage = response.data.apartments.last_page;
          this.infoApartmentsArray = response.data.apartments;
        })
        .catch((error) => {
          console.error("Errore durante la richiesta API:", error);
        });

      this.isFiltered = true;
    },
  },
  watch: {
    searchInput(newVal) {
      this.autocompleteSearch();
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
        class="row mt-5 mx-0 col-12 shadow py-3"
        style="background-color: rgb(26, 198, 182, 0.6)"
      >
        <h2 class="fw-bold text-light">Appartamenti Boscosi</h2>
      </div>
      <div class="py-2 mt-3">
        <a class="btn btn-green-inverted" href="#" role="button"
          >Affitta Ora!</a
        >
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
        @keydown.enter="radiusSearch(1)"
      />
      <button
        class="btn border border-start-0"
        :class="searchInput !== '' ? 'btn-primary' : ''"
        type="button"
        id="button-addon2"
        @click="radiusSearch(1)"
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
    <h1 class="my-2 fw-bold">
      Appartamenti sponsorizzati ({{ infoApartmentsArray.total }})
      {{ infoApartmentsArray.total === 0 ? "" : `- Pagina ${currentPage}` }}
    </h1>

    <hr />

    <div v-if="arrayApartments.length > 0">
      <div class="row row-gap-4 mb-5">
        <div
          v-for="element in arrayApartments"
          :key="element.id"
          class="col-md-4"
        >
          <router-link
            :to="{ name: 'apartment', params: { slug: element.slug } }"
            class="nav-link"
          >
            <div class="card">
              <figure class="mb-0 card-img-top">
                <img
                  v-if="element.cover_image.startsWith('https')"
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
              <div
                class="card-body d-flex flex-column justify-content-between bg-light"
              >
                <h4 class="card-title fw-bolder">{{ element.title }}</h4>
                <h6 class="mb-2 col-5 price-tag fw-bolder">
                  {{ element.price }} €/notte
                </h6>
                <p
                  class="card-text after-name text-truncate text-body-secondary"
                >
                  {{ element.full_address }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Navigation menù -->
      <nav
        aria-label="Page navigation example"
        class="mt-5 d-flex justify-content-center"
      >
        <ul class="pagination">
          <li class="page-item">
            <button
              class="page-link"
              :class="{ disabled: currentPage === 1 }"
              @click="
                !isFiltered
                  ? getApartments(currentPage - 1)
                  : radiusSearch(currentPage - 1)
              "
            >
              Precedente
            </button>
          </li>

          <li
            class="page-item"
            v-for="(element, index) in lastPage"
            :key="index"
          >
            <button
              class="page-link"
              :class="{ disabled: currentPage === element }"
              @click="
                !isFiltered ? getApartments(element) : radiusSearch(element)
              "
            >
              {{ element }}
            </button>
          </li>

          <li class="page-item">
            <button
              class="page-link"
              :class="{ disabled: currentPage === lastPage }"
              @click="
                !isFiltered
                  ? getApartments(currentPage + 1)
                  : radiusSearch(currentPage + 1)
              "
            >
              Successivo
            </button>
          </li>
          <li>
            <button
              class="btn btn-primary ms-5"
              :class="{ disabled: !isFiltered }"
              @click="
                getApartments(1);
                isFiltered = false;
                searchInput = '';
                radiusInput = 20;
              "
            >
              Reset
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <div
      v-else-if="infoApartmentsArray.total === 0"
      class="d-flex justify-content-center align-items-center"
      style="min-height: 20vh; background-color: #f8f9fa"
    >
      <h1>La ricerca non ha prodotto risultati</h1>
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

    <TomTomMap :propApartments="arrayApartments" />

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
.card {
  min-height: 400px;
}
.card-img-top img {
  height: 250px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.price-tag {
  color: #1ac6b6;
}

.mapboxgl-popup-content {
  color: #1ac6b6;
}
</style>
