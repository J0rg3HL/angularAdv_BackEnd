const Medico = require('../models/medicos');
const bcrypt = require('bcryptjs');
const { response } = require('express');
// const { listenerCount } = require('../models/usuario');
// const { generaJwt } = require('../utilities/jwt');



const getMedicos = async(req, resp = response) => {

    // respuesta(resp, 200);

    try {

        const medicos = await Medico.find()
            .populate('hospital')
            .populate('usuario');

        return resp.status(200).json({
            ok: true,
            msg: 'este  es un mensaje de prueba de  get medicos',
            medicos: medicos
        });

    } catch (error) {

        return resp.status(500).json({
            ok: true,
            msg: 'este  es un mensaje de prueba de  getmedicos'
        });
    }

};




const crearMedicos = async(req, resp = response) => {

    const medicoNuevo = new Medico(req.body);
    medicoNuevo.usuario = req.uid;

    console.log('MEdico nuevo =', medicoNuevo);

    try {

        const respuesta = await medicoNuevo.save();

        return resp.status(200).json({
            ok: true,
            msg: 'este  es un mensaje de prueba de crearMedicos',
            respuesta: respuesta

        });


    } catch (error) {

        return resp.status(500).json({
            ok: true,
            msg: 'Error  al tratar de insertar el medico'
        });
    }




};




const updateMedicos = async(req, resp = response) => {

    // respuesta(resp, 200);  

    try {

        const id = req.params.id;
        const datos = {...req.body };

        const medico = await Medico.findById(id)
            .populate('hospital')
            .populate('usuario');


        medico.nombre = datos.nombre;

        medico.save();


        return resp.status(200).json({
            ok: true,
            msg: 'este  es un mensaje de pruebade updateMEdico'
        });



    } catch (error) {

        console.log('=========' + error);

        return resp.status(500).json({
            ok: true,
            msg: 'hubo pedo al intentar actualizar el hospital, ponte  chingon'
        });

    }

};


const borrarMedicos = async(req, resp = response) => {

    // respuesta(resp, 200);  

    try {

        const id = req.params.id;
        const medicos = await Medico.findByIdAndDelete(id, function(err, docs) {
            if (err) {
                console.log(err);
                return resp.status(200).json({
                    ok: false,
                    msg: 'NO SE ACTUALIZO ELMEDICO'
                });
            } else {
                console.log("Deleted : ", docs);
                return resp.status(200).json({
                    ok: true,
                    msg: 'TODOO OK, SE ACTUALIZO ELMEDICO'
                });
            }
        });


    } catch (error) {

        return resp.status(500).json({
            ok: true,
            msg: 'hubo pedo al intentar actualizar el hospital, ponte  chingon'
        });

    }


};


// respuesta(resp: any, numero: number) {

//     return resp.status(numero).json({
//         ok: true,
//         msg: 'este  es un mensaje de prueba'
//     });
// }


module.exports = { getMedicos, crearMedicos, updateMedicos, borrarMedicos };