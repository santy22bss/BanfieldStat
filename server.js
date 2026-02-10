const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Escuchar en todas las interfaces de red (LAN)
const DB_FILE = 'database.json';

// --- CONFIGURACIÓN DE MIDDLEWARE ---
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// --- ARCHIVOS ESTÁTICOS ---
// Servir contenido estático desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// --- BASE DE DATOS (Persistencia Local) ---
let db = { matches: [], squads: [] };
if (fs.existsSync(DB_FILE)) {
    try {
        db = JSON.parse(fs.readFileSync(DB_FILE));
    } catch (e) {
        console.error("Error al leer la base de datos, reiniciando estructura...", e);
        db = { matches: [], squads: [] };
    }
} else {
    fs.writeFileSync(DB_FILE, JSON.stringify(db));
}

// --- API ENDPOINTS ---

// 1. Obtener datos almacenados
app.get('/api/data', (req, res) => {
    res.json(db);
});

// 2. Guardar datos manualmente y actualizar competencias
app.post('/api/save', (req, res) => {
    db = req.body;
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
    console.log("💾 Datos guardados correctamente.");

    // Actualización automática de listado de competencias
    if (db.matches) {
        regenerateCompetitions(db.matches);
    }

    res.json({ success: true });
});

// 2b. Obtener listado de Competencias
app.get('/api/competitions', (req, res) => {
    const compFile = path.join(__dirname, 'competitions.json');
    if (fs.existsSync(compFile)) {
        try {
            const data = JSON.parse(fs.readFileSync(compFile));
            res.json(data);
        } catch (e) {
            res.status(500).json({ error: "Error al leer archivo de competencias" });
        }
    } else {
        res.json({ competitions: [] });
    }
});

// 3. Servicio de Búsqueda de Escudos (TheSportsDB + Wikipedia)
app.post('/api/fetch-logo', async (req, res) => {
    const { teamName } = req.body;
    if (!teamName) return res.status(400).json({ success: false, error: "Nombre del equipo requerido" });

    const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) BanfieldApp/1.0' };

    try {
        // Intento 1: TheSportsDB
        const tsdbUrl = `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(teamName)}`;
        try {
            const tsdbRes = await axios.get(tsdbUrl, { headers });
            if (tsdbRes.data?.teams?.[0]?.strTeamBadge) {
                return res.json({ success: true, logoUrl: tsdbRes.data.teams[0].strTeamBadge, source: 'TheSportsDB' });
            }
        } catch (e) { /* Continuar con siguiente fuente */ }

        // Intento 2: Wikipedia API
        const searchUrl = `https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(teamName)}&format=json`;
        const searchRes = await axios.get(searchUrl, { headers });

        if (searchRes.data?.query?.search?.length) {
            const title = searchRes.data.query.search[0].title;
            const imgUrl = `https://es.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=200`;
            const imgRes = await axios.get(imgUrl, { headers });
            const pages = imgRes.data.query.pages;
            const pageId = Object.keys(pages)[0];

            if (pages[pageId].thumbnail) {
                return res.json({ success: true, logoUrl: pages[pageId].thumbnail.source, source: 'Wikipedia' });
            }
        }

        res.json({ success: false, message: "No se encontró logo en las fuentes disponibles." });

    } catch (error) {
        console.error("Error en servicio de escudos:", error.message);
        res.status(500).json({ success: false, error: "Error interno del servidor" });
    }
});

// Endpoint dummy para compatibilidad futura
app.post('/api/scrape-squad', (req, res) => {
    res.json({ success: false, message: "Funcionalidad de scraping no implementada en esta versión." });
});

// 4. Mapa de Logos Local (Búsqueda Recursiva)
const getFilesRecursively = (dir) => {
    let results = [];
    if (!fs.existsSync(dir)) return results;

    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFilesRecursively(file));
        } else {
            // Filtrar solo imágenes compatibles
            if (file.match(/\.(png|jpg|jpeg|gif|webp)$/i)) {
                results.push(file);
            }
        }
    });
    return results;
};

app.get('/api/logo-map', (req, res) => {
    try {
        const imgDir = path.join(__dirname, 'public', 'img');
        const allFiles = getFilesRecursively(imgDir);
        const logoMap = {};

        allFiles.forEach(absolutePath => {
            // Convertir a ruta relativa para uso web
            const relativePath = path.relative(path.join(__dirname, 'public'), absolutePath).replace(/\\/g, '/');

            // Generar clave normalizada: minúsculas, sin acentos, sin caracteres especiales
            const filename = path.basename(absolutePath, path.extname(absolutePath));
            const key = filename.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");

            logoMap[key] = relativePath;
        });

        res.json(logoMap);
    } catch (e) {
        console.error("Error generando mapa de logos:", e);
        res.json({});
    }
});


// --- FUNCIONES AUXILIARES: COMPETENCIAS ---
function regenerateCompetitions(matches) {
    try {
        const competitionsSet = new Set();
        matches.forEach(m => {
            if (m.tourney) competitionsSet.add(m.tourney.trim());
        });

        const competitionsList = Array.from(competitionsSet).map((name, index) => ({
            id: index + 1,
            name: name
        }));

        const outputData = { competitions: competitionsList };
        const compFile = path.join(__dirname, 'competitions.json');
        fs.writeFileSync(compFile, JSON.stringify(outputData, null, 2));
        console.log(`🔄 Base de datos de competencias actualizada: ${competitionsList.length} items.`);
    } catch (e) {
        console.error("Error regenerando competencias:", e);
    }
}

// --- INICIO DEL SERVIDOR ---
app.listen(PORT, HOST, () => {
    console.log(`\n🚀 SERVIDOR HTTP INICIADO`);
    console.log(`-----------------------------------`);
    console.log(`📡 Local:           http://localhost:${PORT}`);
    console.log(`🌍 Red (LAN):       http://${HOST}:${PORT}`); // Nota: HOST es 0.0.0.0, usuario debe buscar su IP
    console.log(`-----------------------------------`);
    console.log(`Para ver tu IP ejecuta: ipconfig\n`);
});