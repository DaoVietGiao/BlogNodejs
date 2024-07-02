document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/api/posts')
        .then(response => response.json())
        .then(posts => {
            const postList = document.getElementById("postList");
            posts.forEach(post => {
                const postItem = document.createElement("div");
                postItem.classList.add("post-item");

                const postImage = document.createElement("img");
                postImage.src = "/images/" + post.image; // Cần đường dẫn đúng
                postItem.appendChild(postImage);

                const postContent = document.createElement("div");
                postContent.classList.add("content");

                const postTitle = document.createElement("h3");
                postTitle.innerText = post.title;
                postContent.appendChild(postTitle);

                const postDate = document.createElement("p");
                postDate.innerText = post.created_at;
                postContent.appendChild(postDate);

                const postExcerpt = document.createElement("p");
                postExcerpt.innerText = post.content;
                postContent.appendChild(postExcerpt);

                postItem.appendChild(postContent);

                const postActions = document.createElement("div");
                postActions.classList.add("actions");

                const editButton = document.createElement("button");
                editButton.innerText = "Edit";
                postActions.appendChild(editButton);

                const deleteButton = document.createElement("button");
                deleteButton.innerText = "Delete";
                postActions.appendChild(deleteButton);

                postItem.appendChild(postActions);

                postList.appendChild(postItem);
            });
        })
        .catch(error => console.error("Error fetching posts:", error));
});
