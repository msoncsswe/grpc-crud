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
        console.log(contact);
    }
})

client.GetContactList({}, (err, contact) => {
    if(err) {
        console.log(`err in getContactList client: ${err}`);
    } else {
        console.log(contact);
    }
})