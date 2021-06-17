const fs = require("fs/promises");
const path = require("path");
const contacts = require("./contacts.json");
const ids = require("short-id");
const Joi = require("joi");

const contactsPath = path.resolve("model/contacts.json");
const {
  addContactValidation,
  updateContactValidation,
} = require("../validation/contactsValidation");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    return false;
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const [foundContact] = contacts.filter(
      (item) => item.id === Number(contactId)
    );
    return foundContact;
  } catch (error) {
    return false;
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const contactsAfterRemove = contacts.filter(
      (item) => item.id !== Number(contactId)
    );
    if (JSON.stringify(contacts) === JSON.stringify(contactsAfterRemove)) {
      return false;
    }
    await fs.writeFile(contactsPath, JSON.stringify(contactsAfterRemove));
    return { s: "OK" };
  } catch (error) {
    return false;
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;

  const newContact = {
    id: ids.generate(),
    name,
    email,
    phone,
  };

  const validationResult = addContactValidation(body);
  if (validationResult) {
    return validationResult.error.details;
  }

  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return { s: "OK" };
  } catch (error) {
    return false;
  }
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  let isContactUpdate = false;

  const validationResult = updateContactValidation(body);
  if (validationResult) {
    return validationResult.error.details;
  }
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));

    contacts.forEach((item) => {
      if (item.id === Number(contactId)) {
        isContactUpdate = true;
        if (name) {
          item.name = name;
        }
        if (email) {
          item.email = email;
        }
        if (phone) {
          item.phone = phone;
        }
      }
    });
    if (!isContactUpdate) {
      return false;
    }
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return { s: "OK" };
  } catch (error) {
    return false;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
