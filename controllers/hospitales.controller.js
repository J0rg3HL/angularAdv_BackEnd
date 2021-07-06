const Hospital = require('../models/hospital');
const bcrypt = require('bcryptjs');
const { response } = require('express');
// const { listenerCount } = require('../models/usuario');
// const { generaJwt } = require('../utilities/jwt');



const getHospitales = async(req, resp = response) => {


    try {

        const hospitales = await Hospital.find().populate('usuario');


        return resp.status(200).json({
            ok: true,
            msg: 'este  es un mensaje de prueba',
            hospitales: hospitales
        });

    } catch (error) {

        return resp.status(500).json({
            ok: true,
            msg: 'NOSE  PUDIEORN CONSULTAR LOS HOSPITALES, REVISA  POR FAVOR'
        });
    }

};




const crearHospitales = async(req, resp = response) => {

    const hospitalNuevo = new Hospital(req.body);
    hospitalNuevo.usuario = req.uid // que es elID  que  viene  dentro del token

    console.log(hospitalNuevo);
    try {

        const respuesta = await hospitalNuevo.save();

        return resp.status(200).json({
            ok: true,
            msg: 'este  es un mensaje de prueba hospitales post',
            respuesta: respuesta
        });


    } catch (error) {


        resp.status(500).json({
            ok: false,
            msg: 'algo erroneo sucedio'
        });
    }



};




const updateHospitales = async(req, resp = response) => {

    // respuesta(resp, 200);

    const id = req.params.id;
    console.log('esto es loq  se uiere de  hospitales:' + id);

    try {

        const hospitaleUpdate = await Hospital.findById(id).populate('usuario');


        if (!hospitaleUpdate) {

            return resp.status(200).json({
                ok: true,
                msg: 'EL HOSPITAL NO EXISTE',
                hospitaleUpdate: hospitaleUpdate
            });
        }

        hospitaleUpdate.nombre = req.body.nombre;
        hospitaleUpdate.save();

        return resp.status(200).json({
            ok: true,
            msg: 'este  es un mensaje de prueba',
            hospitaleUpdate: hospitaleUpdate
        });

    } catch (error) {

        console.log(error);
        return resp.status(500).json({
            ok: true,
            msg: 'NOSE  PUDIEORN CONSULTAR LOS HOSPITALES, REVISA  POR FAVOR'
        });
    }

};


const borrarHospitales = async(req, resp = response) => {

    const id = req.params.id;
    console.log('esto es lo q se Quiere  BORRAR de  hospitales:' + id);

    try {

        const hospitalDelete = await Hospital.findById(id);


        if (!hospitalDelete) {

            return resp.status(200).json({
                ok: true,
                msg: 'EL HOSPITAL NO EXISTE',
                hospitalDelete: hospitalDelete
            });
        }


        //hospitaleUpdate.findByIdAndDelete
        hospitalDelete.delete();

        return resp.status(200).json({
            ok: true,
            msg: 'este  es un mensaje de prueba',
            hospitalDelete: hospitalDelete
        });

    } catch (error) {

        console.log(error);
        return resp.status(500).json({
            ok: true,
            msg: 'NOSE  PUDIEORN BORRAR LOS HOSPITALES, REVISA  POR FAVOR'
        });
    }


};


// respuesta(resp: any, numero: number) {

//     return resp.status(numero).json({
//         ok: true,
//         msg: 'este  es un mensaje de prueba'
//     });
// }


module.exports = { getHospitales, crearHospitales, updateHospitales, borrarHospitales };