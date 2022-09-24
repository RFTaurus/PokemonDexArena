<template>
  <div class="container">
    <div class="page-header text-center">
      <h1>PokemonDex Arena Card List</h1>
    </div>

    <PokemonControlSection @open-filter="showModal" />

    <div class="row align-items-center justify-content-center text-center">
      <div
        v-for="index in 13"
        :key="index"
        class="col-12 col-md-6 col-lg-3 my-4"
      >
        <PokemonCard @show-pokemon-image="showModalImage" />
      </div>
    </div>

    <PokeModal :modal-active="modalActive" @close-modal="showModal">
      <div>
        <h3>Filter Pokemon Type</h3>
        <div class="row align-items-start my-4">
          <div
            v-for="(type, index) in PokemonTypes"
            :key="index"
            class="col-6 col-md-4"
          >
            <label class="checkbox-container">
              {{ type }}
              <input type="checkbox" checked="checked" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
    </PokeModal>

    <PokeModal :modal-active="modalActiveImage" @close-modal="showModalImage">
      <div>
        <h3 class="text-center">Pokemon Image</h3>
        <div class="text-center my-4">
          <div class="pokedex-image-wrapper">
            <img
              class="pokedex-image"
              src="https://img.pokemondb.net/artwork/ivysaur.jpg"
              alt="Pokemon"
            />
          </div>
        </div>
      </div>
    </PokeModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PokemonCard from "../components/PokemonCard.vue";
import PokeModal from "../components/base/PokeModal.vue";
import PokemonControlSection from "../components/PokemonControlSection.vue";
import { POKEMON_TYPES } from "../utils/constant";

const modalActive = ref(null);
const modalActiveImage = ref(null);
const PokemonTypes = POKEMON_TYPES;

const showModal = () => {
  modalActive.value = !modalActive.value;
};

const showModalImage = () => {
  modalActiveImage.value = !modalActiveImage.value;
};
</script>

<style lang="css" scoped>
.page-header {
  color: var(--primary-text-orange);
  font-size: 1em;
}

/* Customize the label (the container) */
.checkbox-container {
  display: block;
  position: relative;
  padding-left: 24px;
  cursor: pointer;
  font-size: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  outline: none;
}

.checkbox-container input:focus {
  outline: none;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 5px;
  left: 0;
  height: 16px;
  width: 16px;
  background-color: var(--vt-c-white);
  outline: none;
}

/* On mouse-over, add a grey background color */
.checkbox-container:hover input ~ .checkmark {
  background-color: var(--vt-c-white);
}

/* When the checkbox is checked, add a blue background */
.checkbox-container input:checked ~ .checkmark {
  background-color: var(--primary-text-orange);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkbox-container .checkmark:after {
  left: 4px;
  top: 0px;
  width: 8px;
  height: 12px;
  border: solid var(--vt-c-white);
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.pokedex-image-wrapper {
  display: inline-block;
  width: 100%;
  max-width: 240px;
}

.pokedex-image {
  width: 100%;
  height: auto;
  border-radius: var(--border-radius-quarter);
}

@media (min-width: 768px) {
  .page-header {
    font-size: 1.25em;
  }
}
</style>
