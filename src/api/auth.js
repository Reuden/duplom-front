export const setAuthToken = (user) => {
    const currentUser = {
        email: user.email
    };

    // Отримати JWT токен
    fetch('http://localhost:5000/jwt', { // Виправлено URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem('FoodMonster', data.token);
    })
    .catch(error => {
        console.error('Failed to fetch:', error);
    });
};
