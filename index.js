#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Функция для копирования файлов и директорий
function copyFileSync(source, target) {
  const targetFile = target;

  // Если директория не существует, создаем её
  if (!fs.existsSync(path.dirname(targetFile))) {
    fs.mkdirSync(path.dirname(targetFile), { recursive: true });
  }

  fs.copyFileSync(source, targetFile);
}

function copyFolderRecursiveSync(source, target) {
  const files = fs.readdirSync(source);

  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  files.forEach(file => {
    const curSource = path.join(source, file);
    const curTarget = path.join(target, file);

    if (fs.lstatSync(curSource).isDirectory()) {
      copyFolderRecursiveSync(curSource, curTarget);
    } else {
      copyFileSync(curSource, curTarget);
    }
  });
}

// Функция для копирования шаблона в новый проект
function createProject(projectName) {
  const templatePath = path.join(__dirname, 'template');
  const projectPath = path.join(process.cwd(), projectName);

  // Копируем шаблон в новый проект
  copyFolderRecursiveSync(templatePath, projectPath);

  // Устанавливаем зависимости
  console.log('\n');
  console.log(`Project ${projectName} created successfully!`);
  console.log('\n');
  console.log('cd ' + projectName);
  console.log('npm i');
  console.log('npm run dev');
  console.log('\n');
}

// Получаем имя проекта из аргументов командной строки
const [,, command, projectName] = process.argv;

if (command !== 'create') {
  console.error('Invalid command. Use "create <project-name>".');
  process.exit(1);
}

if (!projectName) {
  console.error('Please provide a project name.');
  process.exit(1);
}

createProject(projectName);
