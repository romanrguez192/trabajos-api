const express = require("express");
const router = express.Router();
const Encargado = require("../models/Encargado");

// Middlware para obtener un encargado
const getEncargado = async (req, res, next) => {
  try {
    const encargado = await Encargado.findById(req.params.id);

    if (!encargado) {
      return res.status(404).json({ message: "Encargado no encontrado" });
    }

    res.encargado = encargado;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los encargados
router.get("/", async (req, res) => {
  try {
    const encargados = await Encargado.find();
    res.json(encargados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un encargado
router.get("/:id", getEncargado, (req, res) => {
  res.json(res.encargado);
});

// Crear un encargado
router.post("/", async (req, res) => {
  const encargado = new Encargado({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    cedula: req.body.cedula,
    cargo: req.body.cargo,
    pais: req.body.pais,
  });

  try {
    const nuevoEncargado = await encargado.save();
    res.status(201).json(nuevoEncargado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar un encargado
router.patch("/:id", getEncargado, async (req, res) => {
  if (req.body.nombre != null) {
    res.encargado.nombre = req.body.nombre;
  }
  if (req.body.apellido != null) {
    res.encargado.apellido = req.body.apellido;
  }
  if (req.body.cedula != null) {
    res.encargado.cedula = req.body.cedula;
  }
  if (req.body.cargo != null) {
    res.encargado.cargo = req.body.cargo;
  }
  if (req.body.pais != null) {
    res.encargado.pais = req.body.pais;
  }

  try {
    const encargadoActualizado = await res.encargado.save();
    res.json(encargadoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Borrar un encargado
router.delete("/:id", getEncargado, async (req, res) => {
  try {
    await res.encargado.remove();
    res.json({ message: "Encargado eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
