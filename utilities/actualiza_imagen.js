const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');
const fs = require('fs');


const actualizaImagen = async(tipo, id, nameFile) => {

    console.log('es desde  el actualizaImagen');

    switch (tipo) {

        case 'usuarios':
            const usu = await Usuario.findById(id);

            if (!usu) {
                console.log('el id no existe');
                return false;
            }

            const pathViejo = `./uploads/usuarios/${usu.img}`;

            console.log('path viejo de usuarios' + pathViejo);

            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);
            } else {

                console.log('esta es  una nameFile' + nameFile);
                usu.img = nameFile;
                usu.save();
                return true;
            }
            break;

        case 'hospitales':

            const hosp = await Hospital.findById(id);

            if (!hosp) {
                console.log('el id no existe');
                return false;
            }

            const pathViejo2 = `./uploads/hospitales/${hosp.img}`;

            console.log('valor de hospotales', pathViejo2);

            if (fs.existsSync(pathViejo2)) {
                fs.unlinkSync(pathViejo2);
            } else {

                console.log('esta es  una nameFile' + nameFile);
                hosp.img = nameFile;
                hosp.save();
                return true;
            }
            break;


        case 'medicos':

            const med = await Medico.findById(id);

            if (!med) {
                console.log('el id no existe');
                return false;
            }

            const pathViejo3 = `./uploads/medicos/${med.img}`;

            console.log('valor de medicos', pathViejo3);


            if (fs.existsSync(pathViejo3)) {
                fs.unlinkSync(pathViejo3);
            } else {

                console.log('esta es  una nameFile ' + nameFile);
                med.img = nameFile;
                med.save();
                return true;
            }
            break;

        default:
            return false;

    }
}


module.exports = { actualizaImagen }