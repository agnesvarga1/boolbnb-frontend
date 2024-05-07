<script>
import TomTomMap from "../components/TomTomMap.vue";
import axios from "axios";
import { store } from "../store.js";

export default {
  name: "AdvancedSearch",
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
      bedsInput: "",
      roomsInput: "",
      servicesInput: [],
      currentCategory: "",
      arrayAddresses: [],
      automcompleteApiResponseArray: [],
      infoApartmentsArray: [],
      isFiltered: false,
      isCategory: false,
      arrayCategories: [
        {
          name: "villa",
          icon: "fa-solid fa-house-chimney",
        },
        {
          name: "appartamento",
          icon: "fa-solid fa-tree-city",
        },
        {
          name: "agriturismo",
          icon: "fa-solid fa-building-wheat",
        },
        {
          name: "baita",
          icon: "fa-solid fa-campground",
        },
        {
          name: "castello",
          icon: "fa-brands fa-fort-awesome",
        },
        {
          name: "loft",
          icon: "fa-solid fa-hotel",
        },
        {
          name: "roulotte",
          icon: "fa-solid fa-caravan",
        },
      ],
    };
  },
  methods: {
    getApartments(postApiPage, postCategoryName) {
      axios
        .get(`${store.apiBaseUrl}/api/apartments`, {
          params: {
            page: postApiPage,
            category: postCategoryName,
            from_where: "advancedSearch",
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
    radiusSearch(postApiPage) {
      let homeLatitude, homeLongitude;

      if (
        store.homeLat !== 0 &&
        store.homeLong !== 0 &&
        store.homeInput !== ""
      ) {
        homeLatitude = store.homeLat;
        homeLongitude = store.homeLong;

        store.homeLat = 0;
        store.homeLong = 0;
        store.homeInput = "";
      } else {
        if (this.searchInput !== "") {
          homeLatitude = this.automcompleteApiResponseArray[0].position.lat;
          homeLongitude = this.automcompleteApiResponseArray[0].position.lon;
        } else {
          homeLatitude = undefined;
          homeLongitude = undefined;
        }
      }

      const params = {
        page: postApiPage,
        latitude: homeLatitude,
        longitude: homeLongitude,
        radius: this.radiusInput,
        num_beds: this.bedsInput,
        num_rooms: this.roomsInput,
        services: this.servicesInput,
        category: this.currentCategory,
        from_where: "advancedSearch",
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
    manageCategory(categoryName) {
      if (!this.isFiltered) {
        this.isFiltered = true;
        this.isCategory = true;

        this.currentCategory = categoryName;

        this.radiusSearch(1);
      } else if (this.isFiltered && !this.isCategory) {
        this.isCategory = true;

        this.currentCategory = categoryName;

        this.radiusSearch(1);
      } else if (
        this.currentCategory !== categoryName &&
        this.isCategory &&
        this.isFiltered
      ) {
        this.currentCategory = categoryName;

        this.radiusSearch(1);
      } else if (this.isFiltered && this.isCategory) {
        this.isCategory = false;

        this.currentCategory = "";

        this.radiusSearch(1);
      }
    },
    getCategoryIcon(categoryName) {
      const category = this.arrayCategories.find(
        (cat) => cat.name === categoryName
      );
      return category ? category.icon : "fa-solid fa-circle-question"; // Icona di default se non trova corrispondenze
    },
    checkDates(expDate) {
      let now = Date.now();
      let endDate = new Date(expDate);
      let endDateInMs = endDate.getTime();

      let diff = endDateInMs - now;

      if (diff > 0) {
        return true;
      } else {
        return false;
      }
    },
    formatDistance(distance) {
      if (distance < 1000) {
        // Distanza minore di 1000 metri, mostra in metri
        // Utilizza Math.round per arrotondare al numero intero più vicino
        return `${Math.round(distance)} metri`;
      } else {
        // Distanza maggiore o uguale a 1000 metri, mostra in chilometri con una cifra decimale
        // Divide per 1000 e arrotonda a una cifra decimale
        return `${(distance / 1000).toFixed(1)} km`;
      }
    },
  },
  watch: {
    searchInput(newVal) {
      this.autocompleteSearch();
    },
    radiusInput(newVal) {
      this.radiusSearch(1);
    },
    bedsInput(newVal) {
      this.radiusSearch(1);
      if (this.bedsInput === "") this.isFiltered = false;
    },
    roomsInput(newVal) {
      this.radiusSearch(1);
      if (this.roomsInput === "") this.isFiltered = false;
    },
    servicesInput: {
      handler(newApartments, oldApartments) {
        this.radiusSearch(1);

        if (this.servicesInput.length === 0) {
          this.isFiltered = false;
        }
      },
      deep: true,
    },
  },

  mounted() {
    if (store.homeInput === "") {
      this.getApartments(1);
    } else {
      this.searchInput = store.homeInput;
      this.radiusSearch(1);
    }
    this.getServices();
  },
};
</script>

<template>
  <!-- Search Section -->
  <section class="container my-4" style="padding-top: 80px">
    <div class="input-group d-flex">
      <h2 class="me-4 fw-bolder">Inizia a cercare</h2>
      <input
        type="text"
        class="form-control border border-end-0 mx-0 rounded-start-pill"
        placeholder="Cerca località..."
        aria-describedby="button-addon2"
        v-model="searchInput"
        list="addressList"
        @keydown.enter="radiusSearch(1)"
      />
      <button
        class="btn border border-start-0 rounded-end-circle mx-0"
        :class="searchInput !== '' ? 'btn-green' : ''"
        type="button"
        id="button-addon2"
        @click="radiusSearch(1)"
      >
        <i class="fa-solid fa-magnifying-glass mx-0"></i>
      </button>
      <datalist id="addressList">
        <option v-for="element in arrayAddresses" :value="element"></option>
      </datalist>
    </div>
    <div
      class="row my-4 justify-content-center justify-content-lg-evenly gap-3 row-gap-2"
    >
      <button
        v-for="element in arrayCategories"
        @click="manageCategory(element.name)"
        class="btn btn-green text-capitalize"
        :class="currentCategory == element.name ? '' : 'active'"
        style="width: fit-content"
      >
        <i :class="element.icon"></i>
        {{ element.name }}
      </button>
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
        step="10"
        v-model="radiusInput"
        :disabled="searchInput === ''"
      />
    </div>
    <!-- Letti e Stanze -->
    <div class="row">
      <div class="col-lg-7 col-12 row">
        <div class="col-6">
          <label for="num_beds" class="form-label">Letti</label>
          <div class="input-group mb-3">
            <span class="input-group-text"
              ><i class="fa-solid fa-bed"></i
            ></span>
            <input
              type="number"
              class="form-control"
              id="num_beds"
              aria-describedby="num_beds"
              name="num_beds"
              min="0"
              v-model="bedsInput"
            />
          </div>
        </div>

        <div class="col-6">
          <label for="num_rooms" class="form-label">Stanze</label>
          <div class="input-group mb-3">
            <input
              type="number"
              class="form-control"
              id="num_rooms"
              aria-describedby="num_rooms"
              name="num_rooms"
              min="0"
              v-model="roomsInput"
            />
          </div>
        </div>
      </div>

      <!-- Servizi -->

      <div class="mb-2 col-xl-5 col-md-12">
        <label class="form-label">Servizi</label>
        <div
          class="form-check d-flex flex-wrap row-gap-1 justify-content-between"
        >
          <div
            v-for="element in arrayServices"
            :key="element.id"
            class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-6 d-flex align-items-center"
          >
            <div>
              <input
                class="form-check-input"
                type="checkbox"
                name="services[]"
                :id="`service_${element.id}`"
                :value="element.id"
                v-model="servicesInput"
              />
              <img
                :src="`${store.apiBaseUrl}/storage/${element.icon}`"
                :alt="element.name"
                style="width: 15px; height: 1rem"
                class="ms-1"
              />
              <label
                class="form-check-label text-capitalize ms-2"
                :for="`service_${element.id}`"
              >
                {{ element.name }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-center">
      <button
        class="btn btn-green"
        :class="{ 'd-none': !isFiltered }"
        @click="
          getApartments(1);
          searchInput = '';
          radiusInput = 20;
          bedsInput = '';
          roomsInput = '';
          servicesInput = [];
          currentCategory = '';
          isFiltered = false;
        "
        style="scale: 0.8"
      >
        Cancella filtri
      </button>
    </div>
  </section>

  <!-- SECTION Advanced Search body -->
  <section id="gridApartments" class="container my-5">
    <h1 class="my-2 fw-bold">
      Risultati ({{ infoApartmentsArray.total }})
      {{
        infoApartmentsArray.total === 0
          ? ""
          : `- Pagina ${currentPage}/${lastPage}`
      }}
    </h1>

    <hr />

    <div v-if="arrayApartments.length > 0">
      <div class="row row-gap-4 mb-5">
        <div
          v-for="element in arrayApartments"
          :key="element.id"
          class="col-md-6 col-lg-4"
        >
          <router-link
            :to="{ name: 'apartment', params: { slug: element.slug } }"
            class="nav-link"
          >
            <!-- INIZIO CARDS -->
            <div class="card">
              <figure class="mb-0 card-img-top">
                <!-- SPONSOR-BADGE -->
                <div
                  v-if="checkDates(element.expiration_date) === true"
                  class="sponsor-container position-absolute top-0 end-0 m-2 p-1"
                >
                  <img
                    class="w-100 h-100"
                    src="../../badge-boolbnb-sponsor.png"
                    alt="logo-sponsored"
                  />
                </div>
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
                <!-- Titolo -->
                <h4 class="card-title fw-bolder text-nowrap overflow-hidden">
                  {{ element.title }}
                </h4>

                <!--Icone servizi -->
                <div class="mb-1 d-flex">
                  <span
                    v-for="element in element.services"
                    class="badge rounded-pill me-2 mb-1 p-1"
                    :class="
                      servicesInput.includes(element.id)
                        ? 'active-service order-0'
                        : 'btn-green order-1'
                    "
                  >
                    <img
                      :src="`${store.apiBaseUrl}/storage/${element.icon}`"
                      :alt="element.name"
                      style="width: 15px; filter: brightness(0) invert(1)"
                    />
                  </span>
                </div>

                <!-- Categoria, letti e stanze -->
                <div class="mb-2 d-flex align-items-center flex-wrap row-gap-1">
                  <div class="me-3">
                    Categoria:
                    <span
                      class="badge text-bg-danger rounded-pill text-capitalize"
                    >
                      <i
                        :class="getCategoryIcon(element.category)"
                        style="
                          color: black;
                          font-size: 15px;
                          filter: brightness(0) invert(1);
                        "
                      ></i>
                    </span>
                  </div>

                  <div class="me-3">
                    Letti:
                    <span
                      class="badge text-bg-success rounded-pill me-1 text-white"
                      style="font-size: 15px"
                    >
                      {{ element.num_beds }}
                    </span>
                  </div>
                  <div>
                    Stanze:
                    <span
                      class="badge text-bg-success rounded-pill text-white"
                      style="font-size: 15px"
                    >
                      {{ element.num_rooms }}
                    </span>
                  </div>
                </div>

                <!-- Prezzo -->
                <h6 class="mb-2 col-5 price-tag fw-bolder">
                  {{ element.price }} €/notte
                </h6>

                <!-- Indirizzo -->
                <p
                  class="card-text after-name text-truncate text-body-secondary mb-2"
                >
                  {{ element.full_address }}
                </p>
                <p
                  v-show="element.distance"
                  class="card-text after-name text-truncate text-body-secondary mb-2"
                >
                  {{ formatDistance(element.distance) }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Navigation menu -->
      <nav
        aria-label="Page navigation example"
        class="mb-2 d-flex justify-content-center container"
      >
        <ul class="pagination pagination-sm flex-wrap">
          <!-- Aggiunta di pagination-sm per dispositivi piccoli e flex-wrap per permettere alla paginazione di adattarsi su più linee se necessario -->

          <!-- Button Previous -->
          <li class="page-item d-none d-sm-block">
            <button
              class="page-link text-secondary-emphasis"
              :class="{ disabled: currentPage === 1 }"
              @click="
                moveToGrid();
                !isFiltered
                  ? getApartments(currentPage - 1, currentCategory)
                  : radiusSearch(currentPage - 1);
              "
            >
              Precedente
            </button>
          </li>

          <!-- Fast backward button -->
          <li class="page-item">
            <button
              class="page-link text-secondary-emphasis"
              :class="{ disabled: currentPage == 1 }"
              @click="
                moveToGrid();
                !isFiltered
                  ? getApartments(1, currentCategory)
                  : radiusSearch(1);
              "
            >
              &lt;&lt;
            </button>
          </li>

          <!-- Dynamic page numbers -->
          <li
            class="page-item"
            v-if="lastPage <= 4"
            v-for="element in lastPage"
          >
            <button
              class="page-link text-secondary-emphasis"
              :class="{ disabled: currentPage === element }"
              @click="
                getApartments(element);
                moveToGrid();
              "
            >
              {{ element }}
            </button>
          </li>

          <li
            class="page-item"
            v-else=""
            v-for="element in [...Array(lastPage + 1).keys()].slice(
              currentPage - 2 < 1 ? 1 : Math.min(currentPage - 2, lastPage - 4),
              Math.max(6, Math.min(lastPage + 1, currentPage + 3))
            )"
          >
            <button
              class="page-link text-secondary-emphasis"
              :class="{ disabled: currentPage === element }"
              @click="
                getApartments(element);
                moveToGrid();
              "
            >
              {{ element }}
            </button>
          </li>

          <!-- Fast forward button -->
          <li class="page-item">
            <button
              class="page-link text-secondary-emphasis"
              :class="{ disabled: currentPage == lastPage }"
              @click="
                moveToGrid();
                !isFiltered
                  ? getApartments(lastPage, currentCategory)
                  : radiusSearch(lastPage);
              "
            >
              &gt;&gt;
            </button>
          </li>

          <!-- Button Next -->
          <li class="page-item d-none d-sm-block">
            <button
              class="page-link text-secondary-emphasis"
              :class="{ disabled: currentPage === lastPage }"
              @click="
                moveToGrid();
                !isFiltered
                  ? getApartments(currentPage + 1, currentCategory)
                  : radiusSearch(currentPage + 1);
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

.sponsor-container {
  width: 55px;
  aspect-ratio: 1;
}
</style>
