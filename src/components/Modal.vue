<script>
import { useSalonStore } from '../pinia/pinia.js';
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  data() {
    return {
      isSinedUp: false,
      name: '',
      phone: '',
    };
  },
  setup() {
    const salonStore = useSalonStore();
    const salons = salonStore.salons;
    const services = salonStore.services;

    const selectedSalon = salons.find(salon => salon.id === salonStore.selectedSalon)?.name;
    const selectedService = services.find(service => service.id === salonStore.selectedService)?.name;
    const selectedDay = salonStore.selectedDay;
    const selectedTime = salonStore.time;

    return {
      selectedSalon,
      selectedService,
      selectedDay,
      selectedTime,
    };
  },
  emits: ['close'],
  methods: {
    closeModal() {
      this.$emit('close');
    },
    signUp() {
      this.isSinedUp = true;
    }
  }
});
</script>

<template>
  <div class="modal">
    <div v-if="!isSinedUp">
      <input
        type="text"
        placeholder="Name"
        v-model="name"
      >

      <input type="tel" v-model="phone">

      <button @click="signUp">Sign up</button>
    </div>

    <div v-else>
      <p>
        You are made an appointment for {{ selectedService }} at the {{ selectedSalon }} at {{ selectedDay }} {{ selectedTime }}
      </p>

      <button @click="closeModal">OK</button>
    </div>
  </div>
</template>

<style>
.modal {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 100;
  top: 40%;
  left: 30%;
  right: 30%;
  min-width: 135px;
  gap: 10px;
  background-color: white;
  border-radius: 16px;
  margin: auto;
  padding: 24px;

  &-text {
    text-align: center;
  }
}
</style>
