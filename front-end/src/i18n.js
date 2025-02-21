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
        terms: "Terms and Conditions",
        not_found: "Page not found",
        does_not_exist: "We're sorry, but the page you're looking for doesn't exist.",
        back_home : "Go back to Home",
        more: "More"
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
        terms: "Termeni și condiții",
        not_found: "Pagina nu a fost găsită",
        does_not_exist: "Ne pare rău, dar pagina pe care o cauți nu există.",
        back_home : "Mergi înapoi la pagina principală.",
        more: "Află mai multe"
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