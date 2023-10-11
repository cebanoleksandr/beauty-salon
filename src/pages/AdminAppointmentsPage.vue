<script>
import { defineComponent, ref, computed } from 'vue';
import { useSalonStore } from '../pinia/pinia.js';

export default defineComponent({
  setup() {
    const salonStore = useSalonStore();
    const salons = salonStore.salons;
    const services = salonStore.services;

    const busyTimes = salonStore.getBusyTimes;

    const appointments = computed(() => {
      const events = [];

      for (const key in salonStore.busyTimes) {
        const [salonId, serviceId, ...data] = key.split('-');
        const salonName = salons.find(s => s.id === +salonId)?.name;
        const serviceName = services.find(s => s.id === +serviceId)?.name;

        for (const time of busyTimes[key]) {
          events.push({
            time,
            serviceName,
            salonName,
            data,
          });
        }
      }

      return events;
    });

    return {
      appointments,
      busyTimes,
    };
  }
})
</script>

<template>
  <h1>Appointments</h1>

  <table>
    <thead>
      <tr>
        <th>№</th>
        <th>Service</th>
        <th>Salon</th>
        <th>Data</th>
        <th>Time</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="appointment, index of appointments">
        <td>{{ index + 1 }}</td>
        <td>{{ appointment.serviceName }}</td>
        <td>{{ appointment.salonName }}</td>
        <td>{{ appointment.data.join('-') }}</td>
        <td>{{ appointment.time }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  padding: 1rem;
  text-align: left;
}

table th {
  background: #f4f4f4;
}
</style>
