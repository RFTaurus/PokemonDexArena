<template>
  <div class="container">
    <PokePageTitle :page-title="'PokemonDex Arena Card List'" />

    <PokemonControlSection
      @open-filter="showModal"
      @search-pokemon="getPokemonData"
    />

    <div
      ref="infiniteScrollComponent"
      v-if="!isLoading && pokemons?.length !== 0"
      class="row align-items-center justify-content-space-between text-center pb-4"
    >
      <div
        v-for="(pokemon, index) in pokemons"
        :key="index"
        class="col-12 col-md-6 col-lg-3 my-4"
      >
        <PokemonCard
          :id="pokemon.id"
          :image="pokemon.image"
          :number="pokemon.number"
          :name="pokemon.name"
          :max-c-p="pokemon.maxCP"
          :types="pokemon.types"
          :is-favourite="pokemon.isFavourite"
          :is-team="pokemon.isTeam"
          @show-pokemon-image="showModalImage(pokemon.image)"
          @add-favourite="addFavourite"
          @add-team="addTeam"
        />
      </div>
    </div>
    <div v-else>
      <div v-if="isLoading" class="text-center">
        <PokeLoading />
      </div>
      <div v-else>
        <h3 class="text-center">There is no Pokemon Card List</h3>
      </div>
    </div>

    <PokeSticky :bottom="0" :right="0">
      <div class="floating-container">
        <div class="floating-button-wrapper">
          <div class="pointer floating-button" @click="showModalFavourites">
            <i class="fas fa-heart"></i>
          </div>
        </div>
      </div>
    </PokeSticky>

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

    <PokeModal
      :modal-active="modalActiveFavourites"
      @close-modal="showModalFavourites"
    >
      <h3 class="text-center">Favourites</h3>
      <div class="parent-modal-scroller">
        <div class="modal-scroller">
          <div v-if="pokemonFavourites && pokemonFavourites.length !== 0">
            <div
              v-for="pokemon in pokemonFavourites"
              :key="pokemon.id"
              class="col-12 my-4 card-lite"
            >
              <PokemonCardLite
                v-if="pokemon.isFavourite"
                :id="pokemon.id"
                :image="pokemon.image"
                :number="pokemon.number"
                :name="pokemon.name"
                :max-c-p="pokemon.maxCP"
                :types="pokemon.types"
                :is-favourite="pokemon.isFavourite"
                @add-favourite="addFavourite"
              />
            </div>
          </div>
          <div v-else>
            <div class="text-center my-8">
              <div class="pokedex-logo-wrapper">
                <img
                  alt="PokemonDex Arena logo"
                  class="pokedex-logo"
                  src="@/assets/pokedex-logo.png"
                />
              </div>
              <p>There's no Favourites Pokemon yet</p>
            </div>
          </div>
        </div>
      </div>
    </PokeModal>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { fetchPokemonDataList } from "../manager/pokemon";
import { setDataPath, getDataPath } from "../store/pseudolocalDatabase";
import { PSEUDOLOCAL_DATABASE_PATH, POKEMON_TYPES } from "../utils/constant";
import { sortArr } from "../utils/common";
import PokemonCard from "../components/PokemonCard.vue";
import PokeModal from "../components/base/PokeModal.vue";
import PokemonControlSection from "../components/PokemonControlSection.vue";
import PokeButton from "../components/base/PokeButton.vue";
import PokePageTitle from "../components/base/PokePageTitle.vue";
import PokeSticky from "../components/base/PokeSticky.vue";
import PokemonCardLite from "../components/PokemonCardLite.vue";
import PokeLoading from "../components/base/PokeLoading.vue";

const modalActive = ref(null);
const modalActiveImage = ref(null);
const modalActiveFavourites = ref(null);
const pokemonTypes = ref(POKEMON_TYPES);
const pokemonsOriginal = ref([]);
const pokemons = ref([]);
const pokemonFavouritesPath = ref(PSEUDOLOCAL_DATABASE_PATH.pokemonFavourites);
const pokemonTeamsPath = ref(PSEUDOLOCAL_DATABASE_PATH.pokemonTeams);
const pokemonFavourites = ref(getDataPath(pokemonFavouritesPath.value));
const pokemonTeams = ref(getDataPath(pokemonTeamsPath.value));
const infiniteScrollComponent = ref(null);
const defaultImage = ref("../assets/pokedex-logo.png");
let selectedImage = ref("../assets/pokedex-logo.png");
let checkedFilter = ref(POKEMON_TYPES);
let isLoading = ref(false);
let isSearch = ref(false);

onMounted(() => {
  fetchPokemonData();
  pokemonFavourites.value.sort(
    (firstItems, nextItem) =>
      Number(firstItems.number) - Number(nextItem.number)
  );
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

const showModalFavourites = () => {
  isLoading.value = false;
  modalActiveFavourites.value = !modalActiveFavourites.value;
};

const getImageUrl = (image = defaultImage.value) => {
  return new URL(image, import.meta.url).href;
};

const getPokemonData = (pokemonData, searchStatus = true) => {
  isSearch.value = searchStatus;
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

const addFavourite = (pokemonData, isLite = false) => {
  const exist = pokemonFavourites.value.some((item) => {
    return item.id === pokemonData.id;
  });
  if (exist) {
    pokemonFavourites.value = pokemonFavourites.value.filter((item) => {
      return item.id !== pokemonData.id;
    });
  } else {
    pokemonFavourites.value.push(pokemonData);
  }
  pokemonFavourites.value = sortArr(pokemonFavourites.value);
  const index = pokemons.value.findIndex((item) => {
    return item.id === pokemonData.id;
  });
  pokemons.value[index].isFavourite = pokemonData.isFavourite;
  setDataPath(pokemonFavouritesPath.value, pokemonFavourites.value);
  if (isLite) {
    isLoading.value = true;
    fetchPokemonData();
  }
};

const addTeam = (pokemonData) => {
  if (pokemonData.isTeam && pokemonTeams?.value?.length >= 6) {
    pokemonTeams.value = pokemonTeams.value.filter((item) => {
      return item.id !== pokemonData.id;
    });
    setDataPath(pokemonTeamsPath.value, pokemonTeams.value);
  } else if (!pokemonData.isTeam && pokemonTeams?.value?.length < 6) {
    pokemonTeams.value.push({ ...pokemonData, isTeam: !pokemonData.isTeam });
    setDataPath(pokemonTeamsPath.value, pokemonTeams.value);
  } else {
    alert("Team Full. (Max. 6 Pokemon)");
  }
};

const infiniteScroll = () => {
  let element = infiniteScrollComponent.value;
  if (
    !isSearch.value &&
    element &&
    element.getBoundingClientRect().bottom <= window.innerHeight + 1
  ) {
    fetchPokemonData();
  }
};

const fetchPokemonData = () => {
  const totalData =
    pokemonsOriginal?.value?.length !== 0
      ? pokemonsOriginal?.value?.length + 16
      : 16;
  fetchPokemonDataList({
    totalData,
  })
    .then((response) => {
      const { data } = response.data;
      if (data?.length !== 0) {
        pokemonsOriginal.value = [...data.pokemons];
        pokemonsOriginal.value = pokemonsOriginal.value.map((item) => ({
          ...item,
          isFavourite: isFavouritePokemon(item.id),
          isTeam: false,
        }));
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

const isFavouritePokemon = (id) => {
  const isHit = pokemonFavourites.value.some((item) => {
    return item.id === id;
  });
  return isHit;
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

.floating-container {
  padding: 0px 16px;
}
.floating-button-wrapper {
  background-color: var(--vt-c-white);
  padding: 0px 6px;
  border-radius: 50%;
}

.floating-button-wrapper .floating-button {
  font-size: 1.2em;
  color: red;
}

.parent-modal-scroller {
  height: auto;
  max-height: 80vh;
  overflow: hidden;
}

.parent-modal-scroller {
  overflow-y: auto;
}

.pokedex-logo-wrapper {
  display: inline-block;
  width: 100%;
  max-width: 160px;
}

.pokedex-logo {
  width: 100%;
  height: auto;
}

.card-lite {
  border-bottom: 2px solid var(--primary-text-orange);
  padding: var(--margin-gap) auto;
}

.card-lite:last-of-type {
  border-bottom: none;
}

@media (min-width: 768px) {
  .floating-button-wrapper {
    background-color: var(--vt-c-white);
    padding: 0px 12px;
    border-radius: 50%;
  }

  .floating-button-wrapper .floating-button {
    font-size: 2em;
    color: red;
  }
}
</style>
