const connection = require('../../config/connect');

const createUser = (user) => {
    return new Promise((resolve, reject) => {
        const { username, email, password, role } = user;
        connection.query(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, password, role],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            }
        );
    });
};

const findUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results[0]);
        });
    });
};

module.exports = {
    createUser,
    findUserByUsername
};
