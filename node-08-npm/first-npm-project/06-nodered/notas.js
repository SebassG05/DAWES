const fs = require('fs');
const readline = require('readline');
const path = require('path');

const notesDir = './notas';

if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mainMenu() {
    console.log('1. Crear nueva nota');
    console.log('2. Editar nota existente');
    console.log('3. Eliminar nota');
    rl.question('Seleccione una opción: ', (option) => {
        switch (option) {
            case '1':
                createNote();
                break;
            case '2':
                editNote();
                break;
            case '3':
                deleteNote();
                break;
            default:
                console.log('Opción no válida');
                mainMenu();
        }
    });
}

function createNote() {
    rl.question('Ingrese el nombre de la nueva nota: ', (noteName) => {
        const notePath = path.join(notesDir, `${noteName}.note`);
        const noteStream = fs.createWriteStream(notePath, { flags: 'a' });
        console.log('Escriba su nota. Para terminar, ingrese dos líneas en blanco consecutivas.');
        let blankLines = 0;
        rl.on('line', (input) => {
            if (input.trim() === '') {
                blankLines++;
                if (blankLines === 2) {
                    noteStream.end();
                    console.log('Nota guardada.');
                    rl.removeAllListeners('line');
                    mainMenu();
                }
            } else {
                blankLines = 0;
                noteStream.write(input + '\n');
            }
        });
    });
}

function editNote() {
    fs.readdir(notesDir, (err, files) => {
        if (err) throw err;
        const noteFiles = files.filter(file => file.endsWith('.note'));
        if (noteFiles.length === 0) {
            console.log('No hay notas disponibles para editar.');
            mainMenu();
            return;
        }
        console.log('Notas disponibles:');
        noteFiles.forEach((file, index) => {
            console.log(`${index + 1}. ${file}`);
        });
        rl.question('Seleccione el número de la nota que desea editar: ', (number) => {
            const noteIndex = parseInt(number) - 1;
            if (noteIndex >= 0 && noteIndex < noteFiles.length) {
                const notePath = path.join(notesDir, noteFiles[noteIndex]);
                const noteStream = fs.createWriteStream(notePath, { flags: 'a' });
                console.log('Escriba su nota. Para terminar, ingrese dos líneas en blanco consecutivas.');
                let blankLines = 0;
                rl.on('line', (input) => {
                    if (input.trim() === '') {
                        blankLines++;
                        if (blankLines === 2) {
                            noteStream.end();
                            console.log('Nota guardada.');
                            rl.removeAllListeners('line');
                            mainMenu();
                        }
                    } else {
                        blankLines = 0;
                        noteStream.write(input + '\n');
                    }
                });
            } else {
                console.log('Número de nota no válido.');
                mainMenu();
            }
        });
    });
}

function deleteNote() {
    fs.readdir(notesDir, (err, files) => {
        if (err) throw err;
        const noteFiles = files.filter(file => file.endsWith('.note'));
        if (noteFiles.length === 0) {
            console.log('No hay notas disponibles para eliminar.');
            mainMenu();
            return;
        }
        console.log('Notas disponibles:');
        noteFiles.forEach((file, index) => {
            console.log(`${index + 1}. ${file}`);
        });
        rl.question('Seleccione el número de la nota que desea eliminar: ', (number) => {
            const noteIndex = parseInt(number) - 1;
            if (noteIndex >= 0 && noteIndex < noteFiles.length) {
                const notePath = path.join(notesDir, noteFiles[noteIndex]);
                fs.unlink(notePath, (err) => {
                    if (err) throw err;
                    console.log('Nota eliminada.');
                    mainMenu();
                });
            } else {
                console.log('Número de nota no válido.');
                mainMenu();
            }
        });
    });
}

mainMenu();