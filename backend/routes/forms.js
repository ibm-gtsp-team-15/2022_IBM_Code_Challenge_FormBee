const express = require("express");
const controller = require("../controllers/forms_controller");

const forms = express.Router();

forms.get("/inventory", controller.getInventory);
forms.post("/add-form", controller.postAddForm);
forms.get("/generate-pdf", controller.getGeneratePdf);

module.exports = forms;
