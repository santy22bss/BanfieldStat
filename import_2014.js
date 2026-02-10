const fs = require('fs');
const axios = require('axios');
// Se requiere axios para la comunicación HTTP. Verificar dependencias instaladas.

const PORT = 3000;
const API_URL = `http://localhost:${PORT}/api`;

// Datos históricos a importar
const newMatches = [
    {
        "id": 780,
        "date": "2014-08-08",
        "stage": "Fase Regular",
        "local": "Godoy Cruz",
        "visitor": "Banfield",
        "score": "3-0",
        "tourney": "Campeonato de Primera División 2014",
        "coach": "Almeyda",
        "stadium": "Malvinas Argentinas",
        "customLogoLocal": "",
        "customLogoVisitor": ""
    },
    {
        "id": 781,
        "date": "2014-08-16",
        "stage": "Fase Regular",
        "local": "Banfield",
        "visitor": "Defensa y Justicia",
        "score": "2-3",
        "tourney": "Campeonato de Primera División 2014",
        "coach": "Almeyda",
        "stadium": "Florencio Sola",
        "customLogoLocal": "",
        "customLogoVisitor": ""
    },
    {
        "id": 782,
        "date": "2014-08-24",
        "stage": "Fase Regular",
        "local": "San Lorenzo",
        "visitor": "Banfield",
        "score": "0-2",
        "tourney": "Campeonato de Primera División 2014",
        "coach": "Almeyda",
        "stadium": "Pedro Bidegain",
        "customLogoLocal": "",
        "customLogoVisitor": ""
    },
    {
        "id": 783,
        "date": "2014-08-27",
        "stage": "Fase Regular",
        "local": "Banfield",
        "visitor": "Tigre",
        "score": "1-0",
        "tourney": "Campeonato de Primera División 2014",
        "coach": "Almeyda",
        "stadium": "Florencio Sola",
        "customLogoLocal": "",
        "customLogoVisitor": ""
    },
    {
        "id": 784,
        "date": "2014-09-01",
        "stage": "Fase Regular",
        "local": "Arsenal",
        "visitor": "Banfield",
        "score": "1-0",
        "tourney": "Campeonato de Primera División 2014",
        "coach": "Almeyda",
        "stadium": "Julio Humberto Grondona",
        "customLogoLocal": "",
        "customLogoVisitor": ""
    },
    {
        "id": 785,
        "date": "2014-09-06",
        "stage": "Fase Regular",
        "local": "Banfield",
        "visitor": "Independiente",
        "score": "0-1",
        "tourney": "Campeonato de Primera División 2014",
        "coach": "Almeyda",
        "stadium": "Florencio Sola",
        "customLogoLocal": "",
        "customLogoVisitor": ""
    },
    {
        "id": 786,
        "date": "2014-09-14",
        "stage": "Fase Regular",
        "local": "Lanús",
        "visitor": "Banfield",
        "score": "1-0",
        "tourney": "Campeonato de Primera División 2014",
        "coach": "Almeyda",
        "stadium": "Ciudad de Lanús",
        "customLogoLocal": "",
        "customLogoVisitor": ""
    },
    {
        "id": 787,
        "date": "2014-09-21",
        "stage": "Fase Regular",
        "local": "Banfield",
        "visitor": "Boca Juniors",
        "score": "1-1",
        "tourney": "Campeonato de Primera División 2014",
        "coach": "Almeyda",
        "stadium": "Florencio Sola",
        "customLogoLocal": "",
        "customLogoVisitor": ""
    },
    {
        "id": 788,
        "date": "2014-09-29",
        "stage": "Fase Regular",
        "local": "Newell's Old Boys",
        "visitor": "Banfield",
        "score": "0-3",
        "tourney": "Campeonato de Primera División 2014",
        "coach": "Almeyda",
        "stadium": "Marcelo Bielsa",
        "customLogoLocal": "",
        "customLogoVisitor": ""
    },
    {
        "id": 789,
        "date": "2014-10-04",
        "stage": "Fase Regular",
        "local": "Banfield",
        "visitor": "Belgrano",
        "score": "2-2",
        "tourney": "Campeonato de Primera División 2014",
        "coach": "Almeyda",
        "stadium": "Florencio Sola",
        "customLogoLocal": "",
        "customLogoVisitor": ""
    },
    {
        "id": 790,
        "date": "2014-10-12",
        "stage": "Fase Regular",
        "local": "Atlético de Rafaela",
        "visitor": "Banfield",
        "score": "2-2",
        "tourney": "Campeonato de Primera División 2014",
        "coach": "Almeyda",
        "stadium": "Nuevo Monumental",
        "customLogoLocal": "",
        "customLogoVisitor": ""
    },
    {
        "id": 791,
        "date": "2014-10-18",
        "stage": "Fase Regular",
        "local": "Banfield",
        "visitor": "Estudiantes LP",
        "score": "1-1",
        "tourney": "Campeonato de Primera División 2014",
        "coach": "Almeyda",
        "stadium": "Florencio Sola",
        "customLogoLocal": "",
        "customLogoVisitor": ""
    },
    {
        "id": 792,
        "date": "2014-10-25",
        "stage": "Fase Regular",
        "local": "Vélez Sarsfield",
        "visitor": "Banfield",
        "score": "1-0",
        "tourney": "Campeonato de Primera División 2014",
        "coach": "Almeyda",
        "stadium": "José Amalfitani",
        "customLogoLocal": "",
        "customLogoVisitor": ""
    },
    {
        "id": 793,
        "date": "2014-11-03",
        "stage": "Fase Regular",
        "local": "Banfield",
        "visitor": "Olimpo",
        "score": "3-0",
        "tourney": "Campeonato de Primera División 2014",
        "coach": "Almeyda",
        "stadium": "Florencio Sola",
        "customLogoLocal": "",
        "customLogoVisitor": ""
    },
    {
        "id": 794,
        "date": "2014-11-09",
        "stage": "Fase Regular",
        "local": "Racing Club",
        "visitor": "Banfield",
        "score": "1-0",
        "tourney": "Campeonato de Primera División 2014",
        "coach": "Almeyda",
        "stadium": "Presidente Perón",
        "customLogoLocal": "",
        "customLogoVisitor": ""
    },
    {
        "id": 795,
        "date": "2014-11-15",
        "stage": "Fase Regular",
        "local": "Banfield",
        "visitor": "Quilmes",
        "score": "3-1",
        "tourney": "Campeonato de Primera División 2014",
        "coach": "Almeyda",
        "stadium": "Florencio Sola",
        "customLogoLocal": "",
        "customLogoVisitor": ""
    },
    {
        "id": 796,
        "date": "2014-11-30",
        "stage": "Fase Regular",
        "local": "River Plate",
        "visitor": "Banfield",
        "score": "3-2",
        "tourney": "Campeonato de Primera División 2014",
        "coach": "Almeyda",
        "stadium": "Antonio V. Liberti",
        "customLogoLocal": "",
        "customLogoVisitor": ""
    },
    {
        "id": 797,
        "date": "2014-12-06",
        "stage": "Fase Regular",
        "local": "Banfield",
        "visitor": "Rosario Central",
        "score": "2-3",
        "tourney": "Campeonato de Primera División 2014",
        "coach": "Almeyda",
        "stadium": "Florencio Sola",
        "customLogoLocal": "",
        "customLogoVisitor": ""
    }
];

/**
 * Función principal de importación.
 * Obtiene la BD actual del servidor, fusiona los nuevos datos y guarda.
 */
async function runImport() {
    try {
        console.log("📥 Obteniendo base de datos actual desde el servidor...");
        // Uso de fetch nativo (Node 18+) o axios según disponibilidad
        const res = await axios.get(`${API_URL}/data`);
        let currentDB = res.data;

        console.log(`🔹 Partidos actuales: ${currentDB.matches.length}`);

        // Limpieza de datos: Filtrar entradas con IDs corruptos o duplicados
        currentDB.matches = currentDB.matches.filter(m => !(`${m.id}`.startsWith('1769')));
        currentDB.matches = currentDB.matches.filter(m => !(m.id >= 780 && m.id <= 797));

        // Fusionar nuevos partidos
        currentDB.matches = [...newMatches, ...currentDB.matches];

        // Ordenar cronológicamente
        currentDB.matches.sort((a, b) => new Date(a.date) - new Date(b.date));

        console.log(`📤 Enviando ${currentDB.matches.length} partidos al servidor...`);

        const saveRes = await axios.post(`${API_URL}/save`, currentDB);

        if (saveRes.data && saveRes.data.success) {
            console.log("✅ Importación exitosa a través de la API.");
        } else {
            console.error("❌ Error al guardar:", saveRes.data);
        }

    } catch (e) {
        console.error("❌ Excepción durante la importación:", e.message);
    }
}

runImport();
