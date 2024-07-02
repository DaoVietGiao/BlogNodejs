document.getElementById('login').addEventListener('click', function() {
    document.getElementById('loginFormPopup').style.display = 'block';
});

function closeLoginForm() {
    document.getElementById('loginFormPopup').style.display = 'none';
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    authenticateUser(username, password);
});

function authenticateUser(username, password) {
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Đăng nhập thành công!');
            document.getElementById('manage').style.display = 'block';
            document.getElementById('loggedInUser').textContent ='Xin chào ' + username;
            document.getElementById('userDisplay').style.display = 'block';
            document.getElementById('logout').style.display = 'inline-block';
            document.getElementById('login').style.display = 'none';
            document.getElementById('register').style.display = 'none';
            closeLoginForm();
        } else {
            alert('Tên người dùng hoặc mật khẩu không đúng. Vui lòng thử lại!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại sau!');
    });
}
// Kiểm tra session của người dùng khi trang vừa được tải
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/check-session') // Endpoint để kiểm tra session của người dùng
        .then(response => response.json())
        .then(data => {
            if (data.userLoggedIn) {
                // Nếu người dùng đã đăng nhập
                document.getElementById('manage').style.display = 'block';
                document.getElementById('loggedInUser').textContent = 'Xin chào ' + data.username;
                document.getElementById('userDisplay').style.display = 'block';
                document.getElementById('logout').style.display = 'inline-block';
                document.getElementById('login').style.display = 'none';
                document.getElementById('register').style.display = 'none';
            } else {
                // Nếu người dùng chưa đăng nhập
                document.getElementById('manage').style.display = 'none';
                document.getElementById('userDisplay').style.display = 'none';
                document.getElementById('logout').style.display = 'none';
                document.getElementById('login').style.display = 'inline-block';
                document.getElementById('register').style.display = 'inline-block';
            }
        })
        .catch(error => {
            console.error('Error checking session:', error);
            // Xử lý lỗi nếu cần thiết
        });
});
