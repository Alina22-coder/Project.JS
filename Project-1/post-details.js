const posts = JSON.parse(localStorage.getItem('posts'));
const selectedPostId = localStorage.getItem('selectedPostId');

if(posts && selectedPostId) {
    const postDetails = posts.find(post => post.id === parseInt(selectedPostId));

    if (postDetails) {
        const postDiv = document.createElement('div');
        postDiv.className = 'post-div';
        postDiv.innerHTML = `
        <p>UserId: ${postDetails.userId}</p>
        <p>Id: ${postDetails.id}</p>
        <p>Title: "${postDetails.title}"</p>
        <p>Body: "${postDetails.body}"</p>
        `;
        document.body.appendChild(postDiv);

        async function getComments() {
            const url = `https://jsonplaceholder.typicode.com/posts/${selectedPostId}/comments`;

            try {
                const value = await fetch(url);
                const comments = await value.json();
                console.log(comments);

                const commentsDiv = document.createElement('div');
                commentsDiv.className = 'comments-div';


                for(const comment of comments) {
                    const commentDiv = document.createElement('div');
                    commentDiv.className = 'comment';
                    commentDiv.innerHTML = `
                    <p>PostId: ${comment.postId}</p>
                    <p>Id: ${comment.id}</p>
                    <p>Name: ${comment.name}</p>
                    <p>Email: ${comment.email}</p>
                    <p>Body: ${comment.body}</p>
                    `
                    postDiv.appendChild(commentDiv);
                    commentsDiv.appendChild(commentDiv)

                }
                document.body.appendChild(commentsDiv)

            } catch (error) {
                console.log('Помилка завантаження коментарів:', error);
            }
        }
            getComments();
    } else {
        document.body.innerText = 'Постів не знайдено.';
    }
} else {
    document.body.innerText = 'Немає збережених постів.';
}



