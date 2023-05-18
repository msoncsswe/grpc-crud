const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_FILE = './proto/contacts.proto';
const Contacts = require('./models/contactModel');
const contactImpl = require('./service_Impl/contactImpl');

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,   
};

const packageDef = protoLoader.loadSync(PROTO_FILE, options);

const contactsProto = grpc.loadPackageDefinition(packageDef);

const grpcServer = new grpc.Server();

//this function gets one contact
const getContact = (call, callback) => {

    const response = {
        firstName: 'Miri',
        lastName: 'Adams',
        telNum: 1234567890,
        email: 'miriadams@aol.com'
    };
    try{
        if(call.request.firstName === response.firstName){
            callback(null, response);
        }

    }
    catch(err){
        console.log(err, 'got an error')
    }
}

//this function gets all of the contacts
const getContactList = (call, callback) => {

    const response = {
        contacts: [
            
            {firstName: 'Miri',
            lastName: 'Adams',
            telNum: 1234567890,
            email: 'miriadams@aol.com'
            },
            {
            firstName: 'Mirison',
            lastName: 'Steve',
            telNum: 7234567891,
            email: 'mirison@hotmail.com'}, 
            {
            firstName: 'Sonmiri',
            lastName: 'Adamson',
            telNum: 7733686465,
            email: 'adamson@gmail.com'}
        ]
        }
        try{
            callback(null, response)
        }
        catch(err){
            console.log(err, 'this is an error bish')
        }
}

const createContact = (call, callback) => {
    const res = contactImpl.addContactDB(call);   
}

grpcServer.addService(contactsProto.ContactService.service, {GetContact: getContact, GetContactList: getContactList});

grpcServer.bindAsync("127.0.0.1:3500", grpc.ServerCredentials.createInsecure(), (err, port) => {
    console.log(`listening on port ${port}`);
    grpcServer.start()
})