import fs from 'fs';
import readline from 'readline';
import path from 'path';
import process from 'node:process';

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
        handleOption(option);
    });
}

function handleOption(option) {
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
            rl.close();
    }
}

function createNote() {
    rl.question('Ingrese el nombre de la nota: ', (noteName) => {
        const filePath = path.join(notesDir, `${noteName}.txt`);
        rl.question('Ingrese el contenido de la nota: ', (content) => {
            fs.writeFileSync(filePath, content);
            console.log('Nota creada');
            rl.close();
        });
    });
}

function editNote() {
    rl.question('Ingrese el nombre de la nota a editar: ', (noteName) => {
        const filePath = path.join(notesDir, `${noteName}.txt`);
        if (fs.existsSync(filePath)) {
            rl.question('Ingrese el nuevo contenido de la nota: ', (content) => {
                fs.writeFileSync(filePath, content);
                console.log('Nota editada');
                rl.close();
            });
        } else {
            console.log('Nota no encontrada');
            rl.close();
        }
    });
}

function deleteNote() {
    rl.question('Ingrese el nombre de la nota a eliminar: ', (noteName) => {
        const filePath = path.join(notesDir, `${noteName}.txt`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log('Nota eliminada');
        } else {
            console.log('Nota no encontrada');
        }
        rl.close();
    });
}


mainMenu();
