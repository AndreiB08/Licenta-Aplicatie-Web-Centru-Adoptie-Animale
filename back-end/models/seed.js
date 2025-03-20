import { Employee } from "./employees.js";
import { Animal } from "./animals.js";

export const runSeed = async () => {
    try {
        const employeesCount = await Employee.count();
        if (employeesCount === 0) {
            await Employee.create({
                first_name: "Andrei",
                last_name: "Buzagiu",
                email: "andrei.buzagiu@gmail.com",
                password: "admin123",
                phone_number: "0756056577",
                role: "admin"
            });
            console.log("Admin user created successfully.");
        }

        const animalsCount = await Animal.count();
        if (animalsCount === 0) {
            await Animal.bulkCreate([
                {
                    name: "Buddy",
                    species: "dog",
                    breed: "Golden Retriever",
                    age: 3,
                    gender: "male",
                    size: "large",
                    color: "golden",
                    health_status: "healthy",
                    vaccinated: true,
                    sterilized: true,
                    adoption_status: "available",
                    arrival_date: "2024-12-20",
                    notes: "Very friendly and great with kids.",
                    image: "https://bucuriacasei.ro/wp-content/uploads/2024/02/rasa-golden-retriever-scaled.webp",
                    microchip_number: null
                },
                {
                    name: "Whiskers",
                    species: "cat",
                    breed: "Siamese",
                    age: 2,
                    gender: "female",
                    size: "medium",
                    color: "cream with dark brown points",
                    health_status: "healthy",
                    vaccinated: true,
                    sterilized: true,
                    adoption_status: "available",
                    arrival_date: "2024-11-15",
                    notes: "Loves to cuddle and has a playful personality.",
                    image: "https://cdn-aahmh.nitrocdn.com/mwIJloVUffDtKiCgRcivopdgojcJrVwT/assets/images/optimized/rev-31cad3f/www.cozycatfurniture.com/image/siamese-cat-cover.jpg",
                    microchip_number: null
                },
                {
                    name: "Thumper",
                    species: "rabbit",
                    breed: "Holland Lop",
                    age: 1,
                    gender: "male",
                    size: "small",
                    color: "white with brown spots",
                    health_status: "healthy",
                    vaccinated: true,
                    sterilized: false,
                    adoption_status: "reserved",
                    arrival_date: "2025-02-15",
                    notes: "Energetic and loves to hop around. Very friendly with children.",
                    image: "https://everbreed.com/wp-content/uploads/2024/02/Holland_lop_rabbit-scaled.jpg",
                    microchip_number: null
                },
                {
                    name: "Rio",
                    species: "parrot",
                    breed: "Macaw",
                    age: 4,
                    gender: "female",
                    size: "medium",
                    color: "blue and yellow",
                    health_status: "healthy",
                    vaccinated: true,
                    sterilized: false,
                    adoption_status: "adopted",
                    arrival_date: "2025-02-10",
                    notes: "Loves to talk and mimic sounds. Very social and intelligent.",
                    image: "https://images.takeshape.io/86ce9525-f5f2-4e97-81ba-54e8ce933da7/dev/bebc6dc3-7ca9-4157-a176-a7d244018f0f/Blue%20Hyacinth%20macaw%20parrot%20in%20its%20natural%20environment%20dreamstime_xxl_5040987.jpeg?auto=compress%2Cformat&w=1440",
                    microchip_number: null
                }
            ]);
            console.log("Animals added successfully.");
        }

    } catch (err) {
        console.error("Error in seeding data:", err);
    }
};
