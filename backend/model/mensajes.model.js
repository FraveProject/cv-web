import mongoose from "mongoose";

const mensajeSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "El correo es necesario para responderte"],
        trim: true,
        lowercase: true
    },
    asunto: {
        type: String,
        default: "Contacto desde Currículo Virtual"
    },
    contenido: {
        type: String,
        required: [true, "No puedes enviar un mensaje vacío"],
        minlength: [10, "El mensaje es muy corto"]
    },
    fecha: {
        type: Date,
        default: Date.now 
    }
});

const Mensaje = mongoose.model("Mensaje", mensajeSchema);

export default Mensaje;