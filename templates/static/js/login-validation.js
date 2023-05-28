document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const form = document.getElementById('register-form');
  const formData = new FormData(form);

  const username = formData.get('username');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirm-password');

  if (username.length >= 3 && password.length >= 5 && /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/.test(password)) {
    // username and password meet the requirements
    // you can then proceed to authenticate the user

    if (password === confirmPassword) {
      // Send a POST request to the server
      fetch('/register', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Account created successfully
            alert('Account has been created!');
            location.reload(); // Refresh the page after displaying the alert
          } else {
            // Display the error message from the server
            if (data.message === 'Username already exists. Please choose a different username.') {
              alert('Username has been taken. Please try another username.');
            } else {
              alert(data.message);
            }
          }
        })
        .catch(error => {
          console.error('An error occurred while registering:', error);
        });
    } else {
      // Passwords do not match
      alert('Passwords do not match. Please make sure to enter the same password in both fields.');
    }

  } else {
    // username and password do not meet the requirements
    // display an error message to the user
    alert('Username must contain at least 3 characters and password must contain at least 5 characters including letters, numbers, and 1 symbol.');
  }
});



