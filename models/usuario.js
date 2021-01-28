const { Schema, model } = require('mongoose');


// aqui  es en donde se definen los objetos que se insertaran a  nuestra  BD
const UsuarioSchema = Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String },
    role: { type: String, required: true, default: 'USER_ROLE' },
    google: { type: Boolean, dafault: false }
});


UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})


// EXPONEMOS EL MODELO A LOS DOMSettableTokenList,A QUIEN LO NECESITE  DENTRO  DEL PROGRAMA
module.exports = model('Usuario', UsuarioSchema);