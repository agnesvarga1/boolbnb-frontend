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
      arrayServices: [],
      searchInput: "",
      radiusInput: 20,
      arrayAddresses: [],
      automcompleteApiResponseArray: [],
      infoApartmentsArray: [],
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
      }.json?key=${
        import.meta.env.VITE_TOMTOM_API_KEY
      }&language=it-IT&countrySet=IT`;

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
    sendToAdvancedSearch() {
      store.homeLat = this.automcompleteApiResponseArray[0].position.lat;
      store.homeLong = this.automcompleteApiResponseArray[0].position.lon;
      store.homeInput = this.searchInput;

      this.$router.push({ name: "search" });
    },
    moveToGrid() {
      this.$nextTick(() => {
        const element = document.getElementById("gridApartments");
        if (element) {
          const offset = 100; // L'altezza della tua navbar o altro elemento fisso
          const y = element.offsetTop - offset;
          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }
      });
    },
    getServices() {
      axios.get(`${store.apiBaseUrl}/api/apartments`).then((result) => {
        this.arrayServices = result.data.services;
      });
    },
  },
  watch: {
    searchInput(newVal) {
      this.autocompleteSearch();
    },
  },
  mounted() {
    this.getApartments(1);
    this.getServices();
  },
};
</script>

<template>
  <!-- Hero Image -->
  <!-- <div
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
  </div> -->

<!-- Slider (Carousel) -->
<div id="heroCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
  <div class="carousel-inner">

    <!-- Slide 1 -->
    <div class="carousel-item active" style="height: 70vh; background-image: url('/sfondi/immobili-di-prestigio-milano-1024x681.jpg'); background-size: cover; background-position: center;" data-bs-interval="5000">
      <div class="carousel-caption d-flex flex-column h-100 align-items-center justify-content-end">
        <div class="text-center col-12" style="background-color: rgb(26, 198, 182, 0.6); width: 100vw;">
          <h2 class="fw-bold text-light py-3 text-shadow">Scopri BoolBnb</h2>
        </div>
        <a class="btn btn-green-inverted mt-3" href="#" role="button">
          <router-link :to="{ name: 'search' }" class="nav-link">
              Affitta subito!
          </router-link>
        </a>
      </div>
    </div>

    <!-- Slide 2 -->
    <div class="carousel-item" style="height: 70vh; background-image: url('/sfondi/blake-wheeler-zBHU08hdzhY-unsplash.jpg'); background-size: cover; background-position: center;" data-bs-interval="5000">
      <div class="carousel-caption d-flex flex-column h-100 align-items-center justify-content-end">
        <div class="text-center col-12" style="background-color: rgb(26, 198, 182, 0.6); width: 100vw;">
          <h2 class="fw-bold text-light py-3 text-shadow">Scopri BoolBnb</h2>
        </div>
        <a class="btn btn-green-inverted mt-3" href="#" role="button">
          <router-link :to="{ name: 'search' }" class="nav-link">
              Affitta subito!
          </router-link>
        </a>
      </div>
    </div>

    <!-- Slide 3 -->
    <div class="carousel-item" style="height: 70vh; background-image: url('/sfondi/breno-assis-r3WAWU5Fi5Q-unsplash.jpg'); background-size: cover; background-position: center;" data-bs-interval="5000">
      <div class="carousel-caption d-flex flex-column h-100 align-items-center justify-content-end">
        <div class="text-center col-12" style="background-color: rgb(26, 198, 182, 0.6); width: 100vw;">
          <h2 class="fw-bold text-light py-3 text-shadow">Scopri BoolBnb</h2>
        </div>
        <a class="btn btn-green-inverted mt-3" href="#" role="button">
          <router-link :to="{ name: 'search' }" class="nav-link">
              Affitta subito!
          </router-link>
        </a>
      </div>
    </div>

    <!-- Slide 4 -->
    <div class="carousel-item" style="height: 70vh; background-image: url('/sfondi/maximillian-conacher-sPpe2D7VbpM-unsplash.jpg'); background-size: cover; background-position: center;" data-bs-interval="5000">
      <div class="carousel-caption d-flex flex-column h-100 align-items-center justify-content-end">
        <div class="text-center col-12" style="background-color: rgb(26, 198, 182, 0.6); width: 100vw;">
          <h2 class="fw-bold text-light py-3 text-shadow">Scopri BoolBnb</h2>
        </div>
        <a class="btn btn-green-inverted mt-3" href="#" role="button">
          <router-link :to="{ name: 'search' }" class="nav-link">
              Affitta subito!
          </router-link>
        </a>
      </div>
    </div>

    <!-- Slide 5 -->
    <div class="carousel-item" style="height: 70vh; background-image: url('/sfondi/toa-heftiba-nrSzRUWqmoI-unsplash.jpg'); background-size: cover; background-position: center;" data-bs-interval="5000">
      <div class="carousel-caption d-flex flex-column h-100 align-items-center justify-content-end">
        <div class="text-center col-12" style="background-color: rgb(26, 198, 182, 0.6); width: 100vw;">
          <h2 class="fw-bold text-light py-3 text-shadow">Scopri BoolBnb</h2>
        </div>
        <a class="btn btn-green-inverted mt-3" href="#" role="button">
          <router-link :to="{ name: 'search' }" class="nav-link">
              Affitta subito!
          </router-link>
        </a>
      </div>
    </div>

    <!-- Slide 6 -->
    <div class="carousel-item" style="height: 70vh; background-image: url('/sfondi/tom-rumble-7lvzopTxjOU-unsplash.jpg'); background-size: cover; background-position: center;" data-bs-interval="5000">
      <div class="carousel-caption d-flex flex-column h-100 align-items-center justify-content-end">
        <div class="text-center col-12" style="background-color: rgb(26, 198, 182, 0.6); width: 100vw;">
          <h2 class="fw-bold text-light py-3  text-shadow">Scopri BoolBnb</h2>
        </div>
        <a class="btn btn-green-inverted mt-3" href="#" role="button">
          <router-link :to="{ name: 'search' }" class="nav-link">
              Affitta subito!
          </router-link>
        </a>
      </div>
    </div>

    <!-- Slide 7 -->
    <div class="carousel-item" style="height: 70vh; background-image: url('/sfondi/trayan-xIOYJSVEZ8c-unsplash.jpg'); background-size: cover; background-position: center;" data-bs-interval="5000">
      <div class="carousel-caption d-flex flex-column h-100 align-items-center justify-content-end">
        <div class="text-center col-12" style="background-color: rgb(26, 198, 182, 0.6); width: 100vw;">
          <h2 class="fw-bold text-light py-3  text-shadow">Scopri BoolBnb</h2>
        </div>
        <a class="btn btn-green-inverted mt-3" href="#" role="button">
          <router-link :to="{ name: 'search' }" class="nav-link">
              Affitta subito!
          </router-link>
        </a>
      </div>
    </div>

  </div>
  
  <!-- Controlli -->
  <!-- <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button> -->
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
        @keydown.enter="sendToAdvancedSearch()"
        @keydown.esc="searchInput = ''"
      />
      <button
        class="btn border border-start-0"
        :class="searchInput !== '' ? 'btn-green' : ''"
        type="button"
        id="button-addon2"
        @click="sendToAdvancedSearch()"
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
    </div>
  </section>

  <!-- SECTION Homepage body -->
  <section id="gridApartments" class="container my-5">
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
                  v-if="element.cover_image.startsWith('https://pixabay.com')"
                  :src="element.cover_image"
                  class="card-img-top"
                  :alt="element.slug"
                />
                <img
                  v-else
                  :src="`${store.apiBaseUrl}/storage/${element.cover_image}`"
                  class="card-img-top"
                  :alt="element.slug"
                />
              </figure>
              <div
                class="card-body d-flex flex-column justify-content-between bg-light"
              >
                <h4 class="card-title fw-bolder">{{ element.title }}</h4>
                <div class="mb-1">
                  <span
                    v-for="element in element.services"
                    class="badge btn-green rounded-pill me-1"
                  >
                    {{ element.name }}
                  </span>
                </div>
                <div class="mb-1">
                  <span class="badge text-bg-success rounded-pill me-1">
                    Letti {{ element.num_beds }}
                  </span>
                  <span class="badge text-bg-success rounded-pill">
                    Stanze {{ element.num_rooms }}
                  </span>
                </div>
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
                getApartments(currentPage - 1);
                moveToGrid();
              "
            >
              Precedente
            </button>
          </li>

          <li class="page-item">
            <button
              class="page-link"
              :class="{ disabled: currentPage < 4 }"
              @click="
                getApartments(1);
                moveToGrid();
              "
            >
              &lt;&lt;
            </button>
          </li>

          <li class="page-item">
            <button
              class="page-link"
              :class="{ disabled: currentPage <= 10 }"
              @click="
                getApartments(currentPage - 10);
                moveToGrid();
              "
            >
              -10
            </button>
          </li>

          <li
            class="page-item"
            v-for="element in [...Array(lastPage + 1).keys()].slice(
              currentPage - 2 < 1 ? 1 : Math.min(currentPage - 2, lastPage - 4), // inizio
              Math.max(6, Math.min(lastPage + 1, currentPage + 3)) // fine
            )"
          >
            <button
              class="page-link"
              :class="{ disabled: currentPage === element }"
              @click="
                getApartments(element);
                moveToGrid();
              "
            >
              {{ element }}
            </button>
          </li>

          <li class="page-item">
            <button
              class="page-link"
              :class="{ disabled: currentPage >= lastPage - 9 }"
              @click="
                getApartments(currentPage + 10);
                moveToGrid();
              "
            >
              +10
            </button>
          </li>

          <li class="page-item">
            <button
              class="page-link"
              :class="{ disabled: currentPage > lastPage - 3 }"
              @click="
                getApartments(lastPage);
                moveToGrid();
              "
            >
              &gt;&gt;
            </button>
          </li>

          <li class="page-item">
            <button
              class="page-link"
              :class="{ disabled: currentPage === lastPage }"
              @click="
                getApartments(currentPage + 1);
                moveToGrid();
              "
            >
              Successivo
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
