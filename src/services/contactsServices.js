const { Contacts } = require("../db/contactsModel");

const {
  addContactValidation,
  updateContactValidation,
} = require("../middlewares/contactsValidation");

const listContacts = async () => {
  try {
    const contacts = await Contacts.find({});
    return contacts;
  } catch (error) {
    return false;
  }
};

const getContactById = async (contactId) => {
  try {
    const foundContact = await Contacts.findById(contactId);
    return foundContact;
  } catch (error) {
    return false;
  }
};

const removeContact = async (contactId) => {
  try {
    return Contacts.findByIdAndRemove(contactId);
  } catch (error) {
    return false;
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contactBody = {
    name,
    email,
    phone,
    favorite: body.favorite ? body.favorite : false,
  };

  const newContact = new Contacts(body);

  try {
    await newContact.save();
    return newContact;
  } catch (error) {
    return false;
  }
};

const updateContact = async (contactId, body) => {
  const newContact = {
    name: body.name ? body.name : undefined,
    email: body.email ? body.email : undefined,
    phone: body.phone ? body.phone : undefined,
  };

  try {
    const updatedContact = await Contacts.findByIdAndUpdate(
      contactId,
      {
        $set: newContact,
      },
      { new: true, omitUndefined: true }
    );
    return updatedContact;
  } catch (error) {
    return false;
  }
};

const updateContactStatus = async (contactId, body) => {
  try {
    const updatedContact = await Contacts.findByIdAndUpdate(
      contactId,
      {
        $set: body,
      },
      { new: true, omitUndefined: true }
    );
    return updatedContact;
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
  updateContactStatus,
};
