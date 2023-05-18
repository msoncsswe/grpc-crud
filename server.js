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
const getContact = async (call, callback) => {
    console.log('trying to get contact')
    try{
        const response =  await contactImpl.getContactDB(call.request)
        console.log('back in server with data', response)
        await callback(null, response);
        }

    catch(err){
        console.log(err, 'got an error')
    }
}

//this function gets all of the contacts
const getContactList = async (call, callback) => {
        try{
            const response = await contactImpl.getContactList({})
            console.log('this is response', response)
            callback(null, response)
        }
        catch(err){
            console.log(err, 'this is an error bish')
        }
}

const createContact = (call, callback) => {
    console.log(`createContact invoked`)
    const res = contactImpl.addContactDB(call.request);
    try {
        callback(null, res)
    } catch(err) {
        console.log(`error in createContact:`, err)
    }
}

grpcServer.addService(contactsProto.ContactService.service, {GetContact: getContact, GetContactList: getContactList, CreateContact: createContact});

grpcServer.bindAsync("127.0.0.1:3500", grpc.ServerCredentials.createInsecure(), (err, port) => {
    console.log(`listening on port ${port}`);
    grpcServer.start()
})