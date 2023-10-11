<script>
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      selectedDate: this.date,
    };
  },
  emits: ['change'],
  props: {
    date: String,
  },
  methods: {
    changeDate() {
      this.$emit('change', this.selectedDate);
    },
  }
}
</script>

<template>
  <DatePicker v-model="selectedDate" @click="changeDate" />
</template>
