const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
    unique: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contacts = mongoose.model("Contacts", contactsSchema);

module.exports = {
  Contacts,
};
