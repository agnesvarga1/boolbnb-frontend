<script>
import TomTomMap from "../components/TomTomMap.vue";
import axios from "axios";
import { store } from "../store";
export default {
  name: "SingleApartment",
  components: {
    TomTomMap,
  },
  data() {
    return {
      store,
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

          console.log(this.singleApartment);
        });
    },
    getCategoryIcon(categoryName) {
      const category = this.arrayCategories.find(
        (cat) => cat.name === categoryName
      );
      return category ? category.icon : "";
    },
  },
  mounted() {
    this.getSingleApartment();
  },
};
</script>

<template>
  <div class="apartment-container">
    <div
      v-if="singleApartment && singleApartment.cover_image"
      class="row rounded-4 overflow-hidden"
    >
      <!-- Apartment Image -->
      <div class="col-lg-4 col-md-12 p-0">
        <figure>
          <img
            :src="
              singleApartment.cover_image.startsWith('https://')
                ? singleApartment.cover_image
                : `${store.apiBaseUrl}/storage/${singleApartment.cover_image}`
            "
            :alt="singleApartment.title"
            class="w-100 h-100"
          />
        </figure>
      </div>
      <!-- Apartment Details -->
      <div class="col-lg-4 col-md-12 apartment-details">
        <h2>{{ singleApartment.title }}</h2>
        <p class="address">
          <i class="fa-solid fa-location-dot"></i>
          {{ singleApartment.full_address }}
        </p>
        <p>{{ singleApartment.description }}</p>
        <div class="d-flex">
          <button
            class="btn btn-green text-capitalize"
            style="width: fit-content"
          >
            <i :class="getCategoryIcon(singleApartment.category)"></i>
            {{ singleApartment.category }}
          </button>
          <h5 class="fw-bold">{{ singleApartment.price }} &euro;/notte</h5>
        </div>
        <span>Dettagli:</span>
        <div class="features">
          <span class="me-3">
            <i class="fa-solid fa-house me-1"></i
            >{{ singleApartment.num_rooms }}
          </span>
          <span class="me-3">
            <i class="fa-solid fa-bath me-1"></i
            >{{ singleApartment.num_bathrooms }}
          </span>
          <span class="me-3">
            <i class="fa-solid fa-square me-1"></i
            >{{ Math.trunc(singleApartment.square_meters) }}m<sup>2</sup>
          </span>
          <span class="me-3">
            <i class="fa-solid fa-bed me-1"></i>{{ singleApartment.num_beds }}
          </span>
        </div>
        <span>Servizi:</span>
        <div
          v-if="singleApartment.services && singleApartment.services.length"
          class="services"
        >
          <ul class="list-unstyled">
            <li
              v-for="item in singleApartment.services"
              :key="item.id"
              class="mt-1"
            >
              <span class="text-capitalize">
                <img
                  :src="`${store.apiBaseUrl}/storage/${item.icon}`"
                  :alt="item.name"
                  class="icon"
                />
                {{ item.name }}
              </span>
            </li>
          </ul>
        </div>
        <button class="btn btn-green w-100 mt-3">
          Contatta il proprietario
        </button>
      </div>
      <!-- Map -->
      <div class="col-lg-4 col-md-12 p-0">
        <TomTomMap :propApartments="[singleApartment]" />
      </div>
    </div>
    <div v-else class="no-data">No apartment details available.</div>
  </div>
</template>

<style lang="scss" scoped>
.apartment-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 158px);
  background-color: #eee;
  figure {
    margin: 0;
    height: 100%;

    img {
      height: 100%;
      object-fit: cover;
    }
  }

  .apartment-details {
    padding: 20px;
    background-color: #d1e7dd;

    .address,
    .features,
    .services {
      font-size: 14px;
      margin-bottom: 10px;
    }

    .icon {
      width: 20px;
      height: 20px;
    }

    h5 {
      color: #ea9d29;
    }
  }

  .map {
    width: 100%;
    height: 100%;
  }

  .no-data {
    text-align: center;
    padding: 20px;
  }
}

@media (max-width: 991px) {
  .apartment-container {
    flex-direction: column;

    #map {
      height: 50vh;
    }
  }
}
</style>
