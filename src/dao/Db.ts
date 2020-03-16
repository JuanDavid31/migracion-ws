import { Pool } from 'pg';

const config = {
    host: 'localhost',
    user: 'postgres',
    password: '',
    database: 'library'
};

export const pool = new Pool(config);
