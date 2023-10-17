<script>
import { useSalonStore } from '../pinia/pinia.js';
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  data() {
    return {
      isSinedUp: false,
      name: '',
      phone: '',
      isNameError: false,
      isPhoneError: false,
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
  emits: ['close', 'signUp'],
  methods: {
    closeModal() {
      this.$emit('close');
    },
    signUp() {
      if (!this.name) {
        this.isNameError = true;
      }

      if (!this.name) {
        this.isPhoneError = true;
      }

      if (!this.name || !this.phone) {
        return;
      }

      this.isSinedUp = true;
      this.$emit('signUp');
    },
    blurName() {
      this.isNameError = !this.name;
    },
    blurPhone() {
      this.isPhoneError = !this.phone;
    }
  }
});
</script>

<template>
  <div class="modal">
    <div v-if="!isSinedUp">
      <input
        type="text"
        class="mb"
        :class="{'input-error': isNameError}"
        placeholder="Name"
        v-model="name"
        @blur="blurName"
      >

      <input
        type="text"
        :class="{'input-error': isPhoneError}"
        placeholder="Phone number"
        v-model="phone"
        @blur="blurPhone"
      >

      <div class="notification">
        <small v-if="isNameError" class="text-danger">Name is require.</small>
        <small v-if="isPhoneError" class="text-danger"> Phone is require.</small>
      </div>

      <button @click="signUp" class="btn btn-dark">
        Sign up
      </button>
      <button class="btn btn-danger" @click="closeModal">Close</button>
    </div>

    <div v-else>
      <p>
        You are made an appointment for {{ selectedService }} at the {{ selectedSalon }} at {{ selectedDay }} {{ selectedTime }}
      </p>

      <button @click="closeModal" class="btn btn-success">OK</button>
      <button class="btn btn-danger" @click="closeModal">Close</button>
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
  color: var(--dark-color);
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
.notification {
  height: 25px;
}
</style>
