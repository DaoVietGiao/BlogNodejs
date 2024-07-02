const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'views')));

app.use(session({
    secret: 'd79b9e7d2f5a4e9d',
    resave: false, // Không lưu lại phiên nếu không bị thay đổi
    saveUninitialized: true,// Lưu lại phiên chưa khởi tạo
    cookie: { secure: false } //Dùng HTTPS thay `false` bằng `true`
}));

const indexRoutes = require('./app/routes/index');
const postRoutes = require('./app/routes/postRoutes');

app.use('/', indexRoutes);
app.use('/api/posts', postRoutes);

app.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000/');
});
