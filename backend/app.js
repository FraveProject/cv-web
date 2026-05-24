
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import rutasMensajes from './routes/mensajes.routes.js';

// Configuracion de variables de entorno.
dotenv.config();

// Servidor.
const app = express();

// Middleware - Puentes de comunicacion.
app.use(cors());
app.use(express.json());

// Conexion a Atlas.
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Conectado a MongoDB Atlas')
    })
    .catch((error) => {
        console.log('Error de conexión:', error);
    });
// Aquí iran las rutas CRUD.


// Rutas.
app.use('/api/mensajes', rutasMensajes);

// Inicio del servidor.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
