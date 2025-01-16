const tmi = require('tmi.js');


// Configuración del bot
const BOT_USERNAME = 'TuNombreDeBot';
const OAUTH_TOKEN = 'oauth:tu_oauth_token'; // https://antiscuff.com/oauth/ 
const CHANNEL_NAME = 'TuNombreDeCanal';
const AUTHORIZED_USER = 'TuNombreDeUsuario'; // Tu usuario de Twitch

// Lista de enlaces
let links = [
    'https://www.youtube.com/watch?v=R4xWbRBLj2I' // example 
];


// Configurar el cliente de tmi.js
const client = new tmi.Client({
  identity: {
      username: BOT_USERNAME, 
      password: OAUTH_TOKEN,
  },
  channels: [CHANNEL_NAME],
});

// Evento: Conexión exitosa
client.on('connected', (address, port) => {
    console.log(`Bot conectado a ${CHANNEL_NAME} en ${address}:${port}`);
    client.say(CHANNEL_NAME, '¡El bot está en línea!');
});

// Conexión al canal
client.connect().catch(console.error);


// Función para enviar enlaces aleatorios
function sendRandomLink() {
    if (client.readyState() === 'OPEN') {
      let randomIndex = Math.floor(Math.random() * links.length);
      let randomLink = links[randomIndex];
      client.say(CHANNEL_NAME, `!sr ${randomLink}`);
    }
  }
  
  // Enviar enlaces aleatorios con medio segundo de diferencia
  function sendLinksWithDelay() {
    let index = 0;
    const interval = setInterval(() => {
      sendRandomLink();
      index++;
      if (index === links.length) {
        clearInterval(interval);
      }
    }, 5000); // 5000ms
  }
  
  // Comando para que el bot envíe los enlaces con el formato !sr (link)
  client.on('message', (channel, userstate, message, self) => {
    if (self) return; // Evitar que el bot responda a sí mismo
    if (message.toLowerCase() === '!srenlaces' && userstate.username === AUTHORIZED_USER) {
      sendLinksWithDelay();
    }
  });
// Conectar al servidor de Twitch
client.connect().catch(console.error);