// =========================
// CONFIGURACIÓN GEMINI
// =========================

const API_KEY = "PENDIENTE";


// =========================
// ABRIR / CERRAR CHAT
// =========================

function toggleChat() {

    document
        .getElementById("chat-window")
        .classList
        .toggle("active");
}

function openChat() {

    document
        .getElementById("chat-window")
        .classList
        .add("active");
}


// =========================
// ENVIAR MENSAJE
// =========================

async function sendMessage() {

    const input =
        document.getElementById("chat-input");

    const mensaje =
        input.value.trim();

    if (!mensaje) return;

    const chat =
        document.getElementById("chat-messages");

    // Mensaje usuario
    chat.innerHTML += `
        <div class="user-message">
            ${mensaje}
        </div>
    `;

    input.value = "";

    chat.scrollTop = chat.scrollHeight;

    // Indicador escribiendo
    chat.innerHTML += `
        <div class="bot-message" id="typing">
            Nova IA está escribiendo...
        </div>
    `;

    chat.scrollTop = chat.scrollHeight;

    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    contents: [
                        {
                            parts: [
                                {
                                    text:
`Eres Nova IA, asistente virtual de InnovVentas.

Información de la empresa:

- Tienda tecnológica peruana.
- Venta de laptops, smartphones, monitores y accesorios.
- Atención amable y profesional.
- Responde en español.
- Mantén respuestas cortas y claras.

Usuario:
${mensaje}`
                                }
                            ]
                        }
                    ]

                })
            }
        );

        const data = await response.json();

        document
            .getElementById("typing")
            .remove();

        const respuesta =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Lo siento, no pude responder en este momento.";

        chat.innerHTML += `
            <div class="bot-message">
                ${respuesta}
            </div>
        `;

        chat.scrollTop = chat.scrollHeight;

    }
    catch (error) {

        console.error(error);

        const typing =
            document.getElementById("typing");

        if (typing) typing.remove();

        chat.innerHTML += `
            <div class="bot-message">
                ❌ Error al conectar con Gemini.
            </div>
        `;

        chat.scrollTop = chat.scrollHeight;
    }
}


// =========================
// ENTER PARA ENVIAR
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const input =
        document.getElementById("chat-input");

    input.addEventListener("keypress", function(event) {

        if(event.key === "Enter") {

            event.preventDefault();

            sendMessage();
        }
    });

});