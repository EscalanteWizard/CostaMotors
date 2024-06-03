import './Usuarios.css';
import React, { useState } from 'react';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function Usuarios() {
  const [id, setId] = useState();
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState();
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [experiencia, setExperiencia] = useState();
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [editar, setEditar] = useState(false);
  const [empleadosList, setEmpleados] = useState([]);

  const editarEmpleado = (empleado) => {
    setEditar(true);
    setId(empleado.id);
    setNombre(empleado.nombre);
    setApellidos(empleado.apellidos);
    setCorreo(empleado.correo);
    setTelefono(empleado.telefono);
    setExperiencia(empleado.experiencia);
    setUsuario(empleado.usuario);
    setContrasenia(empleado.contrasenia);
  };

  const limpiarCamposEmpleado = () => {
    setId("");
    setNombre("");
    setApellidos("");
    setCorreo("");
    setTelefono("");
    setExperiencia("");
    setUsuario("");
    setContrasenia("");
    setEditar(false);
  };

  const addEmpleado = () => {
    if (!nombre || !apellidos || !correo || !telefono || !experiencia || !usuario || !contrasenia) {
      alert("Todos los campos son obligatorios");
      getEmpleados();
      return;
    }
    Axios.post("http://localhost:3007/saveEmpleado", {
      nombre: nombre,
      apellidos: apellidos,
      correo: correo,
      telefono: telefono,
      experiencia: experiencia,
      usuario: usuario,
      contrasenia: contrasenia
    }).then(() => {
      limpiarCamposEmpleado();
      getEmpleados();
      alert("Empleado registrado con éxito!");
    }).catch((error) => {
      console.error("Error al registrar el empleado:", error);
      alert("Error al registrar el empleado");
    });
  };

  const updateEmpleado = () => {
    if (!id || !nombre || !apellidos || !correo || !telefono || !experiencia || !usuario || !contrasenia) {
      alert("Todos los campos son obligatorios");
      getEmpleados();
      return;
    }
    Axios.put("http://localhost:3007/actualizarEmpleado", {
      id: id,
      nombre: nombre,
      apellidos: apellidos,
      correo: correo,
      telefono: telefono,
      experiencia: experiencia,
      usuario: usuario,
      contrasenia: contrasenia
    }).then(() => {
      getEmpleados();
      alert("Empleado actualizado con éxito!");
      limpiarCamposEmpleado();
    }).catch((error) => {
      console.error("Error al actualizar el empleado:", error);
      alert("Error al actualizar el empleado");
    });
  };

  const eliminarEmpleado = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
      Axios.delete(`http://localhost:3007/eliminarEmpleado/${id}`).then(() => {
        getEmpleados();
        alert("Empleado eliminado con éxito!");
        limpiarCamposEmpleado();
      }).catch((error) => {
        console.error("Error al eliminar el empleado:", error);
        alert("Error al eliminar el empleado");
      });
    }
  };

  const getEmpleados = () => {
    Axios.get("http://localhost:3007/consultarEmpleados")
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setEmpleados(response.data[0]);
          alert("Lista de empleados recuperada con éxito!");
        } else {
          alert("No se encontraron empleados.");
        }
      }).catch((error) => {
        console.error("Error al recuperar la lista de empleados: ", error);
        alert(JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.stringify(error));
      });
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          Gestión de empleados
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text" value={nombre}
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control" placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Apellidos:</span>
            <input type="text" value={apellidos}
              onChange={(event) => {
                setApellidos(event.target.value);
              }}
              className="form-control" placeholder="Ingrese la apellidos" aria-label="Age" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Correo:</span>
            <input type="text" value={correo}
              onChange={(event) => {
                setCorreo(event.target.value);
              }}
              className="form-control" placeholder="Ingrese el correo" aria-label="Country" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Telefono:</span>
            <input type="text" value={telefono}
              onChange={(event) => {
                setTelefono(event.target.value);
              }}
              className="form-control" placeholder="Ingrese el telefono" aria-label="Position" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Experiencia:</span>
            <input type="number" value={experiencia}
              onChange={(event) => {
                setExperiencia(event.target.value);
              }}
              className="form-control" placeholder="Ingrese la experiencia" aria-label="Position" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Usuario:</span>
            <input type="text" value={usuario}
              onChange={(event) => {
                setUsuario(event.target.value);
              }}
              className="form-control" placeholder="Ingrese el usuario" aria-label="Position" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Contrasenia:</span>
            <input type="text" value={contrasenia}
              onChange={(event) => {
                setContrasenia(event.target.value);
              }}
              className="form-control" placeholder="Ingrese la Contrasenia" aria-label="Position" aria-describedby="basic-addon1" />
          </div>
        </div>
        <div className="card-footer text-muted">
          {editar ?
            <div>
              <button className='btn btn-warning m-2' onClick={updateEmpleado}>Actualizar</button>
              <button className='btn btn-danger m-2' onClick={limpiarCamposEmpleado}>Cancelar</button>
            </div>
            : <button className='btn btn-success' onClick={addEmpleado}>Registrar</button>
          }
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Correo</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Usuario</th>
            <th scope="col">Contraseña</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosList.map((empleado, index) => {
            return <tr key={empleado.id}>
              <th>{empleado.id}</th>
              <td>{empleado.nombre}</td>
              <td>{empleado.apellidos}</td>
              <td>{empleado.correo}</td>
              <td>{empleado.telefono}</td>
              <td>{empleado.experiencia}</td>
              <td>{empleado.usuario}</td>
              <td>{empleado.contrasenia}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button"
                    onClick={() => {
                      editarEmpleado(empleado);
                    }}
                    className="btn btn-info">Editar</button>
                  <button type="button"
                    onClick={() => {
                      eliminarEmpleado(empleado.id);
                    }}
                    className="btn btn-danger">Eliminar</button>
                </div>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;
