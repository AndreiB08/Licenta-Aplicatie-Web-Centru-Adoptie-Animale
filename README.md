# Aplicație Web - Centru de Adopție Animale

Acest proiect este realizat ca lucrare de licență și reprezintă o aplicație web completă pentru gestionarea unui centru de adopții pentru animale.

---

## Funcționalități principale

### Autentificare și Autorizare
- Login pentru angajați (roluri: `admin`, `staff`)
- Autorizare pe baza token-ului JWT
- Acces restricționat în funcție de rol

### Gestionare Animale
- Adăugare / editare / ștergere animale
- Afișare detalii complete pentru fiecare animal
- Filtrare și paginare în panoul de administrare

### Gestionare Angajați
- Vizualizare listă angajați (doar `admin`)
- Adăugare, editare și ștergere angajat
- Validare câmpuri + protecție: nu poți șterge propriul cont

### Contul meu
- Fiecare angajat își poate actualiza informațiile personale și parola
- Validare telefon, email, și formatare nume automată

---

## Tehnologii utilizate

### Front-end:
- React + Vite
- React Router DOM
- Axios
- Material UI (MUI)
- CSS personalizat

### Back-end:
- Node.js + Express
- Sequelize (ORM)
- MySQL
- JWT pentru autentificare

---

## Instrucțiuni de rulare

### 1. Clonează proiectul

```bash
git clone https://github.com/andrei-bz/licenta-adoptie-animale.git
cd licenta-adoptie-animale
```

### 2. Configurează baza de date

1. Creează o bază de date MySQL (ex: `adoptie_animale`)
2. Modifică datele de conectare în fișierul `.env`:

```env
DB_NAME=adoptie_animale
DB_USER=root
DB_PASS=parola_ta
JWT_SECRET=cheie_super_secreta
```

### 3. Instalează dependențele

#### Pentru backend:
```bash
cd back-end
npm install
npm start
```

#### Pentru frontend:
```bash
cd front-end
npm install
npm run dev
```

---

## Date de test

```txt
Admin:
email: andrei.buzagiu@gmail.com
parola: admin123

Staff:
email: vladut.alexa@gmail.com
parola: staff123
```

> Se pot schimba în baza de date sau din interfață.