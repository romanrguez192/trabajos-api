const mongoose = require("mongoose");

const trabajoSchema = new mongoose.Schema({
  tema: {
    type: String,
    required: true,
  },
  materia: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  profesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profesor",
    required: true,
  },
  encargado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Encargado",
    required: true,
  },
  fechaInicial: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  fechaFinal: {
    type: Date,
    required: true,
  },
  duracion: {
    type: Number,
  },
  precio: {
    type: Number,
    required: true,
  },
  pagoProfesor: {
    type: Number,
    required: true,
  },
  realizado: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Trabajo", trabajoSchema);
