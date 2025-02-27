import {Client} from "pg"
import dotenv from "dotenv"


dotenv.config();

const db = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : undefined
});

export default db;