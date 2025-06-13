const posts = JSON.parse(localStorage.getItem('posts'));
const selectedPostId = localStorage.getItem('selectedPostId');


console.log('selectedPostId:', localStorage.getItem('selectedPostId'));

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
    } else {
        document.body.innerText = 'Постів не знайдено.';
    }
} else {
    document.body.innerText = 'Немає збережених постів.';
}