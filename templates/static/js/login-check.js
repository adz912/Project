document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const form = document.getElementById('login-form');
  const formData = new FormData(form);

  const username = formData.get('username');
  const password = formData.get('password');

  if (username.length >= 3 && password.length >= 5) {
    // username and password meet the requirements
    // you can then proceed to authenticate the user

    // Send a POST request to the server
    fetch('/', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Account authenticated successfully
          alert('Logged in successfully!');
          location.reload(); // Refresh the page after displaying the alert
        } else {
          // Display the error message from the server
          if (data.message === 'Invalid username or password.') {
            alert('Incorrect Username or Password. Please try again.');
          } else {
            alert(data.message);
          }
        }
      })
      .catch(error => {
        console.error('An error occurred while logging in:', error);
        alert('An error occurred while logging in. Please try again later.');
      });
  } else {
    // username and password do not meet the requirements
    // display an error message to the user
    alert('Username must contain at least 3 characters and password must contain at least 5 characters.');
  }
});