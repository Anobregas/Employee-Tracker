const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const fs = require('fs');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_db',
  multipleStatements: true
});

//connection.connect((err) => {
// if (err) throw err;
//console.log("Connected!");
//});



connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");

  // Read and execute the seed SQL file
  const sql = fs.readFileSync('./db/seeds.sql', 'utf8');
  connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log("Seed data inserted successfully!");
  });
});



// Prompt the user to choose an option
inquirer.prompt([
  {
    type: 'list',
    name: 'option',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role'
    ]
  }
]).then((answer) => {
  switch (answer.option) {
    case 'View all departments':
      connection.query('SELECT * FROM departments', (err, results) => {
        if (err) throw err;
        console.table(results);
      });
      break;
    case 'View all roles':
      connection.query('SELECT * FROM roles', (err, results) => {
        if (err) throw err;
        console.table(results);
      });
      break;
    case 'View all employees':
      connection.query('SELECT * FROM employees', (err, results) => {
        if (err) throw err;
        console.table(results);
      });
      break;
    case 'Add a department':
      inquirer.prompt([
        {
          type: 'input',
          name: 'departmentName',
          message: 'Enter the name of the new department:'
        }
      ]).then((answer) => {
        connection.query('INSERT INTO departments SET ?', { name: answer.departmentName }, (err) => {
          if (err) throw err;
          console.log('Department added successfully!');
        });
      });
      break;
    case 'Add a role':
      // Prompt the user to enter the name, salary, and department for the new role
      inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the name of the new role:'
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary for the new role:'
        },
        {
          type: 'input',
          name: 'department_id',
          message: 'Enter the department ID for the new role:'
        }
      ]).then((answer) => {
        connection.query('INSERT INTO roles SET ?', {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id
        }, (err) => {
          if (err) throw err;
          console.log('Role added successfully!');
        });
      });
      break;
    case 'Add an employee':
      // Prompt the user to enter the employee's first name, last name, role, and manager
      inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: "Enter the employee's first name:"
        },
        {
          type: 'input',
          name: 'last_name',
          message: "Enter the employee's last name:"
        },
        {
          type: 'input',
          name: 'role_id',
          message: "Enter the employee's role ID:"
        },
        {
          type: 'input',
          name: 'manager_id',
          message: "Enter the employee's manager ID:"
        }
      ]).then((answer) => {
        connection.query('INSERT INTO employees SET ?', {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id
        }, (err) => {
          if (err) throw err;

          console.log('Employee added successfully!');
        });
      });
      break;
    case 'Update an employee role':
      // Prompt the user to select an employee to update and their new role
      connection.query('SELECT * FROM employees', (err, results) => {
        if (err) throw err;
        inquirer.prompt([
          {
            type: 'list',
            name: 'employeeId',
            message: 'Which employee would you like to update?',
            choices: results.map((employee) => ({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id
            }))
          },
          {
            type: 'input',
            name: 'newRoleId',
            message: 'Enter the new role ID for the employee:'
          }
        ]).then((answer) => {
          connection.query('UPDATE employees SET role_id = ? WHERE id = ?', [answer.newRoleId, answer.employeeId], (err) => {
            if (err) throw err;
            console.log('Employee role updated successfully!');
          });
        });
      });
      break;
    default:
      console.log('Invalid option');
  }
});
