<script>
import TomTomMap from "../components/TomTomMap.vue";
import tt from "@tomtom-international/web-sdk-maps";
import axios from "axios";
import { store } from "../store";
export default {
  name: "SingleAppartament",
  components: {},
  data() {
    return {
      store,
      apartment: [],
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
          this.apartment = res.data.apartment;

          return this.apartment;
        })
        .then(this.inzializeMap)
        .then(this.getMarker);
    },
    inzializeMap() {
      store.map = tt.map({
        key: import.meta.env.VITE_TOMTOM_API_KEY,
        container: "map",
      });

      store.map.addControl(new tt.FullscreenControl());
      store.map.addControl(new tt.NavigationControl());
      return store.map;
    },
    getMarker() {
      let HouseCoordinates = [
        this.apartment.longitude,
        this.apartment.latitude,
      ];
      let map = tt.map({
        container: "map",
        key: import.meta.env.VITE_TOMTOM_API_KEY,
        center: HouseCoordinates,
        zoom: 13,
      });
      let marker = new tt.Marker().setLngLat(HouseCoordinates).addTo(map);
    },
  },
  mounted() {
    this.getSingleApartment();
  },
};
</script>

<template>
  <div class="container apartment-container d-flex align-items-center pb-2">
    <div class="row w-100 mx-auto single-card shadow">
      <div v-if="apartment.length !== 0" class="col-lg-4 col-sm-12 p-0">
        <figure class="w-100 mb-0">
          <img
            v-if="apartment.cover_image.startsWith('https://pixabay.com')"
            :src="apartment.cover_image"
            class="w-100"
            :alt="apartment.slug"
          />
          <img
            v-else
            :src="`${store.apiBaseUrl}/storage/${apartment.cover_image}`"
            :alt="apartment.slug"
            class="w-100"
          />
        </figure>
      </div>
      <div
        class="col-lg-4 col-sm-12 apartment-details p-5 pt-3 d-flex flex-column gap-2 bg-success-subtle"
      >
        <h2>{{ apartment?.title }}</h2>
        <p class="address text-capitalize">
          <i class="fa-solid fa-location-dot"></i> {{ apartment?.full_address }}
        </p>
        <p>{{ apartment?.description }}</p>
        <div v-if="apartment.length !== 0" class="d-flex align-items-center">
          <div class="mb-0 border-danger" v-for="category in arrayCategories">
            <p
              v-if="category.name === apartment.category && category"
              class="category border border-dark rounded p-2 m-0"
            >
              <i :class="category.icon"></i>
              <span class="text-capitalize ms-1">{{ apartment.category }}</span>
            </p>
          </div>
          <h5 class="price ms-5">{{ apartment?.price }} &euro;/night</h5>
        </div>
        <div>
          <h5 class="fs-6">Detagli:</h5>

          <div>
            <span class="me-2"
              ><i class="fa-solid fa-house"></i>
              {{ apartment?.num_rooms }}</span
            >
            <span class="mx-2"
              ><i class="fa-solid fa-bath"></i>
              {{ apartment?.num_bathrooms }}</span
            >
            <span class="mx-2"
              ><i class="fa-solid fa-square"></i>
              {{ Math.trunc(apartment?.square_meters) }}m <sup>2</sup></span
            >
            <span class="mx-2">
              <i class="fa-solid fa-bed"></i> {{ apartment?.num_beds }}</span
            >
          </div>
        </div>
        <div class="mt-1">
          <h5 class="fs-6">Servizi:</h5>
          <div
            v-if="apartment.length !== 0 && apartment.services.length !== 0"
            class="mt-2"
          >
            <span
              v-for="item in apartment.services"
              :key="item.id"
              class="d-flex text-capitalize"
            >
              <img
                :src="`${store.apiBaseUrl}/storage/${item.icon}`"
                :alt="item.name"
                class="me-1 icon"
              />
              {{ item.name }}
            </span>
          </div>
        </div>

        <button class="btn btn-green w-100 mt-3 text-capitalize">
          Scrivci per prenotare
        </button>
      </div>
      <div class="col-lg-4 col-sm-12 p-0">
        <div id="map" class="map w-100 h-100"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../styles/partials/variables" as *;
img {
  display: block;
}

.apartment-container {
  padding-top: 100px;
  min-height: 100vh;
  border-radius: 15px;
  overflow: hidden;
  .single-card {
    border-radius: 20px;
    overflow: hidden;
  }
  figure {
    height: 100%;
    img {
      height: 100%;
    }
  }
  .apartment-details {
    .icon {
      width: 20px;
      height: 20px;
    }
    .address {
      font-size: 14px;
    }
    .category {
      width: fit-content;
    }
    .price {
      color: $accent-yellow;
      font-weight: bold;
    }
  }
}
@media only screen and (max-width: 576px) {
  .apartment-container {
    padding-inline: 1rem;

    #map {
      height: calc(100vh / 3) !important;
    }
  }
}

@media only screen and (max-width: 768px) {
  #map {
    height: calc(100vh / 3) !important;
  }
}

@media only screen and (min-width: 1400px) {
  .apartment-container {
    .single-card {
      min-height: 60vh;
    }
  }
}
</style>
