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


app.get('/', (req, resp) => {

    resp.json({
        ok: true,
        message: 'Hola mundo, todo salio  bien'
    });


});



app.listen(process.env.PORT, () => {
    console.log('Servidor  corriendo en el puerto', process.env.PORT);
});