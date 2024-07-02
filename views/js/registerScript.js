
document.getElementById('register').addEventListener('click', function() {
    document.getElementById('registerFormPopup').style.display = 'block';
});

function closeRegisterForm() {
    document.getElementById('registerFormPopup').style.display = 'none';
}

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('reg_username').value;
    var email = document.getElementById('reg_email').value;
    var password = document.getElementById('reg_password').value;
    registerUser(username, email, password);
});

function registerUser(username, email, password) {
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Đăng ký thành công!');
            closeRegisterForm();
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại sau!');
    });
}
