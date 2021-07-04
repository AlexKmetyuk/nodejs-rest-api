const { NotFoundError } = require("../helpers/errors");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
} = require("../services/contactsServices");

const getContactsController = async (req, res) => {
  const contacts = await listContacts(req.user._id);
  return res.status(200).json({ contacts, status: "success" });
};

const getContactByIdController = async (req, res) => {
  const id = req.params.contactId;
  const foundContact = await getContactById(id, req.user._id);
  res.status(200).json({ foundContact, status: "success" });
};

const removeContactController = async (req, res) => {
  const id = req.params.contactId;
  const contactForRemove = await removeContact(id, req.user._id);
  res.status(200).json({ contactForRemove, status: "success" });
};

const addContactController = async (req, res) => {
  const result = await addContact(req.body, req.user._id);

  return res.status(201).json({ result, status: "success" });
};

const updateContactController = async (req, res) => {
  const result = await updateContact(
    req.params.contactId,
    req.body,
    req.user._id
  );
  if (!result) {
    throw new NotFoundError("Not found");
  }
  res.status(201).json({ result, status: "success" });
};

const updateContactStatusController = async (req, res) => {
  const id = req.params.contactId;
  const result = await updateContactStatus(id, req.body, req.user._id);
  if (!result) {
    throw new NotFoundError("Not found");
  }
  res.status(200).json({ result, status: "success" });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateContactStatusController,
};
