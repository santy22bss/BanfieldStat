// ======================================================
// 1. GESTIÓN DE DATOS Y ESTADO GLOBAL
// ======================================================
const excelData = []; // Datos migrados a database.json. Se mantiene vacío por compatibilidad.

// ======================================================
// 2. INICIALIZACIÓN DE LA APLICACIÓN
// ======================================================
let matches = [];
// MAPA ESTÁTICO DE ESCUDOS (Generado para GitHub Pages)
const localLogoMap = {
    // PRIMERA DIVISION
    "aldosivi": "img/PrimeraDivision/aldosivi.png",
    "argentinos": "img/PrimeraDivision/argentinos.png",
    "atletico tucuman": "img/PrimeraDivision/atleticotucuman.png",
    "banfield": "img/PrimeraDivision/banfield.png",
    "barracas": "img/PrimeraDivision/barracas.png",
    "belgrano": "img/PrimeraDivision/belgrano.png",
    "boca": "img/PrimeraDivision/boca.png",
    "central cordoba": "img/PrimeraDivision/centralcordoba.png",
    "defensa": "img/PrimeraDivision/defensa.png",
    "estudiantes": "img/PrimeraDivision/estudiantes.png",
    "estudiantes lp": "img/PrimeraDivision/estudiantes.png",
    "estudiantes rc": "img/PrimeraDivision/estudiantesrc.png",
    "gimnasia": "img/PrimeraDivision/gimnasia.png",
    "gimnasia lp": "img/PrimeraDivision/gimnasia.png",
    "gimnasia mendoza": "img/PrimeraDivision/gimnasiamendoza.png",
    "huracan": "img/PrimeraDivision/huracan.png",
    "independiente": "img/PrimeraDivision/independiente.png",
    "independiente riv": "img/PrimeraDivision/independienteriv.png",
    "instituto": "img/PrimeraDivision/instituto.png",
    "lanus": "img/PrimeraDivision/lanus.png",
    "newells": "img/PrimeraDivision/newells.png",
    "platense": "img/PrimeraDivision/platense.png",
    "racing": "img/PrimeraDivision/racing.png",
    "riestra": "img/PrimeraDivision/riestra.png",
    "river": "img/PrimeraDivision/river.png",
    "rosario central": "img/PrimeraDivision/rosariocentral.png",
    "san lorenzo": "img/PrimeraDivision/sanlorenzo.png",
    "sarmiento": "img/PrimeraDivision/sarmiento.png",
    "talleres": "img/PrimeraDivision/talleres.png",
    "tigre": "img/PrimeraDivision/tigre.png",
    "union": "img/PrimeraDivision/union.png",
    "velez": "img/PrimeraDivision/velez.png",

    // PRIMERA NACIONAL
    "agropecuario": "img/primeranacional/agropecuario.png",
    "all boys": "img/primeranacional/allboys.png",
    "almagro": "img/primeranacional/almagro.png",
    "almirante brown": "img/primeranacional/almirante.png",
    "atlanta": "img/primeranacional/atlanta.png",
    "atletico rafaela": "img/primeranacional/atleticorafaela.png",
    "chacarita": "img/primeranacional/chacarita.png",
    "chaco for ever": "img/primeranacional/chaco_for_ever.png",
    "colon": "img/primeranacional/colon.png",
    "defensores de belgrano": "img/primeranacional/defensores.png",
    "deportivo maipu": "img/primeranacional/depmaipu.png",
    "deportivo madryn": "img/primeranacional/deportivo_madryn.png",
    "estudiantes ba": "img/primeranacional/estudiantes_ba.png",
    "ferro": "img/primeranacional/ferro.png",
    "gimnasia jujuy": "img/primeranacional/gimnasiajujuy.png",
    "gimnasia y tiro": "img/primeranacional/gimnasia_y_tiro.png",
    "godoy cruz": "img/primeranacional/godoycruz.png", 
    "guemes": "img/primeranacional/guemes.png",
    "los andes": "img/primeranacional/los_andes.png",
    "mitre": "img/primeranacional/mitre.png",
    "moron": "img/primeranacional/moron.png",
    "nueva chicago": "img/primeranacional/nueva_chicago.png",
    "patronato": "img/primeranacional/patronato.png",
    "quilmes": "img/primeranacional/quilmes.png",
    "racing cordoba": "img/primeranacional/racing_cordoba.png",
    "san martin sj": "img/primeranacional/sanmartinsj.png",
    "san martin tuc": "img/primeranacional/sanmartintuc.png",
    "san miguel": "img/primeranacional/sanmiguel.png",
    "san telmo": "img/primeranacional/santelmo.png",
    "temperley": "img/primeranacional/temperley.png",
    "tristan suarez": "img/primeranacional/tristansuarez.png",

    // FEDERAL A Y OTROS
    "olimpo": "img/federala/olimpo.png",
    "villa mitre": "img/federala/villa_mitre.png",
    "sol de america": "img/federala/sol_de_america.png",
    "9 de julio": "img/federala/9_de_julio.png",
    "crucero del norte": "img/federala/crucero_del_norte.png",
    "boca unidos": "img/federala/boca_unidos.png",
    "juventud antoniana": "img/federala/juventud_antoniana.png",

    // EXTRANJEROS Y OTROS (Agregados según tu lista)
    "nacional": "img/primeradivisionuruguay/nacional.png",
    "peñarol": "img/primeradivisionuruguay/penarol.png",
    "universidad catolica": "img/serieaecuador/universidadcatolica.png",
    "union la calera": "img/primeradivisionchile/unionlacalera.png",
    "santos": "img/serieabrasil/santos.png",
    "flamengo": "img/serieabrasil/flamengo.png",
    "palmeiras": "img/serieabrasil/palmeiras.png",
    "independiente del valle": "img/serieaecuador/independientedv.png"
};
let squads = []; // Datos de planteles históricos
let cupModeState = JSON.parse(localStorage.getItem('banfield_cupModeState')) || {}; // Estado de visualización (Puntos vs Eficacia)

/**
 * Función principal de inicialización.
 * Carga datos del servidor, configura autocompletado y renderiza la UI.
 */
function initApp() {
    console.log("🚀 Iniciando Banfield Stats (Modo GitHub Pages)...");

    

    
    fetch('./database.json') 
        .then(r => {
            if (!r.ok) throw new Error("No se encontró database.json");
            return r.json();
        })
        .then(serverData => {
            // Verificamos si los partidos vienen en .matches o directo en el objeto
            const partidosCargados = serverData.matches || serverData;

            if (partidosCargados && partidosCargados.length > 0) {
                console.log("✅ Datos cargados de database.json:", partidosCargados.length, "partidos.");
                matches = partidosCargados;
            } else {
                console.log("⚠️ JSON vacío. Usando LocalStorage como respaldo.");
                const stored = localStorage.getItem('banfieldDB_v2');
                matches = stored ? JSON.parse(stored) : [];
            }
            proceedWithInit();
        })
        .catch(e => {
            console.warn("⚠️ Error cargando database.json. Usando respaldo local.", e);
            try {
                const stored = localStorage.getItem('banfieldDB_v2');
                matches = stored ? JSON.parse(stored) : [];
            } catch (err) {
                matches = [];
            }
            proceedWithInit();
        });

    function proceedWithInit() {
        // Renderizado inicial de componentes
        if (document.getElementById('tablesContainer')) renderTables();
        if (document.getElementById('timelineList')) renderHistory();
        
        
        if (typeof setupStadiumAutofill === "function") setupStadiumAutofill();
        if (typeof setupLogoAutofill === "function") setupLogoAutofill();
        
        // Verificación proactiva de escudos faltantes
        if (typeof checkMissingLogosPrompt === "function") setTimeout(checkMissingLogosPrompt, 1000);
    }

    // EL MAPA DE LOGOS NO FUNCIONA EN GITHUB PAGES (REQUIERE SERVIDOR)
    //
    /*
    fetch('/api/logo-map')
        .then(r => r.json())
        .then(map => {
            localLogoMap = map;
            renderTables();
        })
        .catch(e => console.warn("Modo estático: No se carga mapa de logos dinámico."));
    */
}




// ======================================================
// 3. UTILIDADES Y GESTIÓN DE LOGOS
// ======================================================

const stadiumDB = {
    "river": "Estadio Mas Monumental",
    "boca": "Estadio La Bombonera",
    "racing": "Estadio Cilindro de Avellaneda",
    "independiente": "Estadio Libertadores de América",
    "san lorenzo": "Estadio Pedro Bidegain",
    "huracan": "Estadio Tomás A. Ducó",
    "velez": "Estadio José Amalfitani",
    "lanus": "Estadio Ciudad de Lanús",
    "talleres": "Estadio Mario Alberto Kempes",
    "belgrano": "Estadio Julio César Villagra",
    "instituto": "Estadio Monumental de Alta Córdoba",
    "rosario central": "Estadio Gigante de Arroyito",
    "newell's": "Estadio Coloso Marcelo Bielsa",
    "newells": "Estadio Coloso Marcelo Bielsa",
    "estudiantes": "Estadio UNO - Jorge Luis Hirschi",
    "gimnasia": "Estadio Juan Carmelo Zerillo",
    "argentinos": "Estadio Diego Armando Maradona",
    "platense": "Estadio Ciudad de Vicente López",
    "tigre": "Estadio José Dellagiovanna",
    "def y justicia": "Estadio Norberto Tomaghello",
    "sarmiento": "Estadio Eva Perón",
    "union": "Estadio 15 de Abril",
    "colon": "Estadio Brigadier General Estanislao López",
    "atl tucuman": "Estadio Monumental José Fierro",
    "central cba": "Estadio Madre de Ciudades",
    "barracas central": "Estadio Claudio 'Chiqui' Tapia",
    "godoy cruz": "Estadio Malvinas Argentinas",
    "ind rivadavia": "Estadio Bautista Gargantini",
    "riestra": "Estadio Guillermo Laza",
    "aldosivi": "Estadio José María Minella",
    "patronato": "Estadio Presbítero Bartolomé Grella",
    "arsenal": "Estadio Julio Humberto Grondona",
    "banfield": "Estadio Florencio Sola"
};

function setupStadiumAutofill() {
    const inputLocal = document.getElementById('inputLocal');
    const inputTourney = document.getElementById('inputTourney');
    const inputStadium = document.getElementById('inputStadium');

    if (inputLocal && inputTourney && inputStadium) {
        inputLocal.addEventListener('input', function () {
            const team = this.value.toLowerCase().trim();
            const tourney = inputTourney.value.toLowerCase();

            // Regla de Negocio: No autocompletar para Copa Argentina o torneos en cancha neutral
            if (tourney.includes('copa argentina') || tourney.includes('trofeo') || tourney.includes('final') || tourney.includes('dam')) return;

            // Búsqueda de coincidencia parcial o exacta
            const foundKey = Object.keys(stadiumDB).find(key => key === team || (team.length > 3 && key.startsWith(team)));

            if (foundKey) {
                inputStadium.value = stadiumDB[foundKey];
            }
        });
    }
}

const logoAliases = {
    "river plate": "river",
    "club atletico river plate": "river",
    "racing club": "racing",
    "estudiantes (lp)": "estudiantes",
    "estudiantes lp": "estudiantes",
    "gimnasia (lp)": "gimnasia",
    "gimnasia lp": "gimnasia",
    "def y justicia": "defensa",
    "defensa y justicia": "defensa",
    "central cba": "centralcordoba",
    "central cordoba": "centralcordoba",
    "atl tucuman": "atleticotucuman",
    "atletico tucuman": "atleticotucuman",
    "newell's": "newells",
    "newells old boys": "newells",
    "all boys": "allboys",
    "boca juniors": "boca",
    "argentinos juniors": "argentinos",
    "u la calera": "unionlacalera",
    "u catolica (e)": "universidadcatolica",
    "barracas central": "barracas",
    "arsenal": "arsenal",
    "arsenal de sarandi": "arsenal",
    "guemes (sde)": "guemes",
    "dep madryn": "deportivomadryn",
    "nacional (u)": "nacional",
    "chaco for ever": "chacoforever",
    "atl rafaela": "atleticorafaela",
    "olimpo": "olimpo",
    "def belgrano (vr)": "defensoresbelgrano",
    "talleres escalada": "talleresre",
    "talleres de escalada": "talleresre",
    "nueva chicago": "nuevachicago",
    "sol de america": "soldeamerica",
    "racing (u)": "racing_u",
    "juv unida (g)": "juventudunidag",
    "ind rivadavia": "independienteriv",
    "bolivar": "ciudadbolivar",
    "arg de merlo": "argentinomerlo",
    "gimnasia (j)": "gimnasiajujuy",
    "gimnasia (mendoza)": "gimnasiamendoza",
    "ind del valle": "independientedv",
    "gral lamadrid": "lamadrid"
};

// Mapeo para búsquedas en Wikipedia (Desambiguación)
const wikiSearchTerms = {
    "def y justicia": "Defensa y Justicia",
    "gimnasia": "Gimnasia y Esgrima La Plata",
    "huracan": "Club Atlético Huracán",
    "san lorenzo": "San Lorenzo de Almagro",
    "arsenal": "Arsenal de Sarandí",
    "central cba": "Central Córdoba de Santiago del Estero",
    "atl tucuman": "Atlético Tucumán",
    "argentinos": "Argentinos Juniors",
    "newells": "Newell's Old Boys",
    "velez": "Vélez Sarsfield",
    "estudiantes": "Estudiantes de La Plata",
    "estudiantes (rc)": "Estudiantes de Río Cuarto",
    "ind rivadavia": "Independiente Rivadavia",
    "racing": "Racing Club",
    "talleres": "Talleres de Córdoba",
    "belgrano": "Belgrano de Córdoba",
    "union": "Unión de Santa Fe",
    "colon": "Colón de Santa Fe",
    "lanus": "Club Atlético Lanús",
    "tigre": "Club Atlético Tigre",
    "platense": "Club Atlético Platense",
    "sarmiento": "Sarmiento de Junín",
    "rosario central": "Rosario Central",
    "barracas central": "Barracas Central",
    "dep riestra": "Deportivo Riestra",
    "riestra": "Deportivo Riestra",
    "talleres escalada": "Talleres de Remedios de Escalada",
    "talleres de escalada": "Talleres de Remedios de Escalada",
    "gimnasia (mendoza)": "Gimnasia y Esgrima de Mendoza",
    "independiente riv": "Independiente Rivadavia"
};

// Cargar Competencias Dinámicas
async function loadCompetitions() {
    try {
        const res = await fetch('/api/competitions');
        if (res.ok) {
            const data = await res.json();
            if (data && data.competitions) {
                const datalist = document.getElementById('tourneySuggestions');
                if (datalist) {
                    datalist.innerHTML = '';
                    const reversed = [...data.competitions].reverse();
                    reversed.forEach(c => {
                        const opt = document.createElement('option');
                        opt.value = c.name;
                        datalist.appendChild(opt);
                    });
                    console.log(`🏆 Se cargaron ${data.competitions.length} competencias.`);
                }
            }
        }
    } catch (e) {
        console.error("Error al cargar competencias:", e);
    }
}

// Configuración de autocompletado de escudos (Proxy a Wikipedia)
function setupLogoAutofill() {
    const inputs = [
        { name: 'inputLocal', logo: 'inputLogoLocal' },
        { name: 'inputVisitor', logo: 'inputLogoVisitor' }
    ];

    inputs.forEach(pair => {
        const nameInput = document.getElementById(pair.name);
        const logoInput = document.getElementById(pair.logo);

        if (nameInput && logoInput) {
            nameInput.addEventListener('blur', async function () {
                const teamName = this.value.trim();
                // Solo buscar si hay nombre y el campo de logo está vacío
                if (teamName.length > 3 && logoInput.value === '') {
                    // Verificar alias local
                    let clean = teamName.toLowerCase();
                    if (logoAliases[clean]) clean = logoAliases[clean];
                    clean = clean.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");

                    fetchWikipediaLogo(teamName, logoInput);
                }
            });
        }
    });
}

async function fetchWikipediaLogo(teamName, targetInput) {
    try {
        targetInput.placeholder = "Buscando escudo...";
        // Llamada al servidor proxy para evitar CORS y ocultar lógica
        const res = await fetch('/api/fetch-logo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ teamName })
        });

        const data = await res.json();
        if (data.success && data.logoUrl) {
            targetInput.value = data.logoUrl;
            targetInput.placeholder = "URL del logo";
        } else {
            targetInput.placeholder = "No encontrado";
        }
    } catch (e) {
        console.error("Error obteniendo logo:", e);
        targetInput.placeholder = "Error al buscar";
    }
}

function getLogoPath(teamName) {
    if (!teamName) return 'img/default.png';
    
    
    const normalized = teamName.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
        .replace(/\./g, "") 
        .trim();


    if (localLogoMap[normalized]) {
        return localLogoMap[normalized];
    }
    

    const shortName = normalized.split(' ')[0];
    if (localLogoMap[shortName]) {
        return localLogoMap[shortName];
    }

    return `img/PrimeraDivision/${shortName}.png`;
}

function formatDate(s) {
    if (!s) return '';
    const parts = s.split('-');
    // Retorna formato DD/MM con año en estilo menor
    return `${parts[2]}/${parts[1]}<span class="year-part">/${parts[0].slice(2)}</span>`;
}

// Lógica de resultados (Incluye definición por penales)
function getResult(m) {
    if (!m.score || m.score.trim() === '') return { type: 'pending', pts: 0 };

    let cleanScore = m.score.replace(/\s/g, '');
    const parts = cleanScore.split('-');

    if (parts.length < 2) return { type: 'pending', pts: 0 };

    const locGoals = parseInt(parts[0]);
    const visGoals = parseInt(parts[1]);
    const isBanfieldLocal = m.local.toLowerCase().includes('banfield');

    // 1. Definición en tiempo reglamentario
    if (locGoals !== visGoals) {
        if (isBanfieldLocal) return locGoals > visGoals ? { type: 'win', pts: 3 } : { type: 'loss', pts: 0 };
        else return visGoals > locGoals ? { type: 'win', pts: 3 } : { type: 'loss', pts: 0 };
    }

    // 2. Penales (Detecta paréntesis ej: "1(4)-1(3)")
    const locPenData = parts[0].match(/\((\d+)\)/);
    const visPenData = parts[1].match(/\((\d+)\)/);

    if (locPenData && visPenData) {
        const locPen = parseInt(locPenData[1]);
        const visPen = parseInt(visPenData[1]);
        if (isBanfieldLocal) {
            return locPen > visPen ? { type: 'win', pts: 1 } : { type: 'loss', pts: 1 };
        } else {
            return visPen > locPen ? { type: 'win', pts: 1 } : { type: 'loss', pts: 1 };
        }
    }

    // 3. Empate
    return { type: 'draw', pts: 1 };
}

// ======================================================
// 4. RENDERIZADO DE TABLAS
// ======================================================

function toggleCupMode(key) {
    cupModeState[key] = !cupModeState[key];
    localStorage.setItem('banfield_cupModeState', JSON.stringify(cupModeState));
    renderTables();
}

function renderTables() {
    const container = document.getElementById('tablesContainer');
    if (!container) return;

    // Limpieza y preparación del contenedor
    container.innerHTML = '';
    const fragment = document.createDocumentFragment(); // Optimización: Uso de DocumentFragment para minimizar reflows

    const search = document.getElementById('searchInput') ? document.getElementById('searchInput').value.toLowerCase() : "";

    // Ordenamiento cronológico
    const allMatchesOrdered = matches.sort((a, b) => new Date(a.date) - new Date(b.date));
    const groups = {};
    const filteredMatches = []; // Para estadísticas globales de búsqueda
    

    // Agrupamiento por torneo
    allMatchesOrdered.forEach(m => {
        // Filtro de búsqueda
        const textSearch = (m.local + m.visitor + m.tourney + (m.coach || '') + (m.stadium || '')).toLowerCase();
        if (textSearch.includes(search)) {
            filteredMatches.push(m);

            const year = m.date.split('-')[0];
            const key = m.tourney;

            // Auto-detección de modo copa
            if (cupModeState[key] === undefined) {
                cupModeState[key] = key.toLowerCase().includes('copa') || key.toLowerCase().includes('trofeo');
            }

            if (!groups[key]) groups[key] = { matches: [], year: parseInt(year) };
            groups[key].matches.push(m);
        }
    });

    // --- BLOQUE DE RESUMEN DE BÚSQUEDA ---
    if (search.trim() !== '' && filteredMatches.length > 0) {
        let globalW = 0, globalD = 0, globalL = 0, globalPts = 0;

        filteredMatches.forEach(m => {
            const logoLocal = getLogoPath(m.local);
            const logoVisitor = getLogoPath(m.visitor);
            const res = getResult(m);
            if (res.type === 'win') globalW++;
            if (res.type === 'draw') globalD++;
            if (res.type === 'loss') globalL++;
            globalPts += res.pts;
        });

        const globalTotal = globalW + globalD + globalL;
        const globalPotential = globalTotal * 3;
        const globalEff = globalTotal > 0 ? Math.round((globalPts / globalPotential) * 100) : 0;

        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'tournament-group';
        summaryDiv.style.marginBottom = '30px';
        summaryDiv.style.border = '2px solid var(--green-primary)';

        summaryDiv.innerHTML = `
            <div class="tournament-header" style="background: linear-gradient(135deg, var(--green-primary), var(--green-light)); border-radius: 14px;">
                <div class="t-title">
                    <h3 style="font-size: 1.1rem; text-transform: uppercase;">
                        <i class="fas fa-search"></i> Resultados de Búsqueda: "${search}"
                    </h3>
                </div>
                <div class="t-stats-row">
                    <span class="badge-dark"><i class="fas fa-layer-group"></i> PJ: ${globalTotal}</span>
                    <span class="badge-dark"><i class="fas fa-chart-line"></i> Efec: ${globalEff}%</span>
                    <span class="badge-dark">
                        <i class="fas fa-list"></i> 
                        <span class="text-green">${globalW}G</span> - 
                        <span class="text-orange">${globalD}E</span> - 
                        <span class="text-red">${globalL}P</span>
                    </span>
                </div>
            </div>
        `;
        fragment.appendChild(summaryDiv);
    }

    const sortedKeys = Object.keys(groups).sort((a, b) => groups[b].year - groups[a].year);
    let prevYear = null;

    // Generación del DOM
    sortedKeys.forEach(key => {
        const groupData = groups[key];
        const groupMatches = groupData.matches;

        // Cálculo de Estadísticas del Grupo
        let gw = 0, gd = 0, gl = 0;
        let points = 0;
        let pendingCount = 0;
        groupMatches.forEach(m => {
            const res = getResult(m);
            if (res.type === 'win') gw++;
            if (res.type === 'draw') gd++;
            if (res.type === 'loss') gl++;
            if (res.type === 'pending') pendingCount++;
            points += res.pts;
        });

        const potentialPoints = groupMatches.length * 3;

        const totalGames = gw + gd + gl;
        const efficiency = totalGames > 0 ? Math.round((points / (totalGames * 3)) * 100) : 0;
        const currentYear = groupData.year;

        // Separador de Años
        if (prevYear !== null && prevYear !== currentYear) {
            const sep = document.createElement('div');
            sep.className = 'year-separator';
            sep.textContent = prevYear;
            fragment.appendChild(sep);
        }
        prevYear = currentYear;

        // Sección del Torneo
        const section = document.createElement('div');
        section.className = 'tournament-group';

        const isCupMode = cupModeState[key];

        let headerHTML = `
            <div class="tournament-header">
                <div class="t-title">
                    <h2>${key}</h2>
                </div>
                <div class="t-stats-row">
                     ${!isCupMode ? `<span class="badge-dark"><i class="fas fa-star"></i> Pts: ${points}/${potentialPoints}</span>` : ''}
                    <span class="badge-dark"><i class="fas fa-chart-line"></i> Efec: ${efficiency}%</span>
                    <span class="badge-dark"><i class="fas fa-list"></i> Racha: <span class="text-green">${gw}G</span> - <span class="text-orange">${gd}E</span> - <span class="text-red">${gl}P</span></span>
                    
                    <div class="t-actions-dark">
                         <button class="btn-icon-dark" onclick="openRenameModal('${key}')" title="Renombrar Torneo">
                            <i class="fas fa-pen"></i>
                        </button>
                        <button class="btn-toggle-dark ${isCupMode ? 'active' : ''}" onclick="toggleCupMode('${key}')" title="${isCupMode ? 'Ver Puntos' : 'Solo Eficacia'}">
                            <i class="${isCupMode ? 'fas fa-trophy' : 'fas fa-list-ol'}"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        let tableHTML = `
            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th class="text-center">Fecha</th>
                            <th class="text-right">Local</th>
                            <th class="text-center">Res</th>
                            <th>Visita</th>
                            <th class="text-center">Instancia</th>
                            <th>Estadio</th>
                            <th class="text-center">DT</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        groupMatches.forEach(m => {
            const res = getResult(m);
            const resClass = res.type;
            const isBanfieldLocal = m.local.toLowerCase().includes('banfield');

            const logo = getLogoPath(m.local);
            const logoVisitor = getLogoPath(m.visitor);

            tableHTML += `
                <tr class="match-row ${resClass}">
                    <td class="text-center">${formatDate(m.date)}</td>
                    <td class="text-right">
                        <div class="team-flex right">
                            ${m.local} <img src="${logoLocal}" class="team-logo-sm" onerror="this.onerror=null; this.src='img/banfield.png'">
                        </div>
                    </td>
                    <td class="text-center">
                        <span class="score-pill ${res.type === 'win' ? 'win' : res.type === 'draw' ? 'draw' : res.type === 'loss' ? 'loss' : ''}">
                            ${m.score || '-'}
                        </span>
                    </td>
                    <td>
                        <div class="team-flex left">
                            <img src="${logoVisitor}" class="team-logo-sm" onerror="this.onerror=null; this.src='img/banfield.png'"> ${m.visitor}
                        </div>
                    </td>
                    <td class="text-center col-desktop" style="font-size:0.85em; color:var(--text-muted);">${m.stage || '-'}</td>
                    <td class="stadium-cell col-desktop" title="${m.stadium || ''}">${m.stadium || ''}</td>
                    <td class="text-center col-desktop"><span class="dt-tag">${m.coach || ''}</span></td>
                    <td class="text-center">
                        <div class="actions-desktop">
                            <button class="btn-icon" onclick="editMatch(${m.id})"><i class="fas fa-pen"></i></button>
                            <button class="btn-icon delete" onclick="delMatch(${m.id})"><i class="fas fa-trash"></i></button>
                        </div>
                        <button class="btn-expand mobile-only" onclick="toggleDetails('details-${m.id}', this)">
                            <i class="fas fa-chevron-down"></i>
                        </button>
                    </td>
                </tr>
                <!-- Fila de Detalles en Móvil -->
                <tr id="details-${m.id}" class="details-row">
                    <td colspan="8">
                        <div class="mobile-details-content">
                            <div class="detail-item"><strong>Instancia:</strong> ${m.stage || '-'}</div>
                            <div class="detail-item"><strong>Estadio:</strong> ${m.stadium || '-'}</div>
                            <div class="detail-item"><strong>DT:</strong> ${m.coach || '-'}</div>
                            <div class="mobile-actions">
                                <button class="btn-edit-mobile" onclick="editMatch(${m.id})"><i class="fas fa-pen"></i> Editar</button>
                                <button class="btn-delete-mobile" onclick="delMatch(${m.id})"><i class="fas fa-trash"></i> Borrar</button>
                            </div>
                        </div>
                    </td>
                </tr>
            `;
        });
        tableHTML += `
                    </tbody>
                </table>
            </div>
        `;

        section.innerHTML = headerHTML + tableHTML;
        fragment.appendChild(section);
    });

    container.appendChild(fragment);
}

function toggleDetails(rowId, btn) {
    const row = document.getElementById(rowId);
    if (row.style.display === 'table-row') {
        row.style.display = 'none';
        btn.innerHTML = '<i class="fas fa-chevron-down"></i>';
        btn.classList.remove('active');
    } else {
        row.style.display = 'table-row';
        btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        btn.classList.add('active');
    }
}

// ======================================================
// 5. GESTIÓN DE MODAL (Edición y Creación)
// ======================================================
const modal = document.getElementById('modal');
const form = document.getElementById('matchForm');

function openModal() {
    if (form) form.reset();
    document.getElementById('matchId').value = '';
    document.getElementById('modalTitle').innerText = 'Nuevo Partido';
    if (modal) modal.style.display = 'flex';
}

function closeModal() { if (modal) modal.style.display = 'none'; }

function editMatch(id) {
    const m = matches.find(x => x.id === id);
    if (m) {
        document.getElementById('matchId').value = m.id;
        document.getElementById('inputDate').value = m.date;
        document.getElementById('inputStage').value = m.stage || '';
        document.getElementById('inputLocal').value = m.local;
        document.getElementById('inputVisitor').value = m.visitor;
        document.getElementById('inputScore').value = m.score;
        document.getElementById('inputTourney').value = m.tourney;
        document.getElementById('inputCoach').value = m.coach || '';
        document.getElementById('inputStadium').value = m.stadium || '';

        const logoLocalInput = document.getElementById('inputLogoLocal');
        if (logoLocalInput) logoLocalInput.value = m.customLogoLocal || '';

        const logoVisInput = document.getElementById('inputLogoVisitor');
        if (logoVisInput) logoVisInput.value = m.customLogoVisitor || '';

        document.getElementById('modalTitle').innerText = 'Editar Partido';
        if (modal) modal.style.display = 'flex';
    }
}

function delMatch(id) {
    if (confirm('¿Estás seguro de que deseas borrar este partido?')) {
        matches = matches.filter(x => x.id !== id);
        save();
    }
}

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('matchId').value;
        const logoLocalInput = document.getElementById('inputLogoLocal');
        const logoVisInput = document.getElementById('inputLogoVisitor');

        const data = {
            id: id ? parseInt(id) : Date.now(),
            date: document.getElementById('inputDate').value,
            stage: document.getElementById('inputStage').value,
            local: document.getElementById('inputLocal').value,
            visitor: document.getElementById('inputVisitor').value,
            score: document.getElementById('inputScore').value,
            tourney: document.getElementById('inputTourney').value,
            coach: document.getElementById('inputCoach').value,
            stadium: document.getElementById('inputStadium').value,
            customLogoLocal: logoLocalInput ? logoLocalInput.value : '',
            customLogoVisitor: logoVisInput ? logoVisInput.value : ''
        };

        if (id) {
            const idx = matches.findIndex(x => x.id == id);

            // Verificar cambio de estadio para actualización masiva
            const oldStadium = matches[idx].stadium;
            const newStadium = data.stadium;

            matches[idx] = data;

            if (oldStadium && oldStadium !== newStadium && newStadium) {
                if (confirm(`Se detectó un cambio de estadio de "${oldStadium}" a "${newStadium}".\n\n[ACEPTAR] = Actualizar TODOS los partidos con este estadio.\n[CANCELAR] = Actualizar SOLO este partido.`)) {
                    let count = 0;
                    matches.forEach(m => {
                        if (m.stadium === oldStadium) {
                            m.stadium = newStadium;
                            count++;
                        }
                    });
                    if (count > 0) alert(`Se actualizaron otros ${count} partidos.`);
                }
            }
        } else {
            matches.push(data);
        }
        save();
        closeModal();
    });
}

function save(silent = false) {
    // 1. Guardar en LocalStorage (Backup rápido)
    localStorage.setItem('banfieldDB_v2', JSON.stringify(matches));

    // 2. Guardar en Servidor (Persistencia real)
    fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matches: matches, squads: [] })
    })
        .then(r => r.json())
        .then(data => {
            if (!silent) console.log("💾 Sincronización con el servidor completada.");
        })
        .catch(e => console.error("Error guardando en servidor:", e));

    renderTables();
    renderAverageTable();
}

// ======================================================
// 6. HISTORIA Y CRONOLOGÍA
// ======================================================

// Datos históricos predeterminados (Respaldo local)
const defaultHistoryData = [
    {
        year: 2025,
        title: "La Era Troglio",
        coach: "Pedro Troglio",
        image: "img/plantel2025.jpg",
        players: "Facundo Sanguinetti, Santiago López García, Danilo Arboleda, Sergio Vittor, Nicolás Meriano, Ignacio Abraham, Martín Río, Santiago Esquivel, Gonzalo Ríos, Mauro Méndez, Bruno Sepúlveda."
    },
    {
        year: 2024,
        title: "Transición y Cantera",
        coach: "Falcioni / Munúa",
        image: "img/plantel2024.jpg",
        players: "Marcelo Barovero, Emanuel Coronel, Aarón Quirós, Milton Giménez. Un año de recambio apostando a las inferiores."
    },
    {
        year: 2020,
        title: "Subcampeón Copa Maradona",
        coach: "Javier Sanguinetti",
        image: "img/plantel2020.jpg",
        players: "Arboleda, Coronel, Maldonado, Lollo, Bravo, Jorge Rodríguez, Galoppo, Payero, Bordagaray, Cuero, Fontana."
    },
    {
        year: 2018,
        title: "Retorno a la Libertadores",
        coach: "Julio César Falcioni",
        image: "img/plantel2018.jpg",
        players: "Arboleda, Civelli, Bertolo, Dátolo, Cvitanich, Sperduti, Kalinski."
    },
    {
        year: 2016,
        title: "120 Años de Historia",
        coach: "Vivas / Falcioni",
        image: "img/plantel2016.jpg",
        players: "Hilario Navarro, Beto Bologna, Iván Rossi, Gio Simeone, Santiago Silva."
    },
    {
        year: 2014,
        title: "Operación Retorno (Campeón)",
        coach: "Matías Almeyda",
        image: "img/plantel2014.jpg",
        players: "Servio, Toledo, Tagliafico, Domingo, Erviti, Cazares, Noir, Salcedo, Bertolo."
    },
    {
        year: 2009,
        title: "¡BANFIELD CAMPEÓN! (Apertura)",
        coach: "Julio César Falcioni",
        image: "img/plantel2009.jpg",
        players: "Lucchetti, Barraza, Méndez, López, Bustamante, Quinteros, Battión, Erviti, James Rodríguez, Papelito Fernández, Silva."
    },
    {
        year: 2005,
        title: "Noches de Copa (Cuartos)",
        coach: "Julio César Falcioni",
        image: "img/plantel2005.jpg",
        players: "Barbosa, Barraza, Sanguinetti, Civelli, Andrizzi, San Martín, Bilos, Barijho, Lujambio, Garrafa Sánchez."
    },
    {
        year: 2001,
        title: "El Ascenso de Garrafa",
        coach: "Mané Ponce",
        image: "img/plantel2001.jpg",
        players: "Luchetti, Adrián González, Sanguinetti, Raposo, Santa Cruz, Damián Giménez, Garrafa Sánchez, Leeb, Forestello."
    },
    {
        year: 1997,
        title: "El Centenario",
        coach: "Patricio Hernández",
        image: "img/plantel1997.jpg",
        players: "Campagnuolo, Mauro Navas, Craviotto, Glaría, Alvarenga, Vitamina Sánchez."
    },
    {
        year: 1993,
        title: "Ascenso 93",
        coach: "Carlos Babington",
        image: "img/plantel1993.jpg",
        players: "Comizzo, Javier Sanguinetti, Stafuza, Roldán, Javier Zanetti, Delfino, Wensel."
    },
    {
        year: 1987,
        title: "Fútbol Vistoso",
        coach: "Ángel Cappa",
        image: "img/plantel1987.jpg",
        players: "Puentedura, Clide Díaz, Zuttión, Félix Orte, Horacio García, Robinson Hernández."
    },
    {
        year: 1980,
        title: "Tiempos de Lucha",
        coach: "Varios",
        image: "img/plantel1980.jpg",
        players: "Etapa de resistencia en el ascenso."
    },
    {
        year: 1976,
        title: "Récord de Primera",
        coach: "Adolfo Pedernera",
        image: "img/plantel1976.jpg",
        players: "La Volpe, Silvio Sotelo, Corvo, Félix Orte, Miguel González."
    },
    {
        year: 1973,
        title: "Campeón Primera B",
        coach: "López y Cavallero",
        image: "img/plantel1973.jpg",
        players: "La Volpe, Mateos, Sotelo, Pipastrelli, Taverna (Récord de goles)."
    },
    {
        year: 1962,
        title: "El Gran Ascenso",
        coach: "Benicio Acosta",
        image: "img/plantel1962.jpg",
        players: "Ediberto Righi, Norberto Raffo, Oscar López, Luis Maidana, Roberto Zárate."
    },
    {
        year: 1951,
        title: "El Campeón Moral",
        coach: "Félix Zurdo",
        image: "img/plantel1951.jpg",
        players: "Graneros, Ferretti, Bagnato, Capparelli, Eliseo Mouriño, D'Angelo, Converti, Albella, Moreno, Huarte."
    },
    {
        year: 1946,
        title: "La Máquina de la B",
        coach: "Remigio Sola",
        image: "img/plantel1946.jpg",
        players: "Campaña récord histórica."
    },
    {
        year: 1940,
        title: "Nace 'El Taladro'",
        coach: "Florencio Sola",
        image: "img/plantel1940.jpg",
        players: "Sanz, Silvera, Busuzzo, De Terán, Farro."
    },
    {
        year: 1930,
        title: "El Legado Amateur",
        coach: "George Burton",
        image: "img/plantel1930.jpg",
        players: "Fin de la era romántica del club."
    },
    {
        year: 1920,
        title: "CAMPEÓN Copa de Honor",
        coach: "–",
        image: "img/plantel1920.jpg",
        players: "Lorenzo, López, Granara, Barton, Tasín. Primer título oficial en Primera."
    },
    {
        year: 1896,
        title: "El Origen Británico",
        coach: "Kingsland & Burton",
        image: "img/plantel1896.jpg",
        players: "Fundado el 21 de Enero. Inicios en Cricket."
    }
];

// Cargar desde LocalStorage o usar predeterminados
let currentHistoryData = JSON.parse(localStorage.getItem('banfield_history')) || defaultHistoryData;

function renderHistory() {
    const container = document.getElementById('timelineList');
    if (!container) return;

    // Ordenamiento descendente por año
    currentHistoryData.sort((a, b) => b.year - a.year);

    container.innerHTML = '';
    let htmlContent = '';

    currentHistoryData.forEach((item, index) => {
        htmlContent += `
            <div class="t-item">
                <div class="t-year">${item.year}</div>
                <div class="t-content">
                    <button class="btn-icon" onclick="editHistory(${index})" style="float:right; opacity:0.5; cursor:pointer;" title="Editar"><i class="fas fa-pencil-alt"></i></button>
                    <h3>${item.title}</h3>
                    <p><strong>DT:</strong> ${item.coach}</p>
                    <div class="media-container">
                        <img src="${item.image}" class="t-img" alt="Plantel ${item.year}"
                             onload="this.style.display='block'; this.nextElementSibling.style.display='none'"
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                        <div class="img-placeholder" style="display:none;">
                            <i class="fas fa-camera"></i>
                            <span>Falta foto: ${item.year}<br><small>(Guardar como: plantel${item.year}.jpg)</small></span>
                        </div>
                    </div>
                    <p style="margin-top:10px; font-style:italic; color:#555; line-height:1.5; font-size:0.95rem;">
                        <i class="fas fa-users" style="color:var(--green)"></i> <strong>Historia:</strong> ${item.players}
                    </p>
                </div>
            </div>
            `;
    });
    container.innerHTML = htmlContent;
}

// --- Modal de Historia ---
const modalHistory = document.getElementById('modalHistory');
const historyForm = document.getElementById('historyForm');
let editingHistoryIndex = null;

function openHistoryModal() {
    modalHistory.style.display = 'block';
}

window.editHistory = function (index) {
    editingHistoryIndex = index;
    const item = currentHistoryData[index];
    if (!item) return;

    document.getElementById('histYear').value = item.year;
    document.getElementById('histTitle').value = item.title;
    document.getElementById('histCoach').value = item.coach;
    document.getElementById('histImage').value = item.image;
    document.getElementById('histPlayers').value = item.players;

    openHistoryModal();
}

function closeHistoryModal() {
    modalHistory.style.display = 'none';
    editingHistoryIndex = null;
    if (historyForm) historyForm.reset();
}

if (historyForm) {
    historyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const year = document.getElementById('histYear').value;
        const title = document.getElementById('histTitle').value;
        const coach = document.getElementById('histCoach').value;
        const image = document.getElementById('histImage').value; // Input de URL
        const players = document.getElementById('histPlayers').value;

        const newItem = {
            year: parseInt(year),
            title: title,
            coach: coach,
            image: image,
            players: players
        };

        if (editingHistoryIndex !== null && editingHistoryIndex >= 0) {
            currentHistoryData[editingHistoryIndex] = newItem;
        } else {
            currentHistoryData.push(newItem);
        }

        // Guardar cambios
        localStorage.setItem('banfield_history', JSON.stringify(currentHistoryData));

        renderHistory();
        closeHistoryModal();
    });
}


// ======================================================
// 7. RENOMBRADO DE TORNEOS
// ======================================================
const modalRename = document.getElementById('modalRename');
const formRename = document.getElementById('renameForm');

function openRenameModal(oldName) {
    document.getElementById('oldTourneyName').value = oldName;
    document.getElementById('newTourneyName').value = oldName;
    if (modalRename) modalRename.style.display = 'flex';
}

function closeRenameModal() {
    if (modalRename) modalRename.style.display = 'none';
}

if (formRename) {
    formRename.addEventListener('submit', (e) => {
        e.preventDefault();
        const oldName = document.getElementById('oldTourneyName').value;
        const newName = document.getElementById('newTourneyName').value;

        if (newName && newName !== oldName) {
            let count = 0;
            matches.forEach(m => {
                if (m.tourney === oldName) {
                    m.tourney = newName;
                    count++;
                }
            });
            if (count > 0) {
                save();
                closeRenameModal();
            }
        } else {
            closeRenameModal();
        }
    });
}

// ======================================================
// 8. SISTEMA DE RESPALDO (IMPORTAR / EXPORTAR)
// ======================================================
function exportData() {
    const dataStr = JSON.stringify(matches, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `banfield_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importData(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const json = JSON.parse(e.target.result);
            if (Array.isArray(json)) {
                matches = json;
                save();
                alert('¡Backup restaurado correctamente! La página se recargará.');
                location.reload();
            } else {
                alert('El archivo no es válido (Debe ser un array de partidos).');
            }
        } catch (error) {
            alert('Error al leer el archivo JSON.');
            console.error(error);
        }
    };
    reader.readAsText(file);
    input.value = '';
}

// ======================================================
// 11. ACTUALIZACIÓN MASIVA DE ESCUDOS
// ======================================================
async function updateAllMissingLogos() {
    if (!confirm("Esto buscará en Wikipedia los escudos de TODOS los equipos que no tengan uno personalizado. Puede tardar unos segundos. ¿Continuar?")) return;

    const teamsToFetch = new Set();

    // 1. Identificar equipos sin escudo personalizado
    matches.forEach(m => {
        if (!m.customLogoLocal && m.local && m.local.toLowerCase() !== 'banfield') {
            teamsToFetch.add(m.local);
        }
        if (!m.customLogoVisitor && m.visitor && m.visitor.toLowerCase() !== 'banfield') {
            teamsToFetch.add(m.visitor);
        }
    });

    if (teamsToFetch.size === 0) {
        alert("Todos los equipos ya tienen escudos personalizados.");
        return;
    }

    alert(`Se buscarán escudos para ${teamsToFetch.size} equipos. Por favor espera...`);

    let updatedCount = 0;
    const teamsArray = Array.from(teamsToFetch);

    // Iteración secuencial para evitar saturación
    for (const teamName of teamsArray) {
        try {
            // Usar nombre específico de Wikipedia si existe, sino el original
            const searchName = wikiSearchTerms[teamName.toLowerCase()] || teamName;
            console.log(`Buscando logo para: ${teamName} (Query: ${searchName})`);

            const res = await fetch('/api/fetch-logo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ teamName: searchName })
            });
            const data = await res.json();

            if (data.success && data.logoUrl) {
                // Actualizar TODOS los partidos con este equipo
                let applied = false;
                matches.forEach(m => {
                    if (m.local === teamName && !m.customLogoLocal) {
                        m.customLogoLocal = data.logoUrl;
                        applied = true;
                    }
                    if (m.visitor === teamName && !m.customLogoVisitor) {
                        m.customLogoVisitor = data.logoUrl;
                        applied = true;
                    }
                });
                if (applied) updatedCount++;
            }
        } catch (e) {
            console.error(`Error buscando logo para ${teamName}`, e);
        }

        // Breve pausa entre peticiones
        await new Promise(r => setTimeout(r, 200));
    }

    if (updatedCount > 0) {
        save();
        alert(`¡Listo! Se actualizaron los escudos de ${updatedCount} equipos. La página se recargará.`);
        location.reload();
    } else {
        alert("No se pudieron encontrar nuevos escudos.");
    }
}

function checkMissingLogosPrompt() {
    let missingCount = 0;
    matches.forEach(m => {
        if (!m.customLogoLocal && m.local && m.local.toLowerCase() !== 'banfield') missingCount++;
        if (!m.customLogoVisitor && m.visitor && m.visitor.toLowerCase() !== 'banfield') missingCount++;
    });

    if (missingCount > 5) {
        console.log(`Faltan escudos en ${missingCount} registros.`);

        const btn = document.querySelector('button[title="Buscar automáticamante escudos en Wikipedia"]');
        if (btn) {
            btn.classList.add('btn-attention');
            btn.innerHTML = `<i class="fas fa-magic"></i> Autoset (${missingCount})`;
        }
    }
}

// ======================================================
// 12. INICIALIZACIÓN FINAL
// ======================================================
document.addEventListener('DOMContentLoaded', initApp);