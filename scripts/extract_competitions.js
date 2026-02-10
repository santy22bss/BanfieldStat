const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '../database.json');
const OUTPUT_FILE = path.join(__dirname, '../competitions.json');

console.log('Reading database from:', DB_FILE);

try {
    if (!fs.existsSync(DB_FILE)) {
        console.error('database.json not found!');
        process.exit(1);
    }

    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    const matches = data.matches || [];

    const competitionsSet = new Set();
    matches.forEach(m => {
        if (m.tourney) {
            competitionsSet.add(m.tourney.trim());
        }
    });

    const competitionsList = Array.from(competitionsSet).map((name, index) => ({
        id: index + 1,
        name: name
    }));

    // Save strictly as an object containing the list, to allow future expansion
    const outputData = {
        competitions: competitionsList
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(outputData, null, 2));
    console.log(`✅ Successfully extracted ${competitionsList.length} competitions.`);
    console.log(`💾 Saved to: ${OUTPUT_FILE}`);

} catch (error) {
    console.error('Error during extraction:', error);
}
