import React, { useState } from 'react';
import Axios from "axios";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Disenios.css';

function Disenios() {
  const [id, setId] = useState();
  const [nombre, setNombre] = useState("");
  const [transmision, setTransmision] = useState("Seleccione la transmisión");
  const [materialAsientos, setMaterialAsientos] = useState("Seleccione el material de los asientos");
  const [motor, setMotor] = useState("Seleccione el motor");
  const [vidrios, setVidrios] = useState("Seleccione el tipo de vidrios");
  const [espejos, setEspejos] = useState("Seleccione los espejos");
  const [sensoresDelanteros, setSensoresDelanteros] = useState("Seleccione sensores delanteros");
  const [sensoresTraseros, setSensoresTraseros] = useState("Seleccione sensores traseros");
  const [sensoresLaterales, setSensoresLaterales] = useState("Seleccione sensores laterales");
  const [camara, setCamara] = useState("Seleccione la cámara");
  const [tableroMando, setTableroMando] = useState("Seleccione el tablero de mando");
  const [impulso, setImpulso] = useState("Seleccione el tipo de combustible");
  const [tapizado, setTapizado] = useState("Seleccione el tapizado");
  const [sistemaSonido, setSistemaSonido] = useState("Seleccione el sistema de sonido");

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
    setTransmision("Seleccione la transmisión");
    setMaterialAsientos("Seleccione el material de los asientos");
    setMotor("Seleccione el motor");
    setVidrios("Seleccione el tipo de vidrios");
    setEspejos("Seleccione los espejos");
    setSensoresDelanteros("Seleccione sensores delanteros");
    setSensoresTraseros("Seleccione sensores traseros");
    setSensoresLaterales("Seleccione sensores laterales");
    setCamara("Seleccione la cámara");
    setTableroMando("Seleccione el tablero de mando");
    setImpulso("Seleccione el tipo de combustible");
    setTapizado("Seleccione el tapizado");
    setSistemaSonido("Seleccione el sistema de sonido");
    setEditar(false);
  };

  const addDisenio = () => {
    if (!nombre || transmision === "Seleccione la transmisión" || materialAsientos === "Seleccione el material de los asientos" || motor === "Seleccione el motor" || vidrios === "Seleccione el tipo de vidrios" || espejos === "Seleccione los espejos" || sensoresDelanteros === "Seleccione sensores delanteros" || sensoresTraseros === "Seleccione sensores traseros" || sensoresLaterales === "Seleccione sensores laterales" || camara === "Seleccione la cámara" || tableroMando === "Seleccione el tablero de mando" || impulso === "Seleccione el tipo de combustible" || tapizado === "Seleccione el tapizado" || sistemaSonido === "Seleccione el sistema de sonido") {
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
    if (!nombre || transmision === "Seleccione la transmisión" || materialAsientos === "Seleccione el material de los asientos" || motor === "Seleccione el motor" || vidrios === "Seleccione el tipo de vidrios" || espejos === "Seleccione los espejos" || sensoresDelanteros === "Seleccione sensores delanteros" || sensoresTraseros === "Seleccione sensores traseros" || sensoresLaterales === "Seleccione sensores laterales" || camara === "Seleccione la cámara" || tableroMando === "Seleccione el tablero de mando" || impulso === "Seleccione el tipo de combustible" || tapizado === "Seleccione el tapizado" || sistemaSonido === "Seleccione el sistema de sonido") {
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
            <div className="d-flex align-items-center">
              <span className="me-2">Nombre:</span>
              <input type="text" value={nombre}
                onChange={(event) => {
                  setNombre(event.target.value);
                }}
                className="form-control" placeholder="Ingrese un nombre" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col d-flex align-items-center">
              <span className="me-2">Transmisión:</span>
              <DropdownButton variant="secondary" title={transmision}>
                <Dropdown.Item onClick={() => setTransmision("Automática")}>Automática</Dropdown.Item>
                <Dropdown.Item onClick={() => setTransmision("Manual")}>Manual</Dropdown.Item>
                <Dropdown.Item onClick={() => setTransmision("Dual")}>Dual</Dropdown.Item>
              </DropdownButton>
            </div>
            <div className="col d-flex align-items-center">
              <span className="me-2">Motor:</span>
              <DropdownButton variant="secondary" title={motor}>
                <Dropdown.Item onClick={() => setMotor("Sencillo")}>Sencillo</Dropdown.Item>
                <Dropdown.Item onClick={() => setMotor("4x4")}>4x4</Dropdown.Item>
              </DropdownButton>
            </div>
            <div className="col d-flex align-items-center">
              <span className="me-2">Combustible:</span>
              <DropdownButton variant="secondary" title={impulso}>
                <Dropdown.Item onClick={() => setImpulso("Gasolina")}>Gasolina</Dropdown.Item>
                <Dropdown.Item onClick={() => setImpulso("Diesel")}>Diesel</Dropdown.Item>
                <Dropdown.Item onClick={() => setImpulso("Gas Licuado")}>Gas Licuado</Dropdown.Item>
                <Dropdown.Item onClick={() => setImpulso("Eléctrico")}>Eléctrico</Dropdown.Item>
                <Dropdown.Item onClick={() => setImpulso("Híbrido")}>Híbrido</Dropdown.Item>
                <Dropdown.Item onClick={() => setImpulso("Hídrogeno")}>Hídrógeno</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col d-flex align-items-center">
              <span className="me-2">Material Asientos:</span>
              <DropdownButton variant="secondary" title={materialAsientos}>
                <Dropdown.Item onClick={() => setMaterialAsientos("Cuero")}>Cuero</Dropdown.Item>
                <Dropdown.Item onClick={() => setMaterialAsientos("Tela")}>Tela</Dropdown.Item>
              </DropdownButton>
            </div>
            <div className="col d-flex align-items-center">
              <span className="me-2">Tapizado:</span>
              <DropdownButton variant="secondary" title={tapizado}>
                <Dropdown.Item onClick={() => setTapizado("Cuero")}>Cuero</Dropdown.Item>
                <Dropdown.Item onClick={() => setTapizado("Plastico")}>Plastico</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col d-flex align-items-center">
              <span className="me-2">Vidrios:</span>
              <DropdownButton variant="secondary" title={vidrios}>
                <Dropdown.Item onClick={() => setVidrios("Eléctricos")}>Eléctricos</Dropdown.Item>
                <Dropdown.Item onClick={() => setVidrios("Manuales")}>Manuales</Dropdown.Item>
              </DropdownButton>
            </div>
            <div className="col d-flex align-items-center">
              <span className="me-2">Espejos:</span>
              <DropdownButton variant="secondary" title={espejos}>
                <Dropdown.Item onClick={() => setEspejos("Eléctricos")}>Eléctricos</Dropdown.Item>
                <Dropdown.Item onClick={() => setEspejos("Manuales")}>Manuales</Dropdown.Item>
              </DropdownButton>
            </div>
            <div className="col d-flex align-items-center">
              <span className="me-2">Cámara:</span>
              <DropdownButton variant="secondary" title={camara}>
                <Dropdown.Item onClick={() => setCamara("Retroceso")}>Retroceso</Dropdown.Item>
                <Dropdown.Item onClick={() => setCamara("360 grados")}>360 grados</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col d-flex align-items-center">
              <span className="me-2">Sensores Delanteros:</span>
              <DropdownButton variant="secondary" title={sensoresDelanteros}>
                <Dropdown.Item onClick={() => setSensoresDelanteros("Sí")}>Sí</Dropdown.Item>
                <Dropdown.Item onClick={() => setSensoresDelanteros("No")}>No</Dropdown.Item>
              </DropdownButton>
            </div>
            <div className="col d-flex align-items-center">
              <span className="me-2">Sensores Traseros:</span>
              <DropdownButton variant="secondary" title={sensoresTraseros}>
                <Dropdown.Item onClick={() => setSensoresTraseros("Sí")}>Sí</Dropdown.Item>
                <Dropdown.Item onClick={() => setSensoresTraseros("No")}>No</Dropdown.Item>
              </DropdownButton>
            </div>
            <div className="col d-flex align-items-center">
              <span className="me-2">Sensores Laterales:</span>
              <DropdownButton variant="secondary" title={sensoresLaterales}>
                <Dropdown.Item onClick={() => setSensoresLaterales("Sí")}>Sí</Dropdown.Item>
                <Dropdown.Item onClick={() => setSensoresLaterales("No")}>No</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col d-flex align-items-center">
              <span className="me-2">Tablero de Mando:</span>
              <DropdownButton variant="secondary" title={tableroMando}>
                <Dropdown.Item onClick={() => setTableroMando("Analógico")}>Analógico</Dropdown.Item>
                <Dropdown.Item onClick={() => setTableroMando("Digital Táctil")}>Digital Táctil</Dropdown.Item>
                <Dropdown.Item onClick={() => setTableroMando("Doble")}>Doble</Dropdown.Item>
              </DropdownButton>
            </div>
            <div className="col d-flex align-items-center">
              <span className="me-2">Sistema de Sonido:</span>
              <DropdownButton variant="secondary" title={sistemaSonido}>
                <Dropdown.Item onClick={() => setSistemaSonido("Básico")}>Básico</Dropdown.Item>
                <Dropdown.Item onClick={() => setSistemaSonido("Stereo 7.1")}>Stereo 7.1</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
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

      {/* Tabla */}
      <table className="table table-striped table-sm">
      <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Transmisión</th>
            <th scope="col">Motor</th>
            <th scope="col">Combustible</th>
            <th scope="col">Asientos</th>
            <th scope="col">Tapizado</th>
            <th scope="col">Vidrios</th>
            <th scope="col">Espejos</th>
            <th scope="col">Cámara</th>
            <th scope="col">Sensores delanteros</th>
            <th scope="col">Sensores traseros</th>
            <th scope="col">Sensores laterales</th>
            <th scope="col">Tablero</th>
            <th scope="col">Sonido</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {diseniosList.map((disenio, index) => {
            return <tr key={disenio.id}>
              <th>{disenio.id}</th>
              <td>{disenio.nombre}</td>
              <td>{disenio.transmision}</td>
              <td>{disenio.motor}</td>
              <td>{disenio.impulso}</td>
              <td>{disenio.materialAsientos}</td>
              <td>{disenio.tapizado}</td>
              <td>{disenio.vidrios}</td>
              <td>{disenio.espejos}</td>
              <td>{disenio.camara}</td>
              <td>{disenio.sensoresDelanteros}</td>
              <td>{disenio.sensoresTraseros}</td>
              <td>{disenio.sensoresLaterales}</td>
              <td>{disenio.tableroMando}</td>
              <td>{disenio.sistemaSonido}</td>
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
