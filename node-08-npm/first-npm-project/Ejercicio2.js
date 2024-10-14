// Importar los módulos necesarios
import { faker } from '@faker-js/faker';
import chalk from 'chalk';

// Array con los diferentes colores disponibles en chalk
const colors = [
  chalk.red,
  chalk.green,
  chalk.blue,
  chalk.yellow,
  chalk.magenta,
  chalk.cyan,
  chalk.white,
  chalk.gray,
];

// Generar un nombre aleatorio
const randomName = faker.name.firstName();

// Seleccionar un color aleatorio
const randomColor = colors[Math.floor(Math.random() * colors.length)];

// Imprimir el nombre aleatorio con el color aleatorio
console.log(randomColor(randomName));
