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
    getApartments(postApiPage) {
      axios
        .get(`${store.apiBaseUrl}/api/apartments`, {
          params: {
            page: postApiPage,
            from_where: "homePage",
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
    getCategoryIcon(categoryName) {
      const category = this.arrayCategories.find(
        (cat) => cat.name === categoryName
      );
      return category ? category.icon : "fa-solid fa-circle-question"; // Icona di default se non trova corrispondenze
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
  <!-- Slider (Carousel) -->
  <div
    id="heroCarousel"
    class="carousel slide carousel-fade"
    data-bs-ride="carousel"
    data-bs-interval="5000"
  >
    <div class="carousel-inner">
      <!-- Slide 1 -->
      <div
        class="carousel-item active"
        style="
          height: 75vh;
          background-image: url('/sfondi/immobili-di-prestigio-milano-1024x681 (2).jpg');
          background-size: cover;
          background-position: center;
        "
        data-bs-interval="3000"
      >
        <div
          class="carousel-caption d-flex flex-column h-100 align-items-center justify-content-end"
        >
          <div
            class="text-center col-12"
            style="background-color: rgb(26, 198, 182, 0.6); width: 100vw"
          >
            <h2 class="fw-bold text-light py-3 text-shadow">Scopri BoolBnB</h2>
          </div>
          <a class="btn btn-green-inverted mt-3" href="#" role="button">
            <router-link :to="{ name: 'search' }" class="nav-link">
              Affitta subito!
            </router-link>
          </a>
        </div>
      </div>

      <!-- Slide 2 -->
      <div
        class="carousel-item"
        style="
          height: 75vh;
          background-image: url('/sfondi/blake-wheeler-zBHU08hdzhY-unsplash.jpg');
          background-size: cover;
          background-position: center;
        "
        data-bs-interval="3000"
      >
        <div
          class="carousel-caption d-flex flex-column h-100 align-items-center justify-content-end"
        >
          <div
            class="text-center col-12"
            style="background-color: rgb(26, 198, 182, 0.6); width: 100vw"
          >
            <h2 class="fw-bold text-light py-3 text-shadow">Scopri BoolBnB</h2>
          </div>
          <a class="btn btn-green-inverted mt-3" href="#" role="button">
            <router-link :to="{ name: 'search' }" class="nav-link">
              Affitta subito!
            </router-link>
          </a>
        </div>
      </div>

      <!-- Slide 3 -->
      <div
        class="carousel-item"
        style="
          height: 75vh;
          background-image: url('/sfondi/breno-assis-r3WAWU5Fi5Q-unsplash.jpg');
          background-size: cover;
          background-position: center;
        "
        data-bs-interval="3000"
      >
        <div
          class="carousel-caption d-flex flex-column h-100 align-items-center justify-content-end"
        >
          <div
            class="text-center col-12"
            style="background-color: rgb(26, 198, 182, 0.6); width: 100vw"
          >
            <h2 class="fw-bold text-light py-3 text-shadow">Scopri BoolBnB</h2>
          </div>
          <a class="btn btn-green-inverted mt-3" href="#" role="button">
            <router-link :to="{ name: 'search' }" class="nav-link">
              Affitta subito!
            </router-link>
          </a>
        </div>
      </div>

      <!-- Slide 4 -->
      <div
        class="carousel-item"
        style="
          height: 75vh;
          background-image: url('/sfondi/maximillian-conacher-sPpe2D7VbpM-unsplash.jpg');
          background-size: cover;
          background-position: center;
        "
        data-bs-interval="3000"
      >
        <div
          class="carousel-caption d-flex flex-column h-100 align-items-center justify-content-end"
        >
          <div
            class="text-center col-12"
            style="background-color: rgb(26, 198, 182, 0.6); width: 100vw"
          >
            <h2 class="fw-bold text-light py-3 text-shadow">Scopri BoolBnB</h2>
          </div>
          <a class="btn btn-green-inverted mt-3" href="#" role="button">
            <router-link :to="{ name: 'search' }" class="nav-link">
              Affitta subito!
            </router-link>
          </a>
        </div>
      </div>

      <!-- Slide 5 -->
      <div
        class="carousel-item"
        style="
          height: 75vh;
          background-image: url('/sfondi/toa-heftiba-nrSzRUWqmoI-unsplash.jpg');
          background-size: cover;
          background-position: center;
        "
        data-bs-interval="3000"
      >
        <div
          class="carousel-caption d-flex flex-column h-100 align-items-center justify-content-end"
        >
          <div
            class="text-center col-12"
            style="background-color: rgb(26, 198, 182, 0.6); width: 100vw"
          >
            <h2 class="fw-bold text-light py-3 text-shadow">Scopri BoolBnB</h2>
          </div>
          <a class="btn btn-green-inverted mt-3" href="#" role="button">
            <router-link :to="{ name: 'search' }" class="nav-link">
              Affitta subito!
            </router-link>
          </a>
        </div>
      </div>

      <!-- Slide 6 -->
      <div
        class="carousel-item"
        style="
          height: 75vh;
          background-image: url('/sfondi/tom-rumble-7lvzopTxjOU-unsplash.jpg');
          background-size: cover;
          background-position: center;
        "
        data-bs-interval="3000"
      >
        <div
          class="carousel-caption d-flex flex-column h-100 align-items-center justify-content-end"
        >
          <div
            class="text-center col-12"
            style="background-color: rgb(26, 198, 182, 0.6); width: 100vw"
          >
            <h2 class="fw-bold text-light py-3 text-shadow">Scopri BoolBnB</h2>
          </div>
          <a class="btn btn-green-inverted mt-3" href="#" role="button">
            <router-link :to="{ name: 'search' }" class="nav-link">
              Affitta subito!
            </router-link>
          </a>
        </div>
      </div>

      <!-- Slide 7 -->
      <div
        class="carousel-item"
        style="
          height: 75vh;
          background-image: url('/sfondi/trayan-xIOYJSVEZ8c-unsplash.jpg');
          background-size: cover;
          background-position: center;
        "
        data-bs-interval="3000"
      >
        <div
          class="carousel-caption d-flex flex-column h-100 align-items-center justify-content-end"
        >
          <div
            class="text-center col-12"
            style="background-color: rgb(26, 198, 182, 0.6); width: 100vw"
          >
            <h2 class="fw-bold text-light py-3 text-shadow">Scopri BoolBnB</h2>
          </div>
          <a class="btn btn-green-inverted mt-3" href="#" role="button">
            <router-link :to="{ name: 'search' }" class="nav-link">
              Affitta subito!
            </router-link>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Search Section -->
  <section class="container mt-5">
    <div class="input-group d-flex">
      <h2 class="me-4 fw-bolder">Inizia a cercare</h2>
      <input
        type="text"
        class="form-control border border-end-0 mx-0 rounded-start-pill"
        placeholder="Cerca località..."
        aria-describedby="button-addon2"
        v-model="searchInput"
        list="addressList"
        @keydown.enter="sendToAdvancedSearch()"
        @keydown.esc="searchInput = ''"
      />
      <button
        class="btn border border-start-0 rounded-end-pill"
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
      Appartamenti in evidenza ({{ infoApartmentsArray.total }})
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
                <div class="mb-1">
                  <span
                    v-for="element in element.services"
                    class="badge btn-green rounded-pill me-2 mb-1 p-1"
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
                  class="card-text after-name text-truncate text-body-secondary"
                >
                  {{ element.full_address }}
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
        <ul class="pagination pagination-sm flex-wrap text-dark">
          <!-- Button Previous -->
          <li class="page-item d-none d-sm-block">
            <button
              class="page-link text-secondary-emphasis"
              :class="{ disabled: currentPage === 1 }"
              @click="
                getApartments(currentPage - 1);
                moveToGrid();
              "
            >
              Precedente
            </button>
          </li>

          <!-- Fast backward button -->
          <li class="page-item">
            <button
              class="page-link text-secondary-emphasis"
              :class="{ disabled: currentPage < 4 }"
              @click="
                getApartments(1);
                moveToGrid();
              "
            >
              &lt;&lt;
            </button>
          </li>

          <!-- Dynamic page numbers -->
          <li
            class="page-item"
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
              :class="{ disabled: currentPage > lastPage - 3 }"
              @click="
                getApartments(lastPage);
                moveToGrid();
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
  </section>
</template>

<style lang="scss">
.card {
  height: 400px;
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
