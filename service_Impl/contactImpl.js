//database functionality here
const Contacts = require('../models/contactModel');
const contactImpl = {};

//add contact
contactImpl.addContactDB = (contact) => {
 console.log(`addContact invoked`)
 Contacts.create(contact)
    .then(() => console.log('contact created'))
    .catch(err => console.log(err))
} 

//get contact
contactImpl.getContactDB = (contact) => {
    console.log('in the getContactDB method')
    Contacts.findOne(contact)
    .then((data) => {
        if(data === null){
            console.log('did not find contact')
        }else{
            console.log('in contactImpl with data: ', data)
            return data
        }
    })
    .catch(err => console.log('error in getting contact'))
}

module.exports = contactImpl;

