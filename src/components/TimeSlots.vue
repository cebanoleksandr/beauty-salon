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
      salonStore.setTime(timeSlot);

      salonStore.setBusyTime({ 
        salonId: salonStore.selectedSalon,
        serviceId: salonStore.selectedService,
        day: salonStore.selectedDay,
        timeSlot,
      });

      this.$emit('select');
    }
  }
}
</script>

<template>
  <div>
    <div v-if="timeSlotsData.length > 0">
      <div v-for="time of timeSlotsData">
        {{ time }}
        <button @click="selectTime(salonStore, time)" :disabled="busyTimes.includes(time)">
          Make an appointment
        </button>
      </div>
    </div>
    <div v-else>
      <p>No available time slots.</p>
    </div>
  </div>
  <router-link to="/appointments">Appointments</router-link>
</template>

<style></style>
