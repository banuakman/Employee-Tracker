// DEPENDENCIES ================================
const inquirer = require('inquirer');
const connection = require("./db/connection.js");
const CFonts = require('cfonts');

// DATA =======================================
const initQs = [
    // Menu items
    {
       type: "list",
       name: "initialSelection",
       message: "What would you like to do?",
       choices: ["View all employees",
               "View all employees by department",
               "View all employees by manager",
               "Add an employee",
               "Remove an employee",
               "Update employee role",
               "Update employee manager",
               "View all departments",
               "Add a department",
               "View all roles",
               "Add a role",
               "Exit"
           ]
   }
]

// FUNCTIONS ==================================

CFonts.say ("Employee Tracker", {
    font: 'pallet',
    colors: ['greenBright', 'gray']
})

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected SQL as id ${connection.threadId}`);
    connection.end();
  });

//View all employees

//View all employees by department",
//View all employees by manager",
//Add an employee",
//Remove an employee",
//Update employee role",
//Update employee manager",
//View all departments",
//Add a department",
//View all roles",
//Add a role",

// USER INTERACTIONS ==========================
inquirer
  .prompt(initQs)
  // Write a ReadMe file using the amswers to the prompts.
  .then(userResponse => {
    console.log("selected:", userResponse.initialSelection);
  })
  // If there is an error, write an error to the console.
  .catch(err => {
    console.error(err);
  })