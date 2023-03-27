-- Add some departments
INSERT INTO departments (name) VALUES ('Sales'), ('Engineering'), ('Marketing');

-- Add some roles
INSERT INTO roles (title, salary, department_id) VALUES
('Sales Manager', 70000, 1),
('Sales Representative', 60000, 1),
('Software Engineer', 110000, 2),
('Web Developer', 82000, 2),
('Marketing Manager', 72000, 3),
('Marketing Coordinator', 90000, 3);

-- Add some employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Doe', 2, 1),
('Bob', 'Smith', 3, NULL),
('Alice', 'Johnson', 4, 3),
('Mark', 'Davis', 5, NULL),
('Emily', 'Wong', 6, 5);

