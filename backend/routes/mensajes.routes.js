import { Router } from 'express';
<<<<<<< HEAD
import Mensaje from '../model/mensajes.model.js';

const router = Router();

router.post('/', async (req, res) => {
=======
import Mensaje from '../model/Mensaje.js';

const router = Router();

router.post("/", async (req, res) => {
>>>>>>> 41d08f67c1c752f0f928d7d785ec56f445314dd3
    try {
        const nuevoMensaje = new Mensaje(req.body);

        await nuevoMensaje.save();

        res.status(201).json({mensaje: "Mensaje guardado con éxito"});
    } catch (e) {
        res.status(400).json({error: "No se pudo guardar el mensaje"});
    }
});

<<<<<<< HEAD
router.get('/', async (req, res) => {
=======
router.get("/", async (req, res) => {
>>>>>>> 41d08f67c1c752f0f928d7d785ec56f445314dd3
    try {
        const mensajes = await Mensaje.find();
        res.json(mensajes);
    } catch(e) {
        res.status(500).json({error: "Error al obtener los mensajes"});
    }
});
<<<<<<< HEAD

export default router;
=======
>>>>>>> 41d08f67c1c752f0f928d7d785ec56f445314dd3
