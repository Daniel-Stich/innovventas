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

    const input = document.getElementById("chat-input");
    const mensaje = input.value.trim();

    if (!mensaje) return;

    const chat = document.getElementById("chat-messages");

    // Mensaje usuario
    chat.innerHTML += `
        <div class="user-message">
            ${mensaje}
        </div>
    `;

    input.value = "";

    // Indicador escribiendo
    chat.innerHTML += `
        <div class="bot-message" id="typing">
            🤖 Nova IA está escribiendo...
        </div>
    `;

    chat.scrollTop = chat.scrollHeight;

    try {

        const response = await fetch(
            "http://localhost:3000/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mensaje: mensaje
                })
            }
        );

        const data = await response.json();

        const typing = document.getElementById("typing");

        if (typing) {
            typing.remove();
        }

        const respuesta =
            data.respuesta ||
            "Lo siento, no pude generar una respuesta.";

        chat.innerHTML += `
            <div class="bot-message">
                ${respuesta}
            </div>
        `;

        chat.scrollTop = chat.scrollHeight;

    }
    catch (error) {

        console.error(error);

        const typing = document.getElementById("typing");

        if (typing) {
            typing.remove();
        }

        chat.innerHTML += `
            <div class="bot-message">
                ❌ Error al conectar con Nova IA.
            </div>
        `;

        chat.scrollTop = chat.scrollHeight;
    }
}


// =========================
// ENTER PARA ENVIAR
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("chat-input");

    input.addEventListener("keypress", function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            sendMessage();
        }
    });

});