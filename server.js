const express = require("express");
const mysql = require("mysql2");
const path = require("path");

// create the Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// set up the MySQL database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_db",
});

// test the database connection
db.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
    } else {
        console.log("Connected to database!");
    }
});

// set up routes
//app.get('/', (req, res) =>
   // res.sendFile(path.join(__dirname, '/index.js'))
//);

// GET all departments
app.get("/departments", (req, res) => {
    db.query("SELECT * FROM departments", (err, results) => {
        if (err) {
            console.error("Error retrieving departments:", err);
            res.status(500).send("Error retrieving departments");
        } else {
            res.json(results);
        }
    });
});

// GET all roles
app.get("/roles", (req, res) => {
    db.query(
        "SELECT roles.*, departments.name AS department_name FROM roles INNER JOIN departments ON roles.department_id = departments.id",
        (err, results) => {
            if (err) {
                console.error("Error retrieving roles:", err);
                res.status(500).send("Error retrieving roles");
            } else {
                res.json(results);
            }
        }
    );
});

// GET all employees
app.get("/employees", (req, res) => {
    db.query(
        "SELECT employees.*, roles.title AS role_title, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager_name FROM employees INNER JOIN roles ON employees.role_id = roles.id LEFT JOIN employees AS managers ON employees.manager_id = managers.id",
        (err, results) => {
            if (err) {
                console.error("Error retrieving employees:", err);
                res.status(500).send("Error retrieving employees");
            } else {
                res.json(results);
            }
        }
    );
});

// POST add department
app.post("/departments", (req, res) => {
    const { name } = req.body;
    db.query("INSERT INTO departments (name) VALUES (?)", [name], (err, result) => {
        if (err) {
            console.error("Error adding department:", err);
            res.status(500).send("Error adding department");
        } else {
            res.status(201).send("Department added successfully");
        }
    });
});

// POST add role
app.post("/roles", (req, res) => {
    const { title, salary, department_id } = req.body;
    db.query(
        "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
        [title, salary, department_id],
        (err, result) => {
            if (err) {
                console.error("Error adding role:", err);
                res.status(500).send("Error adding role");
            } else {
                res.status(201).send("Role added successfully");
            }
        }
    );
});

// POST add employee
app.post("/employees", (req, res) => {
    const { first_name, last_name, role_id, manager_id } = req.body;
    db.query(
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [first_name, last_name, role_id, manager_id],
        (err, result) => {
            if (err) {
                console.error("Error addingemployee:", err);
                res.status(500).send("Error adding employee");
            } else {
                res.status(201).send("Employee added successfully");
            }
        }
    );
});

// PUT update employee role
app.put("/employees/:id", (req, res) => {
    const { id } = req.params;
    const { role_id } = req.body;
    db.query("UPDATE employees SET role_id = ? WHERE id = ?", [role_id, id], (err, result) => {
        if (err) {
            console.error("Error updating employee:", err);
            res.status(500).send("Error updating employee");
        } else if (result.affectedRows === 0) {
            res.status(404).send("Employee not found");
        } else {
            res.send("Employee updated successfully");
        }
    });
});

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${ PORT }`));


