const express = require("express");
const router = express.Router();
const userModel = require("../../../models/user.model");


router.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        req.session.role=user.role
        req.session.user_first_name=user.first_name;
        req.session.login = true;
        res.status(200).redirect("/products")
        
      } else {
        res.status(401).send("Contraseña incorrecta");
      }
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (e) {
    console.log(e);
    res.status(400).send("Error al iniciar sesión");
  }
});

router.get("/api/users/logout", async (req, res) => {
  if (req.session.login) {
    req.session.destroy();
    res.redirect("/login")
  } else {
    res.status(404).send("No hay sesión para cerrar");
  }
});

module.exports = router;