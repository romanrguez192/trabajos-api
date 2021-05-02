const mongoose = require("mongoose");

const encargadoSchema = new mongoose.Schema({
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
  cargo: {
    type: String,
    required: true,
  },
  pais: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Encargado", encargadoSchema);
