const express = require("express");
const router = express.Router();
const Trabajo = require("../models/Trabajo");

// Middlware para obtener un trabajo
const getTrabajo = async (req, res, next) => {
  try {
    const trabajo = await Trabajo.findById(req.params.id)
      .populate("cliente")
      .populate("profesor")
      .populate("encargado");

    if (!trabajo) {
      return res.status(404).json({ message: "Trabajo no encontrado" });
    }

    res.trabajo = trabajo;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los trabajos
router.get("/", async (req, res) => {
  try {
    const trabajos = await Trabajo.find()
      .populate("cliente")
      .populate("profesor")
      .populate("encargado");
    res.json(trabajos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un trabajo
router.get("/:id", getTrabajo, (req, res) => {
  res.json(res.trabajo);
});

// Crear un trabajo
router.post("/", async (req, res) => {
  const trabajo = new Trabajo({
    tema: req.body.tema,
    materia: req.body.materia,
    tipo: req.body.tipo,
    cliente: req.body.cliente,
    profesor: req.body.profesor,
    encargado: req.body.encargado,
    fechaInicial: req.body.fechaInicial,
    fechaFinal: req.body.fechaFinal,
    duracion: req.body.duracion,
    precio: req.body.precio,
    pagoProfesor: req.body.pagoProfesor,
    realizado: req.body.realizado,
  });

  try {
    const nuevoTrabajo = await trabajo.save();
    res.status(201).json(nuevoTrabajo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar un trabajo
router.patch("/:id", getTrabajo, async (req, res) => {
  if (req.body.tema != null) {
    res.trabajo.tema = req.body.tema;
  }
  if (req.body.materia != null) {
    res.trabajo.materia = req.body.materia;
  }
  if (req.body.tipo != null) {
    res.trabajo.tipo = req.body.tipo;
  }
  if (req.body.cliente != null) {
    res.trabajo.cliente = req.body.cliente;
  }
  if (req.body.profesor != null) {
    res.trabajo.profesor = req.body.profesor;
  }
  if (req.body.encargado != null) {
    res.trabajo.encargado = req.body.encargado;
  }
  if (req.body.fechaInicial != null) {
    res.trabajo.fechaInicial = req.body.fechaInicial;
  }
  if (req.body.fechaFinal != null) {
    res.trabajo.fechaFinal = req.body.fechaFinal;
  }
  if (req.body.duracion != null) {
    res.trabajo.duracion = req.body.duracion;
  }
  if (req.body.precio != null) {
    res.trabajo.precio = req.body.precio;
  }
  if (req.body.pagoProfesor != null) {
    res.trabajo.pagoProfesor = req.body.pagoProfesor;
  }
  if (req.body.realizado != null) {
    res.trabajo.realizado = req.body.realizado;
  }

  try {
    const trabajoActualizado = await res.trabajo.save();
    res.json(trabajoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Borrar un trabajo
router.delete("/:id", getTrabajo, async (req, res) => {
  try {
    await res.trabajo.remove();
    res.json({ message: "Trabajo eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
