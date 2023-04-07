import * as readline from 'readline';
import fs from 'fs'
import cheerio from 'cheerio';
import{ HikePath } from './HikePath.js'
import { log } from 'console';
// C:\Users\Zakaria Mrad\Downloads\new.gpx
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Veuillez entrer le nom du path du complet: ', (answer) => {
  console.log(answer);
  fs.readFile(answer, (err, data) => {
    if (err) return console.log("Le fichier n'existe pas :(");

    let hike = new HikePath(data.toString(), answer)

  })
  rl.close();
});

