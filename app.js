const express = require("express");
const bodyParser= require("body-parser");
const ejs = require("ejs");
const mysql = require("mysql");
const path=require("path");

const app = express();
app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home");
});



/**********************************employee*****************************/
app.get("/employee",function(req,res){

  var sql1 = "SELECT * FROM employee";
  db.query(sql1, (error, results, fields) => {
    if (error) throw error;
    const employees=results;
    res.render("employee",{employees:employees}); 
  });
});


app.post('/addEmployee', function(req, res) {
  var employeeCode = parseInt(req.body.employee_code);
  var name = req.body.name;
  var age = parseInt(req.body.age);
  var sex = req.body.sex;

  if (isNaN(employeeCode) || isNaN(age)) {
    console.log('Invalid employee data');
    res.redirect('/employee');
    return;
  }

  var sql = 'INSERT INTO employee(employee_code, name, age, sex) VALUES (?, ?, ?, ?)';
  var values = [employeeCode, name, age, sex];

  db.query(sql, values, function(err, result) {
    if (err) {
      console.log('Error adding employee: ' + err.message);
    } else {
      console.log('Employee added successfully');
      res.redirect('/employee');
    }
  });
});





app.get('/searchEmployee', (req, res) => {
  const searchName = req.query.searchName;
  const query = "SELECT * FROM employee WHERE name LIKE '%" + searchName + "%'";
  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.send('Error searching for employee');
    } else {
      res.render('employee', { employees: results });
    }
  });
});



app.get('/searchByCode', function(req, res) {
  var employeeCode = req.query.employee_code;
  db.query('SELECT * FROM employee WHERE employee_code = ?', [employeeCode], function(error, results, fields) {
    if (error) throw error;
    res.render('employee', { employees: results });
  });
});


app.post('/employee-details', function(req, res) {
  var employeeCode = parseInt(req.body.employeeCode);
  
  if (isNaN(employeeCode)) {
    console.log('Invalid employee data');
    res.redirect('/employee');
    return;
  }

  var q1 = "SELECT * FROM employee INNER JOIN employee_contacts ON employee.employee_code = employee_contacts.employee_code INNER JOIN salary ON employee.employee_code = salary.employee_code WHERE employee.employee_code= ?; ";
  
  db.query(q1, [employeeCode], function(err, results) {
    if (err) {
      console.log('employee not found: ' + err.message);
    } else {
      res.render('employee-details',{results});
    }
  });
});


/*************************Add employee details*******************************************/









/***********************************customer*********************************************/

app.get("/customer",function(req,res){

  var sql2 = "SELECT * FROM customer";
  db.query(sql2, (error, results, fields) => {
    if (error) throw error;
    const customers=results;
    res.render("customer",{customers:customers}); 
  });

});

app.post('/addCustomer', function(req, res) {
  var customerCode = parseInt(req.body.customer_code);
  var name = req.body.name;
  var previous_money_dues= parseInt(req.body.previous_money_dues);

  if (isNaN(customerCode)) {
    console.log('Invalid customer data');
    res.redirect('/customer');
    return;
  }

  var sql3 = 'INSERT INTO customer(customer_code, name, previous_money_dues) VALUES (?, ?, ?, ?)';
  var cvalues = [customerCode, name,previous_money_dues];

  db.query(sql3, cvalues, function(err, result) {
    if (err) {
      console.log('Error adding customer: ' + err.message);
    } else {
      console.log('Customer added successfully');
      res.redirect('/customer');
    }
  });
});

app.get('/searchCustomer', (req, res) => {
  const searchName = req.query.searchName;
  const query = "SELECT * FROM customer WHERE name LIKE '%" + searchName + "%'";
  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.send('Error searching for customer');
    } else {
      res.render('customer', { customers: results });
    }
  });
});


app.get('/searchbycustomercode', function(req, res) {
  var customerCode = req.query.customer_code;
  db.query('SELECT * FROM customer WHERE customer_code = ?', [customerCode], function(error, results, fields) {
    if (error) throw error;
    res.render('customer', { customers: results });
  });
});

app.post('/customer-details', function(req, res) {
  var customerCode = parseInt(req.body.customerCode);
  
  if (isNaN(customerCode)) {
    console.log('Invalid customer data');
    res.redirect('/customer');
    return;
  }

  var q5 = "SELECT * FROM customer INNER JOIN cloth ON customer.customer_code = cloth.customer_code INNER JOIN bill ON customer.customer_code = bill.customer_code WHERE customer.customer_code= ?; ";
  
  db.query(q5, [customerCode], function(err, results) {
    if (err) {
      console.log('customer not found: ' + err.message);
    } else {
      res.render('customer-details',{results});
    }
  });
});



app.post('/bills', function(req, res) {
  var customerCode = parseInt(req.body.customerCode);
  
  if (isNaN(customerCode)) {
    console.log('Invalid customer data');
    res.redirect('/customer');
    return;
  }

  var q6 = "SELECT * FROM bill INNER JOIN customer ON customer.customer_code = bill.customer_code INNER JOIN bill ON customer.customer_code = bill.customer_code WHERE customer.customer_code= ?; ";
  
  db.query(q6, [customerCode], function(err, results) {
    if (err) {
      console.log('customer not found: ' + err.message);
    } else {
      res.render('customer-details',{results});
    }
  });
});






/***************************************************supplier******************************************************/
app.get("/supplier",function(req,res){

  var sql20 = "SELECT * FROM supplier";
  db.query(sql20, (error, results, fields) => {
    if (error) throw error;
    const suppliers=results;
    res.render("supplier",{suppliers:suppliers}); 
  });

});

app.post('/addSupplier', function(req, res) {
  var supplierCode = parseInt(req.body.supplier_code);
  var name = req.body.name;
  var total_dues= parseInt(req.body.total_dues);

  if (isNaN(supplierCode)) {
    console.log('Invalid supplier data');
    res.redirect('/supplier');
    return;
  }

  var sql30 = 'INSERT INTO supplier(supplier_code, name,total_dues) VALUES (?, ?, ?)';
  var hvalues = [supplierCode, name,total_dues];

  db.query(sql30, hvalues, function(err, result) {
    if (err) {
      console.log('Error adding supplier: ' + err.message);
    } else {
      console.log('supplier added successfully');
      res.redirect('/supplier');
    }
  });
});

app.get('/searchSupplier', (req, res) => {
  const sname = req.query.name;
  const sql40 = "SELECT * FROM supplier WHERE name LIKE '%" + sname + "%'";
  db.query(sql40, (error, results) => {
    if (error) {
      console.error(error);
      res.send('Error searching for supplier');
    } else {
      res.render('supplier', { suppliers: results}
      );
    }
  });
});


app.get('/searchSupplierbycode', function(req, res) {
  var supplierCode = req.query.supplier_code;
  db.query('SELECT * FROM supplier WHERE supplier_code = ?', [supplierCode], function(error, results, fields) {
    if (error) throw error;
    res.render('supplier', { suppliers: results });
  });
});














/******************************************************************************************************************/
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "laundry_management"
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("database connected");
});



app.listen(3000, function () {
  console.log("server started on port 3000");
});
