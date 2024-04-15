const express = require("express");
const router = express.Router();
const ViewController=require("../../controllers/view.controller.js")
const viewController=new ViewController()

router.get("/login", viewController.renderLogin)
router.get("/sign-up", viewController.renderSignUp)
router.get("/profile", viewController.renderProfile)

module.exports = router; 
