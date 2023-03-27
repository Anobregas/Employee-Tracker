-- Get all departments
SELECT id, name FROM departments;

-- Get all roles with department information
SELECT r.id, r.title, r.salary, d.name AS department
FROM roles r
INNER JOIN departments d ON r.department_id = d.id;

-- Get all employees with role and manager information
SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employees e
INNER JOIN roles r ON e.role_id = r.id
INNER JOIN departments d ON r.department_id = d.id
LEFT JOIN employees m ON e.manager_id = m.id;

-- Add a new department
INSERT INTO departments (name) VALUES ('New Department');

-- Add a new role
INSERT INTO roles (title, salary, department_id) VALUES ('New Role', 60000, 4);

-- Add a new employee
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Smith', 6, NULL);

-- Update an employee's role
UPDATE employees SET role_id = 5 WHERE id = 2;
