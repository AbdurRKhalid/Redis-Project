import { createClient } from 'redis';

const client = createClient({
    password: 'LkDZSXvQokTlTAj6Imi0HXPJzpCmPRNr',
    socket: {
        host: 'redis-12326.c300.eu-central-1-1.ec2.cloud.redislabs.com',
        port: 12326
    }
});

client.on('error', (err) => { console.log(err) });

export { client }