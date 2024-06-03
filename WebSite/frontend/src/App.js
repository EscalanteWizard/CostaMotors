import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Usuarios from './Usuarios';
import Disenios from './Disenios';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Costa Motors</h1>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="/usuarios" className="btn">
              Módulo de Usuarios
            </Link>
          </li>
          <li>
            <Link to="/disenios" className="btn">
              Módulo de Diseños
            </Link>
          </li>
          <li>
            <Link to="/fabricas" className="btn">
              Módulo de Fábricas (No implementado)
            </Link>
          </li>
          <li>
            <Link to="/plantas" className="btn">
              Módulo de Plantas (No implementado)
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/disenios" element={<Disenios />} />
        <Route
          path="/fabricas"
          element={<h2>El módulo de Fábricas aún no está implementado.</h2>}
        />
        <Route
          path="/plantas"
          element={<h2>El módulo de Plantas aún no está implementado.</h2>}
        />
        <Route
          path="/"
          element={<h2>Bienvenido! Selecciona un módulo del menú.</h2>}
        />
      </Routes>
    </div>
  );
}

export default App;
