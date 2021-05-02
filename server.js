const express = require("express");
const mongoose = require("mongoose");
const clientesRouter = require("./routes/clientes");
require("dotenv").config();

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

// Aplicación
const app = express();
// Middleware
app.use(express.json());
// Rutas
app.use("/api/clientes", clientesRouter);
// Puerto
const port = process.env.PORT || 3000;

// Inicio del servidor
app.listen(port, () => console.log(`Server running on port ${port}`));
