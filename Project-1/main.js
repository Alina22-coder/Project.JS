const usersDiv = document.createElement('div');
usersDiv.className = 'users';

async function getUsers() {
    try {
    const value = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await value.json();
    console.log(users);

    localStorage.setItem('users', JSON.stringify(users));

        for (const user of users) {
        const userDiv = document.createElement('div');
        userDiv.className = 'user';
        userDiv.innerText = `${user.id} - ${user.name}`;

        const userDetailsBtn = document.createElement('button');
        userDetailsBtn.className = 'btn';
        userDetailsBtn.type = 'button';
        userDetailsBtn.innerText = 'Learn more...';

        userDetailsBtn.addEventListener('click', ()=> {
            localStorage.setItem('selectedUserId', user.id);
            window.location.href='user-details.html';
        });
        userDiv.append(userDetailsBtn);
        usersDiv.append(userDiv);
    }
        document.body.appendChild(usersDiv);
    } catch (error) {
        console.log('Помилка завантаження користувачів:', error);
    }
}
getUsers();














