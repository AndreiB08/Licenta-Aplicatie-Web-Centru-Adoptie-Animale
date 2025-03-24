import { NotificationRequest } from "../models/notificationRequest.js";
import { Animal } from "../models/animals.js"; // <-- ca să găsim animalul după ID
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const addNotificationRequest = async (req, res) => {
    try {
        const { email, animalId } = req.body;

        if (!email || !animalId) {
            return res.status(400).json({ message: "Missing email or animalId." });
        }

        const newNotify = await NotificationRequest.create({ email, animalId });
        return res.status(201).json({
            message: "Notification request saved successfully.",
            notify: newNotify,
        });
    } catch (err) {
        console.error("Error saving notification request:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

const notifyAvailability = async (req, res) => {
    try {
        const { animalId } = req.body;

        // 1. Luăm toate notificările pentru animalul respectiv
        const notifyList = await NotificationRequest.findAll({ where: { animalId } });

        if (!notifyList.length) {
            return res.status(200).json({ message: "Nimeni nu a cerut notificări pentru acest animal." });
        }

        // 2. Găsim numele animalului (dacă vrei să-l afișezi în subject / email)
        const animal = await Animal.findByPk(animalId);
        const animalName = animal ? animal.name : "Acest animal";

        // 3. Configurăm transporter-ul nodemailer cu Gmail
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            }
        });

        // 4. Trimitem mail cu subject personalizat
        for (const notify of notifyList) {
            const mailOptions = {
                from: process.env.GMAIL_USER, // sau "centrul_de_adoptie_animale@gmail.com"
                to: notify.email,
                subject: `${animalName} este din nou disponibil!`,
                text: `Salut! Animalul ${animalName} este din nou disponibil! Vizitează: http://localhost:5173/pets/${animalId}`,
                html: `
                  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>Salut!</h2>
                    <p>
                      Ne bucurăm să îți dăm vestea că <strong>${animalName}</strong> este 
                      din nou disponibil pentru adopție!
                    </p>
                    <p>
                      Poți vedea mai multe detalii accesând următorul link:
                      <br />
                      <a 
                        href="http://localhost:5173/pets/${animalId}"
                        style="color: #ffffff; background-color: #008000; padding: 8px 12px; 
                               text-decoration: none; border-radius: 4px; display: inline-block; 
                               margin-top: 8px;"
                      >
                        Vezi detalii
                      </a>
                    </p>
                    <hr />
                    <p style="font-size: 14px; color: #555;">
                      Cu drag,<br />
                      Echipa Centrului de Adopție Animale
                    </p>
                  </div>
                `,
            };

            await transporter.sendMail(mailOptions);
        }

        // 5. Ștergem notificările, să nu trimitem de mai multe ori
        await NotificationRequest.destroy({ where: { animalId } });

        return res.status(200).json({
            message: `Am notificat ${notifyList.length} persoane despre ${animalName} și am șters cererile de notificare.`
        });
    } catch (error) {
        console.error("Eroare la notifyAvailability:", error);
        return res.status(500).json({ message: "Eroare server", error: error.message });
    }
};

export {
    addNotificationRequest,
    notifyAvailability
};
