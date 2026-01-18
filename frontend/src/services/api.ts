import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Alumno {
  id: number;
  apellido: string;
  nombre: string;
  libreta_universitaria: string;
  fecha_inscripcion: string;
  presente?:boolean;
}

export const alumnoService = {
  async getAll(): Promise<Alumno[]> {
    const response = await api.get('/alumnos');
    return response.data;
  },

  async getById(id: number): Promise<Alumno> {
    const response = await api.get(`/alumnos/${id}`);
    return response.data;
  },

  async create(alumno: Omit<Alumno, 'id'>): Promise<Alumno> {
    const response = await api.post('/alumnos', alumno);
    return response.data;
  },

  async update(id: number, alumno: Partial<Alumno>): Promise<Alumno> {
    const response = await api.put(`/alumnos/${id}`, alumno);
    return response.data;
  },

  async presente(id: number, presente:boolean): Promise<Alumno>{
    const response = await api.patch(`/alumnos/${id}`, {presente});
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/alumnos/${id}`);
  }
};