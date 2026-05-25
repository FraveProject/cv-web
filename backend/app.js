
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
<<<<<<< HEAD
import rutasMensajes from './routes/mensajes.routes.js';
=======
import rutasMensajes from './routes/mensajes.routes'
>>>>>>> 41d08f67c1c752f0f928d7d785ec56f445314dd3

// Configuracion de variables de entorno.
dotenv.config();

// Servidor.
const app = express();

// Middleware - Puentes de comunicacion.
<<<<<<< HEAD
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
=======
app.use(express.json());
app.use(cors());

// Conexion a Atlas.
const MONGO_URI = process.env.MONGO_URI
    .then(console.log('Conectado a MongoDB Atlas'))
    .catch(console.log('Error de conexión:', err));

>>>>>>> 41d08f67c1c752f0f928d7d785ec56f445314dd3
// Aquí iran las rutas CRUD.


// Rutas.
<<<<<<< HEAD
app.use('/api/mensajes', rutasMensajes);

// Inicio del servidor.
const PORT = process.env.PORT || 3000;
=======
app.use('api/mensajes', rutasMensajes);

// Inicio del servidor.
const PORT = porcess.env.PORT || 3000;
>>>>>>> 41d08f67c1c752f0f928d7d785ec56f445314dd3
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
