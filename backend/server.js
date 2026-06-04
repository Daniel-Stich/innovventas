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

// Memoria temporal de conversaciones
const conversaciones = new Map();

app.post("/chat", async (req, res) => {

    try {

        const {
            mensaje,
            sessionId = "default-session"
        } = req.body;

        if (!mensaje) {
            return res.status(400).json({
                respuesta: "Por favor escribe un mensaje."
            });
        }

        // Obtener historial de la sesión
        let historial =
            conversaciones.get(sessionId) || [];

        // Agregar mensaje del usuario
        historial.push({
            role: "user",
            content: mensaje
        });

        // Mantener solo los últimos 10 mensajes
        if (historial.length > 10) {
            historial = historial.slice(-10);
        }

        const completion =
            await groq.chat.completions.create({

                model: "llama-3.3-70b-versatile",

                temperature: 0.3,

                max_tokens: 250,

                messages: [

                    {
                        role: "system",
                        content: `
Eres Nova IA, asistente virtual de InnovVentas.

INFORMACIÓN:
- Tienda tecnológica peruana.
- Venta de laptops, smartphones, monitores y accesorios.
- Responde siempre en español.

REGLAS:
1. Mantén el contexto de toda la conversación.
2. No preguntes nuevamente datos que el usuario ya proporcionó.
3. Si el usuario indica un presupuesto, úsalo en futuras respuestas.
4. Si el usuario pide una recomendación, recomiéndala directamente.
5. Evita respuestas genéricas.
6. Sé breve, claro y profesional.
7. No inventes disponibilidad o stock.
8. Si no conoces un dato, indícalo honestamente.
9. Prioriza respuestas útiles para compras tecnológicas.
10. Mantén el hilo de la conversación.
`
                    },

                    ...historial

                ]
            });

        const respuesta =
            completion.choices[0].message.content;

        // Guardar respuesta del asistente
        historial.push({
            role: "assistant",
            content: respuesta
        });

        // Mantener historial corto
        if (historial.length > 10) {
            historial = historial.slice(-10);
        }

        conversaciones.set(
            sessionId,
            historial
        );

        res.json({
            respuesta
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            respuesta:
                "Lo siento, ocurrió un error al procesar tu consulta."
        });
    }
});

// Estado del servidor
app.get("/health", (req, res) => {

    res.json({
        status: "online",
        modelo: "llama-3.3-70b-versatile",
        conversaciones_activas:
            conversaciones.size
    });

});

app.listen(
    process.env.PORT || 3000,
    () => {
        console.log("Servidor iniciado");
    }
);