const axios = require('axios');

/**
 * Script de utilidad para verificar el mapeo de logos servido por la API.
 * Realiza una petición al endpoint /api/logo-map e imprime claves de muestra.
 */
async function checkMap() {
    try {
        const res = await axios.get('http://localhost:3000/api/logo-map');
        const map = res.data;

        console.log("--- Verificación de Mapa de Logos ---");
        console.log("Claves encontradas (Muestra):");
        console.log("river:", map['river']);
        console.log("riverplate:", map['riverplate']);
        console.log("atleticotucuman:", map['atleticotucuman']);
        console.log("atltucuman:", map['atltucuman']);
        console.log("arsenal:", map['arsenal']);

        console.log("\nPrimeras 5 claves del mapa:", Object.keys(map).slice(0, 5));
    } catch (e) {
        console.error("Error al conectar con la API:", e.message);
    }
}
checkMap();
