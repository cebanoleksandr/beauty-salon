<script>
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  setup() {
    const salonStore = useSalonStore();
    const salons = salonStore.salons;
    const services = salonStore.services;

    function removeService(serviceId) {
      salonStore.removeService(serviceId);
    }

    return {
      salons,
      services,
      removeService,
    };
  },
  methods: {
    getSalonsById(salonId) {
      return this.salons
        .filter(salon => salon.id === salonId)
        .map(s => s.name)
        .join(', ');
    },
  }
})
</script>

<template>
  <h1>Services</h1>

  <table>
    <thead>
      <tr>
        <th>№</th>
        <th>Service</th>
        <th>Salons</th>
        <th>Delete</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="service, index of services">
        <td>{{ index + 1 }}</td>
        <td>{{ service.name }}</td>
        <td>{{ getSalonsById(service.salonId) }}</td>
        <td>
          <img
            src="https://cdn-icons-png.flaticon.com/512/542/542724.png"
            class="trash"
            @click="removeService(service.id)"
            alt="remove salon"
          />
        </td>
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

.trash {
  width: 16px;
  height: 16px;
  cursor: pointer;
}
</style>
