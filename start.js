// DEPENDENCIES ===================================================
const inquirer = require('inquirer');
const connection = require("./db/connection.js");
const CFonts = require('cfonts');

// DATA ===========================================================
const initQs = [
    {
       type: "list",
       name: "initialSelection",
       message: "What would you like to do?",
       choices: ["View all employees",
                 "View all departments",
                 "View all roles",
            //   "View all employees by department",
            //   "View all employees by manager",
                  "Add a new employee",
            //    "Remove an employee",
                  "Add a new department",
                  "Add a new role",
            //    "Update employee role",
            //    "Update employee manager",
                  "Exit"
                ]
   }
]

// FUNCTIONS ======================================================
// Welcome banner
CFonts.say ("Employee Tracker", {
    font: 'pallet',
    colors: ['greenBright', 'gray']
})

// SQL Connection
connection.connect((err) => {
    if (err) throw err;
    // console.log(`\nconnected SQL as id ${connection.threadId}\n`);
  });

// Process Inital Selection
const processSelected = (actionSelected) => {
    console.log(actionSelected);
    switch (actionSelected) {
        case "View all employees": viewAllEmployees();
            break;
        case "View all departments": viewAllDepartments();
            break;
        case "View all roles": viewAllRoles();
            break;
        // case "View all employees by department": viewEmployeesByDept()
        //     break;
        // case "View all employees by manager": viewEmployeesByManager();
        //     break;
        case "Add a new employee": addEmployee();
            break;
        // case "Remove an employee": removeEmployee();
        //     break;
        case "Add a department": addDepartment();
             break;
        case "Add a role": addRole();
             break;
        // case "Update employee role": updateEmployeeRole();
        //     break;
        // case "Update employee manager": updateManager();
        //     break;
        case "Exit":
            console.log("\n Thank you for using Employee Tracker \n");
            connection.end();
            break;
    }
};

// View all employees
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

// View all employees by department

// View all employees by manager

// Add an employee
const addEmployee = () => {
    let roleResults;
    let roleList = [];
    connection.query(`SELECT id, title FROM role ORDER BY title`, (err, results) => {
        if (err) throw err;
        roleResults = results;
        results.forEach(({title}) => {
            roleList.push(title);
        });
    });

    let managerResults;
    let managerList = ["None"];
    connection.query(`SELECT id, CONCAT(last_name, ', ', first_name) AS name FROM employee ORDER BY last_name, first_name`,
        (err, results) => {
            if (err) throw err;
            managerResults = results;
            results.forEach(({name}) => {
            managerList.push(name);
        });
    });

    inquirer
        .prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?",
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?",
        },
        {
            name: "title",
            type: "list",
            choices: roleList,
            message: "Select the employee's role.",
        },
        {
            name: "manager",
            type: "list",
            choices: managerList,
            message: "Select the employee's manager.",
        },

    ])
    .then((answer) => {
        let chosenRole;
        roleResults.forEach((role) => {
            if (role.title === answer.title) {
                chosenRole = role.id;
            }
        });

        let chosenManager = null;
        if (answer.manager != "None") {
            managerResults.forEach((manager) => {
                if ((manager.name === answer.manager)) {
                    chosenManager = manager.id;
                }
            });
        };
        
        connection.query(
            'INSERT INTO employee SET ?',
            {
                last_name: answer.last_name,
                first_name: answer.first_name,
                role_id: chosenRole,
                manager_id: chosenManager,
            },
            (err) => {
                if (err) throw err;
                console.log("\nThe employee", answer.first_name, answer.last_name, "was created successfully!\n");
                start();
            }
        );
    });
};
// Remove an employee

// Update employee role

// Update employee manager

// View all departments
const viewAllDepartments = () => {
    console.log('Now viewing all departments...\n');
    const query = `SELECT * FROM department`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

//Add a department
const addDepartment = () => {
    const query = `INSERT INTO department SET ?`;
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "What department would you like to add?",
        })
      .then((answer) => {
            connection.query(query, { name: answer.department }, (err) => {
            if (err) throw err;
            console.log("You created", answer.department, "department successfully!");
            start();
            });
        });
}

//View all roles
const viewAllRoles = () => {
    console.log('Now viewing all roles...\n');
    const query = `SELECT title, salary FROM role`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}
// Add a role
const addRole = () => {
    const query = `SELECT * FROM department`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        allDepartments = res.map((results) => results.name);

        inquirer
            .prompt([
                { type: "input",
                message: "What is the name of the new title?",
                name: "newTitle",
                },
                { type: "input",
                message: "What is the salary of the new position?",
                name: "newSalary",
                },
                { type: "list",
                name: "department",
                message: "Select the department to add the new title",
                choices: allDepartments,
                },
            ])
            .then((answer) => {
                connection.query(
                `INSERT INTO role(Title, Salary, department_id) VALUES 
                ("${answer.newTitle}", "${answer.newSalary}", (SELECT id FROM department WHERE name = "${answer.department}"));`
                );
                console.log("You created", answer.newTitle, "in", answer.department, "department successfully!");
                start();
            });
    }); 
}

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