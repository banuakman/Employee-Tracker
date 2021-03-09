// DEPENDENCIES ===================================================
const inquirer = require("inquirer");
const connection = require("./db/connection.js");
const CFonts = require("cfonts");

// DATA ===========================================================
let roleResults;
let roleList = [];
let chosenRole;

let managerResults;
let managerList = ["None"];
let chosenManager = null;

let employeeResults;
let employeeList = [];
let chosenEmployee = null;

const initQs = [
  {
    type: "list",
    name: "initialSelection",
    message: "What would you like to do?",
    choices: [
      "View all employees",
      "View all departments",
      "View all roles",
      "View all employees ordered by department",
      "View all employees ordered by manager",
      "Add a new employee",
      "Remove an employee",
      "Add a new department",
      "Add a new role",
      "Update employee role",
      "Exit",
    ],
  },
];

// FUNCTIONS ======================================================
// Welcome banner
CFonts.say("Employee Tracker", {
  font: "pallet",
  colors: ["greenBright", "gray"],
});

// SQL Connection
connection.connect((err) => {
  if (err) throw err;
  // console.log(`\nconnected SQL as id ${connection.threadId}\n`);
});

// Process Inital Selection
const processSelected = (actionSelected) => {
  console.log(actionSelected);
  switch (actionSelected) {
    case "View all employees":
      viewAllEmployees();
      break;
    case "View all departments":
      viewAllDepartments();
      break;
    case "View all roles":
      viewAllRoles();
      break;
    case "View all employees ordered by department":
      viewEmployeesByDept();
      break;
    case "View all employees ordered by manager":
      viewEmployeesByManager();
      break;
    case "Add a new employee":
      addEmployee();
      break;
    case "Remove an employee":
      removeEmployee();
      break;
    case "Add a new department":
      addDepartment();
      break;
    case "Add a new role":
      addRole();
      break;
    case "Update employee role":
      updateEmployeeRole();
      break;
    case "Exit":
      console.log("\n Thank you for using Employee Tracker \n");
      connection.end();
      break;
  }
};
// Role List
const updateRoleList = () => {
  connection.query(
    `SELECT id, title FROM role ORDER BY title`,
    (err, results) => {
      if (err) throw err;
      roleResults = results;
      results.forEach(({ title }) => {
        roleList.push(title);
      });
    }
  );
};

// Employee List
const updateEmployeeList = () => {
  connection.query(
    `SELECT id, CONCAT(last_name, ', ', first_name) AS name FROM employee ORDER BY last_name, first_name`,
    (err, results) => {
      if (err) throw err;
      employeeResults = results;
      results.forEach(({ name }) => {
        employeeList.push(name);
      });
    }
  );
};

// Manager List
const updateManagerList = () => {
  connection.query(
    `SELECT id, CONCAT(last_name, ', ', first_name) AS name FROM employee ORDER BY last_name, first_name`,
    (err, results) => {
      if (err) throw err;
      managerResults = results;
      results.forEach(({ name }) => {
        managerList.push(name);
      });
    }
  );
};
// View all employees
const viewAllEmployees = () => {
  console.log("Selecting all employees...\n");
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
const viewEmployeesByDept = () => {
  console.log("\nSelecting all employees grouped by department...\n");
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
    ORDER BY department.name;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement.
    console.table(res);
    start();
  });
};

// View all employees by manager
const viewEmployeesByManager = () => {
  console.log("\nSelecting all employees grouped by department...\n");
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
    ORDER BY Manager.last_name, Manager.first_name;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement.
    console.table(res);
    start();
  });
};

// Add an employee
const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the new employee's first name?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the new employee's last name?",
      },
      {
        name: "title",
        type: "list",
        choices: roleList,
        message: "Select the new employee's role.",
      },
      {
        name: "manager",
        type: "list",
        choices: managerList,
        message: "Select the new employee's manager.",
      },
    ])
    .then((answer) => {
      roleResults.forEach((role) => {
        if (role.title === answer.title) {
          chosenRole = role.id;
        }
      });

      if (answer.manager != "None") {
        managerResults.forEach((manager) => {
          if (manager.name === answer.manager) {
            chosenManager = manager.id;
          }
        });
      }

      connection.query(
        "INSERT INTO employee SET ?",
        {
          last_name: answer.last_name,
          first_name: answer.first_name,
          role_id: chosenRole,
          manager_id: chosenManager,
        },
        (err) => {
          if (err) throw err;
          console.log(
            "\nThe employee",
            answer.first_name,
            answer.last_name,
            "was created successfully!\n"
          );
          updateEmployeeList();
          start();
        }
      );
    });
};
// Remove an employee
const removeEmployee = () => {
  inquirer
    // Prompt for the employee name.
    .prompt([
      {
        name: "employee",
        type: "list",
        choices: employeeList,
        message: "Which employee do you want to delete?",
      },
    ])
    .then((answer) => {
      // Locate the chosen employee object
      employeeResults.forEach((employee) => {
        if (employee.name === answer.employee) {
          chosenEmployee = employee.id;
        }
      });
      // Delete the chosen employee with the id.
      connection.query(
        "DELETE FROM employee WHERE ?",
        {
          id: chosenEmployee,
        },
        (err) => {
          if (err) throw err;
          console.log("The employee is removed successfully!");
          // Display the main menu.
          updateEmployeeList();
          start();
        }
      );
    });
};

// Update employee role
const updateEmployeeRole = () => {
  const updateQs = [
    {
      name: "employee",
      type: "list",
      message: "Which Employee would you like to update?",
      choices: employeeList,
    },
    {
      name: "title",
      type: "list",
      message: "Select the employee's new title.",
      choices: roleList,
    },
  ];
  inquirer.prompt(updateQs).then((answer) => {
    // Find the chosen role object in order to get the id.
    let chosenRole;

    roleResults.forEach((role) => {
      if (role.title === answer.title) {
        chosenRole = role.id;
      }
    });

    // Find the chosen employee object by matching first name and last name in order to get the id.
    employeeResults.forEach((employee) => {
      if (employee.name === answer.employee) {
        chosenEmployee = employee.id;
      }
    });

    connection.query(
      "UPDATE employee SET ? WHERE ?",
      [{ role_id: chosenRole }, { id: chosenEmployee }],
      (err) => {
        if (err) throw err;
        console.log(
          answer.employee,
          "'s role is changed to",
          answer.title,
          "\n"
        );
        updateManagerList();
        start();
      }
    );
  });
};

// View all departments
const viewAllDepartments = () => {
  console.log("Now viewing all departments...\n");
  const query = `SELECT * FROM department`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

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
        console.log(
          "You created",
          answer.department,
          "department successfully!"
        );
        start();
      });
    });
};

//View all roles
const viewAllRoles = () => {
  console.log("Now viewing all roles...\n");
  const query = `SELECT title, salary FROM role`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

// Add a role
const addRole = () => {
  const query = `SELECT * FROM department`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    allDepartments = res.map((results) => results.name);

    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the new title?",
          name: "newTitle",
        },
        {
          type: "input",
          message: "What is the salary of the new position?",
          name: "newSalary",
        },
        {
          type: "list",
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
        console.log(
          "You created",
          answer.newTitle,
          "in",
          answer.department,
          "department successfully!"
        );
        updateRoleList();
        start();
      });
  });
};

// USER INTERACTIONS ==============================================
function start() {
  inquirer
    .prompt(initQs)
    // Write a ReadMe file using the amswers to the prompts.
    .then((userResponse) => {
      processSelected(userResponse.initialSelection);
    })
    // If there is an error, write an error to the console.
    .catch((err) => {
      console.error(err);
    });
}
updateRoleList();
updateEmployeeList();
updateManagerList();
start();
