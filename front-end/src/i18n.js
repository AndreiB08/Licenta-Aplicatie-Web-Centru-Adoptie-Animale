import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        species: {
          dog: "Dog",
          cat: "Cat",
          rabbit: "Rabbit",
          parrot: "Parrot"
        },
        adoption_status: {
          available: "Available for adoption",
          adopted: "Adopted",
          reserved: "Reserved"
        },
        no_pets_available: "Currently, there are no animals available."
      },
    },
    ro: {
      translation: {
        species: {
          dog: "Câine",
          cat: "Pisică",
          rabbit: "Iepure",
          parrot: "Papagal"
        },
        adoption_status: {
          available: "Disponibil pentru adopție",
          adopted: "Adoptat",
          reserved: "Rezervat"
        },
        no_pets_available: "Momentan nu există animale disponibile."
      },
    },
  },
  lng: 'ro', 
  fallbackLng: 'en', 
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
