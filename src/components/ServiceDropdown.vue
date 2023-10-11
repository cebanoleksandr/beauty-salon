<script>
export default {
  data() {
    return {
      salon: Number,
    };
  },
  emits: ['choose'],
  props: {
    services: Array, // Список услуг
    selectedSalon: Number, // Выбранный салон
    selectedService: Number,
  },
  computed: {
    filteredServices() {
      return this.services.filter((service) => service.salonId === this.selectedSalon);
    },
  },
  methods: {
    selectService(event) {
      this.$emit('choose', event.target.value);
    },
  }
};
</script>

<template>
  <div>
    <label>Select Service:</label>
    <select v-model="salon" @input="selectService">
      <option v-for="service in filteredServices" :value="service.id">
        {{ service.name }}
      </option>
    </select>
  </div>
</template>
