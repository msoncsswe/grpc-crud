//import mergedRegistry from './prometheusSetUp';
const {createClientFactory} = require('nice-grpc');
const {prometheusClientMiddleware} = require('nice-grpc-prometheus');

const clientFactory = createClientFactory()
    .use(prometheusClientMiddleware())