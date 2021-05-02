const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  cedula: {
    type: String,
    required: true,
  },
  universidad: {
    type: String,
    required: true,
  },
  carrera: {
    type: String,
    required: true,
  },
  pais: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Cliente", clienteSchema);
