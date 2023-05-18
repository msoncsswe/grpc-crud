const mongoose = require('mongoose')
const { Schema } = mongoose;

const contactsSchema = new Schema ({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    telNum: { type: Number, required: true },
    email: { type: String, required: true }
})

const uri = "mongodb+srv://yuulspd:2E0FIR9VUBx13tyA@cluster0.95qytmd.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(uri, (err) => {
    if (err){
        console.log(err)
    }
    else {
        console.log('connected to the database')
    }
})

const Contacts = mongoose.model('Contacts', contactsSchema)

module.exports = Contacts




