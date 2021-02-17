INSERT INTO department (name)
VALUES
('Engineering'),
('Marketting & Sales'),
('Finance'),
(`Legal`);

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
('Juliet', 'Kirazci', 11, null),
('Jennifer', 'Gibbons', 2, 1),
('Ali', 'Ceasar', 4, null),
('Meg', 'Mahmoud', 9, 11),
('Marry', 'Salter', 7, 4),
('Dana', 'Keith', 10, 11),
('Albert', 'Davis', 3, 1),
('Francis', 'Labiran', 6, 4),
('Joe', 'Dempsey', 7, 4),
('Ahmet', 'Kaplan', 8, null),
('Jeff', 'Golden', 5, 4);