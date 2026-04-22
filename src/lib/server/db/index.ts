import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema/schema.ts';
import { env } from '$env/dynamic/private';


if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = neon(env.DATABASE_URL);

console.log('Connecting to database...');

export const db = drizzle(client, { schema });


db.select().from(schema.task).then(users => {
    console.log('Connected to database successfully!');
    console.log('Existing tasks:', users);
}).catch(error => {
    console.error('Error connecting to database:', error);
});


export * from './schema/schema.ts';