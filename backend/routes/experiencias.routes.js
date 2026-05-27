import { Router } from 'express';
import ExperienciaLaboral from '../model/experiencias.model.js';

const router = Router();

router.post("/", async (req, res) => {
    try {
        const nuevaExperiencia = new ExperienciaLaboral(req.body);

        await nuevaExperiencia.save();

        res.status(201).json({mensaje: "Experiencia guardada con éxito"});
    } catch (e) {
        res.status(400).json({error: "No se pudo guardar la experiencia"});
    }
});

router.get("/", async (req, res) => {
    try {
        const experiencias = await ExperienciaLaboral.find();
        res.json(experiencias);
    } catch(e) {
        res.status(500).json({error: "Error al obtener las experiencias"});
    }
});

// En tu archivo de rutas de Node.js (ej: backend/routes/experiencias.js)
router.put("/:id", async (req, res) => {
    try {
        const actualizada = await ExperienciaLaboral.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // {new: true} devuelve el documento ya editado
        );
        res.status(200).json(actualizada);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar", error: error.message });
    }
});
export default router;

router.delete("/:id", async (req, res) => {
    try {
        const resultado = await ExperienciaLaboral.findByIdAndDelete(req.params.id);
        
        if (!resultado) {
            return res.status(404).json({ mensaje: "No se encontró el registro" });
        }
        
        res.status(200).json({ mensaje: "Eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar", error: error.message });
    }
});
