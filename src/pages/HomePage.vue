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
  <div>
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

    <button @click="onNextClick" :disabled="!isNextButtonEnabled">
      Next
    </button>
    <router-link to="/salons">Salons</router-link>
  </div>
</template>
