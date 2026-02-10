const axios = require('axios');

async function test() {
    try {
        console.log("Probando búsqueda de escudo para 'Talleres de Remedios de Escalada'...");
        const res1 = await axios.post('http://localhost:3000/api/fetch-logo', { teamName: 'Talleres de Remedios de Escalada' });
        console.log("Resultado:", res1.data);
    } catch (e) {
        console.error("Error:", e.response ? e.response.data : e.message);
    }
}

test();
