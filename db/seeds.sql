-- Add some departments
INSERT INTO departments (name) VALUES ('Sales'), ('Engineering'), ('Marketing');

-- Add some roles
INSERT INTO roles (title, salary, department_id) VALUES
('Sales Manager', 80000, 1),
('Sales Representative', 50000, 1),
('Software Engineer', 100000, 2),
('Web Developer', 80000, 2),
('Marketing Manager', 70000, 3),
('Marketing Coordinator', 50000, 3);

-- Add some employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Doe', 2, 1),
('Bob', 'Smith', 3, NULL),
('Alice', 'Johnson', 4, 3),
('Mark', 'Davis', 5, NULL),
('Emily', 'Wong', 6, 5);

