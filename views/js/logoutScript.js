function logout() {
    fetch('/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Đăng xuất thành công!');
            sessionStorage.removeItem('userLoggedIn'); // Xóa thông tin userLoggedIn trong sessionStorage
            document.getElementById('loggedInUser').textContent = ''; // Xóa thông tin người dùng trên header
            document.getElementById('userDisplay').style.display = 'none'; // Ẩn phần hiển thị thông tin người dùng
            document.getElementById('logout').style.display = 'none'; // Ẩn nút Đăng xuất
            document.getElementById('login').style.display = 'inline-block'; // Hiển thị nút Đăng nhập
            document.getElementById('register').style.display = 'inline-block'; // Hiển thị nút Đăng ký
        } else {
            alert('Đăng xuất không thành công!');
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại sau!');
    });
}

// Sử dụng hàm logout khi người dùng click vào nút Đăng xuất (logout)
document.getElementById('logout').addEventListener('click', function() {
    logout();
});
