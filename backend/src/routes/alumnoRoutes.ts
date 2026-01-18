import { Router } from 'express';
import { alumnoController } from '../controllers/alumnoController';

const router = Router();

router.get('/alumnos', alumnoController.getAll);
router.get('/alumnos/:id', alumnoController.getById);
router.post('/alumnos', alumnoController.create);
router.put('/alumnos/:id', alumnoController.update);
router.delete('/alumnos/:id', alumnoController.delete);
router.patch('/alumnos/:id', alumnoController.patch);

export default router;