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
      this.selectedSalon = event.target.value;
      this.$emit('select', event.target.value);
    },
  }
};
</script>

<template>
  <div>
    <label>Select Salon:</label>
    <select @change="selectSalon">
      <option :value="null">Select a salon</option>
      <option v-for="salon in salons" :value="salon.id">{{ salon.name }}</option>
    </select>
  </div>
</template>
