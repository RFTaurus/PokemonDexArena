<template>
  <div class="container">
    <PokePageTitle :page-title="'PokemonDex Arena Card List'" />

    <PokemonControlSection
      @open-filter="showModal"
      @search-pokemon="getPokemonData"
    />

    <div
      ref="infiniteScrollComponent"
      v-if="pokemons?.length !== 0"
      class="row align-items-center justify-content-space-between text-center pb-4"
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
import PokePageTitle from "../components/base/PokePageTitle.vue";

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

.checkmark {
  position: absolute;
  top: 5px;
  left: 0;
  height: 16px;
  width: 16px;
  background-color: var(--vt-c-white);
  outline: none;
}

.checkbox-container:hover input ~ .checkmark {
  background-color: var(--vt-c-white);
}

.checkbox-container input:checked ~ .checkmark {
  background-color: var(--primary-text-orange);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

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
</style>
