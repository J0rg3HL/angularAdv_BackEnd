const { Schema, model } = require('mongoose');


// aqui  es en donde se definen los objetos que se insertaran a  nuestra  BD
const MedicoSchema = Schema({
    nombre: { type: String, required: true },
    img: { type: String },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }

}, { collection: 'medicos' });


MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
});


// EXPONEMOS EL MODELO A LOS DOMSettableTokenList,A QUIEN LO NECESITE  DENTRO  DEL PROGRAMA
module.exports = model('Medico', MedicoSchema);