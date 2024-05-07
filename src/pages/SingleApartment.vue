<script>
import ContactForm from "../components/ContactForm.vue";
import TomTomMap from "../components/TomTomMap.vue";

import axios from "axios";
import { store } from "../store";
export default {
  name: "SingleApartment",
  components: {
    TomTomMap,
    ContactForm,
  },
  data() {
    return {
      store,
      messageSent: false,
      isMoadalOpen: false,
      singleApartment: [],
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
    getSingleApartment() {
      axios
        .get(`${store.apiBaseUrl}/api/apartments/${this.$route.params.slug}`)
        .then((res) => {
          this.singleApartment = res.data.apartment;
        });
    },
    getCategoryIcon(categoryName) {
      const category = this.arrayCategories.find(
        (cat) => cat.name === categoryName
      );
      return category ? category.icon : "";
    },
    toggleModal() {
      this.isMoadalOpen = !this.isMoadalOpen;
    },

    handleMessageSent() {
      this.messageSent = true;
      this.isMoadalOpen = false;
    },
    hideButton() {
      const upButton = document.getElementById("upButton");
      const upContainer = document.getElementById("upContainer");
      upButton.style.display = "none";
      upContainer.classList.remove("mb-4");
    },
    resetStylesAndClasses() {
      const upButton = document.getElementById("upButton");
      const upContainer = document.getElementById("upContainer");
      upButton.style.display = "block";
      upContainer.classList.add("mb-4");
    },
    groupBy(array, key) {
      return array.reduce((accumulator, currentValue) => {
        (accumulator[currentValue[key]] =
          accumulator[currentValue[key]] || []).push(currentValue);
        return accumulator;
      }, {});
    },
  },
  mounted() {
    this.getSingleApartment();
    this.hideButton();
  },
  beforeRouteLeave(to, from, next) {
    this.resetStylesAndClasses();
    next();
  },
};
</script>

<template>
  <div class="apartment-container">
    <div class="container">
      <!-- Message success alert -->
      <div class="row">
        <div
          class="alert alert-success mb-3 col-12"
          v-if="messageSent === true"
          role="alert"
        >
          Il messaggio e stato inviato correttamente.
        </div>
      </div>
      <div
        v-if="singleApartment && singleApartment.cover_image"
        class="row overflow-hidden rounded-4 shadow-lg mx-auto"
        id="apartment-card"
      >
        <!-- Apartment Image -->
        <div class="col-lg-6 col-md-12 p-0">
          <figure class="h-50">
            <img
              :src="
                singleApartment.cover_image.startsWith('https://')
                  ? singleApartment.cover_image
                  : `${store.apiBaseUrl}/storage/${singleApartment.cover_image}`
              "
              :alt="singleApartment.title"
              class="w-100"
            />
            <!-- Map -->
            <div class="p-0">
              <TomTomMap :propApartments="[singleApartment]" />
            </div>
          </figure>
        </div>
        <div
          class="col-lg-6 col-md-12 apartment-details d-flex flex-wrap gap-1"
        >
          <div class="col-12 d-flex flex-column gap-1">
            <h2>{{ singleApartment.title }}</h2>
            <p class="address">
              <i class="fa-solid fa-location-dot"></i>
              {{ singleApartment.full_address }}
            </p>
            <p>{{ singleApartment.description }}</p>
            <div class="d-flex align-items-center gap-4 my-2 fs-5">
              <div class="text-capitalize" style="width: fit-content">
                <i :class="getCategoryIcon(singleApartment.category)"></i>
                {{ singleApartment.category }}
              </div>
              <h5 class="fw-bold mb-0">
                {{ singleApartment.price }} &euro;/notte
              </h5>
            </div>
            <h6 class="mt-4">Dettagli:</h6>
            <div class="features d-flex gap-2">
              <div class="fs-5 d-flex align-items-center">
                <i class="fa-solid fa-house me-2"></i>
                <span class="me-3">
                  {{ singleApartment.num_rooms }}
                </span>
              </div>
              <div class="fs-5 d-flex align-items-center">
                <i class="fa-solid fa-bath me-2"></i>
                <span class="me-3">
                  {{ singleApartment.num_bathrooms }}
                </span>
              </div>
              <div class="fs-5 d-flex align-items-center">
                <i class="fa-solid fa-square me-2"></i>
                <span class="me-3">
                  {{ Math.trunc(singleApartment.square_meters) }}m<sup>2</sup>
                </span>
              </div>
              <div class="fs-5 d-flex align-items-center">
                <i class="fa-solid fa-bed me-2"></i>
                <span class="me-3">{{ singleApartment.num_beds }}</span>
              </div>
            </div>
            <h6 class="mt-2 mb-0">Servizi:</h6>
            <div
              v-if="singleApartment.services && singleApartment.services.length"
              class="services"
            >
              <ul class="list-unstyled">
                <li
                  v-for="item in singleApartment.services"
                  :key="item.id"
                  class="mt-1 d-flex align-items-center"
                >
                  <img
                    :src="`${store.apiBaseUrl}/storage/${item.icon}`"
                    :alt="item.name"
                    class="icon me-2"
                  />
                  <span class="text-capitalize">{{ item.name }}</span>
                </li>
              </ul>
            </div>
          </div>

          <button
            type="button"
            class="btn btn-green col-12 mt-3 align-self-end"
            @click="toggleModal()"
          >
            Contatta il proprietario
          </button>
        </div>

        <div
          v-if="singleApartment.images && singleApartment.images.length"
          class="p-5"
        >
          <div class="row">
            <h1 class="mb-4">Galleria</h1>
            <div
              v-for="(images, category) in groupBy(
                singleApartment.images,
                'category'
              )"
              :key="category"
              class="mb-5 col-4"
            >
              <h4 class="text-capitalize">{{ category }}</h4>
              <div
                class="carousel slide"
                :id="'carousel-' + category.replace(/\s+/g, '-')"
                data-bs-ride="carousel"
                style="position: relative"
              >
                <div class="carousel-inner">
                  <div
                    v-for="(image, index) in images"
                    :key="image.id"
                    class="carousel-item"
                    :class="{ active: index === 0 }"
                  >
                    <img
                      :src="
                        image.path.startsWith('https://')
                          ? image.path
                          : `${store.apiBaseUrl}/storage/${image.path}`
                      "
                      class="d-block w-100 rounded"
                      :alt="`Image of ${category}`"
                      style="height: 300px; object-fit: cover"
                    />
                  </div>
                </div>
                <!-- Navigation Controls -->
                <button
                  v-if="images.length > 1"
                  class="carousel-control-prev"
                  type="button"
                  :data-bs-target="'#carousel-' + category.replace(/\s+/g, '-')"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                </button>
                <button
                  v-if="images.length > 1"
                  class="carousel-control-next"
                  type="button"
                  :data-bs-target="'#carousel-' + category.replace(/\s+/g, '-')"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                </button>
                <!-- Image Count -->
                <div
                  class="position-absolute top-0 end-0 bg-dark text-white p-2 rounded"
                  style="background-color: rgba(0, 0, 0, 0.75)"
                >
                  {{ images.length }} Immagin{{ images.length > 1 ? "i" : "e" }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="no-data">No apartment details available.</div>
    </div>
  </div>
  <!-- Apartment Details -->

  <ContactForm
    :class="isMoadalOpen === true ? 'd-block' : ''"
    :apartment_id="singleApartment.id"
    @messageSent="handleMessageSent"
    @closeModal="toggleModal"
  />
</template>

<style lang="scss" scoped>
.position-absolute {
  top: 0;
  right: 0;
  padding: 0.5rem;
  font-size: 0.9rem;
  border-radius: 0.25rem;
  z-index: 2; // To make sure it's above the carousel images
}

.apartment-container {
  padding: 100px 0 2rem;
  min-height: calc(100vh - 170px);

  background-color: #fafafa;
  figure {
    margin: 0;
    height: 100%;

    // img {
    //   // height: 100%;
    //   // object-fit: center;
    // }
  }

  .apartment-details {
    padding: 25px;
    background-color: #d1e7dd;
    // overflow: auto; // Assicurati che questa regola sia applicata
    //height: 100%; // Definisci un'altezza massima per il test

    .address,
    .features,
    .services {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .icon {
      width: 20px;
      height: 20px;
    }

    h5 {
      font-size: 27px;
      color: #ea9d29;
    }

    h6 {
      font-size: 18px;
    }
  }

  #tomtom-map {
    width: 100%;
    height: 30vh;
  }

  .no-data {
    text-align: center;
    padding: 20px;
  }
}

// #apartment-card {
//   height: 85%; // Definisci un'altezza massima per il test
// }

@media (max-width: 991px) {
  .apartment-container {
    flex-direction: column;

    #map {
      height: 50vh;
    }
  }

  #apartment-card {
    border-radius: 0;
    width: 100%;
  }
}
</style>
