<script>
import { useSalonStore } from '../pinia/pinia.js';
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  data() {
    return {
      name: '',
      address: '',
      service: '',
      services: [],
    };
  },
  setup() {
    const salonStore = useSalonStore();

    function addSalon() {
      const newSalonId = +(new Date());
      const newSalon = {
        id: newSalonId,
        name: this.name,
        address: this.address,
      }

      salonStore.addNewSalon(newSalon);

      const pattern = /\w+/ig;

      this.services = this.service.match(pattern);

      for (const s of this.services) {
        const newService = {
          id: +(new Date()) + 1,
          salonId: newSalonId,
          name: s,
          available: true,
        };

        salonStore.addNewService(newService);
      }

      this.closeModal();
    }

    return {
      addSalon,
    };
  },
  emits: ['close'],
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
});
</script>

<template>
  <div class="modal">
    <input
      type="text"
      placeholder="Salon name"
      v-model="name"
    >
    <input
      type="text"
      placeholder="Address"
      v-model="address"
    >
    <textarea
      placeholder="Services"
      v-model="service"
    ></textarea>

    <button @click="addSalon" class="btn btn-success">Add new salon</button>
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