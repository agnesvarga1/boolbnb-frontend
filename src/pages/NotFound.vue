<script>
  export default {
    name: 'NotFound',
  methods:{
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
  },
    mounted() {
    this.hideButton();
    },
    beforeRouteLeave(to, from, next) {
      this.resetStylesAndClasses();
      next();
    },
  
  }
  </script>

  
  <template>
    <div class="container d-flex flex-column align-items-center justify-content-center mt-5">
      <div class="row">
        <div class="mt-3">
            <div class="d-flex flex-column justify-content-center">
              <div class="d-flex justify-content-center gap-2">
                <h2 class="text-center fw-bold m-0 p-0">Errore</h2>
                <img src="/404-Icon.png"></img> 
              </div>
              <h1 class="text-center fw-bold error m-0 p-0">404</h1>
            </div>
            <h5 class="text-center mt-0">Pagina non trovata</h5>
        </div>
      </div>
      <router-link class="navbar-brand m-0 d-flex flex-column col-2 text-center align-items-center mt-5" :to="{ name: 'home' }">
        <img src="/logo-boolbnb.png" alt="Logo" style="width: 40px;" />
        <span class="fs-6 text-center text-decoration-underline" style="scale: 0.8;">Torna alla home</span>
      </router-link>
    </div>

  </template>
  
  
  
  <style scoped>
.container{
  min-height: 80vh;
  width: 100%;
}
.error{
  font-size: 80px;
}
div>img{
  max-height: 30px;
  width: 30px;
}
  </style>