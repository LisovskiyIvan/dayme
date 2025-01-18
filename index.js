#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

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
    const curSource = path.join(source, file);
    const curTarget = path.join(target, file);

    if (fs.lstatSync(curSource).isDirectory()) {
      copyFolderRecursiveSync(curSource, curTarget);
    } else {
      copyFileSync(curSource, curTarget);
    }
  });
}

function createProject(projectName, template) {
  const templatePath = path.join(__dirname, 'templates', template);
  const projectPath = path.join(process.cwd(), projectName);

  copyFolderRecursiveSync(templatePath, projectPath);

  console.log('\n');
  console.log(`Project ${projectName} created successfully!`);
  console.log('\n');
  console.log('cd ' + projectName);
  console.log('npm i');
  console.log('npm run dev');
  console.log('\n');

  console.log(`Project ${projectName} created successfully!`);
}

async function run() {
  const [,, command, projectName] = process.argv;

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
      name: 'template',
      message: 'Choose a template:',
      choices: ['react', 'vue'],
    },
  ]);

  createProject(projectName, answers.template);
}

run();