import
<script>
import {store} from "store";
import axios from "axios";
export default {
  name: "ContactForm",
  props: {
    apartmentId = String;
  },
  components: {},
  data() {
    return {
      store
      name: "",
      email: "",
      message: "",
      apartment_id:this.apartmentId,
      success: false,
      errors: {},
    };
  },
  methods: {
     sendMessage(){
        const data ={
            name:this.name,
            email:this.email,
            message:this.message,
            apartment_id:this.apartment_id;
        }

        this.errors = {};

        axios.post(`${this.store.apiBaseUrl}/api/apartments`)
     }

  },
  mounted() {},
};
</script>

<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Invia un messaggio per chiedere ulteriori informazioni
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="sendMessage()">
            <div class="mb-3">
              <label for="name" class="col-form-label">Nome:</label>
              <input
                v-model="name"
                name="name"
                type="text"
                class="form-control"
                id="name"
                placeholder="Inserisci il tuo nome"
                required
              />
            </div>
            <div class="mb-3">
              <label for="email" class="col-form-label">Email:</label>
              <input
                v-model="email"
                name="email"
                type="email"
                class="form-control"
                id="email"
                placeholder="Inserisci il tua email"
                required
              />
            </div>
            <div class="mb-3">
              <label for="message" class="col-form-label">Messaggio:</label>

              <textarea
                v-model="message"
                name="message"
                class="form-control"
                id="message"
                cols="30"
                rows="10"
                placeholder="Scrivi il tuo messaggio..."
                required
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-green-inverted"
            data-bs-dismiss="modal"
          >
            Chiudi
          </button>
          <button type="submit" class="btn btn-green">Invia</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../styles/partials/variables" as *;
</style>
