// DEPENDENCIES ===================================================
const inquirer = require('inquirer');
const connection = require("./db/connection.js");
const CFonts = require('cfonts');

// DATA ===========================================================
const initQs = [
    // Menu items
    {
       type: "list",
       name: "initialSelection",
       message: "What would you like to do?",
       choices: ["View all employees",
            //    "View all employees by department",
            //    "View all employees by manager",
                "Add a new employee",
            //    "Remove an employee",
            //    "Update employee role",
            //    "Update employee manager",
                "View all departments",
            //    "Add a department",
                "View all roles",
            //    "Add a role",
                "Exit"
           ]
   }
]

// FUNCTIONS ======================================================
// Welcome
CFonts.say ("Employee Tracker", {
    font: 'pallet',
    colors: ['greenBright', 'gray']
})

//SQL Connection
connection.connect((err) => {
    if (err) throw err;
    // console.log(`\nconnected SQL as id ${connection.threadId}\n`);
  });

//Process Inital Selection
const processSelected = (actionSelected) => {
    console.log(actionSelected);
    switch (actionSelected) {
        case "View all employees": viewAllEmployees();
            break;
        // case "View all employees by department": viewEmployeesByDept()
        //     break;
        // case "View all employees by manager": viewEmployeesByManager();
        //     break;
           case "Add a new employee": addEmployee();
               break;
        // case "Remove an employee": removeEmployee();
        //     break;
        // case "Update employee role": updateEmployeeRole();
        //     break;
        // case "Update employee manager": updateManager();
        //     break;
        case "View all departments": viewAllDepartments();
             break;
        // case "Add a department": addDepartment();
        //     break;
        case "View all roles": viewAllRoles();
             break;
        // case "Add a role": addRole();
        //     break;
        case "Exit":
            console.log("\n Thank you for using Employee Tracker \n");
            connection.end();
            break;
    }
};

//View all employees
const viewAllEmployees = () => {
    console.log('Selecting all employees...\n');
    const query = `SELECT employee.first_name AS "FIRST NAME",
    employee.last_name AS "LAST NAME",
    role.title AS "TITLE",
    department.name AS "DEPARTMENT",
    role.salary AS "SALARY",
    CONCAT(Manager.first_name, ' ', Manager.last_name) AS "MANAGER"
    FROM employee
    INNER JOIN role ON role.id = employee.role_id
    INNER JOIN department ON department.id = role.department_id
    LEFT JOIN employee AS Manager ON employee.manager_id = Manager.id
    ORDER BY employee.last_name;`;
    
    connection.query(query, (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement.
        console.table(res);
        start();
    });
};

//View all employees by department",
//View all employees by manager",
//Add an employee",
const addEmployee = () => {

}
//Remove an employee",
//Update employee role",
//Update employee manager",
//View all departments",
const viewAllDepartments = () => {
    console.log('Now viewing all departments...\n');
    const query = `SELECT * FROM department`;
        
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });

}
//Add a department",
//View all roles",
const viewAllRoles = () => {
    console.log('Now viewing all roles...\n');
    const query = `SELECT title, salary FROM role`;
    
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}
//Add a role",

// USER INTERACTIONS ==============================================
function start() {
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
}

start()