import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'asistencia_facultad'
});

// Crear tabla si no existe
export const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS alumnos (
        id SERIAL PRIMARY KEY,
        apellido VARCHAR(100) NOT NULL,
        nombre VARCHAR(100) NOT NULL,
        libreta_universitaria VARCHAR(20) UNIQUE NOT NULL,
        fecha_inscripcion DATE NOT NULL DEFAULT CURRENT_DATE,
        presente BOOLEAN,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Tabla "alumnos" verificada/creada correctamente');
  } catch (error) {
    console.error('Error creando tablas:', error);
  } finally {
    client.release();
  }
};