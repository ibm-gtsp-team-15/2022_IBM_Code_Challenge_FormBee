const express = require("express");
const controller = require("../controllers/forms_controller");

const forms = express.Router();

forms.get("/inventory", controller.getInventory);
forms.post("/add-form", controller.postAddForm);

module.exports = forms;
