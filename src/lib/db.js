import { createClient } from 'redis';
import { config } from '../../config';

const client = createClient({
    password: config.dev.db_password,
    socket: {
        host: config.dev.db_host,
        port: config.dev.db_port
    }
});

client.on('error', (err) => { console.log(err) });

export { client }