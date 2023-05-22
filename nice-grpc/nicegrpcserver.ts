//require the merged registry from prometheusSetUp
//nice-grpc: gRPC library for Node.js - built on @grpc/grpc-js but nice-grpc is easier to debug and supports typescript/type safety
//@grpc is more mature so documentation is better and better support due to larger community

const serverregistry = require('./prometheusSetUp');
const {createServer} = require('nice-grpc');
const { prometheusServerMiddleware} = require('nice-grpc-prometheus');
const contactImpl = require('../@grpc/contactImpl')

//import contact messages from contact.ts
import { ContactRequest } from "../contacts";
import { ContactResponse } from "../contacts";

//functionality to get one contact
const getContact = async(call:  ContactRequest, callback: () =>) : ContactResponse  => {
    const response = await contactImpl.getContactDB(call)
}


const server = createServer()
    .use(prometheusServerMiddleware())
    .use(contactImpl.getContactDB)