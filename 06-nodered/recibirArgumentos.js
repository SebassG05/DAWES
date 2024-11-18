const fs = require('fs');
const path = require('path');

// Obtener el nombre del archivo desde los argumentos de la línea de comandos
const nombreArchivo = process.argv[2];

if (!nombreArchivo) {
    console.error('Por favor, proporciona un nombre de archivo como argumento.');
    process.exit(1);
}

// Resolver la ruta completa del archivo
const rutaArchivo = path.resolve(nombreArchivo);

// Leer e imprimir el contenido del archivo
fs.readFile(rutaArchivo, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error al leer el archivo: ${err.message}`);
        process.exit(1);
    }
    console.log(data);
});