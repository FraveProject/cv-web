import mongoose from "mongoose";

const experienciaSchema = new mongoose.Schema({
    empresa: {
        type: String,
        required: [true, "El nombre de la empresa es obligatorio"],
        trim: true
    },
    cargo: {
        type: String,
        required: [true, "El cargo es obligatorio"],
        trim: true,
    },
    periodo: {
        type: String,
        default: "Contacto desde Currículo Virtual"
    }, 
    descripcion: {
        type: String,
        default: "Sin descripción"
    }
});

const ExperienciaLaboral = mongoose.model("ExperienciaLaboral", experienciaSchema, "laborals");

export default ExperienciaLaboral;