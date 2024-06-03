import './Usuarios.css';
import React, { useState } from 'react';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function Disenios() {
  const [id, setId] = useState();
  const [nombre, setNombre] = useState("");
  const [transmision, setTransmision] = useState();
  const [materialAsientos, setMaterialAsientos] = useState("");
  const [motor, setMotor] = useState("");
  const [vidrios, setVidrios] = useState();
  const [espejos, setEspejos] = useState("");
  const [sensoresDelanteros, setSensoresDelanteros] = useState("");
  const [sensoresTraseros, setSensoresTraseros] = useState("");
  const [sensoresLaterales, setSensoresLaterales] = useState("");
  const [camara, setCamara] = useState("");
  const [tableroMando, setTableroMando] = useState("");
  const [impulso, setImpulso] = useState("");
  const [tapizado, setTapizado] = useState("");
  const [sistemaSonido, setSistemaSonido] = useState("");

  const [editar, setEditar] = useState(false);
  const [diseniosList, setDisenios] = useState([]);

  const editarDisenio = (disenio) => {
    setEditar(true);
    setId(disenio.id);
    setNombre(disenio.nombre);
    setTransmision(disenio.transmision);
    setMaterialAsientos(disenio.materialAsientos);
    setMotor(disenio.motor);
    setVidrios(disenio.vidrios);
    setEspejos(disenio.espejos);
    setSensoresDelanteros(disenio.sensoresDelanteros);
    setSensoresTraseros(disenio.sensoresTraseros);
    setSensoresLaterales(disenio.sensoresLaterales);
    setCamara(disenio.camara);
    setTableroMando(disenio.tableroMando);
    setImpulso(disenio.impulso);
    setTapizado(disenio.tapizado);
    setSistemaSonido(disenio.sistemaSonido)
  };

  const limpiarCamposDisenio = () => {
    setId("");
    setNombre("");
    setTransmision("");
    setMaterialAsientos("");
    setMotor("");
    setVidrios("");
    setEspejos("");
    setSensoresDelanteros("");
    setSensoresTraseros("");
    setSensoresLaterales("");
    setCamara("");
    setTableroMando("");
    setImpulso("");
    setTapizado("");
    setSistemaSonido("")
    setEditar(false);
  };

  const addDisenio = () => {
    if (!nombre || !transmision || !materialAsientos || !motor || !vidrios || !espejos || !sensoresDelanteros || !sensoresTraseros || !sensoresLaterales || !camara || !tableroMando || !impulso || !tapizado || !sistemaSonido) {
      alert("Todos los campos son obligatorios");
      getDisenios();
      return;
    }
    Axios.post("http://localhost:3007/saveDisenio", {
      nombre: nombre,
      transmision: transmision,
      materialAsientos: materialAsientos,
      motor: motor,
      vidrios: vidrios,
      espejos: espejos,
      sensoresDelanteros: sensoresDelanteros,
      sensoresTraseros: sensoresTraseros,
      sensoresLaterales: sensoresLaterales,
      camara: camara,
      tableroMando: tableroMando,
      impulso: impulso,
      tapizado: tapizado,
      sistemaSonido: sistemaSonido
    }).then(() => {
      limpiarCamposDisenio();
      getDisenios();
      alert("Diseño registrado con éxito!");
    }).catch((error) => {
      console.error("Error al registrar el disenio:", error);
      alert("Error al registrar el disenio");
    });
  };

  const upDateDisenio = () => {
    if (!nombre || !transmision || !materialAsientos || !motor || !vidrios || !espejos || !sensoresDelanteros || !sensoresTraseros || !sensoresLaterales || !camara || !tableroMando || !impulso || !tapizado || !sistemaSonido) {
      alert("Todos los campos son obligatorios");
      getDisenios();
      return;
    }
    Axios.put("http://localhost:3007/actualizarDisenio", {
      id: id,
      nombre: nombre,
      transmision: transmision,
      materialAsientos: materialAsientos,
      motor: motor,
      vidrios: vidrios,
      espejos: espejos,
      sensoresDelanteros: sensoresDelanteros,
      sensoresTraseros: sensoresTraseros,
      sensoresLaterales: sensoresLaterales,
      camara: camara,
      tableroMando: tableroMando,
      impulso: impulso,
      tapizado: tapizado,
      sistemaSonido: sistemaSonido
    }).then(() => {
      getDisenios();
      alert("Diseño actualizado con éxito!");
      limpiarCamposDisenio();
    }).catch((error) => {
      console.error("Error al actualizar el disenio:", error);
      alert("Error al actualizar el disenio");
    });
  };

  const eliminarDisenio = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este disenio?")) {
      Axios.delete(`http://localhost:3007/eliminarDisenio/${id}`).then(() => {
        getDisenios();
        alert("Disenio eliminado con éxito!");
        limpiarCamposDisenio();
      }).catch((error) => {
        console.error("Error al eliminar el disenio:", error);
        alert("Error al eliminar el disenio");
      });
    }
  };

  const getDisenios = () => {
    Axios.get("http://localhost:3007/consultarDisenios")
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setDisenios(response.data[0]);
          alert("Lista de diseños recuperada con éxito!");
        } else {
          alert("No se encontraron Diseños.");
        }
      }).catch((error) => {
        console.error("Error al recuperar la lista de Diseños: ", error);
        alert(JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.stringify(error));
      });
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          Gestión de Diseños
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text" value={nombre}
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control" placeholder="Ingrese un nombre" aria-label="Nombre de disenio" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Transmision:</span>
            <input type="text" value={transmision}
              onChange={(event) => {
                setTransmision(event.target.value);
              }}
              className="form-control" placeholder="Seleccione la transmision" aria-label="Transmision" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Material de asientos:</span>
            <input type="text" value={materialAsientos}
              onChange={(event) => {
                setMaterialAsientos(event.target.value);
              }}
              className="form-control" placeholder="Seleccion el material de los Asientos" aria-label="Material asientos" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Motor:</span>
            <input type="text" value={motor}
              onChange={(event) => {
                setMotor(event.target.value);
              }}
              className="form-control" placeholder="Ingrese el motor" aria-label="Motor" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Vidrios:</span>
            <input type="number" value={vidrios}
              onChange={(event) => {
                setVidrios(event.target.value);
              }}
              className="form-control" placeholder="Seleccione el tipo de  vidrios" aria-label="Vidrios" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Espejos:</span>
            <input type="text" value={espejos}
              onChange={(event) => {
                setEspejos(event.target.value);
              }}
              className="form-control" placeholder="Seleccione los espejos" aria-label="Espejos" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Sensores delanteros</span>
            <input type="text" value={sensoresDelanteros}
              onChange={(event) => {
                setSensoresDelanteros(event.target.value);
              }}
              className="form-control" placeholder="Desea colocar sensores delanteros?" aria-label="SensoresDelanteros" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Sensores traseros</span>
            <input type="text" value={sensoresTraseros}
              onChange={(event) => {
                setSensoresTraseros(event.target.value);
              }}
              className="form-control" placeholder="Desea colocar sensores traseros?" aria-label="SensoresTraseros" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Sensores laterales</span>
            <input type="text" value={sensoresLaterales}
              onChange={(event) => {
                setSensoresLaterales(event.target.value);
              }}
              className="form-control" placeholder="Desea colocar sensores laterales?" aria-label="SensoresLaterales" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cámara: </span>
            <input type="text" value={camara}
              onChange={(event) => {
                setCamara(event.target.value);
              }}
              className="form-control" placeholder="Desea colocar camara de retroceso o 360?" aria-label="Camara de retroceso" aria-describedby="basic-addon1" />
          </div>
    setTableroMando(disenio.tableroMando);
    setImpulso(disenio.impulso);
    setTapizado(disenio.tapizado);
    setSistemaSonido(disenio.sistemaSonido)
        </div>
        <div className="card-footer text-muted">
          {editar ?
            <div>
              <button className='btn btn-warning m-2' onClick={upDateDisenio}>Actualizar</button>
              <button className='btn btn-danger m-2' onClick={limpiarCamposDisenio}>Cancelar</button>
            </div>
            : <button className='btn btn-success' onClick={addDisenio}>Registrar</button>
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
          {diseniosList.map((disenio, index) => {
            return <tr key={disenio.id}>
              <th>{disenio.id}</th>
              <td>{disenio.nombre}</td>
              <td>{disenio.transmision}</td>
              <td>{disenio.materialAsientos}</td>
              <td>{disenio.motor}</td>
              <td>{disenio.vidrios}</td>
              <td>{disenio.espejos}</td>
              <td>{disenio.sensoresDelanteros}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button"
                    onClick={() => {
                      editarDisenio(disenio);
                    }}
                    className="btn btn-info">Editar</button>
                  <button type="button"
                    onClick={() => {
                      eliminarDisenio(disenio.id);
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

export default Disenios;
