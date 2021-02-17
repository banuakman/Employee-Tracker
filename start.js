const inquirer = require('inquirer');
const connection = require("./db/connection.js");
const CFonts = require('cfonts');

CFonts.say ("Employee Tracker", {
    font: 'pallet',
    colors: ['greenBright', 'gray']
})

