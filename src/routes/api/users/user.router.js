const express = require("express");
const router = express.Router();
const userModel = require("../../../models/user.model");

router.post("/api/users/sign-up", async (req, res) => {
  const  { first_name, last_name, email, password, age } = req.body;

  try {
    const user={ first_name, last_name, email, password, age} 
    await userModel.create(user);
    res.redirect("/login");
  } catch (e) {
    console.log(e);
    res.status(400).send("Error al crear usuario");
  }
});



module.exports = router;

