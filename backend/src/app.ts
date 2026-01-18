import express from 'express';
import cors from 'cors';
import alumnoRoutes from './routes/alumnoRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', alumnoRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Asistencia Facultad' });
});

var arranco = new Date();
var masterpass = Math.random().toString().substring(3);
console.log('master-pass', masterpass)

app.get('/back-door', (req, res) => {
  if (req.query.pss != masterpass ) {
    res.send('forbiddensen!')
  } else {
    res.send(`el servidor está activo desde ${arranco}`);
  }
})


app.get('/back-door/:cual/', (req, res) => {
  if (req.query.pss != masterpass ) {
    res.send('forbiddensen!')
  } else {
    res.send(`estás en un back-door especial: ${req.params.cual}`);
  }
})

export default app;