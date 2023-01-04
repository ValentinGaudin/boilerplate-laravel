#!/usr/bin/env node
const exec = require('child_process').exec;
const readline = require('readline');
const fs = require('fs');

const cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function askQuestion(question) {
  return new Promise((resolve, reject) => {
    cli.question(question, answer => {
      resolve(answer);
    });
  });
}

async function prompt(prompt) {
  return new Promise((resolve, reject) => {

  })
}

async function getAppName() {
  return await askQuestion("What's the name app ? ");
}

async function getFrameworkChoice() {
  console.log('Quel framework souhaitez-vous utiliser ?');
  console.log('1. React');
  console.log('2. Vue');
  return await askQuestion('Entrez le numéro du framework souhaité : ');
}

async function getInformation() {
  return
  console.log('Do you want an API or a complete application ?');
  console.log('1. APi');
  console.log('2. Application');
  return await askQuestion(': ');
}

async function createAppDirectory(appName) {
  return new Promise((resolve, reject) => {
    fs.mkdir(appName, { recursive: true }, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function addLineToFile(filePath, line) {
  return new Promise((resolve, reject) => {
    fs.appendFile(filePath, line + '\n', 'utf8', err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}


async function cloneFramework(framework, appName) {
  if (framework === 'React') {
    exec(` ${appName}/platform git clone https://github.com/facebook/react.git ${appName}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erreur lors de l'exécution de la commande : ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  } else if (framework === 'Vue') {
    exec(`${appName}/platform git clone https://github.com/vuejs/vue.git ${appName}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erreur lors de l'exécution de la commande : ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  } else {
    console.log('Erreur : framework non reconnu');
  }
}

async function main() {
  let appName;
  let choice;


  while (true) {
    appName = await getAppName();

    choice = await getFrameworkChoice();

    // TODO fichier docker concerné
    // await addLineToFile('/chemin/du/fichier.txt', `APP_NAME=${appName}`);

    if (choice === '1' || choice === '2') {
      break;
    } else {
      console.log('Erreur : choix non reconnu, veuillez réessayer');
    }
  }

  await createAppDirectory(appName);

  let framework;
  if (choice === '1') {
    framework = 'React';
  } else if (choice === '2') {
    framework = 'Vue';
  }

  // await cloneFramework(framework, appName);

  cli.close();

  return Promise.resolve();
}

main()
    .then(r => {
      console.log(r)
    })
    .catch(error => {
      console.log(error)
    });