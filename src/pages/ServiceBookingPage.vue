<script>
import { defineComponent } from 'vue';
import { useSalonStore } from '../pinia/pinia.js';
import Calendar from '../components/Calendar.vue';
import TimeSlots from '../components/TimeSlots.vue';
import Modal from '../components/Modal.vue';
import BlackOut from '../components/BlackOut.vue';

export default defineComponent({
  components: {
    Calendar,
    TimeSlots,
    Modal,
    BlackOut,
  },
  data() {
    return {
      isModalVisible: false,
      time: null,
      salonStore: null,
      busyTime: null,
    };
  },
  methods: {
    show({ salonStore, timeSlot }) {
      this.time = timeSlot;
      this.salonStore = salonStore;
      this.busyTime = { 
        salonId: salonStore.selectedSalon,
        serviceId: salonStore.selectedService,
        day: salonStore.selectedDay,
        timeSlot,
      };

      this.isModalVisible = true;
    },
    hide() {
      this.isModalVisible = false;
    },
    signUp() {
      this.salonStore.setTime(this.time);
      this.salonStore.setBusyTime(this.busyTime);
    },
  },
  setup() {
    const salonStore = useSalonStore();

    function changeDate(newDate) {
      const day = `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`;
      let timeSlots = [
        '10:00 - 10:30',
        '10:30 - 11:00',
        '11:00 - 11:30',
        '11:30 - 12:00',
        '12:00 - 12:30',
        '12:30 - 13:00',
        '13:00 - 13:30',
        '13:30 - 14:00',
        '14:00 - 14:30',
        '14:30 - 15:00',
        '15:00 - 15:30',
        '15:30 - 16:00',
        '16:00 - 16:30',
        '16:30 - 17:00',
        '17:00 - 17:30',
        '17:30 - 18:00',
      ];
      const key = salonStore.selectedSalon + '-' + salonStore.selectedService + '-' + day;

      if (key in salonStore.timeSlotsData) {
        timeSlots = salonStore.timeSlotsData[key];
      }

      salonStore.setTimeSlotsData({
        salonId: salonStore.selectedSalon,
        serviceId: salonStore.selectedService,
        day,
        timeSlots,
      });
      
      salonStore.selectDay(day);
    }

    return {
      salonStore,
      changeDate,
    };
  },
});
</script>

<template>
  <div class="book-container">
    <div class="book-calendar">
      <Calendar @change="changeDate" />
    </div>

    <div class="book-timeslots">
      <TimeSlots v-if="salonStore.selectedDay" @select="show" />
    </div>
  </div>

  <Modal
    v-if="isModalVisible"
    @close="hide"
    @signUp="signUp"
  />
  
  <BlackOut v-if="isModalVisible" />
</template>

<style>
.book-container {
  display: flex;
  justify-content: space-between;
}
.book-calendar {
  width: 35%;
}
.book-timeslots {
  width: 60%;
}
</style>
