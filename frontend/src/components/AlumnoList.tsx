import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { alumnoService, Alumno } from '../services/api';

const AlumnoList: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchAlumnos = async () => {
    try {
      setLoading(true);
      const data = await alumnoService.getAll();
      setAlumnos(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los alumnos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este alumno?')) {
      try {
        await alumnoService.delete(id);
        fetchAlumnos();
      } catch (err) {
        alert('Error al eliminar el alumno');
        console.error(err);
      }
    }
  };

  const handlePresente = async (id: number, nuevoPresente:boolean) => {
      try {
        await alumnoService.presente(id, nuevoPresente);
        fetchAlumnos();
      } catch (err) {
        alert('Error al eliminar el alumno');
        console.error(err);
      }
  };


  const handleEdit = (id: number) => {
    navigate(`/alumnos/editar/${id}`);
  };

  const handleAdd = () => {
    navigate('/alumnos/nuevo');
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1 style={{ marginBottom: '1rem' }}>Listado de Alumnos</h1>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Apellido</th>
              <th>Nombre</th>
              <th>Libreta Universitaria</th>
              <th>Fecha Inscripción</th>
              <th>presente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((alumno) => (
              <tr key={alumno.id}>
                <td>{alumno.id}</td>
                <td>{alumno.apellido}</td>
                <td>{alumno.nombre}</td>
                <td>{alumno.libreta_universitaria}</td>
                <td>{new Date(alumno.fecha_inscripcion).toLocaleDateString()}</td>
                <td>{alumno.presente?'🗹':'✘'}</td>
                <td>
                  <button 
                    className="btn btn-edit"
                    onClick={() => handleEdit(alumno.id)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn btn-delete"
                    onClick={() => handleDelete(alumno.id)}
                  >
                    Borrar
                  </button>
                  <button 
                    className="btn btn-presente"
                    onClick={() => handlePresente(alumno.id, !alumno.presente)}
                  >
                    {alumno.presente ? <span>Ausente</span> : <span>Presente!</span>}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="btn btn-add" onClick={handleAdd}>
        Agregar Nuevo Alumno
      </button>
    </div>
  );
};

export default AlumnoList;