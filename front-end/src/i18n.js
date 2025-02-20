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
        no_pets_available: "Currently, there are no animals available.",
        pet_adoption: "Pet Adoption",
        home: "Home",
        pets: "Pets",
        location: "Location",
        about_us: "About us",
        contact: "Contact",
        rights_reserved: "All rights reserved.",
        privacy_policy: "Privacy Policy",
        terms: "Terms and Conditions"
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
        no_pets_available: "Momentan nu există animale disponibile.",
        pet_adoption: "Adopție animale",
        home: "Acasă",
        pets: "Animale",
        location: "Locație",
        about_us: "Despre noi",
        contact: "Contact",
        rights_reserved: "Toate drepturile rezervate.",
        privacy_policy: "Politica de confidențialitate",
        terms: "Termeni și condiții"
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