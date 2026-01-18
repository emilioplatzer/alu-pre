import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Sistema de Control de Asistencia</h1>
      <p>
        Bienvenido al sistema de control de asistencia para la facultad.
        Utilice el menú de navegación para gestionar los alumnos o ver información.
      </p>
      <div style={{ marginTop: '2rem', color: '#666' }}>
        <p>Funcionalidades disponibles:</p>
        <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
          <li>✅ Gestión completa de alumnos</li>
          <li>✅ Alta, baja y modificación</li>
          <li>✅ Listado con ordenamiento</li>
          <li>🔄 Próximamente: Control de asistencia con QR</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;