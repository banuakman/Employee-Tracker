DROP DATABASE IF EXISTS employeeTracker_DB;

CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

--DEPARTMENTS
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

--ROLES
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NULL,
    CONSTRAINT fk_department_id
        FOREIGN KEY (department_id)
        REFERENCES department(id),
    PRIMARY KEY (id)
);

-- EMPLOYEE
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT NULL,
    role_id INT NULL,
    CONSTRAINT fk_role_id
        FOREIGN KEY (role_id)
        REFERENCES role(id),
    CONSTRAINT fk_manager_id
        FOREIGN KEY (manager_id)
        REFERENCES employee(id)
            ON DELETE SET NULL,
    PRIMARY KEY (id)
);


--QUERY FOR ALL EMPLOYEE LIST
SELECT first_name, last_name, role.title, role.salary FROM employee
INNER JOIN role ON role.id = employee.role_id
INNER JOIN department ON department.id = role.department_id;
