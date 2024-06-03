import './App.css';
import {useState} from "react";
import React from 'react';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  //Constantes para manejar los estados de los input en el formulario
  const [id,setId] = useState();
  const [nombre,setNombre] = useState("");
  const [edad,setEdad] = useState();
  const [pais,setPais] = useState("");
  const [cargo,setCargo] = useState("");
  const [experiencia,setExperiencia] = useState();

  //Constante para manejar los estados cuando se realice una edicion de los atributos del empleado
  const [editar,setEditar] = useState(false);

  //Constante para guardar la lista de los empleados al realizar la consulta de la tabla de empleados de la bd
  const [empleadosList,setEmpleados]=useState([]);

  //Constantes para manejar los estados del empleado mientras es editado
  const editarEmpleado = (empleado)=>{
    setEditar(true);

    setId(empleado.id);
    setNombre(empleado.nombre);
    setEdad(empleado.edad);
    setPais(empleado.pais);
    setCargo(empleado.cargo);
    setExperiencia(empleado.experiencia);
  }

  /** Funcion para testear que la conexion con la base de datos se haya realizado con exito */
  const testConexion = ()=>{
    Axios.get("http://localhost:3007/testConnection",{
  
    }).then(()=>{
      alert("Conexion funcionando adecuadamente");
    });
  }

  /** Funcion para cancelar el proceso de edicion de un empleado */
  const limpiarCamposEmpleado = ()=>{
    setId("");
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setExperiencia("");
    setEditar(false);
  }

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
      limpiarCamposEmpleado();
      getEmpleados();
      alert("Empleado registrado con éxito!");
    }).catch((error) => {
      console.error("Error al registrar el empleado:", error);
      alert("Error al registrar el empleado");
    });
  }

  //Metodo del frontEnd para enviar al backEnd una peticion para actualizar la información de un empleado en la base de datos
  const updateEmpleado = ()=>{
    // Verificar si algún campo está vacío
    if (!id || !nombre || !edad || !pais || !cargo || !experiencia) {
      alert("Todos los campos son obligatorios");
      getEmpleados();
      return; // Salir de la función si algún campo está vacío
  }
    Axios.put("http://localhost:3007/actualizarEmpleado",{
      id:id,
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      experiencia:experiencia
    }).then(()=>{
      getEmpleados();
      alert("Empleado actualizado con éxito!");
      limpiarCamposEmpleado();
    }).catch((error) => {
      console.error("Error al actualizar el empleado:", error);
      alert("Error al actualizar el empleado");
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
      }).catch((error) => {
        console.error("Error al recuperar la lista de empleados: ", error);
        alert("Error al recuperar la lista de empleados");
      });
  };

  //Renderizado de los componentes graficos de la aplicacion
  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          Gestión de empleados
        </div>
        {/**Card es un elementos de bootstrap para mostrar elementos de forma organizada*/}
        <div className="card-body">

          {/**Input group es un elemento de bootstrap para gestionar elementos para ingresar datos 
           * En este se muestran los elementos para ingresar el nombre de empleado*/}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text" value={nombre} 
              onChange={(event)=>{
              setNombre(event.target.value);
            }}
            className="form-control" placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          {/**Input group es un elemento de bootstrap para gestionar elementos para ingresar datos 
           * En este se muestran los elementos para ingresar a edad del empleado*/}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input type="number" value={edad} 
              onChange={(event)=>{
              setEdad(event.target.value);
            }}
            className="form-control" placeholder="Ingrese la edad" aria-label="Age" aria-describedby="basic-addon1"/>
          </div>

          {/**Input group es un elemento de bootstrap para gestionar elementos para ingresar datos 
           * En este se muestran los elementos para ingresar el país del empleado*/}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">País:</span>
            <input type="text" value={pais} 
              onChange={(event)=>{
              setPais(event.target.value);
            }}
            className="form-control" placeholder="Ingrese el país" aria-label="Country" aria-describedby="basic-addon1"/>
          </div>
          
          {/**Input group es un elemento de bootstrap para gestionar elementos para ingresar datos 
           * En este se muestran los elementos para ingresar el cargo del empleado*/}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo:</span>
            <input type="text" value={cargo}
              onChange={(event)=>{
              setCargo(event.target.value);
            }}
            className="form-control" placeholder="Ingrese el cargo" aria-label="Position" aria-describedby="basic-addon1"/>
          </div>
          
          {/**Input group es un elemento de bootstrap para gestionar elementos para ingresar datos 
           * En este se muestran los elementos para ingresar la experiencia del empleado*/}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Experiencia:</span>
            <input type="number" value={experiencia}
              onChange={(event)=>{
              setExperiencia(event.target.value);
            }}
            className="form-control" placeholder="Ingrese la experiencia" aria-label="Position" aria-describedby="basic-addon1"/>
          </div>
        </div>

        <div className="card-footer text-muted">
          {/**Condicion para verficar que se está editando */}
          {
            editar?
              <div>
                <button className='btn btn-warning m-2' onClick={updateEmpleado}>Actualizar</button> {/**Boton para registrar los cambios al editar*/}
                <button className='btn btn-danger m-2' onClick={limpiarCamposEmpleado}>Cancelar</button> {/**Boton para registrar los cambios al editar*/}
              </div>
            :<button className='btn btn-success' onClick={addEmpleado}>Registrar</button> //Boton para guar registrar en caso que no se esté editando
          }
        </div>

      </div>
      {/**Tabla para mostrar los resultados de los Empleados consultados */}
      <table className="table table-striped">
        <thead>
          {/**Aquí se crean las columnas de la tabla donde aparecen los resultados de la consulta */}
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            {/** Uno extra para colocar los botones de acciones */}
            <th scope="col">Acciones</th>  
          </tr>
        </thead>
        <tbody>
          {/**Aquí se define que en los campos de la tabla de consultas aparecerán los atributos de cada empleado consultado */}
          {empleadosList.map((empleado, index) => { 
            return <tr key={empleado.id}>
                    <th>{empleado.id}</th>
                    <td>{empleado.nombre}</td>
                    <td>{empleado.edad}</td>
                    <td>{empleado.pais}</td> 
                    <td>{empleado.cargo}</td> 
                    <td>{empleado.experiencia}</td> 
                    <td>
                    <div className="btn-group" role="group" aria-label="Basic example">

                      {/** Botón para invocar la fucionalidad para editar */}
                      <button type="button" 
                        onClick={()=> {
                          editarEmpleado(empleado);
                        }}
                      className="btn btn-info">Editar</button>

                      {/** Boton para invocar la funcionalidad para eliminar */}
                      <button type="button" 
                        onClick={()=> {
                            
                        }}
                      className="btn btn-danger">Eliminar</button>

                    </div>
                    </td>
                  </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
