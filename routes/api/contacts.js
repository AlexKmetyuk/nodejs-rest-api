const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../model/index");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  console.log(contact);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(contact);
});

router.delete("/:contactId", async (req, res, next) => {
  const result = await removeContact(req.params.contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(result);
});

router.post("/", async (req, res, next) => {
  const result = await addContact(req.body);
  res.status(200).json(result);
});

router.patch("/:contactId", async (req, res, next) => {
  const result = await updateContact(req.params.contactId, req.body);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(201).json(result);
});

module.exports = router;
