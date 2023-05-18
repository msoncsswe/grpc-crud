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
contactImpl.getContactDB =  (contact) => {
    console.log('in the getContactDB method')
     const k = Contacts.findOne(contact)
    .then((data) => {
        if(data === null){
            console.log('did not find contact')
        }else{
            console.log('in contactImpl with data: ', data)
             return data
        }
    })
    .catch(err => console.log('error in getting contact'))
    return k; 
}

contactImpl.getContactList = (contact) => {
    console.log('in getcontactlist method')
    const allContactList = Contacts.find(contact)
    .then((data) => {
        if(data === null){
            console.log('did not find contact list')
        } else{
            console.log('in contactImpl with data: ', data)
            return data
        }
    })
    .catch(err => console.log('error in getting all contacts'))
    console.log(allContactList)
    return allContactList
}

module.exports = contactImpl;

