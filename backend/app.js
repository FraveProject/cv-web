
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import rutasMensajes from './routes/mensajes.routes'

// Configuracion de variables de entorno.
dotenv.config();

// Servidor.
const app = express();

// Middleware - Puentes de comunicacion.
app.use(express.json());
app.use(cors());

// Conexion a Atlas.
const MONGO_URI = process.env.MONGO_URI
    .then(console.log('Conectado a MongoDB Atlas'))
    .catch(console.log('Error de conexión:', err));

// Aquí iran las rutas CRUD.


// Rutas.
app.use('api/mensajes', rutasMensajes);

// Inicio del servidor.
const PORT = porcess.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
