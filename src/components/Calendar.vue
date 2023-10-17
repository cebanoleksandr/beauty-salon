<script>
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      selectedDate: new Date(),
    };
  },
  computed: {
    minDate() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today;
    }
  },
  emits: ['change'],
  props: {
    date: String,
  },
  methods: {
    changeDate() {
      if (this.selectedDate < new Date() + 86400000) {
        return;
      }

      this.$emit('change', this.selectedDate);
    },
  }
}
</script>

<template>
  <DatePicker
    v-model="selectedDate"
    @click="changeDate"
    :min-date="minDate"
  />
</template>
