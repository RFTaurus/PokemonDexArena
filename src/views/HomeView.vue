<template>
  <div class="container">
    <div class="page-header text-center">
      <h1>PokemonDex Arena List Card</h1>
    </div>
    <div></div>
    <div class="row align-items-center justify-content-center text-center">
      <div class="col col-md-6 col-lg-3 my-4">
        <PokemonCard />
      </div>
      <div class="col col-md-6 col-lg-3 my-4">
        <PokemonCard />
      </div>
      <div class="col col-md-6 col-lg-3 my-4">
        <PokemonCard />
      </div>
      <div class="col col-md-6 col-lg-3 my-4">
        <PokemonCard />
      </div>
      <div class="col col-md-6 col-lg-3 my-4">
        <PokemonCard />
      </div>
      <div class="col col-md-6 col-lg-3 my-4">
        <PokemonCard />
      </div>
      <div class="col col-md-6 col-lg-3 my-4">
        <PokemonCard />
      </div>
      <div class="col col-md-6 col-lg-3 my-4">
        <PokemonCard />
      </div>
      <div class="col col-md-6 col-lg-3 my-4">
        <PokemonCard />
      </div>
      <div class="col col-md-6 col-lg-3 my-4">
        <PokemonCard />
      </div>
      <div class="col col-md-6 col-lg-3 my-4">
        <PokemonCard />
      </div>
      <div class="col col-md-6 col-lg-3 my-4">
        <PokemonCard />
      </div>
      <div class="col col-md-6 col-lg-3 my-4">
        <PokemonCard />
      </div>
      <div class="col col-md-6 col-lg-3 my-4">
        <PokemonCard />
      </div>
      <div class="col col-md-6 col-lg-3 my-4">
        <PokemonCard />
      </div>
    </div>
  </div>
</template>

<script setup>
import PokemonCard from "../components/PokemonCard.vue";
</script>

<style lang="css" scoped>
.page-header {
  color: #f68522;
  font-size: 1em;
}

@media (min-width: 768px) {
  .page-header {
    font-size: 1.5em;
  }
}
</style>
