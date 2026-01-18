import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { alumnoService, Alumno } from '../services/api';

const AlumnoForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState<Omit<Alumno, 'id'>>({
    apellido: '',
    nombre: '',
    libreta_universitaria: '',
    fecha_inscripcion: new Date().toISOString().split('T')[0],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchAlumno();
    }
  }, [id]);

  const fetchAlumno = async () => {
    try {
      const alumno = await alumnoService.getById(parseInt(id!));
      setFormData({
        apellido: alumno.apellido,
        nombre: alumno.nombre,
        libreta_universitaria: alumno.libreta_universitaria,
        fecha_inscripcion: alumno.fecha_inscripcion.split('T')[0],
      });
    } catch (err) {
      console.error(err);
      alert('Error al cargar el alumno');
      navigate('/alumnos');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.apellido || !formData.nombre || !formData.libreta_universitaria) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    setLoading(true);
    try {
      if (isEdit) {
        await alumnoService.update(parseInt(id!), formData);
        alert('Alumno actualizado correctamente');
      } else {
        await alumnoService.create(formData);
        alert('Alumno creado correctamente');
      }
      navigate('/alumnos');
    } catch (err: any) {
      if (err.response?.data?.error) {
        alert(err.response.data.error);
      } else {
        alert(`Error al ${isEdit ? 'actualizar' : 'crear'} el alumno`);
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/alumnos');
  };

  return (
    <div className="container">
      <h1 style={{ marginBottom: '1rem' }}>
        {isEdit ? 'Editar Alumno' : 'Nuevo Alumno'}
      </h1>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="apellido">Apellido *</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nombre">Nombre *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="libreta_universitaria">Libreta Universitaria *</label>
            <input
              type="text"
              id="libreta_universitaria"
              name="libreta_universitaria"
              value={formData.libreta_universitaria}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fecha_inscripcion">Fecha de Inscripción</label>
            <input
              type="date"
              id="fecha_inscripcion"
              name="fecha_inscripcion"
              value={formData.fecha_inscripcion}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn" 
              onClick={handleCancel}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Guardando...' : (isEdit ? 'Actualizar' : 'Crear')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlumnoForm;