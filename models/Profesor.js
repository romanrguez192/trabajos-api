const mongoose = require("mongoose");

const profesorSchema = new mongoose.Schema({
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
    unique: true,
  },
  materias: {
    type: [String],
    required: true,
    default: [],
  },
  universidad: {
    type: String,
    required: true,
  },
  pais: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Profesor", profesorSchema);
