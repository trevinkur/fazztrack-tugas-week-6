const express = require("express")
const router = express.Router()
const invoiceController = require("../controller/invoiceController.js")


router.get("/:id", invoiceController.getInvoiceById);
router.get("/", invoiceController.getAllInvoice);
router.post("/:id", invoiceController.addInvoice)
router.patch("/:id", invoiceController.updateInvoice)
router.delete("/:id", invoiceController.removeInvoiceById)

module.exports = router;