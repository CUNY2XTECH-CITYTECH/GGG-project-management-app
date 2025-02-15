import { db } from "./db/drizzle";

async function testDB() {
    try {
        const result = await db.execute("SELECT NOW()");
        console.log("Database connected:", result);
    } catch (error) {
        console.error("DB Connection Error:", error);
    }
}

testDB();
