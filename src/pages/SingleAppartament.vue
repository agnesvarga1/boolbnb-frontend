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
    };
  },
  methods: {
    getSingleApartment() {
      axios
        .get(`${store.apiBaseUrl}/api/apartments/${this.$route.params.slug}`)
        .then((res) => {
          this.apartment = res.data.apartment;
          this.apartment.services.forEach((element) => {
            let pp = element.icon.split("/");
            console.log(pp[1].split("."));
            element.icon = pp[1].split(".")[1] + "." + pp[1].split(".")[2];
          });
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
  <div class="container apartment-container d-flex align-items-center">
    <div class="row w-100">
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
            :src="`${store.apiBaseUrl}/storage/apartment_images/${apartment.cover_image}`"
            :alt="apartment.slug"
            class="w-100"
          />
        </figure>
      </div>
      <div class="col-lg-4 col-sm-12 apartment-details pb-3">
        <h2>{{ apartment?.title }}</h2>
        <p class="address">
          <i class="fa-solid fa-location-dot"></i> {{ apartment?.full_address }}
        </p>
        <p>{{ apartment?.description }}</p>
        <strong class="text-capitalize"
          >Category:{{ apartment?.category }}</strong
        >

        <h5>{{ apartment?.price }} &euro;/night</h5>
        <div>
          <span class="me-2"
            ><i class="fa-solid fa-house"></i> {{ apartment?.num_rooms }}</span
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
              :src="`${store.apiBaseUrl}/storage/icons_services/${item.icon}`"
              :alt="item.name"
              class="me-1 icon"
            />
            {{ item.name }}
          </span>
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
img {
  display: block;
}

.apartment-container {
  padding-top: 100px;
  min-height: 70vh;
  figure {
    max-height: inherit;
    img {
      max-height: inherit;
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
  }
}
@media only screen and (max-width: 600px) {
  .apartment-container {
    padding-inline: 1rem;

    #map {
      height: calc(100vh / 3) !important;
    }
  }
}
</style>
