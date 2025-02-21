import {pg} from "pg"
import {env} from "./env"

const db = new pgClient({
    user: env.PG_USER,
    host: env.PG_HOST,
    database: env.PG_DATABASE,
    password: env.PG_PASSWORD,
    port: env.PG_PORT
});

export default db;