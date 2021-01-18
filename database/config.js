const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('Base de datos ONLINE');

    } catch (error) {
        console.log('Error al  hacer la conexion a l BD');
        throw new Error('Error al  hacer la conexion a l BD')
    }
};


module.exports = { dbConnection }