const express = require("express");
const router = express.Router();

const {
  addContactValidation,
  updateContactValidation,
  updateContactStatusValidation,
} = require("../middlewares/contactsValidation");

const {
  getContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateContactStatusController,
} = require("../controllers/contactsController");

router.get("/", getContactsController);

router.get("/:contactId", getContactByIdController);

router.delete("/:contactId", removeContactController);

router.post("/", addContactValidation, addContactController);

router.patch("/:contactId", updateContactValidation, updateContactController);

router.patch(
  "/:contactId/favorite",
  updateContactStatusValidation,
  updateContactStatusController
);

module.exports = router;
