const { Contacts } = require("../db/contactsModel");
const {
  ValidationError,
  WrongContactIdError,
  NotFoundError,
} = require("../helpers/errors");

const {
  addContactValidation,
  updateContactValidation,
} = require("../middlewares/contactsValidation");

const listContacts = async (userId) => {
  try {
    const contacts = await Contacts.find({ owner: userId });
    if (contacts.length === 0) {
      throw new NotFoundError("Contact list is empty!");
    }
    return contacts;
  } catch (error) {
    throw new Error(error);
  }
};

const getContactById = async (contactId, userId) => {
  try {
    const foundContact = await Contacts.findOne({
      _id: contactId,
      owner: userId,
    });
    if (!foundContact) {
      throw new WrongContactIdError(`Not found contact with id: ${contactId}`);
    }
    return foundContact;
  } catch (error) {
    throw new Error(error);
  }
};

const addContact = async (body, userId) => {
  const { name, email, phone } = body;
  const contactBody = {
    name,
    email,
    phone,
    favorite: body.favorite ? body.favorite : false,
    owner: userId,
  };

  const newContact = new Contacts(contactBody);
  if (!newContact) {
    throw new ValidationError("Contact not added!");
  }
  try {
    await newContact.save();
    return newContact;
  } catch (error) {
    throw new Error(error);
  }
};

const removeContact = async (contactId, userId) => {
  try {
    const contactForRemove = await Contacts.findOneAndRemove({
      _id: contactId,
      owner: userId,
    });
    if (!contactForRemove) {
      throw new WrongContactIdError(`Not found contact with id: ${contactId}`);
    }
    return contactForRemove;
  } catch (error) {
    throw new Error(error);
  }
};

const updateContact = async (contactId, body, userId) => {
  const newContact = {
    name: body.name ? body.name : undefined,
    email: body.email ? body.email : undefined,
    phone: body.phone ? body.phone : undefined,
  };

  try {
    const updatedContact = await Contacts.findOneAndUpdate(
      { _id: contactId, owner: userId },
      {
        $set: newContact,
      },
      { new: true, omitUndefined: true }
    );
    return updatedContact;
  } catch (error) {
    throw new Error(error);
  }
};

const updateContactStatus = async (contactId, body, userId) => {
  try {
    const updatedContact = await Contacts.findOneAndUpdate(
      { _id: contactId, owner: userId },
      {
        $set: body,
      },
      { new: true, omitUndefined: true }
    );
    return updatedContact;
  } catch (error) {
    throw new Error(error);
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
