<script>
import { computed } from 'vue';
import { useSalonStore } from '../pinia/pinia.js';

export default {
  emits: ['select'],
  setup() {
    const salonStore = useSalonStore();

    const timeSlotsData = computed(() => {
      const key = salonStore.selectedSalon + '-' + salonStore.selectedService + '-' + salonStore.selectedDay;
      return salonStore.timeSlotsData[key];
    });

    const busyTimes = computed(() => {
      const key = salonStore.selectedSalon + '-' + salonStore.selectedService + '-' + salonStore.selectedDay;
      const arr = salonStore.busyTimes[key];
      return arr ? arr : [];
    });

    return {
      busyTimes,
      timeSlotsData,
      salonStore,
    };
  },
  methods: {
    selectTime(salonStore, timeSlot) {
      this.$emit('select', { salonStore, timeSlot });
    }
  }
}
</script>

<template>
  <div>
    <div v-if="timeSlotsData.length > 0">
      <div v-for="time of timeSlotsData" class="time-slot">
        {{ time }}
        <button
          @click="selectTime(salonStore, time)"
          :disabled="busyTimes.includes(time)"
          class="btn btn-success"
        >
          Make an appointment
        </button>
      </div>
    </div>
    <div v-else>
      <p>No available time slots.</p>
    </div>
  </div>
</template>

<style>
.time-slot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-radius: 10px;
  color: var(--dark-color);
  background-color: var(--light-color);
  margin-bottom: 10px;
  transition: all .3s;
}
.time-slot:hover {
  transform: scale(1.1);
}
</style>
