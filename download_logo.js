const axios = require('axios');
const fs = require('fs');

async function download() {
    const url = "https://upload.wikimedia.org/wikipedia/commons/e/ea/Talleres_ba_logo.png";
    const path = "public/img/talleres_escalada.png";

    try {
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream',
            headers: { 'User-Agent': 'BanfieldApp/1.0' }
        });

        response.data.pipe(fs.createWriteStream(path));
        console.log("Descarga completada: " + path);
    } catch (e) {
        console.log("Error en la descarga: " + e.message);
    }
}
download();
