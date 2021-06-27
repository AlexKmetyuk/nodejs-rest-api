const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
} = require("../services/contactsServices");

const getContactsController = async (req, res) => {
  const contacts = await listContacts();
  if (!contacts) {
    return res.status(404).json({
      status: "Not found!",
    });
  }

  return res.status(200).json({ contacts, status: "success" });
};

const getContactByIdController = async (req, res) => {
  const id = req.params.contactId;
  const foundContact = await getContactById(id);
  if (!foundContact) {
    return res
      .status(404)
      .json({ message: `Not found contact whit id: ${id}` });
  }
  res.json({ foundContact, status: "success" });
};

const removeContactController = async (req, res) => {
  const id = req.params.contactId;
  const contactForRemove = await removeContact(id);
  if (!contactForRemove) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ contactForRemove, status: "success" });
};

const addContactController = async (req, res) => {
  const result = await addContact(req.body);
  if (!result) {
    return res.status(400).json({ status: "Contact not added!" });
  }
  return res.status(201).json({ result, status: "success" });
};

const updateContactController = async (req, res) => {
  const result = await updateContact(req.params.contactId, req.body);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(201).json({ result, status: "success" });
};

const updateContactStatusController = async (req, res) => {
  const id = req.params.contactId;
  const result = await updateContactStatus(id, req.body);
  if (!result) {
    res.status(404).json({ message: "Not found" });
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
