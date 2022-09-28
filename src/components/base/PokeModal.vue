<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div v-show="modalActive" class="modal">
        <Transition name="modal-inner">
          <div v-if="modalActive" class="modal-content">
            <button class="d-contents pointer" @click="$emit('close-modal')">
              <span class="close">&times;</span>
            </button>
            <div>
              <slot />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineEmits(["close-modal"]);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="css" scoped>
.modal {
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(7, 6, 5, 0.6);
  min-height: 100vh;
  z-index: 999;
  margin: 0;
  padding: 16px;
}

.modal-content {
  width: 100%;
  max-width: 720px;
  background-color: var(--vt-c-black-soft);
  color: var(--vt-c-white);
  align-self: flex-start;
  margin-top: 16px;
  padding: 16px;
  border-radius: var(--border-radius);
  border: 4px solid var(--primary-text-orange);
}

.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.75, 0.2, 0.3, 1.07);
}

.modal-outer-enter-from,
.moda-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.75, 0.2, 0.3, 1.07) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.75, 0.2, 0.3, 1.07);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}

.close {
  position: absolute;
  top: 0;
  right: 16px;
  color: var(--vt-c-white);
  font-size: 32px;
  font-weight: bold;
  transition: 0.5s;
}

.close:hover,
.close:focus {
  color: var(--primary-text-orange);
  text-decoration: none;
  cursor: pointer;
  transition: 0.5s;
}

@media (min-width: 768px) {
  .modal-content {
    width: 100%;
    max-width: 520px;
    align-self: flex-start;
    margin-top: 16px;
  }
}

@media (min-width: 1024px) {
  .modal-content {
    width: 100%;
    max-width: 640px;
    align-self: flex-start;
    margin-top: 16px;
  }
}
</style>
