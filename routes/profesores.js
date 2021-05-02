const express = require("express");
const router = express.Router();
const Profesor = require("../models/Profesor");

// Middlware para obtener un profesor
const getProfesor = async (req, res, next) => {
  try {
    const profesor = await Profesor.findById(req.params.id);

    if (!profesor) {
      return res.status(404).json({ message: "Profesor no encontrado" });
    }

    res.profesor = profesor;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los profesors
router.get("/", async (req, res) => {
  try {
    const profesors = await Profesor.find();
    res.json(profesors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un profesor
router.get("/:id", getProfesor, (req, res) => {
  res.json(res.profesor);
});

// Crear un profesor
router.post("/", async (req, res) => {
  const profesor = new Profesor({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    cedula: req.body.cedula,
    materias: req.body.materias,
    universidad: req.body.universidad,
    pais: req.body.pais,
  });

  try {
    const nuevoProfesor = await profesor.save();
    res.status(201).json(nuevoProfesor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar un profesor
router.patch("/:id", getProfesor, async (req, res) => {
  if (req.body.nombre != null) {
    res.profesor.nombre = req.body.nombre;
  }
  if (req.body.apellido != null) {
    res.profesor.apellido = req.body.apellido;
  }
  if (req.body.cedula != null) {
    res.profesor.cedula = req.body.cedula;
  }
  if (req.body.universidad != null) {
    res.profesor.universidad = req.body.universidad;
  }
  if (req.body.materias != null) {
    res.profesor.materias = req.body.materias;
  }
  if (req.body.pais != null) {
    res.profesor.pais = req.body.pais;
  }

  try {
    const profesorActualizado = await res.profesor.save();
    res.json(profesorActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Borrar un profesor
router.delete("/:id", getProfesor, async (req, res) => {
  try {
    await res.profesor.remove();
    res.json({ message: "Profesor eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
