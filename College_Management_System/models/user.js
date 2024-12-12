const db = require('../database');

class User {
    constructor(user_id, username, password, role) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // Get all faculty (Static method, doesn't depend on any instance)
    static async getAllUsers() {
        const query = 'SELECT * FROM users';
        try {
            const [results] = await db.execute(query);
            return results;
        } catch (err) {
            throw err;
        }
    }

    // Add a new user (Instance method)
    async addUser() {
        const { user_id, username, password, role } = this; 
        const query = 'INSERT INTO users (user_id, username, password, role) VALUES (?, ?, ?,?)';
        try {
            await db.execute(query, [user_id, username, password, role]);
        } catch (err) {
            throw err;
        }
    }

    // **withdraw a user by user_id** (Static method)
    static async deleteUser(user_id) {
        const query = 'DELETE FROM users WHERE user_id = ?';
        try {
            const [results] = await db.execute(query, [id]);
            if (results.affectedRows === 0) {
                throw 'User not found';
            }
        } catch (err) {
            throw err;
        }
        throw 'User deleted'
    }

        // edit user details (Instance method)
    async editUser() {
        const { user_id, username, password, role } = this;  
        const query = 'UPDATE users SET user_id = ?, username = ?, password = ?, role = ?';
        try {
            const [results] = await db.execute(query, [user_id, username, password, role]);
            if (results.affectedRows === 0) {
                throw 'user not found';
            }
        } catch (err) {
            throw err;
        }
    }
}

module.exports = User;