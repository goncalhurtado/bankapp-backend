const Contact = require("../models/contactSchema");
const User = require("../models/userSchema");

const getContactsByUser = async (req, res) => {
  const { user } = req.params;
  try {
    const contacts = await Contact.findOne({ user }).populate(
      "contacts.user",
      "name lastname alias cvu lastTransaction"
    );

    if (!contacts) {
      return res.status(404).json({
        status: 404,
        message: "Contacts not found",
      });
    }

    const allContacts = contacts.contacts.map((contact) => {
      return {
        _id: contact.user._id,
        name: contact.user.name,
        lastname: contact.user.lastname,
        alias: contact.user.alias,
        cvu: contact.user.cvu,
        lastTransaction: contact.lastTransaction,
      };
    });

    const contactsData = allContacts.sort((a, b) => {
      return new Date(b.lastTransaction) - new Date(a.lastTransaction);
    });

    res.status(200).json({
      status: 200,
      message: "All contacts",
      data: contactsData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getContactsByUser };
