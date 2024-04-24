<script>
export default {
    name: 'AppHeader',
    components: {

    },
    data(){
        return{

        }
        },
        methods: {

        },
        mounted() {

        }
}
</script>

<template>

    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top bg-opacity-75 p-0">

        <div class="container">

            <a class="navbar-brand m-0 " href="#"> <!-- URL della tua homepage -->
                <img src="./photo_5839426266103660487_x.jpg" alt="Logo" style="max-height: 70px;">
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto p-3 gap-5">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Shop</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Vetrina</a>
                    </li>
                    <li class="nav-item">
                        <a class="btn btn-primary" href="#">Area personale</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

</template>

<style lang="scss">

</style>
