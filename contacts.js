const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db/contacts.json");

// функція повертає масив контактів
async function getListOfContacts() {
    try {
        const contacts = await fs.readFile(contactsPath);
        return JSON.parse(contacts);
    } catch (error) {
        console.log(error.message);
    }
}

// функція повертає контакт з заданим id
async function getContactById(contactId) {
    try {
        const contacts = await getListOfContacts();
        const oneContact = contacts.find(item => item.id === contactId);
        return oneContact || null;
    } catch (error) {
        console.log(error.message);
    }
}

// функція видаляє контакт за заданим id
async function removeContact(contactId) {
    try {
        const contacts = await getListOfContacts();
        const index = contacts.findIndex(item => item.id === contactId);
        if (index === -1) {
            return null;
        }
        const [result] = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return result;
    } catch (error) {
        console.log(error.message);
    }
}

// функція додає новий контакт в сховище контактів
async function addContact(name, email, phone) {
    try {
        const contacts = await getListOfContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,
        };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getListOfContacts,
    getContactById,
    removeContact,
    addContact,
};
