const fs = require('fs');
const axios = require('axios');

const PORT = 3000;
const API_URL = `http://localhost:${PORT}/api`;
const DB_FILE = 'database.json';

/**
 * Sincronización forzada: Lee la base de datos local (archivo) y la envía al servidor
 * para asegurar consistencia en memoria y persistencia.
 */
async function syncDB() {
    try {
        console.log("📂 Leyendo archivo local database.json...");
        if (!fs.existsSync(DB_FILE)) {
            throw new Error("El archivo database.json no existe.");
        }
        const diskDB = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

        console.log(`🔹 Partidos leídos del disco: ${diskDB.matches.length}`);

        console.log("📤 Enviando datos al servidor...");
        const res = await axios.post(`${API_URL}/save`, diskDB);

        if (res.data && res.data.success) {
            console.log("✅ Sincronización completada. El servidor ha actualizado su estado.");
        } else {
            console.error("❌ Falló la sincronización:", res.data);
        }

    } catch (e) {
        console.error("❌ Error durante el proceso de sincronización:", e.message);
    }
}

syncDB();
