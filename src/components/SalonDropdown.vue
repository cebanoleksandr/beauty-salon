<script>
export default {
  data() {
    return {
      selectedSalon: Number,
    };
  },
  emits: ['select'],
  props: {
    salons: Array,
  },
  methods: {
    selectSalon(event) {
      this.$emit('select', event.target.value);
    },
  }
};
</script>

<template>
  <div>
    <label>Select Salon:</label>
    <select v-model="selectedSalon" @input="selectSalon">
      <option v-for="salon in salons" :value="salon.id">{{ salon.name }}</option>
    </select>
  </div>
</template>
