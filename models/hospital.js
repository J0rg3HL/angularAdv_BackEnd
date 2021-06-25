const { Schema, model } = require('mongoose');


// aqui  es en donde se definen los objetos que se insertaran a  nuestra  BD
const HospitalSchema = Schema({
    nombre: { type: String, required: true },
    img: { type: String },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, { collection: 'hospitales' });


HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
});


// EXPONEMOS EL MODELO A LOS DOMSettableTokenList,A QUIEN LO NECESITE  DENTRO  DEL PROGRAMA
module.exports = model('Hospital', HospitalSchema);