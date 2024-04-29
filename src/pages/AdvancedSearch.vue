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
        console.log("coordinate prese dalla homepage");

        homeLatitude = store.homeLat;
        homeLongitude = store.homeLong;

        store.homeLat = 0;
        store.homeLong = 0;
        store.homeInput = "";
      } else {
        if (this.searchInput !== "") {
          console.log("coordinate prese da advanced");

          homeLatitude = this.automcompleteApiResponseArray[0].position.lat;
          homeLongitude = this.automcompleteApiResponseArray[0].position.lon;
        } else {
          console.log("coordinate non prese");

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
  <section class="container my-3" style="padding-top: 80px">
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
        :class="searchInput !== '' ? 'btn-green' : ''"
        type="button"
        id="button-addon2"
        @click="radiusSearch(1)"
      >
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
      <datalist id="addressList">
        <option v-for="element in arrayAddresses" :value="element"></option>
      </datalist>
      <button
        class="btn btn-green ms-5"
        :class="{ disabled: !isFiltered }"
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
      >
        Reset
      </button>
    </div>
    <div class="row my-4 justify-content-evenly">
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
    <div class="row">
      <div class="col-7 row">
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

      <div class="col-5">
        <div class="mb-3">
          <label class="form-label">Servizi</label>
          <div class="form-check d-flex flex-wrap">
            <div
              v-for="element in arrayServices"
              :key="element.id"
              class="col-6"
            >
              <img
                :src="`${store.apiBaseUrl}/storage/${element.icon}`"
                :alt="element.name"
                style="width: 15px"
              />
              <input
                class="form-check-input"
                type="checkbox"
                name="services[]"
                :id="`service_${element.id}`"
                :value="element.id"
                v-model="servicesInput"
              />
              <label
                class="form-check-label text-capitalize ms-2"
                :for="`service_ ${element.id}`"
              >
                {{ element.name }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION Advanced Search body -->
  <section id="gridApartments" class="container my-5">
    <h1 class="my-2 fw-bold">
      Risultati ({{ infoApartmentsArray.total }})
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
                <ul class="list-unstyled">
                  <li>
                    Categoria:
                    <span class="badge text-bg-danger rounded-pill">
                      {{ element.category }}
                    </span>
                  </li>
                  <li>
                    Servizi:
                    <span
                      v-for="element in element.services"
                      class="badge btn-green rounded-pill me-1"
                    >
                      {{ element.name }}
                    </span>
                  </li>
                  <li>
                    Letti:
                    <span class="badge text-bg-success rounded-pill me-1">
                      {{ element.num_beds }}
                    </span>
                  </li>
                  <li>
                    Stanze:
                    <span class="badge text-bg-success rounded-pill">
                      {{ element.num_rooms }}
                    </span>
                  </li>
                </ul>
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
                moveToGrid();
                !isFiltered
                  ? getApartments(currentPage - 1, currentCategory)
                  : radiusSearch(currentPage - 1);
              "
            >
              Precedente
            </button>
          </li>

          <li class="page-item">
            <button
              class="page-link"
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

          <li class="page-item">
            <button
              class="page-link"
              :class="{ disabled: currentPage <= 10 }"
              @click="
                moveToGrid();
                !isFiltered
                  ? getApartments(currentPage - 10, currentCategory)
                  : radiusSearch(currentPage - 10);
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
                moveToGrid();
                !isFiltered
                  ? getApartments(element, currentCategory)
                  : radiusSearch(element);
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
                moveToGrid();
                !isFiltered
                  ? getApartments(currentPage + 10, currentCategory)
                  : radiusSearch(currentPage + 10);
              "
            >
              +10
            </button>
          </li>

          <li class="page-item">
            <button
              class="page-link"
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

          <li class="page-item">
            <button
              class="page-link"
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
</style>
