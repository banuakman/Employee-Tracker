INSERT INTO department (name)
VALUES
('Engineering'),
('Marketting & Sales'),
('Finance'),
('Legal');

INSERT INTO role(title, salary, department_id)
VALUES
 ('Sales Manager', 175000, 2),
 ('Marketing Specialist', 125000, 2),
 ('Sales Person', 100000, 2),
 ('Chief Engineer', 185000, 1),
 ('Software Engineer', 1600000, 1),
 ('Quality Engineer', 1680000, 1),
 ('Junior Engineer', 80000, 1),
 ('Chief Financial Officer', 175000, 3),
 ('Budget Analyst', 130000, 3),
 ('Finance Clerk', 80000, 3),
 ('Lawyer', 190000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Banu', 'Akman', 1, null),
('Jennifer', 'Gibbons', 2, 1),
('Albert', 'Davis', 3, 1),
('Juliet', 'Kirazci', 11, null),
('Ali', 'Ceasar', 4, null),
('Jeff', 'Golden', 5, 5),
('Francis', 'Labiran', 6, 5),
('Marry', 'Salter', 7, 5),
('Joe', 'Dempsey', 7, 5),
('Ahmet', 'Kaplan', 8, null),
('Meg', 'Mahmoud', 9, 10),
('Dana', 'Keith', 10, 10);