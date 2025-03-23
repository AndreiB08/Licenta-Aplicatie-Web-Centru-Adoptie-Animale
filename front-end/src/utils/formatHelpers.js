export const capitalizeWords = (str = "") =>
    str
        .trim()
        .toLowerCase()
        .split(" ")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

export const capitalizeFirstWordOnly = (str = "") => {
    const trimmed = str.trimStart();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

export const formatNotes = (str = "") => {
    const trimmed = str.trimStart();
    const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    return capitalized.endsWith(".") ? capitalized : capitalized + ".";
};

export const formatDate = (dateStr = "") => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
};

export const formatAnimalData = (data = {}) => ({
    ...data,
    name: capitalizeWords(data.name),
    species: capitalizeWords(data.species),
    breed: capitalizeWords(data.breed),
    color: capitalizeFirstWordOnly(data.color),
    notes: formatNotes(data.notes),
    arrival_date: formatDate(data.arrival_date),
    microchip_number:
        data.microchip_number?.trim() === "" ? null : data.microchip_number,
});

export const validateAnimalData = (data = {}) => {
    const errors = {};
    const isEmpty = (value) => !value || value.trim() === "";

    if (isEmpty(data.name)) errors.name = "Numele este obligatoriu.";
    if (isEmpty(data.species)) errors.species = "Specia este obligatorie.";
    if (isEmpty(data.breed)) errors.breed = "Rasa este obligatorie.";
    if (!data.age) errors.age = "Vârsta este obligatorie.";
    if (isEmpty(data.gender)) errors.gender = "Genul este obligatoriu.";
    if (isEmpty(data.size)) errors.size = "Dimensiunea este obligatorie.";
    if (isEmpty(data.color)) errors.color = "Culoarea este obligatorie.";
    if (isEmpty(data.health_status)) errors.health_status = "Starea medicală este obligatorie.";
    if (isEmpty(data.adoption_status)) errors.adoption_status = "Statusul de adopție este obligatoriu.";
    if (isEmpty(data.arrival_date)) errors.arrival_date = "Data sosirii este obligatorie.";
    if (isEmpty(data.image)) errors.image = "URL-ul imaginii este obligatoriu.";

    if (
        data.microchip_number &&
        !/^\d{15}$/.test(data.microchip_number.trim())
    ) {
        errors.microchip_number = "Numărul de microcip trebuie să aibă exact 15 cifre.";
    }

    return errors;
};
