const db = require('../../config/connect');

class Post {
    static getAll(callback) {
        db.query('SELECT * FROM posts', (err, rows) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, rows);
        });
    }
}

module.exports = Post;
