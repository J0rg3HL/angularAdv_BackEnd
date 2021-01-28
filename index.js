// importamos el servidor  de express
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

// inicializamos la  variable  de express
const app = express();

// para   no restringuir  Cors
app.use(cors());

// conexion a base de datos
dbConnection();

// lectura  y parseo del body en peticiones
app.use(express.json());

// CRUD usuarios
app.use('/api/usuarios', require('./routes/usuarios.routes'));
// login
app.use('/api/login', require('./routes/auth.routes'));


app.listen(process.env.PORT, () => {
    console.log('Servidor  corriendo en el puerto', process.env.PORT);
});