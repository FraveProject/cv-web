import { Router } from 'express';
import Mensaje from '../model/mensajes.model.js';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const nuevoMensaje = new Mensaje(req.body);

        await nuevoMensaje.save();

        res.status(201).json({mensaje: "Mensaje guardado con éxito"});
    } catch (e) {
        res.status(400).json({error: "No se pudo guardar el mensaje"});
    }
});

router.get('/', async (req, res) => {
    try {
        const mensajes = await Mensaje.find();
        res.json(mensajes);
    } catch(e) {
        res.status(500).json({error: "Error al obtener los mensajes"});
    }
});

export default router;