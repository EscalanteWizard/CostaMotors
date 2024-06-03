CREATE DATABASE costamotors; #creacion de la base de datos

use costamotors; #Uso de la base de datos

#Eliminacion de la tabla empleados
DROP TABLE IF EXISTS Empleados;

#Crear tabla de Empleados / diseñadores /usuarios
CREATE TABLE Empleados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    apellidos VARCHAR(100),
    correo VARCHAR(50),
    telefono VARCHAR(100),
    experiencia INT,
    usuario VARCHAR(50),
    contrasenia VARCHAR(50)
);

#Crear tabla disenios
CREATE TABLE Disenios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    transmision VARCHAR(100) NOT NULL,
    materialAsientos VARCHAR(100) NOT NULL,
    motor VARCHAR(100) NOT NULL,
    vidrios VARCHAR(100) NOT NULL,
    espejos VARCHAR(100) NOT NULL,
    sensoresDelanteros VARCHAR(100) NOT NULL,
    sensoresTraseros VARCHAR(100) NOT NULL,
    sensoresLaterales VARCHAR(100) NOT NULL,
    camara VARCHAR(100) NOT NULL,
    tableroMando VARCHAR(100) NOT NULL,
    impulso VARCHAR(100) NOT NULL,
    tapizado VARCHAR(100) NOT NULL,
    sistemaSonido VARCHAR(100) NOT NULL,
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

#insersión de prueba
CALL insertarEmpleado('Juan', 'Perez', 'juancho@gmail.com', '88881122', 5, 'superJuancho', 'juanchoPassword');

#scrip para consultar todos los empleados
SELECT * FROM empleados;

#para eliminar un procedimiento almacenado
DROP PROCEDURE IF EXISTS insertarEmpleado;

#Delimiter se usa para indicar que el delimitador (por defecto ";") se va a cambiar a el valor que le sigue, en este caso "//", esto para que SQL realice todos los sobprocesos aunque encuentre el punto y coma
DELIMITER // 
CREATE PROCEDURE insertarEmpleado(
    IN pNombre VARCHAR(100),
    IN pApellidos VARCHAR(100),
    IN pCorreo VARCHAR(50),
    IN pTelefono VARCHAR(100),
    IN pExperiencia INT,
    IN pUsuario VARCHAR(50),
    IN pContrasenia VARCHAR(50)
)
BEGIN
    INSERT INTO empleados (nombre, apellidos, correo, telefono, experiencia, usuario, contrasenia)
    VALUES (pNombre, pApellidos, pCorreo, pTelefono, pExperiencia, pUsuario, pContrasenia);
END //
DELIMITER ;

#procedimiento almacenado para consultar todos los empleados
DELIMITER // 
CREATE PROCEDURE consultarEmpleados()
BEGIN
    SELECT * FROM empleados;
END //
DELIMITER ;

#para eliminar un procedimiento almacenado
DROP PROCEDURE IF EXISTS actualizarEmpleado;

#Procedimiento almacenado para actualizar un empleado
DELIMITER //
CREATE PROCEDURE actualizarEmpleado(
    IN pId INT,
    IN pNombre VARCHAR(100),
    IN pApellidos VARCHAR(100),
    IN pCorreo VARCHAR(50),
    IN pTelefono VARCHAR(100),
    IN pExperiencia INT,
    IN pUsuario VARCHAR(50),
    IN pContrasenia VARCHAR(50)
)
BEGIN
    UPDATE empleados
    SET nombre = pNombre,
        apellidos = pApellidos,
        correo = pCorreo,
        telefono = pTelefono,
        experiencia = pExperiencia,
        usuario = pUsuario,
        contrasenia = pContrasenia
    WHERE id = pId;
END //
DELIMITER ;

#Procedimiento almacenado para eliminar el empleado por medio de su id
DELIMITER //
CREATE PROCEDURE eliminarEmpleado(
    IN pId INT
)
BEGIN
    DELETE FROM empleados
    WHERE id = pId;
END //
DELIMITER ;


#scrip para consultar todos los empleados
SELECT * FROM disenios;

#Procediiento almcacenado para guardar un nuevo disenio
DELIMITER //
CREATE PROCEDURE insertarDisenio(
    IN pNombre VARCHAR(100),
    IN pTransmision VARCHAR(100),
    IN pMaterialAsientos VARCHAR(100),
    IN pMotor VARCHAR(100),
    IN pVidrios VARCHAR(100),
    IN pEspejos VARCHAR(100),
    IN pSensoresDelanteros VARCHAR(100),
    IN pSensoresTraseros VARCHAR(100),
    IN pSensoresLaterales VARCHAR(100),
    IN pCamara VARCHAR(100),
    IN pTableroMando VARCHAR(100),
    IN pImpulso VARCHAR(100),
    IN pTapizado VARCHAR(100),
    IN pSistemaSonido VARCHAR(100)
)
BEGIN
    INSERT INTO Disenios (
        nombre,
        transmision,
        materialAsientos,
        motor,
        vidrios,
        espejos,
        sensoresDelanteros,
        sensoresTraseros,
        sensoresLaterales,
        camara,
        tableroMando,
        impulso,
        tapizado,
        sistemaSonido
    ) VALUES (
        pNombre,
        pTransmision,
        pMaterialAsientos,
        pMotor,
        pVidrios,
        pEspejos,
        pSensoresDelanteros,
        pSensoresTraseros,
        pSensoresLaterales,
        pCamara,
        pTableroMando,
        pImpulso,
        pTapizado,
        pSistemaSonido
    );
END //
DELIMITER ;

#Procedimiento almacenado para eliminar el disenio por medio de su id
DELIMITER //
CREATE PROCEDURE eliminarDisenio(
    IN pId INT
)
BEGIN
    DELETE FROM disenios
    WHERE id = pId;
END //
DELIMITER ;

#Procedimiento almacenado para actualizar la información de un disenio
DELIMITER //
CREATE PROCEDURE actualizarDisenio(
    IN pId INT,
    IN pNombre VARCHAR(100),
    IN pTransmision VARCHAR(100),
    IN pMaterialAsientos VARCHAR(100),
    IN pMotor VARCHAR(100),
    IN pVidrios VARCHAR(100),
    IN pEspejos VARCHAR(100),
    IN pSensoresDelanteros VARCHAR(100),
    IN pSensoresTraseros VARCHAR(100),
    IN pSensoresLaterales VARCHAR(100),
    IN pCamara VARCHAR(100),
    IN pTableroMando VARCHAR(100),
    IN pImpulso VARCHAR(100),
    IN pTapizado VARCHAR(100),
    IN pSistemaSonido VARCHAR(100)
)
BEGIN
    UPDATE Disenios
    SET
        nombre = pNombre,
        transmision = pTransmision,
        materialAsientos = pMaterialAsientos,
        motor = pMotor,
        vidrios = pVidrios,
        espejos = pEspejos,
        sensoresDelanteros = pSensoresDelanteros,
        sensoresTraseros = pSensoresTraseros,
        sensoresLaterales = pSensoresLaterales,
        camara = pCamara,
        tableroMando = pTableroMando,
        impulso = pImpulso,
        tapizado = pTapizado,
        sistemaSonido = pSistemaSonido
    WHERE id = pId;
END //
DELIMITER ;

#procedimiento almacenado para consultar todos los disenios
DELIMITER // 
CREATE PROCEDURE consultarDisenios()
BEGIN
    SELECT * FROM disenios;
END //
DELIMITER ;





