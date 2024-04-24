<script>
export default {
  name: "ApartmentCards",
  components: {

  },
  data() {
    return {
        apartments:[],
    };
  },
  methods: {

  },
  mounted() {
    axios.get('/api/apartments')
      .then(response => {
        console.log(response)
        this.apartments = response.data;
      })
      .catch(error => {
        console.error('There was an error fetching the apartments:', error);
      });
  },
};
</script>

<template>
<router-link :to="{ name: 'Appartament' }" class="nav-link">

    <div class="card h-100" @click="redirectToApartment(apartment.slug)">

        <!-- <img :src="apartment.cover_image" class="card-img-top" :alt="apartment.title"> -->
        
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ apartment.title }}</h5>
            <p class="card-text mb-2">{{ apartment.full_address }}</p>
            <h6 class="card-title">{{ apartment.price }}€/notte</h6>
            <button @click="redirectToApartment(apartment.slug)" class="btn btn-primary">
                Vedi di più
            </button>
        </div>

    </div>

</router-link>
</template>

<style>

</style>