import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        species: {
          dog: "Dog",
          cat: "Cat",
        },
        adoption_status: {
          available: "Available for adoption",
          adopted: "Adopted",
        },
        no_pets_available: "Currently, there are no animals available."
      },
    },
    ro: {
      translation: {
        species: {
          dog: "Câine",
          cat: "Pisică",
        },
        adoption_status: {
          available: "Disponibil pentru adopție",
          adopted: "Adoptat",
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
