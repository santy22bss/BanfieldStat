const fs = require('fs');

const appContent = fs.readFileSync('public/app.js', 'utf8');

// Extracción de datos embebidos usando expresiones regulares
// Busca el bloque "const excelData = [...]"
const match = appContent.match(/const excelData = \[\s*([\s\S]*?)\];/);

if (!match) {
    console.log("No se pudo encontrar la variable excelData en app.js");
    process.exit(1);
}

const dataString = "[" + match[1] + "]";
// Los datos tienen claves sin comillas, por lo que JSON.parse fallará.
// Se utiliza eval() de manera controlada al ser un script de depuración local.
const matches = eval(dataString);

function getResult(m) {
    if (!m.score || m.score.trim() === '') return { type: 'pending', pts: 0 };

    let cleanScore = m.score.replace(/\s/g, '');
    const parts = cleanScore.split('-');

    if (parts.length < 2) return { type: 'pending', pts: 0 };

    const locGoals = parseInt(parts[0]);
    const visGoals = parseInt(parts[1]);
    const isBanfieldLocal = m.local.toLowerCase().includes('banfield');

    // 1. Victoria/Derrota en tiempo reglamentario
    if (locGoals !== visGoals) {
        if (isBanfieldLocal) return locGoals > visGoals ? { type: 'win', pts: 3 } : { type: 'loss', pts: 0 };
        else return visGoals > locGoals ? { type: 'win', pts: 3 } : { type: 'loss', pts: 0 };
    }

    // 2. Definición por penales (Formato esperado: "1(4)-1(3)")
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

const targetTourney = "Copa Liga 2026 (Ap)";
const groupMatches = matches.filter(m => m.tourney === targetTourney);

console.log(`Analizando Torneo: ${targetTourney}`);
console.log(`Cantidad de partidos: ${groupMatches.length}`);

let points = 0;
let pendingCount = 0;

groupMatches.forEach(m => {
    const res = getResult(m);
    console.log(`ID: ${m.id} | ${m.local} vs ${m.visitor} | Resultado: "${m.score}" | Tipo: ${res.type} | Pts: ${res.pts}`);

    if (res.type === 'pending') pendingCount++;
    points += res.pts;
});

const potentialPoints = points + (pendingCount * 3);
console.log(`Puntos Actuales: ${points}`);
console.log(`Partidos Pendientes: ${pendingCount}`);
console.log(`Proyección Máxima de Puntos: ${potentialPoints}`);
