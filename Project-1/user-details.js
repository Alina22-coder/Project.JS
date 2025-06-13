const users = JSON.parse(localStorage.getItem('users'));
const selectedUserId= localStorage.getItem('selectedUserId');

if(users && selectedUserId){
    const selectedUser = users.find(user => user.id === parseInt(selectedUserId));

    if(selectedUser){
        const userDetails = document.createElement('div');
        userDetails.className = 'user-details';
        userDetails.innerHTML = `
        <p>Id: ${selectedUser.id}</p>
        <p>Name: ${selectedUser.name}</p>
        <p>Username: ${selectedUser.username}</p>
        <p>Phone: ${selectedUser.phone}</p>
        <p>Email: ${selectedUser.email}</p>
        <p>Website: ${selectedUser.website}</p>
        <ul>
           <li>Adress:</li>
           <li>City: ${selectedUser.address.city}</li>
           <li>Street: ${selectedUser.address.street}</li>
           <li>Suite: ${selectedUser.address.suite}</li>
           <li>Zipcode: ${selectedUser.address.zipcode}</li>
           <li>Geo: ${selectedUser.address.geo.lat}, ${selectedUser.address.geo.lng}</li>
        </ul>
        <ul>
           <li>Company:</li>
           <li>Bs: ${selectedUser.company.bs}</li>
           <li>CatchPhrase: ${selectedUser.company.catchPhrase}</li>
           <li>Name: ${selectedUser.company.name}</li>
        </ul>
        `;



        async function getPosts() {
            const url = `https://jsonplaceholder.typicode.com/users/${selectedUserId}/posts`;
            try {
                const value = await fetch(url);
                const posts = await value.json();
                console.log(posts);


                localStorage.setItem('posts', JSON.stringify(posts));


                const postsBtn = document.createElement('button');
                postsBtn.innerText = 'Post of current user';
                postsBtn.type = 'button';

                userDetails.appendChild(postsBtn);


                const postsContainer = document.createElement('div');
                postsContainer.id = 'posts-container';
                userDetails.appendChild(postsContainer);

                postsBtn.addEventListener('click', () => {
                    postsContainer.innerText = '';
                    for (const post of posts) {
                        const titleUser = document.createElement('div');
                        titleUser.className = 'title-user';
                        titleUser.innerHTML = `${post.title}`;

                        const postDetailsBtn = document.createElement('button');
                        postDetailsBtn.className = 'post-details';
                        postDetailsBtn.type = 'button';
                        postDetailsBtn.innerText = 'Post Details...';

                        postDetailsBtn.addEventListener('click', () => {
                            localStorage.setItem('selectedPostId', post.id);
                            console.log('Post ID saved to localStorage:', post.id);
                            window.location.href='post-details.html';
                        });

                        titleUser.appendChild(postDetailsBtn);

                        postsContainer.appendChild(titleUser);
                    }

                });

            } catch(error){
                console.log('Помилка завантаження постів:', error);
            }
        }
        getPosts();


        document.body.appendChild(userDetails);

    } else {
        document.body.innerText = 'Користувача не знайдено.';
    }
} else {
    document.body.innerText = 'Немає збережених даних.';
}


