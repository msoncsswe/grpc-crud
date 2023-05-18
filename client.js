const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_FILE = './proto/contacts.proto';

const pkgDef = protoLoader.loadSync(PROTO_FILE, {
    keepCase: true,
    longs: String,
    enums: String,
    dafaults: true,
    onesofs: true,
});

const ContactService = grpc.loadPackageDefinition(pkgDef).ContactService;

const client = new ContactService("localhost:3500", grpc.credentials.createInsecure());

const request = {firstName: 'Miri', lastName: 'Adams'};

client.GetContact(request, (err, contact) => {
    if(err) {
        console.log(`err: ${err}`);
    } else {
        //console.log(contact);
        return contact
    }
})

client.GetContactList({}, (err, contact) => {
    if(err) {
        console.log(`err in getContactList client: ${err}`);
    } else {
        //console.log(contact);
        return contact
    }
})

client.CreateContact({firstName: 'Patryk', lastName: 'Ngyuen', telNum: 1234567890, email: 'patNgyuen@aol.com'}, (err, contact) => {
    if(err) {
        console.log(`error creating contact`);
    } else {
        console.log(`Contact created: ${contact.firstName}`)
    }
})