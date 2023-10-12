import { defineStore } from 'pinia';
import { salonsFromServer, servicesFromServer } from '../server/server';

export const useSalonStore = defineStore('salon', {
  state: () => ({
    salons: salonsFromServer,
    services: servicesFromServer,
    selectedSalon: null,
    selectedService: null,
    selectedDay: null,
    time: '',
    timeSlotsData: {}, // Объект для хранения временных слотов
    busyTimes: {},
  }),
  getters: {
    isNextButtonEnabled(state) {
      return !!state.selectedService;
    },
    selectedSalonTimes(state) {
      return state.timeSlotsData[state.selectedSalon] || [];
    },
    selectedServiceTimes(state) {
      return state.timeSlotsData[state.selectedService] || [];
    },
    getBusyTimes(state) {
      return state.busyTimes;
    }
  },
  actions: {
    selectSalon(salon) {
      this.selectedSalon = salon;
      this.selectedService = null;
      this.selectedDay = null;
    },
    selectService(service) {
      this.selectedService = service;
    },
    selectDay(day) {
      this.selectedDay = day;
    },
    setTimeSlotsData({ salonId, serviceId, day, timeSlots }) {
      const key = salonId + '-' + serviceId + '-' + day;
      this.timeSlotsData[key] = timeSlots;
    },
    setBusyTime({ salonId, serviceId, day, timeSlot }) {
      const key = salonId + '-' + serviceId + '-' + day;

      if (!this.busyTimes[key]) {
        this.busyTimes[key] = [];
      }

      this.busyTimes[key].push(timeSlot);
    },
    resetSelection() {
      this.selectedSalon = null;
      this.selectedService = null;
      this.selectedDay = null;
    },
    setTime(time) {
      this.time = time;
    },
    addNewSalon(newSalon) {
      this.salons.push(newSalon);
    },
    addNewService(newService) {
      this.services.push(newService);
    },
    removeSalon(salonId) {
      for (let i = 0; i < this.salons.length; i++) {
        if (this.salons[i].id === salonId) {
          this.salons.splice(i, 1);
        }
      }
    },
    removeService(serviceId) {
      for (let i = 0; i < this.services.length; i++) {
        if (this.services[i].id === serviceId) {
          this.services.splice(i, 1);
        }
      }
    }
  },
});
