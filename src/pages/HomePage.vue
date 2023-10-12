<script>
import { defineComponent, ref, computed } from 'vue';
import { useSalonStore } from '../pinia/pinia.js';
import SalonDropdown from '../components/SalonDropdown.vue';
import ServiceDropdown from '../components/ServiceDropdown.vue';

export default defineComponent({
  components: {
    SalonDropdown,
    ServiceDropdown,
  },
  setup() {
    const salonStore = useSalonStore();
    const selectedSalon = computed(() => salonStore.selectedSalon);
    const selectedService = computed(() => salonStore.selectedService);
    const salons = salonStore.salons;
    const services = salonStore.services;

    const isNextButtonEnabled = computed(() => salonStore.isNextButtonEnabled);

    const onSalonChange = (selectedSalon) => {
      salonStore.selectSalon(+selectedSalon);
    };

    const onServiceChange = (selectedService) => {
      salonStore.selectService(+selectedService);
    };

    function onNextClick() {
      this.$router.push('/book');
    };

    return {
      selectedSalon,
      selectedService,
      salons,
      services,
      isNextButtonEnabled,
      onSalonChange,
      onNextClick,
      onServiceChange,
    };
  },
});
</script>

<template>
  <div class="home">
    <div class="home-selects">
      <SalonDropdown
        :salons="salons"
        :selectedSalon="selectedSalon"
        @select="onSalonChange"
      />

      <ServiceDropdown
        :services="services"
        :selectedSalon="selectedSalon"
        :selectedService="selectedService"
        @choose="onServiceChange"
      />

      <div class="btn-container">
        <button @click="onNextClick" :disabled="!isNextButtonEnabled" class="btn btn-danger">
          Next
        </button>
      </div>
    </div>

    <div class="home-info">
      <h2>BeautyBooking - description</h2>
      BeautyBooking - your reliable guide to the world of beauty and self-care salons. 
      Discover a variety of salons in your city, explore the list of services offered, and instantly book appointments at your convenience.
      A delightful blend of convenience and beauty - BeautyBooking
    </div>
  </div>
</template>

<style>
.home {
  display: flex;
  justify-content: space-between;
}
.home-selects {
  width: 45%;
}
.home-info {
  width: 45%;
}
.btn-container {
  margin-top: 10px;
}
</style>
