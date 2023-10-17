<script>
import { useSalonStore } from '../pinia/pinia.js';
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  data() {
    return {
      name: '',
      address: '',
      service: '',
      isNameError: false,
      isAddressError: false,
      isServicesError: false,
      services: [],
    };
  },
  setup() {
    const salonStore = useSalonStore();

    function addSalon() {
      if (!this.name.trim()) {
        this.isNameError = true;
      }

      if (!this.address.trim()) {
        this.isAddressError = true;
      }

      if (!this.service.trim()) {
        this.isServicesError = true;
      }

      if (!this.name.trim() || !this.address.trim() || !this.service.trim()) {
        return;
      }

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
    },
    blurName() {
      this.isNameError = !this.name.trim();
    },
    blurAddress() {
      this.isAddressError = !this.address.trim();
    },
    blurServices() {
      this.isServicesError = !this.service.trim();
    },
  }
});
</script>

<template>
  <div class="modal">
    <input
      type="text"
      :class="{'input-error': isNameError}"
      placeholder="Salon name"
      v-model="name"
      @blur="blurName"
    >
    <input
      type="text"
      :class="{'input-error': isAddressError}"
      placeholder="Address"
      v-model="address"
      @blur="blurAddress"
    >
    <textarea
      placeholder="Services"
      :class="{'textarea-error': isServicesError}"
      v-model="service"
      @blur="blurServices"
    ></textarea>

    <div>
      <small v-if="isNameError" class="text-danger">Name is require.</small>
      <small v-if="isAddressError" class="text-danger"> Address is require.</small>
      <small v-if="isServicesError" class="text-danger"> Services is require.</small>
    </div>

    <div>
      <button @click="addSalon" class="btn btn-success">Add new salon</button>
      <button @click="closeModal" class="btn btn-danger">Close</button>
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
