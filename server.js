const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000; // Render usa PORT automáticamente

app.use(express.static("dist")); // Servir archivos de Vite

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
