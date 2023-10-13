<script>
import { defineComponent, ref, computed } from 'vue';
import { useSalonStore } from '../pinia/pinia.js';

export default defineComponent({
  setup() {
    const salonStore = useSalonStore();
    const salons = salonStore.salons;
    const services = salonStore.services;

    const busyTimes = salonStore.getBusyTimes;

    const appointments = ref([]);

    const updateAppointments = () => {
      let events = [];

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

      appointments.value = events;
    };

    const reverseAppointments = () => {
      appointments.value = appointments.value.reverse();
      console.log(appointments.value);
    };

    const sortAppointments = (type) => {
      switch (type) {
        case 'service':
          appointments.value = appointments.value.sort((a, b) => a.serviceName.localeCompare(b.serviceName));
          break;

        case 'salon':
          appointments.value = appointments.value.sort((a, b) => a.salonName.localeCompare(b.salonName));
          break;

        case 'date':
          appointments.value = appointments.value.sort((a, b) => {
            const first = +(new Date([a.date[1], a.date[0], a.date[2]].join('-')));
            const second = +(new Date([b.date[1], b.date[0], b.date[2]].join('-')));

            return first - second;
          });
          break;
      
        default:
          appointments.value = appointments.value;
          break;
      }
    }

    updateAppointments();

    return {
      appointments,
      busyTimes,
      reverseAppointments,
      sortAppointments,
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
  <button @click="reverseAppointments">Reverse</button>
  <button @click="sortAppointments('salon')">Salon</button>
  <button @click="sortAppointments('service')">Service</button>
  <button @click="sortAppointments('date')">Date</button>
</template>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--light-color);
  color: var(--dark-color);
  border-radius: 10px;
}

table th,
table td {
  padding: 1rem;
  text-align: left;
  border-radius: 10px;
}

table th {
  background: #f4f4f4;
}
</style>
