import { Request, Response } from 'express';
import { AlumnoModel } from '../models/alumnoModel';

function logging(context:string, error:Error){
  var idError = Math.random().toString().substring(2);
  console.log("Error en el backend",context,idError);
  console.log(error);
}

export const alumnoController = {
  async getAll(req: Request, res: Response) {
    try {
      const alumnos = await AlumnoModel.getAll();
      res.json(alumnos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener alumnos' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const alumno = await AlumnoModel.getById(id);
      
      if (!alumno) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
      }
      
      res.json(alumno);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener alumno' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { apellido, nombre, libreta_universitaria, fecha_inscripcion } = req.body;
      
      if (!apellido || !nombre || !libreta_universitaria) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }

      const alumno = await AlumnoModel.create({
        apellido,
        nombre,
        libreta_universitaria,
        fecha_inscripcion: fecha_inscripcion || new Date(),
        presente: false
      });
      
      res.status(201).json(alumno);
    } catch (error: any) {
      if (error.code === '23505') {
        res.status(400).json({ error: 'La libreta universitaria ya existe' });
      } else {
        res.status(500).json({ error: 'Error al crear alumno' });
      }
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const alumno = await AlumnoModel.update(id, req.body);
      
      if (!alumno) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
      }
      
      res.json(alumno);
    } catch (error: any) {
      if (error.code === '23505') {
        res.status(400).json({ error: 'La libreta universitaria ya existe' });
      } else {
        res.status(500).json({ error: 'Error al actualizar alumno' });
      }
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await AlumnoModel.delete(id);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar alumno' });
    }
  },

  async patch(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const alumno = await AlumnoModel.patch(id, req.body);
      
      if (!alumno) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
      }
      
      res.json(alumno);
    } catch (error: any) {
      var idError = logging('patch ' + req.params.id ,error)
      res.status(500).json({ error: `Error al actualizar alumno. Si el problema persiste el id de error es: ${idError}` });
    }
  },

};