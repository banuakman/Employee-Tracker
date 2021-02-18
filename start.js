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
// Welcome
CFonts.say ("Employee Tracker", {
    font: 'pallet',
    colors: ['greenBright', 'gray']
})

//SQL Connection
connection.connect((err) => {
    if (err) throw err;
    console.log(`\nconnected SQL as id ${connection.threadId}\n`);
  });

//Process Inital Selection
const processSelected = (actionSelected) => {
    console.log(actionSelected);

    switch (actionSelected) {
        case "View all employees": viewAllEmployees();
            break;
        case "View all employees by department": viewEmployeesByDept()
            break;
        case "View all employees by manager": viewEmployeesByManager();
            break;
        case "Add an employee": addEmployee();
            break;
        case "Remove an employee": removeEmployee();
            break;
        case "Update employee role": updateEmployeeRole();
            break;
        case "Update employee manager": updateManager();
            break;
        case "View all departments": viewAllDepartments();
            break;
        case "Add a department": addDepartment();
            break;
        case "View all roles": viewRoles();
            break;
        case "Add a role": addRole();
            break;
        case "Exit":
            console.log("\n Thank you for using Employee Tracker \n");
            connection.end();
            break;
    }
};

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
    processSelected(userResponse.initialSelection);
  })
  // If there is an error, write an error to the console.
  .catch(err => {
    console.error(err);
  })