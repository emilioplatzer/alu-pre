import app from './app';
import { createTables } from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Inicializar base de datos y luego iniciar servidor
createTables().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('Error al inicializar la base de datos:', error);
  process.exit(1);
});