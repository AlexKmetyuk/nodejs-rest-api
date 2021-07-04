const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../helpers/apiHelpers");

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
const { authMiddleware } = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/", asyncWrapper(getContactsController));

router.get("/:contactId", asyncWrapper(getContactByIdController));

router.delete("/:contactId", asyncWrapper(removeContactController));

router.post("/", addContactValidation, asyncWrapper(addContactController));

router.patch(
  "/:contactId",
  updateContactValidation,
  asyncWrapper(updateContactController)
);

router.patch(
  "/:contactId/favorite",
  updateContactStatusValidation,
  asyncWrapper(updateContactStatusController)
);

module.exports = router;
