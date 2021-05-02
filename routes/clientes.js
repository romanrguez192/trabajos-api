const express = require("express");
const router = express.Router();
const Cliente = require("../models/Cliente");

// Middlware para obtener un cliente
const getCliente = async (req, res, next) => {
  try {
    const cliente = await Cliente.findById(req.params.id);

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.cliente = cliente;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los clientes
router.get("/", async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un cliente
router.get("/:id", getCliente, (req, res) => {
  res.json(res.cliente);
});

// Crear un cliente
router.post("/", async (req, res) => {
  const cliente = new Cliente({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    cedula: req.body.cedula,
    universidad: req.body.universidad,
    carrera: req.body.carrera,
    pais: req.body.pais,
  });

  try {
    const nuevoCliente = await cliente.save();
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar un cliente
router.patch("/:id", getCliente, async (req, res) => {
  if (req.body.nombre != null) {
    res.cliente.nombre = req.body.nombre;
  }
  if (req.body.apellido != null) {
    res.cliente.apellido = req.body.apellido;
  }
  if (req.body.cedula != null) {
    res.cliente.cedula = req.body.cedula;
  }
  if (req.body.universidad != null) {
    res.cliente.universidad = req.body.universidad;
  }
  if (req.body.carrera != null) {
    res.cliente.carrera = req.body.carrera;
  }
  if (req.body.pais != null) {
    res.cliente.pais = req.body.pais;
  }

  try {
    const clienteActualizado = await res.cliente.save();
    res.json(clienteActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Borrar un cliente
router.delete("/:id", getCliente, async (req, res) => {
  try {
    await res.cliente.remove();
    res.json({ message: "Cliente eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
