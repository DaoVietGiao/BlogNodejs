const userModel = require('../models/userModel');

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Vui lòng nhập đầy đủ thông tin.' });
    }

    try {
        const user = await userModel.findUserByUsername(username);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Người dùng không tồn tại.' });
        }

        if (password !== user.password) {
            return res.status(401).json({ success: false, message: 'Sai mật khẩu.' });
        }

        req.session.user = { id: user.id, username: user.username, role: user.role };
        return res.status(200).json({ success: true, message: 'Đăng nhập thành công.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Có lỗi xảy ra. Vui lòng thử lại sau.' });
    }
};

const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Vui lòng nhập đầy đủ thông tin.' });
    }

    try {
        const existingUser = await userModel.findUserByUsername(username);

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Tên người dùng đã tồn tại.' });
        }

        const newUser = {
            username,
            email,
            password,
            role: 'user'
        };

        await userModel.createUser(newUser);
        return res.status(201).json({ success: true, message: 'Đăng ký thành công.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Có lỗi xảy ra. Vui lòng thử lại sau.' });
    }
};
module.exports = {
    login,
    register
};