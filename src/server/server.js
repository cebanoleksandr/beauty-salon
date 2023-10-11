export const salonsFromServer = [
  {
    id: 1,
    name: "Салон красоты 'Блеск'",
    address: "ул. Цветочная, 123"
  },
  {
    id: 2,
    name: "Салон 'Подиум'",
    address: "пр. Главный, 456"
  },
  {
    id: 3,
    name: "Салон 'Ваш Стиль'",
    address: "ул. Модная, 789"
  }
];

export const servicesFromServer = [
  {
    id: 1,
    salonId: 1,
    name: "Стрижка",
    available: true
  },
  {
    id: 2,
    salonId: 1,
    name: "Маникюр",
    available: false
  },
  {
    id: 3,
    salonId: 2,
    name: "Педикюр",
    available: true
  },
  {
    id: 4,
    salonId: 2,
    name: "Укладка волос",
    available: true
  },
  {
    id: 5,
    salonId: 3,
    name: "Массаж",
    available: false
  }
];
