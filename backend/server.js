import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.post("/chat", async (req, res) => {

    try {

        const { mensaje } = req.body;

        const completion =
            await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                temperature: 0.7,
                messages: [
                    {
                        role: "system",
                        content: `
Eres Nova IA, asistente virtual de InnovVentas.

- Tienda tecnológica peruana.
- Venta de laptops, smartphones, monitores y accesorios.
- Responde siempre en español.
- Sé breve y profesional.
`
                    },
                    {
                        role: "user",
                        content: mensaje
                    }
                ]
            });

        res.json({
            respuesta:
                completion.choices[0].message.content
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            respuesta:
                "Error al consultar Groq."
        });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor iniciado");
});