<script>
import { defineComponent, ref, computed } from 'vue';
import { useSalonStore } from '../pinia/pinia.js';
import AddSalonModal from '../components/AddSalonModal.vue';
import BlackOut from '../components/BlackOut.vue';

export default defineComponent({
  components: {
    AddSalonModal,
    BlackOut,
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
  setup() {
    const salonStore = useSalonStore();
    const salons = salonStore.salons;
    const services = salonStore.services;

    function removeSalon(salonId) {
      salonStore.removeSalon(salonId);
    }

    return {
      salons,
      services,
      removeSalon,
    };
  },
  methods: {
    getServicesBySalonId(salonId) {
      return this.services
        .filter(service => service.salonId === salonId)
        .map(s => s.name)
        .join(', ');
    },
    show() {
      this.isModalVisible = true;
    },
    hide() {
      this.isModalVisible = false;
    },
  }
})
</script>

<template>
  <h1>Salons</h1>

  <table v-if="!!salons.length">
    <thead>
      <tr>
        <th>№</th>
        <th>Name</th>
        <th>Services</th>
        <th>Address</th>
        <th>Delete</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="salon, index of salons">
        <td>{{ index + 1 }}</td>
        <td>{{ salon.name }}</td>
        <td>{{ getServicesBySalonId(salon.id) }}</td>
        <td>{{ salon.address }}</td>
        <td>
          <img
            src="https://cdn-icons-png.flaticon.com/512/542/542724.png"
            class="trash"
            @click="removeSalon(salon.id)"
            alt="remove salon"
          />
        </td>
      </tr>
    </tbody>
  </table>

  <button @click="show">Add salon</button>
  <router-link to="/">Home</router-link>

  <AddSalonModal v-if="isModalVisible" @close="hide" />
  <BlackOut v-if="isModalVisible" />

  <p v-if="!salons.length">
    There are not salons yet!!!
  </p>
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
