<template>
  <div class="team-section">
    <div class="team-header mb-4">
      <h3 class="text-center">
        My Team <span class="team-count">({{ teamLength }}/6)</span>
      </h3>
      <p v-if="teamLength === 0" class="text-center text-muted">
        Your team is empty. Add Pokemon from the Card List!
      </p>
    </div>

    <div class="team-grid">
      <div
        v-for="(pokemon, index) in team"
        :key="pokemon.id"
        :class="`team-slot pointer ${
          isSelectedSlot(index) ? 'selected-slot' : ''
        }`"
        @click="selectSlot(index)"
      >
        <div class="slot-number">{{ index + 1 }}</div>
        <div class="team-pokemon-card">
          <div class="team-remove" @click.stop="removeFromTeam(index)">
            <i class="ri-close-line"></i>
          </div>
          <div class="team-pokemon-image">
            <img :src="pokemon.image" :alt="pokemon.name" />
          </div>
          <div class="team-pokemon-info">
            <p class="text-pokemon-number">No. {{ pokemon.number }}</p>
            <p class="text-pokemon-name">{{ pokemon.name }}</p>
            <PokeChip :chip-types="pokemon.types" />
          </div>
          <div class="team-pokemon-actions mt-2">
            <router-link :to="`/pokemon-detail/${pokemon.name}`">
              <PokeButton :btn-text="'Detail'" :is-secondary="true" />
            </router-link>
          </div>
        </div>
      </div>

      <div
        v-for="n in emptySlots"
        :key="`empty-${n}`"
        :class="`team-slot empty-slot pointer ${
          isSelectedSlot(teamLength + n - 1) ? 'selected-slot' : ''
        }`"
        @click="selectSlot(teamLength + n - 1)"
      >
        <div class="slot-number">{{ teamLength + n }}</div>
        <div class="empty-slot-content">
          <i class="ri-add-line"></i>
          <p>Empty</p>
        </div>
      </div>
    </div>

    <div v-if="teamLength > 0" class="team-actions mt-4 text-center">
      <PokeButton
        :btn-text="'Clear Team'"
        :is-secondary="true"
        @btn-action="clearTeam"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import PokeButton from "./base/PokeButton.vue";
import PokeChip from "./base/PokeChip.vue";

const props = defineProps({
  team: {
    type: Array,
    default: () => [],
  },
  selectedSlotIndex: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["select-slot", "remove-team", "clear-team"]);

const teamLength = computed(() => props.team?.length || 0);
const emptySlots = computed(() => Math.max(0, 6 - teamLength.value));

const isSelectedSlot = (index) => {
  return props.selectedSlotIndex === index;
};

const selectSlot = (index) => {
  emit("select-slot", index);
};

const removeFromTeam = (index) => {
  emit("remove-team", index);
};

const clearTeam = () => {
  emit("clear-team");
};
</script>

<style lang="css" scoped>
.team-section {
  padding: var(--padding-gap);
}

.team-header h3 {
  color: var(--vt-c-white);
}

.team-count {
  color: var(--primary-text-orange);
  font-size: 0.8em;
}

.text-muted {
  color: var(--vt-c-grey);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--margin-gap);
}

.team-slot {
  position: relative;
  background-color: var(--vt-c-black-soft);
  border: 2px solid var(--primary-text-orange);
  border-radius: var(--border-radius);
  padding: var(--padding-gap);
}

.selected-slot {
  border-color: #78c850;
  box-shadow: 0 0 0 2px rgba(120, 200, 80, 0.3);
}

.slot-number {
  position: absolute;
  top: -10px;
  left: -10px;
  background-color: var(--primary-text-orange);
  color: var(--vt-c-white);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9em;
}

.team-pokemon-card {
  position: relative;
}

.team-remove {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #dc3545;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
}

.team-remove:hover {
  background-color: #c82333;
}

.team-pokemon-image {
  text-align: center;
  margin-bottom: var(--margin-gap);
  width: 120px;
  height: 120px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.team-pokemon-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: var(--border-radius-quarter);
}

.team-pokemon-info {
  text-align: center;
}

.team-pokemon-info .text-pokemon-number {
  color: var(--vt-c-grey);
  font-size: 0.9em;
  margin: 0;
}

.team-pokemon-info .text-pokemon-name {
  color: var(--vt-c-white);
  font-size: 1.1em;
  font-weight: bold;
  margin: 4px 0;
}

.team-pokemon-actions {
  text-align: center;
}

.empty-slot {
  border-style: dashed;
  background-color: transparent;
}

.empty-slot-content {
  text-align: center;
  padding: 32px 0;
  color: var(--vt-c-grey);
}

.empty-slot-content i {
  font-size: 2em;
  margin-bottom: 8px;
}

.empty-slot-content p {
  margin: 0;
  font-size: 0.9em;
}
</style>
