const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors()); 
app.use(express());
app.use(express.json());

//Conexion a la base de datos local mysql
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"PassSimple_1Payaso",
    database:"costamotors"
});

//Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        process.exit(1); // Termina el proceso si no puede conectar a la base de datos
    } else {
        console.log('Conectado a la base de datos');
    }
});

//test de conexión
app.get('/testConnection', (req, res) => {
    db.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta de prueba:', err);
            return res.status(500).send('Error de conexión');
        } else {
            res.send(`La solución es: ${results[0].solution}`);
        }
    });
});

//Metodo para llamar al procedimiento almacenado para agregar un nuevo empleado
app.post("/saveEmpleado", (req, res) => {
    const { nombre, edad, pais, cargo, experiencia } = req.body;

    if (!nombre || !edad || !pais || !cargo || !experiencia) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const sql = 'CALL insertarEmpleado(?, ?, ?, ?, ?)';
    const params = [nombre, edad, pais, cargo, experiencia];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error("Error al ejecutar el procedimiento almacenado:", err);
            return res.status(500).send("Error al registrar el empleado");
        } else {
            res.send("Empleado registrado con éxito!!");
        }
    });
});

//Metodo para consultar todos los empleados de la base de datos a través del rpocedimiento almacenado
app.get("/consultarEmpleados",(req,res)=>{
    const sql = 'CALL consultarEmpleados()';

    db.query(sql,(err, result) => {
        if (err) {
            console.error("Error al ejecutar el procedimiento almacenado:", err);
            return res.status(500).send("Error al consultar los empleados");
        } else {
            res.send(result);
        }
    });
});

//Metodo para llamar al procedimiento almacenado para actualizar la infomación de un empleado
app.put("/actualizarEmpleado", (req, res) => {
    const { id, nombre, edad, pais, cargo, experiencia } = req.body;

    if (!id || !nombre || !edad || !pais || !cargo || !experiencia) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const sql = 'CALL actualizarEmpleado(?, ?, ?, ?, ?, ?)';
    const params = [id, nombre, edad, pais, cargo, experiencia];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error("Error al ejecutar el procedimiento almacenado:", err);
            return res.status(500).send("Error al actualizar la infomación el empleado");
        } else {
            res.send("Empleado actualizado con éxito!!");
        }
    });
});

//setear el servidor a escuchar en el puerto 3007
app.listen(3007,()=>{
    console.log("Corriendo en el puerto 3007\n");
})