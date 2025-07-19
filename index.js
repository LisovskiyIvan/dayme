#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { execSync } = require('child_process');

function copyFileSync(source, target) {
  const targetFile = target;

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
    // Пропускаем node_modules и другие системные папки
    if (file === 'node_modules' || file === '.git' || file === '.DS_Store') {
      return;
    }

    const curSource = path.join(source, file);
    const curTarget = path.join(target, file);

    if (fs.lstatSync(curSource).isDirectory()) {
      copyFolderRecursiveSync(curSource, curTarget);
    } else {
      copyFileSync(curSource, curTarget);
    }
  });
}

function createProject(projectName, template, packageManager, initGit) {
  const templatePath = path.join(__dirname, 'templates', template);
  const projectPath = path.join(process.cwd(), projectName);

  copyFolderRecursiveSync(templatePath, projectPath);

  // Создаем файл .npmrc для bun если выбран bun
  if (packageManager === 'bun') {
    const npmrcPath = path.join(projectPath, '.npmrc');
    fs.writeFileSync(npmrcPath, 'use-bun=true\n');
  }

  // Инициализируем Git репозиторий если выбрано
  if (initGit) {
    try {
      console.log('Initializing Git repository...');
      execSync('git init', { cwd: projectPath, stdio: 'inherit' });
      console.log('Git repository initialized successfully!');
    } catch (error) {
      console.log('Warning: Could not initialize Git repository. Make sure Git is installed.');
    }
  }

  console.log('\n');
  console.log(`Project ${projectName} created successfully!`);
  console.log('\n');
  console.log('cd ' + projectName);
  
  if (packageManager === 'bun') {
    console.log('bun install');
    console.log('bun run dev');
  } else {
    console.log('npm install');
    console.log('npm run dev');
  }
  
  if (initGit) {
    console.log('git add .');
    console.log('git commit -m "Initial commit"');
  }
  
  console.log('\n');
}

async function run() {
  const [, , command, projectName] = process.argv;

  if (command !== 'create') {
    console.error('Invalid command. Use "create <project-name>".');
    process.exit(1);
  }
  if (!projectName) {
    console.error('Project name is required.');
    process.exit(1);
  }

  const answers = await inquirer.createPromptModule()([
    {
      type: 'list',
      name: 'packageManager',
      message: 'Choose a package manager:',
      choices: [
        { name: 'npm', value: 'npm' },
        { name: 'bun', value: 'bun' }
      ],
    },
    {
      type: 'list',
      name: 'template',
      message: 'Choose a template:',
      choices: ['react', 'vue'],
    },
    {
      type: 'confirm',
      name: 'initGit',
      message: 'Initialize Git repository?',
      default: true,
    },
  ]);

  createProject(projectName, answers.template, answers.packageManager, answers.initGit);
}

run();