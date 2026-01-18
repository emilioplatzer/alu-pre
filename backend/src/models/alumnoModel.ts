import { pool } from '../config/database';

export interface Alumno {
  id?: number;
  apellido: string;
  nombre: string;
  libreta_universitaria: string;
  fecha_inscripcion: Date;
  presente: boolean
}

export class AlumnoModel {
  static async getAll(): Promise<Alumno[]> {
    const result = await pool.query('SELECT * FROM alumnos ORDER BY apellido, nombre');
    return result.rows;
  }

  static async getById(id: number): Promise<Alumno | null> {
    const result = await pool.query('SELECT * FROM alumnos WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create(alumno: Omit<Alumno, 'id'>): Promise<Alumno> {
    const { apellido, nombre, libreta_universitaria, fecha_inscripcion } = alumno;
    const result = await pool.query(
      'INSERT INTO alumnos (apellido, nombre, libreta_universitaria, fecha_inscripcion) VALUES ($1, $2, $3, $4) RETURNING *',
      [apellido, nombre, libreta_universitaria, fecha_inscripcion]
    );
    return result.rows[0];
  }

  static async update(id: number, alumno: Partial<Alumno>): Promise<Alumno | null> {
    const { apellido, nombre, libreta_universitaria, fecha_inscripcion } = alumno;
    const result = await pool.query(
      `UPDATE alumnos 
       SET apellido = COALESCE($1, apellido),
           nombre = COALESCE($2, nombre),
           libreta_universitaria = COALESCE($3, libreta_universitaria),
           fecha_inscripcion = COALESCE($4, fecha_inscripcion),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
      [apellido, nombre, libreta_universitaria, fecha_inscripcion, id]
    );
    return result.rows[0] || null;
  }

  static async patch(id: number, alumno: Partial<Alumno>): Promise<Alumno | null> {
    const listaCamposPermitidos = ['apellido', 'nombre', 'libreta_universitaria', 'fecha_inscripcion', 'presente']
    var campos = [] as string[];
    var valores = [] as any[];
    for (var campo in alumno) {
      if (!listaCamposPermitidos.includes(campo)) {
        throw new Error(`el campo ${campo} no está en la lista de campos permitidos`)
      }
      campos.push(campo);
      // @ts-ignore
      valores.push(alumno[campo])
    }
    const result = await pool.query(
      `UPDATE alumnos 
       SET ${campos.map((campo, i)=> campo + '= $' + (i + 2) )}
       WHERE id = $1
       RETURNING *`,
      [id, ...valores]
    );
    return result.rows[0] || null;
  }


  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM alumnos WHERE id = $1', [id]);
    return !!result.rowCount;
  }
}