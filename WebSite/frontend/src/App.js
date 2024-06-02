import './App.css';
import {useState} from "react";
import React from 'react';
import Axios from "axios";

function App() {

  const [nombre,setNombre] = useState("");
  const [edad,setEdad] = useState(0);
  const [pais,setPais] = useState("");
  const [cargo,setCargo] = useState("");
  const [experiencia,setExperiencia] = useState("");

  //Constante para guardar la lista de los empleados al realizar la consulta de la tabla de empleados de la bd
  const [empleadosList,setEmpleados]=useState([]);

  //Metodo del frontEnd para enviar al backEnd una peticion para guardar un nuevo empleado en la base de datos
  const addEmpleado = ()=>{
    // Verificar si algún campo está vacío
    if (!nombre || !edad || !pais || !cargo || !experiencia) {
      alert("Todos los campos son obligatorios");
      getEmpleados();
      return; // Salir de la función si algún campo está vacío
  }
    Axios.post("http://localhost:3007/saveEmpleado",{
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      experiencia:experiencia
    }).then(()=>{
      getEmpleados();
      alert("Empleado registrado con éxito!");
    }).catch((error) => {
      console.error("Error al registrar el empleado:", error);
      alert("Error al registrar el empleado");
    });
  }

  //Metodo del frontEnd para enviar al backEnd una peticion para consultar todos los empleados
  const getEmpleados = () => {
    Axios.get("http://localhost:3007/consultarEmpleados")
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setEmpleados(response.data[0]); // Establecer empleadosList con el primer elemento de la respuesta
          alert("Lista de empleados recuperada con éxito!");
        } else {
          alert("No se encontraron empleados.");
        }
      })
      .catch((error) => {
        console.error("Error al recuperar la lista de empleados: ", error);
        alert("Error al recuperar la lista de empleados");
      });
  };

  const testConexion = ()=>{
    Axios.get("http://localhost:3007/testConnection",{
  
    }).then(()=>{
      alert("Conexion funcionando adecuadamente");
    });
  }

  return (
    //Aplicacion
    <div className="App">
      <div className="datos">
        {/* Etiqueta para el nombre */}
        <label>Nombre: <input 
        onChange={(event)=>{
          setNombre(event.target.value);
        }}
        type="text"/></label>
        {/* Etiqueta para la edad */}
        <label>Edad: <input 
        onChange={(event)=>{
          setEdad(event.target.value);
        }}
        type="number"/></label>
        {/* Etiqueta para el pais */}
        <label>Pais: <input onChange={(event)=>{
          setPais(event.target.value);
        }}
        type="text"/></label>
        {/* Etiqueta para el cargo */}
        <label>Cargo: <input 
        onChange={(event)=>{
          setCargo(event.target.value);
        }}
        type="text"/></label>
        {/* Etiqueta para la experiencia */}
        <label>Experiencia: <input 
        onChange={(event)=>{
          setExperiencia(event.target.value);
        }}
        type="number"/></label>
        {/* Boton para registrar */}
        <button onClick={addEmpleado}>Registrar</button>
      </div>
      <div className="listaEmpleados">
        {/* Al precionar el boton de listar empleados, por cada empleado encontrado crea un div con la infromación de dicho empleado */}
      {
        <React.Fragment>
        {empleadosList.map((empleado, index) => (
          <div key={index} className='empleado'>
            Nombre: {empleado.nombre}, Edad: {empleado.edad}, País: {empleado.pais}, Cargo: {empleado.cargo}, Experiencia: {empleado.experiencia}
          </div>
        ))}
      </React.Fragment>
      
      }
      </div>
    </div>
  );
}

export default App;
