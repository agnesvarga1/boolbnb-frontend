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
    <div class="container d-flex align-items-center justify-content-center">
      <div class="row ">
        <div class="mt-3">
            <h2 class="text-center fw-bold m-0 p-0">Errore</h2>
            <h1 class="text-center fw-bold error m-0 p-0">404</h1>
            <h5 class="text-center mt-0">Pagina non trovata</h5>
        </div>
      </div>
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
  </style>