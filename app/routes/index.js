const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController');


// Route cho đăng nhập
router.post('/api/login', userController.login);

// Route cho đăng ký
router.post('/api/register', userController.register);

// Route cho đăng xuất
router.get('/logout', (req, res) => {
    // Hủy bỏ session của người dùng
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi đăng xuất.' });
        }
        // Phản hồi thành công khi đăng xuất
        return res.status(200).json({ success: true, message: 'Đăng xuất thành công.' });
    });
});

// Endpoint để kiểm tra session của người dùng
router.get('/api/check-session', (req, res) => {
    if (req.session.user) {
        // Nếu có thông tin người dùng trong session
        res.status(200).json({
            userLoggedIn: true,
            username: req.session.user.username,
            role: req.session.user.role
        });
    } else {
        // Nếu không có thông tin người dùng trong session
        res.status(200).json({ userLoggedIn: false });
    }
});


module.exports = router;
