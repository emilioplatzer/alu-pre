import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AlumnoList from './components/AlumnoList';
import AlumnoForm from './components/AlumnoForm';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alumnos" element={<AlumnoList />} />
        <Route path="/alumnos/nuevo" element={<AlumnoForm />} />
        <Route path="/alumnos/editar/:id" element={<AlumnoForm />} />
        <Route 
          path="/informacion" 
          element={
            <div className="container">
              <h1>Información del Sistema</h1>
              <div style={{ marginTop: '2rem', lineHeight: '1.6' }}>
                <p>Este sistema está diseñado para controlar la asistencia de alumnos en la facultad.</p>
                <p>Próximamente se implementará:</p>
                <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
                  <li>Generación de códigos QR para cada alumno</li>
                  <li>Escaneo de QR desde la aplicación del profesor</li>
                  <li>Registro automático de asistencia</li>
                  <li>Reportes y estadísticas</li>
                </ul>
              </div>
            </div>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;