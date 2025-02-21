import db from "../db"

const getAllUsers = async () => {
    try {
        const users = await db.any('SELECT user_id, username, email FROM users');
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Could not retrieve users.');
    }
}