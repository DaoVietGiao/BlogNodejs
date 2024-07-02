window.onload = function() {
    fetch('http://localhost:3000/api/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(posts => {
            console.log(posts); // Log the posts data to ensure we received it correctly
            const postsContainer = document.getElementById('posts-container');
            if (!postsContainer) {
                console.error('No posts container found!');
                return;
            }
            postsContainer.innerHTML = ''; // Clear any existing content
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
};
