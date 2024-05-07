import
<script>
import { store } from "../store";
import axios from "axios";
export default {
  name: "ContactForm",

  props: {
    apartment_id: Number,
    title: String,
  },

  components: {},
  data() {
    return {
      store,
      name: "",
      email: "",
      message: "",
      success: false,

      errors: {},
    };
  },

  methods: {
    sendMessage() {
      const data = {
        name: this.name,
        email: this.email,
        message: this.message,
        apartment_id: this.apartment_id,
      };

      this.errors = {};

      axios.post(`${this.store.apiBaseUrl}/api/messages`, data).then((res) => {
        this.success = res.data.success;
        if (!this.success) {
          this.errors = res.data.errors; //err handling
        } else {
          this.$emit("messageSent");

          //reset "" data previous
          this.name = "";
          this.email = "";
          this.message = "";
        }
      });
    },
  },
  mounted() {},
};
</script>

<template>
  <div
    class="modal"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-lg modal-fullscreen-md-down d-flex align-items-center"
      style="height: calc(100vh - 198px)"
    >
      <div class="modal-content shadow-lg">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Invia un messaggio per chiedere ulteriori informazioni
          </h1>
          <button
            @click="$emit('closeModal')"
            type="button"
            class="btn-close"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="sendMessage()">
            <div class="mb-3">
              <h4>{{ title }}</h4>
              <div>
                <span class="campi">Tutti i campi sono obbligatori</span>
              </div>
              <label for="name" class="col-form-label">Nome:</label>
              <input
                v-model="name"
                name="name"
                type="text"
                class="form-control"
                id="name"
                placeholder="Inserisci il tuo nome"
                :class="{ 'is-invalid': errors.name }"
                required
              />
              <p v-for="(err, i) in errors?.name" :key="`message-errors-${i}`">
                {{ err }}
              </p>
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
                :class="{ 'is-invalid': errors.email }"
                required
              />
              <p v-for="(err, i) in errors?.email" :key="`message-errors-${i}`">
                {{ err }}
              </p>
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
                :class="{ 'is-invalid': errors.message }"
                required
              ></textarea>
              <p v-for="(err, i) in errors?.email" :key="`message-errors-${i}`">
                {{ err }}
              </p>
            </div>
            <div class="modal-footer">
              <button
                @click="$emit('closeModal')"
                type="button"
                class="btn btn-green-inverted"
              >
                Chiudi
              </button>
              <button type="submit" class="btn btn-green">Invia</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../styles/partials/variables" as *;
.campi {
  font-size: 12px;
}
</style>
