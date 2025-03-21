const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());

// Endpoint para descargar un archivo PDF
app.get('/download', (req, res) => {
    const filePath = path.join(__dirname, 'files', 'prueba-001.pdf'); // Ruta del archivo PDF
    /*r
    es.download(filePath, 'archivo_prueba.pdf', (err) => {
        if (err) {
            console.error("Error al enviar el archivo:", err);
            res.status(500).send("Error al descargar el archivo.");
        }
    });
    */
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error("Error al leer el archivo:", err);
            return res.status(500).json({ error: "Error al leer el archivo" });
        }

        const base64String = data.toString('base64'); // Convertir a Base64
        const response = {
            nombre: "prueba-001.pdf",
            archivo: "data:application/pdf;base64," + base64String
        };

        res.json(response);
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
