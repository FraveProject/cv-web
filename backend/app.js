
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import rutasExperiencias from './routes/experiencias.routes.js';

// Configuracion de variables de entorno.
dotenv.config();

// Servidor.
const app = express();

// Middleware - Puentes de comunicacion.
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

// Conexion a Atlas.
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    dbName: "experiencia"
})
    .then(() => {
        console.log('Conectado a MongoDB Atlas')
    })
    .catch((error) => {
        console.log('Error de conexión:', error);
    });


// Rutas.
app.use('/api/experiencias', rutasExperiencias);

// Inicio del servidor.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
