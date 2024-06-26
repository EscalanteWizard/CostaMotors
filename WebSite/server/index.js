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

/**Métodos del api para el módulo de usuarios */

//Metodo para llamar al procedimiento almacenado para agregar un nuevo empleado
app.post("/saveEmpleado", (req, res) => {
    const { nombre, apellidos, correo, telefono, experiencia, usuario, contrasenia } = req.body;

    if (!nombre || !apellidos || !correo || !telefono || !experiencia || !usuario || !contrasenia) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const sql = 'CALL insertarEmpleado(?, ?, ?, ?, ?, ?, ?)';
    const params = [nombre, apellidos, correo, telefono, experiencia, usuario, contrasenia];

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
    const { id, nombre, apellidos, correo, telefono, experiencia, usuario, contrasenia } = req.body;

    if (!id || !nombre || !apellidos || !correo || !telefono || !experiencia || !usuario || !contrasenia) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const sql = 'CALL actualizarEmpleado(?, ?, ?, ?, ?, ?, ?, ?)';
    const params = [id, nombre, apellidos, correo, telefono, experiencia, usuario, contrasenia];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error("Error al ejecutar el procedimiento almacenado:", err);
            return res.status(500).send("Error al actualizar la infomación el empleado");
        } else {
            res.send("Empleado actualizado con éxito!!");
        }
    });
});

//Metodo del backEnd para llamar al procedimiento almacenado para borrar un empleado de la tabla de empleados por medio del id
app.delete("/eliminarEmpleado/:id", (req, res) => {
    const {id}=req.params;

    const sql = 'CALL eliminarEmpleado(?)';
    const params = [id];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error("Error al ejecutar el procedimiento almacenado:", err);
            return res.status(500).send("Error al borrar la infomación el empleado");
        } else {
            res.send("Empleado eliminado con éxito!!");
        }
    });
});

/**Métodos del api para el módulo de Disenios */

//Metodo para llamar al procedimiento almacenado para agregar un nuevo disenio
app.post("/saveDisenio", (req, res) => {
    const {nombre, transmision, materialAsientos, motor, vidrios, espejos, sensoresDelanteros, sensoresTraseros, sensoresLaterales, camara, tableroMando, impulso, tapizado, sistemaSonido} = req.body;

    if (!nombre || !transmision || !materialAsientos || !motor || !vidrios || !espejos || !sensoresDelanteros || !sensoresTraseros || !sensoresLaterales || !camara || !tableroMando || !impulso || !tapizado || !sistemaSonido) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const sql = 'CALL insertarDisenio(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const params = [nombre, transmision, materialAsientos, motor, vidrios, espejos, sensoresDelanteros, sensoresTraseros, sensoresLaterales, camara, tableroMando, impulso, tapizado, sistemaSonido];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error("Error al ejecutar el procedimiento almacenado:", err);
            return res.status(500).send("Error al registrar el disenio");
        } else {
            res.send("Disenio registrado con éxito!!");
        }
    });
});

//Metodo para consultar todos los disenios de la base de datos a través del procedimiento almacenado
app.get("/consultarDisenios",(req,res)=>{
    const sql = 'CALL consultarDisenios()';

    db.query(sql,(err, result) => {
        if (err) {
            console.error("Error al ejecutar el procedimiento almacenado:", err);
            return res.status(500).send("Error al consultar los disenios");
        } else {
            res.send(result);
        }
    });
});

//Metodo para llamar al procedimiento almacenado para actualizar la infomación de un disenio
app.put("/actualizarDisenio", (req, res) => {
    const {nombre, transmision, materialAsientos, motor, vidrios, espejos, sensoresDelanteros, sensoresTraseros, sensoresLaterales, camara, tableroMando, impulso, tapizado, sistemaSonido} = req.body;

    if (!nombre || !transmision || !materialAsientos || !motor || !vidrios || !espejos || !sensoresDelanteros || !sensoresTraseros || !sensoresLaterales || !camara || !tableroMando || !impulso || !tapizado || !sistemaSonido) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const sql = 'CALL insertarDisenio(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const params = [nombre, transmision, materialAsientos, motor, vidrios, espejos, sensoresDelanteros, sensoresTraseros, sensoresLaterales, camara, tableroMando, impulso, tapizado, sistemaSonido];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error("Error al ejecutar el procedimiento almacenado:", err);
            return res.status(500).send("Error al actualizar la infomación del disenio");
        } else {
            res.send("Disenio actualizado con éxito!!");
        }
    });
});

//Metodo del backEnd para llamar al procedimiento almacenado para borrar un disenio de la tabla de disenios por medio del id
app.delete("/eliminarDisenio/:id", (req, res) => {
    const {id}=req.params;

    const sql = 'CALL eliminarDisenio(?)';
    const params = [id];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error("Error al ejecutar el procedimiento almacenado:", err);
            return res.status(500).send("Error al borrar la infomación del disenio");
        } else {
            res.send("Disenio eliminado con éxito!!");
        }
    });
});

//setear el servidor a escuchar en el puerto 3007
app.listen(3007,()=>{
    console.log("Corriendo en el puerto 3007\n");
})