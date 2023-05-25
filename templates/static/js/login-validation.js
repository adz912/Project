document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username.length >= 3 && password.length >= 5 && /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/.test(password)) {
    // username and password meet the requirements
    // you can then proceed to authenticate the user

    // Send a POST request to the server
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Account created successfully
        document.getElementById('success-message').textContent = data.message;
      } else {
        // Display the error message from the server
        alert(data.message);
      }
    })
    .catch(error => {
      console.error('An error occurred while registering:', error);
    });

  } else {
    // username and password do not meet the requirements
    // display an error message to the user
    alert('Username must contain at least 3 characters and password must contain at least 5 characters including 1 symbol.');
  }
});
