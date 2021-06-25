const bcrypt = require('bcryptjs');
const { response } = require('express');

const Hospital = require('../models/hospital');
const Medico = require('../models/medicos');
const Usuario = require('../models/usuario');

const getBusquedaTodo = async(req, resp) => {

    try {

        console.log('parametro de busqueda :', req.params.busqda);

        const busqueda = req.params.busqda;

        // ahora  empezaremos a buscar en todas las colecciones
        // de medicos, de  usuarios y de hospitales
        // Como la  busqueda  es Case Sentivite, debemos  de  hacer que  
        // la  busqueda sea  más  flexible para  que  muestre  todas las coincidencias
        // con la 'i'  le decimos que sea  insensible a las  mayusculas
        const regex = new RegExp(busqueda, 'i');


        const usuarios = await Usuario.find({ nombre: regex });
        const medicos = await Medico.find({ nombre: regex });
        const hospitales = await Hospital.find({ nombre: regex });




        return resp.status(200).json({
            ok: true,
            msg: 'todo  OK  en la  busqueda del todo',
            usuarios,
            medicos,
            hospitales

        });



    } catch (error) {

        return resp.status(500).json({

            ok: false,
            msg: 'algo salio mal  en la  busqueda del todo',
            error: error
        });
    }
};


const getBusquedaEspecifica = async(req, resp) => {

    try {

        const busqueda = req.params.busqda;
        const tbl = req.params.tbl;

        console.log('parametro de busqueda :', busqueda);

        console.log('tabla de busqueda :', tbl);


        // ahora  empezaremos a buscar en todas las colecciones
        // de medicos, de  usuarios y de hospitales
        // Como la  busqueda  es Case Sentivite, debemos  de  hacer que  
        // la  busqueda sea  más  flexible para  que  muestre  todas las coincidencias
        // con la 'i'  le decimos que sea  insensible a las  mayusculas
        const regex = new RegExp(busqueda, 'i');
        let respuesta = [];

        switch (tbl) {
            case 'hospitales':
                respuesta = await Hospital.find({ nombre: regex });
                break;

            case 'medicos':

                respuesta = await Medico.find({ nombre: regex });
                break;

            case 'usuarios':
                respuesta = await Usuario.find({ nombre: regex });
                break;

            default:
                return resp.status(400).json({
                    ok: false,
                    msg: 'algo salio mal  en la  busqueda de la ---- coleccion',
                    error: error
                });

        }

        return resp.status(200).json({
            ok: true,
            msg: 'todo shido man',
            res: respuesta
        });






    } catch (error) {

        return resp.status(500).json({

            ok: false,
            msg: 'algo salio mal',
            error
        });
    }
};







module.exports = { getBusquedaTodo, getBusquedaEspecifica }