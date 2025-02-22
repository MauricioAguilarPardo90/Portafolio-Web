require("dotenv").config(); // Importar dotenv para variables de entorno
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para manejar el formulario
app.post("/api/submit", async (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  // Validar que los datos no estén vacíos
  if (!nombre || !correo || !mensaje) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Validar formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    return res.status(400).json({ error: "Formato de correo electrónico inválido" });
  }

  try {
    // Configura el transportador de correo
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // Usa el puerto seguro
      secure: true, // Asegura la conexión
      auth: {
        user: process.env.SMTP_USER, // Usar variable de entorno
        pass: process.env.SMTP_PASS, // Usar variable de entorno
      },
    });

    // Configura los detalles del correo
    const mailOptions = {
      from: `Formulario de contacto <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Correo de destino
      subject: `Nuevo mensaje de ${nombre}`,
      text: `Has recibido un mensaje de tu formulario de contacto.\n\nNombre: ${nombre}\nCorreo: ${correo}\nMensaje: ${mensaje}`,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Correo enviado exitosamente" });
  } catch (error) {
    console.error("Error al enviar el correo:", error.message);
    res.status(500).json({ error: "Error al enviar el correo: " + error.message });
  }
});

// Captura errores generales
app.use((err, req, res, next) => {
  console.error("Error general:", err.message);
  res.status(500).json({ error: "Error interno del servidor: " + err.message });
});

// Configura el puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = app;
