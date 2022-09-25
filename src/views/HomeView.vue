<template>
  <div class="container">
    <div class="page-header text-center">
      <h1>PokemonDex Arena Card List</h1>
    </div>

    <PokemonControlSection
      @open-filter="showModal"
      @search-pokemon="getPokemonData"
    />

    <div
      ref="infiniteScrollComponent"
      v-if="pokemons?.length !== 0"
      class="row align-items-center justify-content-space-between text-center"
    >
      <div
        v-for="(pokemon, index) in pokemons"
        :key="index"
        class="col-12 col-md-6 col-lg-3 my-4"
      >
        <PokemonCard
          :image="pokemon.image"
          :number="pokemon.number"
          :name="pokemon.name"
          :max-c-p="pokemon.maxCP"
          :types="pokemon.types"
          @show-pokemon-image="showModalImage(pokemon.image)"
        />
      </div>
    </div>
    <div v-else>
      <h3 class="text-center">There is no Pokemon Card List</h3>
    </div>

    <PokeModal :modal-active="modalActive" @close-modal="showModal">
      <div>
        <h3>Filter Pokemon Type</h3>
        <div class="row align-items-start my-4">
          <div
            v-for="(type, index) in pokemonTypes"
            :key="index"
            class="col-6 col-md-4"
          >
            <label class="checkbox-container">
              {{ type }}
              <input v-model="checkedFilter" type="checkbox" :value="type" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
        <div class="mt-4">
          <div class="row align-items-center">
            <div class="col-12 col-md-6">
              <PokeButton
                :is-secondary="true"
                :btn-text="'Reset'"
                @btn-action="resetFilterData"
              />
            </div>
            <div class="col-12 col-md-6">
              <PokeButton :btn-text="'Apply'" @btn-action="applyFilter" />
            </div>
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
              :src="getImageUrl(selectedImage)"
              alt="Pokemon"
            />
          </div>
        </div>
      </div>
    </PokeModal>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import PokemonCard from "../components/PokemonCard.vue";
import PokeModal from "../components/base/PokeModal.vue";
import PokemonControlSection from "../components/PokemonControlSection.vue";
import { POKEMON_TYPES } from "../utils/constant";
import { fetchPokemonDataList } from "../manager/pokemon";
import PokeButton from "../components/base/PokeButton.vue";

const modalActive = ref(null);
const modalActiveImage = ref(null);
const pokemonTypes = ref(POKEMON_TYPES);
const pokemonsOriginal = ref([]);
const pokemons = ref([]);
const infiniteScrollComponent = ref(null);
const defaultImage = ref("../assets/pokedex-logo.png");
let selectedImage = ref("../assets/pokedex-logo.png");
let checkedFilter = ref(POKEMON_TYPES);
let isLoading = ref(false);

onMounted(() => {
  fetchPokemonData();
  setTimeout(() => {
    window.addEventListener("scroll", infiniteScroll);
  }, 1000);
});

onUnmounted(() => {
  window.removeEventListener("scroll", infiniteScroll);
});

const showModal = () => {
  modalActive.value = !modalActive.value;
};

const showModalImage = (image = defaultImage.value) => {
  selectedImage.value = image;
  modalActiveImage.value = !modalActiveImage.value;
};

const getImageUrl = (image = defaultImage.value) => {
  return new URL(image, import.meta.url).href;
};

const getPokemonData = (pokemonData) => {
  pokemons.value = pokemonData;
};

const resetFilterData = async () => {
  checkedFilter.value = POKEMON_TYPES;
  pokemons.value = [...pokemonsOriginal.value];
  showModal();
};

const applyFilter = () => {
  pokemons.value = [...pokemonsOriginal.value];
  pokemons.value = pokemons.value.filter((item) => {
    return item.types.some((type) => {
      return checkedFilter.value.includes(type);
    });
  });
  showModal();
};

const infiniteScroll = () => {
  let element = infiniteScrollComponent.value;
  if (element.getBoundingClientRect().bottom <= window.innerHeight + 1) {
    fetchPokemonData();
  }
};

const fetchPokemonData = () => {
  const totalData =
    pokemonsOriginal?.value?.length !== 0
      ? pokemonsOriginal?.value?.length + 16
      : 16;
  if (pokemonsOriginal?.value?.length !== totalData) {
    isLoading.value = true;
  }
  fetchPokemonDataList({
    totalData,
  })
    .then((response) => {
      const { data } = response.data;
      if (data?.length !== 0) {
        pokemonsOriginal.value = [...data.pokemons];
        pokemons.value = [...pokemonsOriginal.value];
        pokemons.value = pokemons.value.filter((item) => {
          return item.types.some((type) => {
            return checkedFilter.value.includes(type);
          });
        });
        isLoading.value = false;
        return;
      }
      isLoading.value = false;
    })
    .catch((e) => {
      console.log(e);
      isLoading.value = false;
      return;
    });
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
